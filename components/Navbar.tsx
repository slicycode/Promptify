"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiOutlineGithub } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();

  const socialAction = (action: string) => {
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/");
        }
      })
      .finally(() => setToggleDropdown(false));
  };

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptify Logo"
          width={30}
          height={30}
          className="object-contain pointer-events-none"
        />
        <p className="logo_text">Promptify</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        <Link
          href="https://github.com/slicycode/Promptify"
          className="mr-4 hover:text-gray-700 group relative"
          target="_blank"
        >
          <AiOutlineGithub size={37} />
          <span className="tooltip top-10 -left-[18px]">Repository</span>
        </Link>
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button
              type="button"
              onClick={() => signOut()}
              className="outline_btn"
            >
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user?.image as string}
                width={37}
                height={37}
                alt="Profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : status === "loading" ? (
          <div className="px-7 py-1.5">
            <Image
              src="/assets/icons/loader.svg"
              width={24}
              height={24}
              alt="loader"
              className="object-contain"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => socialAction("google")}
            className="black_btn"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        <Link
          href="https://github.com/slicycode/Promptify"
          className="mr-4 hover:text-gray-700 relative group"
          target="_blank"
        >
          <AiOutlineGithub size={37} />
          <span className="tooltip top-10 -left-[18px]">Repository</span>
        </Link>
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image as string}
              width={37}
              height={37}
              alt="Profile"
              className="rounded-full cursor-pointer"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : status === "loading" ? (
          <div className="px-7 py-1.5">
            <Image
              src="/assets/icons/loader.svg"
              width={24}
              height={24}
              alt="loader"
              className="object-contain"
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => socialAction("google")}
            className="black_btn"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
