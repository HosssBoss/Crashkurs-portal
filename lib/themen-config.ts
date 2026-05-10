export const THEMEN_PER_FACH: Record<string, string[]> = {
  chemie: [
    "Atombau & Periodensystem",
    "Chemische Bindung",
    "Stöchiometrie & Gleichgewichte",
    "Thermodynamik & Kinetik",
    "Säuren & Basen",
    "Redox & Elektrochemie",
    "Funktionelle Gruppen",
    "Stereochemie",
    "Reaktionsmechanismen",
    "Lösungen & Elektrolyte",
  ],
  physik: [
    "Mechanik & Statik",
    "Hydrostatik & Strömungslehre",
    "Elektrodynamik",
    "Optik",
    "Thermodynamik",
    "Schwingungen & Wellen",
    "Atomphysik & Strahlung",
    "Biophysik",
  ],
  biochemie: [
    "Aminosäuren & Peptide",
    "Proteinstruktur & -funktion",
    "Enzyme & Kinetik",
    "Kohlenhydrate & Glykolyse",
    "Lipide & Membranen",
    "Nukleinsäuren",
    "DNA-Replikation & -Reparatur",
    "Transkription & Translation",
    "Vitamine & Coenzyme",
    "Energiestoffwechsel",
  ],
  physiologie: [
    "Herz & Kreislauf",
    "Elektrophysiologie & Membranpotenzial",
    "Atemphysiologie",
    "Niere & Elektrolyte",
    "Nervensystem & Synapsen",
    "Muskelphysiologie",
    "Endokrinologie",
    "Sinnesphysiologie",
    "Blut & Hämostase",
    "Gastrointestinaltrakt",
  ],
};

export type FachResult = {
  fach: string;
  updated: number;
  themen: Record<string, number>;
};

export type KategorisierungResult = {
  updated: number;
  faecher: FachResult[];
  errors: string[];
};
