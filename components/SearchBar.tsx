import { useMemo, useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import { debounce } from "../utils/helper/debounce";

type Props = {
  placeholder?: string;
  delay?: number;
  onSearch: (query: string) => void;
};

export default function SearchBar({
  placeholder = "Search...",
  delay = 400,
  onSearch,
}: Props) {
  const [value, setValue] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((text: string) => {
        onSearch(text);
      }, delay),
    [delay, onSearch]
  );

  const handleChange = (text: string) => {
    setValue(text);
    debouncedSearch(text);
  };

  return (
    <TextInput
      value={value}
      onChangeText={handleChange}
      placeholder={placeholder}
      style={styles.input}
    />
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 12,
    fontSize: 16,
  },
});
