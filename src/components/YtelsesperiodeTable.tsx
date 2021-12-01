import React, { useState } from 'react';
import { getClassnameFromStatus } from '../util/getClassnameFromStatus';
import { Ytelsesperiode } from '../util/helseSpionTypes';
import { Keys } from '../locales/keys';
import { useTranslation } from 'react-i18next';
import { totalRefundInYtelsesperioder } from '../util/totalRefundInYtelsesperioder';
import { sortYtelsesperioder } from '../util/sortYtelsesperioder';
import { thousandSeparation } from '../util/thousandSeparation';
import Pagination from './Pagination';
import './YtelsesperiodeTable.sass';
import { dateToString } from '../util/dateToString';
import Lenke from 'nav-frontend-lenker';
import FileIcon from './FileIcon';
import ColumnHeader from './ColumnHeader';

interface YtelsesperiodeTableProps {
  ytelsesperioder: Ytelsesperiode[];
}

const YtelsesperiodeTable = (props: YtelsesperiodeTableProps) => {
  const { t } = useTranslation();
  const [sortDescending, setSortDescending] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<number>(-1);
  const setSort = (index: number): void => {
    setSortDescending(!sortDescending);
    setSortColumn(index);
  };

  const { ytelsesperioder } = props;

  const totalRefund = totalRefundInYtelsesperioder(ytelsesperioder);
  const sortedYtelsesperioder = sortYtelsesperioder(
    ytelsesperioder,
    sortColumn,
    sortDescending
  );

  const columnHeaders: string[] = [
    t(Keys.PERIOD),
    t(Keys.STATUS),
    t(Keys.BENEFIT),
    t(Keys.GRADE),
    t(Keys.MARK),
    t(Keys.REFUND)
  ];

  const items: JSX.Element[] = sortedYtelsesperioder.map(
    (ytelsesperiode, index) => (
      <tr key={index}>
        <td>{`${dateToString(ytelsesperiode.periode.fom)} - ${dateToString(
          ytelsesperiode.periode.tom
        )}`}</td>
        <td>
          <span
            className={
              'ytelsesperiode-tabell__sirkel ytelsesperiode-tabell__sirkel--' +
              getClassnameFromStatus(ytelsesperiode.status)
            }
          />
          {t(ytelsesperiode.status)}
        </td>
        <td>{ytelsesperiode.ytelse}</td>
        <td>{ytelsesperiode.grad}%</td>
        <td>{ytelsesperiode.merknad || '-'}</td>
        <td
          className={'ytelsesperiode-tabell--align-right'}
          data-testid='ytelse'
        >
          {thousandSeparation(ytelsesperiode.refusjonsbeløp)}
        </td>
      </tr>
    )
  );

  const wrapperFunction = (tableBodyItems: JSX.Element[]): JSX.Element => (
    <table className='tabell tabell--stripet ytelsesperiode-tabell--tabell'>
      <thead>
        <tr>
          {columnHeaders.map((columnHeader, index) => (
            <ColumnHeader
              key={index}
              columnIndex={index}
              sortColumn={sortColumn}
              sortDescending={sortDescending}
              columnTitle={columnHeader}
              setSort={setSort}
            />
          ))}
        </tr>
      </thead>
      <tbody>{tableBodyItems}</tbody>
    </table>
  );

  return (
    <Pagination wrapperFunction={wrapperFunction} items={items}>
      <div className='ytelsesperiode-tabell--footer'>
        <Lenke href='#'>
          <FileIcon />
          <span>Last ned regneark</span>
        </Lenke>
        <div className='ytelsesperiode-tabell--total'>
          {t(Keys.TOTAL_REFUNDED)}: <b>{thousandSeparation(totalRefund)}</b>
        </div>
      </div>
    </Pagination>
  );
};

export default YtelsesperiodeTable;
