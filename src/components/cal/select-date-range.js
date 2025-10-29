/**
 * Calendar - select date range
 */
import React from 'react';
import PropTypes from 'prop-types';
import mobiscroll from './mobiscroll';
import '../../css/select-date-range.scss';

export const serializeRange = props => {
  const { range = [], is_demo = false, is_init = false, list = false } = props;
  switch (true) {
    case is_demo:
      return list ? ['2018-11-18', '2018-11-18'] : ({ from_data_date: '2018-11-18', to_data_date: '2018-11-18' });

    case is_init:
      {
        let from_data_date = new Date();
        from_data_date = from_data_date.setDate(from_data_date.getDate() - 1);
        from_data_date = (new Date(from_data_date)).toISOString().replace(/T.*/, '');

        let to_data_date = new Date();
        to_data_date = to_data_date.toISOString().replace(/T.*/, '');

        return list ? [from_data_date, to_data_date] : ({ from_data_date, to_data_date });
      }

    case Array.isArray(range) && range.length === 2:
      {
        const dates = range.map(date => (new Date(date)).toISOString().replace(/T.*/, ''));
        return list ? range : ({ from_data_date: dates[0], to_data_date: dates[1] });
      }

    default:
      return list ? [] : ({});
  }
};

export const Calendar = props => {
  let range = props.range;
  if (!props.show || range.length !== 2) {
    return null;
  }

  const { readonly = false, setRangeCallback } = props;

  range = range.map(value => value instanceof Date ? value : new Date(value));

  mobiscroll.settings = {
    lang: 'ru',
    dateFormat: 'dd.mm.yy',
    theme: 'ios',
    display: 'center',
    max: new Date(),
    closeOnOverlayTap: false
  };

  const runCallback = (_ev, cal) => {
    if (typeof setRangeCallback === 'function' && !readonly) {
      setRangeCallback(cal.getVal().map(date => date.toISOString().replace(/T.*/, '')));
    }
  }

  let css = 'mobiscroll-layout';
  if (readonly) {
    css += ' readonly';
  }

  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div className={css}>
        <mobiscroll.Range value={range} onSet={runCallback} disabled={readonly}>
          <span className='mbi-label'>{'От'}</span>
          <mobiscroll.RangeStart readOnly />
          <span className='mbi-label'>{'До'}</span>
          <mobiscroll.RangeEnd readOnly />
        </mobiscroll.Range>
        {!readonly && (
          <div className='preset-bar'>
            <button type='button' className='preset-chip' onClick={() => {
              const d = new Date();
              const t = d.toISOString().replace(/T.*/, '');
              setRangeCallback && setRangeCallback([t, t]);
            }}>Сегодня</button>
            <button type='button' className='preset-chip' onClick={() => {
              const d = new Date();
              d.setDate(d.getDate() - 1);
              const y = d.toISOString().replace(/T.*/, '');
              setRangeCallback && setRangeCallback([y, y]);
            }}>Вчера</button>
            <button type='button' className='preset-chip' onClick={() => {
              const end = new Date();
              const start = new Date();
              start.setDate(start.getDate() - 6);
              const s = start.toISOString().replace(/T.*/, '');
              const e = end.toISOString().replace(/T.*/, '');
              setRangeCallback && setRangeCallback([s, e]);
            }}>Неделя</button>
          </div>
        )}
      </div>
    </div>
  )
}

Calendar.propTypes = {
  show: PropTypes.bool,
  readonly: PropTypes.bool,
  range: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]),
  setRangeCallback: PropTypes.func,
}

