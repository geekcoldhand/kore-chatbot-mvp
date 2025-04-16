import { transcribeAudio } from "../../../lib/speech";
export async function POST(req: Request): Promise<Response> {
  const { audio }: { audio: string } = await req.json();
  const transcript = await transcribeAudio(audio);
  return Response.json({ transcript });
}