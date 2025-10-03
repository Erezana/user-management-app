import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../../components/ConfirmModal";
import { RootStackParamList } from "../../navigation";
import type { RootState } from "../../store";
import { deleteUser } from "../../store/usersSlice";

type Props = NativeStackScreenProps<RootStackParamList, "UserDetails">;

export default function UserDetails({ route, navigation }: Props) {
  const { id } = route.params;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) =>
    state.users.items.find((u) => u.id === id)
  );

  const [modalVisible, setModalVisible] = useState(false);

  if (!user) return <Text style={{ padding: 20 }}>User not found</Text>;

  const handleDelete = () => {
    dispatch(deleteUser(id));
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{user.name}</Text>
      <Text style={styles.userInfo}>{user.email}</Text>
      {user.phone && <Text style={styles.userInfo}>{user.phone}</Text>}
      {user.company && <Text style={styles.userInfo}>{user.company.name}</Text>}
      {user.website && <Text style={styles.userInfo}>{user.website}</Text>}
      {user.address && (
        <Text style={styles.userInfo}>
          {user.address.street} {user.address.city}
        </Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => navigation.navigate("UpdateUser", { id })}
        >
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>

      <ConfirmModal
        visible={modalVisible}
        message="Are you sure you want to delete this user?"
        onConfirm={handleDelete}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  userInfo: {
    fontSize: 14,
    marginBottom: 4,
    color: "#555",
  },

  buttonContainer: {
    flexDirection: "row",
    marginTop: 16,
  },

  updateButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "#62a2e7",
    marginRight: 8,
  },

  deleteButton: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "#d9534f",
    marginLeft: 8,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
