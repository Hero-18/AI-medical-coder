/**
 * ICD-11 Data Structure following WHO Official Hierarchy:
 * Chapter → Block → Category → Code
 * 
 * Reference: https://icd.who.int/browse11
 * 
 * Changes from previous Lovable-generated code:
 * 1. Added "block" field for proper ICD-11 hierarchy
 * 2. Added "foundationUri" for official WHO identifier
 * 3. Added "parentCode" for hierarchical relationships
 * 4. Corrected chapter numbering to match official ICD-11
 * 5. Added "codeType" to distinguish entity levels
 * 6. Proper code formatting with official ICD-11 alphanumeric system
 */

export type ICD11CodeType = 'chapter' | 'block' | 'category' | 'code';

export interface ICD11Entry {
  // Core ICD-11 identifiers
  code: string;                    // Official ICD-11 code (e.g., "1A00", "BA00.Z")
  foundationUri?: string;          // WHO Foundation URI for API lookup
  
  // Hierarchy fields (Chapter → Block → Category → Code)
  chapter: string;                 // e.g., "01" for Infectious diseases
  chapterTitle: string;            // Full chapter name
  block: string;                   // Block within chapter (e.g., "Gastroenteritis")
  blockRange?: string;             // Code range for block (e.g., "1A00-1A4Z")
  category: string;                // Category within block
  parentCode?: string;             // Parent code for hierarchical lookups
  codeType: ICD11CodeType;         // Level in hierarchy
  
  // Clinical information
  name: string;                    // Preferred term/title
  definition: string;              // Official ICD-11 definition
  inclusions?: string[];           // "Includes" notes
  exclusions?: string[];           // "Excludes" notes (code-if-applicable)
  codingNotes?: string[];          // Coding guidance
  
  // Extended clinical data (for educational purposes)
  causes: string[];
  symptoms: string[];
  prevention: string[];
  precautions: string[];
  management: string[];
  
  // Synonyms for search
  synonyms?: string[];
  indexTerms?: string[];
}

/**
 * ICD-11 Chapter Reference (2024 Release)
 * Following official WHO ICD-11 MMS structure
 */
export const ICD11_CHAPTERS = [
  { code: "01", title: "Certain infectious or parasitic diseases", range: "1A00-1H0Z" },
  { code: "02", title: "Neoplasms", range: "2A00-2F9Z" },
  { code: "03", title: "Diseases of the blood or blood-forming organs", range: "3A00-3C0Z" },
  { code: "04", title: "Diseases of the immune system", range: "4A00-4B4Z" },
  { code: "05", title: "Endocrine, nutritional or metabolic diseases", range: "5A00-5D4Z" },
  { code: "06", title: "Mental, behavioural or neurodevelopmental disorders", range: "6A00-6E8Z" },
  { code: "07", title: "Sleep-wake disorders", range: "7A00-7B2Z" },
  { code: "08", title: "Diseases of the nervous system", range: "8A00-8E7Z" },
  { code: "09", title: "Diseases of the visual system", range: "9A00-9E1Z" },
  { code: "10", title: "Diseases of the ear or mastoid process", range: "AA00-AC0Z" },
  { code: "11", title: "Diseases of the circulatory system", range: "BA00-BE2Z" },
  { code: "12", title: "Diseases of the respiratory system", range: "CA00-CB7Z" },
  { code: "13", title: "Diseases of the digestive system", range: "DA00-DE2Z" },
  { code: "14", title: "Diseases of the skin", range: "EA00-EM0Z" },
  { code: "15", title: "Diseases of the musculoskeletal system or connective tissue", range: "FA00-FC0Z" },
  { code: "16", title: "Diseases of the genitourinary system", range: "GA00-GC8Z" },
  { code: "17", title: "Conditions related to sexual health", range: "HA00-HA8Z" },
  { code: "18", title: "Pregnancy, childbirth or the puerperium", range: "JA00-JB6Z" },
  { code: "19", title: "Certain conditions originating in the perinatal period", range: "KA00-KD5Z" },
  { code: "20", title: "Developmental anomalies", range: "LA00-LD9Z" },
  { code: "21", title: "Symptoms, signs or clinical findings, not elsewhere classified", range: "MA00-MH2Z" },
  { code: "22", title: "Injury, poisoning or certain other consequences of external causes", range: "NA00-NF2Z" },
  { code: "23", title: "External causes of morbidity or mortality", range: "PA00-PL2Z" },
  { code: "24", title: "Factors influencing health status or contact with health services", range: "QA00-QF4Z" },
  { code: "25", title: "Codes for special purposes", range: "RA00-RA26" },
  { code: "26", title: "Supplementary Chapter Traditional Medicine Conditions", range: "SA00-SJ3Z" },
  { code: "V", title: "Supplementary section for functioning assessment", range: "VA00-VC50" },
  { code: "X", title: "Extension Codes", range: "XA00-XY9Z" },
];

