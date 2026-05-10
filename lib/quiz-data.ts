export type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
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
    
      {
        id: "docsdocs-biochemie1",
        name: "Docsdocs Biochemie 1",
        emoji: "🧬",
        questions: [
          {
            id: "02_biochemie1_1",
            question: "Welche der folgenden Aussagen zur Translation sind korrekt ?",
            options: [
              "Für jede Aminosäure gibt es genau ein Codon",
              "Die Polypeptidsynthese erfolgt vom N- bis zum C-Terminus",
              "Die Translationsrichtung an der mRNA ist 3' zu 5'",
              "Die Aminoacyl-tRNA bindet zuerst an der P-Stelle eines Ribosoms",
              "Die Ribosomen können frei im Zytosol vorliegen oder am rauen endoplasmatischen Retikulum verankert sein"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Die Ribosomen können frei im Zytosol vorliegen oder am rauen endoplasmatischen Retikulum verankert sein",
          },
          {
            id: "02_biochemie1_2",
            question: "Welches Enzym verknüpft die Okazaki-Fragmente während der Replikation ?",
            options: [
              "DNA Polymerase δ",
              "Helicase",
              "DNA Polymerase ε",
              "DNA-Ligase",
              "Primase"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: DNA-Ligase",
          },
          {
            id: "02_biochemie1_3",
            question: "Ein Molekül besteht aus Ceramid + Oligosaccharid mit einem oder mehreren Acetylneuraminsäureresten. Um welches Molekül handelt es sich am ehesten ?",
            options: [
              "Sphingomyelin",
              "Cerebrosid",
              "Phosphatidylserin",
              "Gangliosid",
              "Phosphatidylcholin"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Gangliosid",
          },
          {
            id: "02_biochemie1_4",
            question: "Was haben die zelluläre Replikation der DNA und die Transkription der mRNA nicht gemeinsam ?",
            options: [
              "Beide Prozesse benötigen Polymerasen",
              "Beide Prozesse benötigen Primer",
              "Beide Prozesse finden im Zellkern statt",
              "Beide Prozesse benötigen Helikasen",
              "Beide Prozesse benötigen Nukleotide"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Beide Prozesse benötigen Primer",
          },
          {
            id: "02_biochemie1_5",
            question: "Welche strukturellen Elemente sind dafür verantwortlich, dass die RNA- und DNA-Konzentrationen spektroskopisch bei 260nm bestimmt werden kann ?",
            options: [
              "Die Wasserstoffbrückenbindungen zwischen den komplementären Basen",
              "Die Phosphatreste",
              "Die Nukleobasen",
              "Die Ribose",
              "Die N-glykosidischen Bindungen"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Die Nukleobasen",
          },
          {
            id: "02_biochemie1_6",
            question: "Auf welches der folgenden Kohlenhydrate sollte man mit Lactoseintoleranz am ehesten verzichten ?",
            options: [
              "Saccharose",
              "Maltose",
              "Laktose",
              "Stärke",
              "Glykogen"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Laktose",
          },
          {
            id: "02_biochemie1_7",
            question: "Bei welchem Prozessierungsschritt ist der mRNA ist 7-Methyl-Guanosin involviert ?",
            options: [
              "RNA-editing",
              "Verbindung der Exonsequenzen beim splicen",
              "5'capping",
              "Bildung der Lariatstruktur beim Splicing",
              "Poli-Adenylierung des 3'Endes"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: 5'capping",
          },
          {
            id: "02_biochemie1_8",
            question: "Welche Auswirkung hat der Einsatz von Enzymen bei chemischen Reaktionen ?",
            options: [
              "Erhöhung von G0",
              "Erniedrigung von G0",
              "Absenkung der Aktivierungsenergie",
              "Erhöhung der Aktivierungsenergie",
              "Verschiebung der Gleichgewichtskonstante hin zum Produkt"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Absenkung der Aktivierungsenergie",
          },
          {
            id: "02_biochemie1_9",
            question: "In welcher Reihenfolge laufen die Reaktionen der intrazellulären Phase der Kollagenbiosynthese ab?1. Hydroxilierung und Glykosylierung2. cotranslationale Einschleusung ins ER3. Abspalten des Signalpeptids4. Assemblierung und Sekretion von Prokollagentripelhelices",
            options: [
              "3, 2, 1, 4 8 %",
              "2, 1, 3, 4 6 %",
              "2, 3, 1, 4 85 %",
              "2, 3, 4, 1",
              "3, 2, 4, 1"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: 2, 3, 1, 4 85 %",
          },
          {
            id: "02_biochemie1_10",
            question: "Welche Aussage zu Coenzymen trifft am ehesten nicht zu?",
            options: [
              "Coenzyme sind kleine organische Moleküle",
              "Coenzyme leiten sich oft von Vitaminen ab",
              "Coenzyme werden während der Reaktion oft chemisch verändert und müssen anschließend regeneriert werden",
              "Coenzyme kann man in prosthetische Gruppen und Cosubstrate unterteilen",
              "Coenzyme sind ein Teil des Apoenzyms"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Coenzyme sind ein Teil des Apoenzyms",
          },
          {
            id: "02_biochemie1_11",
            question: "An welcher ribosomalen tRNA-Bindestelle erfolgt die initiale komplementäre Basenpaarung zwischen Codon und Anticodon?",
            options: [
              "An der Exit-Stelle (E-Stelle)",
              "An der Ribozym-Stelle (R-Stelle)",
              "An der Akzeptor-Stelle (A-Stelle)",
              "An der Transfer-Stelle (T-Stelle)",
              "An der Peptidyl-Stelle (P-Stelle)"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: An der Akzeptor-Stelle (A-Stelle)",
          },
          {
            id: "02_biochemie1_12",
            question: "Welche Aufgabe hat die DNA-Polymerase ⍺ bei der Replikation, die die DNA-Polymerase δ nicht hat?",
            options: [
              "Die Ligation von Okazaki-Fragmenten 1 %",
              "Die Abspaltung von Nukleotiden durch eine 3'-5'-Exonukleaseaktivität 23 %",
              "Die Synthese von RNA-Primern 61 %",
              "Die Verlängerung des 3'-Endes 6 %",
              "Die Abspaltung von Nukleotiden durch eine 5'-3'-Exonukleaseaktivität 6 %"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Die Synthese von RNA-Primern 61 %",
          },
          {
            id: "02_biochemie1_13",
            question: "Die Lactatdehydrogenase (LDH) wandelt Lactat und Pyruvat ineinander μm. Zu welcher Enzymklasse gehört dieses Enzym?",
            options: [
              "Hydrolase",
              "Ligase",
              "Lyase",
              "Oxidoreduktase",
              "Transferase"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Oxidoreduktase",
          },
          {
            id: "02_biochemie1_14",
            question: "Patienten, die an Osteogenesis imperfecta (\"Glasknochenkrankheit\") leiden, weisen häufig Punktmutationen in den Genen für die Ketten des Typ-I-Kollagens auf, die ein Codon der Aminosäuren betreffen, die normalereise am häufigsten in reifem fibrillärem Typ-I-Kollagen vertreten ist. Um welche Aminosäure handelt es sich?",
            options: [
              "Cystein",
              "Alanin",
              "Histidin",
              "Asparagin",
              "Glycin"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Glycin",
          },
          {
            id: "02_biochemie1_15",
            question: "Welche Aussage zu Isoenzymen ist richtig?",
            options: [
              "Es handelt sich immer μm oligomere Proteine mit mehreren identischen Untereinheiten 3 %",
              "Sie haben denselben isoelektrischen Punkt (IP) 5 %",
              "Sie können unterschiedliche Affinitäten zu ihren Substraten haben. 86 %",
              "Sie haben identische Molekulargewichte",
              "Sie sind durch reversible Phosphorylierung/ Dephosphorylierung entstehende Formen desselben Proteins. 1 %"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Sie können unterschiedliche Affinitäten zu ihren Substraten haben. 86 %",
          },
          {
            id: "02_biochemie1_16",
            question: "Codierende BEreiche der DNA werden ____ genannt, nicht-codierende Bereiche heissen ____. Während der RNA-Prozessierung werden sie entfernt, dieser Vorgang heisst ____.",
            options: [
              "Exons, Introns, Transkription",
              "Exons, Introns, Spleißen",
              "Introns, Exons, Spleißen",
              "Introns, Exons, Transkription",
              "Exons, Introns, Replikation"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Exons, Introns, Spleißen",
          },
          {
            id: "02_biochemie1_17",
            question: "Für welchen Schritt der Kollagen-Synthese ist Vitamin C erforderlich?",
            options: [
              "Bildung von Disulfid-Brücken bei der Kollagen-Bildung",
              "Oxidative Desaminierung für die Quervernetzung von unlöslichen Kollagenfibrillen",
              "Hydroxylierung der Prolinreste von der Prolylhydroxylase",
              "Ausschleusung von Prokollagen in die extrazelluläre Matrix",
              "Zusammenlagerung von Kollagen-Fibrillen zu stabilen Fibrillen"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Hydroxylierung der Prolinreste von der Prolylhydroxylase",
          },
          {
            id: "02_biochemie1_18",
            question: "Welche RNA-Sequenz wird durch die RNA-Polymerase synthetisiert, wenn der codierende Strang die folgende Sequenz hat?5'-TGATACGTAGCTAGCTC-3'",
            options: [
              "5'-GAGCUAGCUACGUAUCA-3'",
              "5'-CUCGAUCGAUGCAUAGU-3'",
              "5'-ACUAUGCAUCGAUCGAG-3'",
              "5'-TGATACGTAGCTAGCTC-3'",
              "5'-UGAUACGUAGCUAGCTC-3'"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: 5'-UGAUACGUAGCUAGCTC-3'",
          },
          {
            id: "02_biochemie1_19",
            question: "Warum wird SDS bei der Elektrophorese von Proteinen eingesetzt?",
            options: [
              "SDS umhüllt das Protein mit einer negativen Ladung, sodass die Probe unabhängig von den Aminosäureeigenladungen durch das Gel wandern kann 66 %",
              "SDS ist eine spezielle Protease, die große Proteine in der Probe verdaut 1 %",
              "SDS ermöglicht die Bindung des Coomassie-Blau-Farbstoffs an die Proteine im Gel, sodass diese sichtbar werden. 9 %",
              "SDS erhöht das Molekulargewicht jeder Probe, sodass die Proteine nicht über das Ende des Gels hinauslaufen 9 %",
              "Keine der Aussagen ist korrekt. 12 %"
            ],
            correctIndex: 0,
            explanation: "Die richtige Antwort ist: SDS umhüllt das Protein mit einer negativen Ladung, sodass die Probe unabhängig von den Aminosäureeigenladungen durch das Gel wandern kann 66 %",
          },
          {
            id: "02_biochemie1_20",
            question: "Welches der folgenden Moleküle enthält Fructose als Bestandteil?",
            options: [
              "Cellulose",
              "Isomaltose",
              "Lactose",
              "Maltose",
              "Saccharose"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Saccharose",
          },
          {
            id: "02_biochemie1_21",
            question: "Der Glucose Transporter 2 (GLUT2I wrid von den Zellen der Leber, der Niere und des Dünndarms exprimiert udn ist neben der Glucose auch für den Transport anderer Zucker verantwortlich. Zu welchem Zucker hat GLUT2 die höchste Affinität gemäß der folgenden KM-Werte?(Zucker - KM)Glukose - 17 mMGalaktose - 92 mMMannose - 125 mMFruktose - 76 mMGlukosamin - 0,8 mM",
            options: [
              "Glukose 8 %",
              "Galaktose 4 %",
              "Mannose 4 %",
              "Fruktose",
              "Glukosamin 82 %"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Glukosamin 82 %",
          },
          {
            id: "02_biochemie1_22",
            question: "Bei der Klonierung von eukaryotischen Genen für die Expression in prokaryotischen Organismen (z.B. Expression menschlichen Insulins in Bakterien) wird das Gen zunächst mittels einer PCR amplifiziert. Als Vorlage (Template) dient bei dieser Reaktion zumeist eine cDNA des Gens und nicht isolierte genomische DNA. Was ist am ehesten der Grund für diesen Umstand?",
            options: [
              "Genomische DNA ist an Histone gebunden, welche eine PCR-Amplifikation verhindern. 13 %",
              "Genomische DNA enthält single nucleotide polymorphisms (SNPs), welche zu Genmutationen im fertigen Genkonstrukt führen 13 %",
              "Genomische DNA hat, im Vergleich zur cDNA, eine zu hohe Schmelztemperatur für die PCR 3 %",
              "Genomische DNA enthält, im Gegensatz zu cDNA, Introns, welche die Prokaryoten nicht durch Spleißen entfernen können. 66 %",
              "Genomische DNa enthält zu viele Schnittstellen für Restriktionsendonukleasen, die während der Klonierung zu Problemen führen. 3 %"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Genomische DNA enthält, im Gegensatz zu cDNA, Introns, welche die Prokaryoten nicht durch Spleißen entfernen können. 66 %",
          },
          {
            id: "02_biochemie1_23",
            question: "Sie verdünnen 200μl ihrer DNA Probe mit 800μl H2O und messen anschliessend einen Extinktionswert von 1,5- Bestimmen Sie die DNA-Konzentration (cDNA) in Ihrer Probe!",
            options: [
              "300 μl/ml 16 %",
              "325 μl/ml 9 %",
              "350 μl/ml 18 %",
              "375 μl/ml 52 %",
              "400 μl/ml 1 %"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: 375 μl/ml 52 %",
          },
          {
            id: "02_biochemie1_24",
            question: "In welcher Reihenfolge eluieren die Aminosäuren Glycin, Aspartat und Arginin, wenn sie mit einem Kationenaustauscher bei pH7 aufgetrennt werden?",
            options: [
              "Glycin, Aspartat, Arginin",
              "Aspartat, Glycin, Arginin",
              "Arginin, Aspartat, Glycin",
              "Arginin, Glycin, Aspartat",
              "Glycin, Arginin, Aspartat"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Aspartat, Glycin, Arginin",
          },
          {
            id: "02_biochemie1_25",
            question: "Die Michaelis-Menten-Gleichung beschreibt die Geschwindigkeit enzymkatalysierter Reaktionen in Abhängigkeit von der Substratkonzentration. Wie groß muss die Substratkonzentration sein, μm 90% Maximalgeschwindigkeit einer enzymatischen Reaktion zu erreichen?",
            options: [
              "gleich KM",
              "4,5 KM",
              "9 KM",
              "18 KM",
              "90 KM"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: 9 KM",
          },
          {
            id: "02_biochemie1_26",
            question: "Durch welches Enzym wird die Transkription der 28S-rRNA am ehesten erfolgen?",
            options: [
              "Die DNA-Polymerase-α",
              "Die RNA-Polymerase-III",
              "Die RNA-Polymerase-I",
              "Die RNA-Polymerase-II",
              "Die Oligosaccharyltransferase"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Die RNA-Polymerase-I",
          },
          {
            id: "02_biochemie1_27",
            question: "Welche Aussage zur Telomerase trifft am ehesten zu?",
            options: [
              "Sie ist über die Telomer-Methylierung an der Epigenetik beteiligt",
              "Sie ist in Keimzellen aktiv und ist eine RNa-abhängige DNA-Polymerase",
              "Sie schützt die Telomere durch Anhängen von DNA-Primern",
              "Sie ist in somatischen Zellen aktiv und ist eine DNA-abhängige DNA-Polymerase",
              "Sie verkürzt die Telomere bei jeder Replikationsrunde in somatischen Zellen."
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Sie ist in Keimzellen aktiv und ist eine RNa-abhängige DNA-Polymerase",
          }
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
    
      {
        id: "docsdocs-chemie",
        name: "Docsdocs Chemie",
        emoji: "🧪",
        questions: [
          {
            id: "1",
            question: "Wie wirkt sich die Hydrathülle auf die Größe der Alkali-Kationen von Li, Na und K aus?",
            options: [
              "Die Hydrathülle übt keinen Einfluss auf die Größe der Alkali-Kationen aus.",
              "Der Radius der hydratisierten Ionen nimmt vom Lithium über Natrium zum Kalium hin ab.",
              "Die Ionen haben nach der Hydratisierung alle die gleiche Größe",
              "Die Alkali-Ionen reagieren mit dem Wasser, unter Freisetzung von Wasserstoff, zu ihren Oxiden",
              "Die Hydrathülle orientiert sich mit den Wasserstoffatomen voran in Richtung der Alkali-Ionen"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Der Radius der hydratisierten Ionen nimmt vom Lithium über Natrium zum Kalium hin ab.",
          },
          {
            id: "2",
            question: "Welche Anordnung haben die Bindungen um ein sp3-hybridisiertes Kohlenstoffatom?",
            options: [
              "Trigonal planar",
              "Quadratisch planar",
              "Tetraedrisch",
              "Oktaedrisch",
              "Linear"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Tetraedrisch",
          },
          {
            id: "3",
            question: "Wie lautet das korrekte Massewirkungsgesetz für die folgende Reaktion? 3 H2 + N2 ⇌ 2 NH3",
            options: [
              "Option 1",
              "Option 2",
              "Option 3",
              "Option 4",
              "Option 5"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Option 5",
          },
          {
            id: "4",
            question: "Welche Reaktion wird voraussichtlich freiwillig ablaufen?",
            options: [
              "∧H = -50 kJ/mol ; ∧S= -0,025 kJ/ mol*K; ∧T= 3000K",
              "∧H= -50 kJ/mol; ∧S= -0,025 kJ/mol*K; ∧T= 300K",
              "∧H= 50 kJ/mol; ∧S= 0,025 kJ/mol*K; ∧T= 300K",
              "∧H= 50 kJ/mol; ∧S= 0,025 kJ/mol*K; ∧T= 2000K",
              "∧H= 50 kJ/mol; ∧S= -0,025 kJ/mol*K; ∧T= 3000K"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: ∧H= -50 kJ/mol; ∧S= -0,025 kJ/mol*K; ∧T= 300K",
          },
          {
            id: "5",
            question: "Welche Aussage zu 3517Cl ist korrekt?",
            options: [
              "Chlor hat 18 Neutronen in der Atomhülle.",
              "Chlor steht in der 1. Hauptgruppe.",
              "Chlor erreicht durch Elektronenabgabe das Elektronenoktett.",
              "Chlor hat 17 Protonen im Atomkern.",
              "Chlor besitzt acht Valenzelektronen."
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Chlor hat 17 Protonen im Atomkern.",
          },
          {
            id: "6",
            question: "Wie hoch ist die maximale positive Oxidationszahl des Elements Stickstoff?",
            options: [
              "+ III",
              "+ IV",
              "+ V",
              "+ VI",
              "+ VII"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: + V",
          },
          {
            id: "7",
            question: "Unter Verseifung wird verstanden:",
            options: [
              "Die Herabsetzung der Oberflächenspannung des Wassers.",
              "Die Umsetzung höherer Fette (Triglyceride) mit Natriumhydroxid.",
              "Das Ausfällen von Fetten im Wasser.",
              "Die Anlagerung von Wasserstoff an die Doppelbindungen ungesättigter Fettsäuren.",
              "Die saure Spaltung eines Esters."
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Die Umsetzung höherer Fette (Triglyceride) mit Natriumhydroxid.",
          },
          {
            id: "8",
            question: "Welche Eigenschaften hat ein Eletrophil?",
            options: [
              "Eine Elektrophil ist immer negativ polarisiert.",
              "Ein Eletrophil hat immer eine hohe Eletronegativität.",
              "Ein Eletrophil muss ein Kation sein.",
              "Ein Eletrophil muss ein Elektron sein.",
              "Ein Elektrophil hat eine Elektronenlücke."
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Ein Elektrophil hat eine Elektronenlücke.",
          },
          {
            id: "9",
            question: "Welche Oxidationszahl hat das α-C-Atom (rot markiert) in der abgebildeten chemischen Verbindung?",
            options: [
              "- IV",
              "- III",
              "Option 3",
              "+ III",
              "+ IV"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: + III",
          },
          {
            id: "10",
            question: "Welche Aussage zu Mesomerie ist nicht zutreffend?",
            options: [
              "Die reale Struktur eines Moleküls mit mesomeren Grenzstrukturen liegt zw. diesen möglichen Strukturen.",
              "Mesomere Grenzstrukturen werden durch folgenden Pfeil gekennzeichnet: ↔",
              "Ein bekanntes Beispiel für ein Molekül mit mesomeren Grenzstrukturen ist der Benzolring",
              "Es gibt immer genau drei mesomere Grenzstrukturen für ein Molekül",
              "Ionen mit mesomeren Grenzstrukturen können ihre Ladung über das Molekül verteilen"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Es gibt immer genau drei mesomere Grenzstrukturen für ein Molekül",
          },
          {
            id: "11",
            question: "Zwischen welchen Atomen würde sich eine polar-kovalente Bindung ausbilden?",
            options: [
              "Na und Cl",
              "Mg und F",
              "C und H",
              "H und Cl",
              "K und Br"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: H und Cl",
          },
          {
            id: "12",
            question: "Folgende Reaktion befindet sich im Gleichgewicht:Welche Aussage ist korrekt?",
            options: [
              "Wird die Konzentration von H2 verringer, verschiebt sich das Gleichgewicht auf Produktseite",
              "Wird HI aus dem System entfernt, verschiebt sich das Gleichgewicht auf Eduktseite",
              "Bei Erhöhung der Temperatur verschiebt sich das Gleichgewicht auf Produktseite",
              "Eine Druckänderung hat keine Auswirkung auf die Lage des Gleichgewichts",
              "Wird Iod dem System hinzugefügt, verschiebt sich das Gleichgewicht nicht"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Eine Druckänderung hat keine Auswirkung auf die Lage des Gleichgewichts",
          },
          {
            id: "13",
            question: "Wie viele Elektronen passen in die p-Orbitale einer Atomschale?",
            options: [
              "Option 1",
              "Option 2",
              "Option 3",
              "Option 4",
              "Option 5"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Option 2",
          },
          {
            id: "14",
            question: "Proteine sind vielfältige und essenzielle Stoffe für den menschlichen Körper. Ein Protein besteht aus bis zu 30.000 einzelnen Aminosäuren in einer definierten Sequenz, die sich dann über intramolekulare Wechselwirkungen zu Helices oder Faltblättern anordnen. Allem zugrunde liegt jedoch die Bindung der Aminosäuren in der Primärstruktur. Diese wird durch sogenannte Peptidbindungen realisiert.Zu welcher Klasse der funktionellen Gruppen gehört die Peptidbindung am ehesten?",
            options: [
              "Ester",
              "Alkohole",
              "Aldehyde",
              "Amine",
              "Amide"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Amide",
          },
          {
            id: "15",
            question: "Wie viel Mol sind 13,4g Kupfer(II)-chlorid? (Atommassen: Cu= 63u; Cl=35,5 u)",
            options: [
              "0,05 mol",
              "0,1 mol",
              "0,2 mol",
              "0,3 mol",
              "0,4 mol"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: 0,1 mol",
          },
          {
            id: "16",
            question: "Wie lautet die korrekte und vollständige Elektronenkonfigurationvon 20Ca2+?",
            options: [
              "Option 1",
              "Option 2",
              "Option 3",
              "Option 4",
              "Option 5"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Option 2",
          },
          {
            id: "17",
            question: "Welche der folgenden Säure-Base-Kombinationen ist am ehesten geeignet einen pH-Wert von 12 zu stabilisieren?",
            options: [
              "Option 1",
              "Option 2",
              "Option 3",
              "Option 4",
              "Option 5"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Option 3",
          },
          {
            id: "18",
            question: "Eine Reaktion mit",
            options: [
              "... befindet sich bei Raumtemperatur im Gleichgewicht",
              ".... verläuft bei niedrigen Temperaturen freiwillig, bei hohen Temperaturen nicht",
              "... verläuft niemals freiwillig",
              "... verläuft ab einer Temperatur von T> 2000K freiwillig",
              "... kann zweifelsfrei durch eine Erhöhung des Drucks begünstigt werden"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: ... verläuft niemals freiwillig",
          },
          {
            id: "19",
            question: "Um welche Art von Isomerie handelt es sich im folgendem Beispiel?",
            options: [
              "Konstitutionsisomere",
              "Konformationsisomere",
              "Enantiomere",
              "E/Z-Isomere",
              "Diastereomere"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Enantiomere",
          },
          {
            id: "20",
            question: "Welche funktionelle Gruppe wird beim Ringschluss von Glucose zu seiner Pyranoseform gebildet?",
            options: [
              "Aldehydgruppe",
              "Cyclisches Halbacetal",
              "Acyclisches Halbacetal",
              "Cyclisches Vollacetal",
              "Acyclisches Vollacetal"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Cyclisches Halbacetal",
          },
          {
            id: "21",
            question: "Die Fehling-Probe wird gemeinhin zum Naschweis von Aldehydgruppen herangezogen. Welche der folgenden Verbindungen, die keine Aldehydgruppe enthält, reagiert trotzdem positiv auf diese Nachweisreaktion?",
            options: [
              "Saccharose",
              "Fructose",
              "Kaliumpermanganat",
              "Dimethylether",
              "Tert-Butanol"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Fructose",
          },
          {
            id: "22",
            question: "Diie folgende Aminosäure gehört zu der Gruppe der...",
            options: [
              "... basischen Aminosäuren",
              "... sauren Aminosäuren",
              "... neutralen Aminosäuren mit polarer Seitenkette",
              "... neutralen Aminosäuren mit unpolarer Seitenkette",
              "... aromatischen Aminosäuren"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: ... neutralen Aminosäuren mit unpolarer Seitenkette",
          },
          {
            id: "23",
            question: "Welche Orbitale sind an der Bildung von sp2- Hybridorbitalen beteiligt?",
            options: [
              "Vier s-Orbitale",
              "Ein s-Orbital und drei p-Orbitale",
              "Zwei s-Orbitale und zwei p-Orbitale",
              "Ein s-Orbital und zwei p-Orbitale",
              "Ein s-Orbital und ein p-Orbital"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Ein s-Orbital und zwei p-Orbitale",
          },
          {
            id: "24",
            question: "Eine Säure nach Brønsted...",
            options: [
              "... ist umso stärker, je größer der pKs-Wert ist",
              "... ist ein Teilchen, das Protonen aufnehmen kann (Protonenakzeptor)",
              "... lässt sich über ihre Anzahl an abgegebenen Protonen in starke oder schwache Säuren einteilen",
              "... ist ein Teilchen, das Protonen abgeben kann (Protonendonator)",
              "... kann nur durch Reaktion mit einer gleich starken Brøsted-Base neutralisiert werden"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: ... ist ein Teilchen, das Protonen abgeben kann (Protonendonator)",
          },
          {
            id: "25",
            question: "Gegeben ist ein Essigsäure/ Acetatpuffer mit Konzentrationen cSäure= 0,1 mol/L und cBase= 1 mol/ L ( pKs(Essigsäure)= 4,75).Wie groß ist der pH-Wert?",
            options: [
              "2,75",
              "3,75",
              "4,75",
              "5,75",
              "6,75"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: 5,75",
          },
          {
            id: "26",
            question: "Aus wie vielen Aminosäuren besteht das nachfolgende Molekül?",
            options: [
              "Option 1",
              "Option 2",
              "Option 3",
              "Option 4",
              "Option 5"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Option 3",
          },
          {
            id: "27",
            question: "Welche Aussage zu den abgebildeten Verbindungen trifft nicht zu?",
            options: [
              "1 und 2 sind Konstitutionsisomere",
              "1 heißt Ethanol, 2 heißt Dimethylether",
              "1 hat einen höheren Siedepunkt als 2",
              "1 ist schlechter wasserlöslich als 2",
              "Die Summenformelvon 1 und 2 lautet C2H6O"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: 1 ist schlechter wasserlöslich als 2",
          },
          {
            id: "28",
            question: "Wie viele Stereozentren befinden sich im folgenden Molekül?",
            options: [
              "Option 1",
              "Option 2",
              "Option 3",
              "Option 4",
              "Option 5"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Option 3",
          },
          {
            id: "29",
            question: "Welchen pH-Wert hat eine Ammoniak Lösung mit einer Konzentration 10-3 mol/L (pKB= 4,8)?",
            options: [
              "Option 1",
              "3,9",
              "Option 3",
              "10,1",
              "13,3"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: 10,1",
          },
          {
            id: "30",
            question: "Warum sind kurzkettige Alkohole gut als universelle Lösungsmittel einsetzbar?",
            options: [
              "Sie können sowohl als Säure als auch als Base wirken",
              "Sie können leicht oxidiert bzw. reduziert werden",
              "Sie haben sowohl einen polaren als auch einen unpolaren MolekülAnteil",
              "Sie bilden keine Wasserstoffbrückenbindungen aus",
              "Sie sind sehr klein und können damit gelöste Stoffe gut umlagern"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Sie haben sowohl einen polaren als auch einen unpolaren MolekülAnteil",
          },
          {
            id: "31",
            question: "Wie kann ein Stereozentrum in einem Molekül identifiziert werden?",
            options: [
              "Ein Stereozentrum trägt immer eine Alkohol-Gruppe",
              "Ein Stereozentrum ist immer an der Keilstrichschreibweise erkennbar",
              "Ein Stereozentrum trägt vier verschiedene Substituenten",
              "Ein Stereozentrum ist das am höchsten oxidierte C-Atom der Verbindung",
              "Ein Stereozentrum bindet immer an mind. Ein Wasserstoffatom"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Ein Stereozentrum trägt vier verschiedene Substituenten",
          },
          {
            id: "32",
            question: "Wie viele Elektronen werden bei der Oxidation von Stickstoffmonoxid (NO) zum Nitrat-Ion (NO3-) übertragen?",
            options: [
              "Option 1",
              "Option 2",
              "Option 3",
              "Option 4",
              "Option 5"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Option 4",
          },
          {
            id: "33",
            question: "Welche Aussage zum elektrochemischen Potential eines Stoffes ist am ehesten zutreffend?",
            options: [
              "die Standard-Silberelektrode ist das Bezugssystem für die elektrochemische Spannungsreihe",
              "Aus der Nernst-Gleichung geht der hervor, dass der pH-Wert einen Einfluss auf alle elektrochemischen Potentiale hat",
              "Die Zahlenwerte der Standardpotentiale sind immer in Relation zur Standardwasserstoffelektrode angegeben",
              "Die Abhängigkeit des Potentials von der Konzentration wird in der Henderson-Hasselbach-Gleichung ausgedrückt",
              "Die Elektrolytlösungen der beiden Halbzellen eines Daniell_Elements müssen ohne Verbindung zueinander vorliegen, damit keine störende Reaktionen auftreten können"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Die Zahlenwerte der Standardpotentiale sind immer in Relation zur Standardwasserstoffelektrode angegeben",
          },
          {
            id: "34",
            question: "In welcher Realstruktur liegt das Ammoniakmolekül (NH3) gemäßdes VSEPR-Modells vor?",
            options: [
              "tetraedrisch",
              "gewinkelt",
              "trigonal planar",
              "trigonal pyramidal",
              "linear"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: trigonal pyramidal",
          },
          {
            id: "35",
            question: "Wie viele Bindungspartner hat jeweils ein Kohlenstoffatom, wenn es sp-, sp2- und sp3-hybridisiert vorliegt? (Reihenfolge: sp, sp2, sp3)",
            options: [
              "je 4",
              "1, 2, 3",
              "2, 3, 4",
              "4, 3, 2",
              "3, 2, 1"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: 2, 3, 4",
          },
          {
            id: "36",
            question: "Warum ist Cyclohexan eine besonders stabiele cyclische Verbindung?",
            options: [
              "Die hohe Symmetrie der Kohlenstoffatome sorgt für die hohe Stabilität",
              "Die Kohlenstoff-Kohlenstoff-Bindungen sind ausschließlich sp- hybridisiert. Dies verstärkt die Stabilität.",
              "Cyclohexan ist ein Derivat des sehr stabilen Benzols",
              "Durch Eigendrehimpuls cyclischer Verbindungen bilden sich unbegrenzte mesomere Grenzstrukturen aus, die das Molekül stabilisieren",
              "Die Kohlenstoffatome im Cyclohexan sind tetraedrisch angeordenet, wodurch die Ringspannung minimal wird"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Die Kohlenstoffatome im Cyclohexan sind tetraedrisch angeordenet, wodurch die Ringspannung minimal wird",
          },
          {
            id: "37",
            question: "Welche der abgebildeten Moleküle zeigt eine Aldehydgruppe?",
            options: [
              "Option 1",
              "Option 2",
              "Option 3",
              "Option 4",
              "Option 5"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Option 3",
          },
          {
            id: "38",
            question: "Bestimmen Sie die Konfiguration des Stereozentrums und der Doppelbindung der folgenden Moleküle.",
            options: [
              "R und E",
              "R und Z",
              "S und E",
              "S und Z",
              "syn und anti"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: S und E",
          }
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
    
      {
        id: "docsdocs-physik",
        name: "Docsdocs Physik",
        emoji: "⚡",
        questions: [
          {
            id: "01_physik_1",
            question: "In 10m Tiefe ( Wasserdruck: 1 bar) beinhaltet ein Liter Meerwasser ca. 35g gelöste Salze ( vorwiegend Na+ und Cl- Ionen) Etwa wieviel gelöste Salze würden sie in 20m Tiefe ( Wasserdruck: 2 bar) erwarten ?",
            options: [
              "3,5g",
              "17,5g",
              "20g",
              "35g",
              "70g"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: 35g",
          },
          {
            id: "01_physik_2",
            question: "Welche der folgenden Aussagen zum Prinzip der Energieerhaltung in einem geschlossenen System ist richtig ?",
            options: [
              "Energie kann aus dem Nichts erzeugt werden und ebenso vernichtet werden.",
              "Energie kann aus dem Nichts erzeugt werden, aber nicht vernichiet werden.",
              "Energie kann aus dem Nichts erzeugt werden, aber vernichtet werden.",
              "Es gibt so etwas wie das Prinzip der Energiesmaltung nicht.",
              "Energie kann nicht aus dem Nichts erzeugt werden und nicht vernichtet werden."
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Energie kann nicht aus dem Nichts erzeugt werden und nicht vernichtet werden.",
          },
          {
            id: "01_physik_3",
            question: "Der Bungsberg ist der höchste Berg in Schleswig-Holstein, mit einer Höhe von ca. 160m über dem Meeresspiegel. Wie hoch ist auf dem Gipfel dieses Berges der atmosphärische Luftdruck am ehesten?",
            options: [
              "1,02 bar",
              "0,98 bar",
              "0,95 bar",
              "0,80 bar",
              "0,59 bar"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: 0,98 bar",
          },
          {
            id: "01_physik_4",
            question: "Sie bauen ein Analysegerät, bei dem Flüssigkeit durch mehrere Rohre fließen muss. Für einen Teil des Gerätes haben Sie zwei Rohre zur Auswahl, Rohr A und Rohr B. Rohr A hat einen doppelt so großen Radius wie Rohr B, ist aber nur halb so lang. Wenn dieselbe Flüssigkeit mit demselben Druck durch beide Rohre gepumpt wird, wie unterscheidet sich der Volumenstrom in beiden Rohren?",
            options: [
              "Er ist in beiden Rohren gleich groß.",
              "Er ist in Rohr A 8-mal so groß wie in Rohr B.",
              "Er ist in Rohr A 16-mal so groß wie in Rohr B",
              "Er ist in Rohr A 32-mal so groß wie in Rohr B.",
              "Er ist in Rohr A 64-mal so groß wie in Rohr B."
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Er ist in Rohr A 32-mal so groß wie in Rohr B.",
          },
          {
            id: "01_physik_5",
            question: "Der Glomerulus ist ein Netzwerk von parallel geschalteten Kapillaren in der Niere. Welche Aussage über den Gesamtwiderstand im Glomerulus als Funktion der Einzelwiderstände (in den einzelnen Kapillaren) ist am ehesten richtig?",
            options: [
              "Der Gesamtwiderstand ist die Summe der Einzelwiderstände.",
              "Der Gesamtwiderstand ist das Produkt der Einzelwiderstände.",
              "Der Kehrwert des Gesamtwiderstands ist die Summe der Kehrwerte der Einzelwiderstände.",
              "Der Kehrwert des Gesamtwiderstands ist die Summe der Kehrwerte der Einzelwiderstände.",
              "Der Gesamtwiderstand ist so groß wie der kleinste Einzelwiderstand."
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Der Kehrwert des Gesamtwiderstands ist die Summe der Kehrwerte der Einzelwiderstände.",
          },
          {
            id: "01_physik_6",
            question: "Der Himmel zieht sich zu, es droht ein Gewitter. Prof. Procella muss seinen Sohn mit dem Fahrrad von der Kita abholen, und hofft, dass er das noch schafft, bevor das Gewitter eintrifft.Auf dem Weg sieht er einen Blitz und hört 18 Sekunden später einen Donner. Wie weit ist das Gewitter ungefähr von ihm entfernt?",
            options: [
              "500m",
              "6km",
              "9km",
              "18km",
              "54km"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: 6km",
          },
          {
            id: "01_physik_7",
            question: "In einem schläfrigen Gedankenexperiment von Erwin Schröders Katze Phi kommen zwei Mäuse vor, eine normale taubengraue Maus und eine riesige virtuelle Maus. In welchem Bereich zur Sammellinse sitzt die normal große Maus, wenn ihr Bild eine aufrechte, stark vergrößerte virtuelle Maus ist?",
            options: [
              "sehr weit weg von der Linse, im Bereich unendlich bis mindestens zehnfache Brennweite",
              "im Bereich höchstens zehnfache bis mindestens fünffache Brennweite",
              "im Bereich höchstens fünffache bis mindestens doppelte Brennweite",
              "im Bereich höchstens doppelte bis mindestens einfache Brennweite",
              "im Bereich höchstens einfache bis mindestens nullfache Brennweite"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: im Bereich höchstens einfache bis mindestens nullfache Brennweite",
          },
          {
            id: "01_physik_8",
            question: "Detektion von radioaktiver Strahlung spielt im Strahlenschutz eine große Rolle. Welche Aussage zu Methoden der Detektion/Sichtbarmachung dieser Strahlung ist falsch?",
            options: [
              "In einer Nebelkammer können a-, B- und y-Strahlung sichtbar gemacht werden.",
              "Szintillatoren quantifizieren y-Strahlung.",
              "In einer Nebelkammer werden a- und ß-Strahlung zu unterschiedlichen Seiten abgelenkt.",
              "In Szintillatoren kommen spezielle Kristalle zum Einsatz.",
              "Im Geiger-Müller-Zählrohr können nur Ereignisse von β-Strahlern detektiert werden."
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Im Geiger-Müller-Zählrohr können nur Ereignisse von β-Strahlern detektiert werden.",
          },
          {
            id: "01_physik_9",
            question: "Katzenschnurren hat nicht nur durch die Ausschüttung von Serotonin durch unser Gehirn psychisch gesundheitsfördernde Wirkung, sondern auch physisch durch die Schnurrfrequenz von etwa 44 Hz selbst: Muskeln und Knochen werden zum Schwingen angeregt. Der wieviel fachen Wellenlänge des Kammertones a mit 440 Hz entspricht das Schnurren einer Katze?",
            options: [
              "der halben",
              "der einfachen",
              "der doppelten",
              "der zehnfachen",
              "der zehntausendfachen"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: der zehnfachen",
          },
          {
            id: "01_physik_10",
            question: "Ein Patient soll mit Hilfe eines Pacemakers (Herzschrittmacher) am Herzen elektrische Impulse erhalten, μm Herzschläge einzuleiten. Der Pacemaker ist einem Kondensator gleichzusetzen. Jeder Impuls entspricht einer Entladung in Höhe von 1,8*10-6 C und dauert 0,3 ms. Welche Stromstärke wird bei jedem Impuls generiert?",
            options: [
              "1,8 mA",
              "3 mA",
              "6 mA",
              "10 mA",
              "18 mA"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: 6 mA",
          },
          {
            id: "01_physik_11",
            question: "Ein psychisch kranker Patient gibt in Ruhe 100 W in Form von Wärme an die Umgebung ab.Unter diesen Bedingungen bleibt die Körpertemperatur aber konstant bei 37°C. Der Patient hüllt sich nun in eine Wärmedecke und verhindert so, dass er Wärme an die Umgebung abgibt. Wie hoch ist seine Körpertemperatur nach 2 Stunden etwa, wenn er wie in Ruhe Wärme bildet und seine Wärmekapazität 360 kJ/K beträgt?",
            options: [
              "37 K",
              "100 K",
              "150 K",
              "312 K",
              "337 K"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: 312 K",
          },
          {
            id: "01_physik_12",
            question: "Welche Brennweite hat eine Lupe mit der Aufschrift \"5x\"?",
            options: [
              "5 mm",
              "10 mm",
              "15mm",
              "25 mm",
              "50 mm"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: 50 mm",
          },
          {
            id: "01_physik_13",
            question: "Sie hören den Klang einer Trompete, welche einen Schalldruckpegel von 50 dB erzeugt.Wenn jetzt eine zweite Trompete zeitgleich den gleichen Ton mit demselben Schalldruck erzeugt, wie hoch ist der daraus resultierende Schalldruckpegel in etwa?",
            options: [
              "50dB",
              "52dB",
              "56dB",
              "64dB",
              "100dB"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: 56dB",
          },
          {
            id: "01_physik_14",
            question: "Mit einem Brillenglas lässt sich das Licht der Sonne in 20 cm Abstand von der Linse fokussieren. Etwa wie groß ist die Brechkraft dieser Linse?",
            options: [
              "0,1dpt",
              "1 dpt",
              "2dpt",
              "5dpt",
              "10dpt"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: 5dpt",
          },
          {
            id: "01_physik_15",
            question: "Welche Aussage zu Aggregatzustandsübergängen ist richtig?",
            options: [
              "Sieden ist der Übergang von fest zu gasförmig.",
              "Sublimieren ist der Übergang von flüssig zu gasförmig.",
              "Kondensieren ist der Übergang von flüssig zu fest.",
              "Schmelzen ist der Übergang von fest zu flüssig.",
              "Erstarren ist der Übergang von gasförmig zu fest."
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Schmelzen ist der Übergang von fest zu flüssig.",
          },
          {
            id: "01_physik_16",
            question: "Der Body Mass Index (BMI) errechnet sich aus dem Körpergewicht dividiert durch das Quadrat der Körpergröße. Sie konnten das Gewicht eines Patienten (in kg) mit einer relativen Messunsicherheit von 0, 1% und die Größe (in m) mit einer relativen Messunsicherheit von 0,5% ermitteln. Wie groß ist die relative Unsicherheit des errechneten BMI-Wertes?",
            options: [
              "0,2%",
              "0,4%",
              "0,7%",
              "1,1%",
              "Ohne die gemessenen Werte für Gewicht und Größe, kann diese Zahl nicht ermittelt werden"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: 1,1%",
          },
          {
            id: "01_physik_17",
            question: "Welche der folgenden Einheiten ist eine SI-Einheit?",
            options: [
              "Volt",
              "Liter",
              "Mol",
              "Gramm",
              "Celsius"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Mol",
          },
          {
            id: "01_physik_18",
            question: "In 10 Meter Abstand von einer nahezu punktförmigen radioaktiven Quelle, wird eine Àquivalentdosisleistung von 1 Sv/h gemessen. Das Umgebungsmedium sei Luft. In welchem Abstand zur Strahlungsquelle misst man dann (bei vernachlässigbarer Absorption in Luft) eine Äquivalentdosisleistung von 0,5 Sv/h in etwa?",
            options: [
              "7 Meter",
              "28 Meter",
              "38 Meter",
              "1 Meter",
              "14 Meter"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: 14 Meter",
          },
          {
            id: "01_physik_19",
            question: "Während einer radioaktiven Messung stellen Sie fest, dass sich das Isotop 137Cs (Z = 55) unter Emission von ß- -Teilchen in das Isotop 137Ba umwandelt. Dabei emittiert auch das Isotop 137Ba y-Strahlung. Wie hoch soll die Ordnungszahl des Isotops 137Ba sein?",
            options: [
              "Option 1",
              "Option 2",
              "Option 3",
              "Option 4",
              "Option 5"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Option 5",
          },
          {
            id: "01_physik_20",
            question: "Welche der folgenden Aussagen zu Wellen ist falsch?",
            options: [
              "Die Periodendauer einer Welle ist der Kehrwert ihrer Frequenz.",
              "Die Wellenlänge multipliziert mit der Frequenz einer Welle ergibt ihre Ausbreitungsgeschwindigkeit.",
              "Der Kehrwert der Wellenlänge ergibt die Periodendauer einer Welle.",
              "Es gibt Transversal- und Longitudinalwellen.",
              "Die Ausbreitungsgeschwindigkeit einer Welle ist definiert als Wellenlänge dividiert durch die Periodendauer."
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Der Kehrwert der Wellenlänge ergibt die Periodendauer einer Welle.",
          },
          {
            id: "01_physik_21",
            question: "Für eine wissenschaftliche Studie misst Dr. Alvin das Körpergewicht von 100 Streifenhörnchen. Es stellt sich heraus, dass das Gewicht normalverteilt ist, mit einem Mittelwert von 50 g und einer Standardabweichung von 4 g. Ca. wie viele der gemessenen Streifenhörnchen wiegen zwischen 46 g und 54 g?",
            options: [
              "Option 1",
              "Option 2",
              "Option 3",
              "Option 4",
              "Option 5"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Option 3",
          },
          {
            id: "01_physik_22",
            question: "Ein Patient hat viel Flüssigkeit und damit viele Elektrolyte und Glucose verloren. Deshalb wollen Sie eine Infusion vornehmen. In der Notfallapotheke finden Sie 500 ml einer isotonen Kochsalzlösung (0,9% NaCI = 150 mmol/l) und nur 18 g Glucose (= 100 mmol). Sie wollen aus der Elektrolyt-Lösung eine Kochsalz-Glucose-Lösung ansetzen, welche mit 300 mosmol/ isoton zum Plasma ist. Welches Volumen reinen Wassers brauchen Sie etwa zusätzlich, μm die Infusion fertigzustellen?",
            options: [
              "50 ml",
              "100 ml",
              "330 ml",
              "150 cl",
              "230 dl"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: 330 ml",
          },
          {
            id: "01_physik_23",
            question: "Eine beidseitig von wässriger Elektrolytlösung umgebene Lipidmembran mit einer Oberfläche von 100 µm2 wirkt wie ein Plattenkondensator der Kapazität 1 pF. Anfänglich sei der Kondensator ungeladen und die elektrische Spannung Null. Dann werden eine Million Kalium-lonen von der einen auf die andere Seite der Membran transportiert. Andere Ladungsträger als die transportierten Kalium-lonen können die Membran nicht passieren. Die Elementarladung e0 beträgt etwa 1,6*10-19 Coulomb.Etwa welcher Betrag der elektrischen Spannung herrscht jetzt am Kondensator?",
            options: [
              "1,6 • 10-13 mV",
              "1,6 • 10-12 mV",
              "1,6 mV",
              "3 mV",
              "160mV"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: 160mV",
          },
          {
            id: "01_physik_24",
            question: "Ein Zombie braucht im Schnitt etwa 24 Stunden, μm einen weiteren Menschen zum Zombie zu machen. Wenn ein Zombie in eine bevölkerte aber bislang zombiefreie Stadt kommt, etwa wie viele Zombies sind dort nach einer Woche (7 Tagen) zu erwarten?",
            options: [
              "Option 1",
              "Option 2",
              "128",
              "256",
              "1000"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: 128",
          },
          {
            id: "01_physik_25",
            question: "Zwei Kinder spielen auf einem Spielplatz mit einer Wippe. Allerdings sind sie unterschiedlich alt und daher auch unterschiedlich schwer: das ältere Kind wiegt 20 kg, das jüngere nur 16 kg. Wenn das jüngere Kind auf seinem Arm der Wippe 150 cm entfernt vom Drehpunkt sitzt, wie weit entfernt vom Drehpunkt muss das ältere Kind am anderen Arm sitzen, damit die Wippe genau in der Schwebe bleibt?",
            options: [
              "0 cm",
              "4 cm",
              "30 cm",
              "100 cm",
              "120 cm"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: 120 cm",
          }
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
  physiologie: {
    topics: [
      {
        id: "docsdocs-physiologie1",
        name: "Docsdocs Physiologie 1",
        emoji: "🫀",
        questions: [
          {
            id: "02_physiologie1_1",
            question: "Wenn sich an einer erregbaren Zelle in der Membran ein nicht-elektiver Kationenkanal öffnet, passiert folgendes:",
            options: [
              "Kein (Netto-) Na-Strom, kein (Netto-)Kalium-Strom, keine Änderung des Membranpotentials",
              "Na Ausstrom > K Einstrom, Hyperpolarisation",
              "Na-Ausstrom + K Ausstrom, Depolarisation",
              "Na Einstrom + K-Einstrom, Hyperpolarisation",
              "Na Einstrom > K Ausstrom, Depolarisation"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Na Einstrom > K Ausstrom, Depolarisation",
          },
          {
            id: "02_physiologie1_2",
            question: "Mit der Nernst-Gleich lässt sich das Gleichgewichtspotential an einer Zellmembran für ein gegebenes Ion X berechnen. Es giltEx= 61/z * log ({cAußen} / c{innen})Wie groß ist das Gleichgewichtspotential für ein einwertiges, positiv geladenes Ion, welches außen in 10-fach höherer Konzentration vorliegt als innen?",
            options: [
              "-61 mV",
              "+30,5 mV",
              "+ 61 mV",
              "+ 128 mV",
              "+ 610 mV"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: + 61 mV",
          },
          {
            id: "02_physiologie1_3",
            question: "Welche Aussage bezüglich der synaptischen Signalübertragung an der motorischen Endplatte ist richtig?",
            options: [
              "Entscheidend für die Erregungsübertragung auf die Skelettmuskelfaser sind muskarinische Acetylcholinrezeptoren",
              "Normalerweise werden zur Auslösung eines Aktionspotentials in der Muskelfaser mehrere aufeinander folgende präsynaptische Aktionspotentiale benötigt.",
              "Botulinumtoxin verursacht eine verstärkte Transmitter-Ausschütung an der motorischen Endplatte, indem es präsynaptische SNARE-Proteine spaltet.",
              "Zur Behandlung der Myasthenia gravis kann der Abbau von Acetylcholin im synaptischen Spalt mittels Acetylcholinesterasehemmern (z.B. Neostigmin) unterdrückt werden.",
              "Spannungsgesteuerte Na+ Kanaäle spielen für das von überschwelligen EPSPs in der Skelettmuskelfaser ausgelöste Aktionspotentail eine untergeordnete Rolle."
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Zur Behandlung der Myasthenia gravis kann der Abbau von Acetylcholin im synaptischen Spalt mittels Acetylcholinesterasehemmern (z.B. Neostigmin) unterdrückt werden.",
          },
          {
            id: "02_physiologie1_4",
            question: "Wie ist der korrekte inhaltliche und zeitliche Ablauf der elektromechanischen Ankopplung bzw. Teilen davon beim Skelettmuskel?",
            options: [
              "Depolarisation der Membran, Öffnung spannungsabhängiger Kalziumkanäle (DHP), Ca2+ Bindung an Myosinkopf, Kontraktion",
              "Depolarisation der Membran, Öffnung spannungsabhänägiger Natriumkanäle, Depolarisation der Membran des Sarkoplasmatischen Retikulums, Ca-Freisetzung ins Zytosol, Kontraktion der Myofibrillen",
              "Hyperpolarisation der Membran, Öffnung von Kir Kanälen, Kaliumvermittelte Aktivierung der PKA. Aktivierung von Troponin C, Beginn des Querbrückenzyklus",
              "Depolarisation der Membran, Öffnung spannungsabhängiger Kalziumkanäle (DHP), mechanische Öffnung des Ryanodinrezeptors, Ca2+ Freisetzung aus sarkoplasmatischem Retikulum Ca2+ vermittelte Initiierung des Qurbrückenzyklus",
              "Depolarisation der Membran, Öffnung spannungsabhängiger Kalziumkanäle (DHP). Ca2+ Freisetzung aus sarkoplasmatischen Retikuum, Aktivierung der SERCA (Ca-ATPase), ATP-Bindung an Aktinfilament, Verlagerung des Myosins, Verkürzung des Tropomyosins"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Depolarisation der Membran, Öffnung spannungsabhängiger Kalziumkanäle (DHP), mechanische Öffnung des Ryanodinrezeptors, Ca2+ Freisetzung aus sarkoplasmatischem Retikulum Ca2+ vermittelte Initiierung des Qurbrückenzyklus",
          },
          {
            id: "02_physiologie1_5",
            question: "Die Effekte des Herzglykosids Digitoxin beruht auf der spezifischen Hemmung der Na+/K+ -ATPase. Welcher der folgenden Effekte wäre somit als unmittelbare Folge am ehesten zu erwarten?",
            options: [
              "verringerter Einstrom von Calcium in die Zelle",
              "Anstieg der extrazellulären Natrium-Konzentration",
              "Absinken der extrazellulären Kalium-Konzentraion",
              "Anstieg der intrazellulären Kalium-Konzentration",
              "Anstieg der intrazellulären Natrium-Konzentration"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Anstieg der intrazellulären Natrium-Konzentration",
          },
          {
            id: "02_physiologie1_6",
            question: "Welche der folgenden Aussagen zum Atemsystem trifft am ehesten zu?",
            options: [
              "gelangt Luft in den Pleuraspalt, kann sich die Lunge von der Thoraxwand ablösen 82 %",
              "der Pleuraspalt enthält 5 mL Flüssigkeit und ca. 5 mL Luft 2 %",
              "eine Luftströmung in den Pleuraspalt führt zu einem Pleuraerguss mit eingeschränkter Inspiration 6 %",
              "durch die Kontraktion des Zwerchfells wird der Brustraum erweitert und der intrapulmonale Druck sofort erhöht, μm die intrapulmonale Luft auszustoßen 6 %",
              "bei einem gesunden menschen sind Ventilation und Perfusion über die gesamte Lungenoberfläche homogen 1 %"
            ],
            correctIndex: 0,
            explanation: "Die richtige Antwort ist: gelangt Luft in den Pleuraspalt, kann sich die Lunge von der Thoraxwand ablösen 82 %",
          },
          {
            id: "02_physiologie1_7",
            question: "Welche der Aussagen über den Hamburger-Shift trifft am ehesten zu?",
            options: [
              "μm die Elektroneutralität der Erythrozyten zu wahren, werden HCO3- -Ionen durch einen Na+/HCO3- -Antiporter im Austausch gegen Na+ -Ionen durch die Zellmembran transportiert",
              "μm die Elektroneutralität der Erythrozyten zu wahren, werden HCO3- -Ionen durch einen Cl-/HCO3- -Antiporter im Austausch gegen Cl- -Ionen durch die zellmembran transportiert",
              "die spontane Haydratisierung von CO2 zu kohlensäure (H2CO3) verläuft im Plasma besonders schnell, was den Hamburger-Shift in Erythrozyten begünstigt",
              "die Erythrozyten nutzen für die Bildung von Kohlensäure (H2CO3) aus CO2 das Enzym Carboxypeptidase A",
              "die Erythrozyten nutzen für die Bildung von Kohlensäure (H2CO3) aus CO2 das Enzym Glykosyltransferase"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: die spontane Haydratisierung von CO2 zu kohlensäure (H2CO3) verläuft im Plasma besonders schnell, was den Hamburger-Shift in Erythrozyten begünstigt",
          },
          {
            id: "02_physiologie1_8",
            question: "Der Windkesseleffekt ist ein zentraler Mechanismus zur Blutflussregulation in den Körperkreislauf hinein. Welche der folgenden Aussagen zur Funktionsweise dieses Mechanismus ist am ehesten korrekt?",
            options: [
              "Durch die hohe Compliance dehnt sich die Aorta während des frühdiastolischen Rückstroms und nimmt dabei ca. 50% des ausgeworfenen Blutes auf. 16 %",
              "Durch Abklemmen distaler Anteile der Aorta stauen sich ca. 50% des Auswurfvolumens aus. 0 %",
              "Der kontinuierliche Blutfluss während der Diastole wird maßgeblich durch aktive Muskelarbeit in der Aortenwand erzeugt. 4 %",
              "Durch die hohe Compliance dehnt sich die Aorta während der Auswurfphase des Herzzyklus und nimmt dabei ca. 50% des Blutes auf. 75 %",
              "Abzweigungen der medialen Aorta versorgen die Herzkranzgefäße während der Systole mit Blut 1 %"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Durch die hohe Compliance dehnt sich die Aorta während der Auswurfphase des Herzzyklus und nimmt dabei ca. 50% des Blutes auf. 75 %",
          },
          {
            id: "02_physiologie1_9",
            question: "Die äußere Zellmembran von Zellen ist semipermeabel, sie lässt also manche Stoffe gut durch sie hindurch diffundieren und andere weniger gut bis gar nicht. Welche der folgenden Substanzen kann ohne weiter Transportprozesse oder spezialisierte Kanäle am besten passiv über die Membran diffundieren?",
            options: [
              "Natriumionen",
              "Bikarbonat (HCO3-)",
              "Glucose",
              "Sauerstoff",
              "Keine der vorherigen Substanzen ist ohne Transportprozesse membrangängig"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Sauerstoff",
          },
          {
            id: "02_physiologie1_10",
            question: "Einem 55-jährigen Patienten werden aufgrund von Bluthochdruck ß-Blocker verschrieben. Die Blutdrucksenkung wird im wesentlichen durch die Senkung der Auswurfleistung des Herzens erreicht. Die Konzentration welches Second messenger wird durch diese Behandlung somit typischerweise reduziert?",
            options: [
              "Diacylglycerol",
              "zyklisches AMP",
              "Inositol-1,4,5-triphosphat",
              "ATP",
              "GMP"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: zyklisches AMP",
          },
          {
            id: "02_physiologie1_11",
            question: "Mittels der indirekten Kalorimetrie messen sie den Energieumsatz eines Probanden. Der Patient leistet eine körperliche Belastung auf einem Ergometer für 3 min. Anhand der Berechnung des produzierten CO2 und des verbrauchten O2 erhalten Sie einen respiratorischen Quotienten von 1,0. Welches Substrat oder Substrate dienen hier der Energiebereitstellung?",
            options: [
              "Mischkost",
              "Fette",
              "Kohlenhydrate",
              "Proteine",
              "Fette und Proteine"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Kohlenhydrate",
          },
          {
            id: "02_physiologie1_12",
            question: "Ein AV-Block 3. Grades ist ein lebensbedrohlicher Zusatnd. Welche der folgenden Aussagen trifft hier am ehesten zu?",
            options: [
              "Der weiterhin bestehende QRS-Komplex findet mit einem Ersatzrythmus der tertiären Schrittmacherzentren von etwa 60-80 Schlägen pro Minute statt.",
              "Typische Bild im EKG eines AV-Block 3. Grades ist das Ausbleiben der T-Welle nach dem QRS-Komplex.",
              "Generell ist die P-Welle stark verringert bis abwesend, da keine Vorhofkontraktion stattfindet.",
              "Die R-R-Intervalle liegen in Ruhe in aller Regel im Bereich von unter 800ms.",
              "Die Vorhoferregung (P-Welle) erfolgt ohne zeitliche Korrelation mit der Kammerregung (QRS-Komplex)."
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Die Vorhoferregung (P-Welle) erfolgt ohne zeitliche Korrelation mit der Kammerregung (QRS-Komplex).",
          },
          {
            id: "02_physiologie1_13",
            question: "Weclhe Aussagen zur Fortleitung von Aktionspotentialen über Nervenfasern trifft typischerweise zu? Die Geschwindigkeit der Erregungsfortleitung",
            options: [
              "steigt mit zunehmend größerer elektrischer Reizstärke.",
              "sinkt mit größerem Axon-Querschnitt.",
              "steigt mit zunehmnder Entfernung vom Axonhügel.",
              "ist im Wesentlichen unabhängig von der Temperatur.",
              "ist bei kontinuierlicher Leitung niedriger als bei saltatorischer Fortleitung."
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: ist bei kontinuierlicher Leitung niedriger als bei saltatorischer Fortleitung.",
          },
          {
            id: "02_physiologie1_14",
            question: "In welcher Reihenfolge laufen die ATP-liefernden prozesse im Muskel für gewöhnlich ab (schnelle bis langsame ATP-Gewinnung)?",
            options: [
              "Fettsäureabbau - anaerober Glukoseabbau - aerober Glukoseabbau - ATP-Speicher - Kreatinphosphat",
              "aerober Glukoseabbau - Fettsäureabbau - anaerober Glukoseabbau - ATP-Speicher - Kreatinphosphat",
              "ATP-Speicher - Kreatinphosphat - anaerober Glukoseabbau - aerober Glukoseabbau - Fettsäureabbau",
              "anaerober Glukoseabbau - aerober Glukoseabbau - ATP-Speicher - Kreatinphosphat - Fettsäureabbau",
              "ATP-Speicher - anaerber Glukoseabbau - aerober Glukoseabbau - Kreatinphosphat - Fettsäureabbau"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: ATP-Speicher - Kreatinphosphat - anaerober Glukoseabbau - aerober Glukoseabbau - Fettsäureabbau",
          },
          {
            id: "02_physiologie1_15",
            question: "Welche der folgenden Aussagen ist am ehesten richtig? Der Druck in den kleineren Alveolen ist im Vergleich zu dem in den größeren Alveolen beim Gesunden typischerweise",
            options: [
              "Kleiner, da der Radius kleiner ist",
              "Kleiner, da der negative intrathorakale Druck entgegenwirkt",
              "Gleichgroß, da der negative intrathorakale Druck entgegenwirkt",
              "2-fach größer gemäß dem Gesetz von Laplace",
              "Ungefähr gleichgroß, da das Surfectant die Oberflächenspannung der kleinen Alveolen anpasst"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: 2-fach größer gemäß dem Gesetz von Laplace",
          },
          {
            id: "02_physiologie1_16",
            question: "Der Gefäßwiderstand trägt im Niederdrucksystem nur mäßig zum Blutdruck bei. Dies lässt sich am ehesten zurückzuführen auf:",
            options: [
              "den Gefäßquerschnitt",
              "die Compliance der Venen",
              "den venösen Rückstrom zum Herzen",
              "die Körperlage",
              "prälapilläre Sphinkteren"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: die Compliance der Venen",
          },
          {
            id: "02_physiologie1_17",
            question: "Welche Aussagen über den Effekt von Vitamin-K auf die Hämostase ist am ehesten korrekt?",
            options: [
              "Bei Vitamin-K-Mangel wird nicht ausreichend Fibrinogen produziert",
              "Vitamin-K ist erforderlich für die Bildung und Aktivierung von den Gerinnungsfaktoren II, VII, IX, und X in der Leber",
              "Bei Vitamin-K-Mangel kann die primäre Hämostase nicht korrekt ablaufen",
              "Vitamin-K ist erfoderlich für die Bildung und Aktivierung der Gerinnungsfaktoren III, IV, V, IV in der Leber",
              "Vitamin-K verhindert die Bindung von Gerinnungsfaktoren über Calcium-Ionen an der Oberfläche der Thrombozyten"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Vitamin-K ist erforderlich für die Bildung und Aktivierung von den Gerinnungsfaktoren II, VII, IX, und X in der Leber",
          },
          {
            id: "02_physiologie1_18",
            question: "Das Pfeilgift Curare hat als kompetitiver Antagonist eines bestimmten Neurotransmitters Einfluss auf das Muskelaktionspotential. An welchen Kanal der neuromuskulären Endplatte wirkt es?",
            options: [
              "Spannungsabhängiger Natriumkanal",
              "Ligandenabhängiger Kationenkanal",
              "Spannungsabhängiger Kaliumkanal",
              "Spannungsabhängiger Chloridkanal",
              "Spannungsabhängiger Kalziumkanal"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Ligandenabhängiger Kationenkanal",
          },
          {
            id: "02_physiologie1_19",
            question: "Was besagt die Hüfner-Zahl?",
            options: [
              "Die Hüfner-Zahl beschreibt den O2-Gehalt des desoxygenierten Blutes",
              "Die Hüfner-Zahl ändert sich gemäß dem arteriellen Sauerstoff-Partialdruck",
              "Die Hüfner-Zahl beschreibt das Sauerstoffvolumen, das von 1g Hämoglobin maximal gebunden wird",
              "Die Hüfner-Zahl beschreibt die Bindung des O2 an Methämoglobin",
              "Die Hüfner-Zahl beschreibt O2-Fraktion im inspiratorischen Gasgemisch"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Die Hüfner-Zahl beschreibt das Sauerstoffvolumen, das von 1g Hämoglobin maximal gebunden wird",
          },
          {
            id: "02_physiologie1_20",
            question: "Welche Aussage zur Compliance des Atemapparates (Lunge und Thorax) trifft am ehesten zu?",
            options: [
              "Sie entspricht dem Kehrwert der Resistance",
              "Sie ist bei einer restriktiven Ventilationsstörung (z.B. Lungenfibrose) typischerweise vermindert",
              "Sie ist bei maximaler Expiration am größten",
              "Sie ist bei Surfectant-Mangel typischerweis erhöht",
              "Sie ist der Quotient aus VC (Vitalkapazität) und FRC (funktioneller Residualkapazität)"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Sie ist bei einer restriktiven Ventilationsstörung (z.B. Lungenfibrose) typischerweise vermindert",
          },
          {
            id: "02_physiologie1_21",
            question: "Der Querbrückenzyklus ist zentraler Bestandteil der Muskelbewegung. Welches Molekül sorgt für die Ablösung des Myosins vom Aktin?",
            options: [
              "cAMP",
              "cGMP",
              "ADP",
              "ATP",
              "PKA"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: ATP",
          },
          {
            id: "02_physiologie1_22",
            question: "Bei einer Zelle betrage die Konzentration eines zweifach positiv geladenen Kations zytosolisch 185 mmol/L und extrazellulär 18.5 mmol/L. In etwa wie groß ist das Gleichgewichtspotential dieses Ions bei einer Temperatur von 37°C?",
            options: [
              "-60mV 16 %",
              "-30mV 60 %",
              "0mV 0 %",
              "+30mV 15 %",
              "+60mV 6 %"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: -30mV 60 %",
          },
          {
            id: "02_physiologie1_23",
            question: "Welche Aussage zur Ableitung extrazellulärer Summenaktionspotentiale (SAP) ist am ehesten richtig?",
            options: [
              "Die maximale Reizstärke (in mV), bei der das größte Summenaktionspotential ausgelöst wird, wird Rheobase genannt",
              "Der spannungsabhängige Na+v-Kanal kann in 3 Zuständen vorliegen. Der inaktivierbare Zusatnd ist ursächlich für die neuronale Refraktärzeit",
              "Summenaktionspotentiale pflanzen sich entlang der markhaltigen Nerven mit einer maximalen Geschwindigkeit von bis zu 1,2 m/s fort",
              "In der absoluten Refraktärzeit befinden sich alle spannungsabhängigen K+v-Kanäle in ihrem inaktivierbaren Zustand",
              "Als Chronaxie bezeichnet man die Zeit zwischen relativer und absoluter Refraktörzeit"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Der spannungsabhängige Na+v-Kanal kann in 3 Zuständen vorliegen. Der inaktivierbare Zusatnd ist ursächlich für die neuronale Refraktärzeit",
          },
          {
            id: "02_physiologie1_24",
            question: "Welche Aussage zur Angiogenese (Gefäßneubildung) ist am ehesten richtig?",
            options: [
              "Die Angiogenese ist ein unregulierter Prozess des Gewebes",
              "Ein pO2 unter 40 mmHg im Gewebe hemmt die die Angiogenese",
              "Eine Hemmung der Angiogenese ist Voraussetzung dafür, dass sich Krebszellen unkontrolliert teilen können",
              "Sie ist im Alter von 18 Jahren praktisch abgeschlossen",
              "Sie wird durch Signalkaskaden gesteuert, die durch den Wachstumsfaktor VEGF (Vascular Endothelial Growth Factor) kontrolliert werden"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Sie wird durch Signalkaskaden gesteuert, die durch den Wachstumsfaktor VEGF (Vascular Endothelial Growth Factor) kontrolliert werden",
          },
          {
            id: "02_physiologie1_25",
            question: "Welche der folgenden Angaben ist keine Beatmungsform?",
            options: [
              "nichtinvasive Beatmung",
              "invasive Beatmung",
              "druckkontrollierte Beatmung",
              "volumenkontrollierte Beatmung",
              "azentrierte Beatmung"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: azentrierte Beatmung",
          },
          {
            id: "02_physiologie1_26",
            question: "In welchem Bereich liegt die maximale Sauerstoffaufnahme (VO2 max) für einen normal leistungsfähigen Mann im Alter zwischen 20-30 Jahren am ehesten?",
            options: [
              "15 ml / kg x min",
              "25 ml / kg x min",
              "45 ml / kg x min",
              "75 ml / kg x min",
              "95 ml / kg x min"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: 45 ml / kg x min",
          },
          {
            id: "02_physiologie1_27",
            question: "Eine vertsärkte Vorhofdehnung führt zur Erregung der Typ-B-Dehnungsrezeptoren der Vorhöfe (Gauer-Henry-Reflex). Darauf folgt am ehesten:",
            options: [
              "eine Hypervolämie",
              "eine Steigerung der renalen Freisetzung von Renin",
              "eine Hemmung des Parasympathikus",
              "eine Steigerung des Sympathikotonus",
              "eine vermehrte renale Wasserausscheidung bedingt durch Hemmung der ADH-Freisetzung aus der Hypophyse"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: eine vermehrte renale Wasserausscheidung bedingt durch Hemmung der ADH-Freisetzung aus der Hypophyse",
          },
          {
            id: "02_physiologie1_28",
            question: "Welche der folgenden Methoden der Lungenfunktionsdiagnostik ermöglicht (bei bereits bekannter Inspirationskapazität) am ehesten die Bestimmung der totalen Lungenkapazität?",
            options: [
              "Bodyplethmysmographie (Ganzkörperplethysmographie) mit Atmung bei dauerhaft offenem Mundstück",
              "Bodyplethysmographie (Ganzkörperplethysmographie) mit Atmung gegen vorübergehend verschlossenes Mundstück",
              "Pneumotachographie",
              "Ermittlung der maximalen exspiratorischen Atemstromstärke mittels Peak-Flow-Meter",
              "Spirometrie mittels konventionelem Glockenspirometer"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Bodyplethysmographie (Ganzkörperplethysmographie) mit Atmung gegen vorübergehend verschlossenes Mundstück",
          },
          {
            id: "02_physiologie1_29",
            question: "Bei der primären Bultstillung spielt der vWF eine wichtige Rolle. Welche der folgenden Aussagen zum vWf ist korrekt ?",
            options: [
              "Wird auch als Gerrinungsfaktor II bezeichent",
              "ist ein Protein,das den GErinnungsfaktor VIII destabilisiert und dessen Abbaurate erhöt",
              "Der vWF ist bei Endothelläsionen das Bindeglied zwischen subendothelialer MAtrix und der Thrombozytenmembran",
              "Wird in reifen erythrozyten synthetisiert",
              "Wirkt als Plasminogen Aktivator"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Der vWF ist bei Endothelläsionen das Bindeglied zwischen subendothelialer MAtrix und der Thrombozytenmembran",
          },
          {
            id: "02_physiologie1_30",
            question: "Welche Aussage zu den Blutgruppensystemen ist korrekt ?",
            options: [
              "Blutgruppe 0 besitzen keine Antikörper gegen Blutgruppenantigene A",
              "Blutgruppe 0 tragen die Antigenmerkmale A und B auf der Oberfläche",
              "Menschen der Blutgruppe B besitzen antikörper gegen das Anitgen B",
              "Die Grundlage des ABO - Butgruppensystems stllen Glykolipide auf der Oberfläche der Erythrozyten da",
              "Die Grundlage des Rehsus Blutgruppensystems stellen oligosacharide auf der Oberfläche der Erythrozyten dar"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Die Grundlage des ABO - Butgruppensystems stllen Glykolipide auf der Oberfläche der Erythrozyten da",
          },
          {
            id: "02_physiologie1_31",
            question: "Verdacht auf Lungenembolie. Eine Thrombose wäre am ehesten bedingt durch ?",
            options: [
              "Freisetzung von Heprain aus MAstzellen",
              "erhöhter Hirudinspiegel",
              "vermidnete Freisetzung von Thromboxan A2 durch thrombozyten",
              "vermindeter protelytischer Abbau von Faktor VIIIa",
              "Verstärkte Umwandlung von Plasminogen in Plasmin"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: vermindeter protelytischer Abbau von Faktor VIIIa",
          },
          {
            id: "02_physiologie1_32",
            question: "Koronararterie wird durch eine Koronarintervention aufgeweitet.Unter der vereinfachten Annahme es Hagen posieullile Gestzten gilt. Wie hat sich der Gefäßdurchmesser erhöht",
            options: [
              "1,5",
              "Option 2",
              "Option 3",
              "Option 4",
              "Option 5"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Option 5",
          },
          {
            id: "02_physiologie1_33",
            question: "Die elektronendichte Granula der Thrombozyten spielen eine wichtige bei der Thrombozytenaktivierung. Ein darin enthaltener typischer inhaltsstoff welcher viele Funktion übernimmt ist ?",
            options: [
              "Fibrinogen",
              "Gerinnungsfaktor VII",
              "Plättchenfaktor 4",
              "Adenosindiphosphat",
              "Stickstoffmonoxid"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Adenosindiphosphat",
          },
          {
            id: "02_physiologie1_34",
            question: "Welche der folgenden Aussagen über Thrombozyten trifft für den erwachsenen Menschen am ehesten zu ?",
            options: [
              "Thrombozytenanzahl liegt bei 2,5ul",
              "PGL2 fördeert die Aggregation der Thrombozyten im Zuge der primären Hämostase",
              "Die Bindung von ADP an Rezeptoren auf der Thrombozytenoberfläche fördert die Thrombozytenaggregation",
              "Die funktion der Thrombozytenaggregation als wichtiger erster Schritt der Primären Hämostase, wird klinisch durch den Quick Wert abgebildet",
              "Die mittlere Verweildauer von Thrombozyten im Blut beträgt 5-12 Tage"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Die Bindung von ADP an Rezeptoren auf der Thrombozytenoberfläche fördert die Thrombozytenaggregation",
          },
          {
            id: "02_physiologie1_35",
            question: "Der Quotient aus CO2 ABgabe und 2 Aufnahme über die Lunge",
            options: [
              "beträgt Ausschlieslicher Kohlenhydratverbrennung 1 55 %",
              "dient als Maß für die Effekticität des CO2-Transports in den Erythrozyten 7 %",
              "ermöglicht die Berechnung des Sauerstoffverbrauchs bei Kenntnis der ateriovenösen sauerstoffdifferenz 15 %",
              "fällt während aufregugsbedingter hyperventilation ab 8 %",
              "ist bei Enstehung einer respiratorischen azidose erhöht 11 %"
            ],
            correctIndex: 0,
            explanation: "Die richtige Antwort ist: beträgt Ausschlieslicher Kohlenhydratverbrennung 1 55 %",
          },
          {
            id: "02_physiologie1_36",
            question: "Welche Aussage zum Baro Relfex ist richtig",
            options: [
              "Barrorezeptoren sind in beidnen Herzvorhöfen lokalisiert",
              "Durch die verringerte Dehnung des Blutgefäßes schliessen sich mechanosensitive Kationenkanäle , die impulsfrequenz der Barorezeptoren sinkt",
              "Der totale periphere Widerstand sinkt",
              "Die Aktivität der Barorezeptoren ist bei chronisch erniedrigtem Blutdurck dauerhaft verringert",
              "Die kreislaufregulatorischen Neuronen in der Medulla oblongata veränder die Herzfrequenz durch inhibition sympathischer Efferenzen und Aktivierung parasympathischer Efferenzen"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Durch die verringerte Dehnung des Blutgefäßes schliessen sich mechanosensitive Kationenkanäle , die impulsfrequenz der Barorezeptoren sinkt",
          },
          {
            id: "02_physiologie1_37",
            question: "Welche der folgenden Meschanismen beschreibt am ehesten die Wirkung von Histamin auf das Her-Kreislauf sytsem",
            options: [
              "Eine Blutdrucksenkung durch Vasokonstriktion",
              "Eine Vasodilitation durch indirekte Freisetzung von Btadykinin",
              "Eine Aktivierung des Sympathikus",
              "HErzrasen, Vasodilitation der peripheren Gefäße und Abfall des Blutdrucks",
              "STickstoffmonoxid -Freisetzung und Vasokonstriktion"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: HErzrasen, Vasodilitation der peripheren Gefäße und Abfall des Blutdrucks",
          },
          {
            id: "02_physiologie1_38",
            question: "Welche der folgenden Molekühle gehört nich zum Feinbau des Sarkromers",
            options: [
              "Myosin",
              "Tubulin",
              "Aktin",
              "Tropomyosin",
              "Titin"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Tubulin",
          },
          {
            id: "02_physiologie1_39",
            question: "Muskellänge verändert sich die Spannung bleibt aber gleich",
            options: [
              "Isometrische kontraktion",
              "isotonische",
              "Auxotonische",
              "Unterstzüzungszuckung",
              "Anschlagszuckung"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: isotonische",
          },
          {
            id: "02_physiologie1_40",
            question: "ph 7,8 po2:100mmhg pCO2 47 mmhg BE +13 mmol/l",
            options: [
              "respiratorische Alkalose , metabolische teilkompenisiert",
              "metabolische Alkalose , nicht kompensiert",
              "gemischt respiratorische und metabolische Alkalose",
              "metabolische Azidose, respiratorsiche teilkompensiert",
              "metabolische Alkalose, respiratorisch teilkompenisert"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: metabolische Alkalose, respiratorisch teilkompenisert",
          },
          {
            id: "02_physiologie1_41",
            question: "Welche Definiton ist richitg? Die maximale Sauerstoffaufnahme (VO2max) ist",
            options: [
              "diejenige Menge an Sauerstoff ,welche bei maximaler inspiration eingeatmet wird",
              "diejenige Menge an Sauerstoff, welche am Ende der Expiration noch in der Lunge verbleibt",
              "das Bruttp kriterium für die maximale aerobe Leistungsfähigkeit eines Menschen",
              "eine andere Bezeichnung für die Sauerstoffsättigung",
              "diejenige Menge an Sauertsoff , welche am Ende nach maximaler Expiration in der Ausatemluft gemessen wird"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: das Bruttp kriterium für die maximale aerobe Leistungsfähigkeit eines Menschen",
          },
          {
            id: "02_physiologie1_42",
            question: "Bei ungleich verteilten Ionen an der Biomembran, entsteht ein Konzentrationsgradient zwischen der elektrischen und chemischen Triebkraft über die Membra, welcher Ionen ausgeliefert hat. Mit der Nernstgleichung lässt sich daraus das Potential des Ionen X berechnen. Wie groß ist das Potential für ein einwertiges, positiv geladenes Ion, welches außen in 10-fach höherer Konzentration vorliegt als innen?",
            options: [
              "-61mV",
              "+30,5 mV",
              "+61mV",
              "+128mV",
              "-30,5mV"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: +61mV",
          },
          {
            id: "02_physiologie1_43",
            question: "Ordnen Sie die interstitiellen Konzentrationen einer typischen Zelle von Ca2+, Cl-, und Na+ in absteigender Reihenfolge.",
            options: [
              "Na>Ca>Cl",
              "Ca>Na>Cl",
              "Na>Cl>Ca",
              "Cl>Ca>Na",
              "Cl>Na>Ca"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Na>Cl>Ca",
          },
          {
            id: "02_physiologie1_44",
            question: "Sie untersuchen einen Patienten, der sich mit Müdigkeit vorstellt. Da er angibt, dass er sich vegetarisch ernährt, vermuten Sie eine Eisenmangelanämie und nehmen Blut ab. Welche der folgenden Befundkonstellationen würde Ihre Verdachtdiagnose erhärten?",
            options: [
              "Hb erhöht, MCH erhöht",
              "Hb erhöht, MCV erniedrigt",
              "Hb normal, Hkt erhöht",
              "Hb erniedrigt, MCH erniedrigt",
              "Hb erniedrigt, MCV erhöht"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Hb erniedrigt, MCH erniedrigt",
          },
          {
            id: "02_physiologie1_45",
            question: "Welche Aussage zum Herzzyklus ist korrekt?",
            options: [
              "Die Anspannungs- und Füllphase sind isovolumetrisch",
              "Die Ventrikelkontraktion fällt in die Systole",
              "Das Öffnen der Taschenklappen fällt in die Diastole",
              "Die R-Zacke im EKG markiert den Beginn der Erschlaffungsphase",
              "Zu keinem Zeitpunkt sind alle Herzklappen gleichzeitig geschlossen"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Die Ventrikelkontraktion fällt in die Systole",
          },
          {
            id: "02_physiologie1_46",
            question: "Chlorid ist das häufigste Anion des Extrazellulärraumes und hat wichtige Funktionen. Welche der u.g. Aussagen ist richtig?",
            options: [
              "Chloridkanal-gekoppelte Rezeptoren wirken im erwachsenen Organismus stets exzitatorisch.",
              "Der Ausstrom von Chlorid aus der Zelle ist der Hauptmechanismus für die regulatorische Volumenzunahme der Zelle nach osmotischer Schrumpfung.",
              "Chloridkanäle können Zellen depolarisieren, wenn das Membranpotenzial negativer als das Gleichgewichtspotenzial (Umkehrpotenzial) für Chlorid ist.",
              "Der Transport von Chlorid erfolgt typischerweise in einem Symport, der insgesamt ein Chlorid-Ion und ein Bikarbonat-Ion umfasst.",
              "Die Depolarisation von Skelettmuskelfasern wird typischerweise durch den Einstrom von Chlorid ausgelöst."
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Der Transport von Chlorid erfolgt typischerweise in einem Symport, der insgesamt ein Chlorid-Ion und ein Bikarbonat-Ion umfasst.",
          },
          {
            id: "02_physiologie1_47",
            question: "Welche Aussage bzgl. der synaptischen Signalübertragung an der motorischen Endplatte ist korrekt?",
            options: [
              "Entscheidend für die Erregungsübertragung auf die Skelettmuskelfaser sind muskarinische Acetylcholin-Rezeptoren.",
              "Zur Auslösung eines Aktionspotenzials in der Muskelfaser wird eine Aufsummierung aufeinander folgender präsynaptischer Aktionspotenziale benötigt (unvollständiger Tetanus).",
              "Botulinumtoxin verursacht eine verstärkte Transmitter-Ausschüttung an der motorischen Endplatte, indem es präsynaptische SNARE-Proteine spaltet.",
              "Zur Behandlung der Myasthenia gravis kann der Abbau von Acetylcholin im synaptischen Spalt mittels Acetylcholinesterasehemmern unterdrückt werden.",
              "Spannungsgesteuerte Na+ - Kanäle spielen für das von überschwelligen EPSPs in der Skelettmuskelfaser ausgelöste Aktionspotenzial keine Rolle."
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Zur Behandlung der Myasthenia gravis kann der Abbau von Acetylcholin im synaptischen Spalt mittels Acetylcholinesterasehemmern unterdrückt werden.",
          },
          {
            id: "02_physiologie1_48",
            question: "Welche Aussage über das Aktionspotenzial einer Warmblüter-Nervenfaser ist korrekt?",
            options: [
              "Ohne Nachpotenzial dauert das Aktionspotenzial etwa 10 ms.",
              "Die Depolarisationsphase des Aktionspotenzials beruht auf einer Vergrößerung des Kaliumstroms.",
              "Zur Repolarisation des Aktionspotenzials trägt die Inaktivierung der Na+ - Kanäle bei.",
              "Das Spitzenpotenzial des Aktionspotenzials hat einen positiveren Wert als das Natriumgleichgewichtspotenzial.",
              "Eine auftretende Nachhyperpolarisation ist durch starke Zunahme der Na+ - Leitfähigkeit bedingt."
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Zur Repolarisation des Aktionspotenzials trägt die Inaktivierung der Na+ - Kanäle bei.",
          },
          {
            id: "02_physiologie1_49",
            question: "Durch welchen Prozess wird der Querbrückenzyklus eines Skelettmuskels beendet?",
            options: [
              "Durch das Ausbleiben eines erneuten Aktionspotenzials passiert nichts mehr und der Zyklus ist beendet.",
              "Das Sinken des intrazellulären CA2+ - Spiegels (vor allem durch Aktivierung der SERCA) beendet den Vorgang.",
              "Die ATPase-Aktivität des Myosinkopfes steigt, sodass der Querbrückenzyklus unterbrochen wird.",
              "Durch Steigen der K+ - Konzentration kann kein neues Aktionspotenzial ausgelöst werden, was den Vorgang beendet.",
              "Da der Myosinkopf am Ende des Querbrückenzyklus seine Lage verändert, kann ein neues ATP-Molekül gebunden werden, sodass dieser Prozess nie endet, weshalb man auch von einem Zyklus spricht."
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Das Sinken des intrazellulären CA2+ - Spiegels (vor allem durch Aktivierung der SERCA) beendet den Vorgang.",
          },
          {
            id: "02_physiologie1_50",
            question: "Welche Aussage zum Aktionspotenzial (AP) der Skelettmuskelzelle ist korrekt?",
            options: [
              "Das AP wird durch die Aktivierung spannungsabhängiger Chloridkanäle initiiert.",
              "Die Dauer des AP entspricht der typischen Dauer des AP einer Herzmuskelzelle im Arbeitsmyokard.",
              "Das über die Skelettmuskelzelle laufende AP sorgt für eine Konformationsänderung des DHP-Rezeptors in der Zellmembran.",
              "Das über die Skelettmuskelzelle laufende AP wird über die longitudinalen Tubuli der Muskelfaser fortgeleitet.",
              "Das AP aktiviert den im Sarkolemm sitzenden Ryanodin-1-Rezeptor, der für die Ausschüttung der zellinternen CA2+ -Speicher verantwortlich ist."
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Das über die Skelettmuskelzelle laufende AP sorgt für eine Konformationsänderung des DHP-Rezeptors in der Zellmembran.",
          },
          {
            id: "02_physiologie1_51",
            question: "Eine auffällig blasse Frau kommt wegen Erschöpfung in Ihre Sprechstunde. Blutbild: Erythrozytenanzahl: 2.5 * 10^12/l, Hämatokrit: 0.26, Hämoglobinkonzentration: 90 g/l, MCV: 105, MCH: 36 pg. Sie vermuten eine Anämie. Welche Ursache ist am wahrscheinlichsten?",
            options: [
              "Eisenmangel",
              "Vitamin B12-Mangel",
              "Niereninsuffizienz",
              "Unentdeckte Tumorerkrankung",
              "Blutendes Magengeschwür"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Vitamin B12-Mangel",
          },
          {
            id: "02_physiologie1_52",
            question: "Welche Aussage zum AB0-Blutgruppensystem trifft zu?",
            options: [
              "Menschen mit der Blutgruppe 0 besitzen keine Antikörper gegen die Blutgruppenantigene A und B.",
              "Erythrozyten der Blutgruppe 0 tragen die Antigene A und B.",
              "Menschen der Blutgruppe B besitzen Antikörper gegen das Antigen B.",
              "Als Antigene dieses Blutgruppensystems dienen Glykolipide auf der Oberfläche der Erythrozytenmembran.",
              "Weltweit ist die Blutgruppe B die am häufigsten vertretene Blutgruppe."
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Als Antigene dieses Blutgruppensystems dienen Glykolipide auf der Oberfläche der Erythrozytenmembran.",
          },
          {
            id: "02_physiologie1_53",
            question: "Welche Aussage zur atrioventrikulären Überleitungszeit trifft zu?Eine Abnahme der AV-Überleitungszeit...",
            options: [
              "ist ein Hinweis auf einen AV-Block 1. Grades.",
              "ist das Resultat einer Abnahme der Herzfrequenz.",
              "führt im EKG typischerweise zu einer Verkürzung des PQ-Intervalls.",
              "tritt typischerweise durch Wirkung von Acetylcholin am AV-Knoten auf.",
              "entspricht einer negativ chronotropen Wirkung."
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: führt im EKG typischerweise zu einer Verkürzung des PQ-Intervalls.",
          },
          {
            id: "02_physiologie1_54",
            question: "In welcher Phase des Herzzyklus ist das Blutvolumen in den Kammern konstant?",
            options: [
              "Austreibungsphase",
              "Diastole",
              "Füllphase",
              "Systole",
              "Entspannungsphase"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Entspannungsphase",
          },
          {
            id: "02_physiologie1_55",
            question: "Das vegetative Nervensystem ist für die extrakardiale Regulation der Herztätigkeit zuständig. Wodurch wird am Herzen ein positiv chronotroper und positiv inotroper Effekt bewirkt?",
            options: [
              "Durch die Aktivierung der Kir-Kanäle im Sinusknoten",
              "Durch die Wirkung von Adrenalin am β1-Rezeptor im Sinusknoten",
              "Durch Blockade der β1-Rezeptoren durch Acetylcholin im Sinusknoten",
              "Durch die Wirkung des Parasympathikus am Kammer-Myokard",
              "Durch eine Steigerung des intrazellulären Ca2+ -Levels, wie bspw. nach Gabe von Herzglykosiden"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Durch die Wirkung von Adrenalin am β1-Rezeptor im Sinusknoten",
          },
          {
            id: "02_physiologie1_56",
            question: "Der Frank-Starling-Mechanismus beschreibt die passive Regulation der Auswurfleistung. Welche Aussage ist korrekt?",
            options: [
              "Die Stärke der Auswurfleistung resultiert aus der Aktivierungsstärke der HCN-Kanäle.",
              "Der Frank-Starling-Mechanismus beruht auf der Sensitivität des Kammermyokards für Acetylcholin.",
              "Die Kontraktilität des Herzmuskels nimmt mit steigender Vorlast stetig ab.",
              "Die höhere Auswurfleistung bei erhöhter Vordehnung resultiert aus einer erhöhten Ca2+ -Sensitivität der kontraktilen Filamente.",
              "Die Wanddicke steigt immer proportional mit der Wandspannung der Herzkammer."
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Die höhere Auswurfleistung bei erhöhter Vordehnung resultiert aus einer erhöhten Ca2+ -Sensitivität der kontraktilen Filamente.",
          },
          {
            id: "02_physiologie1_57",
            question: "Die Öffnung welcher Ionenkanäle ist vornehmlich für die Stabilisierung des Ruhepotentials an der Membran einer typischen Nervenzelle verantwortlich",
            options: [
              "Spannungsabhängige Na+ Kanäle",
              "Spannungsabhängige Ca2+ Kanäle",
              "Spannungsabhängige K+ Kanäle",
              "Spannungsabhängige Cl-Kanäle",
              "Einwärts gerichtete Kaliumkanäle"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: Einwärts gerichtete Kaliumkanäle",
          },
          {
            id: "02_physiologie1_58",
            question: "Die Natrium-Kalium-Pumpe ist ein wichtiges Element für den Zellstoffwechsel einer jeden Zelle. Welche Aussage zur Na+/K+ ATPase ist richtig?",
            options: [
              "Die Na+/K+ ATPase vermittelt einen Na+/K+ Symport",
              "Die Na+/K+ ATPase ist ein Carrier, der die Diffusion von Na+ und K+ über die Zellmembran erleichtert",
              "Die Na+/K+ ATPase transportiert unter ATP verbrauch transportier 3 Natrium aus der Zelle und 2 Kalium in die Zelle",
              "Die Na+/K+ Atpase transportiert zusätlich primär aktiv Glukose in die Zelle",
              "Die Na+/K+ ATPase transportiert immer gleiche viele Ladungsträger beim Antiport, so dass das Membranpotenzial dadurch nicht verändert wird"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Die Na+/K+ ATPase transportiert unter ATP verbrauch transportier 3 Natrium aus der Zelle und 2 Kalium in die Zelle",
          },
          {
            id: "02_physiologie1_59",
            question: "Kommt es zu einer Mutation und somit zu einem Funktionsverlust eines Ionenkanals der Präsynapse, so verhindert dies die Vesikelfusion und die Freisetzung eines Neurotransmitters. Um welchen Ionenkanal handelt es sich dabei am ehsten.",
            options: [
              "Kir Kanal",
              "Na+ Kanal",
              "Kto+ Kanal",
              "Ca2+ Kanal",
              "Cl- Kanal"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Ca2+ Kanal",
          },
          {
            id: "02_physiologie1_60",
            question: "Was besagt die Hüfner Zahl?",
            options: [
              "Die Hüfner-Zahl beschreibt den O2-Gehalt des desoxygenierten Blutes",
              "Die Hüfner-Zahl ändert sich gemäß dem arteriellen Sauerstoff-Partialdruck",
              "Die Hüfner-Zahl beschreibt das Sauerstoffvolumen, das von 1g Hämoglobin maximal gebunden werden kann",
              "Die Hüfner-Zahl beschreibt die Bindung des O2 an Methhämoglobin",
              "Die Hüfner-Zahl beschreibt O2-Fraktion im inspiratorischen Gasgemisch"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Die Hüfner-Zahl beschreibt das Sauerstoffvolumen, das von 1g Hämoglobin maximal gebunden werden kann",
          },
          {
            id: "02_physiologie1_61",
            question: "Bei einer Zelle betrage die Konzentration eines einfach positiven geladen Ions zytosolisch 185mmol/L und extrazellulär 18,5mmol/L. Etwa wie groß ist das Gleichgewichtspotenzial dieses Ions bei einer Temperatur von 37 Grad Celcius",
            options: [
              "-120mv",
              "-60mv",
              "0mv",
              "+60",
              "+120"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: -60mv",
          },
          {
            id: "02_physiologie1_62",
            question: "Die äußere Zellmembran von Zellen ist semipermeabel, sie lässt also manche Stoffe gut durch sie hindurch diffundieren und andere weniger gut bis garnicht. Welche der folgenden Substanzen kann ohne weitere Transportprozesse oder spezalisierte Kanäle am besten passiv über die Membran diffundieren?",
            options: [
              "Natriumion",
              "Bikarbonat",
              "Glucose",
              "Sauerstoff",
              "Aminosäure"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Sauerstoff",
          },
          {
            id: "02_physiologie1_63",
            question: "Ein AV-Block 3. Grades ist ein lebensbedrohlicher Zustand. WElche der folgenden Aussagen trifft hier am ehsten zu",
            options: [
              "Der Vorhoferregung folg nur in unregelmäßigen Abständen ein QRS-Komplex der Kammer mit dann aber gleich langen PQ-Intervall",
              "Der weiterhin bestehende QRS Komplex findet mit einem Ersatzrhytmus der tertiären Schrittmacherzentren von etwa 30-40 Schläge pro Minute statt",
              "Typisches Bild im EKG eines AV Block 3. Grades ist das AUsbleiben der T Welle",
              "Generell ist die P-Welle stark verringer bis abwesend, da keine Vorhofkontraktion stattfindet",
              "Die R-R- Intervalle liegen in Ruhe in aller Regel im Bereich von unter 800ms"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Der weiterhin bestehende QRS Komplex findet mit einem Ersatzrhytmus der tertiären Schrittmacherzentren von etwa 30-40 Schläge pro Minute statt",
          },
          {
            id: "02_physiologie1_64",
            question: "Bei der primären Blutstillung spielt der von.Willebrand-Faktor eine wichtige Rolle. Welche der folgenden Aussagen zum vWF ist korrekt",
            options: [
              "wird auch als Gerinnungsfaktor II bezeichnet",
              "ist ein Protein, das den Gerinnungsfaktor VIII destabilisiert und dessen Abbaurate erhöhr",
              "Der vWF ist bei Endothelläsionen das Bindeglied zwischen subendothelialer Matix und der Thrombozytenmembran",
              "wird ovn reifen Erythrozyten synthetisiert",
              "wirkt als Plasminogen AKtivator"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Der vWF ist bei Endothelläsionen das Bindeglied zwischen subendothelialer Matix und der Thrombozytenmembran",
          },
          {
            id: "02_physiologie1_65",
            question: "In welchem Gebiet des ZNS befindet sich typischerweise das Atemzentrum",
            options: [
              "Colliculus inferior",
              "Cerebellum",
              "Medulla oblongata",
              "Tectum mesencephali",
              "Thalamus ventralis"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Medulla oblongata",
          },
          {
            id: "02_physiologie1_66",
            question: "Bei einer Patientin wird ein Blutbild angefertig. Welche BefundKonstellation der folgenden Werte spricht am ehsten für einen Folsäure-Mangel",
            options: [
              "Erythrozytenanzahl vermindertHämoglobinwert erhöhtMCH verkleinertMCV verkleinert",
              "Erythrozytenanzahl vermindertHämoglobinwert erniedrigtMCH verkleinert MCV verkleinert",
              "Erythrozytenanzahl normalHämoglobinwert erniedrigt MCH vergrößertMCV vergrößert",
              "Erythrozytenanzahl vermindertHämoglobinwert erniedrigtMCH erhöhtMCV erhöht",
              "Erythrozytenanzahl erhöhtHämoglobinwert erniedrigtMCH vergrößertMCV vergrößert"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Erythrozytenanzahl vermindertHämoglobinwert erniedrigtMCH erhöhtMCV erhöht",
          },
          {
            id: "02_physiologie1_67",
            question: "Die Erregungsleitungsgeschwindigkeit einer markhaltigen Nervenfaser ist im Allgemein größer, wenn",
            options: [
              "der Grad der Myeliniserung gerringer ist",
              "Die Membrankapazität im Bereich des Internodium größer ist",
              "Die Temperatur niedriger ist",
              "Die dichte der Spannungsabhängigen Natrium Kanäle in der Zellmembran der Ranvier Schnürringe kleiner ist",
              "der Innendurchmesser des Axons größer ist"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: der Innendurchmesser des Axons größer ist",
          },
          {
            id: "02_physiologie1_68",
            question: "Welche der folgenden Aussagen trifft bezüglich der extrakardialen Regulation zu",
            options: [
              "Der Parasympathikus wirkt an der Schrittmacherzelle über den Transmitter Adrenalin.",
              "Der Sympathikus wirkt an der Schrittmacherzelle über den Transmitter Acetylcholin",
              "An der Schritmmacherzelle wirkt der Parasympathikus durch die Bindung von Acetylcholin an β 1 Rezepotren",
              "An der Schritmmacherzelle wirkt der Sympathkis durch die Bindung von Adrenalin an M2 Rezeptoren",
              "An der Schrittmacherzelle wirken Sympathkis sowie Parasympathikus"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: An der Schrittmacherzelle wirken Sympathkis sowie Parasympathikus",
          },
          {
            id: "02_physiologie1_69",
            question: "Welche Aussage über die Veränderung der Hermuskephysiologe bei einer Herzinsuffizientz trifft am ehsten zu",
            options: [
              "Durch die Konstante Sympathikusaktivierung kommt er zu einem vermehreten einbau von M2 Rezeptoren in der Herzmuskelzelle",
              "Bei einer Herzinsuffizienz verändert sich die Zellmorphologie der Kardiomyozyten nicht, nur die Wandspannung des Herzens ist erhöht",
              "Herzglykoside haben zentralnervös kein Einfluss auf den parasympathikus",
              "Bei Herzinsuffizienz kommt es durch strukturelles und elektrische Remodeling zu irreversiblen Schäden in den Kardiomyozyten",
              "Das Herz reagiert auf einer erhöhte Volumenbelastung mit einer verringerung der Wandspannung"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Bei Herzinsuffizienz kommt es durch strukturelles und elektrische Remodeling zu irreversiblen Schäden in den Kardiomyozyten",
          },
          {
            id: "02_physiologie1_70",
            question: "Welche Aussage zur neuromuskulären Endplatte ist falsch",
            options: [
              "Der Anstieg der intrazellulären Ca2 Konzentration über den RyR1 Rezeptor aus zellinterne Speichern triggert die Muskelkontraktion",
              "Die mAChR Aktivierung sorgt für die Depolarisation der Muskelfasermembran und Konformationänderung der DHPR Rezeptoren die durch die mechanische Koppluung an RyR1 Rezeptor Kalzium in der Muskelfaser freisetzen",
              "Die mAChR Aktivierung sorgt für die Depolarisation der Muskelfasermembran und Konformationsänderung des RyR1 Rezepotren die durch die mechanische Kopplung an DHPR Rezepotr Kalium in die Muskelfaser freisetzen",
              "Die Repolarisation der Muskelfasermebran erfolgt über Kalium und Chlorid Kanäle",
              "Die Muskelerschlaffung wird hauptsächlich über den Kalzium Rücktransport mit Hilfe der SERCA an das Sakroplasmatische Retikulum erreicht"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Die mAChR Aktivierung sorgt für die Depolarisation der Muskelfasermembran und Konformationsänderung des RyR1 Rezepotren die durch die mechanische Kopplung an DHPR Rezepotr Kalium in die Muskelfaser freisetzen",
          },
          {
            id: "02_physiologie1_71",
            question: "Künstliceh Beatmung erfolgt unter anderem mit Überdruck, was je nach Notwendigkeit einen mehr oder weniger erhöhten PEEP nach sich ziehtWelche Nebenwirkung dieser küstlichen Beatmung ist korrekt?",
            options: [
              "Abfall des intrathorakeln Drucks",
              "Behinderung des venösen Abflusses im Gehirn und eine Hirndruckanstieg",
              "Erhöhte Persion in der Niere",
              "Links-Herz-Belastung",
              "Überdehnung von Arealen mit erniedrigter Compliance"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: Behinderung des venösen Abflusses im Gehirn und eine Hirndruckanstieg",
          },
          {
            id: "02_physiologie1_72",
            question: "Inspiration und Exspiration werden durch Veränderungen des Intrapleuralen Drucks (Ppleu) und des intrapulmonalen Drucks (Ppul) gesteuert. Diese Drücke werden über die Atemmuskulatur reguliert. Dieses Zusammenspiel wird als Atemmechanik bezeichnet. Welche aussage trift zu ?",
            options: [
              "Während der inspiration wird der intrpulmonale druck positiver",
              "während der expiration kontrahiert das zwerchfell",
              "bei Ruheatmung wird der intrapleurale Druck während der inspiration pos.",
              "bei Ruheatmung wird der intrapulmonale Druck während der expiration pos.",
              "die M. intercostales externi dienen als Hilfsmuskel für die Inspiration"
            ],
            correctIndex: 4,
            explanation: "Die richtige Antwort ist: die M. intercostales externi dienen als Hilfsmuskel für die Inspiration",
          },
          {
            id: "02_physiologie1_73",
            question: "Ein Schlag auf den Caroticussinus aktiviert die Pressorezeptoren, was zur bewusstlosikeit führen kann. Welcher der folgenen Mechanismen erklärt diese Reaktion des Körpers",
            options: [
              "Aktivierung von efferenten C-Fasern in der Hinterwurzel der Thorakalen segmente",
              "Hemmung der aktivität von parasympatischen Neuronen im Ncl. ambiguus in der Medulla oblongata",
              "Aktivierung von parasympatischen efferenzen aus dem Ncl. ambiguus und hemmung der sympathischen Efferenzen",
              "Aktivierung von α 1 rezeptoren in den Blutgefäßen",
              "Verlagerung von mehr als 800 ml Blut vom Brustkorb in die unteren Extremitäten"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Aktivierung von parasympatischen efferenzen aus dem Ncl. ambiguus und hemmung der sympathischen Efferenzen",
          },
          {
            id: "02_physiologie1_74",
            question: "erys sind für den transport von atemgasen zuständig. welche aussage stimmt am ehesten ?",
            options: [
              "nach der Bindung von sauerstoff verändert sich die wertigkeit vom Eisen von fe2+ zu fe3+ 8 %",
              "das methhämoglobin wird durch die bindung vom Sauerstoff an Hämoglobin im t-konformationszustand charakterisiert 8 %",
              "als oxygenierung wird die Bindung vom Sauerstoff an Hämoglobin bezeichnet 73 %",
              "die Hüffner-Zahl beschreibt ie Diffusionskapaziät des Sauerstoffs durch die Alveolarmembran 3 %",
              "ein Hb-Wert von 15 g/dl bei einem erwachsenen deutet auf das vorliegen einer Eisenmangelanämie hin 4 %"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: als oxygenierung wird die Bindung vom Sauerstoff an Hämoglobin bezeichnet 73 %",
          },
          {
            id: "02_physiologie1_75",
            question: "welche aussage zu Laktat-Leistungs-Diagnostik ist am ehesten richtig ?",
            options: [
              "Laktat ensteht im verlauf der aeroben Energiebereitstellung",
              "die Laktatschwelle bei 4 mmol/l laktat signalisiert die plötzlich stattfindende Umstellung der Energiebereitstellung von Kohlenhydraten zu Fetten",
              "Durch die Laktat schwellen ist eine Abschätzung des aero-anaeroben Übergangsbereich möglich",
              "langandauernde ermüdende Belastung von mehreren Stunden - wie z.B. ein Fahrradausflug oder MArathonlauf- gehe mit Laktatkonzentration von 20 mmol/l oder mehr einher",
              "Laktat kann auch bei völliger entleerung der muskulären und hepatischen Glykogenspeicher in hoher konzetration im blut nachgewiesen werden (z.B. mehr als 15 mmol/l)"
            ],
            correctIndex: 2,
            explanation: "Die richtige Antwort ist: Durch die Laktat schwellen ist eine Abschätzung des aero-anaeroben Übergangsbereich möglich",
          },
          {
            id: "02_physiologie1_76",
            question: "metaboliten wie Protonen oder laktat fallen bei muskulärer arbeit an. Welche aussage zu wirkung dieser metaboliten trifft am ehesten zu?",
            options: [
              "Solche metaboliten rufen eine lokale Vasokonstriktion hervor",
              "Diese Metaboliten leiten einen brechreflex ein",
              "Diese Metaboliten hemmen lokal die Ausschüttung von ACh aus nervenendigungen",
              "Diese Metaboliten rufen lokae Vasodilatation hervor",
              "Diese Metaboliten haben keinen einfluss auf die Blutgefäße"
            ],
            correctIndex: 3,
            explanation: "Die richtige Antwort ist: Diese Metaboliten rufen lokae Vasodilatation hervor",
          },
          {
            id: "02_physiologie1_77",
            question: "Bei der Orthostase kommt es durch vegetative kreislaufregulation zu charakteristischen Veränderungen. welche der folgenden Veränderungen beim hinstelle im Vergleich zum Liegen sind akut am ehesten zu erwarten ?",
            options: [
              "erhöhtes Schlagvolumen",
              "erhöhte Herzfrequenz",
              "verringerte totaler periphere widerstand",
              "erhöhtes Herzzeitvolumen",
              "erhöhte Vorlast"
            ],
            correctIndex: 1,
            explanation: "Die richtige Antwort ist: erhöhte Herzfrequenz",
          }
        ],
      },
    ],
  },
};
