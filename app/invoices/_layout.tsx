import { Stack } from 'expo-router';

export default function GenerateInvoiceLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false

        }}
      />
    </Stack>
  );
}