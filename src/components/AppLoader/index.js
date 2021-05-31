import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../hooks';
import './style.scss';

const AppLoader = observer(() => {
  const { appLoaderStore } = useStores();
  return (
    <Dimmer active={appLoaderStore.isLoading}
            inverted
            page
            className="app-loader">
      <Loader size="large"/>
    </Dimmer>
  );
});

export default AppLoader;