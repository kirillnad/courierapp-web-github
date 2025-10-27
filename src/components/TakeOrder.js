// TODO
// Очищать поле ввода номера заказа после поиска

import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import NavIcon from '@material-ui/icons/NearMe';

//import BackgroundGeolocation from "cordova-background-geolocation-lt";

import TakeOrderHeader from './TakeOrderHeader';
import DialogCourier from './TakeOrderDialogCourier';
// import {getPosition, getDistance, geoConfigStatic} from './courier_position';
import { Order, CountDown } from './order';
import { setLocalOrders, setLocalParams, setLocalValutaChanged, setLocalDelivering, setLocalData, getLocalData } from './localData';
import Button from '@material-ui/core/Button';
import { KeyboardReturnOutlined } from '@material-ui/icons';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { ThemeColors } from '../helpers/ThemeColors'
const colors = ThemeColors()


class TakeOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      delivering: new Set(), // uid'ы заказов, принятых к доставке
      selectedOrders: new Set(), // uid'ы заказов, которые выбраны к доставке
      valutaChanged: new Set(), // uid'ы заказов, у которых изменился вид оплаты
      ready_to_deliver_dialog: false,
      take_delivering_dialog: false,
      access_geolocation_dialog: false,
      orders: [],
      order: {},
      dialog_open: false, // флаг, да - открыт Диалог
      order_show: null,    // uid заказа, который развернуть
      position: null,
      orderNum: '',
      tz_coordinates: []
    };

    var inAppBrowserRef;
    var _ismounted;
    var allOrders = new Array();
    var distance_to_tz_m; // Допустимое расстояние до торговой точки
  }




  componentDidMount() {

    this.distance_to_tz_m = 100; // Курьер должен быть ближе 100 м до ресторана, чтобы считалось, что он в ресторане

    this._ismounted = true;

    this.props.changeState('CurrentName', 'Мои заказы');

    this.get_courier_state(true);

    console.log ('Ранее взятые заказы', getLocalData().orders)
    this.state.orders = getLocalData().orders;
    this.state.tz_coordinates = getLocalData().tz_coordinates;



    if (window.cordova) {
      // Периодическая отправка местоположения отключена, т.к. мы теперь контролируем время доставки по яндексу
      // setTimeout(() => { this.configureBackgroundGeolocation(); }, 5000);
    } else { }

      // Сначала получаем координаты
      // const pos = this.getGeoLocation();
      // console.log(pos);

  }


  componentWillUnmount() {
    this._ismounted = false;
  }


  geoOptions = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  geoSuccess = (pos) => {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }


  sendLogMsg = (logmsg) => {
    // логирование данных на сервере
    const request = {
      'url': 'logmsg',
      'progress': false,
      'request': {
        'tz_uid': this.props.settings.tz_uid,
        'courier_name': this.props.settings.name,
        'courier_uid': this.props.settings.uid,
        logmsg
      }
    };

    this.props.api_post(request);
  }

  selectOrder = (order) => (e) => {
    e.preventDefault();
    if (!order) return;
    this.setState({ order });
    let distance = 0;

    if (window.cordova) {
    } else {
      if (this._ismounted) this.setState({ dialog_open: true })
    }
  }

  // progress - отображать progress или нет
  get_courier_state = async (progress) => {

    const request = {
      'url': 'get_courier_state',
      'request': {
        'courier_uid': this.props.settings.uid,
        'tz_uid': this.props.settings.tz_uid
      },
      progress
    };

    return this.props.api_post(request).then((data) => {
      console.log("get_courier_state response", data);

      if (data.result == "error") {
        this.props.errorDialog({
          label: data.desc,
          error: data.desc,
          code: data.code
        });

        this.sendLogMsg(data.error);
      } else {
        // Успешно получен ответ список заказов

        setLocalParams(data.courier_status, data.frserver_address, data.tz_coordinates)

        if (this._ismounted) {
          this.state.frserver_address = (data.frserver_address || "" );
          this.state.tz_coordinates = (data.tz_coordinates || "" );
          this.setState({courier_status: data.courier_status || "" });
        }

        switch (data.courier_status) {
          case 'shift_closed': // смена закрыт
            // setLocalOrders([]); // 111
            this.props.errorDialog({
              label: 'Смена курьера закрыта.',
              error: "Попросите администратора открыть рабочую смену.",
              code: "SHIFT_CLOSED"
            });
            break
          case 'free': // свободен
            // setLocalOrders([]); // 111
            // this.allOrders = data.orders
            this.allOrders = data.orders.map(function (e) { 
              e.selected=false
              return e
            })
            setLocalOrders(this.allOrders || []); // 111
            this.setState({orders: this.allOrders})
          break
          case 'delivers_orders': // в дороге
            // setLocalOrders(data.orders || []); // 111
            // if (this._ismounted) {
            //   this.setState({ orders: data.orders || [] })
            // }
            this.allOrders = data.orders
            setLocalOrders(this.allOrders || []); // 111
            this.setState({orders: this.allOrders})
          break
          case 'returning': // возвращается
            break
          default:
        }
      }
    });
  }




  ready_to_deliver_dialog_open = () => {
    if (this._ismounted) this.setState({ ready_to_deliver_dialog: true })
  }

  startDelivery = (e) => {
    e.preventDefault()

    this.setState({ ready_to_deliver_dialog: false })

    // Фильтруем выбранные заказы с валидными UID
    const ords = this.state.orders
      .filter(e => e.selected === true && e.uid !== null)
      .map(e => e.uid);

    const request = {
      'url': 'appoint_courier',
      'request': {
        'courier_uid': this.props.settings.uid,
        'tz_uid': this.props.settings.tz_uid,
        // 'orders': this.state.orders.map(function (e) { return e.uid })
        'orders': ords
      }
    };

    this.props.api_post(request).then((data) => {
      console.log("appoint_courier", data);
      if (data.result == "error") {
        this.props.errorDialog({
          label: data.desc,
          error: data.desc,
          code: data.code
        });

        this.sendLogMsg(data.desc);
      } else {
        // Успешно получен ответ
        if (this._ismounted) this.setState({ ready_to_deliver_dialog: false })
        this.get_courier_state(true);
      }
    });
  }


  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in m)
  // Возвращает расстояние между точками в метрах
  calcDist = (lat1, lon1, lat2, lon2) => {
    var toRad = (Value) => {
      return Value * Math.PI / 180;
    }

    var R = 6378137; // Earth’s mean radius in meter
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  returning = async (e) => {
    e.preventDefault();
    try {
      // // Сначала получаем координаты
      // const pos = await this.getGeoLocation();
      // console.log(pos);
      // // После успешного получения координат проверяем дистанцию до магазина
      // let dist_m = this.calcDist(
      //   pos.coords.latitude,
      //   pos.coords.longitude,
      //   this.state.tz_coordinates[0],
      //   this.state.tz_coordinates[1]
      // );

      // this.sendLogMsg("Курьер вернулся. Координаты курьера: " + pos.coords.latitude + ',' + pos.coords.longitude + " Координаты магазина: " + this.state.tz_coordinates[0] + "," + this.state.tz_coordinates[1] + " Расстояние до магазина: " + dist_m);


      // if ((dist_m > 0) && (dist_m > this.distance_to_tz_m)) {
      //   this.props.errorDialog({
      //     label: 'Вы должны быть не дальше ' + this.distance_to_tz_m + ' м. от торговой точки.',
      //     error: 'Вы должны быть не дальше ' + this.distance_to_tz_m + ' м. от торговой точки.',
      //     code: ""
      //   });
      //   return;
      // }



      // Если коориданты получены и проверка дистанции пройдена выполняем поселдующую логику

      const request = {
        'url': 'came_back',
        'request': {
          'courier_uid': this.props.settings.uid,
          'tz_uid': this.props.settings.tz_uid,
        }
      };

      this.props.api_post(request).then((data) => {
        if (data.result == "error") {
          this.props.errorDialog({
            label: data.desc,
            error: data.desc,
            code: data.code
          });

          this.sendLogMsg(data.desc);
        } else {
          // Успешно получен ответ
          this.get_courier_state(true);
        }
      });
    } catch (error) {
      // console.error("Ошибка при получении геолокации", error);
      // Здесь можно обработать ошибки, если они произошли
    }


  }


  confirmDelivery = (e) => {
    e.preventDefault()

    const request = {
      'url': 'courier_confirmed',
      'request': {
        'order_uid': this.state.order.uid,
        'courier_uid': this.props.settings.uid,
      },
    };

    this.props.api_post(request).then(({ code }) => {
      if (!code) {
        setLocalDelivering(new Set([...this.state.delivering, this.state.order.uid]))
        if (this._ismounted) this.setState(
          state => ({
            delivering: state.delivering.add(state.order.uid),
            take_delivering_dialog: false
          })
        )
      }
    });
  }

  handleOk = (e) => {
    e.preventDefault();
    this.setState({ dialog_open: false })
    
    const request = {
      'url': 'order_is_delivered',
      'request': {
        'order_uid': this.state.order.uid,
        'courier_uid': this.props.settings.uid,
        pay_is_changed: (this.state.valutaChanged.has(this.state.order.uid) !== false ? 1 : 0)
      },
    };

    this.props.api_post(request).then(({ code }) => {
      if (!code) {
        const { delivering, order, orders, valutaChanged } = this.state;
        delivering.delete(order.uid);
        const new_orders = Object.entries(orders).reduce(
          (akk, [key, o]) => o.uid !== order.uid
            ? Object.assign(akk, { [key]: o })
            : akk, {}
        );
        setLocalData(Object.values(new_orders), delivering, valutaChanged);

        if (this._ismounted) this.setState(state => ({
          orders: new_orders,
          delivering,
          order: {}
        }))

        this.get_courier_state();
      }
    });
  }

  getGeoLocation = () => {
    let it = this
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {
          console.log('permissions:', result)
          if (result.state === "granted" || result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                // it.props.errorDialog({
                //   label: 'Успешная геолокация: ' + JSON.stringify(pos),
                //   error: 'Успешная геолокация: ' + JSON.stringify(pos),
                //   code: ""
                // });
                it.sendLogMsg(pos);
                resolve(pos); // Возвращаем результат
              },
              (err) => {
                it.sendLogMsg(err);
                // it.props.errorDialog({
                //   label: 'Ошибка геолокации: ' + JSON.stringify(err),
                //   error: 'Ошибка геолокации: ' + JSON.stringify(err),
                //   code: ""
                // });
                reject(err); // Отклоняем промис с ошибкой
              },
              this.geoOptions
            );
          } else if (result.state === "denied") {

            this.setState({ access_geolocation_dialog: true});

            // this.props.errorDialog({
            //   label: 'Включите геолокацию на устройстве.',
            //   error: "Включите геолокацию на устройстве.",
            //   code: ""
            // });
            // reject(new Error("Геолокация отключена пользователем"));
          }
        });
      } else {
        reject(new Error("Геолокация недоступна на данном устройстве"));
      }
    });
  }


  accessGeo = async () => {

  this.setState({ access_geolocation_dialog: false })


  let it = this
  
    try {
      const location = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      // alert('Координаты получены:', location.coords);
    } catch (error) {
      // alert('Ошибка геолокации:', error.message);
      console.log('Ошибка геолокации:', error.message);
      // it.props.errorDialog({
      //   label: 'Ошибка геолокации: ' + JSON.stringify(error),
      //   error: 'Ошибка геолокации: ' + JSON.stringify(error),
      //   code: ""
      // });


    }

  };


  orderNumButton = async (e) => {
    e.preventDefault();

    const res = await this.get_courier_state(true);


    let ordersToShow = this.state.orders;

    let already_got = ordersToShow.find(order => order.build_number === this.OrderNum);
    if (already_got !== undefined) { 
      this.props.errorDialog({
        label: 'Вы уже выбрали этот заказ.',
        error: "Вы уже выбрали этот заказ.",
        code: ""
      });
      return;
    }


    let o = this.allOrders.find(order => order.build_number === this.OrderNum);
    if (!o) {
      this.props.errorDialog({
        label: 'Такой заказ не найден.',
        error: "Заказ не найден, обратитесь к администратору",
        code: ""
      });
      return;
    }

    if (Object.keys(this.state.orders).length === 0 && this.state.orders.find(order => order.uid === o.uid) !== undefined) {
      return;
    }

    ordersToShow.push(o);

    this.setState({
      orders: ordersToShow,
      orderNum: ''
    });

    setLocalOrders(ordersToShow);

  }


