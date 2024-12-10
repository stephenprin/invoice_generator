import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import { formatDate } from '~/lib';
import { InvoiceInfo, invoiceInfoSchema } from '~/schema/invoice';
import { useStore } from "~/store/store";

const today = new Date();
const dueDate = new Date(today);
dueDate.setDate(today.getDate() + 30);
const formattedDate = formatDate(today);
const formattedDueDate = formatDate(dueDate);

export default function GenerateInvoice() {

  const addInvoiceInfo = useStore((data) => data.addInvoiceInfo);

  const form = useForm<InvoiceInfo>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      invoiceNumber: 'INV-001',
      date: formattedDate,
      dueDate: formattedDueDate,
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  console.log(errors);
  const onSubmit = (data) => {
    addInvoiceInfo(data)
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
            <CustomTextInput name="date" label="Date" editable={false} />
            <CustomTextInput name="dueDate" label="Due Date" editable={false}/>
          </ScrollView>
          <Button title="Next" className="my-4" onPress={handleSubmit(onSubmit)} />
        </SafeAreaView>
      </FormProvider>
    </KeyboardAvoidingView>
  );
}
