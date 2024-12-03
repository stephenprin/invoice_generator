import { Control, Controller } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type CustomTextInputProps = {
  label: string;
  name: string;
  control: Control<any>;
  placeholder?: string;
} & TextInputProps;

export default function CustomTextInput({
  placeholder,
  name,
  control,
  label,
  ...props
}: CustomTextInputProps) {
  return (
    <Controller
      control={control}
      rules={{
        required: "Name is required",
      }}
      render={({ field:{ onChange, onBlur, value }, fieldState: { error }  }) => (
        <View className="mb-2">
          <Text className="mb-2 text-md text-gray-500 font-bold">{label}</Text>
          <TextInput
            placeholderTextColor="#7b7b8b"
            {...props}
            className={`rounded border text-sm border-gray-300 p-3 ${props.className}`}
            placeholder={placeholder}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
          <Text className="text-sm text-red-500">{error?.message}</Text>
        </View>
      )}
      name={name}
    />
  );
}
