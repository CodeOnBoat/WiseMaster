import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

export type RootStackParamList = {
  Home: undefined;
  Welcome: undefined;
};

const option: NativeStackNavigationOptions = {
  headerShown: false,
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={option} initialRouteName="Welcome">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
