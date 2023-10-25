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
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { Video } from "expo-av";

const Artists = () => {
  const [form, setForm] = useState({
    name: "",
    images: "",
    followers: 0,
    genres: "",
    popularity: 0,
  });
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", {
      uri: form.images,
      name: "profile.jpeg", // Cambia "video.mp4" por el nombre que deseas darle al archivo en el servidor
      type: "image/jpeg", // Cambia "video/mp4" por el tipo MIME correcto del archivo
    });
    try {
      const response = await axios.post("https://ab96-181-188-177-175.ngrok-free.app/api/aws/upload");
    } catch (error) {
      console.log(error.data);
      console.log("Error al subir el archivo:", error);
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
          file: uri,
        });
      }
    } catch (error) {
      console.log("Error picking document:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, color: "white" }}>Create Artists</Text>
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
      <Button
        style={styles.button}
        title="Select Image Profile"
        onPress={pickDocument}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <Text style={styles.buttonText}>{JSON.stringify(form)}</Text>
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
  uploadButton: {
    width: 200,
    height: 200,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadIcon: {
    width: 50,
    height: 50,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Artists;
