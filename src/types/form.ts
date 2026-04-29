export interface FormField {
  id: string;
  name: string;
  label: { de: string; en: string };
  type: 'text' | 'date' | 'select' | 'checkbox';
  placeholder?: { de: string; en: string };
  options?: Array<{ value: string; label: { de: string; en: string } }>;
  required: boolean;
  helpText?: { de: string; en: string };
  validation?: (value: string) => string | null;
}
