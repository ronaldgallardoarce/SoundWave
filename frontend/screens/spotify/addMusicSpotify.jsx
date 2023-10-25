import axios from 'axios';
import React, { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Animated, Button, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddMusicSpotify = () => {
    const [search, setSearch] = useState('');
    useEffect(() => {
        const buscar = {
            search: search,
            type: 'track'
        }
        if (search != '') {
            const response = axios.post('spotify/searchData', buscar).then(res => {
                console.log(res.data.data);
            })
        }
    }, [search]);
    return (
        <View style={styles.container}>
            <Buscador
                setSearch={setSearch}
            />
        </View>
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

    return (
        <View style={styles.card}>
            <TouchableWithoutFeedback onPressIn={onPressIn} onPressOut={onPressOut}>
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
    container: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(0,0,40)',
        height: '100%',
        padding: 20
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
    }
});
