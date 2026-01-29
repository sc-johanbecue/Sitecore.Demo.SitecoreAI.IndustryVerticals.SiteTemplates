'use client';

import {
  ComponentParams,
  ComponentRendering,
  Image,
  ImageField,
  Placeholder,
  RichText,
  RichTextField,
  Text,
  TextField,
} from '@sitecore-content-sdk/nextjs';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Fields {
  TitleOne: TextField;
  TitleTwo: TextField;
  TitleThree: TextField;
  TitleFour: TextField;
  TitleFive: TextField;
  CopyrightText: TextField;
  Logo: ImageField;
  Description: RichTextField;
}

type FooterProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = (props: FooterProps) => {
  const id = props.params?.RenderingIdentifier;
  const styles = props.params?.styles || '';
  const [openAccordions, setOpenAccordions] = useState<number[]>([]);

  const phKeyOne = `footer-list-first-${props?.params?.DynamicPlaceholderId}`;
  const phKeyThree = `footer-list-third-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFive = `footer-list-fifth-${props?.params?.DynamicPlaceholderId}`;
  const phKeyFourth = `footer-list-fourth-${props?.params?.DynamicPlaceholderId}`;

  const toggleAccordion = (index: number) => {
    setOpenAccordions((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const sections = [
    {
      key: 'first_nav',
      title: <Text field={props.fields?.TitleOne} />,
      content: <Placeholder name={phKeyOne} rendering={props.rendering} />,
    },
    {
      key: 'third_nav',
      title: <Text field={props.fields?.TitleThree} />,
      content: <Placeholder name={phKeyThree} rendering={props.rendering} />,
    },
    {
      key: 'fifth_nav',
      title: <Text field={props.fields?.TitleFive} />,
      content: <Placeholder name={phKeyFive} rendering={props.rendering} />,
    },
  ];

  return (
    <footer className={`component footer ${styles}`} id={id}>
      {/* Main Footer - Blue Section */}
      <div className="bg-[#1e22aa]">
        <div className="container mx-auto px-4 py-10 md:py-12">
          {/* Desktop Layout */}
          <div className="hidden gap-8 md:grid md:grid-cols-[1fr_3fr] lg:gap-16">
            {/* Logo */}
            <div>
              <Image field={props.fields?.Logo} className="w-40 lg:w-48" />
              {props.fields?.Description && (
                <div className="mt-6 text-sm text-white/80">
                  <RichText field={props.fields.Description} />
                </div>
              )}
            </div>

            {/* Links Grid - 2 main columns, each with 2 sub-columns */}
            <div className="grid grid-cols-2 gap-8 lg:gap-12">
              {/* Quick Access Section */}
              <div>
                <h3 className="mb-6 text-base font-bold text-white">{sections[0].title}</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <div className="space-y-3 text-sm text-white/90 [&_a]:block [&_a]:transition-colors [&_a]:hover:text-white">
                    {sections[0].content}
                  </div>
                </div>
              </div>

              {/* Get in Touch Section */}
              <div>
                <h3 className="mb-6 text-base font-bold text-white">{sections[1].title}</h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                  <div className="space-y-3 text-sm text-white/90 [&_a]:block [&_a]:transition-colors [&_a]:hover:text-white">
                    {sections[1].content}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden">
            {/* Logo */}
            <div className="mb-8">
              <Image field={props.fields?.Logo} className="w-40" />
            </div>

            {/* Accordion Sections */}
            {[sections[0], sections[1], sections[2]].map((section, index) => (
              <div key={section.key} className="border-b border-white/20">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex w-full items-center justify-between py-4 text-left"
                  aria-expanded={openAccordions.includes(index)}
                >
                  <span className="text-base font-medium text-white">{section.title}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-white transition-transform ${
                      openAccordions.includes(index) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordions.includes(index) && (
                  <div className="space-y-3 pb-4 text-sm text-white/90 [&_a]:block [&_a]:transition-colors [&_a]:hover:text-white">
                    {section.content}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Legal Links - Desktop */}
          <div className="mt-10 hidden gap-8 border-t border-white/30 pt-6 md:grid md:grid-cols-[1fr_3fr] lg:gap-16">
            {/* Empty column to align with logo */}
            <div />
            {/* Legal links aligned under Quick Access */}
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/90 [&_a]:transition-colors [&_a]:hover:text-white">
              {sections[2].content}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - White */}
      <div className="bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <p className="text-sm text-gray-700">
            <Text field={props.fields?.CopyrightText} />
          </p>
          <div className="flex items-center gap-3 [&_a]:transition-opacity [&_a]:hover:opacity-80">
            <Placeholder name={phKeyFourth} rendering={props.rendering} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Default;
