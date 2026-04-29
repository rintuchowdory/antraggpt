import React from 'react';
import { FormField } from '../types/form';
import HelpBubble from './HelpBubble';

interface Props {
  field: FormField;
  value: string;
  onChange: (id: string, value: string) => void;
  language: 'de' | 'en';
  error?: string;
}

const FormStep: React.FC<Props> = ({ field, value, onChange, language, error }) => {
  const inputClass = `form-input${error ? ' error' : ''}`;

  const renderInput = () => {
    if (field.type === 'select') {
      return (
        <select className={inputClass} id={field.id} value={value}
          onChange={e => onChange(field.id, e.target.value)}>
          <option value="">
            {field.placeholder?.[language] ?? (language === 'de' ? 'Bitte auswählen…' : 'Please select…')}
          </option>
          {field.options?.map(o => (
            <option key={o.value} value={o.value}>{o.label[language]}</option>
          ))}
        </select>
      );
    }
    return (
      <input className={inputClass} type={field.type} id={field.id} value={value}
        placeholder={field.placeholder?.[language]}
        onChange={e => onChange(field.id, e.target.value)} />
    );
  };

  return (
    <div className="form-group">
      <label htmlFor={field.id} className="form-label">
        {field.label[language]}
        {field.required && <span className="required-star"> *</span>}
        {field.helpText && <HelpBubble text={field.helpText[language]} />}
      </label>
      {renderInput()}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default FormStep;