orderDeselect = (order) => (e) => {
  e.preventDefault();

    // const newOrderList = this.state.orders.filter((item) => item.uid !== order.uid);
    // this.setState({
    //   orders: newOrderList,
    //   orderNum: ''
    // });
    // setLocalOrders(newOrderList);

    order.selected = false;
    this.setState({
      orders : this.state.orders,
    });
    setLocalOrders(this.state.orders);
}

orderSelect = (order) => (e) => {
  e.preventDefault();

    order.selected = true;

    this.setState({
      orders : this.state.orders,
    });
    setLocalOrders(this.state.orders);
}


  // configureBackgroundGeolocation() {
  //   /* https://bitbucket.org/jupiter_team/courierapp/wiki/Home
  //     /api/v1/set_current_location_couriers Данные о местоположении хранятся в памяти.
  //     Для каждого курьера сохраняется только последнее местоположение, без истории
  //     POST запрос:
  //     {
  //       "courier_uid": "4:3:0:298972",
  //       "coordinates": "54.123122,55.2312111"
  //     }
  //   */

  //   const { server_ip, name, uid } = this.props.settings;
  //   const config = {
  //     // ...geoConfigStatic,  // вынес статичные настройки во внешний файл
  //     //                      // тамже незадействованые куски плагина

  //     logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
  //     desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_MEDIUM,

  //     url: `http://${server_ip}/api/v1/set_current_location_couriers`,
  //     params: {
  //       courier_name: name,
  //       courier_uid: uid
  //     }
  //   };

  //   BackgroundGeolocation.onLocation(this.onLocation.bind(this));

  //   BackgroundGeolocation.ready(config, state => {
  //     if (!state.enabled) {
  //       BackgroundGeolocation.start();
  //     }
  //   });
  // }

  // onLocation(location) {
  //   const position = getPosition (location, this.state.orders);
  //   if (this._ismounted)  this.setState(position);
  // }

  toggleShowLines = ({ uid }) => (e) => {
    // клик показывает/прячет строки заказа
    e.preventDefault()
    if (this._ismounted) this.setState({
      order_show: this.state.order_show === uid
        ? null // если уже открыт - закрыть
        : uid  // id открытого заказа
    });
  }

  openNavigator = () => {
    let result = window.cordova.InAppBrowser.open(this.state.navlink + '#external', '_system')
    console.log(result)
  }

  openOrderNavigator = (order) => {
    console.log(order)
    // let result = window.cordova.InAppBrowser.open(this.state.navlink + '#external', '_system')
    // console.log(result)
  }



  openMap = () => {
    if (this.state.maplink === "") {
      // alert ('У первого заказа нет координат места назначения. К сожалению, автоматическое построение маршрута невозможно. Вы можете скопировать адрес и вставить его в навигатор.') 
      this.props.errorDialog({
        label: '',
        error: "У первого заказа нет координат места назначения. К сожалению, автоматическое построение маршрута невозможно. Вы можете скопировать адрес и вставить его в навигатор.",
        code: "NO_ORDER_COORDS"
      });
      this.sendLogMsg('У первого заказа нет координат места назначения. К сожалению, автоматическое построение маршрута невозможно. Вы можете скопировать адрес и вставить его в навигатор.')
      return
    }
    // let inAppBrowserRef = window.cordova.InAppBrowser.open(this.state.maplink + '#external', '_system')
    this.inAppBrowserRef = window.cordova.InAppBrowser.open(this.state.maplink, '_system')
    // this.inAppBrowserRef.addEventListener('loaderror', this.URLloadErrorCallBack);
    console.log(navigator.userAgent)
  }

  // URLloadErrorCallBack = (params) => {
  //   console.log(params)
  //   alert(params.message)

  //   this.inAppBrowserRef.close();
  //   this.inAppBrowserRef = undefined;
  // }

  orderNumOnChange = (event) => {
    event.preventDefault()
    this.OrderNum = event.target.value
    this.setState({
      orderNum: event.target.value
    })
  };


  valutaChangedOnChange = (order) => (e) => {
    e.preventDefault();
    if (!order) return;
    let v = this.state.valutaChanged

    if (v.has(order.uid)) {
      v.delete(order.uid)
    } else {
      v.add(order.uid)
    }

    setLocalValutaChanged(v)
    this.setState({
      valutaChanged: v
    })
  }

  render() {
    const { classes } = this.props;
    const { order_show, orders, dialog_open,
      delivering, take_delivering_dialog, ready_to_deliver_dialog, courier_status, access_geolocation_dialog
    } = this.state;

    return (
      <Fragment>
        {/*
        {courier_status === 'free' &&

          <TakeOrderHeader
            errorDialog={error => this.props.errorDialog({
              label: 'Ошибка нотификации',
              error,
              code: "NOTIFY_ERROR"
            })}
            orders={orders}
            openMap={this.openMap}
            openNavigator={this.openNavigator}
            orderNumOnChange={this.orderNumOnChange}
            orderNumButton={this.orderNumButton}
            orderNum={this.state.orderNum}
          />
        }
        */}

        {/*
            <Divider />
        */}

        {((courier_status == "free") || (courier_status == "delivers_orders")) &&
          <List className={classes.root} >
            {Object.entries(orders).map(([_key, order]) => (

              <Fragment key={order.uid}>
                {/*
              <CountDown
              	deliver_at={order.deliver_at}
              	deliver_time={order.delivering_time ? order.delivering_time : 0}
              	ts={getLocalData().ts.filter(([uid, ts]) => uid === order.uid).pop()[1]}
            	/>
                */}
                <Order
                  toggleLines={this.toggleShowLines(order)}
                  doneDeliverDialog={this.selectOrder(order)}
                  takeDeliverDialog={
                    () => { if (this._ismounted) this.setState({ take_delivering_dialog: true, order }) }
                  }
                  is_open={order_show === order.uid}
                  is_delivering={delivering.has(order.uid)}
                  name={order.client.name}
                  phone={order.client.phone}
                  address={order.address}
                  comment={order.comment}
                  sum_fact={order.sum_fact}
                  deliver_at={order.deliver_at}
                  delivering_time={order.delivering_time}
                  order_uid={order.uid}
                  order={order}
                  valutaChanged={this.state.valutaChanged}
                  on_valuta_changed={this.valutaChangedOnChange(order)}
                  on_order_deselect={this.orderDeselect(order)}
                  on_order_select={this.orderSelect(order)}
                  courier_status={this.state.courier_status}
                  tz_coordinates={this.state.tz_coordinates}
                  selected={order.selected}
                />
{/*
                <Divider className={classes.order_delim} />
*/}
              </Fragment>
            ))}
          </List>
        }

        <DialogCourier is_dialog={take_delivering_dialog}
          title="Принять заказ к доставке?"
          cancel={() => { if (this._ismounted) this.setState({ take_delivering_dialog: false }) }}
          ok={this.confirmDelivery} />

     
        <Dialog className="dialog"
                open={access_geolocation_dialog}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="confirmation-dialog-title"
                fullWidth
        >
          <DialogContent>Разрешите использование геолокации! <br/><br/> Если запрос на включение геолокации в браузере не показывается, включите геолокацию вручную, как описано <a href="https://docs.jupiter.systems/link/838" target="_blank">в инструкции</a></DialogContent>
          <DialogActions>
            <Button onClick={this.accessGeo} variant="contained" color="primary">Ok</Button>
          </DialogActions>
        </Dialog>


        <DialogCourier is_dialog={dialog_open}
          title="Заказ доставлен?"
          cancel={() => { if (this._ismounted) this.setState({ dialog_open: false }) }}
          ok={this.handleOk}
        />

        <DialogCourier is_dialog={ready_to_deliver_dialog}
          title="Все заказы выбраны, начинаете доставку?"
          cancel={() => { if (this._ismounted) this.setState({ ready_to_deliver_dialog: false }) }}
          ok={this.startDelivery}
        />


        {(orders.length > 0) && (courier_status === 'free') && (Object.keys(this.state.orders.filter(e => e.selected === true && e.uid !== null)).length > 0) &&
          <Button variant="outlined"
            // startIcon={icon}
            color={"primary"}
            onClick={this.ready_to_deliver_dialog_open}
            style={{ width: "100%", marginTop: "12px", borderWidth: "2px" }}
          >
            Я поехал
          </Button>
        }

        {(courier_status === 'returning') &&
          <Button variant="outlined"
            // startIcon={icon}
            color={"primary"}
            onClick={this.returning}
            style={{ width: "100%", marginTop: "12px", borderWidth: "2px" }}
          >
            Я вернулся
          </Button>
        }

      </Fragment>


    );
  }
}


const styles = theme => ({
  root: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "lightgray"
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  order_delim: {
    marginTop: theme.spacing(1),
  },
  listnested: {
    paddingLeft: theme.spacing(4),
  },
  listnesteditem: {
    padding: "2px",
  },
});

export default withStyles(styles)(TakeOrder);
