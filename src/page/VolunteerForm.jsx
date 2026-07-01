import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../apiConfig";

const VolunteerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    address: "",
    interest: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/volunteer.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: formData.age ? parseInt(formData.age, 10) : 0,
        }),
      });

      const data = await response.json();
      if (response.ok && data.status === "success") {
        alert(data.message);
        setFormData({
          name: "",
          email: "",
          phone: "",
          age: "",
          address: "",
          interest: "",
          message: "",
        });
      } else {
        alert(data.message || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting volunteer form:", error);
      alert("Failed to connect to the server. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-bg-color min-h-screen">
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Apply to Volunteer
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-50">
            Join hands with SDF Trust to bring meaningful change in the lives of underprivileged communities.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <h2 className="text-3xl font-serif font-bold text-text-primary mb-2">
            Volunteer Registration
          </h2>
          <p className="text-gray-500 mb-8">
            Please fill out this form to register as a volunteer. Our team will review your application and contact you soon.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="25"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="interest"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Area of Interest *
              </label>
              <select
                id="interest"
                value={formData.interest}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
              >
                <option value="">Select an interest...</option>
                <option value="Education">Education</option>
                <option value="Livelihood">Livelihood</option>
                <option value="Health">Health</option>
                <option value="Environment">Environment</option>
                <option value="Management">Management</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Residential Address *
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                placeholder="123 Street Name, Town, City, State - Zip"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Why do you want to volunteer? (Message)
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                placeholder="Share a bit about your motivations or skills..."
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:-translate-y-1 hover:shadow-lg focus:ring-4 focus:ring-primary/20 hover:bg-[#5a6425] text-white px-8 py-4 rounded-lg font-medium text-lg transition-all shadow-md w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span className="text-xl">🤝</span> {isSubmitting ? "Submitting..." : "Apply to Volunteer"}
              </button>
              <Link
                to="/get-involved#volunteer"
                className="text-gray-500 hover:text-primary transition-colors font-medium text-sm text-center w-full sm:w-auto"
              >
                Cancel and Go Back
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default VolunteerForm;
