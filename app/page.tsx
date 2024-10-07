import { createClient } from "@/utils/supabase/server";
import LandingPage from "./(landing)/landingPage";
import DashBoardUI from "./(dashboard)/dash";
import SetUserNamePage from "./(setusername)/setuser";

async function checkUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

async function checkUserAvailable(userid: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('userData')
    .select('uuid')
    .eq('uuid', userid)
  if (error || data.length == 0) {
    return false;
  }
  return true;
}

export default async function MainPage() {
  const user = await checkUser();

  if (user) {
    const check = await checkUserAvailable(user.id);
    if (check) {
      return <DashBoardUI userId={user.id}/>
    } else {
      return <SetUserNamePage userId={user.id} />
    }
  }
  return <LandingPage />;
}