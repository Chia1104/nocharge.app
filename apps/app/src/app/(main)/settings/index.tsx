import { View, StyleSheet } from "react-native";

import { Settings } from "@/containers/settings";

const SettingsPage = () => {
  return (
    <View style={styles.container}>
      <Settings />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default SettingsPage;
