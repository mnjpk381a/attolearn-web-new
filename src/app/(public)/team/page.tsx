"use client";

import Image from "next/image";
import { useState } from "react";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
  bio: string[];
};

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "farhan",
    name: "Farhan Jamil",
    role: "Chief Executive Officer - CEO",
    imageSrc: "/images/team-img/Atto-TFarhan.png",
    bio: [
      "An experienced Business Analyst, Project Manager, and Technology Consultant with over 22 years of experience working with government, semi-government, and private organisations. Has been part of project teams across diverse sectors, including Prisons, Police, Justice, Defence, Immigration, Health Insurance, Banking, and Mining.",
      "Demonstrated expertise in delivering digital transformations, migrations, integrated project delivery systems, biometric solutions, and ICT resources. Passionate about solving business problems using contemporary and easy-to-understand technological methods, always striving to achieve the best possible solutions within defined boundaries.",
      "An active fitness enthusiast who enjoys both indoor and outdoor activities, including but not limited to martial arts, gym workouts, hiking, trekking, boot camps, and long walks.",
    ],
  },
  {
    id: "toni",
    name: "Anthony Van Houtte",
    role: "Chief Operating Officer - COO",
    imageSrc: "/images/team-img/Atto-TToni.png",
    bio: [
      "Tony has spent most of his working life in operational leadership and management roles. He has held operational positions at Coca-Cola, Fonterra, and Orica, where he developed a deep understanding of large corporations and the key drivers behind their success.",
      "Beyond his corporate career, Tony has been heavily involved in the sports and fitness industry. He has participated as a player, coach, and instructor—bringing energy and motivation to himself and those around him.",
      "Passionate about operational management and the sport and fitness sector, Tony’s life goal is to live as long as possible. He believes that staying fit, eating well, and enjoying life are essential to achieving this. The Attobility Health and Wellbeing App plays an important role in supporting his journey towards this goal.",
    ],
  },
  {
    id: "naveed",
    name: "Muhammad Naveed-Ul-Hassan",
    role: "Chief Information Officer - CIO",
    imageSrc: "/images/team-img/Atto-TNaveed.png",
    bio: [
      "Accomplished Control Systems (Automation) Engineer with over 20 years of practical industrial automation experience across various industries such as Utilities, Food & Beverage, Transport, Electronic Print & Mail, and the Mining industry.",
      "Experienced in the application of a broad range of process control and optimization techniques, along with considerable project management within cost- and time-constrained environments. Skilled in team management and automation process analysis, with the ability to adopt methods, techniques, tools, and practices of evolved Systems Engineering.",
      "Apart from the above, an avid hiker with a passion for exploring local bushlands and scaling the local mountains within Western Australia to enjoy the eagle-eye view from the summit, while maintaining personal health and well-being.",
    ],
  },
  {
    id: "nauman-jamil",
    name: "Muhammad Nauman Jamil",
    role: "Chief Architect Officer - CAO",
    imageSrc: "/images/team-img/Atto-TMNauman.png",
    bio: [
      "An analytical and proactive Agile Project Manager with 20 years of experience in the IT industry. His expertise spans project management, team management, database management, server management, and software development. His technical experience includes work in security, ERP, client/server, desktop, web, and mobile applications using a variety of tools.",
      "Nauman has strong command over NextJS, React, React Native, Microsoft .NET technologies, SQL Server, MySQL, Web APIs, JavaScript, TypeScript, jQuery, CSS, SharePoint, Jira, Confluence, Figma, and many more.",
      "Outside of work, Nauman enjoys a game of badminton any day. He is also known as a leg-break googly bowler who can challenge and unsettle any batsman.",
    ],
  },
  {
    id: "darshak",
    name: "Darshak Merchant",
    role: "Chief Financial Officer - CFO",
    imageSrc: "/images/team-img/Atto-TDM.png",
    bio: [
      "I bring over 23 years of professional experience in business analysis, financial planning, project management, information management, and regulatory assurance. My career has spanned both the private and public sectors, including roles with global organizations such as ResMed and DiaSys Diagnostic Systems, as well as several Australian Government agencies, including Defence, Health, Immigration, and Foreign Affairs.",
      "Throughout my career, I have led complex initiatives, strengthened governance and control frameworks, and helped organizations build efficient and sustainable operating systems. This experience provides a strong foundation in strategic planning, financial oversight, risk management, and long-term business growth.",
      "Outside of work, I enjoy playing tennis and traveling to explore new places around the world.",
    ],
  },
  {
    id: "nauman-riaz",
    name: "Nauman Riaz",
    role: "Chief Technology Officer - CTO",
    imageSrc: "/images/team-img/Atto-TNR.png",
    bio: [
      "An experienced telecommunications and ICT professional with 18 years of progressive experience, marked by continual advancement through diverse leadership and management roles. He excels at driving innovation and delivering differentiated solutions that produce tangible business results while ensuring an exceptional customer experience.",
      "Results-driven, Nauman has a proven track record in leadership and technology development. He has held leadership roles at NBN and Telstra, spanning engineering, program management, and strategy across technology, business, and wholesale markets.",
      "Outside of work, Nauman enjoys learning and experimenting with ethical hacking, penetration testing, vulnerability management, and network security. He is also passionate about blockchain, AI, and Web 3.0, and never misses a new theatrical release.",
    ],
  },
  {
    id: "vannee",
    name: "Vannee Varojananuluck",
    role: "Director of Business Expansion – Southeast Asia",
    imageSrc: "/images/team-img/Atto-TWani.png",
    bio: [
      "Vannee is a graduate of Wichita State University, Kansas, USA, with a major in International Marketing and Finance. She has owned travel services for over 20 years. In parallel, she has been running businesses that supply IT hardware and software products to the Thai market for over two decades.",
      "Vannee has expertise in helping set up startups for success in the IT sector. With comprehensive knowledge in IT and various Asian languages, she aims to help Attobility expand its wings in the Asian markets.",
    ],
  },
  {
    id: "abhinav",
    name: "Abhinav Chhikara",
    role: "Director Product Development",
    imageSrc: "/images/team-img/Atto-TAbhi.png",
    bio: [
      "Abhinav is an agile professional with a strong blend of analytical and creative abilities. He has worked with Apple, Millennium Group of Hotels, and GE Money in the past.",
      "With vast experience in the hospitality industry, he has developed his skills in building solid relationships with customers, vendors, and distributors. He is a natural sales and marketing professional with a dynamic personality and excellent communication skills.",
      "Having evolved into a product leadership role, he possesses deep expertise in translating customer needs into innovative product solutions, optimizing cross-functional collaboration, and driving the entire product lifecycle—from ideation to launch. His strategic vision and execution acumen enable him to identify high-impact opportunities that align with business goals and customer value.",
      "Outside of work, Abhinav is passionate about badminton, swimming, and mountain biking.",
    ],
  },
  {
    id: "sana",
    name: "Sana Irshad",
    role: "Director Creative Design",
    imageSrc: "/images/team-img/Atto-TSanaN.png",
    bio: [
      "Sana is an artist, a seasoned creative director, and a co-founder of Attobility. With a Master of Fine Arts, she has the ability to visualize concepts by hand or with computer software, and execute original content by determining the ideal usage of color, text, font style, imagery, and layout.",
      "With thirteen years of professional experience in design software—including Illustrator, InDesign, Photoshop, and Figma—she consistently delivers creative solutions for visually based problems or needs. She excels at thinking critically, communicating effectively, and developing innovative graphic designs for a wide range of projects that align with business goals.",
      "Her expertise spans brand identity and environments, digital transformations, and innovative creative services for tech-based startups.",
    ],
  },
  {
    id: "hina",
    name: "Hina Chaudhry",
    role: "Head of Corporate Governance and Human Resource Management",
    imageSrc: "/images/team-img/Atto-THina.png",
    bio: [
      "A multi-faceted professional and an aspiring policy researcher with more than 10 years of experience in corporate governance, compliance, and financial & managerial audits across government, educational institutions, non-profits, and private industries.",
      "She has developed adept skills in policy analysis, negotiation, communication, team management, risk assessment, and delivering flawless presentations. While working with multiple industries, Hina has traveled through Asia, the Americas, Europe, and Australasia, boosting her passion to connect international boundaries.",
      "She also has a passion for staying fit, eating clean, and becoming a professional without borders.",
    ],
  },
  {
    id: "zulqarnain",
    name: "Muhammad Zulqarnain Khan",
    role: "Strategic Advisor - Pakistan",
    imageSrc: "/images/team-img/Atto-THzain.png",
    bio: [
      "I am a seasoned financial and business professional with over 23 years of experience in financial management, strategic planning, and organizational development. My expertise includes budgeting, forecasting, fund acquisition, actuarial analysis, and resource planning across a wide range of business environments.",
      "Over the years, I have worked closely with start-up organizations, helping them establish sound processes and sustainable growth strategies. I enjoy collaborating with cross-functional teams to improve efficiency, strengthen operations, and turn strategic ideas into practical results.",
      "My experience and market insight support Attobility’s strategic growth and partnerships in Pakistan.",
    ],
  },
  {
    id: "mahwish",
    name: "Mahwish Naveed-ul- Hassan",
    role: "Global Customer Care Director",
    imageSrc: "/images/team-img/Atto-TMahwish.png",
    bio: [
      "Mahwish Naveed-ul-Hassan brings extensive experience in customer relationship management, banking, and service excellence, supported by her MBA qualification. Throughout her career, she has developed a strong reputation for understanding client needs, building lasting relationships, and delivering practical solutions with professionalism and empathy.",
      "Her approach to customer care is grounded in trust, responsiveness, and a genuine commitment to helping clients succeed. She is passionate about creating positive experiences and ensuring that every interaction reflects the highest standards of service and support.",
      "Her leadership helps ensure that Attobility delivers a customer experience defined by professionalism, reliability, and care.",
    ],
  },
  {
    id: "bilal",
    name: "Bilal Basheer",
    role: "Senior Software Engineer",
    imageSrc: "/images/team-img/Atto-TBilal.png",
    bio: [
      "Bilal is a senior full-stack software developer with over five years of development experience in the IT industry. He has worked on dynamic projects across all stages of the development cycle, making him well-rounded and capable of handling any challenge that comes his way.",
      "Beyond his professional life, he is passionate about training plans and helping others achieve their fitness goals. He enjoys organizing meetups and supporting people in discovering who they are and what they want to accomplish.",
    ],
  },
  {
    id: "shahid",
    name: "Muhammad Shahid",
    role: "Senior Testing Analyst",
    imageSrc: "/images/team-img/Atto-TMShahid.png",
    bio: [
      "System Engineer with over 16 years of experience, contributing significantly to corporate strategy and continuously enhancing technical knowledge. Specializes in front-end development with expertise across multiple software disciplines.",
      "Experienced in all stages of the development cycle for dynamic web and desktop projects. Well-versed in numerous programming languages and technologies, including HTML, C# .NET, ASP.NET, MVC, JavaScript, CSS, MySQL, React Native mobile development, and Android Studio.",
    ],
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getPreviewText(bio: string[]) {
  const preview = bio[0] ?? "";

  if (preview.length <= 220) {
    return preview;
  }

  return `${preview.slice(0, 217).trimEnd()}...`;
}

const leadershipCount = TEAM_MEMBERS.filter((member) =>
  member.role.includes("Chief"),
).length;

const directorCount = TEAM_MEMBERS.filter((member) =>
  member.role.includes("Director"),
).length;

export default function TeamPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="pt-16 sm:pt-20">
        <div className="mx-auto max-w-6xl px-4">
          {/* Title */}
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-extrabold text-[#007381] sm:text-3xl">
              Team
            </h2>
            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              The experts driving innovation forward
            </p>
          </div>{" "}
        </div>
      </section>

      <section className="mx-auto max-w-6xl p-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:auto-rows-fr">
          {TEAM_MEMBERS.map((member) => {
            const isExpanded = expandedId === member.id;
            const bioId = `team-bio-${member.id}`;

            return (
              <article
                key={member.id}
                className={cn(
                  "flex h-full flex-col rounded-3xl border bg-white p-5 shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:p-6",
                  isExpanded
                    ? "border-[#0c7a84]/30 shadow-md"
                    : "border-slate-200",
                )}
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:mx-0 sm:h-32 sm:w-32">
                    <Image
                      src={member.imageSrc}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 112px, 128px"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#0c7a84]/70">
                      Team Member
                    </p>

                    <h3 className="mt-2 text-xl font-bold text-slate-900">
                      {member.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-[#0c7a84]">
                      {member.role}
                    </p>

                    <div
                      id={bioId}
                      className="mt-4 text-sm leading-7 text-slate-600"
                    >
                      {isExpanded ? (
                        member.bio.map((paragraph, index) => (
                          <p
                            key={`${member.id}-${index}`}
                            className={cn(index > 0 && "mt-3")}
                          >
                            {paragraph}
                          </p>
                        ))
                      ) : (
                        <p>{getPreviewText(member.bio)}</p>
                      )}
                    </div>

                    <button
                      type="button"
                      aria-controls={bioId}
                      aria-expanded={isExpanded}
                      onClick={() =>
                        setExpandedId((currentId) =>
                          currentId === member.id ? null : member.id,
                        )
                      }
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 transition hover:text-sky-700 hover:underline"
                    >
                      {isExpanded ? "Read Less ↑" : "Read More →"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0c7a84]/70">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
    </div>
  );
}
