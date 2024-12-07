import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
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
  const form = useForm<InvoiceInfoData>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      invoiceNumber: 'INV-001',
      date: formattedDate, // Set to today's date
      dueDate: formattedDueDate,
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  console.log(errors);
  const onSubmit = (data) => {
    router.push('/invoices/generate/items');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <FormProvider {...form}>
        <SafeAreaView edges={['bottom']} className="m-4 flex-1">
          <Text className="mb-5 gap-2 text-2xl font-bold">Invoice Info</Text>
          <ScrollView keyboardShouldPersistTaps="handled">
            <CustomTextInput name="invoiceNumber" label="Invoice Number" />
            <CustomTextInput name="date" label="Date" />
            <CustomTextInput name="dueDate" label="Due Date" />
          </ScrollView>
          <Button title="Next" className="my-4" onPress={handleSubmit(onSubmit)} />
        </SafeAreaView>
      </FormProvider>
    </KeyboardAvoidingView>
  );
}
