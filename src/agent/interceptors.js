import notificationStore from '../stores/AppNotificationStore';
import authStore from '../stores/AuthStore';

export const errorText = (error, status) => {
  const text = error.message || error.error || error;

  if (text) {
    return text;
  }

  const code = error?.code || status;

  if (code) {
    switch (code) {
      case 400: return 'Некорректный запрос';
      case 403: return 'Доступ запрещен';
      case 404: return 'Ресурс не найден';
      default: return 'Внутренняя ошибка сервера';
    }
  }

  if (text === 'Network Error') {
    return 'Ошибка сети';
  }

  if (text === 'Internal Server Error') {
    return 'Внутренняя ошибка сервера';
  }

  return text;
}

export default function configure(agent) {
      agent.interceptors.request.use(
      (config) => {
          if (config.method === 'post') {
            if (config.data.token === undefined && authStore.token) {
              config.data.token = authStore.token;
            }

            if (!(config.data instanceof FormData)) {
              const formData = new FormData();

              for (const [key, value] of Object.entries(config.data)) {
                formData.append(key, value);
              }

              config.data = formData;
            }
          }

          config.params = {...config.params, developer: 'testuser'}

          return config;
      }
    );

  agent.interceptors.response.use(
    (res) => {
      const {status} = res;
      const d = res?.data;

      if (status === 200) {
        if (d?.status !== undefined) {
          let message = d.message || '';

          if (d.status === 'error') {
            if (typeof message === 'object') {
              const messages = [];

              for (const [key, value] of Object.entries(message)) {
                messages.push(`${key}: ${value}`);
              }

              message = messages.join('\n');
            }

            const text = errorText(message || res.statusText, status);

            notificationStore.error(text);
            throw text;
          }
        }
      }
      else {
        const text = errorText(d?.error || res.statusText, status);
        notificationStore.error(text);
        throw text;
      }

      return res;
    },
    (error) => {
      let text = '';

      if (error.request) {
        text = errorText(error);
        notificationStore.error(text);
      }

      return Promise.reject(text || error);
    }
  );
}