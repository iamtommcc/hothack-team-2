import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { cookies } from "next/headers";
import SignUpPage from "./signup/page";
import LoginPage from "./login/page";

export default async function Index({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const cookieStore = cookies();

  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient(cookieStore);
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <main className="flex-1 flex flex-col gap-6">
      {isSupabaseConnected ? (
        <SignUpPage />
      ) : (
        <LoginPage searchParams={searchParams} />
      )}
    </main>
  );
}
