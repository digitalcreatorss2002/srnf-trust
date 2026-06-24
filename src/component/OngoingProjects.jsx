import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const defaultProjects = [
  {
    id: 1,
    tag: "AGRICULTURE",
    title: "3-Day Farmer Training Program on Climate-Resilient & Multi-Cropping",
    description: "The 3-Day Farmer Training Programme on Climate-Resilient & Multi-Cropping Agriculture is a large-scale capacity-building initiative.",
    locations: "Haryana, Rajasthan, Uttar Pradesh, Gujarat",
    image: "hero/banner1.png",
    link: "/projectdetails/3-day-farmer-training-program"
  }
];

const OngoingProjects = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects.php`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === "success" && Array.isArray(resData.data)) {
          const formatted = resData.data.map((project) => {
            const finalImg = getImageUrl(project.image_url);

            return {
              id: project.id,
              tag: project.category,
              title: project.title,
              description: project.description,
              locations: project.location,
              image: finalImg,
              link: `/projectdetails/${project.slug}`,
            };
          });
          setProjectsList(formatted);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects rows:", err);
        setLoading(false);
      });
  }, []);

  const projectsData = projectsList.length > 0 ? projectsList : defaultProjects;

  useEffect(() => {
    if (isPaused || projectsData.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === projectsData.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, projectsData.length]);

  if (loading) return <div className="w-full py-20 text-center text-white bg-gray-950 font-bold">Loading Projects Matrix...</div>;

  return (
    <section className="relative w-full min-h-[500px] py-15 px-6 sm:px-10 lg:px-16 flex items-center justify-center overflow-hidden bg-gray-950">
      {projectsData.map((project, index) => (
        <div
          key={`bg-${project.id}`}
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out transform ${
            index === current ? "opacity-30 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(4px)",
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-[#E56D37]/60 via-[#2d3748]/40 to-black/70 z-0" />

      <div className="relative max-w-6xl w-full mx-auto z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight drop-shadow-md heading-font">
            Our Impact Projects
          </h2>
          <div className="w-20 h-1 bg-[#E56D37] mt-3 rounded-full mx-auto" />
        </div>

        <div 
          className="w-full bg-white rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 min-h-[450px]"
          onMouseEnter={() => setIsPaused(true)}  
          onMouseLeave={() => setIsPaused(false)} 
        >
          <div className="md:col-span-6 p-8 sm:p-12 flex flex-col justify-between text-left bg-white">
            {projectsData[current] && (
              <div className="space-y-4">
                <span className="inline-block bg-[#E56D37] text-[#fff] text-xs font-bold tracking-widest px-3 py-1 rounded-md uppercase">
                  {projectsData[current].tag}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {projectsData[current].title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {projectsData[current].description}
                </p>
                <div className="flex items-start gap-2 pt-2 text-xs font-semibold text-gray-500">
                  <span className="text-sm select-none mt-0.5 text-red-500">📍</span>
                  <p className="leading-relaxed">{projectsData[current].locations}</p>
                </div>
              </div>
            )}

            {projectsData[current] && (
              <div className="pt-6">
                <Link
                  to={projectsData[current].link}
                  className="inline-flex items-center justify-center bg-[#E56D37] hover:bg-[#2d2d2d] text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md group"
                >
                  Explore Project
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </div>
            )}
          </div>

          <div className="md:col-span-6 relative min-h-[300px] md:min-h-full overflow-hidden bg-gray-100">
            {projectsData.map((project, index) => (
              <img
                key={`img-${project.id}`}
                src={project.image}
                alt={project.title}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
                  index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
              />
            ))}
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm p-2 rounded-lg text-white/90 select-none">🖼️</div>
          </div>
        </div>

        {projectsData.length > 1 && (
          <div className="flex space-x-3 mt-8">
            {projectsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  index === current ? "w-8 bg-white" : "w-2.5 bg-[#E56D37] hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OngoingProjects;