import { StyleSheet, Text, View, Pressable, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import axios from "axios";

const SpotifySongItem = ({ item, onPress, isPlaying, refreshItemsTracks, playItemTrack, handlePlayPause }) => {

    const handlePress = () => {
        if (isPlaying) {
            handlePlayPause()
        } else {
            playItemTrack(item)
            onPress(item)
        }
    }
    const addNewTrack = async () => {
        const data = {
            newTrack: {
                name: item.name,
                images: [item.album.images[0].url, item.album.images[1].url, item.album.images[2].url],
                url: item.preview_url,
                realase_Date: new Date(),
                popularity: item.popularity,
                ArtistId: ''
            },
            artistHref: item.artists[0].href
        }
        const response = await axios.post('track/addBySpotify', data).then(res => {
            console.log(res.data);
            refreshItemsTracks(item)
        })
    }
    return (
        <Pressable

            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
            <Image
                style={{ width: 50, height: 50, marginRight: 10 }}
                source={{ uri: item.album.images[0].url }}
            />

            <View style={{ flex: 1 }}>
                <Text
                    numberOfLines={1}
                    style={
                        isPlaying
                            ? {
                                fontWeight: "bold",
                                fontSize: 14,
                                color: "#3FFF00",
                            }
                            : { fontWeight: "bold", fontSize: 14, color: "white" }
                    }
                >
                    {item.name}
                </Text>
                <Text style={{ marginTop: 4, color: "#989898" }}>
                    {item.artists[0].name}
                </Text>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 7,
                    marginHorizontal: 10,
                }}
            >
                {/* <AntDesign name="heart" size={24} color="#1DB954" />
                <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" /> */}
                <TouchableOpacity onPress={handlePress}>
                    {!isPlaying ?
                        <Ionicons name="play" size={30} color="white" style={{ marginRight: 5 }} /> :
                        <FontAwesome name="pause" size={24} color="white" style={{ marginRight: 5 }} />
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={addNewTrack}>
                    <Ionicons name="add-circle" size={35} color="rgb(35, 114, 144)" />
                </TouchableOpacity>
            </View>
        </Pressable>
    );
};

export default SpotifySongItem;

const styles = StyleSheet.create({});
