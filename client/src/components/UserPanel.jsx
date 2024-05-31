import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function UserPanel() {
  const [attendance, setAttendance] = useState([]);
  const [profilePicture, setProfilePicture] = useState('');
  const [uName, setuName] = useState('')

  useEffect(() => {
    // Fetch user attendance
    axios.get('http://localhost:5000/users/attendance', {
      headers: { 'Authorization': localStorage.getItem('token') }
    }).then(response => {
      setAttendance(response.data);
      console.log(response.data);
    });

    // Fetch user profile
    axios.get('http://localhost:5000/users/profile', {
      headers: { 'Authorization': localStorage.getItem('token') }
    }).then(response => {
      setuName(response.data.username);
      setProfilePicture(response.data.profilePicture);
    });
  }, []);

  const markAttendance = () => {
    axios.post('http://localhost:5000/users/attendance', {}, {
      headers: { 'Authorization': localStorage.getItem('token') }
    }).then(response => {
      toast.success(response.data);
      // Refresh attendance data
      axios.get('http://localhost:5000/users/attendance', {
        headers: { 'Authorization': localStorage.getItem('token') }
      }).then(response => {
        setAttendance(response.data);
      });
    }).catch(error => {
      toast.error(error.response.data);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-6">
      <h1 className="text-4xl font-bold mb-6">{uName}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="w-24 h-24 rounded-full mb-4" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        <button 
          onClick={markAttendance} 
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
        >
          Mark Attendance
        </button>
        {/* <button 
          onClick={sendLeaveRequest} 
          className="w-full bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 mb-4"
        >
          Mark Leave
        </button> */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>
          <ul>
            {attendance.map((record, index) => (
              <li key={index} className="bg-gray-200 p-2 mb-2 rounded"><b>Date : </b>
                {new Date(record.date).toLocaleDateString()} - {record.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
