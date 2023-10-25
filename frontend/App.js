import { Provider } from 'react-redux';
import store from './redux-toolkit/store/store';
import Navigation from './screens/navigation/bottomNavigation';
import axios from 'axios';

axios.defaults.baseURL='http://192.168.56.1:3001/api/';

export default function App() {

  return (
    <>
    <Provider store={store}>
      <Navigation />
    </Provider>
    </>
  );
}


