import React from 'react';
import './JobList.css';

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Chennai',
    type: 'Full-Time',
    salary: '₹8 LPA'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'DevWorks',
    location: 'Remote',
    type: 'Part-Time',
    salary: '₹6 LPA'
  }
];

const JobList = () => {
  return (
    <div className="job-list-container">
      <h2>Available Jobs</h2>
      <div className="job-grid">
        {jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{job.title}</h3>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Type:</strong> {job.type}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
            <a href={`/jobs/${job.id}`} className="btn">View Details</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
