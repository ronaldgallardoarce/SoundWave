import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import{useDispatch} from 'react-redux'
import { login } from '../../redux-toolkit/actions/userLoginActions';

const LoginForm = () => {
    const dispatch= useDispatch()
    const navigation = useNavigation()
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const handleChange = (name, text) => {
        setUser((prevUser) => ({
            ...prevUser,
            [name]: text,
        }));
    }
    const logInUsuario = async () => {
        const response = await axios.post('user/logIn', user).then(res=>{
            dispatch(login(res.data.data));
            navigation.replace('Menu')
        })
    }
    return (
        <LinearGradient colors={["rgb(21, 56, 66)", "rgb(16, 23, 39)"]}
            style={styles.containerLinearGradient}
        >
            <View style={styles.containerView}>
                <Text style={styles.text}>Correo Electronico</Text>
                <TextInput
                    onChangeText={(text) => handleChange('email', text)}
                    value={user.email}
                    style={styles.textInput}
                    placeholder='Ingresa tu correo...'
                    placeholderTextColor={'gray'}
                />
                <Text style={styles.text}>Contraseña</Text>
                <TextInput
                    onChangeText={(text) => handleChange('password', text)}
                    value={user.password}
                    style={styles.textInput}
                    placeholder='Ingresa contraseña...'
                    placeholderTextColor={'gray'}
                    secureTextEntry={true}
                />

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonSignInSoundWabe} onPress={logInUsuario}>
                        <Text style={styles.textButtonSignIn}>Iniciar Sesion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

export default LoginForm

const styles = StyleSheet.create({
    containerView: {
        justifyContent: 'center',
        marginHorizontal: 30,
        paddingTop: 40
    },
    containerLinearGradient: {
        flex: 1,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 20,
        marginBottom: 5,
    },
    textInput: {
        padding: 10,
        color: 'white',
        width: '100%',
        borderRadius: 8,
        fontSize: 18,
        fontWeight: 'bold',
        borderColor: 'gray',
        borderWidth: 1,
    },
    buttonSignInSoundWabe: {
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: 60,
        width: '60%',
    },
    textButtonSignIn: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18
    }
})