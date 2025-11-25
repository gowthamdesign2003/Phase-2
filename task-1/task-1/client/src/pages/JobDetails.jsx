import React from 'react';
import { useParams } from 'react-router-dom';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();

  const job = {
    title: 'Frontend Developer',
    company: 'TechCorp',
    description: 'We are looking for a React developer with 2+ years experience.',
    requirements: ['React', 'JavaScript', 'CSS'],
    location: 'Remote',
    salary: '₹8 LPA'
  };

  return (
    <div className="job-details-container">
      <h2>{job.title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p><strong>Description:</strong> {job.description}</p>
      <p><strong>Requirements:</strong></p>
      <ul>
        {job.requirements.map((req, index) => <li key={index}>{req}</li>)}
      </ul>
      <button className="apply-btn">Apply Now</button>
    </div>
  );
};

export default JobDetails;
