import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type CustomButtonProps = {
  text: string;
  onPress: () => void;
  color?: string;
};

export default function CustomButton({ text, onPress, color = "#9bc6f5ff" }: CustomButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 6,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
