import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';

const recipientInfoSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Business name is required'),
  email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
  address: z
    .string({ required_error: 'Address is required' })
    .min(4, 'Address is too short'),
  taxId: z.string().optional(),
});

// Infer TypeScript type from the schema
type RecipientData = z.infer<typeof recipientInfoSchema>;

export default function GenerateInvoice() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipientData>({
    resolver: zodResolver(recipientInfoSchema),
    defaultValues: {
      name: 'Client Name',
      address: 'Client LimitedLagos',
      email: 'Clie45@gmail.com',
      taxId: '1245665',
    },
  });
  console.log(errors);
  const onSubmit = (data) => console.log(data);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <SafeAreaView edges={['bottom']} className="m-4 flex-1">
        <Text className="mb-5 gap-2 text-2xl font-bold">Recipient Info</Text>
        <ScrollView keyboardShouldPersistTaps="handled">
          <CustomTextInput
            control={control}
            name="name"
            label="Name"
            placeholder="Enter your business name"
          />
          <CustomTextInput
            control={control}
            name="address"
            label="Address"
            placeholder="Enter your address"
            multiline
          />
          <CustomTextInput
            control={control}
            name="email"
            label="Email"
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <CustomTextInput
            control={control}
            name="taxId"
            label="Tax ID"
            placeholder="Enter your tax ID"
          />
        </ScrollView>
        <Button title="Next" className="my-4" onPress={handleSubmit(onSubmit)} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
