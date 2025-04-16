import { sendMessageToKore } from "@/lib/kore";
export async function POST(req: Request): Promise<Response> {
  const { text }: { text: string } = await req.json();
  const response = await sendMessageToKore(text);
  return Response.json(response);
}