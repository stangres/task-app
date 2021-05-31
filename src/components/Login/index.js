import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Form, Grid, Header, Segment, Modal } from 'semantic-ui-react';
import { useStores } from '../../hooks';
import './style.scss';

const Login = observer(() => {
  const { authStore, loginStore } = useStores();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsername = (e, { value }) => {
    setUsername(value);
  };

  const handlePassword = (e, { value }) => {
    setPassword(value);
  };

  const handleSubmit = async () => {
    const res = await authStore.login(username, password);

    if (res) {
      loginStore.close();
    }
  };

  return (
    <Modal dimmer
           open={loginStore.isShow}
           size='mini'
           closeIcon
           onClose={() => loginStore.close()}
           closeOnEscape={false}
           closeOnDimmerClick={false}
    >
      <Modal.Content>
        <Grid textAlign="center"
              verticalAlign="middle"
              className="login-page"
        >
          <Grid.Column>
            <Header as="h3"
                    color="teal"
                    textAlign="center">
              Вход в аккаунт
            </Header>
            <Form onSubmit={handleSubmit}
                  loading={authStore.isLoading}
            >
              <Segment >
                <Form.Input name="username"
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="Логин"
                            required
                            value={username}
                            onChange={handleUsername}
                />
                <Form.Input name="password"
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="Пароль"
                            type="password"
                            required
                            value={password}
                            onChange={handlePassword}
                />

                <Button type="submit"
                        color="teal"
                        fluid
                >
                  Войти
                </Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Modal.Content>
    </Modal>
  )
});

export default Login;