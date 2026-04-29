import React from 'react';
import { Check } from 'lucide-react';

interface Step { id: string; label: { de: string; en: string } }
interface Props { steps: Step[]; currentStep: number; language: 'de' | 'en' }

const ProgressBar: React.FC<Props> = ({ steps, currentStep, language }) => (
  <div className="progress-bar">
    {steps.map((step, i) => (
      <React.Fragment key={step.id}>
        <div className="step-item">
          <div className={`step-circle ${i < currentStep ? 'done' : i === currentStep ? 'active' : ''}`}>
            {i < currentStep ? <Check size={14} /> : <span>{i + 1}</span>}
          </div>
          <span className={`step-label ${i === currentStep ? 'active' : ''}`}>
            {step.label[language]}
          </span>
        </div>
        {i < steps.length - 1 && (
          <div className={`step-connector ${i < currentStep ? 'done' : ''}`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default ProgressBar;
