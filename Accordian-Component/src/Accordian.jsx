import React, { useState } from "react";
import faqsData from "./faqs.json"; // Importing the JSON data

const Accordion = () => {
  const [openId, setOpenId] = useState(null);

  // Function to handle toggle
  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id); // Toggle the clicked item
  };

  return (
    <div className="accordion">
      {faqsData.faqs.map((faq) => (
        <div key={faq.id} className={`faq-item ${openId === faq.id ? "active" : ""}`}>
          <div className="faq-question" onClick={() => handleToggle(faq.id)}>
            {faq.question}
            <span>{openId === faq.id ? "🔼" : "🔽"}</span>
          </div>
          {openId === faq.id && <div className="faq-answer">{faq.answer}</div>}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