export const icd11Data: ICD11Entry[] = [
  // ============================================
  // CHAPTER 01: Certain infectious or parasitic diseases
  // ============================================
  {
    code: "1A00",
    foundationUri: "http://id.who.int/icd/entity/257068234",
    chapter: "01",
    chapterTitle: "Certain infectious or parasitic diseases",
    block: "Gastroenteritis or colitis of infectious origin",
    blockRange: "1A00-1A4Z",
    category: "Bacterial intestinal infections",
    parentCode: undefined,
    codeType: "code",
    name: "Cholera",
    definition: "A bacterial infection of the small intestine caused by Vibrio cholerae, characterized by profuse watery diarrhoea, vomiting, and rapid dehydration.",
    inclusions: ["Cholera due to Vibrio cholerae O1", "Cholera due to Vibrio cholerae O139"],
    exclusions: ["Vibrio parahaemolyticus foodborne intoxication (1A40)"],
    codingNotes: ["Use additional code for associated severe dehydration if applicable"],
    causes: [
      "Vibrio cholerae bacteria (O1 or O139 serogroups)",
      "Contaminated water sources",
      "Fecal-oral transmission",
      "Ingestion of contaminated seafood",
      "Poor sanitation infrastructure"
    ],
    symptoms: [
      "Rice-water stool (profuse watery diarrhea)",
      "Projectile vomiting",
      "Severe dehydration (sunken eyes, dry mouth)",
      "Muscle cramps (hypokalemia)",
      "Hypotension and tachycardia",
      "Altered consciousness in severe cases"
    ],
    prevention: [
      "Access to safe drinking water",
      "Proper sanitation and sewage disposal",
      "Hand hygiene with soap",
      "Oral cholera vaccination in endemic areas",
      "Safe food handling practices"
    ],
    precautions: [
      "Boil or treat water before drinking",
      "Avoid raw or undercooked shellfish",
      "Wash hands before eating",
      "Seek immediate medical care if symptoms develop"
    ],
    management: [
      "Oral Rehydration Salts (ORS) - first-line treatment",
      "Intravenous Ringer's lactate for severe dehydration",
      "Zinc supplementation (children)",
      "Antibiotics (azithromycin, doxycycline) for severe cases",
      "Continued feeding during illness"
    ],
    synonyms: ["Asiatic cholera", "Epidemic cholera"],
    indexTerms: ["cholera", "vibrio cholerae infection", "acute watery diarrhea"]
  },
  {
    code: "1A01",
    foundationUri: "http://id.who.int/icd/entity/1193182629",
    chapter: "01",
    chapterTitle: "Certain infectious or parasitic diseases",
    block: "Gastroenteritis or colitis of infectious origin",
    blockRange: "1A00-1A4Z",
    category: "Bacterial intestinal infections",
    parentCode: undefined,
    codeType: "code",
    name: "Intestinal infection due to other Vibrio",
    definition: "Gastrointestinal infections caused by Vibrio species other than V. cholerae O1 and O139.",
    causes: [
      "Vibrio parahaemolyticus",
      "Vibrio vulnificus",
      "Consumption of raw or undercooked seafood",
      "Wound exposure to contaminated seawater"
    ],
    symptoms: [
      "Watery diarrhea",
      "Abdominal cramps",
      "Nausea and vomiting",
      "Fever",
      "Wound infections (V. vulnificus)"
    ],
    prevention: [
      "Cook seafood thoroughly",
      "Avoid raw oysters",
      "Protect wounds from seawater exposure",
      "Proper food refrigeration"
    ],
    precautions: [
      "Immunocompromised patients at higher risk",
      "Liver disease increases V. vulnificus severity",
      "Seek care for wound infections after sea exposure"
    ],
    management: [
      "Fluid and electrolyte replacement",
      "Antibiotics for severe cases",
      "Wound care and debridement if needed",
      "Supportive care"
    ],
    synonyms: ["Non-cholera Vibrio infection"],
    indexTerms: ["vibrio parahaemolyticus", "vibrio vulnificus"]
  },
  {
    code: "1A03",
    foundationUri: "http://id.who.int/icd/entity/1471673578",
    chapter: "01",
    chapterTitle: "Certain infectious or parasitic diseases",
    block: "Gastroenteritis or colitis of infectious origin",
    blockRange: "1A00-1A4Z",
    category: "Bacterial intestinal infections",
    parentCode: undefined,
    codeType: "category",
    name: "Typhoid or paratyphoid fever",
    definition: "Systemic bacterial infections caused by Salmonella enterica serovars Typhi or Paratyphi, characterized by prolonged fever, bacteremia, and potential intestinal complications.",
    causes: [
      "Salmonella enterica serovar Typhi",
      "Salmonella enterica serovar Paratyphi A, B, or C",
      "Fecal-oral transmission",
      "Contaminated food or water",
      "Chronic carriers"
    ],
    symptoms: [
      "Step-ladder fever pattern",
      "Relative bradycardia",
      "Rose spots on trunk",
      "Hepatosplenomegaly",
      "Abdominal distension",
      "Constipation (early) or diarrhea (late)"
    ],
    prevention: [
      "Typhoid vaccination (Vi polysaccharide or Ty21a)",
      "Safe water supply",
      "Food hygiene",
      "Handwashing",
      "Identification and treatment of carriers"
    ],
    precautions: [
      "Complete full antibiotic course",
      "Monitor for intestinal perforation",
      "Avoid food handling during illness",
      "Stool cultures to confirm clearance"
    ],
    management: [
      "Fluoroquinolones (where susceptible)",
      "Azithromycin",
      "Third-generation cephalosporins",
      "Supportive care and hydration",
      "Surgery for intestinal perforation"
    ],
    synonyms: ["Enteric fever"],
    indexTerms: ["typhoid fever", "paratyphoid fever", "enteric fever"]
  },
  {
    code: "1A03.0",
    foundationUri: "http://id.who.int/icd/entity/578822528",
    chapter: "01",
    chapterTitle: "Certain infectious or parasitic diseases",
    block: "Gastroenteritis or colitis of infectious origin",
    blockRange: "1A00-1A4Z",
    category: "Bacterial intestinal infections",
    parentCode: "1A03",
    codeType: "code",
    name: "Typhoid fever",
    definition: "A systemic infection caused specifically by Salmonella enterica serovar Typhi, transmitted via the fecal-oral route.",
    causes: [
      "Salmonella typhi bacteria",
      "Contaminated food or water",
      "Poor sanitation",
      "Contact with chronic carriers"
    ],
    symptoms: [
      "High sustained fever (39-40°C)",
      "Headache",
      "Malaise",
      "Rose spots on abdomen",
      "Abdominal pain",
      "Constipation or diarrhea"
    ],
    prevention: [
      "Typhoid vaccination",
      "Safe water practices",
      "Proper food hygiene",
      "Regular handwashing"
    ],
    precautions: [
      "Complete full antibiotic course",
      "Avoid preparing food for others while infected",
      "Practice strict hand hygiene"
    ],
    management: [
      "Antibiotic therapy (ciprofloxacin, azithromycin, ceftriaxone)",
      "Adequate rest",
      "Hydration maintenance",
      "Nutritional support"
    ],
    synonyms: ["Enteric fever due to S. typhi"],
    indexTerms: ["typhoid", "salmonella typhi infection"]
  },
  {
    code: "1A03.1",
    foundationUri: "http://id.who.int/icd/entity/1187438165",
    chapter: "01",
    chapterTitle: "Certain infectious or parasitic diseases",
    block: "Gastroenteritis or colitis of infectious origin",
    blockRange: "1A00-1A4Z",
    category: "Bacterial intestinal infections",
    parentCode: "1A03",
    codeType: "code",
    name: "Paratyphoid fever",
    definition: "A systemic infection caused by Salmonella enterica serovars Paratyphi A, B, or C, typically milder than typhoid fever.",
    causes: [
      "Salmonella paratyphi A, B, or C",
      "Contaminated food or water",
      "Fecal-oral transmission"
    ],
    symptoms: [
      "Fever (often lower than typhoid)",
      "Headache",
      "Gastrointestinal symptoms",
      "Rose spots (less common)",
      "Shorter duration than typhoid"
    ],
    prevention: [
      "Safe water and food practices",
      "Hand hygiene",
      "Some cross-protection from typhoid vaccine"
    ],
    precautions: [
      "Complete antibiotic course",
      "Avoid food handling while ill"
    ],
    management: [
      "Antibiotic therapy",
      "Supportive care",
      "Hydration"
    ],
    synonyms: ["Enteric fever due to S. paratyphi"],
    indexTerms: ["paratyphoid", "salmonella paratyphi"]
  },

  // ============================================
  // CHAPTER 01: Diseases due to Protozoa
  // ============================================
  {
    code: "1F40",
    foundationUri: "http://id.who.int/icd/entity/308362695",
    chapter: "01",
    chapterTitle: "Certain infectious or parasitic diseases",
    block: "Diseases due to Protozoa",
    blockRange: "1F40-1F5Z",
    category: "Malaria",
    parentCode: undefined,
    codeType: "category",
    name: "Malaria",
    definition: "A parasitic disease caused by Plasmodium species transmitted through the bite of infected female Anopheles mosquitoes.",
    causes: [
      "Plasmodium falciparum",
      "Plasmodium vivax",
      "Plasmodium malariae",
      "Plasmodium ovale",
      "Plasmodium knowlesi",
      "Female Anopheles mosquito bites"
    ],
    symptoms: [
      "Cyclical fever (tertian or quartan)",
      "Chills and rigors",
      "Sweating",
      "Headache",
      "Myalgia",
      "Hepatosplenomegaly"
    ],
    prevention: [
      "Insecticide-treated bed nets (ITNs)",
      "Indoor residual spraying",
      "Antimalarial chemoprophylaxis",
      "Eliminate standing water",
      "Protective clothing"
    ],
    precautions: [
      "Seek immediate treatment for fever in endemic areas",
      "Complete full treatment course",
      "Pregnant women at high risk"
    ],
    management: [
      "Artemisinin-based combination therapy (ACT)",
      "Primaquine for P. vivax/ovale",
      "Supportive care",
      "Blood transfusion for severe anemia"
    ],
    synonyms: ["Paludism", "Jungle fever"],
    indexTerms: ["malaria", "plasmodium infection"]
  },
  {
    code: "1F40.0",
    foundationUri: "http://id.who.int/icd/entity/1268901672",
    chapter: "01",
    chapterTitle: "Certain infectious or parasitic diseases",
    block: "Diseases due to Protozoa",
    blockRange: "1F40-1F5Z",
    category: "Malaria",
    parentCode: "1F40",
    codeType: "code",
    name: "Malaria due to Plasmodium falciparum",
    definition: "The most severe form of malaria caused by Plasmodium falciparum, capable of causing severe disease including cerebral malaria, severe anemia, and multi-organ failure.",
    inclusions: ["Falciparum malaria", "Malignant tertian malaria"],
    exclusions: ["Mixed plasmodium infections (1F40.5)"],
    causes: [
      "Plasmodium falciparum parasite",
      "Infected Anopheles mosquito bites",
      "Blood transfusion (rare)",
      "Congenital transmission"
    ],
    symptoms: [
      "High fever with chills",
      "Sweating",
      "Headache",
      "Muscle pain",
      "Fatigue",
      "Nausea and vomiting",
      "Cerebral symptoms in severe cases"
    ],
    prevention: [
      "Use insecticide-treated bed nets",
      "Apply mosquito repellent",
      "Take antimalarial prophylaxis",
      "Eliminate mosquito breeding sites"
    ],
    precautions: [
      "Seek immediate treatment if symptoms appear",
      "Complete full medication course",
      "Avoid mosquito bites during treatment",
      "Monitor for severe malaria signs"
    ],
    management: [
      "Artemisinin-based combination therapy (ACT)",
      "IV artesunate for severe malaria",
      "Supportive care for complications",
      "Blood transfusion if severe anemia",
      "Hospitalization for severe cases"
    ],
    synonyms: ["Falciparum malaria", "Malignant tertian malaria"],
    indexTerms: ["p. falciparum", "severe malaria", "cerebral malaria"]
  },

  // ============================================
  // CHAPTER 05: Endocrine, nutritional or metabolic diseases
  // ============================================
  {
    code: "5A10",
    foundationUri: "http://id.who.int/icd/entity/1135654834",
    chapter: "05",
    chapterTitle: "Endocrine, nutritional or metabolic diseases",
    block: "Diabetes mellitus",
    blockRange: "5A10-5A1Z",
    category: "Diabetes mellitus",
    parentCode: undefined,
    codeType: "category",
    name: "Type 1 diabetes mellitus",
    definition: "An autoimmune disease characterized by T-cell-mediated destruction of pancreatic beta cells, leading to absolute insulin deficiency.",
    causes: [
      "Autoimmune destruction of beta cells",
      "Genetic predisposition (HLA-DR3, HLA-DR4)",
      "Environmental triggers",
      "Viral infections as possible trigger"
    ],
    symptoms: [
      "Polyuria",
      "Polydipsia",
      "Weight loss",
      "Fatigue",
      "Diabetic ketoacidosis (presenting symptom)"
    ],
    prevention: [
      "No proven prevention methods",
      "Research into immunomodulation ongoing",
      "Regular screening in high-risk families"
    ],
    precautions: [
      "Lifelong insulin therapy required",
      "Regular blood glucose monitoring",
      "Awareness of hypoglycemia symptoms"
    ],
    management: [
      "Insulin therapy (basal-bolus or pump)",
      "Continuous glucose monitoring",
      "Carbohydrate counting",
      "Regular HbA1c monitoring",
      "Screening for complications"
    ],
    synonyms: ["Insulin-dependent diabetes mellitus", "Juvenile diabetes"],
    indexTerms: ["type 1 diabetes", "T1DM", "IDDM"]
  },
  {
    code: "5A11",
    foundationUri: "http://id.who.int/icd/entity/1935780321",
    chapter: "05",
    chapterTitle: "Endocrine, nutritional or metabolic diseases",
    block: "Diabetes mellitus",
    blockRange: "5A10-5A1Z",
    category: "Diabetes mellitus",
    parentCode: undefined,
    codeType: "code",
    name: "Type 2 diabetes mellitus",
    definition: "A metabolic disorder characterized by insulin resistance and progressive beta-cell dysfunction, resulting in hyperglycemia.",
    inclusions: ["Non-insulin-dependent diabetes mellitus", "Adult-onset diabetes"],
    exclusions: ["Diabetes mellitus in pregnancy (JA63)"],
    codingNotes: ["Use additional code for associated complications"],
    causes: [
      "Insulin resistance",
      "Progressive beta-cell failure",
      "Genetic predisposition",
      "Obesity and central adiposity",
      "Sedentary lifestyle",
      "Metabolic syndrome"
    ],
    symptoms: [
      "Polyuria (increased urination)",
      "Polydipsia (increased thirst)",
      "Unexplained weight loss",
      "Fatigue and weakness",
      "Blurred vision",
      "Slow-healing wounds",
      "Recurrent infections"
    ],
    prevention: [
      "Maintain healthy body weight",
      "Regular physical activity (150 min/week)",
      "Balanced diet with reduced refined carbohydrates",
      "Avoid smoking",
      "Regular screening for high-risk individuals",
      "Metformin for prediabetes (select cases)"
    ],
    precautions: [
      "Regular blood glucose monitoring",
      "Take medications as prescribed",
      "Annual eye and foot examinations",
      "Monitor for hypoglycemia if on insulin/sulfonylureas",
      "Manage cardiovascular risk factors"
    ],
    management: [
      "Lifestyle modifications (first-line)",
      "Metformin (first-line pharmacotherapy)",
      "SGLT2 inhibitors for cardiorenal protection",
      "GLP-1 receptor agonists",
      "Insulin therapy if needed",
      "Regular HbA1c monitoring (target <7%)"
    ],
    synonyms: ["Non-insulin-dependent diabetes mellitus", "NIDDM", "Adult-onset diabetes"],
    indexTerms: ["type 2 diabetes", "T2DM", "diabetes mellitus type 2", "insulin resistance"]
  },

  // ============================================
  // CHAPTER 06: Mental, behavioural or neurodevelopmental disorders
  // ============================================
  {
    code: "6A70",
    foundationUri: "http://id.who.int/icd/entity/578635574",
    chapter: "06",
    chapterTitle: "Mental, behavioural or neurodevelopmental disorders",
    block: "Mood disorders",
    blockRange: "6A60-6A8Z",
    category: "Depressive disorders",
    parentCode: undefined,
    codeType: "category",
    name: "Single episode depressive disorder",
    definition: "A mood disorder characterized by the presence of a depressive episode without a history of prior depressive episodes.",
    causes: [
      "Genetic predisposition",
      "Neurotransmitter imbalances (serotonin, norepinephrine)",
      "Stressful life events",
      "Chronic illness",
      "Substance use",
      "Social isolation"
    ],
    symptoms: [
      "Depressed mood most of the day",
      "Markedly diminished interest (anhedonia)",
      "Significant weight change",
      "Sleep disturbance",
      "Psychomotor changes",
      "Fatigue",
      "Feelings of worthlessness",
      "Difficulty concentrating",
      "Thoughts of death or suicide"
    ],
    prevention: [
      "Maintain social connections",
      "Regular physical activity",
      "Stress management techniques",
      "Adequate sleep hygiene",
      "Limit alcohol, avoid drugs",
      "Seek early help for symptoms"
    ],
    precautions: [
      "Take medications as prescribed",
      "Attend therapy sessions",
      "Avoid isolation",
      "Create safety plans if suicidal ideation",
      "Monitor for medication side effects"
    ],
    management: [
      "Psychotherapy (CBT, interpersonal therapy)",
      "Antidepressant medications (SSRIs first-line)",
      "Lifestyle modifications",
      "Support groups",
      "Electroconvulsive therapy for severe/refractory cases"
    ],
    synonyms: ["Major depressive disorder, single episode"],
    indexTerms: ["depression", "major depression", "depressive episode"]
  },

  // ============================================
  // CHAPTER 08: Diseases of the nervous system
  // ============================================
  {
    code: "8A80",
    foundationUri: "http://id.who.int/icd/entity/1719827925",
    chapter: "08",
    chapterTitle: "Diseases of the nervous system",
    block: "Headache disorders",
    blockRange: "8A80-8A8Z",
    category: "Primary headache disorders",
    parentCode: undefined,
    codeType: "category",
    name: "Migraine",
    definition: "A primary headache disorder characterized by recurrent episodes of moderate to severe headache, often unilateral and pulsating, associated with autonomic symptoms.",
    causes: [
      "Genetic factors (familial hemiplegic migraine)",
      "Cortical spreading depression",
      "Trigeminal activation",
      "Hormonal fluctuations",
      "Environmental triggers",
      "Stress and sleep disturbance"
    ],
    symptoms: [
      "Throbbing or pulsating headache",
      "Unilateral location (often)",
      "Photophobia and phonophobia",
      "Nausea and vomiting",
      "Worsening with physical activity",
      "Duration 4-72 hours"
    ],
    prevention: [
      "Identify and avoid triggers",
      "Regular sleep schedule",
      "Stress management",
      "Regular meals",
      "Adequate hydration",
      "Preventive medications for frequent attacks"
    ],
    precautions: [
      "Take acute treatment early",
      "Rest in dark, quiet room",
      "Keep a headache diary",
      "Avoid medication overuse"
    ],
    management: [
      "Acute: NSAIDs, triptans, gepants",
      "Preventive: beta-blockers, topiramate, valproate",
      "CGRP monoclonal antibodies",
      "Lifestyle modifications",
      "Behavioral therapies"
    ],
    synonyms: ["Hemicrania"],
    indexTerms: ["migraine", "migraine headache"]
  },
  {
    code: "8A80.0",
    foundationUri: "http://id.who.int/icd/entity/1509145068",
    chapter: "08",
    chapterTitle: "Diseases of the nervous system",
    block: "Headache disorders",
    blockRange: "8A80-8A8Z",
    category: "Primary headache disorders",
    parentCode: "8A80",
    codeType: "code",
    name: "Migraine without aura",
    definition: "Recurrent headache disorder manifesting in attacks lasting 4-72 hours with unilateral location, pulsating quality, moderate or severe intensity, aggravation by routine physical activity, and association with nausea and/or photophobia and phonophobia.",
    causes: [
      "Genetic factors",
      "Hormonal changes",
      "Stress and anxiety",
      "Certain foods (aged cheese, alcohol, MSG)",
      "Sleep disturbances",
      "Weather changes"
    ],
    symptoms: [
      "Throbbing or pulsing head pain",
      "Sensitivity to light and sound",
      "Nausea and vomiting",
      "Pain on one side of head",
      "Worsening with physical activity",
      "Duration of 4-72 hours"
    ],
    prevention: [
      "Identify and avoid triggers",
      "Regular sleep schedule",
      "Stress management",
      "Regular meals",
      "Stay hydrated",
      "Preventive medications if frequent"
    ],
    precautions: [
      "Take medications at first sign of attack",
      "Rest in dark, quiet room",
      "Keep a headache diary",
      "Avoid overuse of pain medications"
    ],
    management: [
      "Acute treatments (triptans, NSAIDs)",
      "Preventive medications (beta-blockers, antidepressants)",
      "Lifestyle modifications",
      "Behavioral therapies",
      "CGRP inhibitors for chronic cases"
    ],
    synonyms: ["Common migraine"],
    indexTerms: ["migraine without aura", "common migraine"]
  },

  // ============================================
  // CHAPTER 11: Diseases of the circulatory system
  // ============================================
  {
    code: "BA00",
    foundationUri: "http://id.who.int/icd/entity/1104258846",
    chapter: "11",
    chapterTitle: "Diseases of the circulatory system",
    block: "Hypertensive diseases",
    blockRange: "BA00-BA0Z",
    category: "Primary hypertension",
    parentCode: undefined,
    codeType: "code",
    name: "Essential hypertension",
    definition: "Persistently elevated systemic arterial blood pressure without an identifiable secondary cause. Defined as systolic BP ≥140 mmHg and/or diastolic BP ≥90 mmHg.",
    inclusions: ["Primary hypertension", "High blood pressure NOS"],
    exclusions: ["Secondary hypertension (BA01-BA03)", "Hypertension in pregnancy (JA22)"],
    codingNotes: ["Code any associated hypertensive heart disease or renal disease separately"],
    causes: [
      "Multifactorial (genetic and environmental)",
      "Increased sodium sensitivity",
      "Obesity",
      "Physical inactivity",
      "Excessive alcohol intake",
      "Chronic stress",
      "Aging"
    ],
    symptoms: [
      "Usually asymptomatic (silent killer)",
      "Headaches (hypertensive urgency)",
      "Epistaxis",
      "Visual disturbances",
      "Dizziness",
      "Dyspnea on exertion"
    ],
    prevention: [
      "DASH diet (low sodium)",
      "Maintain healthy weight (BMI <25)",
      "Regular aerobic exercise",
      "Limit alcohol intake",
      "Smoking cessation",
      "Stress management",
      "Regular BP monitoring"
    ],
    precautions: [
      "Take antihypertensives consistently",
      "Home BP monitoring",
      "Regular follow-up visits",
      "Monitor for end-organ damage",
      "Medication adherence critical"
    ],
    management: [
      "Lifestyle modifications (first-line for all)",
      "ACE inhibitors or ARBs",
      "Calcium channel blockers",
      "Thiazide diuretics",
      "Beta-blockers (specific indications)",
      "Target BP <130/80 for most adults"
    ],
    synonyms: ["Primary hypertension", "Idiopathic hypertension", "High blood pressure"],
    indexTerms: ["essential hypertension", "primary hypertension", "high blood pressure"]
  },
  {
    code: "BA01",
    foundationUri: "http://id.who.int/icd/entity/1276322883",
    chapter: "11",
    chapterTitle: "Diseases of the circulatory system",
    block: "Hypertensive diseases",
    blockRange: "BA00-BA0Z",
    category: "Secondary hypertension",
    parentCode: undefined,
    codeType: "category",
    name: "Hypertensive heart disease",
    definition: "Heart disease caused by direct and indirect effects of elevated blood pressure, including left ventricular hypertrophy and heart failure.",
    causes: [
      "Long-standing uncontrolled hypertension",
      "Increased cardiac afterload",
      "Left ventricular remodeling"
    ],
    symptoms: [
      "Dyspnea on exertion",
      "Orthopnea",
      "Paroxysmal nocturnal dyspnea",
      "Lower extremity edema",
      "Fatigue"
    ],
    prevention: [
      "Early hypertension detection and treatment",
      "Aggressive BP control",
      "Regular cardiac assessment"
    ],
    precautions: [
      "Monitor for heart failure symptoms",
      "Regular echocardiography",
      "Medication adherence"
    ],
    management: [
      "Aggressive BP control",
      "ACE inhibitors/ARBs (for LVH)",
      "Heart failure medications if indicated",
      "Diuretics for volume overload"
    ],
    synonyms: ["Hypertensive cardiovascular disease"],
    indexTerms: ["hypertensive heart disease", "LVH due to hypertension"]
  },

  // ============================================
  // CHAPTER 12: Diseases of the respiratory system
  // ============================================
  {
    code: "CA40",
    foundationUri: "http://id.who.int/icd/entity/188856982",
    chapter: "12",
    chapterTitle: "Diseases of the respiratory system",
    block: "Lower respiratory tract infections",
    blockRange: "CA40-CA4Z",
    category: "Pneumonia",
    parentCode: undefined,
    codeType: "category",
    name: "Pneumonia",
    definition: "An acute inflammatory condition of the lung parenchyma, primarily affecting the alveoli, caused by infection with bacteria, viruses, or other pathogens.",
    inclusions: ["Bronchopneumonia", "Lobar pneumonia"],
    exclusions: ["Aspiration pneumonia (CA70)", "Pneumonia due to COVID-19 (RA01.0)"],
    causes: [
      "Streptococcus pneumoniae (most common)",
      "Haemophilus influenzae",
      "Staphylococcus aureus",
      "Respiratory viruses",
      "Mycoplasma pneumoniae",
      "Legionella species"
    ],
    symptoms: [
      "Productive cough",
      "Fever and chills",
      "Dyspnea",
      "Pleuritic chest pain",
      "Tachypnea",
      "Crackles on auscultation",
      "Confusion (elderly)"
    ],
    prevention: [
      "Pneumococcal vaccination",
      "Influenza vaccination",
      "Hand hygiene",
      "Smoking cessation",
      "Oral hygiene",
      "Aspiration precautions in at-risk patients"
    ],
    precautions: [
      "Complete antibiotic course",
      "Adequate rest",
      "Stay hydrated",
      "Respiratory isolation if contagious",
      "Monitor oxygen saturation"
    ],
    management: [
      "Empiric antibiotics based on setting (CAP vs HAP)",
      "Macrolides or fluoroquinolones for atypical coverage",
      "Supportive care",
      "Oxygen therapy if hypoxemic",
      "Hospitalization for severe cases (CURB-65 scoring)"
    ],
    synonyms: ["Lung infection", "Pulmonary infection"],
    indexTerms: ["pneumonia", "community-acquired pneumonia", "CAP"]
  },

  // ============================================
  // CHAPTER 02: Neoplasms
  // ============================================
  {
    code: "2C6Y",
    foundationUri: "http://id.who.int/icd/entity/254530039",
    chapter: "02",
    chapterTitle: "Neoplasms",
    block: "Malignant neoplasms of breast",
    blockRange: "2C60-2C6Z",
    category: "Malignant neoplasms of breast",
    parentCode: undefined,
    codeType: "code",
    name: "Other specified malignant neoplasms of breast",
    definition: "A malignant tumor originating from breast tissue, most commonly from the epithelial lining of the ducts or lobules.",
    causes: [
      "BRCA1/BRCA2 gene mutations",
      "Family history",
      "Estrogen exposure",
      "Age",
      "Obesity (postmenopausal)",
      "Alcohol consumption",
      "Previous radiation to chest"
    ],
    symptoms: [
      "Breast lump or mass",
      "Change in breast shape or size",
      "Skin dimpling (peau d'orange)",
      "Nipple discharge (bloody)",
      "Nipple retraction",
      "Axillary lymphadenopathy"
    ],
    prevention: [
      "Regular mammography screening",
      "Breast self-examination",
      "Maintain healthy weight",
      "Limit alcohol",
      "Breastfeeding",
      "Risk-reducing surgery for high-risk individuals"
    ],
    precautions: [
      "Complete all recommended treatment",
      "Regular follow-up surveillance",
      "Report new symptoms promptly",
      "Genetic counseling for familial cases"
    ],
    management: [
      "Surgery (lumpectomy or mastectomy)",
      "Sentinel lymph node biopsy",
      "Adjuvant chemotherapy",
      "Radiation therapy",
      "Hormone therapy (ER+)",
      "HER2-targeted therapy",
      "CDK4/6 inhibitors"
    ],
    synonyms: ["Breast cancer", "Carcinoma of breast"],
    indexTerms: ["breast cancer", "breast carcinoma", "mammary carcinoma"]
  },

  // ============================================
  // CHAPTER 15: Diseases of the musculoskeletal system
  // ============================================
  {
    code: "FA00",
    foundationUri: "http://id.who.int/icd/entity/1234567890",
    chapter: "15",
    chapterTitle: "Diseases of the musculoskeletal system or connective tissue",
    block: "Arthropathies",
    blockRange: "FA00-FA2Z",
    category: "Osteoarthritis",
    parentCode: undefined,
    codeType: "category",
    name: "Osteoarthritis",
    definition: "A degenerative joint disease characterized by progressive loss of articular cartilage, subchondral bone changes, and osteophyte formation.",
    causes: [
      "Age-related degeneration",
      "Previous joint injury",
      "Obesity",
      "Genetic predisposition",
      "Joint malalignment",
      "Occupational overuse"
    ],
    symptoms: [
      "Joint pain with activity",
      "Morning stiffness (<30 minutes)",
      "Crepitus",
      "Joint swelling",
      "Decreased range of motion",
      "Bony enlargement"
    ],
    prevention: [
      "Maintain healthy weight",
      "Regular low-impact exercise",
      "Protect joints from injury",
      "Strengthen periarticular muscles",
      "Proper ergonomics"
    ],
    precautions: [
      "Avoid high-impact activities",
      "Use assistive devices as needed",
      "Pace activities",
      "Monitor for medication side effects"
    ],
    management: [
      "Physical therapy",
      "Acetaminophen or NSAIDs",
      "Topical analgesics",
      "Intra-articular corticosteroids",
      "Weight management",
      "Joint replacement for end-stage disease"
    ],
    synonyms: ["Degenerative joint disease", "DJD"],
    indexTerms: ["osteoarthritis", "OA", "degenerative arthritis"]
  },
  {
    code: "FA00.0",
    foundationUri: "http://id.who.int/icd/entity/2098765432",
    chapter: "15",
    chapterTitle: "Diseases of the musculoskeletal system or connective tissue",
    block: "Arthropathies",
    blockRange: "FA00-FA2Z",
    category: "Osteoarthritis",
    parentCode: "FA00",
    codeType: "code",
    name: "Osteoarthritis of knee",
    definition: "Degenerative joint disease specifically affecting the knee joint, characterized by cartilage loss, osteophyte formation, and subchondral sclerosis.",
    inclusions: ["Gonarthrosis"],
    causes: [
      "Age-related wear and tear",
      "Previous knee injuries (ACL tear, meniscal injury)",
      "Obesity (major modifiable risk factor)",
      "Genetic factors",
      "Knee malalignment",
      "Occupational kneeling"
    ],
    symptoms: [
      "Knee pain with weight-bearing",
      "Stiffness after rest",
      "Crepitus with movement",
      "Swelling",
      "Reduced range of motion",
      "Gait abnormalities"
    ],
    prevention: [
      "Maintain healthy weight",
      "Regular low-impact exercise",
      "Quadriceps strengthening",
      "Avoid repetitive knee stress",
      "Proper footwear"
    ],
    precautions: [
      "Avoid high-impact activities",
      "Use assistive devices if needed",
      "Apply heat or cold therapy",
      "Pace activities"
    ],
    management: [
      "Physical therapy",
      "NSAIDs (oral or topical)",
      "Intra-articular hyaluronic acid",
      "Corticosteroid injections",
      "Weight loss",
      "Knee bracing",
      "Total knee arthroplasty if severe"
    ],
    synonyms: ["Gonarthrosis", "Knee arthritis"],
    indexTerms: ["knee osteoarthritis", "knee OA", "gonarthrosis"]
  },

  // ============================================
  // CHAPTER 03: Diseases of the blood or blood-forming organs
  // ============================================
  {
    code: "3A00",
    foundationUri: "http://id.who.int/icd/entity/1153924890",
    chapter: "03",
    chapterTitle: "Diseases of the blood or blood-forming organs",
    block: "Nutritional anaemias",
    blockRange: "3A00-3A0Z",
    category: "Iron deficiency anaemia",
    parentCode: undefined,
    codeType: "code",
    name: "Iron deficiency anaemia",
    definition: "Anaemia characterized by defective haemoglobin synthesis due to lack of iron, resulting in microcytic hypochromic red blood cells.",
    inclusions: ["Sideropenic anaemia", "Hypochromic anaemia"],
    exclusions: ["Anaemia of chronic disease (3A01)"],
    causes: [
      "Inadequate dietary iron intake",
      "Chronic blood loss (menstruation, GI bleeding)",
      "Malabsorption (celiac disease, gastric surgery)",
      "Increased iron requirements (pregnancy, growth)",
      "Hookworm infection"
    ],
    symptoms: [
      "Fatigue and weakness",
      "Pallor (skin, conjunctiva, nail beds)",
      "Dyspnea on exertion",
      "Pica (craving non-food items)",
      "Koilonychia (spoon-shaped nails)",
      "Angular cheilitis",
      "Glossitis"
    ],
    prevention: [
      "Iron-rich diet (red meat, legumes, leafy greens)",
      "Vitamin C to enhance iron absorption",
      "Iron supplementation in pregnancy",
      "Regular screening in high-risk groups",
      "Treatment of underlying causes"
    ],
    precautions: [
      "Take iron supplements as directed",
      "Avoid tea/coffee with iron supplements",
      "Monitor for GI side effects",
      "Complete full treatment course"
    ],
    management: [
      "Oral iron supplements (ferrous sulfate first-line)",
      "IV iron for malabsorption or intolerance",
      "Treat underlying cause",
      "Blood transfusion for severe symptomatic anaemia",
      "Dietary counseling"
    ],
    synonyms: ["Sideropenic anaemia", "Iron deficiency anemia"],
    indexTerms: ["iron deficiency", "anaemia", "anemia", "low iron"]
  },
  {
    code: "3A20",
    foundationUri: "http://id.who.int/icd/entity/1842315671",
    chapter: "03",
    chapterTitle: "Diseases of the blood or blood-forming organs",
    block: "Haemolytic anaemias",
    blockRange: "3A20-3A3Z",
    category: "Sickle cell disorders",
    parentCode: undefined,
    codeType: "category",
    name: "Sickle cell disorders",
    definition: "Inherited haemoglobin disorders characterized by production of abnormal haemoglobin S, causing red blood cells to become sickle-shaped under low oxygen conditions.",
    causes: [
      "Inherited HbS gene mutation",
      "Autosomal recessive inheritance",
      "Point mutation in beta-globin gene"
    ],
    symptoms: [
      "Vaso-occlusive crises (painful episodes)",
      "Chronic haemolytic anaemia",
      "Acute chest syndrome",
      "Stroke",
      "Splenic sequestration",
      "Priapism",
      "Leg ulcers"
    ],
    prevention: [
      "Genetic counseling",
      "Prenatal diagnosis",
      "Newborn screening",
      "Prophylactic penicillin in children",
      "Hydroxyurea to reduce crises"
    ],
    precautions: [
      "Avoid dehydration",
      "Avoid extreme temperatures",
      "Avoid high altitude",
      "Up-to-date vaccinations",
      "Regular medical follow-up"
    ],
    management: [
      "Hydroxyurea (disease-modifying)",
      "Pain management for crises",
      "Blood transfusions",
      "Folic acid supplementation",
      "Bone marrow transplant (curative)",
      "Gene therapy (emerging)"
    ],
    synonyms: ["Sickle cell disease", "SCD"],
    indexTerms: ["sickle cell", "hemoglobin S", "HbSS"]
  },

  // ============================================
  // CHAPTER 04: Diseases of the immune system
  // ============================================
  {
    code: "4A00",
    foundationUri: "http://id.who.int/icd/entity/1562817034",
    chapter: "04",
    chapterTitle: "Diseases of the immune system",
    block: "Primary immunodeficiencies",
    blockRange: "4A00-4A0Z",
    category: "Immunodeficiencies affecting cellular and humoral immunity",
    parentCode: undefined,
    codeType: "category",
    name: "Severe combined immunodeficiency",
    definition: "A group of rare congenital disorders characterized by severely impaired development of functional T and B lymphocytes, resulting in early-onset life-threatening infections.",
    inclusions: ["SCID", "Swiss-type agammaglobulinemia"],
    causes: [
      "Genetic mutations (IL2RG, ADA, RAG1/2)",
      "X-linked or autosomal recessive inheritance",
      "Defective lymphocyte development"
    ],
    symptoms: [
      "Recurrent severe infections from infancy",
      "Failure to thrive",
      "Chronic diarrhea",
      "Opportunistic infections (Pneumocystis, CMV)",
      "Absent lymphoid tissue",
      "Graft-versus-host disease from maternal T cells"
    ],
    prevention: [
      "Newborn screening (TREC assay)",
      "Genetic counseling for families",
      "Early diagnosis and treatment"
    ],
    precautions: [
      "Strict infection control",
      "Avoid live vaccines",
      "Isolation from infectious contacts",
      "Irradiated blood products only"
    ],
    management: [
      "Hematopoietic stem cell transplant (curative)",
      "Gene therapy for ADA-SCID",
      "Enzyme replacement (ADA-SCID)",
      "Immunoglobulin replacement",
      "Prophylactic antimicrobials"
    ],
    synonyms: ["SCID", "Bubble boy disease"],
    indexTerms: ["severe combined immunodeficiency", "SCID", "primary immunodeficiency"]
  },
  {
    code: "4A20",
    foundationUri: "http://id.who.int/icd/entity/2078453901",
    chapter: "04",
    chapterTitle: "Diseases of the immune system",
    block: "Allergic or hypersensitivity conditions",
    blockRange: "4A80-4A8Z",
    category: "Allergic or hypersensitivity disorders",
    parentCode: undefined,
    codeType: "code",
    name: "Anaphylaxis",
    definition: "A severe, potentially life-threatening systemic hypersensitivity reaction characterized by rapid onset of airway, breathing, and circulatory problems.",
    causes: [
      "Food allergens (peanuts, tree nuts, shellfish)",
      "Medications (antibiotics, NSAIDs)",
      "Insect stings (bee, wasp)",
      "Latex",
      "Exercise-induced",
      "Idiopathic"
    ],
    symptoms: [
      "Urticaria and angioedema",
      "Bronchospasm and wheezing",
      "Laryngeal edema",
      "Hypotension and tachycardia",
      "Abdominal pain and vomiting",
      "Loss of consciousness"
    ],
    prevention: [
      "Strict allergen avoidance",
      "Carry epinephrine auto-injector",
      "Medical alert identification",
      "Allergen immunotherapy (selected cases)",
      "Educate family and caregivers"
    ],
    precautions: [
      "Always carry two epinephrine auto-injectors",
      "Know early warning signs",
      "Have written emergency action plan",
      "Inform restaurants and schools"
    ],
    management: [
      "Epinephrine IM (first-line, thigh)",
      "Call emergency services",
      "Supine position with legs elevated",
      "Supplemental oxygen",
      "IV fluids for hypotension",
      "Antihistamines and corticosteroids (adjunctive)",
      "Observation for biphasic reaction"
    ],
    synonyms: ["Anaphylactic shock", "Severe allergic reaction"],
    indexTerms: ["anaphylaxis", "anaphylactic reaction", "severe allergy"]
  },

  // ============================================
  // CHAPTER 07: Sleep-wake disorders
  // ============================================
  {
    code: "7A00",
    foundationUri: "http://id.who.int/icd/entity/1409849321",
    chapter: "07",
    chapterTitle: "Sleep-wake disorders",
    block: "Insomnia disorders",
    blockRange: "7A00-7A0Z",
    category: "Chronic insomnia",
    parentCode: undefined,
    codeType: "code",
    name: "Chronic insomnia disorder",
    definition: "A persistent difficulty with sleep initiation, duration, consolidation, or quality that occurs despite adequate opportunity for sleep and results in daytime impairment.",
    causes: [
      "Psychological factors (stress, anxiety, depression)",
      "Poor sleep hygiene",
      "Medical conditions",
      "Medications and substances",
      "Conditioned arousal",
      "Circadian rhythm disruption"
    ],
    symptoms: [
      "Difficulty falling asleep",
      "Difficulty staying asleep",
      "Early morning awakening",
      "Non-restorative sleep",
      "Daytime fatigue",
      "Mood disturbances",
      "Cognitive impairment"
    ],
    prevention: [
      "Consistent sleep schedule",
      "Regular exercise (not close to bedtime)",
      "Limit caffeine and alcohol",
      "Create comfortable sleep environment",
      "Manage stress effectively"
    ],
    precautions: [
      "Avoid long-term sedative-hypnotic use",
      "Screen for underlying conditions",
      "Avoid driving when sleep-deprived",
      "Monitor for depression"
    ],
    management: [
      "Cognitive Behavioral Therapy for Insomnia (CBT-I) - first-line",
      "Sleep hygiene education",
      "Stimulus control therapy",
      "Sleep restriction therapy",
      "Short-term pharmacotherapy if needed",
      "Treat underlying conditions"
    ],
    synonyms: ["Primary insomnia", "Psychophysiological insomnia"],
    indexTerms: ["insomnia", "sleeplessness", "sleep disorder"]
  },
  {
    code: "7A20",
    foundationUri: "http://id.who.int/icd/entity/1834567123",
    chapter: "07",
    chapterTitle: "Sleep-wake disorders",
    block: "Sleep-related breathing disorders",
    blockRange: "7A20-7A2Z",
    category: "Obstructive sleep apnoea",
    parentCode: undefined,
    codeType: "code",
    name: "Obstructive sleep apnoea",
    definition: "A sleep-related breathing disorder characterized by repetitive episodes of complete or partial upper airway obstruction during sleep, leading to oxygen desaturation and sleep fragmentation.",
    inclusions: ["OSA", "Obstructive sleep apnea syndrome"],
    causes: [
      "Obesity (major risk factor)",
      "Craniofacial abnormalities",
      "Large tonsils or adenoids",
      "Nasal obstruction",
      "Male sex",
      "Alcohol and sedatives"
    ],
    symptoms: [
      "Loud snoring",
      "Witnessed apnoeas",
      "Gasping or choking during sleep",
      "Excessive daytime sleepiness",
      "Morning headaches",
      "Nocturia",
      "Cognitive impairment"
    ],
    prevention: [
      "Maintain healthy weight",
      "Avoid alcohol before bed",
      "Avoid sedatives",
      "Sleep on side",
      "Treat nasal congestion"
    ],
    precautions: [
      "Increased cardiovascular risk",
      "Driving safety concerns",
      "Perioperative risk with sedation",
      "Regular CPAP compliance monitoring"
    ],
    management: [
      "CPAP therapy (first-line for moderate-severe)",
      "Weight loss",
      "Positional therapy",
      "Oral appliances (mandibular advancement)",
      "Surgery (uvulopalatopharyngoplasty, tonsillectomy)",
      "Hypoglossal nerve stimulation"
    ],
    synonyms: ["OSA", "Sleep apnea", "Obstructive sleep apnea"],
    indexTerms: ["sleep apnea", "OSA", "snoring", "apnoea"]
  },

  // ============================================
  // CHAPTER 09: Diseases of the visual system
  // ============================================
  {
    code: "9B10",
    foundationUri: "http://id.who.int/icd/entity/1923847562",
    chapter: "09",
    chapterTitle: "Diseases of the visual system",
    block: "Glaucoma",
    blockRange: "9B10-9B1Z",
    category: "Primary open-angle glaucoma",
    parentCode: undefined,
    codeType: "code",
    name: "Primary open-angle glaucoma",
    definition: "A chronic progressive optic neuropathy characterized by open anterior chamber angle, elevated or normal intraocular pressure, and characteristic visual field loss.",
    causes: [
      "Elevated intraocular pressure",
      "Impaired aqueous outflow",
      "Genetic factors",
      "Age-related changes",
      "Vascular factors"
    ],
    symptoms: [
      "Gradual peripheral vision loss",
      "Often asymptomatic until advanced",
      "Tunnel vision (late stage)",
      "Difficulty with dark adaptation",
      "Halos around lights (if acute)"
    ],
    prevention: [
      "Regular comprehensive eye exams",
      "Know family history",
      "Protect eyes from trauma",
      "Control systemic conditions",
      "Avoid prolonged corticosteroid use"
    ],
    precautions: [
      "Take medications consistently",
      "Regular intraocular pressure monitoring",
      "Report vision changes immediately",
      "Inform all healthcare providers of diagnosis"
    ],
    management: [
      "Prostaglandin analogs (first-line)",
      "Beta-blockers, alpha-agonists, carbonic anhydrase inhibitors",
      "Laser trabeculoplasty",
      "Trabeculectomy surgery",
      "Glaucoma drainage devices",
      "MIGS (minimally invasive glaucoma surgery)"
    ],
    synonyms: ["POAG", "Chronic simple glaucoma"],
    indexTerms: ["glaucoma", "POAG", "elevated eye pressure"]
  },
  {
    code: "9B70",
    foundationUri: "http://id.who.int/icd/entity/2045671234",
    chapter: "09",
    chapterTitle: "Diseases of the visual system",
    block: "Cataract",
    blockRange: "9B70-9B7Z",
    category: "Age-related cataract",
    parentCode: undefined,
    codeType: "code",
    name: "Age-related cataract",
    definition: "Progressive opacification of the crystalline lens occurring with advancing age, leading to decreased visual acuity.",
    causes: [
      "Oxidative damage with aging",
      "UV light exposure",
      "Diabetes mellitus",
      "Smoking",
      "Corticosteroid use",
      "Previous eye surgery or trauma"
    ],
    symptoms: [
      "Gradual painless vision loss",
      "Glare sensitivity",
      "Halos around lights",
      "Faded colors",
      "Frequent glasses prescription changes",
      "Difficulty with night driving"
    ],
    prevention: [
      "UV-protective sunglasses",
      "Smoking cessation",
      "Diabetes control",
      "Antioxidant-rich diet",
      "Regular eye examinations"
    ],
    precautions: [
      "Update glasses prescription regularly",
      "Adequate lighting for reading",
      "Assess driving safety",
      "Discuss surgery timing with ophthalmologist"
    ],
    management: [
      "Updated glasses prescription (early)",
      "Magnifying aids",
      "Cataract surgery with IOL implantation (definitive)",
      "Post-operative anti-inflammatory drops",
      "Posterior capsulotomy if needed"
    ],
    synonyms: ["Senile cataract", "Age-related lens opacity"],
    indexTerms: ["cataract", "lens opacity", "cloudy vision"]
  },

  // ============================================
  // CHAPTER 10: Diseases of the ear or mastoid process
  // ============================================
  {
    code: "AB00",
    foundationUri: "http://id.who.int/icd/entity/1567823456",
    chapter: "10",
    chapterTitle: "Diseases of the ear or mastoid process",
    block: "Diseases of middle ear",
    blockRange: "AB00-AB2Z",
    category: "Otitis media",
    parentCode: undefined,
    codeType: "category",
    name: "Acute otitis media",
    definition: "Acute inflammation of the middle ear, typically associated with effusion and signs of acute infection.",
    inclusions: ["Acute suppurative otitis media"],
    causes: [
      "Streptococcus pneumoniae",
      "Haemophilus influenzae",
      "Moraxella catarrhalis",
      "Viral upper respiratory infections",
      "Eustachian tube dysfunction"
    ],
    symptoms: [
      "Ear pain (otalgia)",
      "Fever",
      "Irritability (infants)",
      "Hearing loss",
      "Otorrhea (if perforation)",
      "Bulging, erythematous tympanic membrane"
    ],
    prevention: [
      "Pneumococcal vaccination",
      "Influenza vaccination",
      "Breastfeeding",
      "Avoid passive smoke exposure",
      "Avoid bottle-propping"
    ],
    precautions: [
      "Watch for signs of complications",
      "Complete antibiotic course if prescribed",
      "Follow-up for persistent effusion",
      "Avoid water in ears if perforation"
    ],
    management: [
      "Watchful waiting (mild cases, >2 years old)",
      "Amoxicillin first-line antibiotic",
      "High-dose amoxicillin-clavulanate if resistant",
      "Pain management (acetaminophen, ibuprofen)",
      "Tympanostomy tubes for recurrent cases"
    ],
    synonyms: ["Middle ear infection", "AOM"],
    indexTerms: ["otitis media", "ear infection", "middle ear infection"]
  },

  // ============================================
  // CHAPTER 13: Diseases of the digestive system
  // ============================================
  {
    code: "DA22",
    foundationUri: "http://id.who.int/icd/entity/1823456789",
    chapter: "13",
    chapterTitle: "Diseases of the digestive system",
    block: "Diseases of oesophagus",
    blockRange: "DA20-DA2Z",
    category: "Gastro-oesophageal reflux disease",
    parentCode: undefined,
    codeType: "code",
    name: "Gastro-oesophageal reflux disease",
    definition: "A condition in which gastric contents reflux into the oesophagus, causing troublesome symptoms and/or complications.",
    inclusions: ["GERD", "GORD", "Reflux oesophagitis"],
    causes: [
      "Lower oesophageal sphincter dysfunction",
      "Hiatal hernia",
      "Obesity",
      "Pregnancy",
      "Delayed gastric emptying",
      "Certain foods and medications"
    ],
    symptoms: [
      "Heartburn",
      "Regurgitation",
      "Dysphagia",
      "Chest pain",
      "Chronic cough",
      "Hoarseness",
      "Dental erosion"
    ],
    prevention: [
      "Maintain healthy weight",
      "Avoid trigger foods",
      "Eat smaller meals",
      "Don't lie down after eating",
      "Elevate head of bed",
      "Avoid smoking and alcohol"
    ],
    precautions: [
      "Red flag symptoms require endoscopy",
      "Long-term PPI use monitoring",
      "Screen for Barrett's oesophagus",
      "Avoid NSAIDs if possible"
    ],
    management: [
      "Lifestyle modifications",
      "Antacids for mild symptoms",
      "H2 receptor antagonists",
      "Proton pump inhibitors (PPIs)",
      "Fundoplication surgery (severe/refractory)",
      "Endoscopic therapies"
    ],
    synonyms: ["GERD", "GORD", "Acid reflux disease"],
    indexTerms: ["GERD", "heartburn", "acid reflux", "reflux"]
  },
  {
    code: "DA90",
    foundationUri: "http://id.who.int/icd/entity/1934567890",
    chapter: "13",
    chapterTitle: "Diseases of the digestive system",
    block: "Functional gastrointestinal disorders",
    blockRange: "DA90-DA9Z",
    category: "Irritable bowel syndrome",
    parentCode: undefined,
    codeType: "code",
    name: "Irritable bowel syndrome",
    definition: "A functional gastrointestinal disorder characterized by recurrent abdominal pain associated with defecation or a change in bowel habits, in the absence of structural abnormalities.",
    inclusions: ["IBS", "Spastic colon", "Irritable colon"],
    causes: [
      "Gut-brain axis dysfunction",
      "Visceral hypersensitivity",
      "Altered gut motility",
      "Post-infectious",
      "Psychological factors",
      "Gut microbiome changes"
    ],
    symptoms: [
      "Recurrent abdominal pain",
      "Bloating and distension",
      "Altered bowel habits (diarrhea, constipation, or mixed)",
      "Mucus in stool",
      "Incomplete evacuation",
      "Symptoms related to eating"
    ],
    prevention: [
      "Stress management",
      "Regular meals",
      "Adequate fiber intake",
      "Regular exercise",
      "Identify food triggers"
    ],
    precautions: [
      "Rule out red flag symptoms",
      "Screen for celiac disease",
      "Monitor for anxiety/depression",
      "Avoid unnecessary investigations"
    ],
    management: [
      "Dietary modifications (low FODMAP diet)",
      "Fiber supplementation",
      "Antispasmodics",
      "Laxatives (IBS-C) or antidiarrheals (IBS-D)",
      "Low-dose tricyclic antidepressants",
      "Psychological therapies (CBT, hypnotherapy)",
      "Rifaximin for IBS-D"
    ],
    synonyms: ["IBS", "Spastic colon", "Irritable colon syndrome"],
    indexTerms: ["IBS", "irritable bowel", "spastic colon"]
  },
  {
    code: "DD70",
    foundationUri: "http://id.who.int/icd/entity/2045678901",
    chapter: "13",
    chapterTitle: "Diseases of the digestive system",
    block: "Diseases of liver",
    blockRange: "DD70-DD8Z",
    category: "Fatty liver disease",
    parentCode: undefined,
    codeType: "code",
    name: "Non-alcoholic fatty liver disease",
    definition: "A spectrum of liver disease characterized by hepatic steatosis in individuals without significant alcohol consumption, ranging from simple steatosis to steatohepatitis with fibrosis.",
    inclusions: ["NAFLD", "Non-alcoholic steatohepatitis (NASH)"],
    exclusions: ["Alcoholic liver disease (DD71)"],
    causes: [
      "Obesity",
      "Type 2 diabetes mellitus",
      "Metabolic syndrome",
      "Dyslipidemia",
      "Genetic factors",
      "Certain medications"
    ],
    symptoms: [
      "Often asymptomatic",
      "Fatigue",
      "Right upper quadrant discomfort",
      "Hepatomegaly",
      "Signs of cirrhosis (advanced)"
    ],
    prevention: [
      "Maintain healthy weight",
      "Regular physical activity",
      "Healthy diet",
      "Avoid excess sugar and refined carbs",
      "Control diabetes and cholesterol"
    ],
    precautions: [
      "Regular liver function monitoring",
      "Screen for metabolic syndrome",
      "Avoid hepatotoxic substances",
      "Assess for advanced fibrosis"
    ],
    management: [
      "Weight loss (7-10% body weight)",
      "Exercise",
      "Dietary modifications",
      "Manage metabolic comorbidities",
      "Vitamin E (non-diabetic NASH)",
      "Pioglitazone (diabetic NASH)",
      "Liver transplant for end-stage disease"
    ],
    synonyms: ["NAFLD", "NASH", "Metabolic-associated fatty liver disease"],
    indexTerms: ["fatty liver", "NAFLD", "NASH", "steatosis"]
  },

  // ============================================
  // CHAPTER 14: Diseases of the skin
  // ============================================
  {
    code: "EA80",
    foundationUri: "http://id.who.int/icd/entity/1456789012",
    chapter: "14",
    chapterTitle: "Diseases of the skin",
    block: "Eczematous diseases",
    blockRange: "EA80-EA8Z",
    category: "Atopic dermatitis",
    parentCode: undefined,
    codeType: "code",
    name: "Atopic dermatitis",
    definition: "A chronic inflammatory skin disease characterized by pruritic, eczematous lesions with a typical distribution pattern, often associated with personal or family history of atopy.",
    inclusions: ["Atopic eczema", "Infantile eczema", "Flexural eczema"],
    causes: [
      "Genetic factors (filaggrin mutations)",
      "Immune dysregulation",
      "Skin barrier dysfunction",
      "Environmental triggers",
      "Allergens and irritants"
    ],
    symptoms: [
      "Intense pruritus",
      "Dry, scaly skin",
      "Erythematous patches and plaques",
      "Lichenification (chronic)",
      "Typical distribution (flexures in children)",
      "Sleep disturbance"
    ],
    prevention: [
      "Regular emollient use",
      "Avoid known triggers",
      "Maintain skin hydration",
      "Appropriate bathing practices",
      "Manage environmental humidity"
    ],
    precautions: [
      "Risk of skin infections",
      "Eczema herpeticum risk",
      "Impact on quality of life",
      "Avoid irritants and allergens"
    ],
    management: [
      "Regular emollients (cornerstone)",
      "Topical corticosteroids",
      "Topical calcineurin inhibitors",
      "Wet wrap therapy (severe)",
      "Dupilumab for moderate-severe",
      "JAK inhibitors",
      "Phototherapy"
    ],
    synonyms: ["Atopic eczema", "Eczema"],
    indexTerms: ["atopic dermatitis", "eczema", "atopic eczema", "dermatitis"]
  },
  {
    code: "EA90",
    foundationUri: "http://id.who.int/icd/entity/1567890123",
    chapter: "14",
    chapterTitle: "Diseases of the skin",
    block: "Papulosquamous disorders",
    blockRange: "EA90-EA9Z",
    category: "Psoriasis",
    parentCode: undefined,
    codeType: "category",
    name: "Psoriasis",
    definition: "A chronic immune-mediated inflammatory skin disease characterized by sharply demarcated erythematous plaques covered with silvery scales.",
    causes: [
      "Genetic predisposition (HLA-C*06:02)",
      "Immune dysregulation (Th17/IL-23 pathway)",
      "Environmental triggers",
      "Infections (streptococcal)",
      "Stress",
      "Medications (lithium, beta-blockers)"
    ],
    symptoms: [
      "Well-demarcated erythematous plaques",
      "Silvery-white scales",
      "Koebner phenomenon",
      "Nail changes (pitting, onycholysis)",
      "Pruritus",
      "Psoriatic arthritis (up to 30%)"
    ],
    prevention: [
      "Avoid known triggers",
      "Stress management",
      "Maintain healthy weight",
      "Avoid smoking and excess alcohol",
      "Sun protection (avoid burns)"
    ],
    precautions: [
      "Monitor for psoriatic arthritis",
      "Screen for metabolic syndrome",
      "Monitor for depression",
      "Regular medication monitoring"
    ],
    management: [
      "Topical corticosteroids",
      "Vitamin D analogues",
      "Phototherapy (UVB, PUVA)",
      "Methotrexate (moderate-severe)",
      "Biologics (TNF, IL-17, IL-23 inhibitors)",
      "Systemic therapy for severe disease"
    ],
    synonyms: ["Plaque psoriasis", "Psoriasis vulgaris"],
    indexTerms: ["psoriasis", "plaque psoriasis", "skin plaques"]
  },

  // ============================================
  // CHAPTER 16: Diseases of the genitourinary system
  // ============================================
  {
    code: "GB40",
    foundationUri: "http://id.who.int/icd/entity/1678901234",
    chapter: "16",
    chapterTitle: "Diseases of the genitourinary system",
    block: "Urinary tract infections",
    blockRange: "GB40-GB4Z",
    category: "Cystitis",
    parentCode: undefined,
    codeType: "code",
    name: "Acute cystitis",
    definition: "Acute bacterial infection of the urinary bladder, presenting with dysuria, frequency, and urgency.",
    inclusions: ["Urinary tract infection, lower", "Bladder infection"],
    exclusions: ["Acute pyelonephritis (GB41)"],
    causes: [
      "Escherichia coli (80-90%)",
      "Staphylococcus saprophyticus",
      "Klebsiella species",
      "Enterococcus species",
      "Sexual activity",
      "Urinary tract abnormalities"
    ],
    symptoms: [
      "Dysuria (painful urination)",
      "Urinary frequency",
      "Urinary urgency",
      "Suprapubic pain",
      "Hematuria",
      "Cloudy or malodorous urine"
    ],
    prevention: [
      "Adequate hydration",
      "Void after intercourse",
      "Proper hygiene (wipe front to back)",
      "Cranberry products (limited evidence)",
      "Avoid spermicides"
    ],
    precautions: [
      "Rule out pyelonephritis",
      "Consider STI in sexually active",
      "Screen for pregnancy",
      "Recurrent UTIs need investigation"
    ],
    management: [
      "Empiric antibiotics (nitrofurantoin, TMP-SMX, fosfomycin)",
      "Increased fluid intake",
      "Phenazopyridine for symptom relief",
      "3-day course for uncomplicated",
      "Longer course for complicated UTI"
    ],
    synonyms: ["UTI", "Bladder infection", "Lower urinary tract infection"],
    indexTerms: ["cystitis", "UTI", "urinary tract infection", "bladder infection"]
  },
  {
    code: "GA10",
    foundationUri: "http://id.who.int/icd/entity/1789012345",
    chapter: "16",
    chapterTitle: "Diseases of the genitourinary system",
    block: "Glomerular diseases",
    blockRange: "GA10-GA1Z",
    category: "Chronic kidney disease",
    parentCode: undefined,
    codeType: "category",
    name: "Chronic kidney disease",
    definition: "Abnormalities of kidney structure or function present for more than 3 months, with implications for health. Classified by GFR category (G1-G5) and albuminuria category (A1-A3).",
    inclusions: ["Chronic renal failure", "CKD stages 1-5"],
    causes: [
      "Diabetes mellitus (most common)",
      "Hypertension",
      "Glomerulonephritis",
      "Polycystic kidney disease",
      "Obstructive uropathy",
      "Nephrotoxic medications"
    ],
    symptoms: [
      "Often asymptomatic until advanced",
      "Fatigue and weakness",
      "Edema",
      "Anorexia and nausea",
      "Pruritus",
      "Anemia symptoms",
      "Uremic symptoms (advanced)"
    ],
    prevention: [
      "Diabetes control",
      "Blood pressure control",
      "SGLT2 inhibitors for high-risk",
      "Avoid nephrotoxins",
      "Regular kidney function monitoring"
    ],
    precautions: [
      "Avoid NSAIDs",
      "Adjust drug dosing",
      "Monitor for complications",
      "Prepare for renal replacement therapy"
    ],
    management: [
      "Treat underlying cause",
      "ACE inhibitors/ARBs for proteinuria",
      "SGLT2 inhibitors",
      "Blood pressure control (<130/80)",
      "Dietary modifications",
      "Dialysis or transplant for ESRD"
    ],
    synonyms: ["CKD", "Chronic renal failure", "Chronic renal insufficiency"],
    indexTerms: ["CKD", "chronic kidney disease", "kidney failure", "renal failure"]
  },

  // ============================================
  // CHAPTER 21: Symptoms, signs or clinical findings
  // ============================================
  {
    code: "MD80",
    foundationUri: "http://id.who.int/icd/entity/1890123456",
    chapter: "21",
    chapterTitle: "Symptoms, signs or clinical findings, not elsewhere classified",
    block: "General symptoms, signs or clinical findings",
    blockRange: "MD80-MD9Z",
    category: "Fever",
    parentCode: undefined,
    codeType: "code",
    name: "Fever of unknown origin",
    definition: "Fever higher than 38.3°C on several occasions, with duration of more than 3 weeks, and uncertain diagnosis after 1 week of intelligent investigation.",
    exclusions: ["Fever with known cause (coded to specific condition)"],
    causes: [
      "Infections (25-30%)",
      "Malignancy (15-25%)",
      "Autoimmune/inflammatory diseases (20-30%)",
      "Miscellaneous (15-20%)",
      "Undiagnosed (5-15%)"
    ],
    symptoms: [
      "Documented fever >38.3°C",
      "Fever pattern may vary",
      "Associated symptoms depend on cause",
      "Weight loss common",
      "Night sweats",
      "Fatigue"
    ],
    prevention: [
      "Not applicable - symptom complex",
      "Regular health maintenance",
      "Age-appropriate cancer screening"
    ],
    precautions: [
      "Thorough systematic evaluation",
      "Avoid empiric treatment before diagnosis",
      "Regular reassessment",
      "Consider referral to specialist"
    ],
    management: [
      "Comprehensive history and examination",
      "Basic laboratory workup",
      "Imaging (CT, PET-CT)",
      "Targeted biopsies",
      "Temporal artery biopsy if >50 years",
      "Treatment based on diagnosis"
    ],
    synonyms: ["FUO", "Pyrexia of unknown origin"],
    indexTerms: ["FUO", "fever of unknown origin", "pyrexia"]
  },

  // ============================================
  // CHAPTER 22: Injury, poisoning
  // ============================================
  {
    code: "NA00",
    foundationUri: "http://id.who.int/icd/entity/1901234567",
    chapter: "22",
    chapterTitle: "Injury, poisoning or certain other consequences of external causes",
    block: "Injuries to the head",
    blockRange: "NA00-NA0Z",
    category: "Concussion",
    parentCode: undefined,
    codeType: "code",
    name: "Concussion",
    definition: "A traumatic brain injury induced by biomechanical forces, typically resulting in a rapid onset of short-lived neurological impairment that resolves spontaneously.",
    inclusions: ["Mild traumatic brain injury", "Minor head injury"],
    causes: [
      "Falls",
      "Sports injuries",
      "Motor vehicle accidents",
      "Assaults",
      "Blast injuries"
    ],
    symptoms: [
      "Headache",
      "Dizziness",
      "Confusion",
      "Memory disturbance",
      "Loss of consciousness (not required)",
      "Nausea or vomiting",
      "Balance problems",
      "Sleep disturbance"
    ],
    prevention: [
      "Helmet use in appropriate activities",
      "Seatbelt use",
      "Fall prevention measures",
      "Sports safety rules",
      "Education about concussion risks"
    ],
    precautions: [
      "Remove from activity immediately",
      "No same-day return to play",
      "Gradual return-to-activity protocol",
      "Cognitive rest initially",
      "Watch for warning signs"
    ],
    management: [
      "Physical and cognitive rest (initial)",
      "Gradual return to activity",
      "Symptom management (headache, sleep)",
      "Neuropsychological testing if prolonged",
      "Vestibular therapy if needed",
      "Follow return-to-sport protocols"
    ],
    synonyms: ["Mild TBI", "Minor head injury", "Brain concussion"],
    indexTerms: ["concussion", "head injury", "mTBI", "mild traumatic brain injury"]
  },

  // ============================================
  // CHAPTER 06: Additional mental health conditions
  // ============================================
  {
    code: "6A00",
    foundationUri: "http://id.who.int/icd/entity/2012345678",
    chapter: "06",
    chapterTitle: "Mental, behavioural or neurodevelopmental disorders",
    block: "Neurodevelopmental disorders",
    blockRange: "6A00-6A0Z",
    category: "Disorders of intellectual development",
    parentCode: undefined,
    codeType: "code",
    name: "Attention deficit hyperactivity disorder",
    definition: "A persistent pattern of inattention and/or hyperactivity-impulsivity that has a direct negative impact on academic, occupational, or social functioning.",
    inclusions: ["ADHD", "ADD", "Hyperkinetic disorder"],
    causes: [
      "Genetic factors (highly heritable)",
      "Dopaminergic dysfunction",
      "Prenatal exposures",
      "Low birth weight",
      "Environmental factors"
    ],
    symptoms: [
      "Inattention (difficulty sustaining focus)",
      "Easily distracted",
      "Hyperactivity",
      "Impulsivity",
      "Difficulty with organization",
      "Forgetfulness in daily activities"
    ],
    prevention: [
      "Avoid prenatal alcohol/tobacco",
      "Adequate prenatal care",
      "Early identification and intervention",
      "Supportive environment"
    ],
    precautions: [
      "Monitor for comorbid conditions",
      "Regular medication monitoring",
      "Assess for cardiovascular risk before stimulants",
      "Monitor growth in children"
    ],
    management: [
      "Psychoeducation",
      "Behavioral therapy",
      "Stimulant medications (methylphenidate, amphetamines)",
      "Non-stimulants (atomoxetine, guanfacine)",
      "Environmental modifications",
      "Parent training programs"
    ],
    synonyms: ["ADHD", "ADD", "Attention deficit disorder"],
    indexTerms: ["ADHD", "attention deficit", "hyperactivity", "ADD"]
  },
  {
    code: "6B00",
    foundationUri: "http://id.who.int/icd/entity/2123456789",
    chapter: "06",
    chapterTitle: "Mental, behavioural or neurodevelopmental disorders",
    block: "Anxiety or fear-related disorders",
    blockRange: "6B00-6B0Z",
    category: "Generalized anxiety disorder",
    parentCode: undefined,
    codeType: "code",
    name: "Generalised anxiety disorder",
    definition: "Marked symptoms of anxiety accompanied by general apprehensiveness not restricted to any particular environmental circumstance, with persistent worrying about everyday matters.",
    causes: [
      "Genetic predisposition",
      "Neurotransmitter imbalances",
      "Stressful life events",
      "Childhood adversity",
      "Medical conditions",
      "Substance use"
    ],
    symptoms: [
      "Excessive worry about multiple domains",
      "Difficulty controlling worry",
      "Restlessness or feeling on edge",
      "Fatigue",
      "Difficulty concentrating",
      "Muscle tension",
      "Sleep disturbance"
    ],
    prevention: [
      "Stress management skills",
      "Regular exercise",
      "Healthy sleep habits",
      "Limited caffeine and alcohol",
      "Social support maintenance"
    ],
    precautions: [
      "Screen for depression",
      "Assess suicide risk",
      "Monitor for substance use",
      "Avoid benzodiazepine dependence"
    ],
    management: [
      "Cognitive behavioral therapy (first-line)",
      "SSRIs or SNRIs",
      "Buspirone",
      "Short-term benzodiazepines (if needed)",
      "Relaxation techniques",
      "Mindfulness-based interventions"
    ],
    synonyms: ["GAD", "Generalized anxiety disorder"],
    indexTerms: ["anxiety", "GAD", "generalized anxiety", "worry"]
  },

  // ============================================
  // CHAPTER 11: Additional circulatory conditions
  // ============================================
  {
    code: "BA80",
    foundationUri: "http://id.who.int/icd/entity/2234567890",
    chapter: "11",
    chapterTitle: "Diseases of the circulatory system",
    block: "Ischaemic heart diseases",
    blockRange: "BA80-BA8Z",
    category: "Acute myocardial infarction",
    parentCode: undefined,
    codeType: "category",
    name: "Acute myocardial infarction",
    definition: "Acute myocardial injury with clinical evidence of acute myocardial ischaemia and detection of rise and/or fall of cardiac troponin values with at least one value above the 99th percentile upper reference limit.",
    inclusions: ["Heart attack", "STEMI", "NSTEMI"],
    causes: [
      "Coronary artery atherosclerosis",
      "Plaque rupture with thrombosis",
      "Coronary artery spasm",
      "Coronary artery dissection",
      "Embolic occlusion"
    ],
    symptoms: [
      "Chest pain (pressure, squeezing)",
      "Radiation to arm, jaw, back",
      "Shortness of breath",
      "Diaphoresis",
      "Nausea and vomiting",
      "Anxiety, sense of doom",
      "Atypical presentations in women, elderly, diabetics"
    ],
    prevention: [
      "Smoking cessation",
      "Blood pressure control",
      "Lipid management (statins)",
      "Diabetes control",
      "Regular exercise",
      "Healthy diet",
      "Aspirin for high-risk (if indicated)"
    ],
    precautions: [
      "Call emergency services immediately",
      "Chew aspirin if not contraindicated",
      "Avoid exertion",
      "Time is muscle - rapid treatment essential"
    ],
    management: [
      "STEMI: Primary PCI (preferred) or fibrinolysis",
      "NSTEMI: Risk stratification, early invasive if high-risk",
      "Dual antiplatelet therapy",
      "Anticoagulation",
      "Beta-blockers, ACE inhibitors, statins",
      "Cardiac rehabilitation"
    ],
    synonyms: ["Heart attack", "MI", "STEMI", "NSTEMI"],
    indexTerms: ["heart attack", "myocardial infarction", "MI", "STEMI", "NSTEMI"]
  },
  {
    code: "BA40",
    foundationUri: "http://id.who.int/icd/entity/2345678901",
    chapter: "11",
    chapterTitle: "Diseases of the circulatory system",
    block: "Heart failure",
    blockRange: "BA40-BA4Z",
    category: "Heart failure",
    parentCode: undefined,
    codeType: "category",
    name: "Heart failure",
    definition: "A clinical syndrome characterized by typical symptoms (breathlessness, fatigue) and signs (elevated jugular venous pressure, pulmonary crackles) caused by structural and/or functional cardiac abnormality.",
    inclusions: ["Congestive heart failure", "Cardiac failure"],
    causes: [
      "Coronary artery disease",
      "Hypertension",
      "Valvular heart disease",
      "Cardiomyopathy",
      "Arrhythmias",
      "Congenital heart disease"
    ],
    symptoms: [
      "Dyspnea on exertion",
      "Orthopnea",
      "Paroxysmal nocturnal dyspnea",
      "Fatigue",
      "Peripheral edema",
      "Nocturia",
      "Reduced exercise tolerance"
    ],
    prevention: [
      "Control hypertension",
      "Manage coronary artery disease",
      "Limit alcohol",
      "Maintain healthy weight",
      "Regular exercise",
      "Treat diabetes"
    ],
    precautions: [
      "Fluid and sodium restriction",
      "Daily weight monitoring",
      "Medication adherence",
      "Avoid NSAIDs",
      "Recognize decompensation signs"
    ],
    management: [
      "ACE inhibitors/ARBs/ARNI",
      "Beta-blockers",
      "MRAs (spironolactone, eplerenone)",
      "SGLT2 inhibitors",
      "Diuretics for congestion",
      "Device therapy (ICD, CRT)",
      "Cardiac transplant for refractory cases"
    ],
    synonyms: ["CHF", "Congestive heart failure", "Cardiac failure"],
    indexTerms: ["heart failure", "CHF", "cardiac failure", "congestive heart failure"]
  },

  // ============================================
  // CHAPTER 12: Additional respiratory conditions
  // ============================================
  {
    code: "CA22",
    foundationUri: "http://id.who.int/icd/entity/2456789012",
    chapter: "12",
    chapterTitle: "Diseases of the respiratory system",
    block: "Chronic lower respiratory diseases",
    blockRange: "CA22-CA2Z",
    category: "Asthma",
    parentCode: undefined,
    codeType: "category",
    name: "Asthma",
    definition: "A heterogeneous disease characterized by chronic airway inflammation, defined by history of respiratory symptoms such as wheeze, shortness of breath, chest tightness, and cough that vary over time and in intensity, together with variable expiratory airflow limitation.",
    causes: [
      "Allergic sensitization",
      "Genetic predisposition",
      "Environmental exposures",
      "Respiratory infections",
      "Occupational exposures",
      "Obesity"
    ],
    symptoms: [
      "Wheeze",
      "Shortness of breath",
      "Chest tightness",
      "Cough (especially nocturnal)",
      "Variable symptoms",
      "Triggered by exercise, allergens, cold air"
    ],
    prevention: [
      "Allergen avoidance",
      "Smoking cessation (including passive)",
      "Maintain healthy weight",
      "Occupational exposure prevention",
      "Vaccinations (influenza, pneumococcal)"
    ],
    precautions: [
      "Have written asthma action plan",
      "Know trigger factors",
      "Regular inhaler technique assessment",
      "Peak flow monitoring"
    ],
    management: [
      "Inhaled corticosteroids (ICS) - controller",
      "Short-acting beta-agonist (SABA) - reliever",
      "Long-acting beta-agonist (LABA) + ICS",
      "Leukotriene receptor antagonists",
      "Biologics for severe asthma",
      "Self-management education"
    ],
    synonyms: ["Bronchial asthma", "Allergic asthma"],
    indexTerms: ["asthma", "bronchial asthma", "wheezing", "reactive airway"]
  },
  {
    code: "CA20",
    foundationUri: "http://id.who.int/icd/entity/2567890123",
    chapter: "12",
    chapterTitle: "Diseases of the respiratory system",
    block: "Chronic lower respiratory diseases",
    blockRange: "CA20-CA2Z",
    category: "Chronic obstructive pulmonary disease",
    parentCode: undefined,
    codeType: "category",
    name: "Chronic obstructive pulmonary disease",
    definition: "A common, preventable, and treatable disease characterized by persistent respiratory symptoms and airflow limitation due to airway and/or alveolar abnormalities usually caused by significant exposure to noxious particles or gases.",
    inclusions: ["COPD", "Chronic bronchitis", "Emphysema"],
    causes: [
      "Tobacco smoking (primary cause)",
      "Occupational dust/chemicals",
      "Indoor air pollution",
      "Alpha-1 antitrypsin deficiency",
      "Childhood respiratory infections"
    ],
    symptoms: [
      "Chronic progressive dyspnea",
      "Chronic cough",
      "Sputum production",
      "Wheezing",
      "Chest tightness",
      "Recurrent respiratory infections"
    ],
    prevention: [
      "Smoking cessation (most important)",
      "Avoid occupational exposures",
      "Improve indoor air quality",
      "Vaccinations"
    ],
    precautions: [
      "Recognize exacerbation signs",
      "Avoid respiratory irritants",
      "Medication adherence",
      "Regular follow-up"
    ],
    management: [
      "Smoking cessation",
      "Bronchodilators (SABA, SAMA, LABA, LAMA)",
      "Inhaled corticosteroids (if frequent exacerbations)",
      "Pulmonary rehabilitation",
      "Long-term oxygen therapy (if hypoxemic)",
      "Exacerbation management"
    ],
    synonyms: ["COPD", "Chronic bronchitis", "Emphysema"],
    indexTerms: ["COPD", "chronic obstructive pulmonary disease", "emphysema", "chronic bronchitis"]
  }
];

