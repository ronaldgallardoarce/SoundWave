import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";
import { useDispatch } from "react-redux";
import { allArtist } from "../../redux-toolkit/actions/trackArtistActions";

const Artists = () => {
  const [showProgress, setShowProgress] = useState({
    message: false,
    bar: false,
  });
  const [form, setForm] = useState({
    name: "",
    images: "",
    followers: 0,
    genres: "",
    popularity: 0,
  });
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (form.name && form.genres) {
      const formData = new FormData();
      formData.append("file", {
        uri: form.images,
        name: "profile.jpg",
        type: "image/*",
      });
      try {
        setShowProgress({
          ...showProgress,
          bar: true,
        });
        const response = await axios.post(
          "api/aws/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.key) {
          const res = await axios.post(
            "api/artist/register",
            {
              name: form.name,
              images: [response.data.key],
              followers: form.followers,
              genres: [form.genres],
              popularity: form.popularity,
            }
          );
          setShowProgress({
            ...showProgress,
            bar: false,
          });
          if (res) {
            dispatch(allArtist(res.data.update));
          }
          Alert.alert(
            "Registro exitoso",
            "El artista se ha creado correctamente"
          );
          setForm({
            name: "",
            images: null,
            followers: 0,
            genres: "",
            popularity: 0,
          });
        }
        console.log(response.data);
      } catch (error) {
        console.log(error.data);
        console.log("Error al subir el archivo:", error);
      }
    }else{
      Alert.alert("Error", "No se pudo crear todos los datos son necesarios");
    }
  };
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/jpeg",
      });
      if (result) {
        const { uri, name } = result.assets[0];
        console.log(result);
        setForm({
          ...form,
          images: uri,
        });
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Artists</Text>
        <Image
          style={styles.image}
          source={form.images ? { uri: form.images } : null}
        />

        <TouchableOpacity style={styles.uploadButton} onPress={pickDocument}>
          <Image
            style={styles.uploadIcon}
            source={form.images ? { uri: form.images } : null}
          />
          <Text style={styles.uploadText}>Select Image Profile</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name artist"
        placeholderTextColor="#b3b3b3"
        value={form.name}
        onChangeText={(name) => setForm({ ...form, name: name })}
      />
      <TextInput
        style={styles.input}
        placeholder="Pop, Rock, Chill .etc"
        placeholderTextColor="#b3b3b3"
        value={form.genres}
        onChangeText={(genres) => setForm({ ...form, genres: genres })}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      {showProgress.bar ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
          }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : null}
      {/* <Text style={styles.buttonText}>{JSON.stringify(form)}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#0F1626",
    gap: 10,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    color: "white",
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "white",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1db954",
    padding: 12,
    borderRadius: 4,
  },
  uploadIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  uploadText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  input: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 4,
    color: "#fff",
  },
  button: {
    backgroundColor: "#1db954",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Artists;
