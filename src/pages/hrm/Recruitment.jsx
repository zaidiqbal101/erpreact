import React, { useState } from "react";
import "./hrm.css";

export default function Recruitment() {
  const RecruitmentForm = () => {
    const [formData, setFormData] = useState({ name: "", email: "", position: "" });

    const handleSubmit = e => {
      e.preventDefault();
      console.log("Submitted:", formData);
      setFormData({ name: "", email: "", position: "" });
    };

    return (
      <form className="recruitment-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Candidate Name" 
          value={formData.name} 
          onChange={e => setFormData({ ...formData, name: e.target.value })}
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={e => setFormData({ ...formData, email: e.target.value })}
        />
        <input 
          type="text" 
          placeholder="Position Applied" 
          value={formData.position} 
          onChange={e => setFormData({ ...formData, position: e.target.value })}
        />
        <button type="submit">Add Candidate</button>
      </form>
    );
  };

  return (
    <div className="hrm-page">
      <h2>Recruitment & Reviews</h2>
      <RecruitmentForm />
    </div>
  );
}
