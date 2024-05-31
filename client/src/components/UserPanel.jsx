import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserPanel() {
  const [attendance, setAttendance] = useState([]);
  const [profilePicture, setProfilePicture] = useState('');

  useEffect(() => {
    // Fetch user attendance
    axios.get('http://localhost:5000/users/attendance', {
      headers: { 'Authorization': localStorage.getItem('token') }
    }).then(response => {
      setAttendance(response.data);
    });

    // Fetch user profile
    axios.get('http://localhost:5000/users/profile', {
      headers: { 'Authorization': localStorage.getItem('token') }
    }).then(response => {
      setProfilePicture(response.data.profilePicture);
    });
  }, []);

  const markAttendance = () => {
    axios.post('http://localhost:5000/users/attendance', {}, {
      headers: { 'Authorization': localStorage.getItem('token') }
    }).then(response => {
      toast.success(response.data);
    }).catch(error => {
      toast.error(error.response.data);
    });
  };

  const sendLeaveRequest = () => {
    axios.post('http://localhost:5000/users/leave', {}, {
      headers: { 'Authorization': localStorage.getItem('token') }
    }).then(response => {
      alert(response.data);
    }).catch(error => {
      alert(error.response.data);
    });
  };

  const updateProfilePicture = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('profilePicture', event.target.files[0]);

    axios.put('http://localhost:5000/users/profile', formData, {
      headers: { 
        'Authorization': localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      setProfilePicture(response.data.profilePicture);
    }).catch(error => {
      alert(error.response.data);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <h1 className="text-4xl font-bold mb-6">User Panel</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <input 
            type="file" 
            onChange={updateProfilePicture} 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
          />
        </div>
        <button 
          onClick={markAttendance} 
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
        >
          Mark Attendance
        </button>
        <button 
          onClick={sendLeaveRequest} 
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mb-4"
        >
          Mark Leave
        </button>
        <button 
          onClick={() => alert(JSON.stringify(attendance, null, 2))} 
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          View Attendance
        </button>
      </div>
    </div>
  );
}

export default UserPanel;
