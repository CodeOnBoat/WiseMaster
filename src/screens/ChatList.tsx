import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import welcome from "../images/bot.png";
import { RootStackParamList } from "../navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { CharacterSelect } from "../components/CharacterSelect";

type Props = NativeStackScreenProps<RootStackParamList, "ChatList"> & {
  setSelectedCharacter: (i: number) => void;
};

export default function ChatList({ navigation, setSelectedCharacter }: Props) {
  const selectOne = (i: number) => {
    setSelectedCharacter(i);
    setTimeout(() => {
      navigation.navigate("ChatScreen");
    }, 200);
  };

  const backgroundRef = useRef(null);
  return (
    <SafeAreaView className="flex-1 justify-around bg-white dark:bg-black">
      <CharacterSelect setSelectedCharacter={selectOne} />
    </SafeAreaView>
  );
}
