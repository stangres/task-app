import React from 'react';
// import {useHistory} from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Container, Menu, Button, Icon } from 'semantic-ui-react';
import {useStores} from '../../hooks';
import './style.scss';

const MainContainer = observer(({ children }) => {
  const { authStore, loginStore } = useStores();
  const isAuthenticated = authStore.isAuthenticated;

  return (
    <div>
      <Menu fixed="top">
        <Menu.Menu position="right">
          <Menu.Item>
            {isAuthenticated ? (
              <React.Fragment>
                <Menu.Item header
                           content={authStore.username}
                />
                <Button color="teal"
                        onClick={() => authStore.logout()}
                >
                  <Icon name="sign-out"/>
                  Выйти
                </Button>
              </React.Fragment>
              )
              :
              (
                <Button color="teal"
                        onClick={() => loginStore.show()}
                >
                  <Icon name="sign-in"/>
                  Войти
                </Button>
              )
            }
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      <Container className="main-container">
        {children}
      </Container>
    </div>
  );
});

export default MainContainer;