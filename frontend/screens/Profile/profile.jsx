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
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
  });
  const [edi, setEdi] = useState(false);
  const user = useSelector((state) => state.login.user);
  const [aver, setAver] = useState("");
  const navigation = useNavigation();
  const recharge = async ({ email, password }) => {
    await axios.post("user/logIn", { email, password }).then((res) => {
      setAver(res.data.data);
    });
  };
  const handleEdit = async () => {
    const response = await axios.post(
      "user/edit",
      form
    );
    if(response.data){
      navigation.replace("login");
    }

    console.log(response.data);
  };
  const handleReset = () => {
    if (aver.id) {
      setForm({
        ...form,
        id: aver.id,
        name: aver.user_Name,
        email: aver.email,
      });
    } 
  };
  const handleEditButton = () => {
    setEdi(true);
    if (aver.id) {
      setForm({
        ...form,
        id: aver.id,
        name: aver.user_Name,
        email: aver.email,
      });
    } 
  };
  console.log(aver);
  useEffect(() => {
    SecureStore.getItemAsync("session").then((response) => {
      console.log(response);
      if (response) {
        recharge(JSON.parse(user));
      }
    });
  }, []);
  const handleSingOut = async () => {
    await SecureStore.deleteItemAsync("session").then(() => {
      navigation.replace("login");
      Alert.alert("Cerrando sesion", "Se cerro la sesion");
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {aver ? (
          <View style={styles.profileContainer}>
            {aver.image ? (
              <Image
                style={styles.profileImage}
                source={{
                  uri: aver.image
                    ? aver.image
                    : "https://via.placeholder.com/150",
                }}
              />
            ) : (
              <View
                style={{
                  backgroundColor: "#42b883",
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 50,
                  }}
                >
                  {aver.user_Name[0] + aver.email[0]}
                </Text>
              </View>
            )}
            <Text style={styles.profileName}>{aver.user_Name}</Text>
            <Text style={styles.profileEmail}>{aver.email}</Text>
          </View>
        ) : null}
        <TouchableOpacity style={styles.submitButton} onPress={handleSingOut}>
          <Text style={styles.submitButtonText}>Logout</Text>
        </TouchableOpacity>
        {!edi ? (
          <TouchableOpacity
            style={styles.submitButtonEdi}
            onPress={handleEditButton}
          >
            <Text style={styles.submitButtonText}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.submitButtonEdi}
            onPress={() => setEdi(false)}
          >
            <Text style={styles.submitButtonText}>Cancel</Text>
          </TouchableOpacity>
        )}
        {/* <Text style={styles.profileDetails}>{JSON.stringify(user)}</Text> */}
        {/* //AQUI EL REPRODUCTOR */}
        {edi ? (
          <View>
            <TextInput
              style={styles.input}
              placeholder="Name artist"
              placeholderTextColor="#b3b3b3"
              value={form.name}
              onChangeText={(name) => setForm({ ...form, name: name })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#b3b3b3"
              value={form.email}
              onChangeText={(email) => setForm({ ...form, email: email })}
            />
            <TouchableOpacity style={styles.button} onPress={handleEdit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonReset} onPress={handleReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1626",
  },
  scrollView: {
    marginTop: 60,
    marginHorizontal: 20,
  },
  input: {
    marginTop: 12,
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#b3b3b3",
    borderRadius: 4,
    color: "#fff",
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "white",
  },
  profileName: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
  },
  profileDetails: {
    fontSize: 14,
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#ff7e67",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  submitButtonEdi: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    marginTop: 12,
    backgroundColor: "#1db954",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonReset: {
    marginTop: 12,
    backgroundColor: "yellow",
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

export default Profile;
