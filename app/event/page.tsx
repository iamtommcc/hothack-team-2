import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
const apiUrl = `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QR_CODE_API_KEY}`;

async function getData(searchParams: { id: string }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const events = await supabase.from("Events").select().eq("id", searchParams.id)
  const event = events?.data?.[0];

  const payload = {
    frame_name: "no-frame",
    qr_code_text: `https://hothack-team-2.vercel.app/attendee/${event.id}`,
    image_format: "SVG",
    qr_code_logo: "scan-me-square",
  };

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const responseData = await res.arrayBuffer();
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(
    responseData
  ).toString("base64")}`;

  return { image: dataUrl };
}

export default async function Home({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const data = await getData(searchParams);
  const qrCodeImageUrl = data.image;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const events = await supabase.from("Events").select().eq("id", searchParams.id)
  const analytics = await supabase.from("Analytics").select().eq("event_id", searchParams.id).limit(1).single();
  const event = events?.data?.[0];

  console.log(analytics);
  const formatDate = (date: Date, time: string) => {
    let eventDate;

    const year = date?.toString().slice(11,15);
    const month = date?.toString().slice(4,7);
    const day = date?.toString().slice(8,10);
    const timing = time?.slice(0,5);
    eventDate =
        <div>
          {day} {month} {year}, {timing}
    </div>
    return eventDate;
  }

  console.log('events', events)

  // console.log('event', event)
  return (
    <>
      <Link
        href="/home"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back Home
      </Link>
      <div className="mx-auto mt-24 px-40 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none">
        <div className="">
          <div className="pb-8 text-center">
            <h2 className="font-semibold pb-4 text-2xl">Event Details</h2>
            <div className="grid grid-cols-2">
              <div className="text-left pl-10">
                <ul>
                  <li className="font-semibold text-xl">{event?.name}</li>
                  <li>{event?.venue} in {event?.location}</li>
                  <li>{formatDate(new Date(event?.event_date), event?.event_time)}</li>
                </ul>
                <Link
                    href="/create"
                    className="font-semibold items-center"
                >
                  <button className="text-left italic text-xs hover:text-gray-700">
                    Edit
                  </button>

                </Link>
            </div>

            <div className="max-w-xs">
              <img className="border font-semibold" src={qrCodeImageUrl}></img>
                <br />
              <Link href={`/attendee/${event.id}`} className="font-semibold my-6 items-center">
                <button className="mt-4 p-2 text-white rounded-md bg-brand">
                  Preview Attendee View
                </button>
              </Link>
            </div>
          </div>
        </div>

          <hr />

          <div className="pb-8 text-center">
            <div className="font-semibold p-4 text-2xl">Total Engagement</div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Total Attendees</label>
                <br/>
                <button className="mt-4 border rounded-md p-4 font-semibold">
                  {analytics.data.attendance_count}
                </button>
              </div>

              <div>
                <label>Link Clicks</label>
                <br/>
                <button className="mt-4 border rounded-md p-4 font-semibold">
                  {analytics.data.link_click_count}
                </button>
              </div>

              <div>
                <label>Email submissions</label>
                <br/>
                <button className="mt-4 border rounded-md p-4 font-semibold">
                  {analytics.data.email_submit_count}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
