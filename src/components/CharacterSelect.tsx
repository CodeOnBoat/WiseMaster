import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import characters from "../content/characters";
import { Character } from "../content/types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const CharacterSelect = ({
  setSelectedCharacter,
}: {
  setSelectedCharacter: (i: number) => void;
}) => {
  return (
    <View className="flex justify-center items-center">
      {characters.map((character, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedCharacter(index)}
          className="p-4 flex justify-center items-center gap-3 border-2 border-gray-200 rounded-xl m-4"
          style={{ width: wp(80) }}
        >
          <View key={index} className="flex-row gap-2 rounded-full">
            <Image
              style={{ width: hp(15), height: hp(15) }}
              source={character.image}
              className="rounded-full"
            />
          </View>
          <Text className="text-gray-700 font-semibold text-3xl">
            {character.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
