import React, { useState } from 'react';
import './PostJob.css';

const PostJob = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    skills: '',
    salary: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Replace with API call
  };

  return (
    <div className="post-job-container">
      <h2 className="post-job-title">Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Job Title</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Company Name</label>
          <input name="company" value={form.company} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input name="location" value={form.location} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Skills Required</label>
          <input name="skills" value={form.skills} onChange={handleChange} placeholder="e.g., React, Node.js" />
        </div>
        <div className="form-group">
          <label>Salary (Optional)</label>
          <input name="salary" value={form.salary} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Job Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
