import express from 'express';
import { getJobs, createJob, getJobById, applyJob } from '../controllers/jobController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.route('/').get(getJobs).post(protect, createJob);
router.route('/:id').get(getJobById);
router.route('/apply/:id').post(protect, applyJob);
export default router;
