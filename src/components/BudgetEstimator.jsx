import React, { useState } from 'react';

// Component for estimating budgets based on hours and rate.
export function BudgetEstimator() {
  const [hours, setHours] = useState('');
  const [rate, setRate] = useState('');
  const [budget, setBudget] = useState(null);
  const [error, setError] = useState('');

  const handleHoursChange = (e) => {
    setHours(e.target.value);
    setBudget(null); // Clear budget on input change
    setError('');    // Clear error on input change
  };

  const handleRateChange = (e) => {
    setRate(e.target.value); 
    setBudget(null); // Clear budget on input change
    setError('');    // Clear error on input change
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors
    setBudget(null); // Clear previous budget calculation

    if (hours.trim() === '' || rate.trim() === '') {
      setError('Please fill in both hours and rate.');
      return;
    }

    const numHours = parseFloat(hours);
    const numRate = parseFloat(rate);

    if (isNaN(numHours) || isNaN(numRate)) {
      setError('Please enter valid numbers for hours and rate.');
      return;
    }

    if (numHours < 0 || numRate < 0) {
      setError('Hours and rate cannot be negative.');
      return;
    }

    const total = numHours * numRate;
    setBudget(total);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="mb-4 text-lg font-bold">Budget Estimator</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="hours" className="block mb-1 text-sm font-medium">Hours</label>
          <input
            id="hours"
            className="w-full p-2 border rounded-md"
            type="number"
            value={hours}
            onChange={handleHoursChange}
            placeholder="e.g., 10"
            min="0"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="rate" className="block mb-1 text-sm font-medium">Hourly Rate ($)</label>
          <input
            id="rate"
            className="w-full p-2 border rounded-md"
            type="number"
            value={rate}
            onChange={handleRateChange}
            placeholder="e.g., 50"
            min="0"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Calculate
        </button>
      </form>
      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
      {budget !== null && (
        <div className="mt-4 text-lg font-bold">
          Estimated Budget: ${budget.toFixed(2)}
        </div>
      )}
    </div>
  );
}
