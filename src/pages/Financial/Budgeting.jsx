import React, { useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Budgeting() {
  const [budgetData, setBudgetData] = useState([
    { id: 1, category: "Marketing", budget: 5000, spent: 3500 },
    { id: 2, category: "R&D", budget: 7000, spent: 4200 },
    { id: 3, category: "Operations", budget: 6000, spent: 5800 },
  ]);

  const [newBudget, setNewBudget] = useState({ category: "", budget: "", spent: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  const handleAddOrUpdate = () => {
    if (!newBudget.category || !newBudget.budget || newBudget.budget <= 0 || newBudget.spent < 0) {
      setError("Please provide a valid category, budget (>0), and non-negative spent amount.");
      return;
    }
    setError("");
    if (editingId) {
      setBudgetData(budgetData.map(b =>
        b.id === editingId ? { ...b, ...newBudget, budget: Number(newBudget.budget), spent: Number(newBudget.spent) } : b
      ));
      setEditingId(null);
    } else {
      setBudgetData([...budgetData, { id: Date.now(), ...newBudget, budget: Number(newBudget.budget), spent: Number(newBudget.spent) }]);
    }
    setNewBudget({ category: "", budget: "", spent: "" });
  };

  const handleEdit = (b) => {
    setEditingId(b.id);
    setNewBudget({ category: b.category, budget: b.budget.toString(), spent: b.spent.toString() });
  };

  const handleDelete = (id) => setBudgetData(budgetData.filter(b => b.id !== id));
  const handleCancel = () => {
    setEditingId(null);
    setNewBudget({ category: "", budget: "", spent: "" });
  };

  const totalBudget = budgetData.reduce((sum, b) => sum + Number(b.budget), 0);
  const totalSpent = budgetData.reduce((sum, b) => sum + Number(b.spent), 0);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar fixed width */}
      <div className="w-72 fixed h-full">
        <Sidebar />
      </div>

      {/* Main content with margin to prevent overlap */}
      <main className="flex-1 ml-72 p-6 overflow-y-auto">
        <h1 className="mb-6 text-2xl font-bold text-gray-900">Budgeting</h1>

        {/* Budget Summary */}
        <div className="bg-white border rounded-xl shadow p-6 mb-6 flex flex-wrap gap-8">
          <p className="text-lg font-semibold text-blue-600">
            Total Budget: ${totalBudget.toFixed(2)}
          </p>
          <p className="text-lg font-semibold text-orange-500">
            Total Spent: ${totalSpent.toFixed(2)}
          </p>
          <p className="text-lg font-semibold text-green-600">
            Remaining: ${(totalBudget - totalSpent).toFixed(2)}
          </p>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white border rounded-xl shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">
            {editingId ? "Edit Budget" : "Add New Budget"}
          </h3>
          {error && <p className="mb-4 p-3 text-red-600 bg-red-100 border rounded">{error}</p>}

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Category"
              value={newBudget.category}
              onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Budget ($)"
              value={newBudget.budget}
              onChange={(e) => setNewBudget({ ...newBudget, budget: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Spent ($)"
              value={newBudget.spent}
              onChange={(e) => setNewBudget({ ...newBudget, spent: e.target.value })}
              className="w-full p-2 border rounded-lg"
            />

            <div className="flex gap-3">
              <button onClick={handleAddOrUpdate} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                {editingId ? "Update" : "Add"}
              </button>
              {editingId && (
                <button onClick={handleCancel} className="px-4 py-2 bg-gray-600 text-white rounded-lg">
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Budget Table */}
        <div className="bg-white border rounded-xl shadow p-6 mb-6 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">Budget Overview</h3>
          <table className="w-full border-collapse text-sm min-w-[600px]">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-4 py-2 border">Category</th>
                <th className="px-4 py-2 border">Budget</th>
                <th className="px-4 py-2 border">Spent</th>
                <th className="px-4 py-2 border">%</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {budgetData.map((b) => (
                <tr key={b.id} className="even:bg-gray-50">
                  <td className="px-4 py-2 border">{b.category}</td>
                  <td className="px-4 py-2 border">{b.budget.toFixed(2)}</td>
                  <td className="px-4 py-2 border">{b.spent.toFixed(2)}</td>
                  <td className="px-4 py-2 border">
                    {((b.spent / b.budget) * 100).toFixed(2)}%
                  </td>
                  <td className="px-4 py-2 border">
                    {b.spent > b.budget ? (
                      <span className="px-2 py-1 text-red-600 bg-red-100 rounded">Over</span>
                    ) : (
                      <span className="px-2 py-1 text-green-600 bg-green-100 rounded">OK</span>
                    )}
                  </td>
                  <td className="px-4 py-2 border">
                    <button onClick={() => handleEdit(b)} className="px-2 py-1 bg-blue-600 text-white rounded mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(b.id)} className="px-2 py-1 bg-red-600 text-white rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Chart */}
          <div className="mt-6">
            <h4 className="mb-3 text-lg font-semibold">Budget vs Spent</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="budget" fill="#3b82f6" />
                <Bar dataKey="spent" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
