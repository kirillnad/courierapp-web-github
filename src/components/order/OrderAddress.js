import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import {CopyToClipboard} from 'react-copy-to-clipboard';

/*
 * address = order.address
 * classes = classes
 * name = order.client.name
 * onClick = открыть/закрыть строки заказа
 */
/* OrderAddress - конструктор адреса доставки */
const OrderAddress = ({ is_open, address, comment, classes, name, sum_fact, deliver_at, onClick }) => (
  <div className={classes.order_address} >

{/*
    <div>
      {is_open ? <ExpandLess onClick={onClick} /> : <ExpandMore onClick={onClick} />}
    </div>
*/}
    <div className={classes.order_info} onClick={onClick}>
      {address} {comment}, &nbsp; {name }
    </div>
    <div style={{width: '0px', marginRight: '25px', marginLeft: '4px' }}>
       <ListItemAvatar>
          <CopyToClipboard text={address}>
            <CopyIcon style={{color: 'lightgray'}} />
          </CopyToClipboard>
        </ListItemAvatar>
    </div>
  </div>
)

export default withStyles(theme => ({

  order_address: {
    display: 'flex',
    margin: '0px',
    marginBottom: '10px',
    marginTop: '4px',

  },
  order_info: { // блок с имя/адресс
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
    fontSize: '1.1rem',
    fontFamily: 'system-ui',
    // fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
}))(OrderAddress);
