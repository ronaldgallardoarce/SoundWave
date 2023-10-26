import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTrack } from "../../redux-toolkit/actions/tracksActions";

const SongItem = ({ item, onPress, isPlaying }) => {
    const dispatch = useDispatch()
    const handlePress = () => {
        dispatch(getCurrentTrack(item))
        onPress(item)
    }
    return (
        <Pressable
            onPress={handlePress}
            style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
            <Image
                style={{ width: 50, height: 50, marginRight: 10 }}
                source={{ uri: item.images[0] }}
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
                    {item.Artist.name}
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
                <AntDesign name="heart" size={24} color="#1DB954" />
                <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
            </View>
        </Pressable>
    );
};

export default SongItem;

const styles = StyleSheet.create({});
