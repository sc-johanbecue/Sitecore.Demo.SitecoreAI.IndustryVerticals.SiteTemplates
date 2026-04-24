'use client';

import type { JSX } from 'react';
import { TextField, Text, LinkField, Link as SitecoreLink } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from '@/lib/component-props';

/**
 * SearchFilterSection Component
 * "Find the ideal HR or payroll solution for your business" section with filter dropdowns
 *
 * Layout:
 * - Desktop: Centered title with inline filter bar (# of Employees dropdown + Interest dropdown + CTA button)
 * - Mobile: Stacked vertically
 * - Light background with prominent heading
 */

interface Fields {
  Title: TextField;
  EmployeesLabel: TextField;
  EmployeesPlaceholder: TextField;
  InterestLabel: TextField;
  InterestPlaceholder: TextField;
  CTAText: TextField;
  CTALink: LinkField;
}

const defaultFields: Fields = {
  Title: { value: 'Find the ideal HR or payroll solution for your business:' },
  EmployeesLabel: { value: '# of Employees' },
  EmployeesPlaceholder: { value: '# of Employees' },
  InterestLabel: { value: 'What are you interested in?' },
  InterestPlaceholder: { value: 'What are you interested in?' },
  CTAText: { value: 'Show me' },
  CTALink: { value: { href: '/solutions' } },
};

export type SearchFilterSectionProps = ComponentProps & {
  fields: Fields;
};

export const Default = (props: SearchFilterSectionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { styles } = props.params;
  const fields = props.fields || defaultFields;

  return (
    <section
      className={`component search-filter-section bg-malvern-sky py-10 lg:py-14 ${styles || ''}`}
      id={id}
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-malvern-teal-dark mb-8 text-center text-2xl font-bold lg:text-3xl">
          <Text field={fields.Title} />
        </h2>

        {/* Filter Bar — light panel, inputs + green CTA */}
        <div className="border-malvern-sky-deep/20 mx-auto flex max-w-3xl flex-col items-stretch gap-3 rounded-lg border bg-white/90 p-4 shadow-sm lg:flex-row lg:items-end lg:gap-4 lg:p-5">
          {/* Employees Dropdown */}
          <div className="flex-1">
            <label className="sr-only">
              <Text field={fields.EmployeesLabel} />
            </label>
            <select
              className="focus:border-malvern-teal focus:ring-malvern-teal/30 w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-[#333] outline-none focus:ring-1"
              defaultValue=""
            >
              <option value="" disabled>
                {fields.EmployeesPlaceholder?.value as string}
              </option>
              <option value="1-49">1-49</option>
              <option value="50-999">50-999</option>
              <option value="1000+">1000+</option>
            </select>
          </div>

          {/* Interest Dropdown */}
          <div className="flex-1">
            <label className="sr-only">
              <Text field={fields.InterestLabel} />
            </label>
            <select
              className="focus:border-malvern-teal focus:ring-malvern-teal/30 w-full rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-[#333] outline-none focus:ring-1"
              defaultValue=""
            >
              <option value="" disabled>
                {fields.InterestPlaceholder?.value as string}
              </option>
              <option value="payroll">Payroll</option>
              <option value="hr">HR</option>
              <option value="time-attendance">Time & Attendance</option>
              <option value="talent">Talent</option>
              <option value="hcm">HCM</option>
            </select>
          </div>

          {/* Show Me Button */}
          <SitecoreLink
            field={fields.CTALink}
            className="bg-malvern-green hover:bg-malvern-green-hover inline-flex w-full items-center justify-center rounded-md px-8 py-3 text-sm font-semibold text-white transition-colors lg:w-auto"
          >
            <Text field={fields.CTAText} />
          </SitecoreLink>
        </div>
      </div>
    </section>
  );
};
