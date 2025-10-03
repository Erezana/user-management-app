import Loader from "@/components/Loader";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";
import { RootStackParamList } from "../../navigation";
import { fetchUsers } from "../../services/api";
import type { AppDispatch, RootState } from "../../store";
import { setError, setLoading, setUsers } from "../../store/usersSlice";

type NavProp = NativeStackNavigationProp<RootStackParamList, "UserList">;

export default function UserList() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavProp>();
  const { items, loading, error } = useSelector((state: RootState) => state.users);

  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchUsers();
        dispatch(setUsers(data));
      } catch {
        dispatch(setError("Couldn’t fetch users"));
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadUsers();
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    if (!debouncedQuery.trim()) return items;
    const q = debouncedQuery.toLowerCase();
    return items.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [debouncedQuery, items]);

  if (loading) return <Loader />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.actionButton, styles.addButton]}
        onPress={() => navigation.navigate("AddUser")}
      >
        <Text style={styles.buttonText}>Add User</Text>
      </TouchableOpacity>

      <SearchBar
        placeholder="Search by name or email."
        onSearch={(text) => setDebouncedQuery(text)}
      />

      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>No users found</Text>}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userCard}
            onPress={() => navigation.navigate("UserDetails", { id: item.id })}
          >
            <Text style={styles.userName}>{item.name}</Text>
            <Text>{item.email}</Text>
            {item.company?.name && <Text style={styles.companyName}>{item.company.name}</Text>}
          </TouchableOpacity>
        )}
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

  actionButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
 
  },
  addButton: {
    backgroundColor: "#62a2e7ff", 
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  userCard: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },

  userName: { 
    fontWeight: "600", 
    fontSize: 16, 
    color: "#333", 
  },

  companyName: { 
    color: "#777", 
    fontSize: 14, 
    marginTop: 2,
  },

  errorText: { 
    color: "red", 
    textAlign: "center", 
    marginTop: 20, 
    fontSize: 16,
  },

  emptyText: { 
    textAlign: "center", 
    marginTop: 40, 
    color: "#666", 
    fontSize: 15,
  },
});
