import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from 'next/image'
import artistPhoto from './images/pexels-photo-167636.jpeg'
import instagram from './images/instagram.png'
import youtube from './images/youtube.png'
import facebook from './images/facebook.png'
import spotify from './images/spotify.png'
import soundcloud from './images/soundcloud.png'


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
      <div className="flex-1 flex flex-col w-full px-8 justify-center p-12 gap-8 ">
    
      {/* <h1>{data.username}</h1> */}
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
        <h2 className="text-4xl font-bold" >{eventData.artistName}</h2>
        <h2 className="text-3xl font-bold">Event name</h2>
      </div>

      <div className="flex flex-col gap-4 md:items-center md:justify-center">
        <h2 className="text-xl text-left md:text-center">Sign up to my newsletter!</h2>
        <form className="flex flex-col gap-3 md:items-center">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline focus:shadow-outline" name="query" type="email" placeholder="email@address.com" />
          <button className=" hover:bg-blue-500 hover:text-white border-2 border-blue-500 border-solid text-blue-500 font-bold py-2 px-4 rounded-full sm:max-w-full md:w-6/12" type="submit">Submit</button>
        </form>
      </div>

      <div className="flex flex-col gap-2 justify-start md:items-center">
        <h2 className="text-2xl font-bold">Socials</h2>
        <div className="flex flex-row flex-wrap gap-2 justify-start items-center">
          <a href="#">
            <Image src={spotify} style={{width: 40,height:40}} alt="spotify"  />  
          </a>
          <a href="#">
            <Image src={soundcloud} style={{width: 50,height:50}}  alt="soundcloud"  />  
          </a>
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

      <div className="button-wrapper flex flex-col gap-3 text-center md:items-center">
        { userData.buttonLinks.map(button => 
          <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full sm:max-w-full md:w-6/12" target="_blank">{button.text}
          </a>
        )}
      </div>
  

      </div>
    </>
  )
}
