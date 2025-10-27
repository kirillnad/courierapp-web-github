import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';

// import { SettingsInfo } from './Info';


class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: props.settings || {},
      focus: null, // id поля: на которое фокус
      is_edit: false // поля открыты для редактирования?
    };
  }

  componentDidMount() {
    this.props.changeState('CurrentName', 'Настройки');
  }

  checkSettings = (state = {}) => () => {
    // какие ключи необходимо чтоб были заданы
    // const keys_req = ['server_ip', 'login', 'password'];
    const keys_req = ['server_ip', 'password'];
    if (keys_req.some(key => !state[key] || state[key].length === 0)) {
      return;
    }

    // сбросить статус курьера
    state = { ...state, status: "not_active" };

    localStorage.setItem('settings', JSON.stringify(state));

    /* https://bitbucket.org/jupiter_team/courierapp/wiki/Home
      /api/v1/auth_сod Поиск курьера по коду и паролю в Юпитере.
      Если находит, то возвращает его UID
      POST запрос:
      {
        "login" : "Борисов Артем",
        "passw": "123"
      }
    */

    this.props.api_post({
      'server_ip': state.server_ip,
      'url': 'auth_pwdcode',
      'request': {'pwdcode': state.password}
    }).then(({ code, error, label,  ...data }) => {

      if (data.result == "error") {
        this.props.errorDialog({
          label: data.desc,
          error: data.desc,
          code: data.code
        })
        return
      }

      if (data) {
        // если в ответе есть что-то, кроме данных об ошибке
        // добавить к состоянию
        state = { ...state, ...data };
      }

      if (code) {
        // есть есть сообщение об ошибке, сбросить форму
        // state = { ...state, 'login': '', 'password': ''};
        // поправить заголовок сообщения об ошибке
        this.props.changeState('error_context', {
          code, error, label
        });
        // this.setState({ 'settings': state });
      }

      localStorage.setItem('settings', JSON.stringify(state));

      // обновить настройки
      this.props.changeState('settings', state);

      if (!code) {
        // если нет ошибок
        this.props.changeState('CurrentPage', 'take_order');
      };
    });
  };

  render() {
    const { classes } = this.props;
    let { focus, settings } = this.state;

    const changeSettings = (key) => (e) => {
      e.preventDefault()
      settings[key] = e.target.value;
      this.setState({ settings, focus: key });
    };

    /* SettingsTextField - обертка для TextField с полями по умолчанию */
    const SettingsTextField = ({ id, ...props }) => (
      <TextField
        id={id}
        onChange={changeSettings(id)}
        error={settings[id] ? settings[id].length === 0 : false}
        helperText="" margin="normal" placeholder=""
        fullWidth
        value={settings[id] || ''}
        autoFocus={focus === id}
        {...props}
      />
    )

    return (
      <Fragment>
        <form className={classes.container} noValidate autoComplete="off">
          <SettingsTextField
            id="server_ip"
            disabled={focus !== "server_ip"}
            label="Адрес сервера JUPITER"
            placeholder="127.0.0.1:5677"
            type="text"
            InputProps={{
              endAdornment: focus === "server_ip" ? null : (
                <InputAdornment position="end">
                  <IconButton edge="end" aria-label="Toggle edit mode"
                    onClick={() => this.setState({ focus: "server_ip" })}
                  >
                    <Edit />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
{/*
          <SettingsTextField id="login"
                             label="Код курьера"
                             type="number"
                             />
*/}

          <SettingsTextField id="password"
                             label="Пароль курьера"
                             type="number"
                             />
        </form>

        <Grid container spacing={10}>
          <Grid item xs className={classes.button_set}>
            <Button variant="contained" color="primary"
              className={classes.button}
              onClick={this.checkSettings(settings)}
            >
              Готово
            </Button>
          </Grid>
        </Grid>

        <div className={classes.version}>
            <div>версия приложения {process.env.VERSION}</div>
        </div>

      </Fragment>
    );
  }
}

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)*3,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    flexBasis: 200,
  },
  version: {
    'text-align': 'center',
    'padding-top': '10px',
    display: 'flex',
    justifyContent: 'center',
    color: 'rgba(0, 0, 0, 0.38)'
  },
  button_set: {
    'text-align': 'center',
  },
  button: {
    margin: theme.spacing(1),
  }
});

export default withStyles(styles)(Settings);
