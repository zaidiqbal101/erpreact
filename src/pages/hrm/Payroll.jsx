import React, { useState } from "react";
import "./hrm.css";

export default function Payroll() {
  const [payrollData, setPayrollData] = useState([
    { id: 1, name: "John Doe", month: "September", salary: 50000 },
    { id: 2, name: "Jane Smith", month: "September", salary: 45000 },
  ]);

  const PayrollTable = ({ data }) => (
    <table className="payroll-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Month</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.name}</td>
            <td>{row.month}</td>
            <td>₹{row.salary}</td>
            <td>
              <button>Generate Slip</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="hrm-page">
      <h2>Payroll Management</h2>
      <PayrollTable data={payrollData} />
    </div>
  );
}
