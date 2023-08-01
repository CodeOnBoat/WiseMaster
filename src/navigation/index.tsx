import { NavigationContainer } from "@react-navigation/native";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Character } from "../content/types";
import ChatList from "../screens/ChatList";
import { useEffect, useState } from "react";
import { ChatScreen } from "../screens/ChatScreen";
import characters from "../content/characters"

export type RootStackParamList = {
  ChatScreen: undefined;
  ChatList: { setSelectedCharacter: (i: number) => void };
};

const option: NativeStackNavigationOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: "white" },
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigation() {
  const [character, setCharacter] = useState<Character | null>(null);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={option} initialRouteName="ChatList">
        {character && (
          <Stack.Screen name="ChatScreen">
            {(props) => <ChatScreen {...props} character={character} />}
          </Stack.Screen>
        )}
        <Stack.Screen name="ChatList">
          {(props) => (
            <ChatList
              {...props}
              setSelectedCharacter={(i: number) => setCharacter(characters[i])}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
