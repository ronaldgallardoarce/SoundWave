import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { debounce } from 'lodash';
import { useState } from "react";
import { Audio } from "expo-av";
import SpotifySongItem from "./spotifySongItems";
import BackButton from "../../components/backButton";

const SpotifyItems = ({ savedTracks, changeTextSearch, refreshItemsTracks }) => {
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
  const navigation = useNavigation()
  const [input, setInput] = useState("");
  const [currentSound, setCurrentSound] = useState(null);
  const [ currentTrack, setCurrentTrack ] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState("#0A2647");

  const handleInputChange = (text) => {
    setInput(text);
    changeTextSearch(text);
  }
  const playItemTrack=async (item) => {
    setCurrentTrack(item);
  };
  const playTrack = async () => {
    if (savedTracks.length > 0) {
      setCurrentTrack(savedTracks[0]);
    }
    await play(savedTracks[0]);
  };

  const play = async (nextTrack) => {
    console.log(nextTrack);
    const preview_url = nextTrack.preview_url;
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

  const playNextTrack = async () => {
    if (currentSound) {
      await currentSound.stopAsync();
      setCurrentSound(null);
    }
    value.current += 1;
    if (value.current < savedTracks.length) {
      const nextTrack = savedTracks[value.current];
      setCurrentTrack(nextTrack);
      extractColors();
      await play(nextTrack);
    } else {
      console.log("end of playlist");
    }
  };

  const extractColors = async () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    setBackgroundColor(randomColor);
  };

  const handlePlayPause = async () => {
    if (currentSound) {
      if (isPlaying) {
        await currentSound.pauseAsync();
      } else {
        await currentSound.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <LinearGradient colors={["rgb(36, 76, 119)", "rgb(12, 18, 33)"]} style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, marginTop: 50 }}>
          <BackButton
            navigation={navigation}
          />

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
                placeholder="Buscar canciones o artistas"
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
              <Text style={{ color: "white" }}>Tipo</Text>
            </Pressable>
          </Pressable>

          <View style={{ height: 50 }} />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Agregar canciones
            </Text>
            <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
              {savedTracks.length} canciones
            </Text>
          </View>

          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: 'flex-end',
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

          </Pressable>

          {savedTracks.length === 0 ? (
            <ActivityIndicator size="large" color="gray" />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={savedTracks}
              renderItem={({ item }) => (
                <SpotifySongItem
                  item={item}
                  onPress={play}
                  isPlaying={item === currentTrack}
                  refreshItemsTracks={refreshItemsTracks}
                  playItemTrack={playItemTrack}
                  handlePlayPause={handlePlayPause}
                />
              )}
            />
          )}

        </ScrollView>
      </LinearGradient>

    </>
  );
}

export default SpotifyItems;