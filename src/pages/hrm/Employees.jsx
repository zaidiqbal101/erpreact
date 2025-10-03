import React, { useState } from "react";
import "./hrm.css";

export default function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: "John Doe", role: "Manager", email: "john@example.com" },
    { id: 2, name: "Jane Smith", role: "Developer", email: "jane@example.com" },
  ]);

  const EmployeeCard = ({ employee }) => (
    <div className="employee-card">
      <h4>{employee.name}</h4>
      <p>{employee.role}</p>
      <p>{employee.email}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  );

  return (
    <div className="hrm-page">
      <h2>Employee Profiles</h2>
      <div className="employee-list">
        {employees.map(emp => <EmployeeCard key={emp.id} employee={emp} />)}
      </div>
    </div>
  );
}
