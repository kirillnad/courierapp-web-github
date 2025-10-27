
import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import api from './api';
import Scroller from './components/Scroller';
import Settings from './components/Settings';
import TakeOrder from './components/TakeOrder';
import History from './components/History';
// import CourierStatus from './components/CourierStatus';
import Header from './components/Header';

import './css/gogo.light.purple.scss'
import './css/App.scss'

import { ThemeColors } from './helpers/ThemeColors'
const colors = ThemeColors()

const NoData = () => <div />;
const empty_error_dialog = {
  label: '',
  code: '',
  error: ''
};

const empty_showStat_dialog = {
  "data": {
    "result": "",
    "day": {
        "label": "",
        "orders_qty": "" ,
        "orders_sum": "",
        "cash_sum": "",
        "cashless_sum": "",
        "wage": ""
    },
    "month": {
        "label": "",
        "orders_qty": "",
        "orders_sum": "",
        "cash_sum": "",
        "cashless_sum": "",
        "wage": ""
    }
  }
};

class App extends Component {
  PROGRESS_TIMEOUT = null // константа: таймаут появления окна с прогрессом

  constructor(props) {
    super(props);
    this.state = {
      CurrentPage: "",
      CurrentName: null,
      settings: {
        server_ip: '',
        // status: "not_active",
        name: '',
        uid: '',
        login: '',
        password: '',
        tz_uid: '',
      },
      scrollToTop: null,
      progress: false,
      is_error: false,
      is_showStat: false,
      error_context: empty_error_dialog,
      showStat_context: empty_showStat_dialog
    };
  }

  componentDidMount () {
    const settings = JSON.parse(localStorage.getItem('settings')) || {};
    const { server_ip = '', uid = '' } = settings;

    let CurrentPage;

    if ([server_ip, uid].some(elm => elm.length === 0)) {
      CurrentPage = "settings";
    } else {
      CurrentPage = "take_order";
    }

    this.setState({ settings, CurrentPage })
  }

  // изменить состояние компонента App
  changeState = (name, data) => this.setState({ [name]: data })

  // Крутилька
  initProgress = () => { // создать окно с прогрессом, если ответа нет дольше, чем таймаут
    if (this.PROGRESS_TIMEOUT !== null) {
      clearInterval(this.PROGRESS_TIMEOUT)
    }
    this.PROGRESS_TIMEOUT = setInterval(
      () => this.setState({ progress: true }),
      // 2000 // 1000 = 1 секунда
      1 // 1000 = 1 секунда
    )
  }
  dropProgress = () => { // закрыть окно с прогрессом
    clearInterval(this.PROGRESS_TIMEOUT)
    if (this.state.progress) this.setState({ progress: false })
    this.PROGRESS_TIMEOUT = null
  }

  errorDialog = (error_context = {}) => {
    this.dropProgress();
    this.setState({
      is_error: Object.keys(error_context).length > 0,
      error_context
    });
  }

  showStatDialog = (showStat_context = {}) => {
    this.dropProgress();
    this.setState({
      is_showStat: Object.keys(showStat_context).length > 0,
      showStat_context
    });
  }

  api_post = ({ server_ip, url, request, progress = true }) => {

    console.warn ("progress", progress)
    console.log("url:", url)

    if (progress) {
      this.initProgress();
    }

    console.log("url_1:", url)

    return api.post(server_ip || this.state.settings.server_ip, url, request)
      .then(({ error, label, code = '', data = {}}) => {
      // .then(response => {

        console.log("data:", data)

        // if (typeof response === "object") {
        //   let { result, ...data_ } = data;
        //   data = data_;
        // }

        if (error) {

          switch (code) {
            case 'TIMEOUT_ERROR':
              label = 'Нет подключения к сети интернет или сервер недоступен'
              break;  
          }

          data = { data, code, error, label };
          this.errorDialog({ label, error, code });
        } else if (progress) {
          this.dropProgress();
        }

        return data;

    })
  }

