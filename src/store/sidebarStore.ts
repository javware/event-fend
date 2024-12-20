import { create } from 'zustand';

interface SidebarState {
    isOpen: boolean
    toggleSidebar: () => void
    setSidebar: (isOpen: boolean) => void
    checkScreenSize: () => void
}
const useSidebarStore = create<SidebarState>((set) => ({
    isOpen: false,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    setSidebar: (isOpen) => set({ isOpen }),
    checkScreenSize: () => {
        const width = window.innerWidth;
        set({ isOpen: width > 780 });
    },
}));

export default useSidebarStore;