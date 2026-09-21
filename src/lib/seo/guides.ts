export type Guide = {
  introduction: string;
  sections: { heading: string; text: string }[];
};
export const guides: Record<string, Guide> = {
  "/live-classes": {
    introduction:
      "A live class works best when the learner, family and tutor know what will happen before, during and after the session. Confirm which live-class tools are enabled for your account before making a booking.",
    sections: [
      {
        heading: "Before the lesson",
        text: "Agree the learning goal, date, time zone and joining instructions. For group sessions, confirm who will attend and whether the activities fit each learner. Parents should understand the tutor’s access and how to withdraw it.",
      },
      {
        heading: "Attendance and follow-up",
        text: "A joining link alone does not establish attendance. Ask the tutor to confirm attendance, record a brief learning note and identify useful follow-up practice. Keep homework focused on the lesson’s actual evidence.",
      },
      {
        heading: "Safeguarding and recordings",
        text: "Check the provider’s safeguarding arrangements and contact route for concerns. Do not assume lessons are recorded or recordings are available. Confirm consent, access and retention arrangements before recording a child’s session.",
      },
    ],
  },
  "/online-maths-practice": {
    introduction:
      "Useful maths practice makes the learner’s reasoning visible. Choose a topic that fits the local curriculum, then use a small number of questions to identify what is understood and what needs another explanation.",
    sections: [
      {
        heading: "Represent the same idea in different ways",
        text: "For fractions, connect a shaded shape, a number line and a written fraction. For multiplication, connect equal groups and an equation. A correct answer in one representation does not automatically establish understanding in every representation.",
      },
      {
        heading: "Use a worked example",
        text: "To compare 3/4 and 2/3, express both in twelfths: 3/4 = 9/12 and 2/3 = 8/12. Since 9/12 is larger, 3/4 is larger. Ask the learner to explain why converting to equal-sized parts makes comparison possible.",
      },
      {
        heading: "Check available coverage",
        text: "Ask which curriculum version, year levels and topics are available in your account. Topic availability may differ between markets. A broad subject label is not a promise that every curriculum outcome has practice content.",
      },
    ],
  },
  "/online-english-practice": {
    introduction:
      "English practice can combine careful reading, vocabulary and writing. The aim is to understand and communicate meaning, rather than simply choose an answer quickly.",
    sections: [
      {
        heading: "Read for evidence",
        text: "Consider: ‘Maya packed an umbrella after looking at the dark clouds.’ Ask what Maya expects and which words support the answer. The likely expectation is rain; the dark clouds and umbrella provide evidence for that inference.",
      },
      {
        heading: "Make writing more precise",
        text: "Compare ‘The animal moved’ with ‘The fox crept beneath the fence.’ Discuss how the noun and verb change the picture. Invite the learner to revise a sentence and explain their choices, rather than treating one suggested sentence as the only correct version.",
      },
      {
        heading: "Choose an appropriate starting point",
        text: "Reading and writing expectations vary with age, language experience and curriculum. Confirm which English activities and response types AttoLearn currently supports before choosing a plan.",
      },
    ],
  },
  "/online-science-practice": {
    introduction:
      "Science practice connects questions with observations and evidence. A useful response explains how the evidence supports a conclusion and what remains uncertain.",
    sections: [
      {
        heading: "Compare fairly",
        text: "To investigate whether light affects plant growth, keep the plant type, soil and watering consistent while changing the light conditions. Measure growth in the same way over the same period. Discuss other factors that could affect the result.",
      },
      {
        heading: "Separate observations from explanations",
        text: "‘The ice became liquid’ is an observation. ‘Energy transferred from the warmer surroundings’ is an explanation. Asking learners to distinguish them can reveal whether they understand a process beyond remembering a label.",
      },
      {
        heading: "Match practice to coverage",
        text: "Confirm the science topics, curriculum version and year levels available in your market. Examples on this page illustrate reasoning; they do not establish complete curriculum coverage or access to a particular question bank.",
      },
    ],
  },
  "/year-6-maths-practice": {
    introduction:
      "Year 6 maths practice should start with the learner’s current curriculum and understanding. Year labels and topic sequences differ between countries, so confirm local expectations before selecting activities.",
    sections: [
      {
        heading: "Start with a specific question",
        text: "Instead of asking a learner to ‘get better at maths’, choose a focus such as explaining equivalent fractions or selecting an operation in a word problem. Review one explanation before deciding what to practise next.",
      },
      {
        heading: "Explain a calculation",
        text: "A learner who knows that 0.25 × 4 = 1 should also be able to explain it as four quarters making one whole. Ask for a drawing or a number-line representation to see whether the calculation is connected to meaning.",
      },
      {
        heading: "Confirm Year 6 availability",
        text: "Ask AttoLearn which Year 6 maths topics are validated for your curriculum. This guide is not a published coverage register, and the presence of an example does not mean an entire Year 6 question bank is available.",
      },
    ],
  },
  "/year-6-english-practice": {
    introduction:
      "Year 6 English practice can support reading for meaning, explaining interpretations and improving written communication. The appropriate level depends on local curriculum expectations and the learner’s needs.",
    sections: [
      {
        heading: "Support an interpretation",
        text: "After reading a short passage, ask what a character might be feeling and which words support that interpretation. Separate an answer supported by the passage from an interesting idea that the text does not establish.",
      },
      {
        heading: "Revise with a purpose",
        text: "Ask a learner to rewrite directions so a reader can follow them without asking a question. Check the sequence, precise verbs and missing information. Then discuss which revision made the biggest difference.",
      },
      {
        heading: "Check the question bank",
        text: "Confirm the Year 6 English skills, text types and activities currently available for your country. AttoLearn availability must be checked against a reviewed coverage register before planning a complete programme.",
      },
    ],
  },
  "/year-6-science-practice": {
    introduction:
      "A useful science question asks a learner to describe evidence, explain a relationship or evaluate an investigation. Confirm the science outcomes expected in your local Year 6 curriculum.",
    sections: [
      {
        heading: "Read a result carefully",
        text: "If a material dissolves faster in warm water than cool water, ask what the investigation measured. Check whether the amount of material, volume of water and stirring were kept consistent before drawing a conclusion about temperature.",
      },
      {
        heading: "Explain what remains uncertain",
        text: "One observation may suggest a pattern without establishing a reliable conclusion. Ask whether repeating the investigation would help and what information another person would need to reproduce it.",
      },
      {
        heading: "Confirm topic readiness",
        text: "The examples here are illustrative. Ask which Year 6 Science topics have approved AttoLearn practice content for your curriculum and whether any gaps remain.",
      },
    ],
  },
  "/year-6-fractions-practice": {
    introduction:
      "Fraction practice becomes more useful when learners explain the size of a fraction as well as manipulate its numbers. Check which of these skills fit your local Year 6 curriculum.",
    sections: [
      {
        heading: "Find equivalent fractions",
        text: "Multiply both the numerator and denominator by the same non-zero number: 2/3 = 4/6 = 8/12. The number of parts changes, but the proportion of the whole stays the same. Sketch equal wholes to show why.",
      },
      {
        heading: "Compare and order",
        text: "To order 1/2, 2/3 and 3/4, use twelfths: 6/12, 8/12 and 9/12. Therefore 1/2 < 2/3 < 3/4. On a number line between zero and one, they appear in that order from left to right.",
      },
      {
        heading: "Use a hint before another attempt",
        text: "If a learner compares only the numerators, ask whether thirds and fourths are equal-sized parts. Then return to a visual model. Contact AttoLearn to confirm availability of validated fraction activities for the learner’s account.",
      },
    ],
  },
  "/equivalent-fractions-practice": {
    introduction:
      "Equivalent fractions describe the same amount using different numbers of equal parts. They refer to the same point on a number line when the whole is unchanged.",
    sections: [
      {
        heading: "See the same amount",
        text: "Shade one of two equal parts of a rectangle. Split each part in two without changing the rectangle. Two of the four equal parts are now shaded, showing why 1/2 = 2/4.",
      },
      {
        heading: "Work through an example",
        text: "To complete 3/5 = ?/20, notice that 5 × 4 = 20. Multiply the numerator by four too: 3 × 4 = 12. So 3/5 = 12/20. Multiplying only the denominator would change the fraction’s value.",
      },
      {
        heading: "Check understanding",
        text: "Ask whether 6/8 and 3/4 are equivalent and why. Dividing both numbers in 6/8 by two gives 3/4. A learner can also place both fractions at the same point on a number line. Confirm account coverage before expecting a particular interactive activity.",
      },
    ],
  },
  "/australian-curriculum-practice": {
    introduction:
      "Curriculum alignment needs more than a matching topic title. Check the curriculum version, year level, learning area and intended outcome behind an activity.",
    sections: [
      {
        heading: "Check the exact mapping",
        text: "Ask which Australian Curriculum version and content descriptions a practice set maps to. State and territory implementation may differ, so confirm the expectations used by your school or home-education programme.",
      },
      {
        heading: "Distinguish available from planned",
        text: "A coverage list should distinguish topics with validated learner-ready questions from planned topics and gaps. A subject or year-level label alone should not be read as complete coverage.",
      },
      {
        heading: "Ask for the current register",
        text: "Request the current AttoLearn coverage register before selecting practice for a required outcome. This page does not claim full Australian Curriculum coverage or endorsement by a curriculum authority.",
      },
    ],
  },
  "/international-curriculum-coverage": {
    introduction:
      "Learning ideas can be shared across countries, while curriculum expectations and year-level sequences differ. Check both the topic and its local mapping before relying on practice content.",
    sections: [
      {
        heading: "Country and curriculum",
        text: "Families in Australia, the United States, the United Kingdom, Canada, New Zealand and Singapore may follow different curricula. Confirm availability for the exact curriculum used by your learner; a country name does not establish that every subject is supported.",
      },
      {
        heading: "Specify the learner’s context",
        text: "Tell the team your country, curriculum or region, year or grade, and subject. A country selector or currency change does not by itself establish local curriculum coverage.",
      },
      {
        heading: "Confirm gaps before enrolling",
        text: "Ask which topics are validated, which are planned and which are unavailable. Review the mapping when a learner changes curriculum or country. Do not treat a shared topic name as proof of equivalent local requirements.",
      },
    ],
  },
  "/learning-progress-for-parents": {
    introduction:
      "Learning progress is easier to discuss when it is connected to specific evidence: what a learner attempted, how they explained it and where support helped.",
    sections: [
      {
        heading: "Look beyond one answer",
        text: "A correct answer can be a useful sign without proving lasting understanding. Look for explanations and evidence across attempts. A hint or a revision can show productive learning rather than failure.",
      },
      {
        heading: "Choose a manageable next step",
        text: "Discuss one useful focus with the learner or tutor. If a concept is difficult, a smaller step or another representation may be more helpful than simply increasing the number of questions.",
      },
      {
        heading: "Keep parents in control",
        text: "Check who can view your child’s learning information and how tutor access is granted or withdrawn. Ask about the currently available parent dashboard and reporting features before relying on a particular view.",
      },
    ],
  },
  "/adaptive-learning-for-struggling-students": {
    introduction:
      "When practice feels difficult, a smaller step, a clearer explanation or a break can help. Support should respond to the learner’s experience without attaching a label to the child.",
    sections: [
      {
        heading: "Make the next step achievable",
        text: "Identify where the learner became uncertain. Revisit a prerequisite idea, try another representation and offer one useful hint. Ask the learner to explain what changed before increasing difficulty.",
      },
      {
        heading: "Recognise effort and help-seeking",
        text: "Using a hint, asking a question or correcting an explanation can be worthwhile progress. Discuss these actions directly rather than ranking the learner or treating one score as a description of their ability.",
      },
      {
        heading: "Use support appropriately",
        text: "Learning software does not diagnose a condition or replace individual professional advice. Confirm which accessibility and support features are available, and involve a parent, tutor or appropriate professional when further support is needed.",
      },
    ],
  },
};
