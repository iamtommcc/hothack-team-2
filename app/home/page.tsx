import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function Home({
     searchParams,
     }: {
    searchParams: { message: string };
}) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const events = await supabase.from("Events").select();

    let pastEvents: any[] = [];
    let futureEvents: any[] = []

    const checkDateFutureTrue = (event: any, date: Date) => {
        if (date.getTime() > Date.now()) {
            futureEvents.push(event);
        } else {
            pastEvents.push(event);
        }
    }

    events.data?.forEach((event, i) => {
        checkDateFutureTrue(event, new Date(events.data?.[i].event_date));
    });

    const formatDate = (date: Date, time?: string) => {
        let eventDate;

        const year = date?.toString().slice(0,4);
        const month = date?.toString().slice(5,7);
        const day = date?.toString().slice(8,10);
        const timing = time?.slice(0,5);
        eventDate = <div>
            {timing && (<>{timing}<br/></>)}
            {day}/{month}/{year}
                </div>
        return eventDate;
    }

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-3 gap-4 space-y-8">
            <div className="flex flex-col items-center justify-center">
                <Link href='/create' className="border rounded-md p-4 font-semibold my-6 flex flex-col items-center">Create A New Event</Link>
            </div>
            <hr/>
            <div>
                <h2 className="font-semibold p-2">Upcoming Events</h2>
                <div className="grid grid-cols-5 gap-3">
                    {futureEvents.map((event, id) =>
                        <button key={id} type="button" className="border rounded-md p-4 font-semibold">
                            <Link href={`/event?id=1`}>
                                {event.name}<br/>
                                {event.venue && (<>{event.venue}<br/></>)}
                                {event.location && (<>{event.location}<br/></>)}
                                {formatDate(event.event_date, event?.event_time)}
                            </Link>
                        </button>
                    )}
                </div>
            </div>
            <div className="">
                <h2 className="font-semibold pb-2">Past Events</h2>
                <div className="grid grid-cols-5 gap-3">
                    {pastEvents.map((event, id) =>
                        <button key={id} className="border rounded-md p-4 font-semibold">
                            <Link href={`/event?${id}`}>
                                {event.name}<br/>
                                {event.venue && (<>{event.venue}<br/></>)}
                                {event.location && (<>{event.location}<br/></>)}
                                {formatDate(event.event_date, event?.event_time)}
                            </Link>
                        </button>
                    )}
                </div>
            </div>
            <div className="font-semibold">Total Engagement</div>
            <div className="grid grid-cols-2 gap-4">
                <button className="border rounded-md p-4 font-semibold">Data</button>
                <button className="border rounded-md p-4 font-semibold">Data</button>
            </div>
        </div>
    );
}
