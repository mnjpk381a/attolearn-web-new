import API from "@/constants/API";

export type AdminSetupFieldType =
  | "checkbox"
  | "date"
  | "number"
  | "select"
  | "text"
  | "textarea";

export type AdminSetupField = {
  key: string;
  label: string;
  type: AdminSetupFieldType;
  required?: boolean;
  optional?: boolean;
  placeholder?: string;
  maxLength?: number;
  defaultValue?: string | number | boolean;
  optionsKey?: string;
};

export type AdminSetupDependency = {
  key: string;
  endpoint: string;
  idField: string;
  labelField: string;
  fallbackLabelField?: string;
};

export type AdminSetupColumn = {
  key: string;
  label: string;
  type?: "boolean" | "date" | "lookup" | "status" | "text";
  lookupKey?: string;
};

export type AdminSetupConfig = {
  section: string;
  navLabel: string;
  title: string;
  eyebrow: string;
  description: string;
  endpoint: string;
  patchEndpoint: string;
  idField: string;
  titleField: string;
  activeField?: string;
  fields: AdminSetupField[];
  columns: AdminSetupColumn[];
  dependencies?: AdminSetupDependency[];
};

const countriesDependency: AdminSetupDependency = {
  key: "countries",
  endpoint: API.AL_COUNTRIES,
  idField: "countryId",
  labelField: "countryName",
  fallbackLabelField: "countryCode",
};

const authoritiesDependency: AdminSetupDependency = {
  key: "authorities",
  endpoint: API.AL_CURRICULUM_AUTHORITIES,
  idField: "authorityId",
  labelField: "authorityName",
  fallbackLabelField: "code",
};

const curriculumsDependency: AdminSetupDependency = {
  key: "curriculums",
  endpoint: API.AL_CURRICULUMS,
  idField: "curriculumId",
  labelField: "curriculumName",
};

const curriculumVersionsDependency: AdminSetupDependency = {
  key: "curriculumVersions",
  endpoint: API.AL_CURRICULUM_VERSIONS,
  idField: "curriculumVersionId",
  labelField: "versionName",
};

const gradesDependency: AdminSetupDependency = {
  key: "grades",
  endpoint: API.AL_GRADES,
  idField: "gradeLevelId",
  labelField: "name",
};

const subjectsDependency: AdminSetupDependency = {
  key: "subjects",
  endpoint: API.AL_SUBJECTS,
  idField: "subjectId",
  labelField: "name",
  fallbackLabelField: "code",
};

const topicsDependency: AdminSetupDependency = {
  key: "topics",
  endpoint: API.AL_TOPICS,
  idField: "nodeId",
  labelField: "name",
  fallbackLabelField: "code",
};

const outcomesDependency: AdminSetupDependency = {
  key: "outcomes",
  endpoint: API.AL_OUTCOMES,
  idField: "outcomeId",
  labelField: "title",
  fallbackLabelField: "code",
};

const skillsDependency: AdminSetupDependency = {
  key: "skills",
  endpoint: API.AL_SKILLS,
  idField: "skillId",
  labelField: "name",
};

