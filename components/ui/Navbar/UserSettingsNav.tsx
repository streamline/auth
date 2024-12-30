'use client';

import { useState } from 'react';
import s from './Navbar.module.css';
import Link from 'next/link';
import { FaUser } from 'react-icons/fa';

interface UserSettingsNavProps {
    user: any;
    router: any;
}

export default function UserSettingsNav({ user, router }: UserSettingsNavProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            {/* <span className='mr-2'>{user?.user_metadata?.full_name || user?.email}</span> */}
            <button onClick={toggleModal} className={`${s.link} w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center`}>
                <FaUser />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded-md shadow-lg">
                    <ul>
                        <li>
                            <div className="px-3 py-2 bg-white bg-opacity-10 text-sm">{user?.user_metadata?.full_name || user?.email}</div>
                        </li>
                        <li>
                            <Link href="/account" className="px-3 py-2 w-full block hover:bg-gray-200 hover:bg-opacity-10 transition-all ease-in-out duration-75">
                                Account Settings
                            </Link>
                        </li>
                        <li>
                            <Link href="/signin/logout" className="px-3 py-2 w-full block hover:bg-gray-200 hover:bg-opacity-10 transition-all ease-in-out duration-75">
                                Sign out
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
