import React from 'react';

export function ClientDashboard() {
  const mockMilestones = [
    { id: 1, title: 'Project Kickoff', status: 'Completed' },
    { id: 2, title: 'Design Phase', status: 'In Progress' },
    { id: 3, title: 'Development Phase', status: 'Pending' },
    { id: 4, title: 'Final Review', status: 'Pending' },
  ];

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-lg font-bold mb-4">Client Dashboard</h2>
      <ul className="space-y-4">
        {mockMilestones.map((milestone) => (
          <li
            className="p-4 border rounded-md flex justify-between items-center"
            key={milestone.id}
          >
            <span className="font-medium">{milestone.title}</span>
            <span
              className={`px-2 py-1 rounded-md text-sm font-bold ${
                milestone.status === 'Completed'
                  ? 'bg-green-100 text-green-800'
                  : milestone.status === 'In Progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {milestone.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
