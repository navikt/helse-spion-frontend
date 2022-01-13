import React from 'react';
import './ColumnHeader.scss';

interface ColumnHeaderProps {
  columnIndex: number;
  sortColumn: number;
  sortDescending: boolean;
  columnTitle: string;
  setSort: (column: number) => void;
}

function ColumnHeader({
  columnIndex,
  sortColumn,
  sortDescending,
  columnTitle,
  setSort
}: ColumnHeaderProps): JSX.Element {
  const sortDirection = sortDescending ? 'desc' : 'asc';
  const ariaSortDirection = sortDescending ? 'descending' : 'ascending';

  if (sortColumn === columnIndex) {
    return (
      <th
        role='columnheader'
        className={`tabell__th--sortert-${sortDirection}`}
        aria-sort={ariaSortDirection}
      >
        <button
          onClick={() => setSort(columnIndex)}
          className='lenke column-header-lenkeknapp'
        >
          {columnTitle}
        </button>
      </th>
    );
  } else {
    return (
      <th role='columnheader' aria-sort='none'>
        <button
          onClick={() => setSort(columnIndex)}
          className='lenke column-header-lenkeknapp'
        >
          {columnTitle}
        </button>
      </th>
    );
  }
}

export default ColumnHeader;
