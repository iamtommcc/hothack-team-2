import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { data } from "autoprefixer";

export default async function Create({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const readEvent = async (formData: FormData) => {
    "use server";
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("Events")
      .insert({
        name: formData.get("name"),
        venue: formData.get("venue_name"),
        event_date: formData.get("eventDate"),
        event_time: formData.get("eventTime"),
        location: formData.get("location"),
      })
      .select();
    console.log(data);
    redirect(`/event/${data[0]}`);
    return;
  };
  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
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
          Back
        </Link>

        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action={readEvent}
        >
          <h2 className="p-6 text-2xl font-semibold leading-7 text-center">
            Create A New Event
          </h2>

          <label className="text-md" htmlFor="password">
            Event Name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            name="name"
            placeholder=""
          />
          <label className="text-md" htmlFor="password">
            Venue Name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            name="venue_name"
            placeholder=""
          />
          <label className="text-md" htmlFor="email">
            Venue Date
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            name="eventDate"
            type="date"
            placeholder=""
          />
          <label className="text-md" htmlFor="email">
            Event Time
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            name="eventTime"
            type="time"
            placeholder=""
          />
          <label className="text-md" htmlFor="password">
            Venue Location
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            name="location"
            type="text"
            placeholder=""
          />
          <label className="text-md" htmlFor="password">
            Upload Media
          </label>
          <input
            className="py-2 bg-inherit mb-2"
            type="file"
            id="myfile"
            name="myfile"
          ></input>
          <button className="bg-gray-200 rounded-md px-4 py-2 text-foreground mb-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
