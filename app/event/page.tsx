import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
const apiUrl = `https://api.qr-code-generator.com/v1/create?access-token=${process.env.QR_CODE_API_KEY}`;

async function getData() {
  const payload = {
    frame_name: "no-frame",
    qr_code_text: "https://www.google.com/",
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
  const data = await getData();
  const qrCodeImageUrl = data.image;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // const events = await supabase.from("Events").select();

  const events = {
    error: null,
        data: [{
        id: 1,
        name: 'An Event Name',
        event_date: '2024-01-31T19:00:00',
        location: 'The Valley',
        entertainer_id: 1,
        created_at: '2024-01-20T08:11:32+00:00'
      }]
  }

  const event = events.data?.filter((event, i) => event.id = Number(searchParams.id));
  console.log('event', event)

  const formatDate = (date: Date) => {
    let eventDate;
    const year = date?.toString().slice(0,4);
    const month = date?.toString().slice(5,7);
    const day = date?.toString().slice(8,10);
    const time = date?.toString().slice(11,16);
    eventDate = <div>{time}<br/>
      {day}/{month}/{year}
    </div>
    return eventDate;
  }

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
                  {event?.map((event, id) =>
                      <ul key={id}>
                        <li className="font-semibold">{event.name}</li>
                        <li className="font-semibold">Venue Name</li>
                        <li className="font-semibold">{formatDate(new Date(event.event_date))}</li>
                        <li className="font-semibold">{event.location}</li>
                      </ul>
                  )}
                <button className="text-left mt-4 p-2 border rounded-md bg-red-500 text-xs">
                  <Link
                    href="/create"
                    className="font-semibold my-6 items-center"
                  >
                    Edit
                  </Link>
                </button>
              </div>

              <div>
                <img className="p-4 font-semibold" src={qrCodeImageUrl}></img>
                <br />
                <button className="mt-4 p-2 border rounded-md bg-red-500 text-xs">
                  <Link href="/" className="font-semibold my-6 items-center">
                    Preview Attendee View
                  </Link>
                </button>
              </div>
            </div>
          </div>

          <hr />

          <div className="pb-8 text-center">
            <div className="font-semibold p-4">Total Engagement</div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label>Total Attendees</label>
                <br />
                <button className="mt-4 border rounded-md p-4 font-semibold">
                  12312
                </button>
              </div>

              <div>
                <label>Total Engagement</label>
                <br />
                <button className="mt-4 border rounded-md p-4 font-semibold">
                  2412424
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
