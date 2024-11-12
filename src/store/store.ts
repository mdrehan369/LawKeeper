import { UserWithImage } from '@/types/user.types'
import { create } from 'zustand'

interface IUserState {
    status: boolean,
    user: UserWithImage | null,
    login: (loggedUser: UserWithImage) => void,
    logout: () => void,
    licenseModal: boolean
    setLicenseModal: () => void
}

const useStore = create<IUserState>((set) => ({
    status: false,
    user: null,
    login: (loggedUser) => set((state) => ({ user: loggedUser, status: true })),
    logout: () => set((state) => ({user: null, status: false})),
    licenseModal: false,
    setLicenseModal: () => set((state) => ({ ...state, licenseModal: !state.licenseModal }))
}))

export {
    useStore
}