  api_get = (url, request, progress = true) => {

    let label, error, code

    if (progress) {
      this.initProgress();
    }

    return api.get(url, request)
      .then((res) => {
        label = res.label
        error = res.error
        code = res.code
        if (res.error) {

          switch (res.code) {
            case 'TIMEOUT_ERROR':
              label = 'Нет подключения к сети интернет или сервер недоступен'
              break;  
          }

          this.errorDialog({ label, error, code });
        } else if (progress) {
          this.dropProgress();
        }

        return res;

    })
  }


// --- navigator.geolocation ------------------------------

geo_success = (position) => {


  // console.log ("geo_success")
  // console.log(position.coords.latitude, position.coords.longitude);
  // console.log ("uid")
  // console.log (this.state.settings.uid)

  // // Отправляем текущее положение на сервер
  // const request = {
  //   'url': 'set_current_location_couriers',
  //   'progress': false,
  //   'request': {
  //     'location': {
  //       'coords' : { 
  //         'latitude': position.coords.latitude, 
  //         'longitude': position.coords.longitude,
  //         'param': 1
  //       },
  //     },
  //     'courier_uid' : this.state.settings.uid,
  //   }
  // };

  // this.api_post(request).then((response) => {
  //      console.log("set_current_location_couriers response", response);
  //     });


}

geo_error = () => {
  console.log ("geo_error")
}

geo_options = {
  enableHighAccuracy: false,
  maximumAge: 30000,
  timeout: 27000,
};

// wpid = navigator.geolocation.watchPosition(
//   this.geo_success,
//   this.geo_error,
//   this.geo_options,
// );


sendLogMsg = (logmsg) => {
  // логирование данных на сервере
  const request = {
    'url': 'logmsg',
    'progress': false,
    'request': {
      'tz_uid': this.state.settings.tz_uid,
      'courier_name': this.state.settings.name,
      'courier_uid': this.state.settings.uid,
      logmsg
    }
  };
    this.api_post(request);
  }


show_stat = () => {


    const request = {
      'url': 'get_courier_stats',
      'request': {
        'courier_uid': this.state.settings.uid,
        'tz_uid': this.state.settings.tz_uid
      },
      'progress': true
    };


    return this.api_post(request).then((data) => {
      console.log("get_courier_stats response", data);

      if (data.result == "error" || data.status == "error") {
        this.errorDialog({
          label: (data.desc !== undefined ? data.desc : '') + " " + (data.message !== undefined ? data.message : ''),
          error: data.desc,
          code: data.code
        });

        this.sendLogMsg((data.desc !== undefined ? data.desc : '') + " " + (data.message !== undefined ? data.message : ''));
      } else {

        // console.log (data.day.label)
        this.showStatDialog({data});
      }
    });

};

reload = () => {
  window.location.reload();
}

// ---------------------------------




  pageRouter = (CurrentPage) => {
    let Component, goBack;

    // const is_active = this.state.settings.status === "active";

    switch(CurrentPage) {
      case 'settings':
        Component = Settings
        goBack = null
        break

      case 'take_order':
        Component = TakeOrder
        goBack = () => this.changeState('CurrentPage', 'settings')
        break;

      case 'history':
        Component = History
        goBack = () => this.changeState('CurrentPage', 'take_order')
        break;

      default:
        Component = NoData
        goBack = null
    };

    return [Component, goBack]
  }

  goHistory = () => {
    this.changeState('CurrentPage', 'history')
  }

  render() {
    const {
      CurrentPage, settings, CurrentName,
      progress, is_error, error_context, is_showStat, showStat_context
    } = this.state;

    const [Component, goBack] = this.pageRouter(CurrentPage);

    return (
      <div>
        <div className="app_header">
          <Header name={CurrentName} goBack={goBack} showStat={this.show_stat} reload={this.reload} goHistory={this.goHistory} />
        </div>

        <Scroller scrollToTop={this.state.scrollToTop} changeState={this.changeState}>
           <Component settings={settings}
                      api_post={this.api_post}
                      api_get={this.api_get}
                      changeState={this.changeState}
                      errorDialog={this.errorDialog}
            />
        </Scroller>

        <Dialog className="app_progress" open={progress} fullWidth keepMounted>
          <DialogTitle>Передача данных</DialogTitle>
          <DialogContent style={{display: "flex", justifyContent: "center"}}>
              <CircularProgress />
          </DialogContent>
        </Dialog>

        <Dialog className="dialog" open={is_error} fullWidth keepMounted>
          <DialogTitle>Информация</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {error_context.label || ""}
            {/*
              <br/>
              {error_context.error || ""}
            */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained"
                    color="primary"
                    onClick={() => error_context.callback
                      ? [this.errorDialog(), error_context.callback()]
                      : this.errorDialog()
                    }
            >Ok</Button>
          </DialogActions>
        </Dialog>

        <Dialog className="dialog" open={is_showStat} fullWidth keepMounted>
          <DialogTitle>Статистика</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <b>За сегодня: {showStat_context.data.day.label || ""} </b>
              <br/>
              Заказов: {showStat_context.data.day.orders_qty || ""}
              <br/>
              На сумму: {showStat_context.data.day.orders_sum || ""}
              <br/>
              Наличными: {showStat_context.data.day.cash_sum || ""}
              <br/>
              Картой: {showStat_context.data.day.cashless_sum || ""}
              <br/>
              <u>Заработал: {showStat_context.data.day.wage || ""}</u>
              <br/>
              <br/>
              <b>За месяц: {showStat_context.data.month.label || ""} </b>
              <br/>
              Заказов: {showStat_context.data.month.orders_qty || ""}
              <br/>
              На сумму: {showStat_context.data.month.orders_sum || ""}
              <br/>
              Наличными: {showStat_context.data.month.cash_sum || ""}
              <br/>
              Картой: {showStat_context.data.month.cashless_sum || ""}
              <br/>
              <u>Заработал: {showStat_context.data.month.wage || ""}</u>
              <br/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained"
                    color="primary"
                    onClick={() => {
                      this.setState({ is_showStat: false }) }
                    }
            >Ok</Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

export default App;
