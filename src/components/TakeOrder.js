// TODO
// РћС‡РёС‰Р°С‚СЊ РїРѕР»Рµ РІРІРѕРґР° РЅРѕРјРµСЂР° Р·Р°РєР°Р·Р° РїРѕСЃР»Рµ РїРѕРёСЃРєР°

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
      delivering: new Set(), // uid'С‹ Р·Р°РєР°Р·РѕРІ, РїСЂРёРЅСЏС‚С‹С… Рє РґРѕСЃС‚Р°РІРєРµ
      selectedOrders: new Set(), // uid'С‹ Р·Р°РєР°Р·РѕРІ, РєРѕС‚РѕСЂС‹Рµ РІС‹Р±СЂР°РЅС‹ Рє РґРѕСЃС‚Р°РІРєРµ
      valutaChanged: new Set(), // uid'С‹ Р·Р°РєР°Р·РѕРІ, Сѓ РєРѕС‚РѕСЂС‹С… РёР·РјРµРЅРёР»СЃСЏ РІРёРґ РѕРїР»Р°С‚С‹
      ready_to_deliver_dialog: false,
      take_delivering_dialog: false,
      access_geolocation_dialog: false,
      orders: [],
      order: {},
      dialog_open: false, // С„Р»Р°Рі, РґР° - РѕС‚РєСЂС‹С‚ Р”РёР°Р»РѕРі
      order_show: null,    // uid Р·Р°РєР°Р·Р°, РєРѕС‚РѕСЂС‹Р№ СЂР°Р·РІРµСЂРЅСѓС‚СЊ
      position: null,
      orderNum: '',
      tz_coordinates: []
    };

    var inAppBrowserRef;
    var _ismounted;
    var allOrders = new Array();
    var distance_to_tz_m; // Р”РѕРїСѓСЃС‚РёРјРѕРµ СЂР°СЃСЃС‚РѕСЏРЅРёРµ РґРѕ С‚РѕСЂРіРѕРІРѕР№ С‚РѕС‡РєРё
  }




  componentDidMount() {

    this.distance_to_tz_m = 100; // РљСѓСЂСЊРµСЂ РґРѕР»Р¶РµРЅ Р±С‹С‚СЊ Р±Р»РёР¶Рµ 100 Рј РґРѕ СЂРµСЃС‚РѕСЂР°РЅР°, С‡С‚РѕР±С‹ СЃС‡РёС‚Р°Р»РѕСЃСЊ, С‡С‚Рѕ РѕРЅ РІ СЂРµСЃС‚РѕСЂР°РЅРµ

    this._ismounted = true;

    this.props.changeState('CurrentName', 'МОИ ЗАКАЗЫ');

    this.get_courier_state(true);

    console.log ('Р Р°РЅРµРµ РІР·СЏС‚С‹Рµ Р·Р°РєР°Р·С‹', getLocalData().orders)
    this.state.orders = getLocalData().orders;
    this.state.tz_coordinates = getLocalData().tz_coordinates;



    if (window.cordova) {
      // РџРµСЂРёРѕРґРёС‡РµСЃРєР°СЏ РѕС‚РїСЂР°РІРєР° РјРµСЃС‚РѕРїРѕР»РѕР¶РµРЅРёСЏ РѕС‚РєР»СЋС‡РµРЅР°, С‚.Рє. РјС‹ С‚РµРїРµСЂСЊ РєРѕРЅС‚СЂРѕР»РёСЂСѓРµРј РІСЂРµРјСЏ РґРѕСЃС‚Р°РІРєРё РїРѕ СЏРЅРґРµРєСЃСѓ
      // setTimeout(() => { this.configureBackgroundGeolocation(); }, 5000);
    } else { }

      // РЎРЅР°С‡Р°Р»Р° РїРѕР»СѓС‡Р°РµРј РєРѕРѕСЂРґРёРЅР°С‚С‹
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
    // Р»РѕРіРёСЂРѕРІР°РЅРёРµ РґР°РЅРЅС‹С… РЅР° СЃРµСЂРІРµСЂРµ
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

  // progress - РѕС‚РѕР±СЂР°Р¶Р°С‚СЊ progress РёР»Рё РЅРµС‚
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
        // РЈСЃРїРµС€РЅРѕ РїРѕР»СѓС‡РµРЅ РѕС‚РІРµС‚ СЃРїРёСЃРѕРє Р·Р°РєР°Р·РѕРІ

        setLocalParams(data.courier_status, data.frserver_address, data.tz_coordinates)

        if (this._ismounted) {
          this.state.frserver_address = (data.frserver_address || "" );
          this.state.tz_coordinates = (data.tz_coordinates || "" );
          this.setState({courier_status: data.courier_status || "" });
        }

        switch (data.courier_status) {
          case 'shift_closed': // СЃРјРµРЅР° Р·Р°РєСЂС‹С‚
            // setLocalOrders([]); // 111
            this.props.errorDialog({
              label: 'РЎРјРµРЅР° РєСѓСЂСЊРµСЂР° Р·Р°РєСЂС‹С‚Р°.',
              error: "РџРѕРїСЂРѕСЃРёС‚Рµ Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂР° РѕС‚РєСЂС‹С‚СЊ СЂР°Р±РѕС‡СѓСЋ СЃРјРµРЅСѓ.",
              code: "SHIFT_CLOSED"
            });
            break
          case 'free': // СЃРІРѕР±РѕРґРµРЅ
            // setLocalOrders([]); // 111
            // this.allOrders = data.orders
            this.allOrders = data.orders.map(function (e) { 
              e.selected=false
              return e
            })
            setLocalOrders(this.allOrders || []); // 111
            this.setState({orders: this.allOrders})
          break
          case 'delivers_orders': // РІ РґРѕСЂРѕРіРµ
            // setLocalOrders(data.orders || []); // 111
            // if (this._ismounted) {
            //   this.setState({ orders: data.orders || [] })
            // }
            this.allOrders = data.orders
            setLocalOrders(this.allOrders || []); // 111
            this.setState({orders: this.allOrders})
          break
          case 'returning': // РІРѕР·РІСЂР°С‰Р°РµС‚СЃСЏ
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

    // Р¤РёР»СЊС‚СЂСѓРµРј РІС‹Р±СЂР°РЅРЅС‹Рµ Р·Р°РєР°Р·С‹ СЃ РІР°Р»РёРґРЅС‹РјРё UID
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
        // РЈСЃРїРµС€РЅРѕ РїРѕР»СѓС‡РµРЅ РѕС‚РІРµС‚
        if (this._ismounted) this.setState({ ready_to_deliver_dialog: false })
        this.get_courier_state(true);
      }
    });
  }


  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in m)
  // Р’РѕР·РІСЂР°С‰Р°РµС‚ СЂР°СЃСЃС‚РѕСЏРЅРёРµ РјРµР¶РґСѓ С‚РѕС‡РєР°РјРё РІ РјРµС‚СЂР°С…
  calcDist = (lat1, lon1, lat2, lon2) => {
    var toRad = (Value) => {
      return Value * Math.PI / 180;
    }

    var R = 6378137; // EarthвЂ™s mean radius in meter
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
      // // РЎРЅР°С‡Р°Р»Р° РїРѕР»СѓС‡Р°РµРј РєРѕРѕСЂРґРёРЅР°С‚С‹
      // const pos = await this.getGeoLocation();
      // console.log(pos);
      // // РџРѕСЃР»Рµ СѓСЃРїРµС€РЅРѕРіРѕ РїРѕР»СѓС‡РµРЅРёСЏ РєРѕРѕСЂРґРёРЅР°С‚ РїСЂРѕРІРµСЂСЏРµРј РґРёСЃС‚Р°РЅС†РёСЋ РґРѕ РјР°РіР°Р·РёРЅР°
      // let dist_m = this.calcDist(
      //   pos.coords.latitude,
      //   pos.coords.longitude,
      //   this.state.tz_coordinates[0],
      //   this.state.tz_coordinates[1]
      // );

      // this.sendLogMsg("РљСѓСЂСЊРµСЂ РІРµСЂРЅСѓР»СЃСЏ. РљРѕРѕСЂРґРёРЅР°С‚С‹ РєСѓСЂСЊРµСЂР°: " + pos.coords.latitude + ',' + pos.coords.longitude + " РљРѕРѕСЂРґРёРЅР°С‚С‹ РјР°РіР°Р·РёРЅР°: " + this.state.tz_coordinates[0] + "," + this.state.tz_coordinates[1] + " Р Р°СЃСЃС‚РѕСЏРЅРёРµ РґРѕ РјР°РіР°Р·РёРЅР°: " + dist_m);


      // if ((dist_m > 0) && (dist_m > this.distance_to_tz_m)) {
      //   this.props.errorDialog({
      //     label: 'Р’С‹ РґРѕР»Р¶РЅС‹ Р±С‹С‚СЊ РЅРµ РґР°Р»СЊС€Рµ ' + this.distance_to_tz_m + ' Рј. РѕС‚ С‚РѕСЂРіРѕРІРѕР№ С‚РѕС‡РєРё.',
      //     error: 'Р’С‹ РґРѕР»Р¶РЅС‹ Р±С‹С‚СЊ РЅРµ РґР°Р»СЊС€Рµ ' + this.distance_to_tz_m + ' Рј. РѕС‚ С‚РѕСЂРіРѕРІРѕР№ С‚РѕС‡РєРё.',
      //     code: ""
      //   });
      //   return;
      // }



      // Р•СЃР»Рё РєРѕРѕСЂРёРґР°РЅС‚С‹ РїРѕР»СѓС‡РµРЅС‹ Рё РїСЂРѕРІРµСЂРєР° РґРёСЃС‚Р°РЅС†РёРё РїСЂРѕР№РґРµРЅР° РІС‹РїРѕР»РЅСЏРµРј РїРѕСЃРµР»РґСѓСЋС‰СѓСЋ Р»РѕРіРёРєСѓ

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
          // РЈСЃРїРµС€РЅРѕ РїРѕР»СѓС‡РµРЅ РѕС‚РІРµС‚
          this.get_courier_state(true);
        }
      });
    } catch (error) {
      // console.error("РћС€РёР±РєР° РїСЂРё РїРѕР»СѓС‡РµРЅРёРё РіРµРѕР»РѕРєР°С†РёРё", error);
      // Р—РґРµСЃСЊ РјРѕР¶РЅРѕ РѕР±СЂР°Р±РѕС‚Р°С‚СЊ РѕС€РёР±РєРё, РµСЃР»Рё РѕРЅРё РїСЂРѕРёР·РѕС€Р»Рё
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
                //   label: 'РЈСЃРїРµС€РЅР°СЏ РіРµРѕР»РѕРєР°С†РёСЏ: ' + JSON.stringify(pos),
                //   error: 'РЈСЃРїРµС€РЅР°СЏ РіРµРѕР»РѕРєР°С†РёСЏ: ' + JSON.stringify(pos),
                //   code: ""
                // });
                it.sendLogMsg(pos);
                resolve(pos); // Р’РѕР·РІСЂР°С‰Р°РµРј СЂРµР·СѓР»СЊС‚Р°С‚
              },
              (err) => {
                it.sendLogMsg(err);
                // it.props.errorDialog({
                //   label: 'РћС€РёР±РєР° РіРµРѕР»РѕРєР°С†РёРё: ' + JSON.stringify(err),
                //   error: 'РћС€РёР±РєР° РіРµРѕР»РѕРєР°С†РёРё: ' + JSON.stringify(err),
                //   code: ""
                // });
                reject(err); // РћС‚РєР»РѕРЅСЏРµРј РїСЂРѕРјРёСЃ СЃ РѕС€РёР±РєРѕР№
              },
              this.geoOptions
            );
          } else if (result.state === "denied") {

            this.setState({ access_geolocation_dialog: true});

            // this.props.errorDialog({
            //   label: 'Р’РєР»СЋС‡РёС‚Рµ РіРµРѕР»РѕРєР°С†РёСЋ РЅР° СѓСЃС‚СЂРѕР№СЃС‚РІРµ.',
            //   error: "Р’РєР»СЋС‡РёС‚Рµ РіРµРѕР»РѕРєР°С†РёСЋ РЅР° СѓСЃС‚СЂРѕР№СЃС‚РІРµ.",
            //   code: ""
            // });
            // reject(new Error("Р“РµРѕР»РѕРєР°С†РёСЏ РѕС‚РєР»СЋС‡РµРЅР° РїРѕР»СЊР·РѕРІР°С‚РµР»РµРј"));
          }
        });
      } else {
        reject(new Error("Р“РµРѕР»РѕРєР°С†РёСЏ РЅРµРґРѕСЃС‚СѓРїРЅР° РЅР° РґР°РЅРЅРѕРј СѓСЃС‚СЂРѕР№СЃС‚РІРµ"));
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
      // alert('РљРѕРѕСЂРґРёРЅР°С‚С‹ РїРѕР»СѓС‡РµРЅС‹:', location.coords);
    } catch (error) {
      // alert('РћС€РёР±РєР° РіРµРѕР»РѕРєР°С†РёРё:', error.message);
      console.log('РћС€РёР±РєР° РіРµРѕР»РѕРєР°С†РёРё:', error.message);
      // it.props.errorDialog({
      //   label: 'РћС€РёР±РєР° РіРµРѕР»РѕРєР°С†РёРё: ' + JSON.stringify(error),
      //   error: 'РћС€РёР±РєР° РіРµРѕР»РѕРєР°С†РёРё: ' + JSON.stringify(error),
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
        label: 'Р’С‹ СѓР¶Рµ РІС‹Р±СЂР°Р»Рё СЌС‚РѕС‚ Р·Р°РєР°Р·.',
        error: "Р’С‹ СѓР¶Рµ РІС‹Р±СЂР°Р»Рё СЌС‚РѕС‚ Р·Р°РєР°Р·.",
        code: ""
      });
      return;
    }


    let o = this.allOrders.find(order => order.build_number === this.OrderNum);
    if (!o) {
      this.props.errorDialog({
        label: 'РўР°РєРѕР№ Р·Р°РєР°Р· РЅРµ РЅР°Р№РґРµРЅ.',
        error: "Р—Р°РєР°Р· РЅРµ РЅР°Р№РґРµРЅ, РѕР±СЂР°С‚РёС‚РµСЃСЊ Рє Р°РґРјРёРЅРёСЃС‚СЂР°С‚РѕСЂСѓ",
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
  //     /api/v1/set_current_location_couriers Р”Р°РЅРЅС‹Рµ Рѕ РјРµСЃС‚РѕРїРѕР»РѕР¶РµРЅРёРё С…СЂР°РЅСЏС‚СЃСЏ РІ РїР°РјСЏС‚Рё.
  //     Р”Р»СЏ РєР°Р¶РґРѕРіРѕ РєСѓСЂСЊРµСЂР° СЃРѕС…СЂР°РЅСЏРµС‚СЃСЏ С‚РѕР»СЊРєРѕ РїРѕСЃР»РµРґРЅРµРµ РјРµСЃС‚РѕРїРѕР»РѕР¶РµРЅРёРµ, Р±РµР· РёСЃС‚РѕСЂРёРё
  //     POST Р·Р°РїСЂРѕСЃ:
  //     {
  //       "courier_uid": "4:3:0:298972",
  //       "coordinates": "54.123122,55.2312111"
  //     }
  //   */

  //   const { server_ip, name, uid } = this.props.settings;
  //   const config = {
  //     // ...geoConfigStatic,  // РІС‹РЅРµСЃ СЃС‚Р°С‚РёС‡РЅС‹Рµ РЅР°СЃС‚СЂРѕР№РєРё РІРѕ РІРЅРµС€РЅРёР№ С„Р°Р№Р»
  //     //                      // С‚Р°РјР¶Рµ РЅРµР·Р°РґРµР№СЃС‚РІРѕРІР°РЅС‹Рµ РєСѓСЃРєРё РїР»Р°РіРёРЅР°

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
    // РєР»РёРє РїРѕРєР°Р·С‹РІР°РµС‚/РїСЂСЏС‡РµС‚ СЃС‚СЂРѕРєРё Р·Р°РєР°Р·Р°
    e.preventDefault()
    if (this._ismounted) this.setState({
      order_show: this.state.order_show === uid
        ? null // РµСЃР»Рё СѓР¶Рµ РѕС‚РєСЂС‹С‚ - Р·Р°РєСЂС‹С‚СЊ
        : uid  // id РѕС‚РєСЂС‹С‚РѕРіРѕ Р·Р°РєР°Р·Р°
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
      // alert ('РЈ РїРµСЂРІРѕРіРѕ Р·Р°РєР°Р·Р° РЅРµС‚ РєРѕРѕСЂРґРёРЅР°С‚ РјРµСЃС‚Р° РЅР°Р·РЅР°С‡РµРЅРёСЏ. Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРѕРµ РїРѕСЃС‚СЂРѕРµРЅРёРµ РјР°СЂС€СЂСѓС‚Р° РЅРµРІРѕР·РјРѕР¶РЅРѕ. Р’С‹ РјРѕР¶РµС‚Рµ СЃРєРѕРїРёСЂРѕРІР°С‚СЊ Р°РґСЂРµСЃ Рё РІСЃС‚Р°РІРёС‚СЊ РµРіРѕ РІ РЅР°РІРёРіР°С‚РѕСЂ.') 
      this.props.errorDialog({
        label: '',
        error: "РЈ РїРµСЂРІРѕРіРѕ Р·Р°РєР°Р·Р° РЅРµС‚ РєРѕРѕСЂРґРёРЅР°С‚ РјРµСЃС‚Р° РЅР°Р·РЅР°С‡РµРЅРёСЏ. Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРѕРµ РїРѕСЃС‚СЂРѕРµРЅРёРµ РјР°СЂС€СЂСѓС‚Р° РЅРµРІРѕР·РјРѕР¶РЅРѕ. Р’С‹ РјРѕР¶РµС‚Рµ СЃРєРѕРїРёСЂРѕРІР°С‚СЊ Р°РґСЂРµСЃ Рё РІСЃС‚Р°РІРёС‚СЊ РµРіРѕ РІ РЅР°РІРёРіР°С‚РѕСЂ.",
        code: "NO_ORDER_COORDS"
      });
      this.sendLogMsg('РЈ РїРµСЂРІРѕРіРѕ Р·Р°РєР°Р·Р° РЅРµС‚ РєРѕРѕСЂРґРёРЅР°С‚ РјРµСЃС‚Р° РЅР°Р·РЅР°С‡РµРЅРёСЏ. Рљ СЃРѕР¶Р°Р»РµРЅРёСЋ, Р°РІС‚РѕРјР°С‚РёС‡РµСЃРєРѕРµ РїРѕСЃС‚СЂРѕРµРЅРёРµ РјР°СЂС€СЂСѓС‚Р° РЅРµРІРѕР·РјРѕР¶РЅРѕ. Р’С‹ РјРѕР¶РµС‚Рµ СЃРєРѕРїРёСЂРѕРІР°С‚СЊ Р°РґСЂРµСЃ Рё РІСЃС‚Р°РІРёС‚СЊ РµРіРѕ РІ РЅР°РІРёРіР°С‚РѕСЂ.')
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
              label: 'РћС€РёР±РєР° РЅРѕС‚РёС„РёРєР°С†РёРё',
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
        {(!((courier_status == 'free') || (courier_status == 'delivers_orders'))) && (
          <div style={{ padding: '16px', textAlign: 'center', color: 'var(--muted)' }}>
            {'\u041D\u0435\u0442 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445 \u0437\u0430\u043A\u0430\u0437\u043E\u0432'}
          </div>
        )}

        <DialogCourier is_dialog={take_delivering_dialog}
          title={'\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C, \u0447\u0442\u043E \u0432\u044B \u0432\u0437\u044F\u043B\u0438 \u0437\u0430\u043A\u0430\u0437?'}
          cancel={() => { if (this._ismounted) this.setState({ take_delivering_dialog: false }) }}
          ok={this.confirmDelivery} />

     
        <Dialog className="dialog"
                open={access_geolocation_dialog}
                disableBackdropClick
                disableEscapeKeyDown
                aria-labelledby="confirmation-dialog-title"
                fullWidth
        >
          <DialogContent>{'\u0414\u043B\u044F \u0440\u0430\u0431\u043E\u0442\u044B \u043D\u0443\u0436\u043D\u043E \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0433\u0435\u043E\u043B\u043E\u043A\u0430\u0446\u0438\u0438!'} <br/><br/> {'\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430/\u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0438 \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044E.'} <a href="https://docs.jupiter.systems/link/838" target="_blank">{'\u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F'}</a></DialogContent>
          <DialogActions>
            <Button onClick={this.accessGeo} variant="contained" color="primary">Ok</Button>
          </DialogActions>
        </Dialog>


        <DialogCourier is_dialog={dialog_open}
          title={'\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0443?'}
          cancel={() => { if (this._ismounted) this.setState({ dialog_open: false }) }}
          ok={this.handleOk}
        />

        <DialogCourier is_dialog={ready_to_deliver_dialog}
          title={'\u0413\u043E\u0442\u043E\u0432\u044B \u043A \u043E\u0442\u044A\u0435\u0437\u0434\u0443 \u0441 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u043C\u0438 \u0437\u0430\u043A\u0430\u0437\u0430\u043C\u0438?'}
          cancel={() => { if (this._ismounted) this.setState({ ready_to_deliver_dialog: false }) }}
          ok={this.startDelivery}
        />


        {(orders.length > 0) && (courier_status === 'free') && (Object.keys(this.state.orders.filter(e => e.selected === true && e.uid !== null)).length > 0) &&
          <div style={{ padding: '0 12px' }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={this.ready_to_deliver_dialog_open}
              className="deliver-equal"
              style={{ marginTop: "12px", width: '100%' }}
            >
              {'\u042F \u043F\u043E\u0435\u0445\u0430\u043B'}
            </Button>
          </div>
        }

        {(courier_status === 'returning') &&
          <Button variant="contained" color="primary" className="deliver-equal" onClick={this.returning} style={{ width: "100%", marginTop: "12px" }}>{'\u042F \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u044E\u0441\u044C'}</Button>
        }

      </Fragment>


    );
  }
}


const styles = theme => ({
  root: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "transparent"
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






