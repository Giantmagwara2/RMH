import React from 'react';
import PropTypes from 'prop-types';

const statusStyles = {
  Completed: 'bg-green-100 text-green-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Pending: 'bg-gray-200 text-gray-700', // Slightly adjusted for better contrast on gray-100 bg
  Default: 'bg-gray-200 text-gray-700',
};

export function ClientDashboard({ milestones }) {
  if (!milestones || milestones.length === 0) {
    return (
      <div className="p-4 bg-gray-100 rounded-md">
        <h2 className="mb-4 text-lg font-bold">Client Dashboard</h2>
        <p className="text-gray-600">No milestones to display at the moment.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h2 className="mb-4 text-lg font-bold">Client Dashboard</h2>
      <ul className="space-y-4">
        {milestones.map((milestone) => {
          const badgeStyle = statusStyles[milestone.status] || statusStyles.Default;
          return (
            <li
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-md shadow-sm"
              key={milestone.id}
            >
              <span className="font-medium text-gray-700">{milestone.title}</span> {/* Added space before closing span */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${badgeStyle}`}
              >
                {milestone.status}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

ClientDashboard.propTypes = {
  milestones: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })),
};

ClientDashboard.defaultProps = {
  milestones: [],
};
