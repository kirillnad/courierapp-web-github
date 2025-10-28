// https://help.2gis.ru/question/razrabotchikam-zapusk-ideystviya-vmobilnom-prilozhenii-cherez-deeplink

import React from 'react';
import Button from '@material-ui/core/Button';
import NavIcon from '@material-ui/icons/NearMe';
import Phone from '@material-ui/icons/Phone';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import CountDown from './CountDown';
// import {setLocalOrders, setLocalDelivering, setLocalData, getLocalData} from '../localData';
import MapOutlinedIcon from '@material-ui/icons/MapOutlined';


export const PhoneButton = ({ phone, phone_button }) => (
  <Button
      variant="text"
      color="primary"
      style={{marginLeft: "-8px"}}
      startIcon={<Phone />}
      onClick={() => window.open(`tel:${phone}`)}
  >
    {phone}
  </Button>
)

export const OrderNumButton = ({ order, deliver_at }) => (
  // <Button 
  //     variant="text"
  //     color="primary"
  //     // startIcon={<LocalMallIcon />}
  // >
  <span>

    {'\u0417\u0430\u043A\u0430\u0437 \u2116'} {order.build_number} {'\u0434\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A'} {deliver_at}

  </span>
  // </Button>
)

              // window.open(`dgis://2gis.ru/routeSearch/rsType/car/to/${order.coordinates[1]},${order.coordinates[0]}`, '_system')
              // https://yandex.ru/maps/213/moscow/?from=api-maps&origin=jsapi_2_1_79&z=10&ll=37.6431%2C55.7936&pt=37.6176%2C55.7558~37.5884%2C55.7356~37.6431%2C55.7936

export const NavButton = ({ order, tz_coordinates }) => (
  <Button
      variant="text"
      size="small"
      className="route-badge"
      endIcon={<NavIcon fontSize="small" />}
      onClick={() => {
        if (order.coordinates === undefined) {
          alert('\u041D\u0435\u0442 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442 \u0437\u0430\u043A\u0430\u0437\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0430\u0434\u0440\u0435\u0441.')
        } else {
          const yaurl = `https://yandex.ru/maps/?from=api-maps&mode=routes&origin=jsapi_2_1_79&rtext=${tz_coordinates[0]}%2C${tz_coordinates[1]}~${order.coordinates[0]}%2C${order.coordinates[1]}&rtt=auto&ruri=~&z=10`;
          window.open(yaurl, '_system');
          console.log(yaurl);
        }
      }}
  >
     {'\u041C\u0430\u0440\u0448\u0440\u0443\u0442'}
   </Button>
)

        //   if (order.coordinates === undefined) {
        //     alert ('\u041D\u0435\u0442 \u043A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442 \u0437\u0430\u043A\u0430\u0437\u0430. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0430\u0434\u0440\u0435\u0441.' )  
        //   } else {
        //     console.log(`dgis://2gis.ru/routeSearch/rsType/car/to/${order.coordinates[1]},${order.coordinates[0]}`)
        //     if (window.cordova) {
        //       window.cordova.InAppBrowser.open(`dgis://2gis.ru/routeSearch/rsType/car/to/${order.coordinates[1]},${order.coordinates[0]}`, '_system')
        //     } else {
        //       window.open(`https://yandex.ru/maps/?from=api-maps&origin=jsapi_2_1_79&z=10&ll=${order.coordinates[1]}%2C${order.coordinates[0]}&pt=${order.coordinates[1]}%2C${order.coordinates[0]}`, '_system')
        //       console.log (`https://yandex.ru/maps/?from=api-maps&origin=jsapi_2_1_79&z=10&ll=${order.coordinates[1]}%2C${order.coordinates[0]}&pt=${order.coordinates[1]}%2C${order.coordinates[0]}`)
        //     }
        //   }
        // }


