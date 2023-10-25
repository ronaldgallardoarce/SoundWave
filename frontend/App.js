import axios from 'axios';
// import qs from 'querystring'
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation';
export default function App() {
  // useEffect(() => {
  //   const url = 'https://accounts.spotify.com/api/token';
  //   const data = {
  //     grant_type: 'client_credentials'
  //   };

  //   const response = axios.post(url, qs.stringify(data), {
  //     headers: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   }).then(res => {
  //     const headers={
  //       authorization: `Bearer ${res.data.access_token}`
  //     }
  //     const result= axios.get('https://api.spotify.com/v1/tracks/3VpxEo6vMpi4rQ6t2WVVkK',{headers}).then(respuesta=>{
  //       console.log(respuesta.data);
  //     })
  //   }).catch(err => {
  //     console.error(`Error: ${err}`);
  //   });
  //   return;

  // }, [])
  return (
    <Navigation></Navigation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
