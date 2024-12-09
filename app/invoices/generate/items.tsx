import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { useForm, Controller, useFieldArray, FormProvider } from 'react-hook-form';
import { Text, ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '~/components/Button';
import CustomTextInput from '~/components/CustomTextInput';

const invoiceItemsSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).min(1, 'Name is required'),
  price: z.number({ required_error: 'Price is required' }).min(1, 'Price is too short'),
  quantity: z.number({ required_error: 'Quantity is required' }).min(1, 'Quantity is required'),
});

// Infer TypeScript type from the schema
type InvoiceItemsData = z.infer<typeof invoiceItemsSchema>;
const itemSchema = z.object({
  items: invoiceItemsSchema.array(),
});
type Items = z.infer<typeof itemSchema>;

export default function GenerateInvoice() {
  const form = useForm<Items>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      items: [
        {
          name: 'Maccbook',
          quantity: 1,
          price: 450.5,
        },
      ],
    },
  });
  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = form;

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: 'items',
  });
  const watchedItems = watch('items');

  const onSubmit = (data) => {
    console.log(data);
    router.push('/');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1">
      <FormProvider {...form}>
        <SafeAreaView edges={['bottom']} className="m-4 flex-1">
          <Text className="mb-5 gap-2 text-2xl font-bold">Items</Text>
          <ScrollView keyboardShouldPersistTaps="handled">
            <View className="gap-3">
              <View  className=" shadow">
                {fields.map((item, index) => (
                  <View key={index} className="mb-4  rounded-lg bg-gray-50 p-4">
                    <Text className="text-lg font-semibold mb-2">Item {index + 1}</Text>
                    <CustomTextInput
                      name={`items.${index}.name`}
                      label="Name"
                      placeholder="Enter your Item name"
                      onChangeText={(value) => form.setValue(`items.${index}.name`, value)}
                    />
                    <View className="flex-row gap-4">
                      <View className="flex-1">
                        <CustomTextInput
                          name={`items.${index}.price`}
                          label="Price"
                          keyboardType="numeric"
                          placeholder="Enter your price"
                          onChangeText={(value) => form.setValue(`items.${index}.price`, Number(value))}
                        />
                      </View>
                      <View className="flex-1">
                        <CustomTextInput
                          name={`items.${index}.quantity`}
                          label="Quantity"
                          keyboardType="numeric"
                          placeholder="Enter your quantity"
                          onChangeText={(value) => {
                            form.setValue(`items.${index}.quantity`, Number(value));
                          }}
                        />
                      </View>

                      <View className="flex-1 items-center">
                        <Text className="text-md font-bold text-gray-500">Total</Text>
                        <Text className=" font-bold text-green-800 mt-4">
                          $ {watchedItems[index]?.price * watchedItems[index]?.quantity || 0}
                        </Text>
                      </View>
                    </View>

                    <Button title="Remove" className="mt-2 bg-red-500" onPress={() => remove(index)} />
                  </View>
                ))}
              </View>

            </View>

            <Button
              title="Add Item"
              className="mt-4"
              variant="link"
              onPress={() => append({ name: '', price: 0, quantity: 1 })}
            />
          </ScrollView>
          <Button title="Next" className="my-4" onPress={handleSubmit(onSubmit)} />
        </SafeAreaView>
      </FormProvider>
    </KeyboardAvoidingView>
  );
}
