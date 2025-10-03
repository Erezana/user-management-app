import { UserForm, validateUser } from "@/utils/helper/validateUser";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { RootStackParamList } from "../../navigation";
import { addUser } from "../../store/usersSlice";

type Props = NativeStackScreenProps<RootStackParamList, "AddUser">;

export default function AddUser({ navigation }: Props) {
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
    company: "",
    phone: "",
    website: "",
    street: "",
    city: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof UserForm, string>>>({});
  const dispatch = useDispatch();

  const handleChange = (field: keyof UserForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveUser = () => {
    const newErrors = validateUser(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

  const user = {
  id: Date.now(),
  name: form.name || "",
  email: form.email || "",
  phone: form.phone || "",
  website: form.website || "",
  company: { name: form.company || "" },
  address: {
    street: form.street || "",
    city: form.city || "",
  },
};

    dispatch(addUser(user));
    navigation.goBack();
  };

  const fields: { key: keyof UserForm; placeholder: string; keyboardType?: "default" | "email-address" }[] = [
    { key: "name", placeholder: "Name" },
    { key: "email", placeholder: "Email", keyboardType: "email-address" },
    { key: "company", placeholder: "Company" },
    { key: "phone", placeholder: "Phone" },
    { key: "website", placeholder: "Website" },
    { key: "street", placeholder: "Street" },
    { key: "city", placeholder: "City" },
  ];

  return (
    <ScrollView style={styles.container}>
      {fields.map(({ key, placeholder, keyboardType }) => (
        <View key={key} style={styles.fieldWrapper}>
          <TextInput
            value={form[key] || ""}
            onChangeText={(text) => handleChange(key, text)}
            placeholder={placeholder}
            style={styles.input}
            keyboardType={keyboardType || "default"}
          />
          {errors[key] && <Text style={styles.error}>{errors[key]}</Text>}
        </View>
      ))}

      <TouchableOpacity style={styles.saveButton} onPress={saveUser}>
        <Text style={styles.saveButtonText}>Save User</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  fieldWrapper: {
    marginBottom: 12,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
  },

  error: {
    color: "red",
    marginTop: 4,
  },

  saveButton: {
    backgroundColor: "#62a2e7",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
