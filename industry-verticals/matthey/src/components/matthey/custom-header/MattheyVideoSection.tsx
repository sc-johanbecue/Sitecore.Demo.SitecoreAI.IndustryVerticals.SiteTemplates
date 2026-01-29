'use client';

import React, { JSX, useState } from 'react';
import { Play, X } from 'lucide-react';
import {
  TextField,
  ImageField,
  LinkField,
  Text,
  Image as JssImage,
  ComponentParams,
  ComponentRendering,
  useSitecore,
} from '@sitecore-content-sdk/nextjs';

type Fields = {
  BackgroundImage: ImageField;
  Title: TextField;
  ButtonText: TextField;
  VideoUrl: LinkField;
};

type ComponentProps = {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
};

const DEFAULT_FIELDS: Fields = {
  BackgroundImage: {
    value: {
      src: 'https://images.unsplash.com/photo-1581093458791-9d42e3c2fd45?w=1920&q=80',
      alt: 'Scientists working in laboratory',
      width: 1920,
      height: 600,
    },
  },
  Title: { value: 'Find out more about what we do' },
  ButtonText: { value: 'PLAY VIDEO' },
  VideoUrl: { value: { href: 'https://www.youtube.com/embed/dQw4w9WgXcQ' } },
};

export const Default = (props: ComponentProps): JSX.Element => {
  const fields = props.fields || DEFAULT_FIELDS;
  const id = props.rendering?.uid;
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const { page } = useSitecore();

  return (
    <>
      <section className="relative w-full" key={id}>
        <div className="relative h-[400px] w-full md:h-[500px] lg:h-[550px]">
          <JssImage
            field={fields.BackgroundImage}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative container mx-auto flex h-full flex-col justify-center px-4">
            <div className="max-w-md">
              <h2 className="mb-6 text-2xl leading-tight font-light text-balance text-white md:mb-8 md:text-3xl lg:text-4xl">
                <Text field={fields.Title} />
              </h2>
              <button
                onClick={() => !page.mode.isEditing && setIsVideoOpen(true)}
                className="inline-flex items-center gap-2 bg-[#1e22aa] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e22aa]/90"
              >
                <Text field={fields.ButtonText} />
                <Play className="h-4 w-4 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative mx-4 w-full max-w-4xl">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white transition-colors hover:text-white/80"
              aria-label="Close video"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="relative h-0 pb-[56.25%]">
              <iframe
                src={fields.VideoUrl?.value?.href as string}
                title="Video"
                className="absolute top-0 left-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Default;
