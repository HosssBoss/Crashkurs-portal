export type Question = {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export type QuizTopic = {
  id: string;
  name: string;
  emoji: string;
  questions: Question[];
};

export type FachQuiz = {
  topics: QuizTopic[];
};

export const quizData: Record<string, FachQuiz> = {
  biochemie: {
    topics: [
      {
        id: "aminosaeuren",
        name: "Aminosäuren",
        emoji: "🧬",
        questions: [
          {
            id: "as-1",
            question: "Welche der folgenden Aminosäuren ist für den Menschen essentiell?",
            options: ["Alanin", "Glycin", "Leucin", "Asparaginsäure"],
            correctIndex: 2,
            explanation:
              "Leucin ist eine essentielle, verzweigtkettige Aminosäure (BCAA), die der Körper nicht selbst synthetisieren kann und über die Nahrung aufnehmen muss.",
          },
          {
            id: "as-2",
            question: "Welche Aminosäure unterbricht α-Helices aufgrund ihrer Ringstruktur?",
            options: ["Alanin", "Valin", "Serin", "Prolin"],
            correctIndex: 3,
            explanation:
              "Prolin besitzt eine starre pyrrolidine Ringstruktur, die den Phi-Winkel einschränkt und dadurch α-Helices und β-Faltblätter destabilisiert.",
          },
          {
            id: "as-3",
            question: "Wie viele proteinogene Aminosäuren gibt es beim Menschen?",
            options: ["10", "20", "30", "64"],
            correctIndex: 1,
            explanation:
              "Es gibt genau 20 standardmäßige proteinogene Aminosäuren, die durch den genetischen Code codiert werden.",
          },
          {
            id: "as-4",
            question: "Was ist die Seitenkette (R-Gruppe) von Glycin?",
            options: ["-CH₃", "-CH₂OH", "-CH₂SH", "-H"],
            correctIndex: 3,
            explanation:
              "Glycin ist die einfachste Aminosäure mit einem einzigen Wasserstoffatom als Seitenkette. Daher ist es die einzige nicht-chirale Aminosäure.",
          },
          {
            id: "as-5",
            question: "Welche Aminosäure enthält einen Indolring in ihrer Seitenkette?",
            options: ["Phenylalanin", "Histidin", "Tryptophan", "Tyrosin"],
            correctIndex: 2,
            explanation:
              "Tryptophan enthält einen Indolring (Benzopyrrolring) in seiner Seitenkette und ist die größte der 20 proteinogenen Aminosäuren.",
          },
        ],
      },
      {
        id: "enzyme",
        name: "Enzyme",
        emoji: "⚗️",
        questions: [
          {
            id: "enz-1",
            question: "Was beschreibt die Michaelis-Konstante (Km) eines Enzyms?",
            options: [
              "Die maximale Reaktionsgeschwindigkeit (Vmax)",
              "Die Substratkonzentration bei halbmaximaler Geschwindigkeit",
              "Die Enzymkonzentration im Reaktionsansatz",
              "Das Temperaturoptimum des Enzyms",
            ],
            correctIndex: 1,
            explanation:
              "Km entspricht der Substratkonzentration [S], bei der v = Vmax/2. Ein niedriger Km-Wert bedeutet eine hohe Substrataffinität des Enzyms.",
          },
          {
            id: "enz-2",
            question: "Welche Aussage zur kompetitiven Hemmung ist korrekt?",
            options: [
              "Vmax sinkt, Km bleibt unverändert",
              "Vmax sinkt, Km sinkt ebenfalls",
              "Vmax bleibt unverändert, Km steigt",
              "Vmax steigt, Km steigt ebenfalls",
            ],
            correctIndex: 2,
            explanation:
              "Kompetitive Inhibitoren konkurrieren mit dem Substrat um die aktive Stelle. Sie sind durch hohe Substratkonzentrationen überwindbar – daher bleibt Vmax gleich, aber die apparente Km steigt.",
          },
          {
            id: "enz-3",
            question: "Was ist ein Coenzym?",
            options: [
              "Ein inaktives Enzym ohne Cofaktor (Apoenzym)",
              "Ein stabiler Enzym-Substrat-Komplex",
              "Eine nicht-proteinogene organische Cofaktor-Verbindung",
              "Eine katalytisch aktive Aminosäure im aktiven Zentrum",
            ],
            correctIndex: 2,
            explanation:
              "Coenzyme sind organische Moleküle (oft Vitaminderivate wie NAD⁺, FAD, CoA), die vorübergehend an Enzyme binden und bei der Katalyse mitreagieren.",
          },
          {
            id: "enz-4",
            question: "Welche Enzymklasse (EC) überträgt Phosphatgruppen von ATP?",
            options: ["Oxidoreduktasen (EC 1)", "Transferasen (EC 2)", "Hydrolasen (EC 3)", "Isomerasen (EC 5)"],
            correctIndex: 1,
            explanation:
              "Transferasen (EC 2) übertragen funktionelle Gruppen. Kinasen, die Phosphatgruppen von ATP übertragen (z. B. Hexokinase), gehören zu dieser Klasse.",
          },
          {
            id: "enz-5",
            question: "Was beschreibt das 'Induced-Fit'-Modell der Enzymkatalyse?",
            options: [
              "Enzym und Substrat passen starr wie Schlüssel und Schloss zusammen",
              "Das Enzym verändert seine Konformation beim Binden des Substrats",
              "Das Substrat verändert seine Struktur beim Binden ans Enzym",
              "Das Enzym ist immer unabhängig vom Substrat aktiv",
            ],
            correctIndex: 1,
            explanation:
              "Im Induced-Fit-Modell (Koshland, 1958) verändert das Enzym seine Konformation beim Substratbinden, um eine optimale Passform zu erreichen – dynamischer als das Schlüssel-Schloss-Modell.",
          },
        ],
      },
      {
        id: "funktionelle-gruppen",
        name: "Funktionelle Gruppen",
        emoji: "🔗",
        questions: [
          {
            id: "fg-1",
            question: "Welche funktionelle Gruppe ist charakteristisch für Alkohole?",
            options: ["-COOH (Carboxylgruppe)", "-NH₂ (Aminogruppe)", "-OH (Hydroxylgruppe)", "-CHO (Aldehydgruppe)"],
            correctIndex: 2,
            explanation:
              "Alkohole tragen eine Hydroxylgruppe (-OH), die an ein sp³-Kohlenstoffatom gebunden ist. Sie können als H-Brückendonoren und -Akzeptoren fungieren.",
          },
          {
            id: "fg-2",
            question: "Welche Bindungsformel entspricht einer Esterbindung?",
            options: ["R-CO-NH-R' (Amid)", "R-CO-O-R' (Ester)", "R-NH-NH-R' (Hydrazin)", "R-S-S-R' (Disulfid)"],
            correctIndex: 1,
            explanation:
              "Esterbindungen (-CO-O-) entstehen durch Kondensation einer Carbonsäure mit einem Alkohol unter Wasserabspaltung. Sie kommen in Triglyceriden und Phospholipiden vor.",
          },
          {
            id: "fg-3",
            question: "Welche funktionelle Gruppe ist in Ketonen (aber nicht in Aldehyden) vorhanden?",
            options: [
              "Terminale Aldehydgruppe (-CHO)",
              "Estergruppe (-COO-)",
              "Interne Carbonylgruppe (C=O, flankiert von C-Atomen)",
              "Hydroxylgruppe (-OH)",
            ],
            correctIndex: 2,
            explanation:
              "Ketone besitzen eine interne Carbonylgruppe (C=O), die beiderseits von Kohlenstoffatomen flankiert ist – im Gegensatz zu Aldehyden, wo sie am Kettenende sitzt.",
          },
          {
            id: "fg-4",
            question: "Was ist eine Disulfidbindung?",
            options: [
              "Kovalente Bindung zwischen zwei Sauerstoffatomen",
              "Bindung zwischen Schwefel und einem Kohlenstoffatom",
              "Kovalente Bindung zwischen zwei Schwefelatomen (-S-S-)",
              "Ionische Bindung zwischen Phosphor und Schwefel",
            ],
            correctIndex: 2,
            explanation:
              "Disulfidbindungen entstehen durch Oxidation zweier Cysteinreste (-SH + HS- → -S-S-). Sie stabilisieren die Tertiärstruktur von Proteinen, z. B. in Insulin.",
          },
          {
            id: "fg-5",
            question: "Welche funktionelle Gruppe verleiht Aminosäuren ihren basischen Charakter?",
            options: [
              "Carboxylgruppe (-COOH)",
              "Hydroxylgruppe (-OH)",
              "Aminogruppe (-NH₂)",
              "Thiolgruppe (-SH)",
            ],
            correctIndex: 2,
            explanation:
              "Aminogruppen (-NH₂) sind Lewis-Basen, die Protonen aufnehmen können (-NH₃⁺). Sie bestimmen den basischen pKa (~9,0) der α-Aminogruppe jeder Aminosäure.",
          },
        ],
      },
    ],
  },

  chemie: {
    topics: [
      {
        id: "organische-chemie",
        name: "Organische Chemie",
        emoji: "🧪",
        questions: [
          {
            id: "oc-1",
            question: "Was beschreibt eine nukleophile Substitution (SN)?",
            options: [
              "Addition eines Nukleophils an eine Doppelbindung",
              "Austausch einer Abgangsgruppe durch ein Nukleophil",
              "Abspaltung einer Abgangsgruppe ohne Ersatz",
              "Umlagerung von Bindungen innerhalb eines Moleküls",
            ],
            correctIndex: 1,
            explanation:
              "Bei der nukleophilen Substitution (SN1/SN2) greift ein Nukleophil (elektronenreiches Teilchen) ein Elektrophil an und verdrängt die Abgangsgruppe.",
          },
          {
            id: "oc-2",
            question: "Was sind Isomere?",
            options: [
              "Atome eines Elements mit unterschiedlicher Elektronenanzahl",
              "Verbindungen mit gleicher Summenformel, aber unterschiedlicher Struktur",
              "Atome desselben Elements mit unterschiedlicher Neutronenzahl (Isotope)",
              "Verbindungen mit gleicher Struktur, aber unterschiedlicher Summenformel",
            ],
            correctIndex: 1,
            explanation:
              "Isomere haben identische Summenformeln, unterscheiden sich jedoch in der räumlichen Anordnung oder Verknüpfung der Atome (Struktur- und Stereoisomere).",
          },
          {
            id: "oc-3",
            question: "Was kennzeichnet nach der Hückel-Regel einen Aromaten?",
            options: [
              "Beliebige Verbindung mit mehreren C=C-Doppelbindungen",
              "Zyklische, planare Verbindung mit (4n+2) π-Elektronen",
              "Gesättigte Ringverbindung mit einem Benzolring",
              "Jede Verbindung mit charakteristischem Benzolgeruch",
            ],
            correctIndex: 1,
            explanation:
              "Aromaten sind nach Hückel zyklisch, planar, vollständig konjugiert und haben (4n+2) π-Elektronen (n=0,1,2...). Benzol mit 6 π-Elektronen (n=1) ist das klassische Beispiel.",
          },
          {
            id: "oc-4",
            question: "Was passiert bei der alkalischen Verseifung (Saponifikation) eines Esters?",
            options: [
              "Esterbildung durch Kondensation von Säure und Alkohol",
              "Oxidation der Hydroxylgruppe zur Carbonylgruppe",
              "Hydrolyse des Esters zu Carboxylat-Salz und Alkohol",
              "Reduktion der Carbonylgruppe zur Hydroxylgruppe",
            ],
            correctIndex: 2,
            explanation:
              "Verseifung: Ester + NaOH → Carboxylat-Salz + Alkohol. Diese alkalische Esterhydrolyse ist die Grundlage der Seifenherstellung (Fette → Fettsäuresalze).",
          },
          {
            id: "oc-5",
            question: "Wodurch unterscheiden sich primäre, sekundäre und tertiäre Alkohole?",
            options: [
              "Durch die Länge der Kohlenstoffkette",
              "Durch die Anzahl der Hydroxylgruppen (-OH)",
              "Durch die Anzahl der Kohlenstoffatome am C-Atom mit der OH-Gruppe",
              "Durch die Art des verwendeten Lösungsmittels",
            ],
            correctIndex: 2,
            explanation:
              "Primär: C-OH trägt 1 C-Substituenten (R-CH₂OH). Sekundär: 2 C (R₂CHOH). Tertiär: 3 C (R₃COH). Dies beeinflusst die Oxidierbarkeit und Reaktivität erheblich.",
          },
        ],
      },
      {
        id: "saeurebase",
        name: "Säure-Base",
        emoji: "💧",
        questions: [
          {
            id: "sb-1",
            question: "Welchen pH-Wert hat eine 0,01 M Salzsäure (HCl)-Lösung?",
            options: ["pH 1", "pH 2", "pH 7", "pH 12"],
            correctIndex: 1,
            explanation:
              "pH = –log[H⁺] = –log(0,01) = –log(10⁻²) = 2. HCl ist eine starke Säure und in wässriger Lösung vollständig dissoziiert.",
          },
          {
            id: "sb-2",
            question: "Was ist die Aufgabe eines Puffersystems?",
            options: [
              "Puffer ändern den pH-Wert nach Säurezugabe drastisch",
              "Puffer halten den pH-Wert trotz Säure- oder Basezugabe in einem stabilen Bereich",
              "Puffer sind ausschließlich in industriellen Prozessen relevant",
              "Puffer bestehen immer aus starken Säuren und starken Basen",
            ],
            correctIndex: 1,
            explanation:
              "Ein Puffer (schwache Säure + konjugierte Base) widersteht pH-Änderungen. Das Blut-Puffersystem (HCO₃⁻/CO₂) hält den Blut-pH stabil bei ~7,4.",
          },
          {
            id: "sb-3",
            question: "Was bedeutet der pKa-Wert einer Säure?",
            options: [
              "Der pH-Wert bei vollständiger Dissoziation der Säure",
              "Der pH-Wert, bei dem [HA] = [A⁻] (Säure und Base gleich konzentriert)",
              "Der pH-Wert bei maximaler Pufferkapazität (= pKa + 1)",
              "Die Gleichgewichtskonstante der Neutralisationsreaktion",
            ],
            correctIndex: 1,
            explanation:
              "Am pKa gilt [HA] = [A⁻]. Die Henderson-Hasselbalch-Gleichung lautet: pH = pKa + log([A⁻]/[HA]). Ein niedriger pKa bedeutet eine stärkere Säure.",
          },
          {
            id: "sb-4",
            question: "Welche der folgenden Substanzen ist eine Lewis-Säure?",
            options: ["NH₃ (Ammoniak)", "OH⁻ (Hydroxid)", "BF₃ (Bortrifluorid)", "H₂O als Protonendonor"],
            correctIndex: 2,
            explanation:
              "Lewis-Säuren sind Elektronenpaar-Akzeptoren (z. B. BF₃, AlCl₃, Fe³⁺). Lewis-Basen sind Elektronenpaar-Donoren (NH₃, OH⁻). Der Lewis-Säure-Begriff ist weiter gefasst als Brønsted.",
          },
          {
            id: "sb-5",
            question: "Was ist eine Neutralisationsreaktion?",
            options: [
              "Oxidation einer Base durch eine Säure unter Elektronenübertragung",
              "Reaktion von Säure und Base zu Salz und Wasser (H⁺ + OH⁻ → H₂O)",
              "Deprotonierung einer starken Säure durch Erhitzen",
              "Autodissoziation von Wasser in H⁺ und OH⁻",
            ],
            correctIndex: 1,
            explanation:
              "Neutralisation: Säure + Base → Salz + Wasser. Der pH des entstandenen Salzes hängt von der Stärke der Ausgangssubstanzen ab (stark + stark → pH 7; schwach + stark → pH > 7).",
          },
        ],
      },
      {
        id: "stoechiometrie",
        name: "Stöchiometrie",
        emoji: "⚖️",
        questions: [
          {
            id: "st-1",
            question: "Was ist die Avogadro-Konstante Nₐ?",
            options: [
              "6,022 × 10²³ mol⁻¹",
              "8,314 J/(mol·K) (universelle Gaskonstante)",
              "1,602 × 10⁻¹⁹ C (Elementarladung)",
              "9,109 × 10⁻³¹ kg (Elektronenmasse)",
            ],
            correctIndex: 0,
            explanation:
              "Die Avogadro-Konstante Nₐ = 6,022 × 10²³ mol⁻¹ gibt die Anzahl der Teilchen (Atome, Moleküle, Ionen) in genau einem Mol einer Substanz an.",
          },
          {
            id: "st-2",
            question: "Wie viel Gramm wiegt 1 Mol Wasser (H₂O)?",
            options: ["1 g/mol", "2 g/mol", "16 g/mol", "18 g/mol"],
            correctIndex: 3,
            explanation:
              "Molare Masse M(H₂O) = 2 × M(H) + M(O) = 2 × 1 g/mol + 16 g/mol = 18 g/mol.",
          },
          {
            id: "st-3",
            question: "Was ist Stöchiometrie?",
            options: [
              "Die Lehre von der Edelgasstruktur und der Oktettregel",
              "Die quantitative Beziehung zwischen Reaktanten und Produkten in einer Reaktion",
              "Die Messung von Atomradien mit dem Röntgenbeugungsverfahren",
              "Die Theorie der kovalenten und ionischen Bindungen",
            ],
            correctIndex: 1,
            explanation:
              "Stöchiometrie beschreibt die quantitativen Mol-Verhältnisse zwischen Edukten und Produkten, abgeleitet aus dem balancierten Reaktionsgleichgewicht.",
          },
          {
            id: "st-4",
            question: "Reaktion: 2 H₂ + O₂ → 2 H₂O. Wie viele Mol Wasser entstehen aus 4 Mol H₂ (mit ausreichend O₂)?",
            options: ["2 Mol H₂O", "4 Mol H₂O", "8 Mol H₂O", "1 Mol H₂O"],
            correctIndex: 1,
            explanation:
              "Das stöchiometrische Verhältnis H₂:H₂O = 2:2 = 1:1. Aus 4 Mol H₂ entstehen daher 4 Mol H₂O (vorausgesetzt, genug O₂ ist vorhanden).",
          },
          {
            id: "st-5",
            question: "Was ist der Äquivalentpunkt bei einer Säure-Base-Titration?",
            options: [
              "Der Punkt maximaler Pufferkapazität (pH ≈ pKa)",
              "Der Punkt, an dem Analyt und Titrant vollständig miteinander reagiert haben",
              "Der Anfangs-pH der zu titrierenden Lösung",
              "Der Punkt, an dem pH = pKa (Henderson-Hasselbalch)",
            ],
            correctIndex: 1,
            explanation:
              "Am Äquivalentpunkt (= stöchiometrischer Punkt) sind Analyt und Titrant in exakt stöchiometrischen Mengen vorhanden – keine überschüssige Säure oder Base verbleibt.",
          },
        ],
      },
    ],
  },

  physik: {
    topics: [
      {
        id: "mechanik",
        name: "Mechanik",
        emoji: "⚙️",
        questions: [
          {
            id: "mech-1",
            question: "Was besagt das 2. Newtonsche Gesetz (Grundgesetz der Mechanik)?",
            options: [
              "Zu jeder Kraft gibt es eine gleich große, entgegengesetzte Kraft",
              "Die Kraft ist gleich dem Produkt aus Masse und Beschleunigung (F = m × a)",
              "Ein Körper in Ruhe bleibt in Ruhe, solange keine Kraft wirkt",
              "Der Gesamtimpuls eines abgeschlossenen Systems ist konstant",
            ],
            correctIndex: 1,
            explanation:
              "F = m × a. Die resultierende Kraft (in Newton) ist das Produkt aus Masse (kg) und Beschleunigung (m/s²). Dies ist die Grundlage der klassischen Mechanik.",
          },
          {
            id: "mech-2",
            question: "Welche SI-Einheit hat der Druck?",
            options: ["Newton (N)", "Joule (J)", "Pascal (Pa)", "Watt (W)"],
            correctIndex: 2,
            explanation:
              "Druck = Kraft/Fläche = N/m² = Pascal (Pa). In der Medizin gebräuchlich sind mmHg (Blutdruck) und hPa (Atemwegsdruck).",
          },
          {
            id: "mech-3",
            question: "Was ist die Formel für kinetische Energie?",
            options: [
              "Epot = m × g × h (potenzielle Energie)",
              "Ekin = ½ × m × v²",
              "Q = m × c × ΔT (Wärmeenergie)",
              "E = U × I × t (elektrische Energie)",
            ],
            correctIndex: 1,
            explanation:
              "Ekin = ½mv². Kinetische Energie hängt von Masse und quadratischer Geschwindigkeit ab. Relevant für die Blutflussdynamik (Bernoulli-Gleichung) in der Medizin.",
          },
          {
            id: "mech-4",
            question: "Was besagt das Archimedische Prinzip zum Auftrieb?",
            options: [
              "Auftrieb = Masse des eingetauchten Körpers × g",
              "Auftrieb = Gewichtskraft der verdrängten Flüssigkeit",
              "Auftrieb ist immer größer als die Schwerkraft des Körpers",
              "Auftrieb hängt nicht von der Dichte des umgebenden Mediums ab",
            ],
            correctIndex: 1,
            explanation:
              "FA = ρ_Flüssigkeit × V_verdrängt × g. Ein Körper schwimmt, wenn die Auftriebskraft ≥ Gewichtskraft. Dies erklärt Schwimmen und hydrostatisches Wiegen.",
          },
          {
            id: "mech-5",
            question: "Was ist mechanische Arbeit in der Physik?",
            options: [
              "W = F × t (Kraft mal Zeit = Impuls)",
              "W = F × d × cos(θ) (Kraft mal Weg)",
              "W = m × a (Masse mal Beschleunigung)",
              "W = E / t (Energie pro Zeit = Leistung)",
            ],
            correctIndex: 1,
            explanation:
              "W = F × d × cos(θ). Arbeit wird verrichtet, wenn eine Kraft einen Körper entlang einer Wegstrecke bewegt. Einheit: Joule (J) = N × m.",
          },
        ],
      },
      {
        id: "elektrophysiologie",
        name: "Elektrophysiologie",
        emoji: "⚡",
        questions: [
          {
            id: "ep-1",
            question: "Welches Ruhemembranpotential hat eine typische Nervenzelle?",
            options: ["0 mV", "+70 mV", "−70 mV", "−120 mV"],
            correctIndex: 2,
            explanation:
              "Das Ruhemembranpotential beträgt typischerweise −70 mV (Innenseite negativ). Es wird hauptsächlich durch K⁺-Ausstrom und die Na⁺/K⁺-ATPase aufrechterhalten.",
          },
          {
            id: "ep-2",
            question: "Was passiert bei der Depolarisation einer Nervenzelle?",
            options: [
              "Kalium-Ionen (K⁺) strömen in die Zelle ein",
              "Natrium-Ionen (Na⁺) strömen ein → Membranpotential steigt (wird positiver)",
              "Das Membranpotential wird noch negativer (Hyperpolarisation)",
              "Chlorid-Ionen (Cl⁻) strömen aus der Zelle aus",
            ],
            correctIndex: 1,
            explanation:
              "Bei Depolarisation öffnen spannungsgesteuerte Na⁺-Kanäle → Na⁺ strömt in die Zelle → Membranpotential steigt von −70 mV auf ca. +40 mV.",
          },
          {
            id: "ep-3",
            question: "Was besagt das Ohm'sche Gesetz?",
            options: ["P = U × I (Leistungsformel)", "U = R × I", "Q = C × U (Ladung an Kondensator)", "E = m × c²"],
            correctIndex: 1,
            explanation:
              "U = R × I (Spannung = Widerstand × Stromstärke). In Membranen entspricht die Ionenleitfähigkeit dem Kehrwert des Widerstands; Ionenflüsse folgen dem Ohm'schen Gesetz.",
          },
          {
            id: "ep-4",
            question: "Welche Ionen sind hauptsächlich für das Ruhemembranpotential verantwortlich?",
            options: ["Ca²⁺ und Cl⁻", "Na⁺ und Ca²⁺", "K⁺ und Na⁺", "Mg²⁺ und K⁺"],
            correctIndex: 2,
            explanation:
              "Das Ruhemembranpotential wird durch K⁺ (hohe Leitfähigkeit → Ausstrom) und Na⁺ (geringe Leitfähigkeit in Ruhe → minimaler Einstrom) sowie die Na⁺/K⁺-ATPase bestimmt.",
          },
          {
            id: "ep-5",
            question: "Was ist ein Aktionspotential?",
            options: [
              "Eine dauerhafter Spannungsanstieg über mehrere Sekunden",
              "Eine kurze, stereotypische elektrische Entladung nach dem Alles-oder-Nichts-Prinzip",
              "Eine langsame Hyperpolarisation über mehrere Minuten",
              "Ein gleichmäßiger, tonischer Ionenfluss ohne Schwellenwert",
            ],
            correctIndex: 1,
            explanation:
              "Ein Aktionspotential dauert ~1 ms und folgt dem Alles-oder-Nichts-Prinzip: Depolarisation → Umkehr (+40 mV) → Repolarisation → kurze Hyperpolarisation → Ruhepotential.",
          },
        ],
      },
      {
        id: "thermodynamik",
        name: "Thermodynamik",
        emoji: "🌡️",
        questions: [
          {
            id: "thermo-1",
            question: "Was besagt der 1. Hauptsatz der Thermodynamik?",
            options: [
              "Wärme fließt spontan immer von kalt nach warm",
              "Energie kann weder erzeugt noch vernichtet, nur umgewandelt werden (ΔU = Q − W)",
              "In isolierten Systemen nimmt die Entropie immer zu",
              "Bei 0 Kelvin ist die Entropie eines reinen Kristalls gleich null",
            ],
            correctIndex: 1,
            explanation:
              "1. Hauptsatz: ΔU = Q − W (innere Energieänderung = zugeführte Wärme − geleistete Arbeit). Energie ist immer erhalten – sie wird nur zwischen Formen umgewandelt.",
          },
          {
            id: "thermo-2",
            question: "Was ist die Enthalpie H?",
            options: [
              "Das Produkt aus Entropie und Temperatur (H = S × T)",
              "Der Wärmeinhalt bei konstantem Druck (H = U + pV)",
              "Die freie Gibbs-Energie einer Reaktion",
              "Die spezifische Wärmekapazität einer Substanz",
            ],
            correctIndex: 1,
            explanation:
              "Enthalpie H = U + pV. Bei konstantem Druck gilt ΔH = Qₚ. Exotherm: ΔH < 0 (Energie wird freigesetzt). Endotherm: ΔH > 0 (Energie wird aufgenommen).",
          },
          {
            id: "thermo-3",
            question: "Was gibt die Gibbs-Energie (ΔG) über eine Reaktion aus?",
            options: [
              "Die gesamte Wärmemenge, die bei der Reaktion umgesetzt wird",
              "Ob eine Reaktion spontan abläuft (ΔG < 0 = spontan, exergon)",
              "Die Änderung der Entropie ΔS bei konstanter Temperatur",
              "Die Aktivierungsenergie, die zur Initiierung der Reaktion nötig ist",
            ],
            correctIndex: 1,
            explanation:
              "ΔG = ΔH − TΔS. Wenn ΔG < 0: Reaktion ist spontan (exergon). Wenn ΔG > 0: nicht spontan (endergon). Im Gleichgewicht: ΔG = 0.",
          },
          {
            id: "thermo-4",
            question: "Was ist Entropie (S)?",
            options: [
              "Die gesamte Energiemenge, die bei einer Reaktion freigesetzt wird",
              "Ein Maß für die Unordnung bzw. die Anzahl möglicher Mikrozustände eines Systems",
              "Die Wärmekapazität eines Stoffes bei konstantem Volumen",
              "Die Aktivierungsenergie einer chemischen Reaktion",
            ],
            correctIndex: 1,
            explanation:
              "Entropie (S) misst die Unordnung/Verteilung von Zuständen. 2. Hauptsatz: In isolierten Systemen nimmt die Entropie zu (ΔS_Universum ≥ 0).",
          },
          {
            id: "thermo-5",
            question: "Was ist die spezifische Wärmekapazität c einer Substanz?",
            options: [
              "Die Wärmemenge pro Volumeneinheit (J/m³)",
              "Die Energie, die nötig ist, um 1 kg einer Substanz um 1 K zu erwärmen (J/(kg·K))",
              "Die Wärmemenge bei einem Phasenübergang (latente Wärme)",
              "Die Wärmemenge, die pro Zeiteinheit übertragen wird (Wärmestrom)",
            ],
            correctIndex: 1,
            explanation:
              "c = Q/(m × ΔT). Wasser hat eine sehr hohe spezifische Wärmekapazität (4,18 kJ/(kg·K)), die eine effektive Thermoregulation des menschlichen Körpers ermöglicht.",
          },
        ],
      },
    ],
  },

  biologie: {
    topics: [
      {
        id: "zellbiologie",
        name: "Zellbiologie",
        emoji: "🦠",
        questions: [
          {
            id: "zb-1",
            question: "Was ist die Hauptfunktion der Mitochondrien?",
            options: [
              "Proteinsynthese an membrangebundenen Ribosomen",
              "ATP-Produktion durch oxidative Phosphorylierung (OXPHOS)",
              "DNA-Replikation und Zellteilung",
              "Biosynthese von Membranlipiden",
            ],
            correctIndex: 1,
            explanation:
              "Mitochondrien sind die 'Kraftwerke' der Zelle. Sie produzieren ATP durch Atmungskette und OXPHOS. Sie besitzen eigene DNA und stammen aus einer endosymbiotischen Aufnahme.",
          },
          {
            id: "zb-2",
            question: "Welche Organelle ist der Ort der Proteinsynthese (Translation)?",
            options: ["Golgi-Apparat", "Mitochondrium", "Ribosom", "Lysosom"],
            correctIndex: 2,
            explanation:
              "Ribosomen (aus rRNA und Proteinen) sind der Ort der Translation. Sie kommen frei im Zytoplasma oder membrangebunden am rauen endoplasmatischen Retikulum (rER) vor.",
          },
          {
            id: "zb-3",
            question: "Was ist die Hauptfunktion des Golgi-Apparats?",
            options: [
              "ATP-Synthese durch die Atmungskette",
              "Modifikation, Sortierung und Verpackung von Proteinen für den intrazellulären Transport",
              "DNA-Replikation und RNA-Transkription",
              "Abbau von Makromolekülen durch saure Hydrolasen",
            ],
            correctIndex: 1,
            explanation:
              "Der Golgi-Apparat modifiziert Proteine (z. B. Glykosylierung) und sortiert sie in Transportvesikel für Lysosomen, Plasmamembran oder Sekretion.",
          },
          {
            id: "zb-4",
            question: "Was sind Lysosomen?",
            options: [
              "Organellen für die Photosynthese mit Chlorophyll",
              "Membranumschlossene Organellen mit sauren Hydrolasen zum Abbau von Makromolekülen",
              "Die Kernhülle mit Kernporen",
              "Ribosomen-Komplexe am rauhen ER",
            ],
            correctIndex: 1,
            explanation:
              "Lysosomen (pH ~5) enthalten hydrolytische Enzyme (Proteasen, Lipasen, Nukleasen). Sie sind zentral für Autophagie (Zellabbau), Phagozytose und intrazelluläre Verdauung.",
          },
          {
            id: "zb-5",
            question: "Was ist die Glykokalix?",
            options: [
              "Der Genompools der Mitochondrien-DNA",
              "Eine Schicht aus Glykoproteinen und Glykolipiden auf der Zellaußenseite",
              "Ein Typ von zytosolischen Ribosomen",
              "Die innere Membran der Mitochondrien mit Cristae",
            ],
            correctIndex: 1,
            explanation:
              "Die Glykokalix ist eine extrazelluläre Zuckerschicht auf der Zelloberfläche. Sie spielt eine Rolle bei Zell-Zell-Erkennung, Adhäsion, Immunabwehr und Schutz der Zellmembran.",
          },
        ],
      },
      {
        id: "genetik",
        name: "Genetik",
        emoji: "🧬",
        questions: [
          {
            id: "gen-1",
            question: "Was ist die Funktion der DNA-Polymerase?",
            options: [
              "Synthese von RNA aus einer DNA-Matrize (Transkription)",
              "Reparatur durch sequenzspezifische DNA-Spaltung (Restriktionsenzym)",
              "Neusynthese des komplementären DNA-Strangs in 5'→3'-Richtung",
              "Abbau von Proteinen durch proteolytische Spaltung",
            ],
            correctIndex: 2,
            explanation:
              "DNA-Polymerase synthetisiert den neuen DNA-Strang in 5'→3'-Richtung komplementär zur Matrize. Sie benötigt einen Primer (kurze RNA) und kann Fehler korrekturlesen.",
          },
          {
            id: "gen-2",
            question: "Welche RNA-Art transportiert Aminosäuren zum Ribosom?",
            options: [
              "mRNA (Boten-RNA, codiert die Proteinsequenz)",
              "rRNA (ribosomale RNA, Strukturbestandteil der Ribosomen)",
              "tRNA (Transfer-RNA, trägt spezifische Aminosäuren)",
              "hnRNA (prä-mRNA vor dem Spleißen)",
            ],
            correctIndex: 2,
            explanation:
              "tRNA erkennt mit ihrem Anticodon das komplementäre Codon der mRNA und liefert die zugehörige Aminosäure an die Peptidbindungsstelle des Ribosoms.",
          },
          {
            id: "gen-3",
            question: "Was ist ein Intron?",
            options: [
              "Ein kodierender DNA-Bereich, der für ein Protein codiert (Exon)",
              "Ein nicht-kodierender RNA-Abschnitt, der aus der prä-mRNA herausgespleißt wird",
              "Eine Startsequenz (Kozak-Sequenz) für die Translation",
              "Ein regulatorisches Promotorelement im Gen",
            ],
            correctIndex: 1,
            explanation:
              "Introns sind nicht-kodierende Sequenzen in eukaryotischen Genen, die nach der Transkription durch RNA-Spleißen entfernt werden. Die verbleibenden Exons bilden die reife mRNA.",
          },
          {
            id: "gen-4",
            question: "Was beschreibt das Zentrale Dogma der Molekularbiologie?",
            options: [
              "RNA → DNA → Protein (Retroviren-Weg)",
              "DNA → RNA → Protein (Transkription → Translation)",
              "Protein → DNA → RNA (Reverse-Transkription rückwärts)",
              "DNA wird direkt ohne RNA in Protein übersetzt",
            ],
            correctIndex: 1,
            explanation:
              "Das Zentrale Dogma (Crick, 1958): DNA → (Transkription) → RNA → (Translation) → Protein. Reverse Transkriptase erlaubt RNA→DNA bei Retroviren (z. B. HIV).",
          },
          {
            id: "gen-5",
            question: "Was ist eine Punktmutation?",
            options: [
              "Verdopplung eines gesamten Chromosomensatzes (Polyploidie)",
              "Austausch, Einschub oder Verlust eines einzelnen Nukleotids im DNA-Strang",
              "Deletion eines gesamten Gens durch chromosomalen Bruch",
              "Translokation eines Chromosomenabschnitts auf ein anderes Chromosom",
            ],
            correctIndex: 1,
            explanation:
              "Punktmutationen betreffen ein einziges Nukleotid. Sie können stille Mutationen (kein AS-Wechsel), Missense (AS-Wechsel) oder Nonsense-Mutationen (Stoppcodon) verursachen.",
          },
        ],
      },
      {
        id: "mikrobiologie",
        name: "Mikrobiologie",
        emoji: "🔬",
        questions: [
          {
            id: "mikro-1",
            question: "Was ist der wesentliche Unterschied zwischen Prokaryoten und Eukaryoten?",
            options: [
              "Prokaryoten besitzen keine Zellwand",
              "Prokaryoten besitzen keinen membranumschlossenen Zellkern (Nukleus)",
              "Prokaryoten können sich nicht durch Zellteilung vermehren",
              "Prokaryoten sind grundsätzlich größer als Eukaryoten",
            ],
            correctIndex: 1,
            explanation:
              "Prokaryoten (Bakterien, Archaeen) besitzen keinen echten Zellkern – ihre DNA liegt frei im Zytoplasma (Nukleoid). Eukaryoten haben einen membranumhüllten Kern mit Histonen.",
          },
          {
            id: "mikro-2",
            question: "Was ist die Minimale Hemmkonzentration (MHK) eines Antibiotikums?",
            options: [
              "Die Konzentration, die 50% der Bakterien abtötet (LD50)",
              "Die niedrigste Antibiotikakonzentration, bei der kein sichtbares Bakterienwachstum auftritt",
              "Die maximale Dosis ohne klinisch relevante Nebenwirkungen",
              "Die Serumkonzentration eines Antibiotikums nach oraler Einnahme",
            ],
            correctIndex: 1,
            explanation:
              "Die MHK ist die niedrigste Antibiotikakonzentration ohne sichtbare Wachstumszunahme. Sie ist ein Schlüsselparameter für die klinische Antibiotikaauswahl und Resistenztestung.",
          },
          {
            id: "mikro-3",
            question: "Welcher Zellwandbestandteil ist charakteristisch für grampositive Bakterien?",
            options: [
              "Lipopolysaccharid (LPS, Endotoxin)",
              "Dicke Peptidoglykanschicht (20–80 nm)",
              "Zusätzliche äußere Membran mit Porin-Kanälen",
              "Große Menge an Porinen in der äußeren Membran",
            ],
            correctIndex: 1,
            explanation:
              "Grampositive Bakterien haben eine dicke Peptidoglykanschicht. Gramnegative haben eine dünne Peptidoglykanschicht + äußere Membran mit LPS (Endotoxin → Sepsis-Mediator).",
          },
          {
            id: "mikro-4",
            question: "Was ist ein Virus?",
            options: [
              "Ein einzelliger Organismus mit eigenem Energiestoffwechsel",
              "Ein obligat intrazellulärer Krankheitserreger ohne eigene Zellstruktur",
              "Ein Pilz ohne ausgebildeten Zellkern (Prokaryot)",
              "Ein Bakterium ohne Zellwand (Mykoplasma)",
            ],
            correctIndex: 1,
            explanation:
              "Viren bestehen aus Nukleinsäure (DNA oder RNA) in einer Proteinhülle (Kapsid). Sie haben keinen eigenen Stoffwechsel und sind auf Wirtszellen zur Replikation angewiesen.",
          },
          {
            id: "mikro-5",
            question: "Was ist Sterilisation (im Unterschied zur Desinfektion)?",
            options: [
              "Reduktion der Keimzahl um mindestens 90% (1 log-Stufe)",
              "Vollständige Abtötung aller Mikroorganismen einschließlich Sporen",
              "Hemmung des Bakterienwachstums ohne Abtötung (Bakteriostase)",
              "Entfernung von Endotoxinen durch Ultrafiltration",
            ],
            correctIndex: 1,
            explanation:
              "Sterilisation = vollständige Elimination aller lebenden Mikroorganismen inkl. Sporen (z. B. Autoklavierung 121°C/15 min). Desinfektion tötet nur vegetative Keime, nicht Sporen.",
          },
        ],
      },
    ],
  },
};