export const adminSetupConfigs: AdminSetupConfig[] = [
  {
    section: "countries",
    navLabel: "Countries",
    title: "Manage Countries",
    eyebrow: "Admin Setup",
    description:
      "Maintain country names, codes, active status, and flag labels used across AttoLearn setup screens.",
    endpoint: API.AL_COUNTRIES,
    patchEndpoint: API.AL_PATCH_COUNTRY,
    idField: "countryId",
    titleField: "countryName",
    activeField: "isActive",
    fields: [
      {
        key: "countryName",
        label: "Country name",
        type: "text",
        required: true,
        placeholder: "Pakistan",
        maxLength: 100,
      },
      {
        key: "countryCode",
        label: "Country code",
        type: "text",
        required: true,
        placeholder: "PK",
        maxLength: 20,
      },
      {
        key: "flagEmoji",
        label: "Flag",
        type: "text",
        optional: true,
        placeholder: "🇵🇰",
        maxLength: 10,
      },
      {
        key: "isActive",
        label: "Active",
        type: "checkbox",
        defaultValue: true,
      },
    ],
    columns: [
      { key: "countryName", label: "Country" },
      { key: "countryCode", label: "Code" },
      { key: "flagEmoji", label: "Flag" },
      { key: "isActive", label: "Status", type: "status" },
    ],
  },
  {
    section: "curriculum-authorities",
    navLabel: "Authorities",
    title: "Manage Curriculum Authorities",
    eyebrow: "Curriculum Setup",
    description:
      "Create and maintain education boards or authorities by country.",
    endpoint: API.AL_CURRICULUM_AUTHORITIES,
    patchEndpoint: API.AL_PATCH_CURRICULUM_AUTHORITY,
    idField: "authorityId",
    titleField: "authorityName",
    dependencies: [countriesDependency],
    fields: [
      {
        key: "countryId",
        label: "Country",
        type: "select",
        required: true,
        optionsKey: "countries",
      },
      {
        key: "authorityName",
        label: "Authority name",
        type: "text",
        required: true,
        placeholder: "Punjab Board",
        maxLength: 150,
      },
      {
        key: "code",
        label: "Code",
        type: "text",
        optional: true,
        placeholder: "PCTB",
        maxLength: 50,
      },
    ],
    columns: [
      { key: "authorityName", label: "Authority" },
      {
        key: "countryId",
        label: "Country",
        type: "lookup",
        lookupKey: "countries",
      },
      { key: "code", label: "Code" },
    ],
  },
  {
    section: "curriculums",
    navLabel: "Curriculums",
    title: "Manage Curriculums",
    eyebrow: "Curriculum Setup",
    description: "Attach curriculum records to authorities and describe them.",
    endpoint: API.AL_CURRICULUMS,
    patchEndpoint: API.AL_PATCH_CURRICULUM,
    idField: "curriculumId",
    titleField: "curriculumName",
    dependencies: [authoritiesDependency],
    fields: [
      {
        key: "authorityId",
        label: "Authority",
        type: "select",
        required: true,
        optionsKey: "authorities",
      },
      {
        key: "curriculumName",
        label: "Curriculum name",
        type: "text",
        required: true,
        placeholder: "Punjab Board Mathematics",
        maxLength: 150,
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        optional: true,
        placeholder: "Short curriculum description",
      },
    ],
    columns: [
      { key: "curriculumName", label: "Curriculum" },
      {
        key: "authorityId",
        label: "Authority",
        type: "lookup",
        lookupKey: "authorities",
      },
      { key: "description", label: "Description" },
    ],
  },
  {
    section: "curriculum-versions",
    navLabel: "Versions",
    title: "Manage Curriculum Versions",
    eyebrow: "Curriculum Setup",
    description: "Maintain version windows for each curriculum.",
    endpoint: API.AL_CURRICULUM_VERSIONS,
    patchEndpoint: API.AL_PATCH_CURRICULUM_VERSION,
    idField: "curriculumVersionId",
    titleField: "versionName",
    activeField: "isActive",
    dependencies: [curriculumsDependency],
    fields: [
      {
        key: "curriculumId",
        label: "Curriculum",
        type: "select",
        required: true,
        optionsKey: "curriculums",
      },
      {
        key: "versionName",
        label: "Version name",
        type: "text",
        required: true,
        placeholder: "2026",
        maxLength: 100,
      },
      {
        key: "effectiveFrom",
        label: "Effective from",
        type: "date",
        optional: true,
      },
      {
        key: "effectiveTo",
        label: "Effective to",
        type: "date",
        optional: true,
      },
      {
        key: "isActive",
        label: "Active",
        type: "checkbox",
        defaultValue: true,
      },
    ],
    columns: [
      { key: "versionName", label: "Version" },
      {
        key: "curriculumId",
        label: "Curriculum",
        type: "lookup",
        lookupKey: "curriculums",
      },
      { key: "effectiveFrom", label: "From", type: "date" },
      { key: "effectiveTo", label: "To", type: "date" },
      { key: "isActive", label: "Status", type: "status" },
    ],
  },
  {
    section: "grades",
    navLabel: "Grades",
    title: "Manage Grades",
    eyebrow: "Curriculum Setup",
    description: "Create grade levels within curriculum versions.",
    endpoint: API.AL_GRADES,
    patchEndpoint: API.AL_PATCH_GRADE,
    idField: "gradeLevelId",
    titleField: "name",
    dependencies: [curriculumVersionsDependency],
    fields: [
      {
        key: "curriculumVersionId",
        label: "Curriculum version",
        type: "select",
        required: true,
        optionsKey: "curriculumVersions",
      },
      {
        key: "name",
        label: "Grade name",
        type: "text",
        required: true,
        placeholder: "Grade 6",
        maxLength: 100,
      },
      {
        key: "sortOrder",
        label: "Sort order",
        type: "number",
        defaultValue: 0,
      },
    ],
    columns: [
      { key: "name", label: "Grade" },
      {
        key: "curriculumVersionId",
        label: "Version",
        type: "lookup",
        lookupKey: "curriculumVersions",
      },
      { key: "sortOrder", label: "Sort" },
    ],
  },
  {
    section: "subjects",
    navLabel: "Subjects",
    title: "Manage Subjects",
    eyebrow: "Curriculum Setup",
    description: "Create subject records for each grade level.",
    endpoint: API.AL_SUBJECTS,
    patchEndpoint: API.AL_PATCH_SUBJECT,
    idField: "subjectId",
    titleField: "name",
    dependencies: [gradesDependency],
    fields: [
      {
        key: "gradeLevelId",
        label: "Grade",
        type: "select",
        required: true,
        optionsKey: "grades",
      },
      {
        key: "name",
        label: "Subject name",
        type: "text",
        required: true,
        placeholder: "Math",
        maxLength: 100,
      },
      {
        key: "code",
        label: "Code",
        type: "text",
        optional: true,
        placeholder: "MATH",
        maxLength: 50,
      },
    ],
    columns: [
      { key: "name", label: "Subject" },
      {
        key: "gradeLevelId",
        label: "Grade",
        type: "lookup",
        lookupKey: "grades",
      },
      { key: "code", label: "Code" },
    ],
  },
  {
    section: "topics",
    navLabel: "Topics",
    title: "Manage Topics",
    eyebrow: "Curriculum Setup",
    description:
      "Create topic nodes under subjects, including optional parent topics.",
    endpoint: API.AL_TOPICS,
    patchEndpoint: API.AL_PATCH_TOPIC,
    idField: "nodeId",
    titleField: "name",
    activeField: "isActive",
    dependencies: [subjectsDependency, topicsDependency],
    fields: [
      {
        key: "subjectId",
        label: "Subject",
        type: "select",
        required: true,
        optionsKey: "subjects",
      },
      {
        key: "parentNodeId",
        label: "Parent topic",
        type: "select",
        optional: true,
        optionsKey: "topics",
      },
      {
        key: "name",
        label: "Topic name",
        type: "text",
        required: true,
        placeholder: "Fractions",
        maxLength: 200,
      },
      {
        key: "code",
        label: "Code",
        type: "text",
        optional: true,
        placeholder: "MATH-G6-FRAC",
        maxLength: 50,
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        optional: true,
      },
      {
        key: "nodeType",
        label: "Node type",
        type: "text",
        defaultValue: "Topic",
        maxLength: 50,
      },
      {
        key: "sortOrder",
        label: "Sort order",
        type: "number",
        defaultValue: 0,
      },
      {
        key: "depth",
        label: "Depth",
        type: "number",
        defaultValue: 1,
      },
      {
        key: "isActive",
        label: "Active",
        type: "checkbox",
        defaultValue: true,
      },
    ],
    columns: [
      { key: "name", label: "Topic" },
      {
        key: "subjectId",
        label: "Subject",
        type: "lookup",
        lookupKey: "subjects",
      },
      {
        key: "parentNodeId",
        label: "Parent",
        type: "lookup",
        lookupKey: "topics",
      },
      { key: "sortOrder", label: "Sort" },
      { key: "isActive", label: "Status", type: "status" },
    ],
  },
  {
    section: "outcomes",
    navLabel: "Outcomes",
    title: "Manage Outcomes",
    eyebrow: "Curriculum Setup",
    description: "Define learning outcomes against subjects and topic nodes.",
    endpoint: API.AL_OUTCOMES,
    patchEndpoint: API.AL_PATCH_OUTCOME,
    idField: "outcomeId",
    titleField: "title",
    dependencies: [topicsDependency, subjectsDependency],
    fields: [
      {
        key: "nodeId",
        label: "Topic",
        type: "select",
        required: true,
        optionsKey: "topics",
      },
      {
        key: "subjectId",
        label: "Subject",
        type: "select",
        required: true,
        optionsKey: "subjects",
      },
      {
        key: "title",
        label: "Outcome title",
        type: "text",
        required: true,
        placeholder: "Compare and order fractions",
        maxLength: 200,
      },
      {
        key: "code",
        label: "Code",
        type: "text",
        optional: true,
        placeholder: "M6-FR-01",
        maxLength: 100,
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        optional: true,
      },
      {
        key: "sortOrder",
        label: "Sort order",
        type: "number",
        defaultValue: 0,
      },
    ],
    columns: [
      { key: "title", label: "Outcome" },
      { key: "nodeId", label: "Topic", type: "lookup", lookupKey: "topics" },
      {
        key: "subjectId",
        label: "Subject",
        type: "lookup",
        lookupKey: "subjects",
      },
      { key: "code", label: "Code" },
      { key: "sortOrder", label: "Sort" },
    ],
  },
  {
    section: "skills",
    navLabel: "Skills",
    title: "Manage Skills",
    eyebrow: "Skill Setup",
    description: "Maintain reusable learning skills and their subject type.",
    endpoint: API.AL_SKILLS,
    patchEndpoint: API.AL_PATCH_SKILL,
    idField: "skillId",
    titleField: "name",
    activeField: "isActive",
    fields: [
      {
        key: "name",
        label: "Skill name",
        type: "text",
        required: true,
        placeholder: "Find common denominators",
        maxLength: 150,
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        optional: true,
      },
      {
        key: "subjectType",
        label: "Subject type",
        type: "text",
        optional: true,
        placeholder: "Math",
        maxLength: 100,
      },
      {
        key: "isGlobal",
        label: "Global",
        type: "checkbox",
        defaultValue: true,
      },
      {
        key: "isActive",
        label: "Active",
        type: "checkbox",
        defaultValue: true,
      },
    ],
    columns: [
      { key: "name", label: "Skill" },
      { key: "subjectType", label: "Subject type" },
      { key: "isGlobal", label: "Global", type: "boolean" },
      { key: "isActive", label: "Status", type: "status" },
    ],
  },
  {
    section: "cognitive-actions",
    navLabel: "Cognitive Actions",
    title: "Manage Cognitive Actions",
    eyebrow: "Skill Setup",
    description: "Maintain action verbs used to classify assessment evidence.",
    endpoint: API.AL_COGNITIVE_ACTIONS,
    patchEndpoint: API.AL_PATCH_COGNITIVE_ACTION,
    idField: "cognitiveActionId",
    titleField: "name",
    fields: [
      {
        key: "code",
        label: "Code",
        type: "text",
        required: true,
        placeholder: "APPLY",
        maxLength: 20,
      },
      {
        key: "name",
        label: "Name",
        type: "text",
        required: true,
        placeholder: "Apply",
        maxLength: 100,
      },
      {
        key: "sortOrder",
        label: "Sort order",
        type: "number",
        defaultValue: 0,
      },
    ],
    columns: [
      { key: "name", label: "Action" },
      { key: "code", label: "Code" },
      { key: "sortOrder", label: "Sort" },
    ],
  },
  {
    section: "patterns",
    navLabel: "Patterns",
    title: "Manage Patterns",
    eyebrow: "Skill Setup",
    description: "Maintain assessment and content patterns.",
    endpoint: API.AL_PATTERNS,
    patchEndpoint: API.AL_PATCH_PATTERN,
    idField: "patternId",
    titleField: "name",
    activeField: "isActive",
    fields: [
      {
        key: "name",
        label: "Pattern name",
        type: "text",
        required: true,
        placeholder: "Word Problem",
        maxLength: 100,
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        optional: true,
      },
      {
        key: "isActive",
        label: "Active",
        type: "checkbox",
        defaultValue: true,
      },
    ],
    columns: [
      { key: "name", label: "Pattern" },
      { key: "description", label: "Description" },
      { key: "isActive", label: "Status", type: "status" },
    ],
  },
  {
    section: "outcome-skills",
    navLabel: "Outcome Skills",
    title: "Manage Outcome Skills",
    eyebrow: "Skill Setup",
    description: "Map outcomes to the skills required for mastery.",
    endpoint: API.AL_OUTCOME_SKILLS,
    patchEndpoint: API.AL_PATCH_OUTCOME_SKILL,
    idField: "outcomeSkillMapId",
    titleField: "outcomeId",
    dependencies: [outcomesDependency, skillsDependency],
    fields: [
      {
        key: "outcomeId",
        label: "Outcome",
        type: "select",
        required: true,
        optionsKey: "outcomes",
      },
      {
        key: "skillId",
        label: "Skill",
        type: "select",
        required: true,
        optionsKey: "skills",
      },
      {
        key: "isGatewaySkill",
        label: "Gateway skill",
        type: "checkbox",
        defaultValue: false,
      },
      {
        key: "gatewayConfidenceScore",
        label: "Gateway confidence score",
        type: "number",
        optional: true,
        placeholder: "80",
      },
      {
        key: "sortOrder",
        label: "Sort order",
        type: "number",
        defaultValue: 0,
      },
    ],
    columns: [
      {
        key: "outcomeId",
        label: "Outcome",
        type: "lookup",
        lookupKey: "outcomes",
      },
      { key: "skillId", label: "Skill", type: "lookup", lookupKey: "skills" },
      { key: "isGatewaySkill", label: "Gateway", type: "boolean" },
      { key: "gatewayConfidenceScore", label: "Confidence" },
      { key: "sortOrder", label: "Sort" },
    ],
  },
];

export function getAdminSetupConfig(section: string) {
  return adminSetupConfigs.find((config) => config.section === section);
}
