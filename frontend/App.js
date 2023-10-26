import { Provider, useDispatch } from 'react-redux';
import store from './redux-toolkit/store/store';
import Navigation from './screens/navigation/bottomNavigation';
// import Nav from "./Navigation";
import * as SecureStore from "expo-secure-store";
import axios from 'axios'; 
import { ModalPortal } from 'react-native-modals';
axios.defaults.baseURL='http://192.168.1.176:3001/api/';
// axios.defaults.baseURL = "https://apigitronald.onrender.com/api/";


export default function App() {
  
  return (
    <>
      <Provider store={store}>
        <Navigation />
        <ModalPortal/>
        {/* <Nav></Nav> */}
      </Provider>
    </>
  ); 
}


