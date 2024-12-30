"use client";

import type { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useState } from "react";
import { FaUser } from "react-icons/fa";

interface UserSettingsNavProps {
    user: User | null;
}

export function UserSettingsNav({ user }: UserSettingsNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative ml-4">
            {/* <span className='mr-2'>{user?.user_metadata?.full_name || user?.email}</span> */}
            <button
                onClick={toggleModal}
                className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center`}
            >
                <FaUser />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-800 rounded-md shadow-lg">
                    <ul>
                        {user ? (
                            <>
                                <li>
                                    <div className="px-3 py-2 bg-black text-white text-sm">
                                        {user?.user_metadata?.full_name || user?.email}
                                    </div>
                                </li>
                                <li>
                                    <Link
                                        href={`${process.env.NEXT_PUBLIC_AUTH_URL}/account`}
                                        className="px-3 py-2 w-full block hover:bg-gray-100 transition-all ease-in-out duration-75"
                                    >
                                        Account Settings
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={`${process.env.NEXT_PUBLIC_AUTH_URL}/signin/logout`}
                                        className="px-3 py-2 w-full block hover:bg-gray-100 transition-all ease-in-out duration-75"
                                    >
                                        Sign out
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <div className="px-3 py-2 bg-black text-white text-sm">Guest</div>
                                </li>
                                <li>
                                    <Link
                                        href={process.env.NEXT_PUBLIC_AUTH_URL || "/signin"}
                                        className="px-3 py-2 w-full block hover:bg-gray-100 transition-all ease-in-out duration-75"
                                    >
                                        Sign In
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default UserSettingsNav;
