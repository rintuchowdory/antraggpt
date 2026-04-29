import React, { useState } from 'react';
import { anmeldungFields } from '../data/formFields';
import { FormField } from '../../../types/form';
import { ChevronRight, ChevronLeft, CheckCircle2, FileText } from 'lucide-react';
import LanguageToggle from '../../../components/LanguageToggle';
import ProgressBar from '../../../components/ProgressBar';
import FormStep from '../../../components/FormStep';
import { translations } from '../../../utils/translations';

const STEPS = [
  { id: 'personal', label: translations.steps.personal },
  { id: 'address',  label: translations.steps.address  },
  { id: 'landlord', label: translations.steps.landlord },
  { id: 'review',   label: translations.steps.review   },
];

const GROUPS: FormField[][] = [
  anmeldungFields.slice(0, 7),
  anmeldungFields.slice(7, 10),
  anmeldungFields.slice(10),
];

const AnmeldungForm: React.FC = () => {
  const [lang,        setLang]        = useState<'de' | 'en'>('en');
  const [step,        setStep]        = useState(0);
  const [formData,    setFormData]    = useState<Record<string, string>>({});
  const [errors,      setErrors]      = useState<Record<string, string>>({});
  const [submitted,   setSubmitted]   = useState(false);

  const t    = translations.common;
  const tErr = translations.errors;

  const handleChange = (id: string, value: string) => {
    setFormData(p => ({ ...p, [id]: value }));
    setErrors(p => { const e = { ...p }; delete e[id]; return e; });
  };

  const validate = (): boolean => {
    if (step >= 3) return true;
    const errs: Record<string, string> = {};
    GROUPS[step].forEach(f => {
      if (f.required && !formData[f.id]?.trim()) errs[f.id] = tErr.required[lang];
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validate()) setStep(s => Math.min(s + 1, 3)); };
  const back = () => { setStep(s => Math.max(s - 1, 0)); setErrors({}); };
  const reset = () => { setSubmitted(false); setStep(0); setFormData({}); };

  if (submitted) {
    return (
      <div className="page">
        <div className="success-card">
          <CheckCircle2 size={52} className="success-icon" />
          <h2>{t.success[lang]}</h2>
          <p>{t.successSub[lang]}</p>
          <button className="btn-primary" onClick={reset}>{t.startOver[lang]}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="app-header">
        <div className="logo">
          <FileText size={22} />
          <span>AntragGPT</span>
        </div>
        <LanguageToggle language={lang} onChange={setLang} />
      </header>

      <div className="card">
        <ProgressBar steps={STEPS} currentStep={step} language={lang} />

        <h2 className="step-title">{STEPS[step].label[lang]}</h2>

        {step < 3 ? (
          <div className="fields">
            {GROUPS[step].map(f => (
              <FormStep key={f.id} field={f} value={formData[f.id] || ''}
                onChange={handleChange} language={lang} error={errors[f.id]} />
            ))}
          </div>
        ) : (
          <ReviewSection formData={formData} language={lang} />
        )}

        <div className="nav-buttons">
          <button className="btn-secondary" onClick={back} disabled={step === 0}>
            <ChevronLeft size={16} /> {t.previous[lang]}
          </button>
          {step < 3 ? (
            <button className="btn-primary" onClick={next}>
              {t.next[lang]} <ChevronRight size={16} />
            </button>
          ) : (
            <button className="btn-success" onClick={() => setSubmitted(true)}>
              <CheckCircle2 size={16} /> {t.submit[lang]}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Review ───────────────────────────────────────────────────────────────────
const ReviewSection: React.FC<{ formData: Record<string, string>; language: 'de' | 'en' }> = ({
  formData, language
}) => {
  const sections = [
    { title: translations.steps.personal, fields: anmeldungFields.slice(0, 7)  },
    { title: translations.steps.address,  fields: anmeldungFields.slice(7, 10) },
    { title: translations.steps.landlord, fields: anmeldungFields.slice(10)    },
  ];
  return (
    <div className="review">
      {sections.map(s => (
        <div key={s.title.en} className="review-section">
          <h3 className="review-section-title">{s.title[language]}</h3>
          {s.fields.map(f => (
            <div key={f.id} className="review-row">
              <span className="review-label">{f.label[language]}</span>
              <span className="review-value">{formData[f.id] || '—'}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnmeldungForm;
