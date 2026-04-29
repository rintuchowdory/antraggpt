import { FormTemplate } from '../types';
export const formTemplates: FormTemplate[] = [
  { id:'anmeldung', title:{de:'Anmeldung',en:'Resident Registration'},
    description:{de:'Pflichtanmeldung nach Umzug',en:'Mandatory registration after moving'},
    category:'buergeramt', premium:false, icon:'🏠', estimatedTime:10,
    steps:[
      { id:'personal', title:{de:'Persönliche Daten',en:'Personal Data'}, fields:[
        {id:'surname',label:{de:'Familienname',en:'Surname'},type:'text',required:true,profileKey:'surname',helpText:{de:'Wie im Reisepass',en:'As in passport'}},
        {id:'givenName',label:{de:'Vorname(n)',en:'Given Name(s)'},type:'text',required:true,profileKey:'givenName'},
        {id:'birthDate',label:{de:'Geburtsdatum',en:'Date of Birth'},type:'date',required:true,profileKey:'birthDate'},
        {id:'birthPlace',label:{de:'Geburtsort',en:'Place of Birth'},type:'text',required:true,profileKey:'birthPlace'},
        {id:'nationality',label:{de:'Staatsangehörigkeit',en:'Nationality'},type:'text',required:true,profileKey:'nationality'},
        {id:'maritalStatus',label:{de:'Familienstand',en:'Marital Status'},type:'select',required:true,profileKey:'maritalStatus',
          options:[{value:'ledig',label:{de:'Ledig',en:'Single'}},{value:'verheiratet',label:{de:'Verheiratet',en:'Married'}},{value:'geschieden',label:{de:'Geschieden',en:'Divorced'}},{value:'verwitwet',label:{de:'Verwitwet',en:'Widowed'}}]},
      ]},
      { id:'address', title:{de:'Adresse',en:'Address'}, fields:[
        {id:'address',label:{de:'Wohnungsadresse',en:'Apartment Address'},type:'text',required:true,profileKey:'address'},
        {id:'movingDate',label:{de:'Einzugsdatum',en:'Moving-in Date'},type:'date',required:true},
        {id:'previousAddress',label:{de:'Vorherige Adresse',en:'Previous Address'},type:'text',required:false},
      ]},
      { id:'landlord', title:{de:'Vermieter',en:'Landlord'}, fields:[
        {id:'landlordName',label:{de:'Name des Vermieters',en:'Landlord Name'},type:'text',required:false},
        {id:'landlordAddress',label:{de:'Adresse des Vermieters',en:'Landlord Address'},type:'text',required:false},
      ]},
    ]
  },
  { id:'aufenthaltserlaubnis', title:{de:'Aufenthaltserlaubnis',en:'Residence Permit'},
    description:{de:'Antrag auf Aufenthaltserlaubnis',en:'Application for residence permit'},
    category:'auslaenderbehoerde', premium:false, icon:'📋', estimatedTime:25,
    steps:[
      { id:'personal', title:{de:'Persönliche Angaben',en:'Personal Details'}, fields:[
        {id:'surname',label:{de:'Familienname',en:'Surname'},type:'text',required:true,profileKey:'surname'},
        {id:'givenName',label:{de:'Vorname(n)',en:'Given Name(s)'},type:'text',required:true,profileKey:'givenName'},
        {id:'birthDate',label:{de:'Geburtsdatum',en:'Date of Birth'},type:'date',required:true,profileKey:'birthDate'},
        {id:'nationality',label:{de:'Staatsangehörigkeit',en:'Nationality'},type:'text',required:true,profileKey:'nationality'},
        {id:'passportNo',label:{de:'Reisepassnummer',en:'Passport Number'},type:'text',required:true},
      ]},
      { id:'residence', title:{de:'Aufenthalt',en:'Residence'}, fields:[
        {id:'address',label:{de:'Aktuelle Adresse',en:'Current Address'},type:'text',required:true,profileKey:'address'},
        {id:'permitType',label:{de:'Art des Aufenthaltstitels',en:'Type of Permit'},type:'select',required:true,
          options:[{value:'arbeit',label:{de:'Arbeit',en:'Work'}},{value:'studium',label:{de:'Studium',en:'Study'}},{value:'familie',label:{de:'Familie',en:'Family'}}]},
        {id:'entryDate',label:{de:'Einreisedatum',en:'Date of Entry'},type:'date',required:true},
      ]},
    ]
  },
  { id:'kindergeld', title:{de:'Kindergeld-Antrag',en:'Child Benefit'},
    description:{de:'Antrag auf Kindergeld',en:'Application for child benefit'},
    category:'familienkasse', premium:false, icon:'👶', estimatedTime:20,
    steps:[
      { id:'parent', title:{de:'Antragsteller',en:'Applicant'}, fields:[
        {id:'surname',label:{de:'Familienname',en:'Surname'},type:'text',required:true,profileKey:'surname'},
        {id:'givenName',label:{de:'Vorname(n)',en:'Given Name(s)'},type:'text',required:true,profileKey:'givenName'},
        {id:'address',label:{de:'Adresse',en:'Address'},type:'text',required:true,profileKey:'address'},
        {id:'taxId',label:{de:'Steuer-ID',en:'Tax ID'},type:'text',required:true},
        {id:'iban',label:{de:'IBAN',en:'IBAN'},type:'text',required:true},
      ]},
      { id:'child', title:{de:'Kind',en:'Child'}, fields:[
        {id:'childSurname',label:{de:'Familienname des Kindes',en:"Child Surname"},type:'text',required:true},
        {id:'childGivenName',label:{de:'Vorname des Kindes',en:"Child Given Name"},type:'text',required:true},
        {id:'childBirthDate',label:{de:'Geburtsdatum',en:"Date of Birth"},type:'date',required:true},
      ]},
    ]
  },
  { id:'steuererklarung', title:{de:'Einkommensteuer',en:'Income Tax Return'},
    description:{de:'Einkommensteuererklärung einreichen',en:'Submit income tax return'},
    category:'finanzamt', premium:true, icon:'💰', estimatedTime:45,
    steps:[
      { id:'personal', title:{de:'Persönliche Daten',en:'Personal Data'}, fields:[
        {id:'surname',label:{de:'Familienname',en:'Surname'},type:'text',required:true,profileKey:'surname'},
        {id:'taxId',label:{de:'Steuer-ID',en:'Tax ID'},type:'text',required:true},
        {id:'taxYear',label:{de:'Steuerjahr',en:'Tax Year'},type:'text',required:true},
      ]},
    ]
  },
  { id:'elterngeld', title:{de:'Elterngeld-Antrag',en:'Parental Benefit'},
    description:{de:'Elterngeld beantragen',en:'Apply for parental allowance'},
    category:'familienkasse', premium:true, icon:'👨‍👩‍👧', estimatedTime:30,
    steps:[
      { id:'applicant', title:{de:'Antragsteller',en:'Applicant'}, fields:[
        {id:'surname',label:{de:'Familienname',en:'Surname'},type:'text',required:true,profileKey:'surname'},
        {id:'iban',label:{de:'IBAN',en:'IBAN'},type:'text',required:true},
      ]},
    ]
  },
  { id:'gewerbeanmeldung', title:{de:'Gewerbeanmeldung',en:'Business Registration'},
    description:{de:'Gewerbe anmelden',en:'Register a business'},
    category:'gewerbeamt', premium:true, icon:'🏢', estimatedTime:20,
    steps:[
      { id:'owner', title:{de:'Inhaber',en:'Owner'}, fields:[
        {id:'surname',label:{de:'Familienname',en:'Surname'},type:'text',required:true,profileKey:'surname'},
        {id:'businessName',label:{de:'Firmenname',en:'Business Name'},type:'text',required:true},
        {id:'businessType',label:{de:'Tätigkeit',en:'Activity'},type:'text',required:true},
      ]},
    ]
  },
];
export const categories: Record<string,{de:string;en:string;color:string}> = {
  buergeramt:        {de:'Bürgeramt',        en:'Citizens Office',    color:'#3b82f6'},
  auslaenderbehoerde:{de:'Ausländerbehörde', en:'Immigration Office', color:'#8b5cf6'},
  familienkasse:     {de:'Familienkasse',    en:'Family Benefits',    color:'#ec4899'},
  finanzamt:         {de:'Finanzamt',        en:'Tax Office',         color:'#f59e0b'},
  gewerbeamt:        {de:'Gewerbeamt',       en:'Trade Office',       color:'#10b981'},
};
