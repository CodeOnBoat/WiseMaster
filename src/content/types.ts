import { ImageSourcePropType } from "react-native";

export type Message = {
  role: string;
  content: string;
};

export type Character = {
  name: string;
  prompt: string;
  features: {
    image: ImageSourcePropType;
    title: string;
    description: string;
    color: string;
  }[];
  welcomeMessage: string;
  image: ImageSourcePropType;
};
