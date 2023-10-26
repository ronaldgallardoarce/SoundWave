import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import { Audio } from "expo-av";
import { debounce } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTrack, tracks } from "../../redux-toolkit/actions/tracksActions";
import SongItem from "./songItem";

const LikedSongsScreen = () => {
    const colors = [
        "#27374D",
        "#1D267D",
        "#BE5A83",
        "#212A3E",
        "#917FB3",
        "#37306B",
        "#443C68",
        "#5B8FB9",
        "#144272",
    ];
    const dispatch = useDispatch();
    const currentTrack = useSelector((state) => state.currentTrack.currentTrack);
    const navigation = useNavigation();
    const [backgroundColor, setBackgroundColor] = useState("#0A2647");
    const [modalVisible, setModalVisible] = useState(false);
    const [searchedTracks, setSearchedTracks] = useState([]);
    const [input, setInput] = useState("");
    const savedTracks = useSelector((state) => state.currentTrack.tracks);
    const value = useRef(0);
    const [currentSound, setCurrentSound] = useState(null);
    const [progress, setProgress] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        dispatch(tracks())
        console.log(currentTrack,'current track')
    }, [])

    const playTrack = async () => {
        if (savedTracks.length > 0) {
            dispatch(getCurrentTrack(savedTracks[0]));
        }
        await play(savedTracks[0]);
    };
    const play = async (nextTrack) => {
        const preview_url = nextTrack?.url;
        try {
            if (currentSound) {
                await currentSound.stopAsync();
            }
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: false,
                shouldDuckAndroid: false,
            });
            const { sound, status } = await Audio.Sound.createAsync(
                {
                    uri: preview_url,
                },
                {
                    shouldPlay: true,
                    isLooping: false,
                },
                onPlaybackStatusUpdate
            );
            onPlaybackStatusUpdate(status);
            setCurrentSound(sound);
            setIsPlaying(status.isLoaded);
            await sound.playAsync();
        } catch (err) {
            console.log(err.message);
        }
    };
    const onPlaybackStatusUpdate = async (status) => {
        console.log(status);
        if (status.isLoaded && status.isPlaying) {
            const progress = status.positionMillis / status.durationMillis;
            console.log("progresss", progress);
            setProgress(progress);
            setCurrentTime(status.positionMillis);
            setTotalDuration(status.durationMillis);
        }

        if (status.didJustFinish === true) {
            setCurrentSound(null);
            playNextTrack();
        }
    };

    const circleSize = 12;
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const handlePlayPause = async (item) => {
        if (currentSound) {
            if (isPlaying) {
                await currentSound.pauseAsync();
            } else {
                await play(item);
            }
            setIsPlaying(!isPlaying);
        }
    };

    useEffect(() => {
        if (savedTracks.length > 0) {
            handleSearch(input)
        }
    }, [savedTracks])

    const extractColors = async () => {
        const randomIndex = Math.floor(Math.random() * colors.length);
        const randomColor = colors[randomIndex];
        setBackgroundColor(randomColor);
    };


    const playNextTrack = async () => {
        if (currentSound) {
            await currentSound.stopAsync();
            setCurrentSound(null);
        }
        value.current += 1;
        if (value.current < savedTracks.length) {
            const nextTrack = savedTracks[value.current];
            dispatch(getCurrentTrack(nextTrack));
            extractColors();
            await play(nextTrack);
        } else {
            console.log("end of playlist");
        }
    };

    const playPreviousTrack = async () => {
        if (currentSound) {
            await currentSound.stopAsync();
            setCurrentSound(null);
        }
        value.current -= 1;
        if (value.current < savedTracks.length&&value.current>=0) {
            const nextTrack = savedTracks[value.current];
            dispatch(getCurrentTrack(nextTrack));

            await play(nextTrack);
        } else {
            console.log("end of playlist");
        }
    };
    const debouncedSearch = debounce(handleSearch, 800);
    function handleSearch(text) {
        const filteredTracks = savedTracks.filter((item) =>
            item?.name.toLowerCase().includes(text.toLowerCase())
        );
        setSearchedTracks(filteredTracks);
    }
    const handleInputChange = (text) => {
        setInput(text);
        debouncedSearch(text);
    };

    return (
        <>
            <LinearGradient colors={["rgb(36, 76, 119)", "rgb(12, 18, 33)"]} style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1, marginTop: 50 }}>
                    <Pressable
                        onPress={() => navigation.goBack()}
                        style={{ marginHorizontal: 10 }}
                    >
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>

                    <Pressable
                        style={{
                            marginHorizontal: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 9,
                        }}
                    >
                        <Pressable
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: 10,
                                backgroundColor: "rgba(39, 39, 39,0.8)",
                                padding: 9,
                                flex: 1,
                                borderRadius: 3,
                                height: 38,
                            }}
                        >
                            <AntDesign name="search1" size={20} color="white" />
                            <TextInput
                                value={input}
                                onChangeText={(text) => handleInputChange(text)}
                                placeholder="Find in Liked songs"
                                placeholderTextColor={"white"}
                                style={{ fontWeight: "500", color: "white" }}
                            />
                        </Pressable>

                        <Pressable
                            style={{
                                marginHorizontal: 10,
                                backgroundColor: "rgba(39, 39, 39,0.8)",
                                padding: 10,
                                borderRadius: 3,
                                height: 38,
                            }}
                        >
                            <Text style={{ color: "white" }}>Sort</Text>
                        </Pressable>
                    </Pressable>

                    <View style={{ height: 50 }} />
                    <View style={{ marginHorizontal: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
                            Tus canciones favoritas
                        </Text>
                        <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
                            {savedTracks.length} canciones
                        </Text>
                    </View>

                    <Pressable ///
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginHorizontal: 10,
                        }}
                    >
                        <Pressable
                            style={{
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                backgroundColor: "#1DB954",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <AntDesign name="arrowdown" size={20} color="white" />
                        </Pressable>

                        <View
                            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
                        >
                            <MaterialCommunityIcons
                                name="cross-bolnisi"
                                size={24}
                                color="#1DB954"
                            />
                            <Pressable
                                onPress={playTrack}
                                style={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 30,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#1DB954",
                                }}
                            >
                                <Entypo name="controller-play" size={24} color="white" />
                            </Pressable>
                        </View>
                    </Pressable>

                    {searchedTracks.length === 0 ? (
                        <ActivityIndicator size="large" color="gray" /> // Show a loading indicator while data is being fetched
                    ) : (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={searchedTracks}
                            renderItem={({ item }) => (
                                <SongItem
                                    item={item}
                                    onPress={play}
                                    isPlaying={item === currentTrack}
                                />
                            )}
                        />
                    )}
                </ScrollView>
            </LinearGradient>


            {currentTrack.name ?
                <>
                <Pressable
                    onPress={() => setModalVisible(!modalVisible)}
                    style={{
                        backgroundColor: "rgba(36, 76, 119,0.5)",
                        width: "90%",
                        padding: 10,
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginBottom: 15,
                        position: "absolute",
                        borderRadius: 6,
                        left: 20,
                        bottom: 10,
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <Image
                            style={{ width: 40, height: 40 }}
                            source={{ uri: currentTrack.images[0] }}
                        />
                        <Text
                            numberOfLines={1}
                            style={{
                                fontSize: 13,
                                width: 220,
                                color: "white",
                                fontWeight: "bold",
                            }}
                        >
                            {currentTrack.name!=undefined?currentTrack.name:''} •{" "}
                            {currentTrack.Artist != null ? currentTrack.Artist.name : ''}
                        </Text>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                        <AntDesign name="heart" size={24} color="#1DB954" />
                        <Pressable>
                            <AntDesign name="pausecircle" size={24} color="white" />
                        </Pressable>
                    </View>
                </Pressable>


            <BottomModal
                visible={modalVisible}
                onHardwareBackPress={() => setModalVisible(false)}
                swipeDirection={["up", "down"]}
                swipeThreshold={200}
            >
                <ModalContent
                    style={{ height: "100%", width: "100%", backgroundColor: "rgb(13, 51, 78)" }}
                >
                    <View style={{ height: "100%", width: "100%", marginTop: 40 }}>
                        <Pressable
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <AntDesign
                                onPress={() => setModalVisible(!modalVisible)}
                                name="down"
                                size={24}
                                color="white"
                            />

                            <Text
                                style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
                            >
                                {currentTrack.name!=undefined ? currentTrack.name : ''}
                            </Text>

                            <Entypo name="dots-three-vertical" size={24} color="white" />
                        </Pressable>

                        <View style={{ height: 70 }} />

                        <View style={{ padding: 10 }}>
                            <Image
                                style={{ width: "100%", height: 330, borderRadius: 4 }}
                                source={{ uri: currentTrack.images[0] }}
                            />
                            <View
                                style={{
                                    marginTop: 20,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <View>
                                    <Text
                                        style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                                    >
                                        {currentTrack.name!=undefined ? currentTrack.name : ''}
                                    </Text>
                                    <Text style={{ color: "#D3D3D3", marginTop: 4 }}>
                                        {currentTrack.Artist != null ? currentTrack.Artist.name : ''}
                                    </Text>
                                </View>

                                <AntDesign name="heart" size={24} color="#1DB954" />
                            </View>

                            <View style={{ marginTop: 10 }}>
                                <View
                                    style={{
                                        width: "100%",
                                        marginTop: 10,
                                        height: 3,
                                        backgroundColor: "gray",
                                        borderRadius: 5,
                                    }}
                                >
                                    <View
                                        style={[
                                            styles.progressbar,
                                            { width: `${progress * 100}%` },
                                        ]}
                                    />
                                    <View
                                        style={[
                                            {
                                                position: "absolute",
                                                top: -5,
                                                width: circleSize,
                                                height: circleSize,
                                                borderRadius: circleSize / 2,
                                                backgroundColor: "white",
                                            },
                                            {
                                                left: `${progress * 100}%`,
                                                marginLeft: -circleSize / 2,
                                            },
                                        ]}
                                    />
                                </View>
                                <View
                                    style={{
                                        marginTop: 12,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Text
                                        style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                                    >
                                        {formatTime(currentTime)}
                                    </Text>

                                    <Text
                                        style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                                    >
                                        {formatTime(totalDuration)}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginTop: 17,
                                }}
                            >
                                <Pressable>
                                    <FontAwesome name="arrows" size={30} color="#03C03C" />
                                </Pressable>
                                <Pressable onPress={playPreviousTrack}>
                                    <Ionicons name="play-skip-back" size={30} color="white" />
                                </Pressable>
                                <Pressable onPress={()=>handlePlayPause(currentTrack)}>
                                    {isPlaying ? (
                                        <AntDesign name="pausecircle" size={60} color="white" />
                                    ) : (
                                        <Pressable
                                            onPress={()=>handlePlayPause(currentTrack)}
                                            style={{
                                                width: 60,
                                                height: 60,
                                                borderRadius: 30,
                                                backgroundColor: "white",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Entypo name="controller-play" size={26} color="black" />
                                        </Pressable>
                                    )}
                                </Pressable>
                                <Pressable onPress={playNextTrack}>
                                    <Ionicons name="play-skip-forward" size={30} color="white" />
                                </Pressable>
                                <Pressable>
                                    <Feather name="repeat" size={30} color="#03C03C" />
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </ModalContent>
                
            </BottomModal>
                </>: null}


        </>
    );
};

export default LikedSongsScreen;

const styles = StyleSheet.create({
    progressbar: {
        height: "100%",
        backgroundColor: "white",
    },
});
