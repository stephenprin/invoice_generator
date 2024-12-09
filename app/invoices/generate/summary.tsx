import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/Button';

export default function InvoiceSummary() {
  // Sample data for the summary
  const invoiceData = {
    sender: {
      name: 'John Doe Limited',
      address: '123 Main St, Cityville',
      email: 'stephenprince427@gmail.com',
      taxId: 'AB123456',
    },
    recipient: {
      name: 'Jane Smith',
      address: '456 Elm St, Townsville',
      email: 'stephenprince47@gmail.com',
      taxId: 'AB123456',
    },
    invoiceDetails: {
      invoiceNumber: 'INV-001',
      date: '2024-12-03',
      dueDate: '2025-01-03',
    },
    items: [
      { name: 'Laptop', quantity: 1, price: 1200 },
      { name: 'Mouse', quantity: 2, price: 25 },
    ],
  };

  const calculateTotal = () => {
    const subtotal = invoiceData.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;

    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotal();

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <ScrollView>
        {/* Sender Info */}
        <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <Text className="mb-2 text-lg font-bold">Sender Information</Text>
          <Text>Name: {invoiceData.sender.name}</Text>
          <Text>Address: {invoiceData.sender.address}</Text>
          <Text>Phone: {invoiceData.sender.email}</Text>
          <Text>Tax ID: {invoiceData.sender.taxId}</Text>
        </View>

        {/* Recipient Info */}
        <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <Text className="mb-2 text-lg font-bold">Recipient Information</Text>
          <Text>Name: {invoiceData.recipient.name}</Text>
          <Text>Address: {invoiceData.recipient.address}</Text>
          <Text>Phone: {invoiceData.recipient.email}</Text>
          <Text>Phone: {invoiceData.recipient?.taxId}</Text>
        </View>

        {/* Invoice Details */}
        <View className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <Text className="mb-2 text-lg font-bold">Invoice Details</Text>
          <Text>Invoice Number: {invoiceData.invoiceDetails.invoiceNumber}</Text>
          <Text>Date: {invoiceData.invoiceDetails.date}</Text>
          <Text>Due Date: {invoiceData.invoiceDetails.dueDate}</Text>
        </View>

        <View className="mb-4 rounded-lg bg-white p-4 shadow-sm ">
          <Text className="mb-2 text-lg font-bold">Items</Text>

          {/* Header Row */}
          <View className="flex-row flex- justify-between mb-2">
            <Text className="flex-1 font-bold ">Name</Text>
           <View className="flex-row flex-2 font-bold  ">
             <Text className="w-24 text-right font-bold ">Price</Text>
             <Text className="w-24 text-right font-bold">Quantity</Text>
             <Text className="w-24 text-right font-bold ml-3 bg-amber-300">Total</Text>
           </View>
          </View>

          {/* Items */}
          {invoiceData.items.map((item, index) => (
            <View key={index} className="flex-row justify-between mb-2">
              {/* Item Name */}
              <Text className="flex-1">{item.name}</Text>

              {/* Item Price */}
              <Text className="w-24 text-right">${item.price.toFixed(2)}</Text>

              {/* Item Quantity */}
              <Text className="w-24 text-right">{item.quantity}</Text>

              {/* Item Total */}
              <Text className="w-24 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}

          {/* Summary */}
          <View className="mt-4 border-t pt-2">
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold">Subtotal</Text>
              <Text className="text-lg font-bold">
                $
                {invoiceData.items
                  .reduce((subtotal, item) => subtotal + item.price * item.quantity, 0)
                  .toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold">Tax (10%)</Text>
              <Text className="text-lg font-bold">
                $
                {(
                  invoiceData.items.reduce(
                    (subtotal, item) => subtotal + item.price * item.quantity,
                    0
                  ) * 0.1
                ).toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-lg font-bold">Total</Text>
              <Text className="text-lg font-bold">
                $
                {invoiceData.items
                  .reduce(
                    (subtotal, item) =>
                      subtotal + item.price * item.quantity * 1.1, // Include Tax
                    0
                  )
                  .toFixed(2)}
              </Text>
            </View>
          </View>
        </View>




      </ScrollView>

      {/* Button */}
      <Button
        title="Confirm and Submit"
        className="mt-4"
        onPress={() => console.log('Invoice Submitted')}
      />
    </View>
  );
}
