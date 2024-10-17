"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { redirect } from "next/navigation";
import removeDriver from "../app/lib/actions/removeOnLogout";
export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={signIn} onSignout={async () => {
        
        const res = await removeDriver();
        if(res!=null){
        await signOut({callbackUrl: "http://localhost:3001/signin"});
        toast.success('See you soon😊')
        }
      }} user={session.data?.user} />
   </div>
  );
}