import React, { useEffect } from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const Feature = ({
  feature,
}: {
  feature: {
    image: ImageSourcePropType;
    title: string;
    description: string;
    color: string;
  };
}) => {
  useEffect(() => {
    console.log(feature);
  }, []);
  return (
    <View
      className={`bg-${feature.color}-500 p-4 rounded-xl space-y-2 mt-4`}
      style={{ backgroundColor: feature.color }}
    >
      <View className="flex-row items-center space-x-1">
        <Image source={feature.image} style={{ height: hp(4), width: hp(4) }} />
        <Text
          style={{ fontSize: wp(4.8) }}
          className="font-semibold text-gray-700"
        >
          {feature.title}
        </Text>
      </View>
      <Text style={{ fontSize: wp(3.8) }} className="text-gray-700 font-medium">
        {feature.description}
      </Text>
    </View>
  );
};
