"use client";

import Image from "next/image";
import artistPhoto from "@/app/attendee/images/pexels-photo-167636.jpeg";
import spotify from "@/app/attendee/images/spotify.png";
import soundcloud from "@/app/attendee/images/soundcloud.png";
import instagram from "@/app/attendee/images/instagram.png";
import youtube from "@/app/attendee/images/youtube.png";
import facebook from "@/app/attendee/images/facebook.png";
import { Metric } from "@/app/analytics/[eventId]/route";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function AttendeeView({event, userName, socialLinks, eventLinksData, submitEmail }: any) {
  const searchParams = useSearchParams()

  const [email, setEmail] = useState<string>();

  function sendAnalyticsEvent(eventId: string, metric: Metric) {
    fetch(`/analytics/${eventId}?metric=${metric}`);
  }

  function onLinkClick() {
    sendAnalyticsEvent(event.id, "link_click_count");
  }

  return <>
    <div className="flex-1 flex flex-col w-full px-8 justify-center p-12 gap-8 ">

      {searchParams.get("message") ? <div>{searchParams.get("message")}</div> : null}

      <div className="flex justify-center">
        <Image
          className="w-full rounded-lg md:max-w-lg"
          src={artistPhoto}
          width={200}
          height={200}
          alt="Artist Photo"
        />
      </div>

      <div className="flex flex-col gap-2 justify-start md:items-center">
        <h2 className="text-4xl font-bold">{userName}</h2>
        {event ? (
          <>
            <h2 className="text-3xl font-bold">{event.name}</h2>
            <div className="flex flex-row">
              <h2 className="text-2xl font-bold">{event.venue}</h2>
              {event.location ? (
                <h2 className="text-2xl font-bold">&nbsp;- {event.location}</h2>
              ): null}
            </div>
          </>
        ): null}
      </div>

      <div className="flex flex-col gap-4 md:items-center md:justify-center">
        <h2 className="text-xl text-left md:text-center">Sign up to my newsletter!</h2>
        <form action={submitEmail} className="flex flex-row gap-3 md:items-center">
          <input value={email} onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:shadow-outline" name="query" type="email" placeholder="youremail@address.com" />
          <button className=" hover:bg-blue-500 hover:text-white border-2 border-blue-500 border-solid text-blue-500 font-bold py-2 px-4 rounded-full sm:max-w-full md:w-6/12 dark:text-white" type="submit">Submit</button>
        </form>
      </div>

      <div className="flex flex-col gap-2 justify-start md:items-center">
        <h2 className="text-2xl font-bold">Socials</h2>
        <div className="flex flex-row flex-wrap gap-2 justify-start items-center">
          {socialLinks ? (
            <>
              {socialLinks.spotify_url ? (
                <a href={socialLinks.spotify_url} onClick={onLinkClick} target={"_blank"}>
                  <Image src={spotify} style={{ width: 40, height: 40 }} alt="spotify" />
                </a>
              ): null }
              {socialLinks.soundcloud_url ? (
                <a href={socialLinks.soundcloud_url} onClick={onLinkClick} target={"_blank"}>
                  <Image src={soundcloud} style={{ width: 50, height: 50 }} alt="soundcloud" />
                </a>
              ): null }
              {socialLinks.instagram_url ? (
                <a href={socialLinks.instagram_url} onClick={onLinkClick} target={"_blank"}>
                  <Image src={instagram} style={{ width: 40, height: 40 }} alt="instagram" />
                </a>
              ): null }
              {socialLinks.youtube_url ? (
                <a href={socialLinks.youtube_url} onClick={onLinkClick} target={"_blank"}>
                  <Image src={youtube} style={{ width: 50, height: 50 }} alt="youtube" />
                </a>
              ): null }
              {socialLinks.facebook_url ? (
                <a href={socialLinks.facebook_url} onClick={onLinkClick} target={"_blank"}>
                  <Image src={facebook} style={{ width: 40, height: 40 }} alt="facebook" />
                </a>
              ): null }
            </>
          ) : null}
        </div>
      </div>

      {eventLinksData && eventLinksData.length > 0 && (
        <div className="button-wrapper flex flex-col gap-3 text-center md:items-center">
          {eventLinksData.map((button: any, index: any) => (
            <a key={index} href={button.link} onClick={onLinkClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full sm:max-w-full md:w-6/12" target="_blank">
              {button.label}
            </a>
          ))}
        </div>
      )}
    </div>
  </>
}
