import React from 'react';

const TechnologyContext = React.createContext();

export const TECHNOLOGIES = [
    { id: 'algorithms', name: 'Algorithms', icon: 'Binary', color: '#6366F1' },
    { id: 'react', name: 'React', icon: 'Atom', color: '#61DAFB' },
    { id: 'vue', name: 'Vue.js', icon: 'Code', color: '#42B883' },
    { id: 'node', name: 'Node.js', icon: 'Server', color: '#339933' },
    { id: 'flutter', name: 'Flutter', icon: 'Smartphone', color: '#02569B' },
];

export function TechnologyProvider({ children }) {
    const [activeTechnology, setActiveTechnology] = React.useState(() => {
        return localStorage.getItem('activeTechnology') || 'algorithms';
    });

    React.useEffect(() => {
        localStorage.setItem('activeTechnology', activeTechnology);
    }, [activeTechnology]);

    return (
        <TechnologyContext.Provider value={{ activeTechnology, setActiveTechnology, technologies: TECHNOLOGIES }}>
            {children}
        </TechnologyContext.Provider>
    );
}

export function useTechnology() {
    const context = React.useContext(TechnologyContext);
    if (!context) {
        throw new Error('useTechnology must be used within a TechnologyProvider');
    }
    return context;
}
