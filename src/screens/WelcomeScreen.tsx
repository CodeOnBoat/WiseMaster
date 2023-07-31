import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import welcome from "../images/welcome.png";
import { RootStackParamList } from "../navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type props = NativeStackScreenProps<RootStackParamList, "Welcome", "">;

export default function WelcomeScreen({ navigation }: props) {
  return (
    <SafeAreaView className="flex-1 justify-around bg-white">
      <View className="space-y-2">
        <Text
          style={{ fontSize: wp(10) }}
          className="text-center font-bold text-gray-700"
        >
          Sapio
        </Text>
        <Text
          style={{ fontSize: wp(4) }}
          className="text-center tracking-wide text-gray-600 font-semibold"
        >
          The Future is here, powered by AI.
        </Text>
      </View>

      <View className="flex-row justify-center">
        <Image style={{ width: wp(75), height: wp(75) }} source={welcome} />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        className="bg-emerald-600 mx-5 p-4 rounded-2xl"
      >
        <Text
          style={{ fontSize: wp(6) }}
          className="text-center font-bold text-white"
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
