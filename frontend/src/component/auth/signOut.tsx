"use client"
import { signOut } from "next-auth/react"
import { MdLogout } from "react-icons/md"
import { ButtonComponent } from "@/component/button"

export function SignOut() {
    return (
        <ButtonComponent
            buttonText="Sign Out"
            buttonIcon={<MdLogout className="h-4 w-4" />}
            handleOnClick={() => signOut()}
            ButtonVariant="solid"
            bgColor="bg-gray-800"
            textClassName="text-white"
            iconClassName="text-white"
            baseClassName="rounded-lg gap-1"
        />
    )
}