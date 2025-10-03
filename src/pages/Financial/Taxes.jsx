import React, { useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Taxes() {
  const [taxData, setTaxData] = useState([
    { id: 1, name: "Income Tax", value: 5000 },
    { id: 2, name: "Sales Tax", value: 2000 },
    { id: 3, name: "Corporate Tax", value: 3000 },
  ]);
  const [newTax, setNewTax] = useState({ name: "", value: 0 });
  const [editingId, setEditingId] = useState(null);

  const COLORS = ["#3b82f6", "#f97316", "#10b981"];

  const totalTax = taxData.reduce((sum, t) => sum + Number(t.value), 0);

  const handleAddOrUpdate = () => {
    if (!newTax.name || newTax.value <= 0) return;
    if (editingId) {
      setTaxData(
        taxData.map((t) => (t.id === editingId ? { ...t, ...newTax } : t))
      );
      setEditingId(null);
    } else {
      setTaxData([...taxData, { id: Date.now(), ...newTax }]);
    }
    setNewTax({ name: "", value: 0 });
  };

  const handleEdit = (tax) => {
    setEditingId(tax.id);
    setNewTax({ name: tax.name, value: tax.value });
  };

  const handleDelete = (id) => {
    setTaxData(taxData.filter((t) => t.id !== id));
  };

  const handleExportCSV = () => {
    const csv = ["Tax Type,Amount", ...taxData.map((t) => `${t.name},${t.value}`)].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "taxes.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.text("Tax & Reporting", 14, 20);

    // Use autoTable
    autoTable(doc, {
      startY: 30,
      head: [["Tax Type", "Amount ($)", "Percentage"]],
      body: taxData.map((t) => [
        t.name,
        t.value.toFixed(2),
        ((t.value / totalTax) * 100).toFixed(2) + "%",
      ]),
    });

    doc.save("taxes.pdf");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-72 fixed h-full">
        <Sidebar />
      </div>

      <main className="flex-1 ml-72 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-900">Tax & Reporting</h1>

        {/* Summary */}
        <div className="bg-white p-6 rounded-xl shadow flex gap-6 mb-6">
          <p className="text-lg font-semibold text-blue-600">
            Total Tax: ${totalTax.toFixed(2)}
          </p>
        </div>

        {/* Add/Edit Tax */}
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Tax Entry" : "Add New Tax Entry"}
          </h3>

          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              placeholder="Tax Type"
              className="border rounded p-2 flex-1 min-w-[150px]"
              value={newTax.name}
              onChange={(e) => setNewTax({ ...newTax, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              className="border rounded p-2 flex-1 min-w-[100px]"
              value={newTax.value || ""}
              onChange={(e) => setNewTax({ ...newTax, value: e.target.value })}
              min="0"
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={handleAddOrUpdate}
            >
              {editingId ? "Update Tax" : "Add Tax"}
            </button>
            {editingId && (
              <button
                className="bg-gray-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  setEditingId(null);
                  setNewTax({ name: "", value: 0 });
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Chart + Table */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Tax Breakdown</h3>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Pie Chart */}
            <div className="flex-1 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={taxData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {taxData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex gap-2 mb-2">
                <button
                  className="bg-green-500 text-white px-3 py-2 rounded"
                  onClick={handleExportCSV}
                >
                  Export CSV
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-2 rounded"
                  onClick={handleExportPDF}
                >
                  Export PDF
                </button>
              </div>

              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="px-4 py-2 border">Tax Type</th>
                    <th className="px-4 py-2 border">Amount ($)</th>
                    <th className="px-4 py-2 border">Percentage</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {taxData.map((t) => (
                    <tr key={t.id} className="even:bg-gray-50">
                      <td className="px-4 py-2 border">{t.name}</td>
                      <td className="px-4 py-2 border">{t.value.toFixed(2)}</td>
                      <td className="px-4 py-2 border">
                        {((t.value / totalTax) * 100).toFixed(2)}%
                      </td>
                      <td className="px-4 py-2 border flex gap-2">
                        <button
                          className="bg-orange-500 text-white px-2 py-1 rounded"
                          onClick={() => handleEdit(t)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded"
                          onClick={() => handleDelete(t.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
