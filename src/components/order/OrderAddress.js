import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';
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
  <div className={classes.address_row}>
    <div className={classes.address_text} onClick={onClick} title={'Нажмите, чтобы раскрыть строки'}>
      {address} {comment ? ` ${comment}` : ''}, {'\u00A0'} {name}
    </div>
    <div className={classes.actions}>
      <CopyToClipboard text={`${address} ${comment || ''}`.trim()}>
        <Tooltip title={'Скопировать адрес'}>
          <IconButton size="small" className={classes.copy_btn} aria-label={'Скопировать адрес'}>
            <CopyIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </CopyToClipboard>
      {is_open ? <ExpandLess className={classes.chevron} onClick={onClick} /> : <ExpandMore className={classes.chevron} onClick={onClick} />}
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
    fontSize: '1.12rem',
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    fontWeight: 500,
    color: 'var(--text)',
  },
  address_row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', margin: 0, marginBottom: '12px', marginTop: '4px' },
  address_text: { flex: 1, fontSize: '1.12rem', fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial', fontWeight: 500, color: 'var(--text)', cursor: 'pointer' },
  actions: { display: 'inline-flex', alignItems: 'center', gap: '6px' },
  copy_btn: { color: 'var(--muted)' },
  chevron: { color: 'var(--muted)', cursor: 'pointer' },
}))(OrderAddress);

