import React, { useState } from "react";
import { API_BASE_URL } from "../apiConfig";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${API_BASE_URL}/submit-contact.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      
      const data = await response.json();
      if (data.status === "success") {
        alert(data.message);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        alert(data.message || "Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="bg-bg-color min-h-screen">
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-primary-50">
            Get in touch with us to learn more, partner, or share your thoughts.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary mb-6">
                Contact Information
              </h2>
              <div className="space-y-6 text-left">
                <div className="flex items-start gap-4">
                  <div className="bg-white w-12 h-12 rounded-full shadow-sm flex items-center justify-center text-xl shrink-0 border border-gray-100">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">
                      Head Office Location
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Sustainable Resources for Nature Foundation (SRNF), B-9 G/F, Patel Garden, Uttam Nagar, New Delhi-110059
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white w-12 h-12 rounded-full shadow-sm flex items-center justify-center text-xl shrink-0 border border-gray-100">
                    📞
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">
                      Phone Number
                    </h3>
                    <p className="text-gray-600 text-sm">
                      +91 8882845062 <br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white w-12 h-12 rounded-full shadow-sm flex items-center justify-center text-xl shrink-0 border border-gray-100">
                    ✉️
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">
                      Email Address
                    </h3>
                    <p className="text-gray-600 text-sm">
                      srnfindia@gmail.com <br />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white w-12 h-12 rounded-full shadow-sm flex items-center justify-center text-xl shrink-0 border border-gray-100">
                    🕒
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">
                      Working Hours
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Monday - Saturday: 10:00 AM - 06:30 PM <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden shadow-inner border border-gray-300 relative">
              {/* <iframe
                src="https://maps.google.com/maps?q=Dwarka%20Sector-15,%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                title="SRNF Location Map"
                className="border-0"
              ></iframe> */}

              <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3502.358987155166!2d77.02859497550034!3d28.619001075672156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM3JzA4LjQiTiA3N8KwMDEnNTIuMiJF!5e0!3m2!1sen!2sin!4v1784101095506!5m2!1sen!2sin" 
                width="100%"
                height="100%"
                title="SRNF Location Map"
                className="border-0"
                ></iframe>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-2">
              Write to Us
            </h2>
            <p className="text-gray-500 mb-8">
              Fill out the form below and our team will get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="Doe"
                  />
                </div>
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

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject *
                </label>
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
                >
                  <option value="">Select a subject...</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Volunteering">Volunteering</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Donation Queries">Donation Queries</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Message *
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-primary hover:-translate-y-1 hover:shadow-lg focus:ring-4 focus:ring-primary/20 hover:bg-[#5a6425] text-white px-8 py-4 rounded-lg font-medium text-lg transition-all shadow-md w-full md:w-auto flex items-center justify-center gap-2"
              >
                <span className="text-xl">📤</span> Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
