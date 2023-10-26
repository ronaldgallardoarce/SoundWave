import axios from 'axios';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SpotifyItems from './spotifyItems';

const AddMusicSpotify = () => {

    const [tracks, setTracks] = useState({});
    const changeTextSearch = (text) => {
        const buscar = {
            search: text,
            type: 'track'
        }
        if (text != '') {
            const response = axios.post('spotify/searchData', buscar).then(res => {
                setTracks(res.data.data.tracks.items)
            })
        }
    }
    const refreshItemsTracks = (item) => {
        const refresh = tracks.filter((track) => track != item);
        setTracks(refresh)
    }
    return (

        <View style={styles.container}>
            <SpotifyItems
                savedTracks={tracks}
                changeTextSearch={changeTextSearch}
                refreshItemsTracks={refreshItemsTracks}
            />
        </View>

    );
}

export default AddMusicSpotify;

const styles = StyleSheet.create({
    containerLinearGradient: {
        flex: 1,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
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
        padding: 20
    }
});

