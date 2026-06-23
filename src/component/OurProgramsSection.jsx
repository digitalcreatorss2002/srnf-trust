import React from "react";
import { Link } from "react-router-dom";

const OurProgramsSection = () => {
  const staticPrograms = [
    {
      id: 1,
      title: "Digital Literacy BootCamp",
      description: "Learn the core essentials of computing, internet safety, and essential professional digital productivity tools to advance your career.",
      image_url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600",
      slug: "digital-literacy-bootcamp"
    },
    {
      id: 2,
      title: "Advanced Web Development",
      description: "Master modern frontend and backend frameworks including React, Node.js, and cloud deployments with hands-on real-world production projects.",
      image_url: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600",
      slug: "advanced-web-development"
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      description: "Understand user psychology, wireframing, high-fidelity prototyping, and design systems using Figma to build beautiful digital interfaces.",
      image_url: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?q=80&w=600",
      slug: "ui-ux-design-masterclass"
    },
    {
      id: 4,
      title: "Cloud Infrastructure & DevOps",
      description: "Scale applications effortlessly using Docker, Kubernetes, AWS ecosystems, and automated CI/CD deployment pipelines for modern tech workflows.",
      image_url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600",
      slug: "cloud-infrastructure-devops"
    }
  ];

  return (
    <section className="py-10 bg-bg-color">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-serif text-text-primary mb-12">
          Our Programs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {staticPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-xl border border-gray-100 text-left hover:shadow-lg transition-shadow overflow-hidden flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={program.image_url}
                  alt={program.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/800x500?text=Image+Not+Found";
                  }}
                />
              </div>

              <div className="p-6 grow flex flex-col">
                <h3 className="text-xl font-serif font-bold text-text-primary mb-3 leading-tight">
                  {program.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6 grow">
                  {program.description && program.description.length > 100
                    ? `${program.description.slice(0, 100)}...`
                    : program.description}
                </p>

                <Link
                  to={`/programdetails/${program.slug}`}
                  className="bg-primary hover:bg-[#5a6425] text-white px-6 py-2 rounded-full font-medium text-sm transition-colors self-start mt-auto inline-block"
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/programs"
            className="inline-block border border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-colors"
          >
            View All Programs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurProgramsSection;