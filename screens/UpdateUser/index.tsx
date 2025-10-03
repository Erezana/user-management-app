import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootStackParamList } from "../../App";
import type { RootState } from "../../store";
import { updateUser } from "../../store/usersSlice";

type Props = NativeStackScreenProps<RootStackParamList, "UpdateUser">;

export default function UpdateUser({ route, navigation }: Props) {
  const { id } = route.params;
  const user = useSelector((state: RootState) =>
    state.users.items.find((u) => u.id === id)
  );
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setCompany(user.company?.name || "");
      setPhone(user.phone || "");
      setWebsite(user.website || "");
      setStreet(user.address?.street || "");
      setCity(user.address?.city || "");
    }
  }, [user]);

  const saveChanges = () => {
    if (!user) return;

    const newErrors: { name?: string; email?: string } = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const updated = {
      ...user,
      name,
      email,
      company: { name: company || "" },
      phone: phone || "",
      website: website || "",
      address: { street: street || "", city: city || "" },
    };
    dispatch(updateUser(updated));
    navigation.goBack();
  };

  if (!user) {
    return (
      <View style={styles.notFound}>
        <Text>User not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput value={company} onChangeText={setCompany} placeholder="Company" style={styles.input} />
      <TextInput value={phone} onChangeText={setPhone} placeholder="Phone" style={styles.input} />
      <TextInput value={website} onChangeText={setWebsite} placeholder="Website" style={styles.input} />
      <TextInput value={street} onChangeText={setStreet} placeholder="Street" style={styles.input} />
      <TextInput value={city} onChangeText={setCity} placeholder="City" style={styles.input} />

      <TouchableOpacity style={styles.updateButton} onPress={saveChanges}>
        <Text style={styles.updateButtonText}>Update User</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  notFound: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#d0c2c2",
    borderRadius: 6,
    padding: 10,
    marginBottom: 6,
  },

  error: {
    color: "red",
    marginBottom: 12,
  },

  updateButton: {
    backgroundColor: "#62a2e7",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  backButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: "#ccc",
  },

  backButtonText: {
    color: "#000",
  },
});
