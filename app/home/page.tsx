import Link from "next/link";

export default function Home({
     searchParams,
     }: {
    searchParams: { message: string };
}) {
    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-3 gap-4 space-y-8">
            <div className="flex flex-col items-center justify-center">
            <Link href='/create' className="border rounded-md p-4 font-semibold my-6 flex flex-col items-center">+ Create a new QR</Link>
            </div>
            <hr className=""/>
            <div className="">
                <h2 className="font-semibold p-2">Upcoming Events</h2>
                <div className="grid grid-cols-5 gap-3">
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                </div>
            </div>
            <div className="">
                <h2 className="font-semibold pb-2">Past Events</h2>
                <div className="grid grid-cols-5 gap-3">
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
                    <button className="border rounded-md p-4 font-semibold">Event</button>
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
