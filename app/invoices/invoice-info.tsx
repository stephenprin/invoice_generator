import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';

const invoiceInfoSchema = z.object({
  invoiceNumber: z
    .string({ required_error: 'Invoice Number is required' })
    .min(1, 'Invoice number is required'),
  date: z
    .string({ required_error: 'Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
  dueDate: z
    .string({ required_error: 'Due Date is required' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid due date format (YYYY-MM-DD)'),
});

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
const today = new Date();
const dueDate = new Date(today);
dueDate.setDate(today.getDate() + 30);

const formattedDate = formatDate(today);
const formattedDueDate = formatDate(dueDate);

// Infer TypeScript type from the schema
type InvoiceInfoData = z.infer<typeof invoiceInfoSchema>;

export default function GenerateInvoice() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvoiceInfoData>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      invoiceNumber: 'INV-001',
      date: formattedDate, // Set to today's date
      dueDate: formattedDueDate,
    },
  });
  console.log(errors);
  const onSubmit = (data) => console.log(data);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <SafeAreaView edges={['bottom']} className="m-4 flex-1">
        <Text className="mb-5 gap-2 text-2xl font-bold">Invoice Info</Text>
        <ScrollView keyboardShouldPersistTaps="handled">
          <CustomTextInput
            control={control}
            name="invoiceNumber"
            label="Invoice Number"
          />
          <CustomTextInput
            control={control}
            name="date"
            label="Date"
          />
          <CustomTextInput
            control={control}
            name="dueDate"
            label="Due Date"
          />
        </ScrollView>
        <Button title="Next" className="my-4" onPress={handleSubmit(onSubmit)} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
