import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from 'next/image'
import artistPhoto from '../images/pexels-photo-167636.jpeg'
import instagram from '../images/instagram.png'
import youtube from '../images/youtube.png'
import facebook from '../images/facebook.png'
import spotify from '../images/spotify.png'
import soundcloud from '../images/soundcloud.png'


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




const eventLinksData = eventLinks.data
const socialLinks = socials.data?.[0];
const userName = socials.data?.[0].Users.username;

return (

    <>
      <div className="flex-1 flex flex-col w-full px-8 justify-center p-12 gap-8 ">
    
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
        {event > 0 && (
        <>
          <h2 className="text-3xl font-bold">{event.name}</h2>
          <h2 className="text-2xl font-bold">{event.location}</h2>
        </>
      )}
      </div>

      <div className="flex flex-col gap-4 md:items-center md:justify-center">
        <h2 className="text-xl text-left md:text-center">Sign up to my newsletter!</h2>
        <form className="flex flex-row gap-3 md:items-center">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:shadow-outline" name="query" type="email" placeholder="youremail@address.com" />
          <button className=" hover:bg-blue-500 hover:text-white border-2 border-blue-500 border-solid text-blue-500 font-bold py-2 px-4 rounded-full sm:max-w-full md:w-6/12 dark:text-white" type="submit">Submit</button>
        </form>
      </div>

      <div className="flex flex-col gap-2 justify-start md:items-center">
  <h2 className="text-2xl font-bold">Socials</h2>
  <div className="flex flex-row flex-wrap gap-2 justify-start items-center">
  {socialLinks ? (
    <>
      {socialLinks.spotify_url ? (
        <a href={socialLinks.spotify_url}>
          <Image src={spotify} style={{ width: 40, height: 40 }} alt="spotify" />
        </a>
      ): null }
      {socialLinks.soundcloud_url ? (
        <a href={socialLinks.soundcloud_url}>
          <Image src={soundcloud} style={{ width: 50, height: 50 }} alt="soundcloud" />
        </a>
      ): null }
      {socialLinks.instagram_url ? (
        <a href={socialLinks.instagram_url}>
          <Image src={instagram} style={{ width: 40, height: 40 }} alt="instagram" />
        </a>
      ): null }
      {socialLinks.youtube_url ? (
        <a href={socialLinks.youtube_url}>
          <Image src={youtube} style={{ width: 50, height: 50 }} alt="youtube" />
        </a>
      ): null }
      {socialLinks.facebook_url ? (
        <a href={socialLinks.facebook_url}>
          <Image src={facebook} style={{ width: 40, height: 40 }} alt="facebook" />
        </a>
      ): null }
    </>
  ) : null}
  </div>
</div>

  {eventLinksData && eventLinksData.length > 0 && (
    <div className="button-wrapper flex flex-col gap-3 text-center md:items-center">
      {eventLinksData.map((button, index) => (
        <a key={index} href={button.link} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full sm:max-w-full md:w-6/12" target="_blank">
          {button.label}
        </a>
      ))}
    </div>
  )}
</div>
</>
)
}
