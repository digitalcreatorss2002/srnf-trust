import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// 🔥 1. STATIC CENTRAL DATABASE (यहाँ आप अपने सारे प्रोग्राम्स की पूरी डिटेल्स मैनेज कर सकते हैं)
const STATIC_PROGRAMS_DATA = [
  {
    slug: "smart-classroom-initiative",
    title: "Smart Classroom Initiative",
    icon: "🎓",
    status: "active",
    beneficiaries: "12,000+",
    regions: "4 States",
    location: "Rural Schools",
    cost: "₹15,00,000",
    description: "Equipping rural public schools with multimedia projectors, digital content packs, and fundamental teacher training modules to improve overall student engagement.\nOur primary goal is to bridge the massive digital divide that exists between urban private academies and village public schools. By embedding modern technology directly into daily pedagogical setups, we keep school dropouts at an all-time low.",
    activities: "Installation of Android-based Smart Projectors.\nDistribution of localized K-12 multimedia curriculum content offline.\nConducting quarterly digital teaching capability workshops for rural staff.\nContinuous operational monitoring and hardware maintenance cycles.",
    achievements: "Successfully transformed 150+ traditional classrooms into active smart hubs.\nRecorded a measurable 35% spike in daily class attendance ratios.\nEmpowered over 400+ village school teachers with standard digital tooling.",
    goal: "We aim to expand our digital footprint and ensure that the modern tech setups of this initiative reach every block-level public school by late 2027.",
    images: [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1200",
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1200"
    ]
  },
  {
    slug: "advanced-web-development",
    title: "Advanced Web Development",
    icon: "💻",
    status: "active",
    beneficiaries: "1,500+",
    regions: "Online/Offline",
    location: "Tech Centers",
    cost: "Free Bootcamp",
    description: "Master modern frontend and backend frameworks including React, Node.js, and cloud deployments with hands-on real-world production projects.\nThis comprehensive program focuses heavily on industrial engineering standards, ensuring that trainees from non-traditional academic streams transition smoothly into high-paying engineering roles within short timeframes.",
    activities: "Daily active code review sessions under senior developer guidance.\nBuilding and hosting fullstack projects to production-grade cloud services.\nWeekly automated engineering assessment runs and structural tracking.",
    achievements: "Over 85% of graduates landed core software roles within 90 days.\nPartnered with 40+ high-growth tech companies for direct hiring tracks.",
    goal: "To transform promising learners into absolute production-ready tech resources globally.",
    images: [
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200"
    ]
  }
];

