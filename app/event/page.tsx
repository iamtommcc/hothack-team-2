import Link from "next/link";

export default function Home({
                                 searchParams,
                             }: {
    searchParams: { message: string };
}) {
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
                <polyline points="15 18 9 12 15 6"/>
            </svg>
            Back Home
        </Link>
        <div
            className="mx-auto mt-24 px-40 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none grid-cols-2">
            <div className="">
                <div className="pb-8 text-center">
                    <h2 className="font-semibold pb-4 text-2xl">Event Details</h2>
                    <div className="grid grid-cols-2">
                        <div className="text-left pl-10">
                            <ul>
                                <li className="font-semibold">Event Name</li>
                                <li className="font-semibold">Venue Name</li>
                                <li className="font-semibold">Date</li>
                                <li className="font-semibold">Location</li>
                            </ul>

                            <button
                                className="text-left mt-4 p-2 border rounded-md bg-red-500 text-xs">
                                <Link href='/create'
                                      className="font-semibold my-6 items-center">Edit</Link>
                            </button>
                        </div>

                        <div>
                            <button className="p-4 font-semibold">QR CODE HERE</button><br/>
                            <button className="mt-4 p-2 border rounded-md bg-red-500 text-xs">
                                <Link href='/' className="font-semibold my-6 items-center">Preview Attendee View</Link>
                            </button>
                        </div>
                    </div>
                </div>

                <hr/>

                <div className="pb-8 text-center">
                <div className="font-semibold p-4">Total Engagement</div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Total Attendees</label><br/>
                        <button className="mt-4 border rounded-md p-4 font-semibold">12312</button>
                    </div>

                    <div>
                        <label>Total Engagement</label><br/>
                        <button className="mt-4 border rounded-md p-4 font-semibold">2412424</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
