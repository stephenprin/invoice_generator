import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';
import { BusinessInfo, businessInfoSchema } from '~/schema/invoice';
import { useStore } from '~/store/store';

export default function GenerateInvoice() {
  const addRecipientInfo = useStore((data) => data.addRecipientInfo);

  const form = useForm<BusinessInfo>({
    resolver: zodResolver(businessInfoSchema),
    defaultValues: {
      name: 'Client Name',
      address: 'Client LimitedLagos',
      email: 'Clie45@gmail.com',
      taxId: '1245665',
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = (data) => {
    addRecipientInfo(data);
    router.push('/invoices/generate/invoice-info');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <FormProvider {...form}>
        <SafeAreaView edges={['bottom']} className="m-4 flex-1">
          <Text className="mb-5 gap-2 text-2xl font-bold">Recipient Info</Text>
          <ScrollView keyboardShouldPersistTaps="handled">
            <CustomTextInput name="name" label="Name" placeholder="Enter your business name" />
            <CustomTextInput
              name="address"
              label="Address"
              placeholder="Enter your address"
              multiline
            />
            <CustomTextInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
            />
            <CustomTextInput name="taxId" label="Tax ID" placeholder="Enter your tax ID" />
          </ScrollView>
          <Button title="Next" className="my-4" onPress={handleSubmit(onSubmit)} />
        </SafeAreaView>
      </FormProvider>
    </KeyboardAvoidingView>
  );
}
