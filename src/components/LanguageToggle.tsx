import React from 'react';
import { Globe } from 'lucide-react';

interface Props { language: 'de' | 'en'; onChange: (l: 'de' | 'en') => void; }

const LanguageToggle: React.FC<Props> = ({ language, onChange }) => (
  <div className="lang-toggle">
    <Globe size={16} />
    {(['de', 'en'] as const).map(l => (
      <button key={l} onClick={() => onChange(l)} className={language === l ? 'active' : ''}>
        {l.toUpperCase()}
      </button>
    ))}
  </div>
);

export default LanguageToggle;
