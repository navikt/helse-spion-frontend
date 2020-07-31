import React, { Component } from 'react';
import { getClassnameFromStatus } from '../util/getClassnameFromStatus';
import { Ytelsesperiode } from '../util/helseSpionTypes';
import { Keys } from '../locales/keys';
import { WithTranslation, withTranslation } from 'react-i18next';
import { filterYtelsesperioder } from '../util/filterYtelsesperioder';
import { totalRefundInYtelsesperioder } from '../util/totalRefundInYtelsesperioder';
import { sortYtelsesperioder } from '../util/sortYtelsesperioder';
import { thousandSeparation } from '../util/thousandSeparation';
import Pagination from './Pagination';
import './YtelsesperiodeTable.less';
import { dateToString } from '../util/dateToString';
import Lenke from 'nav-frontend-lenker';

interface Props extends WithTranslation{
  ytelsesperioder: Ytelsesperiode[]
  t: (str: string) => string
}

type State = {
  sortColumn: number
  sortDescending: boolean
}

class YtelsesperiodeTable extends Component<Props, State> {
  state: State = {
    sortColumn: -1,
    sortDescending: true,
  };
  
  setSort = (index: number): void =>
    this.state.sortColumn === index
      ? this.setState({ sortDescending: !this.state.sortDescending })
      : this.setState({ sortColumn: index, sortDescending: true });

  render() {
    const { ytelsesperioder, t } = this.props;
    const { sortColumn, sortDescending } = this.state;
    const totalRefund = totalRefundInYtelsesperioder(ytelsesperioder);
    const sortedYtelsesperioder = sortYtelsesperioder(ytelsesperioder, sortColumn, sortDescending);
    const FileIcon = () => (<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g><path d="M20.5,24h-17C3.2,24,3,23.8,3,23.5v-23C3,0.2,3.2,0,3.5,0h11c0,0,0,0,0,0c0.1,0,0.3,0.1,0.4,0.1l6,6 C20.9,6.2,21,6.4,21,6.5c0,0,0,0,0,0v17C21,23.8,20.8,24,20.5,24z M4,23h16V7h-5.5C14.2,7,14,6.8,14,6.5V1H4V23z M15,6h4.3L15,1.7 V6z"/></g></svg>);
    
    const columnHeaders: string[] = [
      t(Keys.PERIOD),
      t(Keys.STATUS),
      t(Keys.BENEFIT),
      t(Keys.GRADE),
      t(Keys.MARK),
      t(Keys.REFUND),
    ];
    
    const items: JSX.Element[] = sortedYtelsesperioder.map((ytelsesperiode, index ) =>
      <tr key={index}>
        <td>{`${dateToString(ytelsesperiode.periode.fom)} - ${dateToString(ytelsesperiode.periode.tom)}`}</td>
        <td>
          <span
            className={'ytelsesperiode-tabell__sirkel ytelsesperiode-tabell__sirkel--' +
            getClassnameFromStatus(ytelsesperiode.status)}
          />
          {t(ytelsesperiode.status)}
        </td>
        <td>{ytelsesperiode.ytelse}</td>
        <td>{ytelsesperiode.grad}%</td>
        <td>{ytelsesperiode.merknad || '-'}</td>
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
                  aria-sort="descending"
                  onClick={() => this.setSort(index)}>
                  <span className="link">{columnHeader}</span>
                </th>
                : <th
                  key={index}
                  role="columnheader"
                  className="tabell__th--sortert-asc"
                  aria-sort="ascending"
                  onClick={() => this.setSort(index)}>
                  <span className="link">{columnHeader}</span>
                </th>
            } else {
              return <th
                key={index}
                role="columnheader"
                aria-sort="none"
                onClick={() => this.setSort(index)}>
                <span className="link">{columnHeader}</span>
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
  
    return <Pagination wrapperFunction={wrapperFunction} items={items}>
      <div className="ytelsesperiode-tabell--footer">
        <Lenke href="#"><FileIcon/><span>Last ned regneark</span></Lenke>
        <div className="ytelsesperiode-tabell--total">
          {t(Keys.TOTAL_REFUNDED)}
          : <b>{thousandSeparation(totalRefund)}</b>
        </div>
      </div>
    </Pagination>
  }
}

export default withTranslation()(YtelsesperiodeTable);
