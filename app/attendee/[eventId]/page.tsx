import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { AttendeeView } from "@/app/attendee/[eventId]/AttendeeView";
import { redirect } from "next/navigation";
import { updateMetric } from "@/app/analytics/[eventId]/update-metric";


export default async function Attendee({params: { eventId }}: {params: {eventId: string}}) {

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);


  const event = (await supabase
  .from('Events')
  .select()
  .eq('id', eventId)).data?.[0];

  const userId = event.entertainer_id;

  const [eventLinks, socials] = await Promise.all([
    supabase
  .from('EventsLinks')
  .select()
  .eq('event_id', eventId),
  supabase
  .from('Socials')
  .select('*, Users!inner(*)')
  .eq('Users.id', userId)
  ]);

  async function submitEmail(formData: FormData) {
    "use server"

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    await supabase.from("Emails").upsert({
      email: formData.get("email"),
      event_id: eventId
    });

    updateMetric(eventId, "email_submit_count");

    redirect(`/attendee/${event.id}?message=Submitted email!`)

  }


  updateMetric(eventId, "attendance_count");

  const eventLinksData = eventLinks.data
  const socialLinks = socials.data?.[0];
  const userName = socials.data?.[0].Users.username;

  return (
    <AttendeeView
      submitEmail={submitEmail}
      userName={userName}
      event={event}
      socialLinks={socialLinks}
      eventLinksData={eventLinksData}
    />
  )
}
