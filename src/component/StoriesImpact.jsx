import { useState, useEffect } from "react";
import { API_BASE_URL, getImageUrl } from "../apiConfig";

const defaultStories = [
  {
    id: 1,
    name: "Dharmendra Kumar",
    role: "Developer, Bihar",
    story:
      "SDF ke 3-day training program se maine multi-cropping seekhi. Ab meri paani ki khapat 40% kam ho gayi hai aur meri kamaai pehle se dugni ho chuki hai.",
    rating: 5,
    image: "hero/banner2.png",
  },
  {
    id: 2,
    name: "Sweety Shrivastava",
    role: "SHG Leader, Uttar Pradesh",
    story:
      "Women Empowerment Center se judne ke baad maine khud ka silai ka kaam shuru kiya. Aaj main apne parivar ka kharcha uthane mein poori tarah saksham hoon.",
    rating: 5,
    image: "hero/banner1.png",
  },
  {
    id: 3,
    name: "Shashwat Mishra",
    role: "School Teacher, Uttar Pradesh",
    story:
      "Humare gaon ke school mein jab se smart digital classroom setup hua hai, bacchon ki attendance 90% tak badh gayi hai. Padhne ka tarika bilkul badal gaya.",
    rating: 4,
    image: "hero/banner3.png",
  },
  {
    id: 4,
    name: "Tiya Saini",
    role: "Beneficiary, Uttar Pradesh",
    story:
      "Health & Nutrition camp ki wajah se humare bacchon ko sahi poshan aur time par dawaaiyan mil pa rahi hain. SDF ki team sach mein bohot madadgaar hai.",
    rating: 3,
    image: "hero/banner1.png",
  },
];

const StoriesImpact = () => {
  const [storiesList, setStoriesList] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/testimonial.php`)
      .then((res) => res.json())
      .then((resData) => {
        const dataArray = Array.isArray(resData) ? resData : [];
        if (dataArray.length > 0) {
          const formatted = dataArray.map((item, idx) => ({
            id: idx + 1,
            name: item.name,
            role: item.title,
            story: item.message,
            rating: 5,
            image: getImageUrl(item.image),
          }));
          setStoriesList(formatted);
        }
      })
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  const storiesData = storiesList.length > 0 ? storiesList : defaultStories;

  return (
    <section className="w-full bg-[#fff] py-10 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto pt-[-20px]">
        <div className="text-center mb-24">
          <span className="text-sm font-bold text-[#E56D37] uppercase tracking-widest block mb-2 heading-font">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight heading-font">
            Stories and Impacts
          </h2>
          <div className="w-20 h-1 bg-[#E56D37] mt-3 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20 pt-6">
          {storiesData.map((item) => (
            <div
              key={item.id}
              className="w-full bg-white rounded-2xl shadow-sm hover:shadow-xl p-6 pt-16 flex flex-col justify-between text-center relative border border-[#E56D37] transition-all duration-500 transform hover:-translate-y-3 group cursor-pointer"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full p-1 bg-white shadow-md border-2 border-dashed border-[#E56D37]/40 group-hover:border-solid group-hover:border-[#E56D37] transition-all duration-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="absolute top-4 right-4 flex space-x-0.5 text-amber-500 text-sm transform group-hover:scale-110 transition-transform duration-300">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={i < item.rating ? "opacity-100" : "opacity-20"}
                  >
                    ★
                  </span>
                ))}
              </div>

              <div className="flex flex-col justify-between h-full space-y-4">
                <p className="text-gray-600 text-sm leading-relaxed italic font-normal body-font">
                  "{item.story}"
                </p>

                <div className="pt-2 border-t border-gray-50">
                  <h4 className="text-base font-bold text-[#E56D37] group-hover:text-[#2d3748] transition-colors duration-300 heading-font">
                    {item.name}
                  </h4>
                  <p className="text-xs font-semibold text-black mt-0.5 body-font">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesImpact;
