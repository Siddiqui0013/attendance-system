import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    // Fetch all users
    axios.get('http://localhost:5000/admin/users', {
      headers: { 'Authorization': localStorage.getItem('token') }
    }).then(response => {
      setUsers(response.data);
    }).catch((err)=>{
      console.log(err)
    }
    );
  }, []);

  const generateReport = () => {
    axios.get('http://localhost:5000/admin/report', {
      headers: { 'Authorization': localStorage.getItem('token') },
      params: { from: fromDate, to: toDate }
    }).then(response => {
      console.log("fromDate:", fromDate);
      console.log("toDate:", toDate);
      setReport(response.data);
      console.log(report);
    }).catch(error => {
      alert(error.response.data);
    });
  };

  const updateAttendance = (userId, attendance) => {
    axios.put(`http://localhost:5000/admin/attendance/${userId}`, { attendance }, {
      headers: { 'Authorization': localStorage.getItem('token') }
    }).then(response => {
      alert('Attendance updated');
    }).catch(error => {
      alert(error.response.data);
    });
  };

  const updateLeaveStatus = (userId, leaveId, status) => {
    axios.put(`http://localhost:5000/admin/leave/${userId}`, { leaveId, status }, {
      headers: { 'Authorization': localStorage.getItem('token') }
    }).then(response => {
      alert('Leave status updated');
    }).catch(error => {
      alert(error.response.data);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Admin Panel</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Generate Report</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <button
          onClick={generateReport}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Generate Report
        </button>
        {report.length > 0 && (
          <pre className="mt-4 p-4 bg-gray-200 rounded-lg overflow-auto max-h-64">
            {JSON.stringify(report, null, 2)}
          </pre>
        )}
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <ul className="space-y-4">
          {users.map(user => (
            <li key={user._id} className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-center">
              <span className="text-lg">{user.username}</span>
              <div className="space-x-2">
                {/* <button
                  onClick={() => updateAttendance(user._id, user.attendance)}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                >
                  Edit Attendance
                </button>
                <button
                  onClick={() => updateLeaveStatus(user._id, user.leaveId, 'approved')}
                  className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
                >
                  Approve Leave
                </button>
                <button
                  onClick={() => updateLeaveStatus(user._id, user.leaveId, 'rejected')}
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                >
                  Reject Leave
                </button> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdminPanel;
