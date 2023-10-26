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
  const user = useSelector((state) => state.login.user);
  const [aver, setAver] = useState("");
  const navigation = useNavigation();
  const recharge = async ({ email, password }) => {
    await axios.post("user/logIn", { email, password }).then((res) => {
      setAver(res.data.data);
    });
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
        {/* <Text style={styles.profileDetails}>{JSON.stringify(user)}</Text> */}
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
    marginHorizontal: 20,
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
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Profile;
