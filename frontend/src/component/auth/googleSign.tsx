"use client"
import { signIn } from "next-auth/react";
import { ButtonComponent } from "@/component/button";

export function GoogleSign() {
    return (
        <ButtonComponent
            buttonText="Login with Google"
            handleOnClick={() => signIn("google")}
            ButtonVariant="light"
            isIcon={false}
            textClassName="font-poppins"
        />
    );
}

