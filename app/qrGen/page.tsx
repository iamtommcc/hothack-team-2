import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Notes() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: Users } = await supabase.from("Users").select();

  console.log(console.log("users", await supabase.from("Users").select()));

  return <pre>{JSON.stringify(Users, null, 2)}</pre>;
}
