import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import LocalShipping from '@material-ui/icons/LocalShipping';

import OrderAddress from './OrderAddress';
import OrderLine from './OrderLine';
import { OrderNumButton, PhoneButton, DeliverButton, NavButton, SummaButton, ValutaButton, DeselectButton, SelectButton } from './Buttons.js';

const Order = ({
  doneDeliverDialog, toggleLines, takeDeliverDialog,
  name, phone, address, comment, sum_fact, deliver_at, delivering_time,
  classes, is_open, is_delivering, order_uid, order,
  valutaChanged, on_valuta_changed, on_order_deselect, on_order_select, courier_status, tz_coordinates, selected
}) => (
  <ListItem
    style={{ marginTop: '0px', marginBottom: '12px', paddingTop: '8px', paddingBottom: '8px', paddingRight: '12px', paddingLeft: '12px' }} alignItems="flex-start" dense>

    <div className={classes.order_item} style={{
      backgroundColor: selected === false ? 'var(--card-unselected-bg)' : 'var(--surface)',
      borderLeft: selected === false ? '4px solid var(--separator-color)' : '4px solid var(--primary)'
    }}>

      <div className={classes.order_buttons} style={{ marginBottom: '6px', color: 'var(--primary)' }}>
        <PhoneButton phone={phone} phone_button={classes.phone_button} />
        <NavButton order={order} tz_coordinates={tz_coordinates} />
      </div>

      <div className={classes.order_title}>
        <div><span className={classes.order_caption}>{'Заказ №'}</span> <span style={{ fontSize: '1.5em', fontWeight: 600 }}>{order.build_number}</span></div>
        <div>{'на'} <span style={{ fontSize: '1.6em', fontWeight: 600, color: 'var(--primary)' }}>{deliver_at}</span>
        </div>
      </div>

      <OrderAddress
        onClick={toggleLines} is_open={is_open}
        name={name} address={address} comment={comment} sum_fact={sum_fact} deliver_at={deliver_at}
      />

      {order.lines && order.lines.length && order.lines.map(
        ({ id, name, qty }) => (
          <OrderLine
            key={id} qty={qty} name={name}
            toggleLines={toggleLines}
            is_open={is_open}
            styles_list={classes.listnested}
            styles_item={classes.listnesteditem}
          />
        )
      )}

      <div className={classes.order_buttons}>
        <SummaButton
          order={order}
          prepayment={order.prepayment}
          text={order.prepayment ? 'Предоплата:' : 'К оплате:'}
          valuta={order.prepayment ? '' : (order.cashless === 1 ? 'Картой' : 'Наличными')}
          decoration={valutaChanged.has(order.uid) ? 'line-through' : 'none'}
        />

        {(courier_status === 'free') && (selected === true) ? (
          <DeselectButton
            order={order}
            onClick={on_order_deselect}
          />
        ) : ''}

        {(courier_status === 'free') && (selected !== true) ? (
          <SelectButton
            order={order}
            onClick={on_order_select}
          />
        ) : ''}

        {(courier_status !== 'free') ? (
          <ValutaButton
            order={order}
            active={(order.prepayment === 0) && valutaChanged.has(order.uid)}
            valuta={order.cashless === 1 ? 'Картой' : 'Наличными'}
            onClick={on_valuta_changed}
          />
        ) : ''}

      </div>

      {courier_status !== 'free' &&
        <DeliverButton
          color="primary"
          deliver_at={deliver_at}
          delivering_time={delivering_time}
          onClick={doneDeliverDialog}
          deliver_button={classes.deliver_button}
          icon={is_delivering ? <LocalShipping /> : <DepartureBoardIcon />}
          order_uid={order_uid}
        />
      }
    </div>
  </ListItem>
)

const styles = theme => ({

  order_item: {
    width: '100%',
    padding: '16px',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--separator-color)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-card)'
  },
  order_buttons: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    margin: '0px',
  },
  order_title: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    color: 'var(--text)',
    marginBottom: '12px',
  },
  order_caption: {
    color: '#0f172a',
    fontWeight: 700,
    letterSpacing: '0.2px'
  },
  deliver_button: {

  },
  phone_button: {
    width: '48%',
  },
  order_delim: {
    marginTop: theme.spacing(1),
  },
});

export default withStyles(styles)(Order);

