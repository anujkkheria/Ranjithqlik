import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = (await getServerSession()) || {};
  console.log(user);
  
  return user ? redirect("/app") : redirect("/auth/signin");
}
