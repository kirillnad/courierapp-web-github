import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';

/*
 * name = line.NAME
 * qty = line.QTY
 * id = line.ID
 * is_open = this.state.order_show === order.uid
 * styles = classes.listnested
 * toggleLines = this.toggleShowLines(order)
 */
/* OrderLine - строка заказа, название и кол-во товара */
const OrderLine = ({ toggleLines, name, qty, styles_list, styles_item, is_open }) => (
  <Collapse onClick={toggleLines} in={is_open} timeout="auto" unmountOnExit>
    <List component="div" disablePadding dense className={styles_list}>
      <ListItem className={styles_item}>
        <ListItemText secondary={name} />
        <ListItemSecondaryAction>
          <ListItemText edge="end" secondary={qty} />
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  </Collapse>
);

export default OrderLine;
