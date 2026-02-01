import { createContext, useContext, useState, useEffect } from 'react';

const TechnologyContext = createContext();

export const TECHNOLOGIES = [
    { id: 'algorithms', name: 'Algorithms', icon: 'Binary', color: '#6366F1' },
    { id: 'react', name: 'React', icon: 'Atom', color: '#61DAFB' },
    { id: 'vue', name: 'Vue.js', icon: 'Code', color: '#42B883' },
    { id: 'node', name: 'Node.js', icon: 'Server', color: '#339933' },
    { id: 'flutter', name: 'Flutter', icon: 'Smartphone', color: '#02569B' },
];

export function TechnologyProvider({ children }) {
    const [activeTechnology, setActiveTechnology] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('activeTechnology') || 'algorithms';
        }
        return 'algorithms';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('activeTechnology', activeTechnology);
        }
    }, [activeTechnology]);

    return (
        <TechnologyContext.Provider value={{ activeTechnology, setActiveTechnology, technologies: TECHNOLOGIES }}>
            {children}
        </TechnologyContext.Provider>
    );
}

export function useTechnology() {
    const context = useContext(TechnologyContext);
    if (!context) {
        throw new Error('useTechnology must be used within a TechnologyProvider');
    }
    return context;
}
