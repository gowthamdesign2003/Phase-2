import Job from '../models/Job.js';

export const getJobs = async (req, res) => {
  const jobs = await Job.find().populate('createdBy', 'name email');
  res.json(jobs);
};

export const createJob = async (req, res) => {
  const job = await Job.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json(job);
};

export const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id).populate('createdBy', 'name');
  if (!job) return res.status(404).json({ message: 'Not found' });
  res.json(job);
};

export const applyJob = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Not found' });
  if (!job.applicants.includes(req.user._id)) {
    job.applicants.push(req.user._id);
    await job.save();
  }
  res.json({ message: 'Applied' });
};
