"use client"

import { useGlobalStore } from '@/store/useGlobalStore'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import { toast } from 'sonner'

const PlayerInfo = () => {
    const { userTag, user, setUser } = useGlobalStore()
    const [loading, setLoading] = useState(false)
    // const [notFound, setNotFound] = useState(false)

    let avgElixir = 0

    useEffect(() => {
        if (!userTag) return

        const fetchUserData = async () => {
            setLoading(true)
            // setNotFound(false)

            try {
                const response = await fetch(`/api/player/${encodeURIComponent(userTag)}`)

                // if (response.status === 404) {
                //     setUser(null)
                //     setNotFound(true)
                //     toast.error("Player not found. Please check your tag and try again.", { position: 'top-center' });
                //     return
                // }

                if (!response.ok) throw new Error("Failed to fetch player data")

                const data = await response.json()
                setUser(data)
            } catch (error) {
                console.error("Error fetching user data:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUserData()
    }, [userTag, setUser])

    useEffect(() => {
        console.log("Loaded user:", user)
    }, [user])

    if (loading) {
        return (
            <div className="grid grid-cols-4 gap-4 items-center justify-center w-160 mx-auto">
                {[...Array(8)].map((_, index) => (
                    <Skeleton key={index} className="w-40 h-50 bg-gray-300" />
                ))}
            </div>
        )
    }

    if (user?.reason === "notFound") {
        toast.error("Player not found. Please check your tag and try again.", { position: 'top-center' });

        return (
            <div className="w-full p-5 shadow-lg bg-red-100 rounded-lg text-center">
                <p className='text-red-600 font-bold' style={{ fontFamily: "Supercell Magic" }}>
                    ❌ Player not found. Please check your tag and try again.
                </p>
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="w-full shadow-lg p-5 ">
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <p style={{ fontFamily: "Supercell Magic" }}>
                    👑 Player : <span className='font-bold'>{user?.name}</span>
                </p>
                <p style={{ fontFamily: "Supercell Magic" }} className='text-primary'>
                    Level <span className='font-bold'>{user?.expLevel}</span>
                </p>
                <p style={{ fontFamily: "Supercell Magic" }}>
                    🏆 Trophies : <span className='font-bold text-secondary'>{user?.trophies}</span>
                </p>
            </div>

            <div className="w-full border my-5"></div>

            <div>
                <h2 className='text-lg mb-3' style={{ fontFamily: "Supercell Magic" }}>
                    🧱 Current Deck
                </h2>
                <div className="w-full p-5 shadow-lg bg-linear-to-b from-primary to-primary/50 rounded-lg flex flex-col items-center">
                    <div className="w-max grid grid-cols-4 gap-0 items-center justify-center text-center">
                        {user?.currentDeck?.map((card, index) => {
                            avgElixir += card.elixirCost
                            return (
                                <div className="w-full" key={card.id}>
                                    <Image
                                        src={
                                            index === 0 || index === 1
                                                ? card?.iconUrls?.evolutionMedium
                                                    ? card?.iconUrls?.evolutionMedium
                                                    : card?.iconUrls?.medium
                                                : card?.iconUrls?.medium
                                        }
                                        alt={card?.name}
                                        className='mx-auto w-[65px] md:w-[100px] lg:w-[150px] h-auto'
                                        width={150}
                                        height={150}
                                    />
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center justify-center gap-3 text-lg p-3 rounded-full"
                            style={{ fontFamily: "Supercell Magic", boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)" }}>
                            <Image src="/assets/Elixir.png" alt="Elixir Icon" width={25} height={25} />
                            <p>{(avgElixir / 8).toFixed(1)}</p>
                        </div>
                        {user?.currentDeckSupportCards?.[0] && (
                            <Image
                                src={user.currentDeckSupportCards[0].iconUrls.medium}
                                alt={user.currentDeckSupportCards[0].name}
                                width={50}
                                height={50}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full border my-5"></div>

            <div>
                <p className='text-sm' style={{ fontFamily: 'Supercell Magic' }}>
                    Clan : {user?.clan?.name}
                </p>
                <p className='text-sm' style={{ fontFamily: 'Supercell Magic' }}>
                    ClanTag : {user?.clan?.tag}
                </p>

                <div className="">
                    <p className='text-md mt-3' style={{ fontFamily: 'Supercell Magic' }}>
                        Current Favourite Card
                    </p>
                    {user?.currentFavouriteCard && (
                        <Image
                            src={user.currentFavouriteCard.iconUrls.medium}
                            alt={user.currentFavouriteCard.name}
                            width={150}
                            height={150}
                        />
                    )}
                </div>

                <p className='text-sm' style={{ fontFamily: 'Supercell Magic' }}>
                    battleCount : {user?.battleCount}
                </p>
                <p className='text-sm' style={{ fontFamily: 'Supercell Magic' }}>
                    wins : {user?.wins}
                </p>
                <p className='text-sm' style={{ fontFamily: 'Supercell Magic' }}>
                    threeCrownWins : {user?.threeCrownWins}
                </p>
            </div>
        </div>
    )
}

export default PlayerInfo
