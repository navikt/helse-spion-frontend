import React, { useState } from 'react';
import { YtelseSammendrag } from '../util/helseSpionTypes';
import { Keys } from '../locales/keys';
import totalRefundInYtelseSammendrag from '../util/totalRefundInYtelseSammendrag';
import { thousandSeparation } from '../util/thousandSeparation';
import Pagination from './Pagination';
import './YtelsesperiodeTable.sass';
import Lenke from 'nav-frontend-lenker';
import { useTranslation } from 'react-i18next';
import sortYtelseSammendrag from '../util/sortYtelseSammendrag';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import FileIcon from './FileIcon';

interface YtelseSammendragTableInterface {
  ytelseSammendrag: YtelseSammendrag[];
  onNameClick: Function;
  startdato: string;
  sluttdato: string;
}

const YtelseSammendragTable = ({
  ytelseSammendrag,
  onNameClick,
  startdato,
  sluttdato
}: YtelseSammendragTableInterface) => {
  const [sortColumn, setSortColumn] = useState<number>(-1);
  const [sortDescending, setSortDescending] = useState<boolean>(true);
  const { t } = useTranslation();

  const setSort = (index: number): void => {
    if (sortColumn === index) {
      setSortDescending(!sortDescending);
    } else {
      setSortColumn(index);
      setSortDescending(true);
    }
  };
  const totalRefund = totalRefundInYtelseSammendrag(ytelseSammendrag);
  const sortedYtelseSammendrag = sortYtelseSammendrag(
    ytelseSammendrag,
    sortColumn,
    sortDescending
  );

  const columnHeaders: string[] = [
    t(Keys.NAME),
    t(Keys.IDENTITY_NUMBER),
    t(Keys.REFUND_COUNT),
    t(Keys.MARK),
    t(Keys.REFUND_DAYS_MAX),
    t(Keys.REFUND)
  ];

  const items: JSX.Element[] = sortedYtelseSammendrag.map(
    (ytelsesperiode, index) => (
      <tr key={index}>
        <td>
          <button
            className='lenke ytelsesperiode-lenkeknapp'
            onClick={() => onNameClick(ytelsesperiode.identitetsnummer)}
          >
            {ytelsesperiode.navn}
          </button>
        </td>
        <td>{ytelsesperiode.identitetsnummer}</td>
        <td>{ytelsesperiode.antall_refusjoner}</td>
        <td>{ytelsesperiode.merknad}</td>
        <td>{ytelsesperiode.max_refusjon_dager}</td>
        <td className={'ytelsesperiode-tabell--align-right'}>
          {thousandSeparation(ytelsesperiode.refusjonsbeløp)}
        </td>
      </tr>
    )
  );

  const wrapperFunction = (items: JSX.Element[]): JSX.Element => (
    <table className='tabell tabell--stripet ytelsesperiode-tabell--tabell'>
      <thead>
        <tr>
          {columnHeaders.map((columnHeader, index) => {
            if (sortColumn === index) {
              return sortDescending ? (
                <th
                  key={index}
                  role='columnheader'
                  className='tabell__th--sortert-desc'
                  aria-sort='descending'
                >
                  <button
                    onClick={() => setSort(index)}
                    className='lenke ytelsesperiode-lenkeknapp'
                  >
                    {columnHeader}
                  </button>
                </th>
              ) : (
                <th
                  key={index}
                  role='columnheader'
                  className='tabell__th--sortert-asc'
                  aria-sort='ascending'
                >
                  <button
                    onClick={() => setSort(index)}
                    className='lenke ytelsesperiode-lenkeknapp'
                  >
                    {columnHeader}
                  </button>
                </th>
              );
            } else {
              return (
                <th key={index} role='columnheader' aria-sort='none'>
                  <button
                    onClick={() => setSort(index)}
                    className='lenke ytelsesperiode-lenkeknapp'
                  >
                    {columnHeader}
                  </button>
                </th>
              );
            }
          })}
        </tr>
      </thead>
      <tbody>{items}</tbody>
    </table>
  );

  dayjs.extend(customParseFormat);

  const formatertStartDato = dayjs(startdato, 'YYYY-MM-DD').format('DD.MM.YY');
  const formatertSluttDato = dayjs(sluttdato, 'YYYY-MM-DD').format('DD.MM.YY');

  return (
    <Pagination wrapperFunction={wrapperFunction} items={items}>
      <div className='ytelsesperiode-tabell--footer'>
        <Lenke href='#'>
          <FileIcon />
          <span>Last ned regneark</span>
        </Lenke>
        <div className='ytelsesperiode-tabell--total'>
          {t(Keys.TOTAL_REFUNDED_IN_PERIOD)} {formatertStartDato} -{' '}
          {formatertSluttDato}: : <b>{thousandSeparation(totalRefund)}</b>
        </div>
      </div>
    </Pagination>
  );
};

export default YtelseSammendragTable;
