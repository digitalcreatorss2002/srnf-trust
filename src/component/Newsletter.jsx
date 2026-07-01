import React, { useState } from "react";
import { API_BASE_URL } from "../apiConfig";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    fetch(`${API_BASE_URL}/subscribe.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.status === "success") {
          alert(data.message);
          setEmail("");
        } else {
          alert(data.message || "Failed to subscribe.");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error subscribing:", err);
        alert("Failed to connect to the backend. Please try again.");
      });
  };

  return (
    <section className="py-16 bg-[#fff] border-[#006D5B]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-4xl text-white  mb-4 block animate-float">✉️</span>
        
        {/* Heading */}
        <h2 className="text-3xl font-serif text-[#006D5B] mb-4">
          Subscribe to Our Newsletter
        </h2>
        
        <p className="text-[#2d2d2d] mb-8 max-w-2xl mx-auto">
          Stay updated with our latest projects, success stories, and ways you
          can help. Join our community of changemakers today.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="grow px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:border-[#006D5B] focus:ring-2 focus:ring-[#006D5B]/20 bg-white shadow-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#006D5B] hover:bg-[#2d3748] text-white px-8 py-4 rounded-full font-bold transition-all shadow-md hover:-translate-y-1 hover:shadow-lg whitespace-nowrap disabled:opacity-50"
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;