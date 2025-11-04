"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const Links = [
    {
        id: 1,
        name: "Home",
        href: "/"
    },
    {
        id: 2,
        name: "About",
        href: "/about"
    },
    {
        id: 3,
        name: "Cards",
        href: "/cards"
    },
    {
        id: 4,
        name: "Leaderboard",
        href: "/leaderboard"
    },
]

const Navbar = () => {
    const pathname = usePathname();




    return (
        <div className='container w-full rounded-lg py-5 px-5 shadow-lg mx-auto mt-5 flex items-center justify-between sticky top-5 border bg-white/50 backdrop-blur-lg'>
            <ul className='flex gap-2 text-xs items-center ' style={{ fontFamily: "Supercell Magic" }}>
                {Links.map(link => (
                    <li key={link.id} className={`hover:text-secondary transition-all ${pathname === link.href ||
                        (pathname.startsWith(link.href) && link.href !== "/") ? "text-secondary/70 font-bold" : "text-black/70"}`}>
                        <Link href={link.href}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <div className="w-full flex items-center justify-end">
                <Input type="text" placeholder='Enter Player Tag' className='w-full md:w-1/3' />
                <Button className='ml-2'>Search</Button>
            </div>
        </div>
    )
}

export default Navbar