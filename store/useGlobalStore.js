import { create } from 'zustand'

export const useGlobalStore = create((set) => ({
    userTag: null,
    user: null,

    setUserTag: (tag) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('Tag', tag)
        }
        set({ userTag: tag })
    },

    loadUserTag: () => {
        if (typeof window !== 'undefined') {
            const savedTag = localStorage.getItem('Tag')
            if (savedTag) set({ userTag: savedTag })
        }
    },

    setUser: (userData) => set({ user: userData }),
    clearUser: () => set({ user: null }),
}))
