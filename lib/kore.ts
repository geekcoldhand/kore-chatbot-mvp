import axios from "axios";

export async function sendMessageToKore(text: string): Promise<any> {
  const response = await axios.post(
    "https://bots.kore.ai/api/v1.1/rest/botRuntime/YOUR_BOT_ID/dialog",
    { message: { text } },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.KORE_BOT_TOKEN}`,
      },
    }
  );
  return response.data;
}