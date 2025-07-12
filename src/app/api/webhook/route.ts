import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { env } from "@/lib/env";
import { streamClient } from "@/lib/stream-io";
import { CallSessionParticipantLeftEvent } from "@stream-io/node-sdk";
import { CallSessionStartedEvent } from "@stream-io/video-react-sdk";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamClient.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-signature");
  const apiKey = req.headers.get("x-api-key");

  if (!signature || !apiKey) {
    return NextResponse.json(
      {
        error: "Missing signature or api key",
      },
      { status: 400 }
    );
  }

  const body = await req.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: CallSessionStartedEvent | CallSessionParticipantLeftEvent;

  try {
    payload = JSON.parse(body);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  console.log(payload.type, payload.created_at, payload.session_id);

  if (payload.type === "call.session_started") {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meeting id" },
        { status: 400 }
      );
    }

    const [meetingData] = await db
      .select()
      .from(meetings)
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, "upcoming")));

    if (!meetingData) {
      return NextResponse.json(
        { error: "Meeting not found or already started" },
        { status: 400 }
      );
    }

    await db
      .update(meetings)
      .set({
        status: "active",
        startAt: new Date(),
      })
      .where(eq(meetings.id, meetingId));

    const [agentData] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, meetingData.agentId));

    if (!agentData) {
      return NextResponse.json({ error: "Agent not found" }, { status: 400 });
    }

    const call = streamClient.video.call("default", meetingId);
    const realtimeClient = await streamClient.video.connectOpenAi({
      call,
      openAiApiKey: env.OPENAI_API_KEY,
      agentUserId: agentData.id,
    });

    realtimeClient.updateSession({
      instructions: agentData.instructions,
    });
  } else if (payload.type === "call.session_participant_left") {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(":")[1];

    if (!meetingId) {
      return NextResponse.json(
        { error: "Missing meeting id" },
        { status: 400 }
      );
    }

    const call = streamClient.video.call("default", meetingId);
    await call.end();
  }

  return NextResponse.json({ status: "ok" }, { status: 200 });
}
