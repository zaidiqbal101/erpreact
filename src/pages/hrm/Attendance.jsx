import React, { useState } from "react";
import "./hrm.css";

export default function Attendance() {
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: "John Doe", date: "2025-10-01", status: "Present" },
    { id: 2, name: "Jane Smith", date: "2025-10-01", status: "Absent" },
  ]);

  const AttendanceTable = ({ data }) => (
    <table className="attendance-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.date}</td>
            <td>{row.status}</td>
            <td>
              <button>Mark Present</button>
              <button>Mark Absent</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="hrm-page">
      <h2>Attendance Management</h2>
      <AttendanceTable data={attendanceData} />
    </div>
  );
}
