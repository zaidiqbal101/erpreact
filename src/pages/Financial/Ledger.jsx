import React, { useState } from "react";
import Sidebar from "../../components/Layout/Sidebar";

export default function Ledger() {
  const [ledgerData, setLedgerData] = useState([
    { id: 1, date: "2025-09-01", description: "Sales Income", debit: 0, credit: 5000 },
    { id: 2, date: "2025-09-02", description: "Purchase Materials", debit: 2000, credit: 0 },
    { id: 3, date: "2025-09-05", description: "Consulting Income", debit: 0, credit: 3000 },
  ]);
  const [newEntry, setNewEntry] = useState({ date: "", description: "", debit: "", credit: "" });
  const [editingId, setEditingId] = useState(null);

  const handleAddOrUpdate = () => {
    if (!newEntry.date || !newEntry.description) return;
    const normalized = {
      date: newEntry.date,
      description: newEntry.description,
      debit: Number(newEntry.debit) || 0,
      credit: Number(newEntry.credit) || 0,
    };
    if (editingId !== null) {
      setLedgerData(ledgerData.map(entry => entry.id === editingId ? { ...entry, ...normalized } : entry));
      setEditingId(null);
    } else {
      setLedgerData([...ledgerData, { id: Date.now(), ...normalized }]);
    }
    setNewEntry({ date: "", description: "", debit: "", credit: "" });
  };

  const handleEdit = (entry) => {
    setEditingId(entry.id);
    setNewEntry({
      date: entry.date || "",
      description: entry.description || "",
      debit: String(entry.debit ?? ""),
      credit: String(entry.credit ?? ""),
    });
  };

  const handleDelete = (id) => setLedgerData(ledgerData.filter(entry => entry.id !== id));

  const handleExportCSV = () => {
    const csv = [
      "Date,Description,Debit,Credit",
      ...ledgerData.map(entry => `${entry.date},${entry.description},${Number(entry.debit)},${Number(entry.credit)}`)
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ledger.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const totalDebit = ledgerData.reduce((sum, e) => sum + Number(e.debit), 0);
  const totalCredit = ledgerData.reduce((sum, e) => sum + Number(e.credit), 0);
  const balance = totalCredit - totalDebit;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-72 fixed h-full">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 ml-72 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Ledger</h1>

        {/* Summary */}
        <div className="flex flex-wrap gap-6 bg-white p-6 rounded-xl shadow mb-6 font-semibold text-gray-900">
          <p>Total Debit: ${totalDebit.toFixed(2)}</p>
          <p>Total Credit: ${totalCredit.toFixed(2)}</p>
          <p>Balance: ${balance.toFixed(2)}</p>
        </div>

        {/* Add/Edit Form */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">{editingId !== null ? "Edit Entry" : "Add New Entry"}</h3>
          <div className="flex flex-wrap gap-3 items-center">
            <input
              type="date"
              value={newEntry.date}
              onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
              className="flex-1 min-w-[120px] p-2 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Description"
              value={newEntry.description}
              onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
              className="flex-1 min-w-[150px] p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Debit"
              value={newEntry.debit}
              onChange={(e) => setNewEntry({ ...newEntry, debit: e.target.value })}
              min="0"
              className="flex-1 min-w-[100px] p-2 border rounded-lg"
            />
            <input
              type="number"
              placeholder="Credit"
              value={newEntry.credit}
              onChange={(e) => setNewEntry({ ...newEntry, credit: e.target.value })}
              min="0"
              className="flex-1 min-w-[100px] p-2 border rounded-lg"
            />
            <button
              onClick={handleAddOrUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {editingId !== null ? "Update Entry" : "Add Entry"}
            </button>
            {editingId !== null && (
              <button
                onClick={() => { setEditingId(null); setNewEntry({ date: "", description: "", debit: "", credit: "" }); }}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Ledger Entries</h3>
            <button
              onClick={handleExportCSV}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Export to CSV
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[600px] w-full border-collapse text-sm">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Description</th>
                  <th className="px-4 py-2 border">Debit ($)</th>
                  <th className="px-4 py-2 border">Credit ($)</th>
                  <th className="px-4 py-2 border">Balance ($)</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ledgerData.map((entry, index) => {
                  const runningBalance = ledgerData.slice(0, index + 1).reduce(
                    (sum, e) => sum + Number(e.credit) - Number(e.debit), 0
                  );
                  return (
                    <tr key={entry.id} className="even:bg-gray-50">
                      <td className="px-4 py-2 border">{formatDate(entry.date)}</td>
                      <td className="px-4 py-2 border">{entry.description}</td>
                      <td className="px-4 py-2 border">{Number(entry.debit).toFixed(2)}</td>
                      <td className="px-4 py-2 border">{Number(entry.credit).toFixed(2)}</td>
                      <td className="px-4 py-2 border">{runningBalance.toFixed(2)}</td>
                      <td className="px-4 py-2 border flex gap-2">
                        <button
                          onClick={() => handleEdit(entry)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
