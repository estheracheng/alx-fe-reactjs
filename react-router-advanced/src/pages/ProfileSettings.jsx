import React, { useState } from 'react';
import './Pages.css';

const ProfileSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    newsletter: true,
    language: 'en',
    theme: 'light'
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="profile-settings">
      <h2>Account Settings</h2>
      
      <div className="settings-section">
        <h3>Notifications</h3>
        
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
            />
            <span>Email Notifications</span>
          </label>
        </div>
        
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={settings.pushNotifications}
              onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
            />
            <span>Push Notifications</span>
          </label>
        </div>
        
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={settings.newsletter}
              onChange={(e) => handleSettingChange('newsletter', e.target.checked)}
            />
            <span>Newsletter Subscription</span>
          </label>
        </div>
      </div>
      
      <div className="settings-section">
        <h3>Preferences</h3>
        
        <div className="setting-item">
          <label>Language</label>
          <select 
            value={settings.language}
            onChange={(e) => handleSettingChange('language', e.target.value)}
            className="setting-select"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        
        <div className="setting-item">
          <label>Theme</label>
          <select 
            value={settings.theme}
            onChange={(e) => handleSettingChange('theme', e.target.value)}
            className="setting-select"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </div>
      </div>
      
      <div className="settings-actions">
        <button className="btn btn-primary">Save Settings</button>
        <button className="btn btn-outline">Reset to Defaults</button>
      </div>
    </div>
  );
};

export default ProfileSettings;