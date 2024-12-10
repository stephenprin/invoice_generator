import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/Button';
import { useStore } from '~/store/store';

export default function InvoiceSummary() {
  const newInvoice = useStore((data) => data.newInvoice);
  const getSubTotal = useStore((data) => data.getSubTotal);
  const getTax = useStore((data) => data.getTax);
  const getTotal = useStore((data) => data.getTotal);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <ScrollView>
        {/* Sender Info */}
        {newInvoice.senderInfo && (
          <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
            <Text className="mb-2 text-lg font-bold">Sender Information</Text>
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
            <Text className="mb-2 text-lg font-bold">Recipient Information</Text>
            <View className="gap-1">
              <Text>Name: {newInvoice.recipientInfo.name}</Text>
              <Text>Address: {newInvoice.recipientInfo.address}</Text>
              <Text>Email: {newInvoice.recipientInfo.email}</Text>
              <Text>Tax ID: {newInvoice.recipientInfo.taxId}</Text>
            </View>
          </View>
        )}

        {/* Invoice Details */}
        <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <Text className="mb-2 text-lg font-bold">Invoice Details</Text>
          <Text>Invoice Number: {newInvoice.invoiceInfo?.invoiceNumber}</Text>
          <Text>Date: {newInvoice.invoiceInfo?.date}</Text>
          <Text>Due Date: {newInvoice.invoiceInfo?.dueDate}</Text>
        </View>

        <View className="mb-4 rounded-lg bg-white p-4 shadow-sm ">
          <Text className="mb-2 text-lg font-bold">Items</Text>

          {/* Header Row */}
          <View className="flex- mb-2 flex-row justify-between">
            <Text className="flex-1 font-bold ">Name</Text>
            <View className="flex-2 flex-row font-bold  ">
              <Text className="w-24 text-right font-bold ">Price</Text>
              <Text className="w-24 text-right font-bold">Quantity</Text>
              <Text className="ml-3 w-24 bg-amber-300 text-right font-bold">Total</Text>
            </View>
          </View>

          {/* Items */}
          {newInvoice.items?.map((item, index) => (
            <View key={index} className="mb-2 flex-row justify-between">
              {/* Item Name */}
              <Text className="flex-1">{item.name}</Text>

              {/* Item Price */}
              <Text className="w-24 text-right">${item.price.toFixed(2)}</Text>

              {/* Item Quantity */}
              <Text className="w-24 text-right">{item.quantity}</Text>

              {/* Item Total */}
              <Text className="w-24 text-right">${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}

          {/* Summary */}
          <View className="mt-4 border-t pt-2">
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
              <Text className="text-lg font-bold">
                ${getTotal().toFixed(2)}

              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Button */}
      <Button
        title="Confirm and Submit"
        className="mb-6 mt-4 "
        onPress={() => console.log('Invoice Submitted')}
      />
    </View>
  );
}
