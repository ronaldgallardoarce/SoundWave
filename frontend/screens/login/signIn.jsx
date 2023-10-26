import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';
import{useDispatch} from 'react-redux'
import DateTimePicker from '@react-native-community/datetimepicker'
import { signin } from '../../redux-toolkit/actions/userLoginActions';

const SignIn = () => {
    const dispatch= useDispatch()
    const navigation = useNavigation()
    const [user, setUser] = useState({
        user_Name: '',
        email: '',
        password: '',
        birthday: ''
    })
    const [showPicker, setShowPicker] = useState(false)
    const handleChange = (name, text) => {
        setUser((prevUser) => ({
            ...prevUser,
            [name]: text,
        }));
    }
    const registrarUsuario = async () => {
        const response = await axios.post('user/signIn', user).then(res=>{
            dispatch(signin(res.data.data))
            navigation.replace('Menu')
        })
    }
    const toggleDatePicker = () => {
        setShowPicker(!showPicker)
    }
    const onChange = ({ type }, selectedDate) => {
        if (type == 'set') {
            toggleDatePicker()
            setUser({
                ...user,
                birthday: selectedDate.toDateString()
            })
        }
        else {
            toggleDatePicker()
        }
    }
    return (
        <LinearGradient colors={["rgb(21, 56, 66)", "rgb(16, 23, 39)"]}
            style={styles.containerLinearGradient}
        >
            <View style={styles.containerView}>
                <Text style={styles.text}>¿Como te llamas?</Text>
                <TextInput
                    onChangeText={(text) => handleChange('user_Name', text)}
                    value={user.user_Name}
                    style={styles.textInput}
                    placeholder='Ingresa tu nombre de usuario...'
                    placeholderTextColor={'gray'}
                />
                <Text style={styles.text}>¿Cuál es tu correo electronico?</Text>
                <TextInput
                    onChangeText={(text) => handleChange('email', text)}
                    value={user.email}
                    style={styles.textInput}
                    placeholder='Ingresa tu correo...'
                    placeholderTextColor={'gray'}
                />
                <Text style={styles.text}>Crea una contraseña</Text>
                <TextInput
                    onChangeText={(text) => handleChange('password', text)}
                    value={user.password}
                    style={styles.textInput}
                    placeholder='Ingresa contraseña...'
                    placeholderTextColor={'gray'}
                    secureTextEntry={true}
                />
                <Text style={styles.text}>¿Cuál es tu fecha de nacimiento?</Text>
                <Pressable onPress={toggleDatePicker}>
                    <TextInput
                        value={user.birthday}
                        style={styles.textInput}
                        placeholder='Selecciona fecha de nacimiento...'
                        placeholderTextColor={'gray'}
                        editable={false}
                    />
                </Pressable>
                {showPicker &&
                    <DateTimePicker
                        value={new Date()}
                        mode='date'
                        display='spinner'
                        onChange={onChange}
                    />
                }

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonSignInSoundWabe} onPress={registrarUsuario}>
                        <Text style={styles.textButtonSignIn}>Crear Cuenta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

export default SignIn

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