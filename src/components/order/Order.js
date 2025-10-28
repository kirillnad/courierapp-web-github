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
/* Order - Р°РґСЂРµСЃ РґРѕСЃС‚Р°РІРєРё, РёРјСЏ, С‚РµР»РµС„РѕРЅ, РєРЅРѕРїРєР° РґРёР°Р»РѕРіР° */
const Order = ({
  doneDeliverDialog, toggleLines, takeDeliverDialog,
  name, phone, address, comment, sum_fact, deliver_at, delivering_time,
  classes, is_open, is_delivering, order_uid, order, 
  valutaChanged, on_valuta_changed, on_order_deselect, on_order_select, courier_status, tz_coordinates, selected
}) => (
  <ListItem 
    style={{ marginTop: '0px', marginBottom: '12px', paddingTop: '8px', paddingBottom: '8px', paddingRight: '12px', paddingLeft: '12px'}} alignItems="flex-start" dense>

    <div className={classes.order_item} style={{
      backgroundColor: selected === false ? 'var(--card-unselected-bg)' : 'var(--surface)',
      borderLeft: selected === false ? '4px solid var(--separator-color)' : '4px solid var(--primary)'
    }}>


      <div className={classes.order_buttons} style={{marginBottom: "6px", color: "var(--primary)"}}>
        <PhoneButton phone={phone} phone_button={classes.phone_button} />
        <NavButton order={order} tz_coordinates={tz_coordinates} />
      </div>

      <div className={classes.order_title}>
        <div><span className={classes.order_caption}>{'\u0417\u0430\u043a\u0430\u0437 \u2116'}</span> <span style={{fontSize: "1.5em", fontWeight: 600}}>{order.build_number}</span></div>
        <div>{'\u0434\u043e\u0441\u0442\u0430\u0432\u0438\u0442\u044c \u043a'} <span style={{fontSize: "1.6em", fontWeight: 600, color: 'var(--primary)'}}>{deliver_at}</span>
        </div>
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
            text={order.prepayment ? "\u041F\u0440\u0435\u0434\u043E\u043F\u043B\u0430\u0442\u0430:" : "\u041A \u043E\u043F\u043B\u0430\u0442\u0435:"}
            valuta={order.prepayment ? "" : (order.cashless ? "\u0431\u0435\u0437\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u043C\u0438" : "\u043D\u0430\u043B\u0438\u0447\u043D\u044B\u043C\u0438")}
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
              valuta={order.cashless===1 ? "РќР°Р»" : "РљР°СЂС‚РѕР№"}
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
    padding: '16px',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--separator-color)',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-card)'
  },
  order_buttons: { // Р±Р»РѕРє СЃ РєРЅРѕРїРєР°РјРё РґРѕСЃС‚Р°РІР»РµРЅРѕ/Р·РІРѕРЅРѕРє
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
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
  deliver_button: { // РєРЅРѕРїРєР° РґРѕСЃС‚Р°РІР»РµРЅРѕ

  },
  phone_button: { // РєРЅРѕРїРєР° Р·РІРѕРЅРѕРє
    width: '48%',
  },
  order_delim: { // СЂР°Р·РґРµР»РёС‚РµР»СЊРЅР°СЏ РїРѕР»РѕСЃР° РїРѕРґ Р·Р°РєР°Р·РѕРј
    marginTop: theme.spacing(1),
  },
});

export default withStyles(styles)(Order);













