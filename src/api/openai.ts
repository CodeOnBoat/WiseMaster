import axios from "axios";
import FormData from "form-data";
import { Message } from "../content/types";

export async function sendAudioToOpenAI(uri: string) {
  const form = new FormData();
  form.append("model", "whisper-1");
  form.append("file", {
    uri,
    name: "name.m4a",
    type: "audio/m4a",
  });

  return new Promise<string>((resolve, reject) => {
    axios
      .post("https://api.openai.com/v1/audio/transcriptions", form, {
        headers: {
          Authorization:
            "Bearer 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",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("User said: " + response.data.text);
        resolve(response.data.text);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function sendTextToOpenAI(messages: Message[]) {
  return new Promise<string>((resolve, reject) => {
    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          messages,
          model: "gpt-3.5-turbo",
        },
        {
          headers: {
            Authorization:
              "Bearer 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",
          },
        }
      )
      .then((response) => {
        resolve(response.data.choices[0].message.content);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function getImageFromOpenAI(prompt: string) {
  return new Promise<string>((resolve, reject) => {
    axios
      .post(
        "https://api.openai.com/v1/images/generations",
        {
          prompt: prompt,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            Authorization:
              "Bearer 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",
          },
        }
      )
      .then((response) => {
        console.log("Image url: " + response.data.data[0].url);
        resolve(response.data.data[0].url);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function checkKindOfPrompt(prompt: string) {
  return new Promise<string>((resolve, reject) => {
    sendTextToOpenAI([
      {
        role: "system",
        content: `Please, analyze the following message to find out if he is asking us to generate an image. For example if he uses the terms image, or defines an image that he wants to generate. this is the prompt : """${prompt}""" . Simply answer with a yes or no.`,
      },
    ])
      .then((response) => {
        console.log("Asks for image: " + response);
        resolve(response.toLowerCase().replace(/[^a-zA-Z ]/g, ""));
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export const upgradePrompt = (prompt: string) => {
  return new Promise<string>((resolve, reject) => {
    sendTextToOpenAI([
      {
        role: "system",
        content: `Make this user demand into a good prompt for image generation ${prompt}. Please use declarative sentences`,
      },
    ])
      .then((response) => {
        console.log("Upgraded prompt: " + response);
        getImageFromOpenAI(response)
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};
