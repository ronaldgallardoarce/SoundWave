import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AwsUploads from "./screens/Aws/AwsUploads";
import Home from "./screens/Home/Home";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();
import Artists from "./screens/Artists/Artists"
const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "red",
      }}
    >
      <Tab.Screen
        name="Home"
        index
        component={Home}
        options={{
          tabBarLabel: "HOME",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-variant"
              size={size}
              color={color}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Asw"
        component={AwsUploads}
        options={{
          tabBarLabel: "AWS",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="upload-multiple"
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Artists"
        component={Artists}
        options={{
          tabBarLabel: "Artists",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="upload-multiple"
              size={size}
              color={color}
            />
          ),
          headerShown: false,
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};
export default function Navigation() {
  return (
    <NavigationContainer >
      <MyTabs></MyTabs>
    </NavigationContainer>
  );
}
