'use client';

import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { ProfileFormValues } from './profileSchema';

//--------------------------------------------------
// 📦 Reusable Field Components
//--------------------------------------------------

export interface TextFieldProps {
  form: UseFormReturn<ProfileFormValues>;
  /** 只能傳 string 欄位；若傳其他型別請用 as const 斷言避免報錯 */
  name: keyof ProfileFormValues;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

export const TextField = ({
  form,
  name,
  placeholder,
  type = 'text',
}: TextFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          {/* 若欄位不是字串（例如 File）就給空字串避免型別衝突 */}
          <Input
            {...field}
            value={typeof field.value === 'string' ? field.value : ''}
            placeholder={placeholder}
            type={type}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export interface TextareaFieldProps extends Omit<TextFieldProps, 'type'> {
  rows?: number;
}

export const TextareaField = ({
  form,
  name,
  rows = 6,
  placeholder,
}: TextareaFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Textarea
            {...field}
            value={typeof field.value === 'string' ? field.value : ''}
            placeholder={placeholder}
            className={`h-${rows * 8}`}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export interface SelectFieldProps {
  form: UseFormReturn<ProfileFormValues>;
  name: keyof ProfileFormValues;
  placeholder?: string;
  options: Array<{ label: string; value: string }>;
}

export const SelectField = ({
  form,
  name,
  placeholder,
  options,
}: SelectFieldProps) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <Select
          onValueChange={field.onChange}
          defaultValue={String(field.value ?? '')}
        >
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
);
