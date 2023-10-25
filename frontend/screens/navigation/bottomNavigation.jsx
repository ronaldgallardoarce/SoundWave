import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import AddMusicSpotify from '../spotify/addMusicSpotify';
import Login from '../login/login';
import SignIn from '../login/signIn';
const Tab = createBottomTabNavigator();
const BottomTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "rgba(0,0,0,0.5)",
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    shadowOpacity: 4,
                    shadowRadius: 4,
                    elevation: 0,
                    shadowOffset: {
                        width: 0,
                        height: -4
                    },
                    borderTopWidth: 0
                }
            }}
        >
            <Tab.Screen
                name='Inicio'
                component={AddMusicSpotify}
                options={{
                    tabBarLabel: 'Inicio',
                    headerShown: false,
                    tabBarLabelStyle: {
                        color: 'white'
                    },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" size={24} color="white" />
                        ) : (
                            <AntDesign name="home" size={24} color="white" />
                        )
                }}
            />
            <Tab.Screen
                name='login'
                component={Login}
                options={{
                    tabBarLabel: 'Login',
                    headerShown: false,
                    tabBarLabelStyle: {
                        color: 'white'
                    },
                    tabBarIcon: ({ focused }) =>
                        focused ? (
                            <Entypo name="home" size={24} color="white" />
                        ) : (
                            <AntDesign name="home" size={24} color="white" />
                        )
                }}
            />
        </Tab.Navigator>
    );
}

const Stack = createNativeStackNavigator();
const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='login'>
                <Stack.Screen
                    name='Menu'
                    component={BottomTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='login'
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='Crear cuenta'
                    component={SignIn}
                    options={{ headerShown: true }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;