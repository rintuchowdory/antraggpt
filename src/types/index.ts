export type Lang = 'de' | 'en';
export interface UserProfile {
  surname: string; givenName: string; birthDate: string; birthPlace: string;
  nationality: string; maritalStatus: string; address: string; email: string; phone: string;
}
export interface FormField {
  id: string; label: { de: string; en: string };
  type: 'text' | 'date' | 'select' | 'email' | 'tel';
  placeholder?: { de: string; en: string };
  options?: Array<{ value: string; label: { de: string; en: string } }>;
  required: boolean; helpText?: { de: string; en: string };
  profileKey?: keyof UserProfile;
}
export interface FormTemplate {
  id: string; title: { de: string; en: string }; description: { de: string; en: string };
  category: string; premium: boolean; icon: string; steps: FormStep[]; estimatedTime: number;
}
export interface FormStep { id: string; title: { de: string; en: string }; fields: FormField[]; }
export type AppView = 'landing' | 'dashboard' | 'profile' | 'form' | 'tracker';
