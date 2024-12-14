import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/Button';
import { Invoice } from '~/schema/invoice';
import { useStore } from '~/store/store';
import { generateInvoicePDF } from '~/utils/pdf';

export default function InvoiceSummary() {
  const newInvoice = useStore((data) => data.newInvoice);
  const getSubTotal = useStore((data) => data.getSubTotal);
  const getTax = useStore((data) => data.getTax);
  const getTotal = useStore((data) => data.getTotal);

  const handleGeneratePDF = () => {
    generateInvoicePDF(newInvoice as Invoice, getTotal, getTax, getSubTotal);
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white p-4 shadow-md">
        <Text className="text-left text-3xl font-bold">
          Invoice #{newInvoice.invoiceInfo?.invoiceNumber || 'N/A'}
        </Text>
        <View className="mt-3 flex-row justify-between">
          <View className="flex-col items-start">
            <Text className="text-sm font-medium color-gray-500"> Date</Text>
            <Text className="font-medium">
              {' '}
              {new Date(newInvoice.invoiceInfo?.date || '').toLocaleDateString()}
            </Text>
          </View>
          <View
            className="flex-col items-start
          ">
            <Text className="text-sm font-medium color-gray-500">Due Date</Text>
            <Text className="font-medium">
              {' '}
              {new Date(newInvoice.invoiceInfo?.dueDate || '').toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="p-4">
        {/* Sender Info */}
        {newInvoice.senderInfo && (
          <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <Text className="mb-2 text-lg font-bold text-slate-500 underline">
              Sender Information
            </Text>
            <View className="gap-1">
              <Text>Name: {newInvoice.senderInfo.name}</Text>
              <Text>Address: {newInvoice.senderInfo.address}</Text>
              <Text>Phone: {newInvoice.senderInfo.email}</Text>
              <Text>Tax ID: {newInvoice.senderInfo.taxId}</Text>
            </View>
          </View>
        )}

        {/* Recipient Info */}
        {newInvoice.recipientInfo && (
          <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <Text className="mb-2 text-lg font-bold text-slate-500 underline">
              Recipient Information
            </Text>
            <View className="gap-1">
              <Text>Name: {newInvoice.recipientInfo.name}</Text>
              <Text>Address: {newInvoice.recipientInfo.address}</Text>
              <Text>Email: {newInvoice.recipientInfo.email}</Text>
              <Text>Tax ID: {newInvoice.recipientInfo.taxId}</Text>
            </View>
          </View>
        )}

        {/* Items */}
        <View className="mb-4 rounded-lg bg-white p-4 shadow-sm ">
          <Text className="mb-2 text-lg font-bold text-slate-500 underline">Items</Text>

          {/* Header Row */}
          <View className="mb-2 flex-row justify-between">
            <Text className="flex-1 font-bold">Name</Text>
            <View className="flex-2 flex-row">
              <Text className="w-24 text-right font-bold">Price</Text>
              <Text className="w-24 text-right font-bold">Quantity</Text>
              <Text className="ml-3 w-24 text-right font-bold">Total</Text>
            </View>
          </View>

          {/* Items */}
          {newInvoice.items?.map((item, index) => (
            <View key={index} className="mb-2 flex-row justify-between">
              <Text className="flex-1">{item.name}</Text>
              <Text className="w-24 text-right">${item.price.toFixed(2)}</Text>
              <Text className="w-24 text-right">{item.quantity}</Text>
              <Text className="w-24 text-right">${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}

          {/* Summary */}
          <View className="mt-4 border-t border-gray-400 pt-2">
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold">Subtotal</Text>
              <Text className="text-md font-bold">${getSubTotal().toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold">Tax (10%)</Text>
              <Text className="text-md font-bold">${getTax().toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold">Total</Text>
              <Text className="text-lg font-bold">${getTotal().toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Button */}
      <Button title="Generate Invoice" className="mx-4 mb-8 mt-auto" onPress={handleGeneratePDF} />
    </View>
  );
}
