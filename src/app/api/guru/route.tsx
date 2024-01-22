import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv()

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, "10 s"),
});

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { success } = await ratelimit.limit(body.userid);

  if (success) {
    return NextResponse.json(
      { message: "request succesful" + body.question },
      { status: 200 }
    )
  } else {
    return NextResponse.json(
      { message: "rate limited" },
      { status: 429 }
    )
  }
}
