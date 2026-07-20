import React, { useState } from 'react';

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqData = [
    {
      question: "How can I become a volunteer?",
      answer: "You can complete the volunteer application form on our website, and our team will contact you regarding available opportunities."
    },
    {
      question: "Do I need previous experience?",
      answer: "No. Most volunteer opportunities are open to anyone who is passionate about making a difference. Training is provided when needed."
    },
    {
      question: "Can students volunteer?",
      answer: "Yes, students are welcome to volunteer and gain valuable experience while contributing to the community."
    },
    {
      question: "What types of programs do you organize?",
      answer: "We organize awareness campaigns, educational workshops, health initiatives, environmental activities, fundraising events, and community development projects."
    }
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq"
      className="bg-[#f8f8f8] min-h-screen font-sans py-16 px-4 md:px-12 lg:px-24 flex flex-col items-center"
    >
      
      <h2 
        className="text-center font-bold text-3xl md:text-4xl text-[#2d2d2d] mb-12 tracking-wide heading-font"
        style={{ textShadow: '1px 1px 2px rgba(255, 255, 255, 0.6)' }}
      >
        Frequently Asked Questions
      </h2>

      <div className="w-full max-w-4xl space-y-5">
        {faqData.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div 
              key={index}
              className="bg-[#006D5B] rounded-xl overflow-hidden shadow-[0_8px_20px_-6px_rgba(0,0,0,0.3)] border border-[#006D5B] transition-all duration-300"
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full flex justify-between items-center p-5 md:p-6 text-left text-white font-semibold text-lg md:text-xl focus:outline-none transition-colors hover:text-[#2d2d2d] group"
              >
                <span>{faq.question}</span>
                
                <span className="relative flex items-center justify-center w-6 h-6 ml-4 shrink-0">
                  <span className="absolute w-5 h-0.5 bg-current rounded transition-transform duration-300"></span>
                  <span className={`absolute w-5 h-0.5 bg-current rounded transition-transform duration-300 ${isOpen ? 'rotate-0 scale-0' : 'rotate-90'}`}></span>
                </span>
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="p-5 md:p-6 pt-0 text-white text-base md:text-lg font-light leading-relaxed border-t border-neutral-500/30 bg-[#444444]/50">
                    {faq.answer}
                  </div>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};

export default FaqAccordion;
