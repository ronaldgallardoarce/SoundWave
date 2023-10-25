import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'

const SignIn = () => {
    const navigation = useNavigation()
    const [user, setUser] = useState({
        user_Name: '',
        email: '',
        password: '',
        birthday: ''
    })
    const handleChange = (name, text) => {
        setUser((prevUser) => ({
            ...prevUser,
            [name]: text,
          }));
    }
    return (
        <LinearGradient colors={["rgb(21, 56, 66)", "rgb(16, 23, 39)"]}
            style={styles.containerLinearGradient}
        >
            <View style={styles.containerView}>
                <Text style={styles.text}>¿Como te llamas?</Text>
                <TextInput
                    name="user_Name"
                    onChangeText={handleChange}
                    value={user.user_Name}
                    style={styles.textInput}
                    placeholder='Ingresa tu nombre de usuario...'
                    placeholderTextColor={'gray'}
                />
                <Text style={styles.text}>¿Cuál es tu correo electronico?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Ingresa tu correo...'
                    placeholderTextColor={'gray'}
                    keyboardType='email-address'
                />
                <Text style={styles.text}>Crea una contraseña</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Ingresa contraseña...'
                    placeholderTextColor={'gray'}
                />
                <Text style={styles.text}>¿Cuál es tu fecha de nacimiento?</Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='Ingresa tu nombre de usuario'
                    placeholderTextColor={'gray'}
                    keyboardType=''
                />
                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity style={styles.buttonSignInSoundWabe}>
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