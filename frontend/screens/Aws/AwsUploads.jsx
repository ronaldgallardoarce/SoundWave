import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { getAllArtist } from "../../redux-toolkit/actions/trackArtistActions";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
const AwsUpload = () => {
  const [form, setForm] = useState({
    name: "",
    file: "",
    url: "",
    realase_Date: new Date(),
    popularity: 0,
    ArtisId: "select",
  });
  const artists = useSelector((state) => state.tracksArtistsSlices.artists);
  const [showProgress, setShowProgress] = useState({
    message: false,
    bar: false,
  });
  const dispatch = useDispatch();
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", {
      uri: form.url,
      name: "video.mp4", // Cambia "video.mp4" por el nombre que deseas darle al archivo en el servidor
      type: "video/mp4", // Cambia "video/mp4" por el tipo MIME correcto del archivo
    });
    try {
      setShowProgress({
        ...showProgress,
        bar: true,
      });
      const response = await axios.post(
        "aws/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.key) {
        const formDataImage = new FormData();
        formDataImage.append("file", {
          uri: form.url,
          name: "image.jpeg", // Cambia "image.mp4" por el nombre que deseas darle al archivo en el servidor
          type: "image/jpeg", // Cambia "image/mp4" por el tipo MIME correcto del archivo
        });
        const responseImage = await axios.post(
          "aws/upload",
          formDataImage,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (responseImage.data.key) {
          const res = await axios.post(
            "track/add",
            {
              name: form.name,
              images: [responseImage.data.key],
              url:response.data.key,
              realase_Date:form.realase_Date,
              popularity:form.popularity,
              ArtisId:form.ArtisId
            }
          );
          console.log(res)
        }
      }
      setShowProgress({
        ...showProgress,
        bar: false,
      });
    } catch (error) {
      console.log(error.data);
      console.log("Error al subir el archivo:", error);
    }
  };
  const pickDocumentAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "video/mp4",
      });
      if (result) {
        const { uri, name } = result.assets[0];
        console.log(result);
        setForm({
          ...form,
          url: uri,
        });
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };
  const pickDocumentImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });
      if (result) {
        const { uri, name } = result.assets[0];
        console.log(result);
        setForm({
          ...form,
          file: uri,
        });
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };
  useEffect(() => {
    dispatch(getAllArtist());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text
          style={[
            styles.title,
            { fontFamily: "Roboto", fontWeight: "bold", fontSize: 32 },
          ]}
        >
          Upload Tracks
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#b3b3b3"
          value={form.name}
          onChangeText={(name) => setForm({ ...form, name: name })}
        />
        {form.url && (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: form.url }}
              style={styles.video}
              useNativeControls
              resizeMode="contain"
            />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={pickDocumentAudio}>
          <Text style={styles.buttonText}>Select Audio</Text>
          <Ionicons name="musical-notes" size={24} color="white" />
        </TouchableOpacity>
        {form.file && (
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: form.file }} />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={pickDocumentImage}>
          <Text style={styles.buttonText}>Select Image</Text>
          <Ionicons name="image" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.selectContainer}>
          <Picker
            style={styles.select}
            selectedValue={form.ArtisId}
            onValueChange={(itemValue) =>
              setForm({
                ...form,
                ArtisId: itemValue,
              })
            }
          >
            <Picker.Item label="Select an artist" value="" />
            {artists.map((artist) => (
              <Picker.Item
                key={artist.id}
                label={"Artist " + artist.name}
                value={artist.id}
              />
            ))}
          </Picker>
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
        {/* <Text style={styles.submitButtonText}>{JSON.stringify(form.ArtisId)}</Text> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    height: 100,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#0F1626",
    gap: 5,
  },
  scrollView: {
    display: "flex",
    backgroundColor: "#0F1626",
    marginHorizontal: 20,
    gap: 10,
  },
  selectContainer: {
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 4,
    marginBottom: 20,
    paddingBottom: 10,
  },
  select: {
    color: "black",
    height: 40,
  },
  title: {
    fontSize: 30,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 4,
    color: "#fff",
    marginBottom: 10,
  },
  videoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  video: {
    width: 300,
    height: 200,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "#1db954",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 170,
    height: 170,
    resizeMode: "cover",
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default AwsUpload;
