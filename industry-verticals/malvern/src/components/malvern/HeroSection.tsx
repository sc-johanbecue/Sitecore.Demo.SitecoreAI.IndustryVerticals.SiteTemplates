/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import type { JSX } from 'react';
import { useMemo } from 'react';
import {
  TextField,
  RichTextField,
  Text,
  RichText,
  ImageField,
  Image as SitecoreImage,
  LinkField,
  Link as SitecoreLink,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';
import {
  getEntitlementOperatorFromField,
  getRequiredAuth0KeysFromEntitlements,
  getRequiredRolesFromField,
  useComponentEntitlementDecision,
} from '@/lib/entitlements/componentEntitlements';
import type { EntitlementItem, RoleItem } from '@/lib/entitlements/componentEntitlements';

interface Fields {
  Title: TextField;
  Subtitle: RichTextField;
  EmailPlaceholder: TextField;
  CTAText: TextField;
  CTALink: LinkField;
  HeroImage: ImageField;
  Entitlements: EntitlementItem[];
  EntitlementOperator?: LinkField;
  Roles: RoleItem[];
  RolesOperator: LinkField;
}

const defaultFields: Fields = {
  Title: { value: 'Fast-track your research' },
  Subtitle: {
    value:
      '<p>Advanced analytical instruments and services that help you move from measurement to insight — faster.</p>',
  },
  EmailPlaceholder: { value: '' },
  CTAText: { value: 'Discover' },
  CTALink: { value: { href: '/discover' } },
  HeroImage: { value: { src: '/hero-image.jpg', alt: 'Malvern Panalytical instruments' } },
  Entitlements: [],
  EntitlementOperator: { value: { id: '{95926502-E249-4B28-90F7-CEBF2F744D53}', value: '' } },
  Roles: [],
  RolesOperator: { value: { id: '', value: '' } },
};

export type HeroSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: HeroSectionProps): JSX.Element | null => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  const { page } = useSitecore();
  const isEditingOrPreview = page.mode.isEditing || page.mode.isPreview;

  const requiredKeys = useMemo(
    () => getRequiredAuth0KeysFromEntitlements(fields?.Entitlements),
    [fields?.Entitlements]
  );
  const operator = useMemo(
    () => getEntitlementOperatorFromField(fields?.EntitlementOperator),
    [fields?.EntitlementOperator]
  );
  const requiredRoles = useMemo(() => getRequiredRolesFromField(fields?.Roles), [fields?.Roles]);
  const rolesOperator = useMemo(
    () => getEntitlementOperatorFromField(fields?.RolesOperator),
    [fields?.RolesOperator]
  );
  const { allowed, isLoading, isSecured } = useComponentEntitlementDecision(
    requiredKeys,
    operator,
    requiredRoles,
    rolesOperator
  );

  if (!isEditingOrPreview && isSecured) {
    if (isLoading) return null;
    if (!allowed) return null;
  }

  return (
    <section
      className={`component hero-section bg-malvern-teal-dark relative overflow-hidden py-10 lg:py-16 ${styles || ''}`}
      id={id}
    >
      <div
        className="from-malvern-teal-dark pointer-events-none absolute inset-0 bg-gradient-to-br via-[#0a3038] to-[#041a1f]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-stretch gap-8 lg:flex-row lg:items-center lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 lg:max-w-xl lg:pt-4">
            <h1 className="mb-4 text-3xl leading-tight font-bold text-white lg:text-5xl lg:leading-tight">
              <Text field={fields.Title} />
            </h1>

            <div className="hero-subtitle mb-8 text-base leading-relaxed text-white/90 lg:text-lg">
              <RichText field={fields.Subtitle} />
            </div>

            {fields.EmailPlaceholder?.value ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="email"
                  placeholder={fields.EmailPlaceholder.value as string}
                  className="flex-1 rounded border border-white/30 bg-white/10 px-4 py-3 text-sm text-white transition-colors outline-none placeholder:text-white/60 focus:border-white/60 focus:ring-1 focus:ring-white/40"
                />
                <SitecoreLink
                  field={fields.CTALink}
                  className="bg-malvern-green hover:bg-malvern-green-hover inline-flex w-full items-center justify-center rounded px-6 py-3 text-sm font-semibold text-white transition-colors sm:w-auto"
                >
                  <Text field={fields.CTAText} />
                </SitecoreLink>
              </div>
            ) : (
              <SitecoreLink
                field={fields.CTALink}
                className="bg-malvern-green hover:bg-malvern-green-hover inline-flex w-full items-center justify-center rounded px-8 py-3.5 text-sm font-semibold text-white transition-colors sm:w-auto lg:px-10 lg:py-4 lg:text-base"
              >
                <Text field={fields.CTAText} />
              </SitecoreLink>
            )}
          </div>

          {/* Hero Image */}
          <div className="relative flex-1">
            <div className="relative overflow-hidden rounded-lg shadow-2xl ring-1 ring-white/10 lg:min-h-[280px]">
              <SitecoreImage
                field={fields.HeroImage}
                className="h-56 w-full object-cover sm:h-64 lg:h-full lg:min-h-[320px]"
              />
              <div
                className="from-malvern-teal-dark/60 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent lg:bg-gradient-to-l"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .hero-subtitle :global(p) {
          margin-bottom: 0.5rem;
        }
        .hero-subtitle :global(a) {
          color: #c5e4ed;
          text-decoration: underline;
        }
      `}</style>
    </section>
  );
};
