import { Stack } from 'expo-router';

export default function GenerateInvoiceLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="recipient"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="invoice-info"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