const ProgramDetails = () => {
  const { slug } = useParams();

  const [program, setProgram] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  // स्क्रीन स्क्रॉल पोजीशन को टॉप पर रीसेट करना
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // 🔥 2. STATIC LOGIC FOR FINDING MATCHING DATA VIA SLUG
  useEffect(() => {
    setLoading(true);
    const foundProgram = STATIC_PROGRAMS_DATA.find((item) => item.slug === slug);
    
    if (foundProgram) {
      setProgram(foundProgram);
    } else {
      setProgram(null);
    }
    setLoading(false);
  }, [slug]);

  // 🔥 3. AUTOMATIC SLIDESHOW TIMER CAROUSEL
  useEffect(() => {
    setCurrentImage(0);
    if (!program || !program.images?.length) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) =>
        prev === program.images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [program]);

  // 4. LOADING RENDER STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-color">
        <div className="text-xl font-bold text-primary animate-pulse">
          Loading program details...
        </div>
      </div>
    );
  }

  // 5. DATA ERROR/NOT FOUND RENDER STATE
  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-color px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-3 text-red-500">
            Program not found
          </h2>
          <p className="text-gray-600 mb-6">
            The program you are looking for does not exist in our system.
          </p>
          <Link
            to="/programs"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold transition-all hover:bg-opacity-90"
          >
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-color min-h-screen">
      
      {/* HERO SECTION */}
      <section className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            {program.icon || "📌"} {program.slug}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            {program.title}
          </h1>

          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Learn how we are making a difference through our{" "}
            {program.title.toLowerCase()} initiatives.
          </p>
        </div>
      </section>

      {/* IMAGE CAROUSEL SECTION */}
      <section className="max-w-7xl mx-auto px-4 -mt-10">
        <div className="relative h-100 md:h-175 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-gray-200">
          {program.images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={img}
                alt={`${program.title} ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/1200x800?text=Image+Not+Found";
                }}
              />
            </div>
          ))}

          {/* Floating Status Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {program.status || "active"}
            </span>
          </div>

          {/* Carousel Control Dots */}
          {program.images.length > 1 && (
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
              {program.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentImage(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImage ? "w-8 bg-white" : "w-2 bg-white/50"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MAIN CONTENT BLOCK */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Side Bar Info Block */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 bg-gradient-to-b from-white to-gray-50/50">
              <h3 className="text-lg font-serif font-bold text-text-primary mb-4 border-b pb-2">
                Impact Summary
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Beneficiaries</p>
                    <p className="text-primary font-bold">{program.beneficiaries || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Active Regions</p>
                    <p className="text-primary font-bold">{program.regions || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-2xl">🗺️</span>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold">Location</p>
                    <p className="text-primary font-bold">{program.location || "N/A"}</p>
                  </div>
                </div>

                {program.cost && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold">Total Budget</p>
                      <p className="text-primary font-bold">{program.cost}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Link
              to="/donate"
              className="block w-full bg-secondary hover:bg-secondary/90 text-white text-center py-4 rounded-xl font-bold transition-all shadow-md"
            >
              Support This Program
            </Link>
          </div>

          {/* Primary Descriptive Area */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-serif text-text-primary mb-6">
              About the Program
            </h2>

            <div className="prose prose-lg text-gray-600 max-w-none">
              {(program.description || "")
                .split("\n")
                .map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed text-gray-600">
                    {paragraph}
                  </p>
                ))}
            </div>

            {/* Key Activities Block */}
            {program.activities && (
              <div className="mt-12">
                <h3 className="text-2xl font-serif text-text-primary mb-6 flex items-center gap-3 border-b pb-4 border-gray-100">
                  <div className="bg-blue-50 p-2 rounded-lg text-blue-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                  </div>
                  Key Activities
                </h3>
                <div className="flex flex-col gap-4">
                  {program.activities.split("\n").filter(a => a.trim()).map((act, i) => (
                    <div key={i} className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-start gap-4">
                      <div className="mt-1 bg-green-100 text-primary w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm font-bold shadow-inner">✓</div>
                      <p className="text-gray-700 leading-relaxed flex-1">{act}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Program Achievements Block */}
            {program.achievements && (
              <div className="mt-12">
                <h3 className="text-2xl font-serif text-text-primary mb-6 flex items-center gap-3 border-b pb-4 border-gray-100">
                  <div className="bg-orange-50 p-2 rounded-lg text-orange-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                  </div>
                  Program Achievements
                </h3>
                <div className="space-y-4">
                  {program.achievements.split("\n").filter(a => a.trim()).map((ach, i) => (
                    <div key={i} className="group relative bg-white border border-gray-100 p-5 rounded-xl shadow-sm hover:border-yellow-200 hover:bg-yellow-50/30 transition-all font-medium text-gray-700 flex items-center gap-5">
                      <div className="bg-yellow-100 text-yellow-600 w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xl group-hover:scale-110 transition-transform shadow-sm">🏆</div>
                      <p className="flex-1 leading-relaxed">{ach}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Program Absolute Goal Banner */}
            {(program.goal || program.title) && (
              <div className="mt-12 mb-4 relative bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8 shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <span className="text-8xl font-serif">"</span>
                </div>
                <div className="relative z-10 flex gap-4">
                  <div className="w-1.5 rounded-full bg-primary shrink-0"></div>
                  <div>
                    <h3 className="font-serif text-primary font-bold mb-3 tracking-wide uppercase text-sm">Program Goal</h3>
                    <p className="text-gray-800 text-xl font-serif italic leading-relaxed">
                      {program.goal}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* FOOTER DIRECTORY REDIRECT */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-medium"
          >
            <span>←</span> Back to All Programs
          </Link>
        </div>
      </section>

    </div>
  );
};

export default ProgramDetails;