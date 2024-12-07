import { useController } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type CustomTextInputProps = {
  label: string;
  name: string;
  placeholder?: string;
} & TextInputProps;

export default function CustomTextInput({
  placeholder,
  name,
  label,
  ...props
}: CustomTextInputProps) {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
  } = useController({ name, rules: { required: 'Name is required' } });
  return (
    <View className="mb-2">
      <Text className="text-md mb-2 font-bold text-gray-500">{label}</Text>
      <TextInput
        onChangeText={onChange}
        onBlur={onBlur}
        value={value?.toString()}
        placeholderTextColor="#7b7b8b"
        {...props}
        className={`rounded border border-gray-300 p-3 text-sm ${props.className}`}
        placeholder={placeholder}

      />
      <Text className="text-sm text-red-500">{error?.message}</Text>
    </View>
  );
}
