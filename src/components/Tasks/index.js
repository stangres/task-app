import React, {useEffect, useState}  from 'react';
import { observer } from 'mobx-react-lite';
import TaskTable from './TaskTable';
import { useStores } from '../../hooks';
import guard from '../../helpers/guard';
import EditForm from './EditForm';

const Tasks = observer(() => {
  const { tasksStore } = useStores();
  const [editFormState, setEditFormState] = useState({open: false, item: {}});

  const onSort = (sortData) => {
    tasksStore.setSort(sortData);
  }

  const onPageChange = (page) => {
    tasksStore.setPage(page);
  }

  const onEdit = async (item) => {
    // Здесь происходит ограничение доступа.
    // В текущей реализации, если необходимо проверить авторизован ли пользователь, то нужно вызвать данную функцию.
    // Если пользователь не авторизован, то вызывается диалог с предложением входа в систему.
    // Можно было бы реализовать и иначе.
    // Например, в app.js обернуть каждый необходимый роут в helpers/routes/GuardedRoute и
    // функционал редактирования поместить под соответствующий роут (/edit/:id).
    // Но т.к. это в т.з. не уточняется, то реализовал именно так.
    if (await guard()) {
      setEditFormState({open: true, item});
    }
  }

  const onAdd = async (item) => {
    setEditFormState({open: true, item: {}});
  }

  const onCloseEditForm = () => {
    setEditFormState({open: false});
  }

  useEffect(() => {
    tasksStore.load();
  }, [tasksStore]);

  return (
    <React.Fragment>
      <TaskTable data={tasksStore.data}
                 total={tasksStore.total}
                 sortField={tasksStore.sortField}
                 sortDirection={tasksStore.sortDirection}
                 onSort={onSort}
                 onEdit={onEdit}
                 onPageChange={onPageChange}
                 onAdd={onAdd}
      />
      {
        editFormState.open &&
        <EditForm item={editFormState.item}
                  onSubmit={onCloseEditForm}
                  onCancel={onCloseEditForm}
        />
      }
    </React.Fragment>
  )
})

export default Tasks;