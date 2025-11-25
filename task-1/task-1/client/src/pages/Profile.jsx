import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    role: 'user', // or 'recruiter'
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    // TODO: Replace this with real API call to fetch user data
    const mockData = {
      name: 'Enter your name',
      email: 'aeh@example.com',
      phone: '9876543210',
      bio: 'Aspiring full-stack developer with a passion for building user-centric apps.',
      role: 'user',
    };
    setProfile(mockData);
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setEditMode(false);
    // TODO: Send updated profile to backend
    console.log('Profile updated:', profile);
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <form className="profile-form" onSubmit={handleSave}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>

        <div className="form-group">
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={profile.role}
            disabled
          />
        </div>

        {editMode ? (
          <button type="submit" className="save-btn">Save</button>
        ) : (
          <button type="button" onClick={() => setEditMode(true)} className="edit-btn">Edit Profile</button>
        )}
      </form>
    </div>
  );
};

export default Profile;
