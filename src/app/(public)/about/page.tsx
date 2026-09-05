import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative flex min-h-100 items-center justify-center text-center text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/About/about-hero.jpg"
            alt="AttoLearn"
            fill
            priority
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <h1 className="text-center text-4xl font-bold text-white">
            Empowering Schools to Teach, Manage, and Grow
          </h1>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-center text-2xl font-bold text-teal-700">
          About AttoLearn
        </h3>

        <p className="mt-6 text-base leading-relaxed text-gray-700">
          AttoLearn is a modern education platform designed to simplify how
          schools operate and how teachers deliver learning. It combines
          powerful tools for exam creation, school management, and academic
          insights into one intuitive system.
        </p>

        <p className="mt-4 text-base leading-relaxed text-gray-700">
          From generating exam papers to managing students, attendance, and
          reporting, AttoLearn helps schools streamline everyday operations
          while supporting a better learning experience.
        </p>

        <p className="mt-4 text-base leading-relaxed text-gray-700">
          Our goal is simple: help schools focus on education while technology
          takes care of the rest.
        </p>
      </section>

      {/* Idea */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h3 className="text-center text-2xl font-bold text-teal-700">
            The Idea Behind AttoLearn
          </h3>

          <p className="mt-6 text-base leading-relaxed text-gray-700">
            Schools today face increasing administrative and academic demands.
            Teachers spend hours preparing exam papers, administrators manage
            multiple disconnected systems, and valuable time is lost on manual
            processes.
          </p>

          <p className="mt-4 text-base leading-relaxed text-gray-700">
            AttoLearn was created to address these challenges.
          </p>

          <p className="mt-4 text-base leading-relaxed text-gray-700">
            By combining exam generation, academic management, and operational
            tools, the platform helps schools simplify complex workflows while
            improving efficiency across the institution.
          </p>

          <ul className="mt-6 list-disc space-y-3 pl-6">
            <li className="text-base text-gray-700">
              Teachers can generate exam papers within minutes.
            </li>

            <li className="text-base text-gray-700">
              Administrators can manage operations through a centralized
              dashboard.
            </li>

            <li className="text-base text-gray-700">
              Students and parents stay informed through structured
              communication and reporting.
            </li>
          </ul>

          <p className="mt-6 text-base leading-relaxed text-gray-700">
            The result is a system that supports both teaching and school
            operations in a practical and scalable way.
          </p>
        </div>
      </section>

      {/* What AttoLearn Offers */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-center text-2xl font-bold text-teal-700">
          What AttoLearn Offers
        </h3>

        <p className="mt-6 text-base leading-relaxed text-gray-700">
          AttoLearn brings together essential academic and administrative
          capabilities within one integrated platform.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-teal-700 p-6">
            <h4 className="text-center text-lg font-semibold text-teal-700">
              Paper Generator
            </h4>

            <p className="mt-3 text-base text-gray-700">
              Create curriculum-aligned exam papers and quizzes instantly using
              a structured question bank and intelligent generation tools.
            </p>
          </div>

          <div className="rounded-xl border border-teal-700 p-6">
            <h4 className="text-center text-lg font-semibold text-teal-700">
              School Management System
            </h4>

            <p className="mt-3 text-base text-gray-700">
              Manage admissions, attendance, student records, fees, scheduling,
              and reporting through a centralized dashboard designed
              specifically for schools.
            </p>
          </div>

          <div className="rounded-xl border border-teal-700 p-6">
            <h4 className="text-center text-lg font-semibold text-teal-700">
              Academic Assessments
            </h4>

            <p className="mt-3 text-base text-gray-700">
              Track academic progress, generate performance reports, and gain
              insights into student learning outcomes.
            </p>
          </div>

          <div className="rounded-xl border border-teal-700 p-6">
            <h4 className="text-center text-lg font-semibold text-teal-700">
              Communication & Collaboration
            </h4>

            <p className="mt-3 text-base text-gray-700">
              Enable communication between teachers, administrators, students,
              and parents through secure notifications and messaging.
            </p>
          </div>
        </div>

        <p className="mt-10 text-base leading-relaxed text-gray-700">
          Together, these capabilities create a system that supports both the
          academic and operational needs of modern schools.
        </p>
      </section>

      {/* Why Schools Choose AttoLearn */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h3 className="text-center text-2xl font-bold text-teal-700">
            Why Schools Choose AttoLearn
          </h3>

          <p className="mt-6 text-base leading-relaxed text-gray-700">
            Schools adopt AttoLearn because it addresses real educational
            challenges while remaining simple to use.
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-teal-700 bg-white p-6">
              <h4 className="text-center text-lg font-semibold text-teal-700">
                Save Time for Teachers
              </h4>

              <p className="mt-3 text-base text-gray-700">
                Exam papers, quizzes, and assessments can be generated quickly,
                allowing teachers to spend more time on teaching rather than
                preparation.
              </p>
            </div>

            <div className="rounded-xl border border-teal-700 bg-white p-6">
              <h4 className="text-center text-lg font-semibold text-teal-700">
                Simplify School Operations
              </h4>

              <p className="mt-3 text-base text-gray-700">
                Admissions, attendance, reporting, and fee management are
                unified in a single platform.
              </p>
            </div>

            <div className="rounded-xl border border-teal-700 bg-white p-6">
              <h4 className="text-center text-lg font-semibold text-teal-700">
                Designed for Educators
              </h4>

              <p className="mt-3 text-base text-gray-700">
                The platform is built around everyday school workflows, ensuring
                that it is intuitive and practical for teachers and
                administrators.
              </p>
            </div>

            <div className="rounded-xl border border-teal-700 bg-white p-6">
              <h4 className="text-center text-lg font-semibold text-teal-700">
                Built for Growth
              </h4>

              <p className="mt-3 text-base text-gray-700">
                Whether a school serves a few hundred students or operates
                multiple campuses, AttoLearn can scale with its needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Designed for the Real Needs of Schools */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-center text-2xl font-bold text-teal-700">
          Designed for the Real Needs of Schools
        </h3>

        <p className="mt-6 text-base leading-relaxed text-gray-700">
          AttoLearn is designed with the realities of educational institutions
          in mind.
        </p>

        <p className="mt-4 text-base leading-relaxed text-gray-700">
          Schools need technology that is reliable, easy to adopt, and adaptable
          to different administrative structures. The platform therefore focuses
          on:
        </p>

        <ul className="mt-6 list-disc space-y-3 pl-6">
          <li className="text-base text-gray-700">
            Simple onboarding and configuration
          </li>

          <li className="text-base text-gray-700">
            Cloud-based access from any device
          </li>

          <li className="text-base text-gray-700">
            Secure and scalable infrastructure
          </li>

          <li className="text-base text-gray-700">
            Flexible modules for different school sizes
          </li>

          <li className="text-base text-gray-700">
            Practical tools that reduce administrative workload
          </li>
        </ul>

        <p className="mt-6 text-base leading-relaxed text-gray-700">
          This ensures that schools can adopt the platform without disrupting
          their existing academic environment.
        </p>
      </section>

      {/* Built on Attobility Technology */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h3 className="text-center text-2xl font-bold text-teal-700">
            Built on Attobility Technology
          </h3>

          <p className="mt-6 text-base leading-relaxed text-gray-700">
            AttoLearn is developed and powered by Attobility, a technology
            company dedicated to building digital platforms that simplify
            operations and empower service providers.
          </p>

          <p className="mt-4 text-base leading-relaxed text-gray-700">
            Attobility develops solutions across multiple industries, while
            AttoLearn represents its focused initiative to support the education
            sector through practical and innovative technology.
          </p>

          <p className="mt-4 text-base leading-relaxed text-gray-700">
            This foundation ensures that AttoLearn benefits from strong
            engineering capabilities, reliable infrastructure, and a long-term
            vision for platform growth.
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h3 className="text-center text-2xl font-bold text-teal-700">
          Our Approach
        </h3>

        <p className="mt-6 text-base leading-relaxed text-gray-700">
          At AttoLearn, we believe technology should support education rather
          than complicate it.
        </p>

        <p className="mt-4 text-base leading-relaxed text-gray-700">
          Our approach focuses on creating tools that are intuitive, practical,
          and aligned with the real needs of educators. By working closely with
          schools and understanding classroom realities, we continually refine
          the platform to deliver meaningful improvements in efficiency and
          learning outcomes.
        </p>

        <p className="mt-4 text-base leading-relaxed text-gray-700">
          Every feature is designed with one goal in mind: making education
          management simpler and more effective.
        </p>
      </section>

      {/* Vision */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h3 className="text-center text-2xl font-bold text-teal-700">
            Our Vision
          </h3>

          <p className="mt-6 text-base leading-relaxed text-gray-700">
            Our vision is to build a trusted platform that helps schools operate
            efficiently while supporting better teaching and learning
            experiences.
          </p>

          <p className="mt-4 text-base leading-relaxed text-gray-700">
            We aim to empower educators with technology that reduces
            administrative complexity, improves academic processes, and
            strengthens the connection between schools, teachers, students, and
            parents.
          </p>

          <p className="mt-4 text-base leading-relaxed text-gray-700">
            By combining thoughtful design with continuous innovation, AttoLearn
            seeks to become a platform that schools rely on to manage education
            with confidence.
          </p>
        </div>
      </section>
    </div>
  );
}
