import React, { useState } from "react";

const Contact = () => {
  // फॉर्म डेटा को ट्रैक करने के लिए स्टेट
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  // इनपुट बदलते समय डेटा अपडेट करने का हैंडलर
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // 🔥 STATIC SUBMIT LOGIC: बिना किसी API Fetch के फ्रंटएंड पर काम करेगा
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // सबमिशन सक्सेस का अलर्ट दिखाना
    alert(`Thank you, ${formData.firstName}! Your message regarding "${formData.subject}" has been received (Static Demo).`);
    
    // फॉर्म फील्ड्स को वापस खाली (Reset) करना
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="bg-bg-color min-h-screen">
      {/* Hero Header Section */}
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

      {/* Main Core Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information Cards (Left Sidebar) */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-text-primary mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white w-12 h-12 rounded-full shadow-sm flex items-center justify-center text-xl shrink-0 border border-gray-100">
                    📍
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">
                      Head Office Location
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Sustainable Development Foundation (SDF), Near Dwarka
                      More, Sector-15, Dwarka, Delhi – 110059
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
                      +91 9289222127 <br />
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
                      contact@sdfoundation.org <br />
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
                      Monday - Friday: 9:00 AM - 6:00 PM <br /> Saturday &
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Maps Frame Placeholder */}
            <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden shadow-inner border border-gray-300 relative">
              <iframe
                src="https://maps.google.com/maps?q=Dwarka%20Sector-15,%20Delhi&t=&z=13&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                title="SDF Location Map"
                className="border-0"
              ></iframe>
            </div>
          </div>

          {/* Contact Interactive Form Box (Right Panel) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
            <h2 className="text-3xl font-serif font-bold text-text-primary mb-2">
              Write to Us
            </h2>
            <p className="text-gray-500 mb-8">
              Fill out the form below and our team will get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
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