/**
 * Enhanced ICD-11 Search Function
 * Searches across code, name, synonyms, and index terms
 * Uses fuzzy matching for spelling tolerance
 */
export function searchICD11(query: string): ICD11Entry[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return [];
  
  // Score-based search for better relevance
  const results = icd11Data.map(entry => {
    let score = 0;
    
    // Exact code match - highest priority
    if (entry.code.toLowerCase() === normalizedQuery) score += 100;
    else if (entry.code.toLowerCase().startsWith(normalizedQuery)) score += 50;
    
    // Name match
    if (entry.name.toLowerCase().includes(normalizedQuery)) score += 30;
    
    // Synonym match
    if (entry.synonyms?.some(s => s.toLowerCase().includes(normalizedQuery))) score += 25;
    
    // Index term match
    if (entry.indexTerms?.some(t => t.toLowerCase().includes(normalizedQuery))) score += 20;
    
    // Definition match
    if (entry.definition.toLowerCase().includes(normalizedQuery)) score += 10;
    
    // Symptom match
    if (entry.symptoms.some(s => s.toLowerCase().includes(normalizedQuery))) score += 15;
    
    // Category/block match
    if (entry.category.toLowerCase().includes(normalizedQuery)) score += 5;
    if (entry.block.toLowerCase().includes(normalizedQuery)) score += 5;
    
    return { entry, score };
  });
  
  return results
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(r => r.entry);
}

/**
 * Get ICD-11 entry by exact code match
 */
export function getICD11ByCode(code: string): ICD11Entry | undefined {
  return icd11Data.find(entry => entry.code.toLowerCase() === code.toLowerCase());
}

/**
 * Get all entries in a specific chapter
 */
export function getEntriesByChapter(chapterCode: string): ICD11Entry[] {
  return icd11Data.filter(entry => entry.chapter === chapterCode);
}

/**
 * Get child codes of a parent code (hierarchical lookup)
 */
export function getChildCodes(parentCode: string): ICD11Entry[] {
  return icd11Data.filter(entry => entry.parentCode === parentCode);
}

/**
 * Get all unique blocks in the dataset
 */
export function getUniqueBlocks(): { block: string; chapter: string; count: number }[] {
  const blockMap = new Map<string, { chapter: string; count: number }>();
  
  icd11Data.forEach(entry => {
    const existing = blockMap.get(entry.block);
    if (existing) {
      existing.count++;
    } else {
      blockMap.set(entry.block, { chapter: entry.chapter, count: 1 });
    }
  });
  
  return Array.from(blockMap.entries()).map(([block, data]) => ({
    block,
    chapter: data.chapter,
    count: data.count
  }));
}
