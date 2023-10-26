import { Provider, useDispatch } from 'react-redux';
import store from './redux-toolkit/store/store';
import Navigation from './screens/navigation/bottomNavigation';
// import Nav from "./Navigation";
import * as SecureStore from "expo-secure-store";
import axios from 'axios'; 
// axios.defaults.baseURL='http://192.168.56.1:3001/api/';
axios.defaults.baseURL = "http://172.16.3.105:3001/api/";


export default function App() {
  
  return (
    <>
      <Provider store={store}>
        <Navigation />
        {/* <Nav></Nav> */}
      </Provider>
    </>
  ); 
}


