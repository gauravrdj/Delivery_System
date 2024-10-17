import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import { redirect } from "next/navigation";
import SigninPage from "../../components/SigninPage";


export default async function(){
  const session=await getServerSession(authOptions);
if(session?.user?.id){
    redirect('/dashboard');
}
return <SigninPage></SigninPage>
}