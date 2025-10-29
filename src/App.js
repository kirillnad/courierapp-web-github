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
import History from './components/HistoryNew';
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
  data: {
    result: '',
    day: {
      label: '',
      orders_qty: '',
      orders_sum: '',
      cash_sum: '',
      cashless_sum: '',
      wage: ''
    },
    month: {
      label: '',
      orders_qty: '',
      orders_sum: '',
      cash_sum: '',
      cashless_sum: '',
      wage: ''
    }
  }
};

class App extends Component {
  PROGRESS_TIMEOUT = null // Константа: таймаут появления окна с прогрессом

  constructor(props) {
    super(props);
    this.state = {
      CurrentPage: '',
      CurrentName: null,
      settings: {
        server_ip: '',
        // status: 'not_active',
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
      CurrentPage = 'settings';
    } else {
      CurrentPage = 'take_order';
    }

    this.setState({ settings, CurrentPage })
  }

  // изменить состояние компонента App
  changeState = (name, data) => this.setState({ [name]: data })

  // Крутилка
  initProgress = () => { // создать окно с прогрессом, если ответа нет дольше, чем таймаут
    if (this.PROGRESS_TIMEOUT !== null) {
      clearInterval(this.PROGRESS_TIMEOUT)
    }
    this.PROGRESS_TIMEOUT = setInterval(
      () => this.setState({ progress: true }),
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

    console.warn ('progress', progress)
    console.log('url:', url)

    if (progress) {
      this.initProgress();
    }

    console.log('url_1:', url)

    return api.post(server_ip || this.state.settings.server_ip, url, request)
      .then(({ error, label, code = '', data = {}}) => {

        console.log('data:', data)

        if (error) {
          switch (code) {
            case 'TIMEOUT_ERROR':
              label = 'Истекло время ожидания ответа от сервера. Проверьте подключение'
              break;
            default:
              break;
          }

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
              label = 'Истекло время ожидания ответа от сервера. Проверьте подключение'
              break;
            default:
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
    // reserved
  }

  geo_error = () => {
    console.log ('geo_error')
  }

  geo_options = {
    enableHighAccuracy: false,
    maximumAge: 30000,
    timeout: 27000,
  };

  sendLogMsg = (logmsg) => {
    const request = {
      url: 'logmsg',
      progress: false,
      request: {
        tz_uid: this.state.settings.tz_uid,
        courier_name: this.state.settings.name,
        courier_uid: this.state.settings.uid,
        logmsg
      }
    };
    this.api_post(request);
  }

  show_stat = () => {
    const request = {
      url: 'get_courier_stats',
      request: {
        courier_uid: this.state.settings.uid,
        tz_uid: this.state.settings.tz_uid
      },
      progress: true
    };

    return this.api_post(request).then((data) => {
      console.log('get_courier_stats response', data);

      if (data.result == 'error' || data.status == 'error') {
        this.errorDialog({
          label: (data.desc !== undefined ? data.desc : '') + ' ' + (data.message !== undefined ? data.message : ''),
          error: data.desc,
          code: data.code
        });

        this.sendLogMsg((data.desc !== undefined ? data.desc : '') + ' ' + (data.message !== undefined ? data.message : ''));
      } else {
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
          <DialogTitle>Загрузка</DialogTitle>
          <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </DialogContent>
        </Dialog>

        <Dialog className="dialog" open={is_error} fullWidth keepMounted>
          <DialogTitle>Ошибка</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {error_context.label || ''}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.errorDialog()}
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog className="dialog" open={is_showStat} fullWidth keepMounted>
          <DialogTitle>Статистика</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <b>День: {showStat_context.data.day.label || ''} </b>
              <br/>
              Заказы: {showStat_context.data.day.orders_qty || ''}
              <br/>
              Сумма заказов: {showStat_context.data.day.orders_sum || ''}
              <br/>
              Наличные: {showStat_context.data.day.cash_sum || ''}
              <br/>
              Безналичные: {showStat_context.data.day.cashless_sum || ''}
              <br/>
              <u>Заработок: {showStat_context.data.day.wage || ''}</u>
              <br/>
              <br/>
              <b>Месяц: {showStat_context.data.month.label || ''} </b>
              <br/>
              Заказы: {showStat_context.data.month.orders_qty || ''}
              <br/>
              Сумма заказов: {showStat_context.data.month.orders_sum || ''}
              <br/>
              Наличные: {showStat_context.data.month.cash_sum || ''}
              <br/>
              Безналичные: {showStat_context.data.month.cashless_sum || ''}
              <br/>
              <u>Заработок: {showStat_context.data.month.wage || ''}</u>
              <br/>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={() => this.setState({ is_showStat: false })}>Ok</Button>
          </DialogActions>
        </Dialog>

      </div>
    )
  }
}

export default App;

