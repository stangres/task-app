import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, Modal, Icon, Select, Message } from 'semantic-ui-react';
import {TASK_STATUS_LIST} from '../../../constants/task-status';
import {emailIsValid} from '../../../helpers/validators';
import {useStores} from "../../../hooks";

const EditForm = observer(({item, onSubmit, onCancel}) => {
  const { authStore, tasksStore } = useStores();

  const isEdit = item.id !== undefined;

  const [username, setUsername] = useState(item.username || '');
  const [email, setEmail] = useState(item.email || '');
  const [text, setText] = useState(item.text || '');
  const [status, setStatus] = useState(item.status !== undefined ? item.status : TASK_STATUS_LIST[0].value);

  const handleUsername = (e, { value }) => {
    setUsername(value);
  };

  const handleEmail = (e, { value }) => {
    setEmail(value);
  };

  const handleText = (e, { value }) => {
    setText(value);
  };

  const handleStatus = (e, { value }) => {
    setStatus(value);
  };

  const getError = () => {
    if (!username) {
      return "Заполните поле 'Имя пользователя'";
    }

    if (!emailIsValid(email)) {
      return "Заполните поле 'Email'";
    }

    if (!text) {
      return "Заполните поле 'Текст задачи'";
    }
  };

  const error = getError();

  const handleSubmit = async () => {
    const data = {...item};
    data.username = username;
    data.email = email;
    data.text = text;
    data.status = status;

    if (isEdit) {
      if (await tasksStore.update(data)) {
        onSubmit(data);
      }
    }
    else {
      if (await tasksStore.create(data)) {
        onSubmit(data);
      }
    }
  };

  return (
    <Modal dimmer
           open={true}
           size='mini'
           closeOnEscape={false}
           closeOnDimmerClick={false}
    >
      <Modal.Header>Редактирование задачи</Modal.Header>
      <Modal.Content>
          <Form loading={tasksStore.isLoading}>
            {
              !isEdit &&
              <React.Fragment>
                <Form.Input name="username"
                            label='Имя пользователя'
                            required
                            value={username}
                            onChange={handleUsername}
                />
                <Form.Input name="email"
                            label='Email'
                            required
                            value={email}
                            onChange={handleEmail}
                />
              </React.Fragment>
            }
              <Form.TextArea label='Текст задачи'
                             value={text}
                             required
                             onChange={handleText}
              />
            {
              authStore.isAuthenticated &&
              <Form.Field control={Select}
                          label='Статус задачи'
                          value={status}
                          onChange={handleStatus}
                          options={TASK_STATUS_LIST}
              />
            }
          </Form>
        {
          !!error &&
          <Message
            error
            content={error}
          />
        }
      </Modal.Content>
      <Modal.Actions>
        <Button color='red'
                onClick={onCancel}
                size="tiny"
                disabled={tasksStore.isLoading}
        >
          <Icon name='cancel' />
          Отмена
        </Button>
        <Button color='green'
                onClick={handleSubmit}
                size="tiny"
                disabled={!!error || tasksStore.isLoading}
        >
          <Icon name='save' />
          Сохранить
        </Button>
      </Modal.Actions>
    </Modal>
  )
});

export default EditForm;