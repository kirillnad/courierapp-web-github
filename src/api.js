import { default as _axios } from 'axios'

const axios = _axios.create({
  paramsSerializer: (params) => {
    const query = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join('&')
    return `${query.length ? '?' : ''}${query}`
  },
  headers: {
    'Content-Type': 'text/plain',
  }
})

axios.interceptors.request.use((config) => {
  config['timeout'] = 5000;
  return config
})

// axios.interceptors.response.use(
//   (response) => {
//     let result
//     if (response.config.url.endsWith("get_orders")) {
//       result = "success";
//     } else {
//       result = response.data.result || "fail";
//     }
//     return result !== "success" ? Promise.reject({ response }) : response
//   }
// )

const get_req_url = response => response.config.url.slice(response.config.url.lastIndexOf("/") + 1);

const error_handler = (resp) => {

  console.log ('error_handler', resp)

  const { response, message } = resp;
  let error = {};

  if (message && message.startsWith('timeout')) {
    error = {
      error: 'Сервер не отвечает. Проверьте сетевое подключение.',
      label: `Проверьте соединение с интернетом`,
      code: 'TIMEOUT_ERROR'
    };
  }
  else if (message) {
    error = {
      error: message,
      label: `Проверьте соединение с интернетом`,
      code: 'TIMEOUT_ERROR'
    };
  }
  else if (response && response.data.result && response.data.result !== 'success' ) {
    error = {
      error: response.data.desc,
      label: response.data.desc,
      // label: `Ошибка запроса ${get_req_url(response)}:`,
      code: 'REQUEST_ERROR',
    };
  }
  else if (response && response.data.status === 'error') {
    error = {
      error: response.data.message,
      label: `Запрос ${get_req_url(response)}, ответ сервера`,
      code: 'SYSTEM_ERROR',
    };
  }
  else if (!response.data) {
    error = {
      error:`${get_req_url(response)}: не получен объект data`,
      label: 'Ошибка сервера',
      code: 'NO_RESPONSE'
    };
  }
  else {
    error = {
      error: message,
      label: `Ошибка выполнения запроса ${get_req_url(response)}`,
      code: 'APP_ERROR',
    };
  };

  return Promise.resolve(error)
}

export default {
  async post (server_ip, url, data) {
    
  const config = {
    headers: {
      command: `http://${server_ip}/api/v1/${url}`,
      redirect: 1,
      token: 'demo'
    }
  };

    // return await axios.post(`http://${server_ip}/api/v1/${url}`, data).catch(error_handler)
    return await axios.post(`https://jupiter.report/server/index.php`, data, config).catch(error_handler)
  },

  async get (url, params = {}) {
    return await axios.get(`http://${url}`, params).catch(error_handler)
  },

  async patch (url, data) {
    return await axios.patch(`http://${url}`, data).catch(error_handler)
  },

  async delete (url) {
    return await axios.delete(`http://${url}`).catch(error_handler)
  }
}
