import User from '../models/User.js';

export const getMe = (req, res) => {
  res.json(req.user);
};
