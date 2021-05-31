const prepareUrlParams = ({sortField, sortDirection, page}) => {
  let params = [];

  if (sortField) {
    params.push(`sort_field=${encodeURIComponent(sortField)}`);
  }

  if (sortDirection) {
    let dir = '';

    if (sortDirection === 'ascending') {
      dir = 'asc';
    }
    else if (sortDirection === 'descending') {
      dir = 'desc';
    }

    if (dir) {
      params.push(`sort_direction=${encodeURIComponent(dir)}`);
    }
  }

  params.push(`page=${encodeURIComponent(page || 1)}`);

  return params.join('&');
}

export default function task(client) {
  return {
    getAll: ({sortField, sortDirection, page}) => {
      const params = prepareUrlParams({sortField, sortDirection, page});
      return client.get(`?${params}`);
    },

    update: (id, data) => client.post(`/edit/${encodeURIComponent(id)}`, data),
    create: (data) => client.post('/create', data),
  }
}