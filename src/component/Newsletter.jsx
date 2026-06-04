import React from "react";

const Newsletter = () => {
  return (
    <section className="py-16 bg-[#fff] border-[#E56D37]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Static Envelope Icon */}
        <span className="text-4xl text-white  mb-4 block animate-float">✉️</span>
        
        {/* Heading */}
        <h2 className="text-3xl font-serif text-[#E56D37] mb-4">
          Subscribe to Our Newsletter
        </h2>
        
        {/* Description */}
        <p className="text-[#2d2d2d] mb-8 max-w-2xl mx-auto">
          Stay updated with our latest projects, success stories, and ways you
          can help. Join our community of changemakers today.
        </p>

        {/* Static Form Container */}
        <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="grow px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#E56D37] focus:ring-2 focus:ring-[#E56D37]/20 bg-white shadow-sm"
            required
          />
          <button
            type="button"
            className="bg-[#E56D37] hover:bg-[#2d3748] text-white px-8 py-4 rounded-full font-bold transition-all shadow-md hover:-translate-y-1 hover:shadow-lg whitespace-nowrap"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;