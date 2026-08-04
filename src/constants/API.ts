// API endpoints used by the public attolearn site.
// Hosts are env-overridable so the same code runs in dev/prod without edits.

const API_HOST_USERS =
  process.env.API_HOST_USERS || "https://authapis.attobility.com/api";
const API_HOST_MIX =
  process.env.API_HOST_MIX || "https://eduapis.attobility.com/api";
const API_HOST_AL =
  process.env.API_HOST_AL || "https://alapis.attobility.com/api";

const API = {
  // Users / Auth
  PKUSER_SIGNIN: `${API_HOST_AL}/users/signin`,
  PKUSER_SIGNUP_MULTI_STEP: `${API_HOST_AL}/users/signup`,
  MSSQL_USERS_CONFIRM: `${API_HOST_AL}/users/send-verification-code`,
  SEND_PWD: `${API_HOST_USERS}/Users/SendResetPasswordCode`,
  RESET_PWD: `${API_HOST_USERS}/Users/ResetPassword`,

  // Adaptive Learning
  AL_COUNTRIES: `${API_HOST_AL}/admin/setup/countries`, // POST and GET
  AL_COUNTRIES_ACTIVE_GET: `${API_HOST_AL}/reference-data/countries/active`, // POST and GET
  AL_CURRICULUM_AUTHORITIES: `${API_HOST_AL}/admin/setup/curriculum-authorities`, // POST and GET
  AL_CURRICULUMS: `${API_HOST_AL}/admin/setup/curriculums`, // POST and GET
  AL_CURRICULUM_VERSIONS: `${API_HOST_AL}/admin/setup/curriculum-versions`, // POST and GET
  AL_GRADES: `${API_HOST_AL}/admin/setup/grades`, // POST and GET
  AL_SUBJECTS: `${API_HOST_AL}/admin/setup/subjects`, // POST and GET
  AL_TOPICS: `${API_HOST_AL}/admin/setup/topics`, // POST and GET
  AL_OUTCOMES: `${API_HOST_AL}/admin/setup/outcomes`, // POST and GET
  AL_SKILLS: `${API_HOST_AL}/admin/setup/skills`, // POST and GET
  AL_COGNITIVE_ACTIONS: `${API_HOST_AL}/admin/setup/cognitive-actions`, // POST and GET
  AL_PATTERNS: `${API_HOST_AL}/admin/setup/patterns`, // POST and GET
  AL_OUTCOME_SKILLS: `${API_HOST_AL}/admin/setup/outcome-skills`, // POST and GET
  AL_USERS: `${API_HOST_AL}/users`, // POST and GET
  AL_COURSES: `${API_HOST_AL}/admin/courses`, // POST and GET
  AL_RECOMMENDATIONS_CURRENT_GET: `${API_HOST_AL}/recommendations/current`, // GET

  // PATCH endpoints
  AL_PATCH_COUNTRY: `${API_HOST_AL}/admin/setup/countries/:countryId`,
  AL_PATCH_CURRICULUM_AUTHORITY: `${API_HOST_AL}/admin/setup/curriculum-authorities/:authorityId`,
  AL_PATCH_CURRICULUM: `${API_HOST_AL}/admin/setup/curriculums/:curriculumId`,
  AL_PATCH_CURRICULUM_VERSION: `${API_HOST_AL}/admin/setup/curriculum-versions/:curriculumVersionId`,
  AL_PATCH_GRADE: `${API_HOST_AL}/admin/setup/grades/:gradeLevelId`,
  AL_PATCH_SUBJECT: `${API_HOST_AL}/admin/setup/subjects/:subjectId`,
  AL_PATCH_TOPIC: `${API_HOST_AL}/admin/setup/topics/:nodeId`,
  AL_PATCH_OUTCOME: `${API_HOST_AL}/admin/setup/outcomes/:outcomeId`,
  AL_PATCH_SKILL: `${API_HOST_AL}/admin/setup/skills/:skillId`,
  AL_PATCH_COGNITIVE_ACTION: `${API_HOST_AL}/admin/setup/cognitive-actions/:cognitiveActionId`,
  AL_PATCH_PATTERN: `${API_HOST_AL}/admin/setup/patterns/:patternId`,
  AL_PATCH_OUTCOME_SKILL: `${API_HOST_AL}/admin/setup/outcome-skills/:outcomeSkillMapId`,

  // Education — classes / subjects / chapters / questions
  ALL_CLASSES_GET: `${API_HOST_MIX}/Education/GetClasses`,
  SUBJECTSBYBOARD_GET: `${API_HOST_MIX}/Education/GetSubjectsByBoard`,
  CHAPTERS_GET: `${API_HOST_MIX}/Education/GetChapters`,
  CHAPTERQUESTIONS_GET: `${API_HOST_MIX}/Education/GetQuestions`,
  QUESTIONS_GET: `${API_HOST_MIX}/Education/GetSelectedChaptersQuestions`,
  QUESTION_SAVE: `${API_HOST_MIX}/Education/SaveQuestion`,
  CLASS_SUBJECT_LANG_GET: `${API_HOST_MIX}/Questions/GetPaperLanguageCode`,
  RECORD_DEL: `${API_HOST_MIX}/Education/DeleteRec`,
  // Exam Types
  EXAM_TYPES_GET: `${API_HOST_MIX}/Questions/GetExamTypes`,
  // Papers
  MYPAPERS_GET: `${API_HOST_MIX}/Education/GetMyPapers`,
  MANUALPAPER_GENERATE: `${API_HOST_MIX}/Education/GenerateManualPaper`,
  MCQPAPER_GENERATE: `${API_HOST_MIX}/Education/GenerateMCQsPaper`,
  GENERATE_DEMO_TEST_PAPER: `${API_HOST_MIX}/Education/GenerateDemoTestPaper`,
  GENERATED_PAPER_GET: `${API_HOST_MIX}/Questions/GetGeneratedPaper`,
  GET_TEST_TYPE_WITH_DETAILS: `${API_HOST_MIX}/Questions/GetTestTypesWithDetails`,

  // Subscriptions
  GET_SUBSCRIPTION_PLANS: `${API_HOST_MIX}/Subscriptions/GetPlans`,

  // Resellers
  SAVE_RESELLER_APPLICATION: `${API_HOST_MIX}/Education/SaveResellerApplication`,
};

export default API;
