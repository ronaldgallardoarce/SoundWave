import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { Foundation } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Login = () => {
    const navigation=useNavigation();
    const signIn=()=>{
        navigation.navigate('Crear cuenta');
    }
    const logIn=()=>{
        navigation.navigate('Iniciar Sesion');
    }

    return (
        <LinearGradient colors={["rgb(28, 80, 86)", "rgb(16, 23, 39)"]} style={styles.containerLinearGradient}
            start={{x: 0, y: 0}}
            end={{x:1,y:1}}
        >
            <View style={styles.containerView}>
                <Foundation style={styles.icon} name="sound" size={100} color="white" />
                <Text style={styles.text}>¡Cientos de canciones Gratis en SoundWave!</Text>
                <TouchableOpacity onPress={signIn} style={styles.buttonSignInSoundWabe}>
                    <Text style={styles.textButtonSignIn}>Registrate en Sound-Wave</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignIn}>
                    <AntDesign style={styles.iconButtonSignIn} name="google" size={24} color="red" />
                    <Text style={styles.textButtonSignIn}>Continuar con Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSignIn}>
                    <FontAwesome5 style={styles.iconButtonSignIn} name="facebook" size={24} color="rgb(8, 102, 255)" />
                    <Text style={styles.textButtonSignIn}>Continuar con Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginVertical:20}} onPress={logIn}>
                    <Text style={styles.textButtonSignIn}>Iniciar Sesion</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

export default Login

const styles = StyleSheet.create({
    containerView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    containerLinearGradient: {
        flex: 1,
    },
    icon: {
        textAlign: 'center',
        marginTop: 100,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30,
        marginTop: 100,
    },
    buttonSignInSoundWabe: {
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(0, 183, 213)',
        marginTop: 90,
        width: '85%',
    },
    buttonSignIn: {
        display: 'flex',
        flexDirection:'row',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(21, 56, 66,0.6)',
        borderColor: 'rgb(0, 183, 213)',
        borderWidth: 1,
        marginTop: 23,
        width: '85%',
    },
    textButtonSignIn: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    iconButtonSignIn: {
        position: 'absolute',
        left: 10,
    }
})