/**
 * Calendar - select date range
 * @module src/select-date-range.js
 */
import React from 'react';
import PropTypes from 'prop-types';
import mobiscroll from './mobiscroll';
import '../../css/select-date-range.scss';


/**
  * @function serializeRange - вернет либо пустой Object|Array, либо Object|Array с начальной и конечной датами в формате yyyy-mm-dd
  * @param {object} props
  * @param {bool} [props.is_demo=false] - признак версии приложения
  * @param {bool} [props.is_init=false] - признак установки даты при инициализции
  * @param {bool} [props.list=false] - признак формата результата: список или объект
  * @param {string[]} props.range - текущие значения промежутка
  * @returns {(string[]|object)} - вернет список или объект с датами или пустой
  */
export const serializeRange = props => {
  const { range=[], is_demo=false, is_init=false, list=false } = props
  switch (true) {
    case is_demo:
      // для демо-версии всегда возвращать эту дату
      return list ? ['2018-11-18', '2018-11-18'] : ({ from_data_date: '2018-11-18', to_data_date: '2018-11-18' });

    case is_init:
      // если установлен флаг инициализции возвращать промежуток с пердыдущего дня по текущий, отформатированый по шаблону yyyy-mm-dd
      let from_data_date = new Date();
      from_data_date = from_data_date.setDate(from_data_date.getDate() - 1);
      from_data_date = (new Date(from_data_date)).toISOString().replace(/T.*/, '');

      let to_data_date = new Date();
      to_data_date = to_data_date.toISOString().replace(/T.*/, '');

      return list ? [from_data_date, to_data_date] : ({ from_data_date, to_data_date });

    case Array.isArray(range) && range.length === 2:
      // если переданы даты, вернуть отформатироваными по шаблону yyyy-mm-dd
      const dates = range.map(date => (new Date(date)).toISOString().replace(/T.*/, ''));

      return list ? range : ({ from_data_date: dates[0], to_data_date: dates[1] });

    default:
      return list ? [] : ({});
  }
};


/**
 * @summary Calendar - компонент для определения промежутка, заданного парой дат.
 * @desc    В callback-функцию setRangeCallback как array передается новая пара дат.
 * @desc    Если флаг show выключен (show=false) или нет начальной пары дат (range=[]), компонент вернет null
 * @desc    Если включен флаг readonly (readonly=true), компонент вернет статичный блок с начальной парой дат
 * @component @example
 * const range = [ '2018-11-18', '2018-11-18' ];
 * const callbackFn = range => console.log(range);
 *
 * return (<Calendar readonly={login === 'demo'} range={range} setRangeCallback={callbackFn} show />)
 */
export const Calendar = props => {

    let range = props.range;
    if (!props.show || range.length !== 2) {
      return null;
    }

    const { readonly=false, setRangeCallback } = props;

    // значения промежутка должны быть типа Date
    range = range.map(value => value instanceof Date ? value : new Date(value));

    // настройки компонента
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
      // убираю onHover для readonly
      css += ' readonly'
    }

    return (
        <div className={css}  style={{ width: "100%"}}>
            <mobiscroll.Range value={range} onSet={runCallback} disabled={readonly}>
                <span className='mbi-label'>от</span>
                <mobiscroll.RangeStart readOnly />
                <span className='mbi-label'>до</span>
                <mobiscroll.RangeEnd readOnly />
            </mobiscroll.Range>
        </div>
    )
}

Calendar.propTypes = {
  /**
   * Если не выставлен флаг show, компонет вернет null
   */
  show: PropTypes.bool,
  /**
   * Если выставлен флаг readonly, компонет вернет статичный html
   */
  readonly: PropTypes.bool,
  /**
   * Список с текущими начальной и конечной датой, при пустом списке компонент вернет null
   */
  range: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]),
  /**
   * Сallback функция, изменение даты вызовет setRangeCallback([массив дат])
   */
  setRangeCallback: PropTypes.func,
}
