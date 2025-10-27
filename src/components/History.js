import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { serializeRange, Calendar } from './cal/select-date-range';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// Определение стилей для компонента
const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: "lightgray",
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  order_item: {
    width: '100%',
    padding: '8px',
    backgroundColor: theme.palette.background.paper,
  },
});

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
    };
  }

  componentDidMount() {
    this.props.changeState('CurrentName', 'История');

    // Вычисляем диапазон дат (за последние 30 дней)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 1); // День назад
    const end_Date = new Date();                   // Сегодня

    // Формируем диапазоны в нужном формате
    const range = [
      `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`,
      `${end_Date.getFullYear()}-${String(end_Date.getMonth() + 1).padStart(2, '0')}-${String(end_Date.getDate()).padStart(2, '0')}`,
    ];

    // Запрашиваем заказы за прошедший месяц
    this.get_orders(range);
  }

  setDateRange = (range) => {
    console.log('range!', range);
    this.get_orders(range);
  };

  get_orders = (range) => {
    const request = {
      'url': 'get_orders',
      'request': {
        'get_type': 'completed_orders',
        'courier_uid': this.props.settings.uid,
        'tz_uid': this.props.settings.tz_uid,
        'start_date': range[0],
        'end_date': range[1],
      },
    };

    return this.props.api_post(request).then((data) => {
      console.log("get_orders response", data);

      if (data.result === "error") {
        this.props.errorDialog({
          label: data.desc,
          error: data.desc,
          code: data.code,
        });
        this.sendLogMsg(data.error);
      } else {
        this.setState({ orders: data });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { orders } = this.state;

    // Расчёт диапазона дат для вывода
    const now1 = new Date();
    now1.setDate(now1.getDate() - 1); // Вчерашняя дата
    const now2 = new Date();           // Сегодняшняя дата
    const nowstr1 = `${now1.getFullYear()}-${String(now1.getMonth() + 1).padStart(2, '0')}-${String(now1.getDate()).padStart(2, '0')}`;
    const nowstr2 = `${now2.getFullYear()}-${String(now2.getMonth() + 1).padStart(2, '0')}-${String(now2.getDate()).padStart(2, '0')}`;

    return (
      <Fragment>
        <div>
          <Calendar readonly={false} range={[nowstr1, nowstr2]} setRangeCallback={this.setDateRange} show />
        </div>

        {orders.length > 0 && (
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'center' }}>Заказ</th>
                <th style={{ textAlign: 'center' }}>Курьеру</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(orders).map(([_key, order]) => (
                <tr key={order.uid}>
                  <td style={{ textAlign: 'start', border: '1px solid black' }}>
                    <div>{order.open_date.slice(0, -3)} № {order.order_num}</div>
                    <div>{order.address}</div>
                    <div>{order.zone_name}</div>
                  </td>
                  <td style={{ textAlign: 'end', border: '1px solid black' }}>
                    <div>{Intl.NumberFormat("ru", { style: "currency", currency: "RUB" }).format(order.wage)}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Fragment>
    );
  }
}

// Экспорт компонента с применением стилей
export default withStyles(styles)(History);