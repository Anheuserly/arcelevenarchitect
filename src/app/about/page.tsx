import React from "react";

// Lucide icons
import {
  Target,
  Eye,
  Lightbulb,
  Award,
  Users,
} from "lucide-react";

export const metadata = {
  title: "About Us - ARC 11 ARCHITECT",
  description:
    "ARC 11 ARCHITECT is a creative architecture studio crafting thoughtful and innovative design solutions. Since 2021, we’ve specialized in architecture, construction, and interior design, delivering modern spaces that balance aesthetics with functionality across Chhatarpur, New Delhi.",
  alternates: { canonical: "https://www.arcelevenarchitect.com/about" },
};

// ===================== PAGE =====================

export default function Page() {
  const hoverEffect =
    "transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl";
  const accentColor = "text-slate-700";
  const primaryText = "text-gray-800";
  const secondaryText = "text-gray-600";

  return (
    <div className="min-h-screen bg-slate-50 py-16 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ---------------- Header ---------------- */}
        <div className="text-center mb-16">
          <p className={`text-sm font-semibold uppercase tracking-widest mb-2 ${accentColor}`}>
            Our Foundation
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            ARC 11 ARCHITECT
          </h1>
          <p className={`mt-4 max-w-3xl mx-auto text-xl leading-relaxed ${secondaryText}`}>
            We create inspired, sustainable, and functional spaces that define the future of design.
          </p>
        </div>

        {/* ---------------- Introduction ---------------- */}
        <div className="max-w-4xl mx-auto mb-20 p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
          <p className={`text-lg leading-relaxed ${primaryText} mb-6`}>
            ARC 11 ARCHITECT is a creative architecture studio dedicated to
            crafting thoughtful and innovative design solutions. Since 2015, we’ve
            specialized in{" "}
            <strong className={accentColor}>architecture, construction, and interior design</strong>,
            delivering modern spaces that balance striking aesthetics with practicality.
          </p>
          <p className={`text-lg leading-relaxed ${primaryText}`}>
            Passionate about creating environments that reflect your vision, we
            focus on quality, detail, and timeless design. Serving the{" "}
            <strong className={accentColor}>Chhatarpur area of New Delhi</strong>,
            we are committed to bringing your architectural dreams to life.
          </p>
        </div>

        {/* ---------------- Mission & Vision ---------------- */}
        <div className="grid gap-8 md:grid-cols-2 mb-20">

          {/* Mission */}
          <div className={`bg-white rounded-2xl shadow-lg p-10 ${hoverEffect} border-t-4 border-slate-700`}>
            <Target className={`w-8 h-8 mb-4 ${accentColor}`} />
            <h2 className={`text-3xl font-bold mb-4 ${primaryText}`}>Our Mission</h2>
            <p className={`${secondaryText} leading-7`}>
              To design and deliver innovative spaces that seamlessly integrate
              aesthetics with functionality while prioritizing sustainability and
              client satisfaction.
            </p>
          </div>

          {/* Vision */}
          <div className={`bg-white rounded-2xl shadow-lg p-10 ${hoverEffect} border-t-4 border-slate-700`}>
            <Eye className={`w-8 h-8 mb-4 ${accentColor}`} />
            <h2 className={`text-3xl font-bold mb-4 ${primaryText}`}>Our Vision</h2>
            <p className={`${secondaryText} leading-7`}>
              To be recognized as a leading architecture studio in New Delhi,
              setting benchmarks in creativity, innovation, and excellence.
            </p>
          </div>

        </div>

        {/* ---------------- Core Principles ---------------- */}
        <div className="mt-16 text-center">
          <h2 className={`text-4xl font-bold mb-4 ${primaryText}`}>Core Principles</h2>
          <p className={`text-lg mb-12 max-w-2xl mx-auto ${secondaryText}`}>
            The foundational values that guide every blueprint and design decision.
          </p>

          <div className="grid gap-8 md:grid-cols-3">

            {/* Innovation */}
            <div className={`p-8 rounded-2xl border-2 border-slate-100 ${hoverEffect} bg-white shadow-md`}>
              <Lightbulb className={`w-10 h-10 mx-auto mb-4 ${accentColor}`} />
              <h3 className={`text-xl font-semibold mb-2 ${primaryText}`}>Innovation</h3>
              <p className={`${secondaryText} leading-6`}>
                We embrace creativity and cutting-edge design approaches to deliver unique, modern solutions.
              </p>
            </div>

            {/* Excellence */}
            <div className={`p-8 rounded-2xl border-2 border-slate-100 ${hoverEffect} bg-white shadow-md`}>
              <Award className={`w-10 h-10 mx-auto mb-4 ${accentColor}`} />
              <h3 className={`text-xl font-semibold mb-2 ${primaryText}`}>Excellence</h3>
              <p className={`${secondaryText} leading-6`}>
                We maintain high standards in design, execution, and client relationships.
              </p>
            </div>

            {/* Collaboration */}
            <div className={`p-8 rounded-2xl border-2 border-slate-100 ${hoverEffect} bg-white shadow-md`}>
              <Users className={`w-10 h-10 mx-auto mb-4 ${accentColor}`} />
              <h3 className={`text-xl font-semibold mb-2 ${primaryText}`}>Collaboration</h3>
              <p className={`${secondaryText} leading-6`}>
                We collaborate closely with clients and partners because the best designs are built together.
              </p>
            </div>

          </div>
        </div>

        {/* ---------------- Team ---------------- */}
        <section className="text-center mt-20 pt-16 border-t border-gray-200">
          <h2 className={`text-4xl font-bold mb-3 ${primaryText}`}>Meet Our Dedicated Team</h2>
          <p className={`text-lg mb-12 ${secondaryText}`}>
            The creative minds and skilled professionals shaping ARC 11 ARCHITECT.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 justify-items-center">

            <TeamCard initials="SS" name="Shashank Saini" role="Founder" />

            <TeamCard initials="US" name="Ujjwal Sinha" role="Co-Founder" subtitle="Architect" />

            <TeamCard initials="AK" name="A.K Saini" role="Company Head" subtitle="Leadership" highlight />

            <TeamCard initials="SL" name="Sohel Latif" role="Partner" subtitle="Management" />

            <TeamCard initials="SH" name="Shrishti" role="Creative Team Head" subtitle="Creative" />

            <TeamCard initials="CH" name="Chand" role="Woodwork Head" subtitle="Craftsmanship" />

            <TeamCard initials="RJ" name="Rajeev" role="Head Painter" subtitle="Finishing" />

            <TeamCard initials="MK" name="Mukesh Kumar" role="Accountant" subtitle="Operations" />

          </div>
        </section>
      </div>
    </div>
  );
}

// ===================== TEAM COMPONENT (FIXED TS) =====================

type TeamCardProps = {
  initials: string;
  name: string;
  role: string;
  subtitle?: string;    // optional
  highlight?: boolean;  // optional
};

function TeamCard({ initials, name, role, subtitle, highlight }: TeamCardProps) {
  const hoverEffect =
    "transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl";

  return (
    <div
      className={`bg-white rounded-2xl shadow-lg p-6 w-full max-w-xs ${hoverEffect} ${
        highlight ? "border-b-4 border-slate-700" : ""
      }`}
    >
      <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-200 transition-colors">
        <img
          src={`https://placehold.co/120x120/E0E7FF/4338CA?text=${initials}`}
          alt={name}
          width={120}
          height={120}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {subtitle && (
        <p className="text-sm font-bold uppercase text-slate-700 mb-1">{subtitle}</p>
      )}

      <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-slate-500 text-base">{role}</p>
    </div>
  );
}
