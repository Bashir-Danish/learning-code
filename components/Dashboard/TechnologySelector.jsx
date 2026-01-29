import { useTechnology } from '../../contexts/TechnologyContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Binary, Atom, Code, Server, Smartphone } from 'lucide-react';

const ICON_MAP = {
    Binary: Binary,
    Atom: Atom,
    Code: Code,
    Server: Server,
    Smartphone: Smartphone
};

export default function TechnologySelector() {
    const { activeTechnology, setActiveTechnology, technologies } = useTechnology();
    const { t } = useLanguage();

    return (
        <div className="flex flex-wrap gap-2 mb-8 p-1 bg-white/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 w-fit">
            {technologies.map((tech) => {
                const Icon = ICON_MAP[tech.icon];
                const isActive = activeTechnology === tech.id;

                return (
                    <button
                        key={tech.id}
                        onClick={() => setActiveTechnology(tech.id)}
                        className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300
              ${isActive
                                ? 'bg-white shadow-md border border-gray-100 scale-105'
                                : 'hover:bg-white/60 text-gray-500 hover:text-gray-700'
                            }
            `}
                    >
                        <div
                            className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-indigo-50' : 'bg-gray-100'}`}
                            style={{ color: isActive ? tech.color : 'inherit' }}
                        >
                            <Icon className="w-4 h-4" />
                        </div>
                        <span className={`text-sm font-bold ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                            {t(tech.name, tech.name === 'Algorithms' ? 'الگوریتم' : tech.name)}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
