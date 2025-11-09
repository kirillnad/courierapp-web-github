// https://help.2gis.ru/question/razrabotchikam-zapusk-ideystviya-vmobilnom-prilozhenii-cherez-deeplink

import React from 'react';
import Button from '@material-ui/core/Button';
import NavIcon from '@material-ui/icons/NearMe';
import Phone from '@material-ui/icons/Phone';
// import CountDown from './CountDown';

export const PhoneButton = ({ phone }) => (
  <Button
    variant="text"
    color="primary"
    style={{ marginLeft: '-8px' }}
    startIcon={<Phone />}
    onClick={() => window.open(`tel:${phone}`)}
  >
    {phone}
  </Button>
)

export const OrderNumButton = ({ order, deliver_at }) => (
  <span>
    {'Заказ №'} {order.build_number} {'·'} {deliver_at}
  </span>
)

export const NavButton = ({ order, tz_coordinates }) => (
  <Button
    variant="text"
    size="small"
    className="route-badge"
    endIcon={<NavIcon fontSize="small" />}
    onClick={() => {
      if (!order || !order.coordinates) {
        alert('Нет координат заказа. Проверьте адрес.');
      } else {
        const yaurl = `https://yandex.ru/maps/?from=api-maps&mode=routes&origin=jsapi_2_1_79&rtext=${tz_coordinates[0]}%2C${tz_coordinates[1]}~${order.coordinates[0]}%2C${order.coordinates[1]}&rtt=auto&ruri=~&z=10`;
        window.open(yaurl, '_system');
        console.log(yaurl);
      }
    }}
  >
    {'Маршрут'}
  </Button>
)

export const AllOrdersButton = ({ orders = [] }) => (
  <Button
    variant="text"
    color="primary"
    startIcon={<NavIcon />}
    style={{ margin: '-8px' }}
    onClick={() => {
      if (!orders.length) {
        alert('Нет заказов для маршрута');
        return;
      }
      console.log('AllOrdersButton clicked. Orders count:', orders.length);
    }}
  >
    {'Маршрут'}
  </Button>
)

export const SummaButton = ({ order, prepayment, valuta, changedValuta, text, decoration }) => {
  const currentValuta = changedValuta || valuta;
  const previousValuta = changedValuta ? valuta : null;
  const formattedSum = (() => {
    const numeric = Number(order.sum_fact);
    if (Number.isNaN(numeric)) {
      return order.sum_fact;
    }
    return new Intl.NumberFormat('ru-RU').format(numeric).replace(/\u00A0/g, ' ');
  })();
  return (
    <Button
      variant="outlined"
      className="sum-chip"
      fullWidth
    >
      <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ opacity: .8, whiteSpace: 'nowrap' }}>{text}</span>
        <span style={{ fontSize: '1.3em', fontWeight: 700 }}>{formattedSum}</span>
        <span style={{ opacity: .8 }}>&#8381;</span>
        <span style={{ fontSize: '1em', opacity: .85, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          {previousValuta && (
            <span style={{ textDecoration: `${decoration}`, opacity: .75 }}>{previousValuta}</span>
          )}
          {previousValuta && currentValuta && (
            <span style={{ opacity: .6 }}>→</span>
          )}
          {currentValuta && (
            <span style={{ fontWeight: 600, color: changedValuta ? '#d32f2f' : 'inherit' }}>{currentValuta}</span>
          )}
        </span>
      </span>
    </Button>
  )
}

export const ValutaButton = ({ order, active, valuta, onClick }) => {
  if (order.prepayment === 1) {
    return null;
  }
  const label = valuta ? `или ${valuta} ?` : 'Изменить';
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      style={{
        whiteSpace: 'nowrap',
        paddingLeft: '16px',
        paddingRight: '16px',
        minWidth: 'fit-content'
      }}
    >
      {label}
    </Button>
  )
}

export const SelectButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      size="small"
      className="action-equal btn-accept"
      onClick={onClick}
      style={{ whiteSpace: 'nowrap' }}
    >
      {'Принять заказ'}
    </Button>
  )
}

export const DeselectButton = ({ onClick }) => {
  return (
    <Button
      variant="outlined"
      color="default"
      size="small"
      className="action-equal btn-decline"
      onClick={onClick}
      style={{ whiteSpace: 'nowrap' }}
    >
      {'Отменить выбор'}
    </Button>
  )
}

export const DeliverButton = ({ deliver_at, delivering_time, onClick, color }) => (
  <Button variant="contained" color={color} className="deliver-equal"
    onClick={onClick}
    style={{ width: '100%', marginTop: '12px' }}
  >
    {'Доставлено'}
    {/**
    <b>{deliver_at}</b>
      <p style={{fontSize: '1rem'}}>{deliver_at}</p>
    <CountDown
      deliver_at={deliver_at}
      deliver_time={delivering_time ? delivering_time : 0}
      ts={getLocalData().ts.filter(([uid, ts]) => uid === order_uid).pop()[1]}
    />
    */}
  </Button>
)

