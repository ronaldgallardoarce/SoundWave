import axios from 'axios';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import SpotifyItems from './spotifyItems';

const AddMusicSpotify = () => {

    const [search, setSearch] = useState('');
    const [tracks, setTracks] = useState({});
    useEffect(() => {
        const buscar = {
            search: search,
            type: 'track'
        }
        if (search != '') {
            const response = axios.post('spotify/searchData', buscar).then(res => {
                setTracks(res.data.data.tracks.items)
            })
        }
    }, [search]);
    return (
        <LinearGradient colors={["rgb(21, 56, 66)", "rgb(16, 23, 39)"]}
            style={styles.containerLinearGradient}
        >
            <View style={styles.container}>
                <Buscador
                    setSearch={setSearch}
                />
                <SpotifyItems
                    savedTracks={tracks}
                />
            </View>
        </LinearGradient>

    );
}

export default AddMusicSpotify;

const Buscador = ({ setSearch }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.8,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const animatedStyle = {
        transform: [{ scale: scaleValue }],
    };
    const navigation = useNavigation()
    const back = () => {
        navigation.replace('login')
    }
    return (
        <View style={styles.card}>
            <TouchableWithoutFeedback onPress={back} onPressIn={onPressIn} onPressOut={onPressOut}>
                <Animated.View style={animatedStyle}>
                    <Ionicons name="arrow-back" size={35} color="white" style={{ marginRight: 17 }} />
                </Animated.View>
            </TouchableWithoutFeedback>
            <TextInput
                style={styles.input}
                placeholder='¿Que desas escuchar?...'
                placeholderTextColor={'gray'}
                onChangeText={(text) => setSearch(text)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerLinearGradient: {
        flex: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        marginTop:30
    },
    input: {
        color: 'white',
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        width: '85%',
        borderRadius: 8,
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding:20
    }
});

