import { Text, TouchableOpacity, useColorScheme } from "react-native";
import AppNavigation from "./src/navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  let colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <AppNavigation />
    </SafeAreaProvider>
  );
}
