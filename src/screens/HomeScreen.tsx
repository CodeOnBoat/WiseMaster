import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { Image, SafeAreaView, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import bot from "../images/bot.png";
import Features from "../components/Features";

export const HomeScreen = () => {
  const [messages, setMessages] = useState([]);
  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
          <Image source={bot} style={{ height: hp(15), width: hp(15) }} />
        </View>
        {messages.length > 0 ? <View></View> : <Features />}
      </SafeAreaView>
    </View>
  );
};
