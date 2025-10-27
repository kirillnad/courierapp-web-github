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

    Заказ № {order.build_number} доставить к {deliver_at}

  </span>
  // </Button>
)

              // window.open(`dgis://2gis.ru/routeSearch/rsType/car/to/${order.coordinates[1]},${order.coordinates[0]}`, '_system')
              // https://yandex.ru/maps/213/moscow/?from=api-maps&origin=jsapi_2_1_79&z=10&ll=37.6431%2C55.7936&pt=37.6176%2C55.7558~37.5884%2C55.7356~37.6431%2C55.7936

export const NavButton = ({ order, tz_coordinates }) => (
  <Button
      variant="text"
      color="primary"
      endIcon={<NavIcon />}
      style={{margin: "-8px"}}
      onClick={() => { 
          if (order.coordinates === undefined) {
            alert ("У этого заказа нет координат. Просто скопируйте адрес и вставьте в навигатор.")  
          } else {
            // window.open(`https://yandex.ru/maps/?from=api-maps&origin=jsapi_2_1_79&z=10&ll=${order.coordinates[1]}%2C${order.coordinates[0]}&pt=${order.coordinates[1]}%2C${order.coordinates[0]}`, '_system')
        
        let yaurl = `https://yandex.ru/maps/?from=api-maps&mode=routes&origin=jsapi_2_1_79&rtext=${tz_coordinates[0]}%2C${tz_coordinates[1]}~${order.coordinates[0]}%2C${order.coordinates[1]}&rtt=auto&ruri=~&z=10`

        window.open(yaurl, '_system')
        console.log (yaurl)

          }
        }
      }
  >
    Маршрут
  </Button>
)

        //   if (order.coordinates === undefined) {
        //     alert ("У этого заказа нет координат. Просто скопируйте адрес и вставьте в навигатор.")  
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
  </Button>
)


export const SummaButton = ({ order, prepayment, valuta, text, decoration }) => {
  return (
      <Button 
          variant="outlined"
          // color="primary"
          className=""
      >
        <span style={{display: "inline-block"}} >{text} 
        <span style={{fontSize:"2em"}}>{order.sum_fact}</span> 
        &nbsp; &#8381; &nbsp; 
        <span style={{fontSize:"1.2em", textDecoration: `${decoration}`}} > {valuta} </span></span>
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
            {(active) ? "Оплачено: " : ""}
            {(!active) ? "Изменить: " : ""}
            {valuta} 
            </Button> )
}


export const DeselectButton = ({ order, active, valuta, onClick }) => {
  if (order.prepayment===1) {
    return null;
  }
 
  return (<Button 
      variant="outlined"
      onClick={onClick}
      style={{whiteSpace: "pre-wrap"}}
    > 
    {"ОТКАЗАТЬСЯ \n от заказа"}
    </Button> )
}

export const DeliverButton = ({ deliver_at, delivering_time, onClick, deliver_button, icon, color, order_uid }) => (
  <Button variant="outlined" color={color}
      // startIcon={icon}
      onClick={onClick}
      style={{width:"100%", marginTop: "12px", borderWidth: "2px"}}
  >
  Доставил
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

