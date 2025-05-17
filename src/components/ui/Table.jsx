import React from 'react';
import PropTypes from 'prop-types';

/**
 * A simple responsive table.
 * @param {Object[]} columns - Array of { key, header } definitions.
 * @param {Object[]} data    - Array of row objects keyed by column.key.
 * @param {boolean} [striped=false] - Whether to apply striped styling to rows.
 * @param {string} [className=''] - Additional class names for the wrapper div.
 */
const TableComponent = ({ columns, data, striped = false, className = '', ...props }) => (
  <div className={`overflow-x-auto ${className}`}>
    <table
      className="min-w-full overflow-hidden rounded-md bg-neutrals-surface"
      aria-label="Data Table"
      {...props}
    >
      <thead className="bg-neutrals-border">
        <tr>
          {columns.map((col) => (
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
            // Using index as a key is acceptable if the list is static and items don't have unique IDs.
            // If items can be reordered, added, or removed, prefer a stable unique key from the data item itself (e.g., row.id).
            key={idx}
            className={
              striped
                ? idx % 2 === 0
                  ? 'bg-bg'
                  : 'bg-neutrals-surface'
                : ''
            }
          >
            {columns.map((col) => (
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

TableComponent.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.node.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  striped: PropTypes.bool,
  className: PropTypes.string,
};

TableComponent.defaultProps = {
  striped: false,
  className: '',
};

const Table = React.memo(TableComponent);

export default Table;
