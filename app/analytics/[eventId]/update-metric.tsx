import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Metric } from "@/app/analytics/[eventId]/route";

export async function updateMetric(eventId: string, metric: Metric) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const currentAnalytics = await
    supabase
      .from("Analytics")
      .select()
      .eq("event_id", eventId)
      .limit(1)
      .single();


  if (currentAnalytics?.data?.id) {
    await supabase.from("Analytics").update({
      [metric]: (currentAnalytics?.data?.[metric] || 0) + 1
    }).eq("id", currentAnalytics?.data?.id);
  } else {
    await supabase.from("Analytics").insert({
      event_id: eventId,
      attendance_count: 1
    })
  }
}
