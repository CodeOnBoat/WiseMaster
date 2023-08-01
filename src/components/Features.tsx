import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatGPT from "../images/chatgptIcon.png";
import DallE from "../images/dalleIcon.png";
import { Feature } from "./Feature";

export default function Features({
  features,
}: {
  features: {
    image: any;
    title: string;
    description: string;
    color: string;
  }[];
}) {
  useEffect(() => {}, []);
  return (
    <View style={{ height: hp(60) }} className="space-y-4">
      <Text
        style={{ fontSize: wp(6.5) }}
        className="font-semibold text-gray-700 text-center mb-4 dark:text-gray-300"
      >
        What can I do for you?
      </Text>
      {features.map((feature, index) => (
        <Feature feature={feature} key={index} />
      ))}
    </View>
  );
}
