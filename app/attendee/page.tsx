import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
// import './attendee-page.css'
import Image from 'next/image'
import artistPhoto from './images/pexels-photo-167636.jpeg'
import instagram from './images/instagram.png'
import youtube from './images/youtube.png'
import facebook from './images/facebook.png'

export default async function Login() {
 
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data, error } = await supabase
  .from('Users')
  .select()

  // const thisUser = data.filter(user => user.id === searchParams.message)

  let userData = {
    userName: "User Name",
    buttonLinks: [
      {
        text: "Engagement Button",
        url: "https://www.google.com"
      },
      {
        text: "Engagement Button",
        url: "https://www.google.com"
      },
      {
        text: "Engagement Button",
        url: "https://www.google.com"
      },
      {
        text: "Engagement Button",
        url: "https://www.google.com"
      }
    ],
    socials: [
      {
        text: "",
        url: ""
      }
    ]
  }
  
  let eventData = {
    eventName: "Event Name",
    artistName: "Artist Name",
  }

  return (

    <>
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center p-12 gap-8 blue-50">
    
      {/* <h1>{data.username}</h1> */}
      <div>
      <Image
      className="w-full rounded-lg"
        src={artistPhoto}
        width={200}
        height={200}
        alt="Artist Photo"
      />
      </div>

      <div className="flex flex-col gap-2 justify-start">
        <h2 className="text-4xl font-bold" >{eventData.artistName}</h2>
        <h2 className="text-3xl font-bold">event name</h2>
      </div>
      <div className="button-wrapper flex flex-col gap-3 text-center">
        { userData.buttonLinks.map(button => 
          <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" target="_blank">{button.text}
            <button >
            </button>
          </a>
        )}
      </div>
      <>
      <div className="flex flex-col gap-2 justify-start">
        <h2 className="text-2xl font-bold">Socials</h2>
        <div className="flex flex-row flex-wrap gap-2 justify-start items-center">
          <a href="#">
          <Image src={instagram} style={{width: 40,height:40}}  alt="instagram"  />  
          </a>
          <a href="#">
          <Image src={youtube} style={{width: 50,height:50}}  alt="youtube"  />
          </a>
          <a href="#">
            <Image src={facebook} style={{width: 40,height:40}} alt="facebook"  />
          </a>
        </div>
      </div>
      </>

      </div>
    </>
  )
}
