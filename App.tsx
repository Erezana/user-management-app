import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Provider } from "react-redux";
import RootNavigator from "./navigation";
import { store } from "./store";

export type RootStackParamList = {
  UserList: undefined;
  UserDetails: { id: number };
  AddUser: undefined;
  UpdateUser: { id: number };
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
            <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
