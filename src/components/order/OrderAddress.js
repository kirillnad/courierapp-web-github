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
 * onClick = РѕС‚РєСЂС‹С‚СЊ/Р·Р°РєСЂС‹С‚СЊ СЃС‚СЂРѕРєРё Р·Р°РєР°Р·Р°
 */
/* OrderAddress - РєРѕРЅСЃС‚СЂСѓРєС‚РѕСЂ Р°РґСЂРµСЃР° РґРѕСЃС‚Р°РІРєРё */
const OrderAddress = ({ is_open, address, comment, classes, name, sum_fact, deliver_at, onClick }) => (
  <div className={classes.address_row}>
    <div className={classes.address_text} onClick={onClick} title={'\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0441\u043E\u0441\u0442\u0430\u0432 \u0437\u0430\u043A\u0430\u0437\u0430'}>
      {address} {comment ? ` ${comment}` : ''}, {'\u00A0'} {name}
    </div>
    <div className={classes.actions}>
      <CopyToClipboard text={`${address} ${comment || ''}`.trim()}>
        <Tooltip title={'\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0430\u0434\u0440\u0435\u0441'}>
          <IconButton size="small" className={classes.copy_btn} aria-label={'\u0421\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0430\u0434\u0440\u0435\u0441'}>
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
  order_info: { // Р±Р»РѕРє СЃ РёРјСЏ/Р°РґСЂРµСЃСЃ
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    width: '100%',
    fontSize: '1.12rem',
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial',
    fontWeight: 500,
    color: 'var(--text)',
  },
  address_row: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", margin: 0, marginBottom: "12px", marginTop: "4px" }, address_text: { flex: 1, fontSize: "1.12rem", fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial", fontWeight: 500, color: "var(--text)", cursor: "pointer" }, actions: { display: "inline-flex", alignItems: "center", gap: "6px" }, copy_btn: { color: "var(--muted)" }, chevron: { color: "var(--muted)", cursor: "pointer" },
}))(OrderAddress);





