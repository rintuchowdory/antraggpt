import { FormField } from '../../../types/form';

export const anmeldungFields: FormField[] = [
  // ── Personal (step 0) ──────────────────────────────
  {
    id: 'surname', name: 'nachname',
    label: { de: 'Familienname', en: 'Surname' },
    type: 'text', required: true,
    helpText: {
      de: 'Wie im Reisepass / Personalausweis angegeben',
      en: 'As shown in your passport or ID card',
    },
  },
  {
    id: 'givenName', name: 'vorname',
    label: { de: 'Vorname(n)', en: 'Given Name(s)' },
    type: 'text', required: true,
  },
  {
    id: 'birthDate', name: 'geburtsdatum',
    label: { de: 'Geburtsdatum', en: 'Date of Birth' },
    type: 'date', required: true,
  },
  {
    id: 'birthPlace', name: 'geburtsort',
    label: { de: 'Geburtsort', en: 'Place of Birth' },
    type: 'text', required: true,
    helpText: {
      de: 'Stadt und Land, z.B. "Berlin, Deutschland"',
      en: 'City and country, e.g. "Berlin, Germany"',
    },
  },
  {
    id: 'nationality', name: 'staatsangehoerigkeit',
    label: { de: 'Staatsangehörigkeit', en: 'Nationality' },
    type: 'text', required: true,
  },
  {
    id: 'maritalStatus', name: 'familienstand',
    label: { de: 'Familienstand', en: 'Marital Status' },
    type: 'select', required: true,
    options: [
      { value: 'ledig',       label: { de: 'ledig',       en: 'single'   } },
      { value: 'verheiratet', label: { de: 'verheiratet', en: 'married'  } },
      { value: 'geschieden',  label: { de: 'geschieden',  en: 'divorced' } },
      { value: 'verwitwet',   label: { de: 'verwitwet',   en: 'widowed'  } },
    ],
  },
  {
    id: 'religion', name: 'religion',
    label: { de: 'Religionszugehörigkeit', en: 'Religious Affiliation' },
    type: 'text', required: false,
    helpText: {
      de: 'Leer lassen, wenn keine Religionszugehörigkeit',
      en: 'Leave empty if no religious affiliation',
    },
  },

  // ── Address (step 1) ───────────────────────────────
  {
    id: 'address', name: 'wohnung_adresse',
    label: { de: 'Wohnungsadresse', en: 'Apartment Address' },
    type: 'text', required: true,
    placeholder: { de: 'Musterstraße 1, 12345 Berlin', en: 'Sample St 1, 12345 Berlin' },
  },
  {
    id: 'movingDate', name: 'einzugsdatum',
    label: { de: 'Einzugsdatum', en: 'Moving-in Date' },
    type: 'date', required: true,
  },
  {
    id: 'previousAddress', name: 'vorherige_adresse',
    label: { de: 'Vorherige Adresse (falls zutreffend)', en: 'Previous Address (if applicable)' },
    type: 'text', required: false,
  },

  // ── Landlord (step 2) ──────────────────────────────
  {
    id: 'landlordName', name: 'vermieter_name',
    label: { de: 'Name des Vermieters', en: 'Landlord Name' },
    type: 'text', required: false,
    helpText: {
      de: 'Nur in einigen Bundesländern erforderlich',
      en: 'Only required in some federal states',
    },
  },
  {
    id: 'landlordAddress', name: 'vermieter_adresse',
    label: { de: 'Adresse des Vermieters', en: 'Landlord Address' },
    type: 'text', required: false,
  },
];
