import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import RenderItem from '../../components/renderItem';
import ArtistCard from '../../components/artistCard';
import RecentlyPlayedCard from '../../components/recentlyPlayedCard';

const Home = () => {
    const navigation = useNavigation()
    const [topArtists, setTopArtists] = useState([]);
    const [recentlyplayed, setRecentlyPlayed] = useState([]);

    const userLogin = useSelector((state) => state.login.user)
    const greetingMessage = () => {
        const currentTime = (new Date().getHours()-4);
        if (currentTime < 12) {
            return "Good Morning";
        } else if (currentTime < 19) {
            return "Good Afternoon";
        } else {
            return "Good Evening";
        }
    };
    const message = greetingMessage();
    const getRecentlyPlayedSongs = async () => {
        try {
            const response = await axios.get('track/top4').then(res => {
                console.log(res.data);
                setRecentlyPlayed(res.data);
            })
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        const getTopItems = async () => {
            try {
                const response = await axios.get('artist/top6');
                setTopArtists(response.data);
            } catch (err) {
                console.log(err.message);
            }
        };
        getRecentlyPlayedSongs();
        getTopItems();
    }, []);

    return (
        <LinearGradient colors={["rgb(36, 76, 119)", "rgb(12, 18, 33)"]}
            style={styles.containerLinearGradient}
        >
            <ScrollView style={{ marginTop: 50 }}>
                <View style={styles.containerView}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        {/* <Image
                            style={styles.image}
                            source={{ uri: userLogin.image?userLogin.image:'' }}
                        /> */}
                        <Text
                            style={styles.saludo}
                        >
                            {message}
                        </Text>
                    </View>
                    <MaterialCommunityIcons
                        name="lightning-bolt-outline"
                        size={24}
                        color="white"
                    />
                </View>

                <View
                    style={{
                        marginHorizontal: 12,
                        marginVertical: 5,
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <Pressable
                        style={{
                            backgroundColor: "rgba(39, 39, 39,0.8)",
                            padding: 10,
                            borderRadius: 30,
                        }}
                    >
                        <Text style={{ fontSize: 15, color: "white" }}>Music</Text>
                    </Pressable>

                    <Pressable
                        style={{
                            backgroundColor: "rgba(39, 39, 39,0.8)",
                            padding: 10,
                            borderRadius: 30,
                        }}
                    >
                        <Text style={{ fontSize: 15, color: "white" }}>
                            Podcasts & Shows
                        </Text>
                    </Pressable>
                </View>

                <View
                    style={{
                        marginTop: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Pressable
                        onPress={() => navigation.navigate("Favoritos")}
                        style={{
                            marginBottom: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            flex: 1,
                            marginHorizontal: 10,
                            marginVertical: 8,
                            backgroundColor: "rgba(39, 39, 39,0.8)",
                            borderRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <LinearGradient colors={["#33006F", "#FFFFFF"]}>
                            <Pressable
                                style={{
                                    width: 55,
                                    height: 55,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                <AntDesign name="heart" size={24} color="white" />
                            </Pressable>
                        </LinearGradient>

                        <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
                            Liked Songs
                        </Text>
                    </Pressable>

                    <View
                        style={{
                            marginBottom: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                            flex: 1,
                            marginHorizontal: 10,
                            marginVertical: 8,
                            backgroundColor: "rgba(39, 39, 39,0.8)",
                            borderRadius: 4,
                            elevation: 3,
                        }}
                    >
                        <Image
                            style={{ width: 55, height: 55 }}
                            source={{ uri: "https://i.pravatar.cc/100" }}
                        />
                        <View style={styles.randomArtist}>
                            <Text
                                style={{ color: "white", fontSize: 13, fontWeight: "bold" }}
                            >
                                Hiphop Tamhiza
                            </Text>
                        </View>
                    </View>
                </View>

                <FlatList
                    data={recentlyplayed}
                    renderItem={RenderItem}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-between" }}
                />

                <Text
                    style={{
                        color: "white",
                        fontSize: 19,
                        fontWeight: "bold",
                        marginHorizontal: 10,
                        marginTop: 10,
                    }}
                >
                    Los Artistas mas populares
                </Text>

                {topArtists && topArtists.length > 0 ? (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {topArtists.map((item, index) => (
                            <ArtistCard item={item} key={index} />
                        ))}
                    </ScrollView>
                ) : (
                    <Text>Cargando top artistas...</Text>
                )}

                <View style={{ height: 10 }} />
                <Text
                    style={{
                        color: "white",
                        fontSize: 19,
                        fontWeight: "bold",
                        marginHorizontal: 10,
                        marginTop: 10,
                    }}
                >
                    Lo mas escuchado
                </Text>
                <FlatList
                    data={recentlyplayed}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        <RecentlyPlayedCard item={item} key={index} />
                    )}
                />

            </ScrollView>
        </LinearGradient>
    )
}

export default Home

const styles = StyleSheet.create({
    containerView: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    containerLinearGradient: {
        flex: 1,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        resizeMode: 'cover'
    },
    saludo: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    }
})