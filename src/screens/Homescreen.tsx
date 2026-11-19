import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";

import Profile from "../components/Profile";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Profile />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1226",
  },
});