export const AllOrdersButton = ({ orders }) => (
  <Button
      variant="text"
      color="primary"
      startIcon={<NavIcon />}
      style={{margin: "-8px"}}
      onClick={() => { 
        let center1 = orders[0].coordinates[1];
        let center2 = orders[0].coordinates[0];

        let points = '';
        orders.forEach(order => {
          points = points + orders[0].coordinates[1] + '%2C' + orders[0].coordinates[0] + '~'
        });
        console.log('points', points)
        // window.open(`https://yandex.ru/maps/?from=api-maps&origin=jsapi_2_1_79&z=10&ll=${center1}%2C${center2}&pt=${points}`, '_system')

window.open(`https://yandex.ru/maps/
?from=api-maps
&ll=${this.props.courier_data.tz_coordinates[0]}%2C$${this.props.courier_data.tz_coordinates[1]}
&mode=routes
&origin=jsapi_2_1_79
&rtext=${this.props.courier_data.tz_coordinates[0]}%2C$${this.props.courier_data.tz_coordinates[1]}~${points}
&rtt=auto&ruri=~&z=
`, '_system')
console.log (`https://yandex.ru/maps/
?from=api-maps
&ll=${this.props.courier_data.tz_coordinates[0]}%2C$${this.props.courier_data.tz_coordinates[1]}
&mode=routes
&origin=jsapi_2_1_79
&rtext=${this.props.courier_data.tz_coordinates[0]}%2C$${this.props.courier_data.tz_coordinates[1]}~${points}
&rtt=auto&ruri=~&z=
`, '_system')


      }
    }
  >
    {'\u041C\u0430\u0440\u0448\u0440\u0443\u0442'}
  </Button>
)


export const SummaButton = ({ order, prepayment, valuta, text, decoration }) => {
  return (
      <Button 
          variant="outlined"
          className="sum-chip"
      >
        <span style={{display: "inline-flex", alignItems: 'baseline', gap: '4px'}}>
          <span style={{opacity:.8, whiteSpace: 'nowrap'}}>{text}</span>
          <span style={{fontSize:"1.3em", fontWeight: 700}}>{order.sum_fact}</span>
          <span style={{opacity:.8}}>&#8381;</span>
          <span style={{fontSize:"1em", textDecoration: `${decoration}`, opacity:.85}}>{valuta}</span>
        </span>
      </Button>
    )

}


export const ValutaButton = ({ order, active, valuta, onClick }) => {
  if (order.prepayment===1) {
    return null;
  }
  let color = "default"
  // if (!active) {color = "lightgray"}

    return (<Button 
              variant="outlined"
              onClick={onClick}
              color={active ? "secondary" : "default"}
              style={{color: `${color}`, whiteSpace: "pre-wrap"}}
            > 
            {(active) ? '\u041F\u0440\u0435\u0434\u043E\u043F\u043B\u0430\u0442\u0430: ' : ''}
            {(!active) ? '\u041E\u043F\u043B\u0430\u0442\u0430: ' : ''}
            {valuta} 
            </Button> )
}


export const SelectButton = ({ order, active, valuta, onClick }) => {
  return (
    <Button 
      variant="contained"
      color="primary"
      size="small"
      className="action-equal"
      onClick={onClick}
      style={{whiteSpace: 'nowrap'}}
    >
      {'\u041F\u0440\u0438\u043D\u044F\u0442\u044C \u0437\u0430\u043A\u0430\u0437'}
    </Button>
  )
}

export const DeselectButton = ({ order, active, valuta, onClick }) => {
  return (
    <Button 
      variant="outlined"
      color="primary"
      size="small"
      className="action-equal"
      onClick={onClick}
      style={{whiteSpace: 'nowrap'}}
    > 
      {'\u041E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F'}
    </Button>
  )
}

export const DeliverButton = ({ deliver_at, delivering_time, onClick, deliver_button, icon, color, order_uid }) => (
  <Button variant="contained" color={color} className="deliver-equal"
      onClick={onClick}
      style={{width:"100%", marginTop: "12px"}}
  >
  {'\\u0414\\u043E\\u0441\\u0442\\u0430\\u0432\\u043B\\u0435\\u043D\\u043E'}
  {/*
  <b>{deliver_at}</b>
    <p style={{fontSize: '1rem'}}>{deliver_at}</p>
  <CountDown
    deliver_at={deliver_at}
    deliver_time={delivering_time ? delivering_time : 0}
    ts={getLocalData().ts.filter(([uid, ts]) => uid === order_uid).pop()[1]}
  />
*/}
  </Button>
)




