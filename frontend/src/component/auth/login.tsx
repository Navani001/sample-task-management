"use client";

// library imports
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ButtonComponent } from "@/component/button";

export function SignIn() {
   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            signIn("credentials", {
                username,
                password,
                redirectTo:"/"
            })
        } catch (error) {
            // handle error state here
            console.error("Error during sign-in", error);
            setError("Internal server error");
        }
    };

    return (
        <div className="mx-auto w-[200px] h-full bg-primary-foreground">
            <div>
                <p className="text-xl w-full flex justify-center mt-3 mb-5">Sign In</p>
                <form onSubmit={handleSubmit}>
                    <label>
                        email:
                        <input
                            type="text"
                            className="w-full rounded-sm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            className="w-full rounded-sm"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <ButtonComponent
                        buttonText="Sign In"
                        ButtonVariant="solid"
                        bgColor="bg-teal-500"
                        type="submit"
                        isIcon={false}
                        baseClassName="w-full mt-3 rounded-md"
                        textClassName="text-white"
                    />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                </form>
            </div>
            
           
        </div>
    );
}