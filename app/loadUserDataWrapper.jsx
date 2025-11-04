'use client'

import { useEffect } from 'react'
import { useGlobalStore } from '@/store/useGlobalStore'

export default function ClientLayout({ children }) {
    const { loadUserTag } = useGlobalStore()

    useEffect(() => {
        loadUserTag()
    }, [loadUserTag])

    return (

        <>{children}</>
    )
}
