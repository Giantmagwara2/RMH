import React, { useState } from 'react';

export function BudgetEstimator() {
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [budget, setBudget] = useState(null);

  const calculateBudget = () => {
    const total = parseFloat(hours) * parseFloat(rate);
    setBudget(isNaN(total) ? 0 : total);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-lg font-bold mb-4">Budget Estimator</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Hours</label>
        <input
          className="w-full p-2 border rounded-md"
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Hourly Rate ($)</label>
        <input
          className="w-full p-2 border rounded-md"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={calculateBudget}
      >
        Calculate
      </button>
      {budget !== null && (
        <div className="mt-4 text-lg font-bold">
          Estimated Budget: ${budget.toFixed(2)}
        </div>
      )}
    </div>
  );
}
