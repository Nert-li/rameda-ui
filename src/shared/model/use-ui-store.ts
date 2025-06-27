import { create } from 'zustand';

interface UIState {
    isMobile: boolean;
    sidebarOpen: boolean;
    activeModals: Record<string, boolean>;
    globalLoading: boolean;
    notifications: Array<{
        id: string;
        type: 'success' | 'error' | 'warning' | 'info';
        message: string;
        timestamp: number;
    }>;
}

interface UIActions {
    setMobile: (isMobile: boolean) => void;
    toggleSidebar: () => void;
    setSidebarOpen: (open: boolean) => void;
    openModal: (modalId: string) => void;
    closeModal: (modalId: string) => void;
    toggleModal: (modalId: string) => void;
    setGlobalLoading: (loading: boolean) => void;
    addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => void;
    removeNotification: (id: string) => void;
    clearNotifications: () => void;
}

type UIStore = UIState & UIActions;

const MOBILE_BREAKPOINT = 768;

export const useUIStore = create<UIStore>((set, get) => ({
    // Initial state
    isMobile: typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false,
    sidebarOpen: true,
    activeModals: {},
    globalLoading: false,
    notifications: [],

    // Actions
    setMobile: (isMobile: boolean) => set({ isMobile }),

    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

    setSidebarOpen: (open: boolean) => set({ sidebarOpen: open }),

    openModal: (modalId: string) => set((state) => ({
        activeModals: { ...state.activeModals, [modalId]: true }
    })),

    closeModal: (modalId: string) => set((state) => ({
        activeModals: { ...state.activeModals, [modalId]: false }
    })),

    toggleModal: (modalId: string) => set((state) => ({
        activeModals: { ...state.activeModals, [modalId]: !state.activeModals[modalId] }
    })),

    setGlobalLoading: (loading: boolean) => set({ globalLoading: loading }),

    addNotification: (notification: Omit<UIState['notifications'][0], 'id' | 'timestamp'>) => {
        const newNotification = {
            ...notification,
            id: `notification-${Date.now()}-${Math.random()}`,
            timestamp: Date.now(),
        };

        set((state) => ({
            notifications: [...state.notifications, newNotification]
        }));

        // Auto remove after 5 seconds
        setTimeout(() => {
            get().removeNotification(newNotification.id);
        }, 5000);
    },

    removeNotification: (id: string) => set((state) => ({
        notifications: state.notifications.filter(notification => notification.id !== id)
    })),

    clearNotifications: () => set({ notifications: [] }),
}));

// Initialize mobile detection outside of React
if (typeof window !== 'undefined') {
    const checkMobile = () => {
        useUIStore.getState().setMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    mql.addEventListener("change", checkMobile);
    checkMobile();
}

// Convenience hooks
export const useIsMobile = () => useUIStore((state) => state.isMobile);

export const useSidebar = () => useUIStore((state) => ({
    sidebarOpen: state.sidebarOpen,
    toggleSidebar: state.toggleSidebar,
    setSidebarOpen: state.setSidebarOpen,
}));

export const useModal = (modalId: string) => {
    const { activeModals, openModal, closeModal, toggleModal } = useUIStore();
    return {
        isOpen: activeModals[modalId] || false,
        open: () => openModal(modalId),
        close: () => closeModal(modalId),
        toggle: () => toggleModal(modalId),
    };
};

export const useNotifications = () => useUIStore((state) => ({
    notifications: state.notifications,
    addNotification: state.addNotification,
    removeNotification: state.removeNotification,
    clearNotifications: state.clearNotifications,
}));

export const useGlobalLoading = () => useUIStore((state) => ({
    globalLoading: state.globalLoading,
    setGlobalLoading: state.setGlobalLoading,
})); 