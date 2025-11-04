"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import headerimg from "@/public/assets/header-bg.webp"
import { Button } from './ui/button'
import Link from 'next/link'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { useGlobalStore } from '@/store/useGlobalStore'
// import { Bounce, toast } from 'react-toastify'
import headerPng from "@/public/assets/header-png.png"
import { toast } from 'sonner'

const Header = () => {

    const initialTag = typeof window !== 'undefined'
        ? localStorage.getItem('Tag') || ''
        : ''

    const { userTag, setUserTag } = useGlobalStore();
    const [userInputTag, setUserInputTag] = useState(initialTag);


    const handelAddUserTag = async () => {
        if (userInputTag && userInputTag.length > 2 && userInputTag !== "#YOURTAG" && userInputTag.startsWith("#")) {
            await setUserTag(userInputTag);
            toast.success("User tag set successfully!", { position: 'top-center' });
        } else {
            toast.error("Please enter a valid tag", { description: "Tag must start with # and not be #YOURTAG", position: 'top-center' });
        }

        console.log(userTag);

    }

    return (
        <div className='w-full h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-5 relative ' style={{ backgroundAttachment: "fixed", backgroundImage: `linear-gradient(0deg,rgba(17, 24, 39, 0.9) 0%, rgba(30, 64, 175, 0.9) 100%) , url(${headerPng.src})` }}>
            <div className="flex flex-col gap-2 justify-self-center ">
                <h1 className='text-4xl text-secondary' style={{ fontFamily: "Supercell Magic" }}>RoyalDeck</h1>
                <p className='text-start text-white font-bold text-md mb-4'>Track players, explore best decks,  and <br /> analyze your battles.</p>
                <Dialog >
                    <DialogTrigger asChild>
                        <Button>Set Your Tag</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Set Your Tag
                            </DialogTitle>
                            <DialogDescription>
                                Set your Clash Royale player tag to get personalized stats and deck recommendations.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center gap-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="link" className="sr-only">
                                    Link
                                </Label>
                                <Input
                                    id="link"
                                    onChange={(e) => setUserInputTag(e.target.value)}
                                    value={userInputTag}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                    Close
                                </Button>
                            </DialogClose>
                            <Button onClick={handelAddUserTag}>Save</Button>
                        </DialogFooter>
                    </DialogContent>

                </Dialog>
            </div>
            <Image src="/assets/LOGO.png" className='select-none justify-self-center' alt="logo" width={500} height={500} />

            <Image src="/assets/prance.png" alt='prance' className='absolute -bottom-5 right-10 drop-shadow-2xl' width={250} height={250} />
        </div>
    )
}

export default Header