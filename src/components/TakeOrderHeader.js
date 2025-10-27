import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import NavIcon from '@material-ui/icons/NearMe';
import MapIcon from '@material-ui/icons/Map';
import RefreshIcon from '@material-ui/icons/Refresh';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import {AllOrdersButton} from './order/Buttons.js';

// // как часто проверять наличие новых заказов в секундах
// const TRY_GET_ORDERS = 10; // секунды

const OrderButtons = props => <Button variant="outlined" size="small" color="primary" {...props}/>

const TakeOrderHeader = ({
  classes, orders, errorDialog, openMap, openNavigator,
  orderNumOnChange, orderNumButton, orderNum
}) => {

  const [already_notifed, set_notifed] = useState([]); // выполенненные нотификации
  const time_interval = useRef()


  // // при инициализации компонента запустить переодическую проверку наличия заказов
  // useEffect(() => {
  //   time_interval.current = setInterval(() => getOrders(false), TRY_GET_ORDERS * 1000) // в милесекунды
  //   return () => clearInterval(time_interval.current)
  // }, [])

  // При изменнии списка доступных заказов (orders):
  //   подготовить данные для нотификации cordova
  //   обновить список заказов, у которых уже была нотификация
  //   запустить нотификацию сordova
  // см. https://github.com/katzer/cordova-plugin-local-notifications
  useEffect(() => {
    if (!orders.length || !window.cordova) {
      // нет доступных заказов или cordova - выход
      return;
    }
    let update_notifed = [];

    // вычислить список заказов, которым необходима нотификация
    const to_notify = orders.reduce(
      (akk, o) => {
        update_notifed.push(o.uid);
        if (!already_notifed.includes(o.uid)) {
          akk.push({
            title: `Заказ ко времени ${o.deliver_at}`,
            text: `Доставка на сумму ${o.sum_fact}₽ по адресу ${o.address}`,
            foreground: true
          })
        }
        return akk
      }, []);

    try {
      if (to_notify.length) { // если есть новые нотификации
        // console.log("run cordova notification", to_notify);
        window.cordova.plugins.notification.local.schedule(to_notify);
      }
      // обновить список заказов, нотификации которых уже были выведены
      set_notifed(update_notifed);
    } catch (e) {
      errorDialog(e)
    }
  }, [orders])

  return (
    <div className={classes.top_button_container}>
      <div className={classes.order_buttons}>

{/*
        <OrderButtons className={classes.refresh_button} onClick={() => getOrders(true)} fullWidth>
          <RefreshIcon className={classes.left_icon} />
        </OrderButtons>

        <OrderButtons className={classes.navlink_button} onClick={openMap}>
          <MapIcon className={classes.rightIcon} />
        </OrderButtons>

        <Button className={classes.navlink_button} onClick={openNavigator}>
          <NavIcon className={classes.rightIcon} />
        </Button>
*/}

        <TextField
            className={classes.textField}
            label="Номер заказа"
            type="number"
            variant="outlined"
            value={orderNum}
            onChange={orderNumOnChange}
            InputProps={{ endAdornment: (
            <InputAdornment position="end" onClick={orderNumButton} >
              <Button variant="outlined" color="primary">Принять </Button>
            </InputAdornment>
            )}}
        />

      </div>
{/*
      <AllOrdersButton orders={orders} />
*/}

    </div>
  )
};

const styles = theme => ({

  textField: {

    width: '100%',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: '2px',

    color: theme.palette.primary.main,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },

  },
  top_button_container: {
    padding: theme.spacing(2),
  },
  navlink_button: {
    width: "25%",
  },
  order_buttons: { // блок с кнопками доставлено/звонок
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",

  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  refresh_button: {
    width: "25%",
  },
  left_icon: {
    marginRight: theme.spacing(1),
  }
});

export default withStyles(styles)(TakeOrderHeader);
