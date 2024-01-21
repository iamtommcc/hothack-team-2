import { NextRequest, NextResponse } from "next/server";
import { updateMetric } from "@/app/analytics/[eventId]/update-metric";

export type Metric = "attendance_count" | "link_click_count" | "email_submit_count";

export async function GET(request: NextRequest, { params }: { params: { eventId: string } }
) {
  const url = new URL(request.url);

  const metric = url.searchParams.get("metric") as Metric;

  updateMetric(params.eventId, metric);

  return new NextResponse()
}


