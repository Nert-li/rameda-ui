import { ReactNode, createContext, useContext, useState, useEffect } from 'react';

interface HeaderContentContextType {
    headerContent: ReactNode;
    registerHeaderContent: (content: ReactNode) => void;
    unregisterHeaderContent: () => void;
}

const HeaderContentContext = createContext<HeaderContentContextType | undefined>(undefined);

export function HeaderContentProvider({ children }: { children: ReactNode }) {
    const [headerContent, setHeaderContent] = useState<ReactNode>(null);

    const registerHeaderContent = (content: ReactNode) => {
        setHeaderContent(content);
    };

    const unregisterHeaderContent = () => {
        setHeaderContent(null);
    };

    return (
        <HeaderContentContext.Provider value={{
            headerContent,
            registerHeaderContent,
            unregisterHeaderContent
        }}>
            {children}
        </HeaderContentContext.Provider>
    );
}

export function useHeaderContent() {
    const context = useContext(HeaderContentContext);
    if (context === undefined) {
        throw new Error('useHeaderContent must be used within a HeaderContentProvider');
    }
    return context;
}

// Компонент для декларативного использования
interface HeaderContentProps {
    children: ReactNode;
}

export function HeaderContent({ children }: HeaderContentProps) {
    const { registerHeaderContent, unregisterHeaderContent } = useHeaderContent();

    useEffect(() => {
        registerHeaderContent(children);
        return () => unregisterHeaderContent();
    }, [children, registerHeaderContent, unregisterHeaderContent]);

    return null; // Этот компонент ничего не рендерит
} 