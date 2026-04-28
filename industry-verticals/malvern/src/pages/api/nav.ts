/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from '@auth0/nextjs-auth0';

import client from 'lib/sitecore-client';
import { getEntitlementsFromSession, getRolesFromSession } from 'lib/entitlements';
import { getNavMetadata } from 'lib/nav-metadata';
import { enrichNavTree, filterNavTree, type NavFields } from 'lib/nav-apply';
import { getNavigationFieldsFromLayout, setNavigationFieldsOnLayout } from 'lib/nav-layout';

function summarizeNavItems(fields: NavFields): Array<{
  id: string;
  href: string;
  title?: string;
}> {
  return Object.values(fields)
    .filter(Boolean)
    .map((it) => {
      const title = (it as unknown as { Title?: { value?: unknown } })?.Title?.value;
      return {
        id: String((it as unknown as { Id?: unknown })?.Id ?? ''),
        href: String((it as unknown as { Href?: unknown })?.Href ?? ''),
        title: typeof title === 'string' ? title : undefined,
      };
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  res.setHeader('Vary', 'Cookie');

  try {
    const requestInfo = {
      method: req.method,
      url: req.url,
      hasCookieHeader: Boolean(req.headers.cookie),
      hasAppSessionCookie:
        typeof req.headers.cookie === 'string' && req.headers.cookie.includes('appSession='),
      userAgent: (req.headers['user-agent'] || '').toString().slice(0, 120),
      referer: (req.headers.referer || '').toString().slice(0, 160),
    };
    const debug =
      req.query.navdebug === '1' || req.query.debug === '1' || process.env.NAV_DEBUG === '1';
    if (debug) {
      console.log('[NAV API] request', requestInfo);
    }
    const locale = typeof req.query.locale === 'string' ? req.query.locale : 'en';

    // Editing/Preview bypass: still apply redirects, skip entitlement filtering
    const isEditingOrPreview =
      req.query.editing === '1' ||
      req.query.preview === '1' ||
      (typeof req.query.sc_mode === 'string' &&
        ['edit', 'preview'].includes(req.query.sc_mode.toLowerCase()));

    const page = (await client.getPage('/', { locale })) as { layout?: unknown };
    if (debug) {
      console.log('[NAV API] page fetched', {
        locale,
        hasLayout: Boolean(page?.layout),
      });
    }
    if (!page?.layout) {
      if (debug) {
        console.warn('[NAV API] no layout returned from client.getPage("/")', { locale });
      }
      return res.status(200).json({ fields: {} });
    }

    const session = await getSession(req, res);
    const entitlements = getEntitlementsFromSession(session);
    const userRoles = getRolesFromSession(session);
    if (debug) {
      const user = session?.user as Record<string, unknown> | undefined;
      const claimKeys = user ? Object.keys(user).sort() : [];
      const claimKeyHints = claimKeys.filter(
        (k) => k.toLowerCase().includes('role') || k.toLowerCase().includes('entitlement')
      );
      const enabledEntitlements = Object.entries(entitlements)
        .filter(([, v]) => v === true)
        .map(([k]) => k);
      console.log('[NAV API] user claims', {
        authenticated: Boolean(session?.user),
        sub: session?.user?.sub,
        roles: userRoles,
        entitlementCount: enabledEntitlements.length,
        entitlements: enabledEntitlements,
        expectedEntitlementsClaim: process.env.AUTH0_BASE_URL
          ? `${process.env.AUTH0_BASE_URL.replace(/\/+$/, '')}/entitlements`
          : undefined,
        expectedRolesClaim: process.env.AUTH0_BASE_URL
          ? `${process.env.AUTH0_BASE_URL.replace(/\/+$/, '')}/roles`
          : undefined,
        claimKeyHints,
        claimKeyCount: claimKeys.length,
      });
    }

    const navFields = getNavigationFieldsFromLayout(page.layout);
    if (!navFields) {
      if (debug) {
        console.warn('[NAV API] no navigation fields found in layout', { locale });
      }
      return res.status(200).json({ fields: {} });
    }

    const collectIds = (fields: NavFields): string[] => {
      const ids: string[] = [];
      const walk = (it: any) => {
        if (it?.Id) ids.push(it.Id);
        if (Array.isArray(it?.Children)) it.Children.forEach(walk);
      };
      Object.values(fields).forEach(walk);
      return [...new Set(ids)];
    };

    const ids = collectIds(navFields);
    if (debug) {
      console.log('[NAV API] nav ids collected', {
        locale,
        isEditingOrPreview,
        topLevelCount: Object.keys(navFields).length,
        itemIdCount: ids.length,
      });
      console.log('[NAV API] top-level before enrich/filter', summarizeNavItems(navFields));
    }

    // Always fetch redirects; only fetch entitlement keys when NOT editing/preview
    const meta = await getNavMetadata({
      itemIds: ids,
      language: locale,
      includeEntitlements: !isEditingOrPreview,
      debug,
    });

    // Always enrich (redirects always applied)
    const enriched = enrichNavTree({
      fields: navFields,
      redirectMap: meta.redirectMap,
      requiredKeysMap: meta.requiredKeysMap,
      requiredOperatorMap: meta.requiredOperatorMap,
      requiredRolesMap: meta.requiredRolesMap,
      requiredRolesOperatorMap: meta.requiredRolesOperatorMap,
    });
    if (debug) {
      console.log('[NAV API] top-level after enrich', summarizeNavItems(enriched));
    }

    // Filter only when not editing/preview (filter function will bypass automatically)
    const filtered = filterNavTree({
      fields: enriched,
      userEntitlements: entitlements,
      userRoles,
      isEditingOrPreview,
      language: locale,
      userSub: session?.user?.sub,
      debug,
      traceId: `${Date.now()}`,
    });

    if (debug) {
      console.log('[NAV API] filter result', {
        locale,
        beforeTopLevel: Object.keys(enriched).length,
        afterTopLevel: Object.keys(filtered).length,
        userHasEntitlements: Object.keys(entitlements).length > 0,
        roleCount: userRoles.length,
      });
      console.log('[NAV API] top-level after filter', summarizeNavItems(filtered));
    }

    setNavigationFieldsOnLayout(page.layout, filtered);

    const updated = getNavigationFieldsFromLayout(page.layout) || {};
    return res.status(200).json({ fields: updated });
  } catch (e: unknown) {
    console.error('[NAV API] error', e);
    return res.status(200).json({ fields: {} });
  }
}
