import React, { useState } from 'react';
import { YtelseSammendrag } from '../util/helseSpionTypes';
import { Keys } from '../locales/keys';
import totalRefundInYtelseSammendrag from '../util/totalRefundInYtelseSammendrag';
import { thousandSeparation } from '../util/thousandSeparation';
import Pagination from './Pagination';
import './YtelsesperiodeTable.less';
import Lenke from 'nav-frontend-lenker';
import { useTranslation } from 'react-i18next';
import sortYtelseSammendrag from '../util/sortYtelseSammendrag';

interface YtelseSammendragTableInterface {
  ytelseSammendrag: YtelseSammendrag[],
  onNameClick: Function
}

const YtelseSammendragTable = ({ ytelseSammendrag, onNameClick }: YtelseSammendragTableInterface) => {
  const [sortColumn, setSortColumn] = useState<number>(-1);
  const [sortDescending, setSortDescending] = useState<boolean>(true);
  const { t } = useTranslation();

  const setSort = (index: number): void => {
    if (sortColumn === index) {
      setSortDescending(!sortDescending )
    } else {
      setSortColumn(index);
      setSortDescending(true);
    }
  }
  const totalRefund = totalRefundInYtelseSammendrag(ytelseSammendrag);
  const sortedYtelseSammendrag = sortYtelseSammendrag(ytelseSammendrag, sortColumn, sortDescending);
  const FileIcon = () => (<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M20.5,24h-17C3.2,24,3,23.8,3,23.5v-23C3,0.2,3.2,0,3.5,0h11c0,0,0,0,0,0c0.1,0,0.3,0.1,0.4,0.1l6,6 C20.9,6.2,21,6.4,21,6.5c0,0,0,0,0,0v17C21,23.8,20.8,24,20.5,24z M4,23h16V7h-5.5C14.2,7,14,6.8,14,6.5V1H4V23z M15,6h4.3L15,1.7 V6z"/></g></svg>);

  const columnHeaders: string[] = [
    t(Keys.NAME),
    t(Keys.IDENTITY_NUMBER),
    t(Keys.REFUND_COUNT),
    t(Keys.MARK),
    t(Keys.REFUND_DAYS_MAX),
    t(Keys.REFUND),
  ];

  const items: JSX.Element[] = sortedYtelseSammendrag.map((ytelsesperiode, index ) =>
    <tr key={index}>
      <td><button className="lenke ytelsesperiode-lenkeknapp" onClick={() => onNameClick(ytelsesperiode.identitetsnummer)}>{ytelsesperiode.navn}</button></td>
      <td>
        {ytelsesperiode.identitetsnummer}
      </td>
      <td>{ytelsesperiode.antall_refusjoner}</td>
      <td>{ytelsesperiode.merknad}</td>
      <td>{ytelsesperiode.max_refusjon_dager}</td>
      <td className={'ytelsesperiode-tabell--align-right'}>
          {thousandSeparation(ytelsesperiode.refusjonsbeløp)}
      </td>
    </tr>);

  const wrapperFunction = (items: JSX.Element[]): JSX.Element =>
    <table className="tabell tabell--stripet ytelsesperiode-tabell--tabell">
    <thead>
      <tr>
        {
          columnHeaders.map((columnHeader, index) => {
            if (sortColumn === index) {
              return sortDescending
                ? <th
                  key={index}
                  role="columnheader"
                  className="tabell__th--sortert-desc"
                  aria-sort="descending">
                  <button onClick={() => setSort(index)} className="lenke ytelsesperiode-lenkeknapp">{columnHeader}</button>
                </th>
                : <th
                  key={index}
                  role="columnheader"
                  className="tabell__th--sortert-asc"
                  aria-sort="ascending">
                  <button onClick={() => setSort(index)} className="lenke ytelsesperiode-lenkeknapp">{columnHeader}</button>
                </th>
            } else {
              return <th
                key={index}
                role="columnheader"
                aria-sort="none">
                <button onClick={() => setSort(index)} className="lenke ytelsesperiode-lenkeknapp">{columnHeader}</button>
              </th>
            }
          })
        }
      </tr>
    </thead>
    <tbody>
      {items}
    </tbody>
  </table>;

  return ( <Pagination wrapperFunction={wrapperFunction} items={items}>
      <div className="ytelsesperiode-tabell--footer">
        <Lenke href="#"><FileIcon/><span>Last ned regneark</span></Lenke>
        <div className="ytelsesperiode-tabell--total">
          {t(Keys.TOTAL_REFUNDED)}
          : <b>{thousandSeparation(totalRefund)}</b>
        </div>
      </div>
    </Pagination>)
  }

export default YtelseSammendragTable;
