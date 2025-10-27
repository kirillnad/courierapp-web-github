import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard';
import LocalShipping from '@material-ui/icons/LocalShipping';

import OrderAddress from './OrderAddress';
import OrderLine from './OrderLine';
import {OrderNumButton, PhoneButton, DeliverButton, NavButton, SummaButton, ValutaButton, DeselectButton, SelectButton} from './Buttons.js';


/*
 * toggleLines = this.toggleShowLines(order)
 * doneDeliverDialog = this.selectOrder(order)
 * name = order.client.name
 * phone = order.client.phone
 * address = order.address
 * classes = classes
 */
/* Order - адрес доставки, имя, телефон, кнопка диалога */
const Order = ({
  doneDeliverDialog, toggleLines, takeDeliverDialog,
  name, phone, address, comment, sum_fact, deliver_at, delivering_time,
  classes, is_open, is_delivering, order_uid, order, 
  valutaChanged, on_valuta_changed, on_order_deselect, on_order_select, courier_status, tz_coordinates, selected
}) => (
  <ListItem 
    style={{ marginTop: '0px', paddingTop: '4px', paddingBottom: '4px', paddingRight: '8px', paddingLeft: '8px'}} alignItems="flex-start" dense>

    <div className={classes.order_item} style={{backgroundColor:`${selected === false ? 'darkgray' : ''}`}}>


      <div className={classes.order_buttons} style={{marginBottom: "-8px", color: "#444444"}}>
        <PhoneButton phone={phone} phone_button={classes.phone_button} />
        <NavButton order={order} tz_coordinates={tz_coordinates} />
      </div>

      <div className={classes.order_buttons}>
        <div>Заказ № <span style={{fontSize: "1.5em"}}>{order.build_number}</span></div>
        <div>доставить к <span style={{fontSize: "1.5em"}}>{deliver_at}</span></div>
        {/*
          <OrderNumButton
            order={order}
            deliver_at={deliver_at}
          />
        */}
      </div>

{/*
*/}
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
            text={order.prepayment ? "Оплачено: " : "К оплате: "}
            valuta={order.prepayment ? "" : (order.cashless ? " по карте" : " наличными")}
            decoration={valutaChanged.has(order.uid) ? "line-through" : "none"}
        />


        {(courier_status === "free") && (selected === true) ? 
        (
              <DeselectButton 
                order={order}
                onClick={on_order_deselect}
              />
        ) : ""}

        {(courier_status === "free") && (selected !== true) ? 
        (
              <SelectButton 
                order={order}
                onClick={on_order_select}
              />
        ) : ""}

        {(courier_status !== "free") ? 
        (
          <ValutaButton 
              order={order}
              active={(order.prepayment === 0) && valutaChanged.has(order.uid)}
              valuta={order.cashless===1 ? "Нал" : "Картой"}
              onClick={on_valuta_changed}
          />
        ) : ""}

      </div>

      {courier_status !== 'free' &&
      <DeliverButton
          // color={is_delivering ? "primary" : "secondary"}
          color="primary"
          deliver_at={deliver_at}
          delivering_time={delivering_time}
          // onClick={is_delivering ? doneDeliverDialog : takeDeliverDialog}
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
    padding: '8px',
    backgroundColor: theme.palette.background.paper,
  },
  order_buttons: { // блок с кнопками доставлено/звонок
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
    margin: '0px',
  },
  deliver_button: { // кнопка доставлено

  },
  phone_button: { // кнопка звонок
    width: '48%',
  },
  order_delim: { // разделительная полоса под заказом
    marginTop: theme.spacing(1),
  },
});

export default withStyles(styles)(Order);
