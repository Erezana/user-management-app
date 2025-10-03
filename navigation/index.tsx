import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AddUser from "../screens/AddUser";
import UpdateUser from "../screens/UpdateUser";
import UserDetails from "../screens/UserDetails";
import UserList from "../screens/UserList";


export type RootStackParamList = {
  UserList: undefined;
  UserDetails: { id: number };
  AddUser: undefined;
  UpdateUser: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="UserList">
      <Stack.Screen
        name="UserList"
        component={UserList}
        options={{ title: "Users" }}
      />
      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{ title: "User Details" }}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUser}
        options={{ title: "Add User" }}
      />
      <Stack.Screen
        name="UpdateUser"
        component={UpdateUser}
        options={{ title: "Update User" }}
      />
    </Stack.Navigator>
  );
}
