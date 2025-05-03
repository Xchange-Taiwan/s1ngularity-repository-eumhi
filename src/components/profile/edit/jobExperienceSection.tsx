'use client';

import { PlusIcon } from '@radix-ui/react-icons';
import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';

import { SelectField, TextareaField, TextField } from './fields';
import { ProfileFormValues } from './profileSchema';
import { Section } from './section';

interface Props {
  form: UseFormReturn<ProfileFormValues>;
}

export const JobExperienceSection: React.FC<Props> = ({ form }) => (
  <Section title="工作經驗">
    <div className="block grow gap-6 md:flex">
      <TextField form={form} name="job" placeholder="職稱" />
      <TextField form={form} name="company" placeholder="公司名稱" />
    </div>
    <div className="block grow md:flex">
      <SelectField
        form={form}
        name="jobPeriodStart"
        placeholder="Start"
        options={[{ label: '2024', value: '2024' }]}
      />
      <p className="relative bottom-[-8px] mx-2 my-auto hidden text-center md:block">
        ~
      </p>
      <p className="relative bottom-[-8px] mx-2 my-auto text-center text-sm md:hidden">
        to
      </p>
      <SelectField
        form={form}
        name="jobPeriodEnd"
        placeholder="present"
        options={[{ label: 'now', value: 'now' }]}
      />
    </div>
    <div className="block grow gap-6 md:flex">
      <SelectField
        form={form}
        name="industry"
        placeholder="請填入您的產業"
        options={[{ label: '金融業Ｆ', value: '金融業' }]}
      />
      <SelectField
        form={form}
        name="jobLocation"
        placeholder="請填入您的地點"
        options={[{ label: '台北', value: '台北' }]}
      />
    </div>
    <TextareaField form={form} name="description" rows={3} />
    <Button
      variant="ghost"
      className="mt-4 grow rounded-full px-4 py-3 text-brand-500 sm:grow-0"
    >
      <PlusIcon className="mr-2 h-5 w-5" />
      新增
    </Button>
  </Section>
);
