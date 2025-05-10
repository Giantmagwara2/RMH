import React from 'react';

/**
 * A simple responsive table.
 * @param {Object[]} columns - Array of { key, header } definitions.
 * @param {Object[]} data    - Array of row objects keyed by column.key.
 */
const Table = ({ columns, data, className = '', ...props }) => (
  <div className={`overflow-x-auto ${className}`}>
    <table className="min-w-full overflow-hidden rounded-md bg-neutrals-surface" {...props}>
      <thead className="bg-neutrals-border">
        <tr>
          {columns.map(col => (
            <th
              key={col.key}
              className="font-medium text-left px-space-md py-space-sm text-text-primary"
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr
            key={idx}
            className={idx % 2 === 0 ? 'bg-bg' : 'bg-neutrals-surface'}
          >
            {columns.map(col => (
              <td
                key={col.key}
                className="px-space-md py-space-sm text-text-secondary"
              >
                {row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
