import React, { useEffect, useRef } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Message } from "../content/types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

export const Messages = ({ messages }: { messages: Message[] }) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollToEnd = () => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd();
    }, 200);
  };
  const shareImage = (url: string) => {
    FileSystem.downloadAsync(
      url,
      FileSystem.documentDirectory + "image.png"
    ).then(({ uri }) => {
      Sharing.shareAsync(uri);
    });
  };

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  return (
    <ScrollView
      ref={scrollViewRef}
      bounces={false}
      className="space-y-4"
      showsVerticalScrollIndicator={false}
    >
      {messages.map((message, index) => {
        if (message.role == "assistant") {
          if (message.content.includes("https://")) {
            return (
              <View key={index} className="flex-row justify-start">
                <View
                  className="p-2 flex rounded-2xl bg-red-100 rounded-tl-none"
                  onTouchEnd={() => shareImage(message.content)}
                >
                  <Image
                    source={{ uri: message.content }}
                    className="rounded-2xl"
                    resizeMode="contain"
                    style={{ height: wp(60), width: wp(60) }}
                  />
                </View>
              </View>
            );
          } else {
            return (
              <View
                key={index}
                style={{ width: wp(70) }}
                className="bg-red-100 rounded-xl p-2 rounded-tl-none"
              >
                <Text>{message.content}</Text>
              </View>
            );
          }
        } else {
          return (
            <View key={index} className="flex-row justify-end">
              <View
                style={{ width: wp(70) }}
                className="bg-white rounded-xl p-2 rounded-tr-none"
              >
                <Text>{message.content}</Text>
              </View>
            </View>
          );
        }
      })}
    </ScrollView>
  );
};
