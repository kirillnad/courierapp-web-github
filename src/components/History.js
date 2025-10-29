import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Calendar } from './cal/select-date-range';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// Плоские карточки истории с аккуратной типографикой
const styles = theme => ({
  root: { width: '100%', backgroundColor: 'transparent' },
  list: { padding: '12px' },
  item: { marginBottom: '12px' },
  card: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--separator-color)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    color: 'var(--text)'
  },
  left: { flex: 1, paddingRight: '12px' },
  right: { minWidth: '96px', textAlign: 'right', whiteSpace: 'nowrap' },
  caption: { fontSize: '0.86rem', color: 'var(--muted)', marginBottom: '8px' },
  titleRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' },
  orderId: { fontWeight: 600 },
  line: { margin: 0 },
  amountLabel: { fontSize: '0.8rem', color: 'var(--muted)', marginBottom: '4px' },
  amountValue: { fontWeight: 700 },
});

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }

  componentDidMount() {
    this.props.changeState('CurrentName', '�������');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1);
    const end_Date = new Date();

    const range = [
      `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`,
      `${end_Date.getFullYear()}-${String(end_Date.getMonth() + 1).padStart(2, '0')}-${String(end_Date.getDate()).padStart(2, '0')}`,
    ];

    this.get_orders(range);
  }

  setDateRange = (range) => {
    this.get_orders(range);
  };

  get_orders = (range) => {
    const request = {
      url: 'get_orders',
      request: {
        get_type: 'completed_orders',
        courier_uid: this.props.settings.uid,
        tz_uid: this.props.settings.tz_uid,
        start_date: range[0],
        end_date: range[1],
      },
    };

    return this.props.api_post(request).then((data) => {
      if (data.result === 'error') {
        this.props.errorDialog({ label: data.desc, error: data.desc, code: data.code });
      } else {
        this.setState({ orders: data });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { orders } = this.state;

    const now1 = new Date();
    now1.setDate(now1.getDate() - 1);
    const now2 = new Date();
    const nowstr1 = `${now1.getFullYear()}-${String(now1.getMonth() + 1).padStart(2, '0')}-${String(now1.getDate()).padStart(2, '0')}`;
    const nowstr2 = `${now2.getFullYear()}-${String(now2.getMonth() + 1).padStart(2, '0')}-${String(now2.getDate()).padStart(2, '0')}`;

    return (
      <Fragment>
        <div>
          <Calendar readonly={false} range={[nowstr1, nowstr2]} setRangeCallback={this.setDateRange} show />
        </div>

        {orders.length > 0 && (
          <List className={classes.list}>
            {Object.entries(orders).map(([_key, order]) => (
              <ListItem key={order.uid} className={classes.item} disableGutters>
                <div className={classes.card}>
                  <div className={classes.left}>
                    <div className={classes.titleRow}>
                      <span className={classes.orderId}>Заказ № {order.order_num}</span>
                      <span className={classes.caption}>{order.open_date.slice(0, -3)}</span>
                    </div>
                    <p className={classes.line}>{order.address}</p>
                    {order.zone_name && (
                      <p className={classes.line} style={{ color: 'var(--muted)' }}>{order.zone_name}</p>
                    )}
                  </div>
                  <div className={classes.right}>
                    <div style={{ fontWeight: 700 }}>
                      {Intl.NumberFormat('ru', { style: 'currency', currency: 'RUB' }).format(order.wage)}
                    </div>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(History);

