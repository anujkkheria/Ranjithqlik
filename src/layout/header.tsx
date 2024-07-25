"use client";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdLogout } from "react-icons/md";
import { redirect } from "next/navigation";
const Header = () => {
  const { data: user } = useSession();

  return (
    <div className="bg-white flex w-full h-auto text-primary shadow-sm p-1">
      <div className="flex-1">
        <Link href="/" className="cursor-pointer">
          <Image src="/logo.png" alt="logo" width={145} height={30} />
        </Link>
      </div>
      <div className="flex-[150px] flex-grow-0 flex-shrink-0 ">
        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer flex items-center gap-2 flex-grow-0 flex-shrink-0 ">
                <Avatar>
                  <AvatarFallback className="bg-primary text-secondary font-semibold uppercase">
                    {/* @ts-ignore */}
                    {user?.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <Label className="capitalize block text-ellipsis overflow-hidden whitespace-nowrap">
                  {/* @ts-ignore */}
                  {user?.name}
                </Label>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-52 flex gap-2 flex-col m-2 ">
              <div className="cursor-pointer flex items-center gap-2 flex-grow-0 flex-shrink-0 ">
                <Avatar>
                  <AvatarFallback className="bg-primary text-secondary font-semibold uppercase">
                    {/* @ts-ignore */}
                    {user?.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <Label className="capitalize block text-ellipsis overflow-hidden whitespace-nowrap">
                  {/* @ts-ignore */}
                  {user?.name}
                </Label>
              </div>
              <div
                onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                className="flex items-center border border-white px-2 py-1 rounded gap-2 hover:bg-red-50 hover:text-red-500 cursor-pointer hover:border-red-500"
              >
                <MdLogout />
                Logout
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default Header;
