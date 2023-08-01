import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import RecordingIcon from "../images/recordingIcon.png";
import VoiceLoading from "../images/voiceLoading.gif";
import Loading from "../images/loading.gif";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Features from "../components/Features";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { Recording } from "expo-av/build/Audio";
import {
  checkKindOfPrompt,
  sendAudioToOpenAI,
  sendTextToOpenAI,
  upgradePrompt,
} from "../api/openai";
import * as Speech from "expo-speech";
import { Messages } from "../components/Messages";
import { Character, Message } from "../content/types";
import Left from "../images/left.png";



export const ChatScreen = ({ character }: { character: Character }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [recording, setRecording] = useState<Recording>();
  const [speaking, setSpeaking] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);

  useEffect(() => {
    speak(character.welcomeMessage);
  }, []);

  const clear = () => {
    setMessages([]);
    setMessageLoading(false);
  };

  const stopSpeaking = () => {
    setSpeaking(false);
    Speech.stop();
  };

  const startRecording = async () => {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
    });
    const { recording } = await Audio.Recording.createAsync(
      Audio.RecordingOptionsPresets.HIGH_QUALITY
    );
    setRecording(recording);
  };
  async function stopRecording() {
    setRecording(undefined);
    await recording!.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording!.getURI();
    sendAudioToOpenAI(uri!).then((response) => {
      setMessageLoading(true);

      const newMessages = [...messages, { role: "user", content: response }];
      setMessages(newMessages);
      checkKindOfPrompt(response).then((kind) => {
        if (kind === "no") {
          sendTextToOpenAI([
            {
              role: "system",
              content: character.prompt,
            },
            ...newMessages,
          ]).then((completion) => {
            setMessages([
              ...newMessages,
              { role: "assistant", content: completion },
            ]);

            setMessageLoading(false);
            speak(completion);
          });
        } else {
          upgradePrompt(response).then((image) => {
            setMessages([
              ...newMessages,
              { role: "assistant", content: image },
            ]);
            setMessageLoading(false);
            speak("Aqui tienes un imagen, ha sido un placer ayudarte de nuevo");
          });
        }
      });
    });
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
  }

  const speak = async (botMessage: string) => {
    const messageWithOutEmojis = botMessage.replace(
      /[\u{1F600}-\u{1F64F}]/gu,
      ""
    );
    setSpeaking(true);
    Speech.speak(messageWithOutEmojis, {
      pitch: 1,
      volume: 1,
      rate: 1.1,
      onDone: function () {
        setSpeaking(false);
      },
      voice: "com.apple.speech.synthesis.voice.Princess",
    });
  };

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView className="flex-1 flex mx-5 justify-center">

        <View className="flex-row justify-center">
          <View
            className={
              "w-fit h-fit mt-6 rounded-full border-4 border-transparent" +
              (speaking ? " border-red-200" : "")
            }
          >
            <Image
              source={character.image}
              className="p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 "
              style={{
                width: hp(15),
                height: hp(15),
              }}
            />
          </View>
        </View>
        {messages.length > 0 ? (
          <View className="space-y-2 flex-1">
            <Text
              style={{ fontSize: wp(5) }}
              className="text-gray-700 font-semibold ml-1 text-center"
            >
              {character.name}
            </Text>
            <View
              style={{ height: hp(58) }}
              className="bg-neutral-200 rounded-3xl p-4"
            >
              <Messages messages={messages} />
            </View>
          </View>
        ) : (
          <Features features={character.features} />
        )}
        <View className="flex justify-center items-center">
          {messageLoading ? (
            <Image
              className="rounded-full"
              source={Loading}
              style={{ width: hp(10), height: hp(10) }}
            />
          ) : recording ? (
            <TouchableOpacity onPress={stopRecording}>
              <Image
                className="rounded-full"
                source={VoiceLoading}
                style={{ width: hp(10), height: hp(10) }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                className="rounded-full"
                source={RecordingIcon}
                style={{ width: hp(10), height: hp(10) }}
              />
            </TouchableOpacity>
          )}
          {messages.length > 0 && (
            <TouchableOpacity
              className="bg-neutral-400 rounded-3xl  p-2 absolute right-10"
              onPress={clear}
            >
              <Text className="text-white font-semibold">Clear</Text>
            </TouchableOpacity>
          )}
          {speaking && (
            <TouchableOpacity
              className="bg-red-400 rounded-3xl  p-2 absolute left-10"
              onPress={stopSpeaking}
            >
              <Text className="text-white font-semibold">Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};
