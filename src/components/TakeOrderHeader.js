import React, { useEffect, useRef, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import NavIcon from '@material-ui/icons/NearMe';
import MapIcon from '@material-ui/icons/Map';
import RefreshIcon from '@material-ui/icons/Refresh';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import { AllOrdersButton } from './order/Buttons.js';

const OrderButtons = props => <Button variant="outlined" size="small" color="primary" {...props}/>;

const TakeOrderHeader = ({
  classes, orders, errorDialog, openMap, openNavigator,
  orderNumOnChange, orderNumButton, orderNum
}) => {

  const [already_notifed, set_notifed] = useState([]);
  const time_interval = useRef();

  useEffect(() => {
    if (!orders.length || !window.cordova) {
      return;
    }
    let update_notifed = [];

    const to_notify = orders.reduce((akk, o) => {
      update_notifed.push(o.uid);
      if (!already_notifed.includes(o.uid)) {
        akk.push({
          title: `Напоминание по заказу к ${o.deliver_at}`,
          text: `Сумма к оплате ${o.sum_fact}₽ по адресу ${o.address}`,
          foreground: true
        })
      }
      return akk
    }, []);

    try {
      if (to_notify.length) {
        window.cordova.plugins.notification.local.schedule(to_notify);
      }
      set_notifed(update_notifed);
    } catch (e) {
      errorDialog(e)
    }
  }, [orders])

  return (
    <div className={classes.top_button_container}>
      <div className={classes.order_buttons}>
        <TextField
          className={classes.textField}
          label={'Номер заказа'}
          type="number"
          variant="outlined"
          value={orderNum}
          onChange={orderNumOnChange}
          InputProps={{ endAdornment: (
            <InputAdornment position="end" onClick={orderNumButton}>
              <Button variant="outlined" color="primary">Найти</Button>
            </InputAdornment>
          )}}
        />
      </div>
      {false && <AllOrdersButton orders={orders} />}
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
      '& fieldset': { borderColor: theme.palette.primary.main },
      '&:hover fieldset': { borderColor: theme.palette.primary.main },
    },
  },
  top_button_container: { padding: theme.spacing(2) },
  navlink_button: { width: '25%' },
  order_buttons: {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  rightIcon: { marginLeft: theme.spacing(1) },
  refresh_button: { width: '25%' },
  left_icon: { marginRight: theme.spacing(1) }
});

export default withStyles(styles)(TakeOrderHeader);

