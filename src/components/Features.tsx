import { View, Text, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatGpt from "../images/chatgptIcon.png";
import Dalle from "../images/dalleIcon.png";
import SmartAI from "../images/smartaiIcon.png";

export default function Features() {
  return (
    <View style={{ height: hp(60) }} className="space-y-4">
      <Text
        style={{ fontSize: wp(6.5) }}
        className="font-semibold text-gray-700"
      >
        Features
      </Text>
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image source={ChatGpt} style={{ height: hp(4), width: hp(4) }} />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700"
          >
            ChatGPT
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="text-gray-700 font-medium"
        >
          An advanced language model capable of engaging conversations and
          content creation.
        </Text>
      </View>
      <View className="bg-purple-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image source={Dalle} style={{ height: hp(4), width: hp(4) }} />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700"
          >
            DALL-E
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="text-gray-700 font-medium"
        >
          Generates unique images from textual descriptions, marking a
          breakthrough in generative AI.
        </Text>
      </View>
      <View className="bg-cyan-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1">
          <Image source={SmartAI} style={{ height: hp(4), width: hp(4) }} />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700"
          >
            Smart AI
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.8) }}
          className="text-gray-700 font-medium"
        >
          A dynamic AI system that learns, adapts, and makes predictions based
          on analyzed data patterns.
        </Text>
      </View>
    </View>
  );
}
