import speech from "@google-cloud/speech";

const client = new speech.SpeechClient();

export async function transcribeAudio(base64Audio: string): Promise<string | undefined> {
  const [response] = await client.recognize({
    audio: { content: base64Audio },
    config: {
      encoding: "LINEAR16",
      languageCode: "en-US",
    },
  });
  return response.results?.map(r => r.alternatives?.[0].transcript).join(" ");
}