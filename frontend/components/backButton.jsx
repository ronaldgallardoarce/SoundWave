import { Animated, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useRef } from "react";

const BackButton = ({ navigation }) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.8,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const animatedStyle = {
        transform: [{ scale: scaleValue }],
    };
    const back = () => {
        navigation.goBack()
    }
    return (
        <View style={{marginHorizontal:10}}>
        <TouchableWithoutFeedback  onPress={back} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={animatedStyle}>
                <Ionicons name="arrow-back" size={30} color="white" style={{ marginRight: 17 }} />
            </Animated.View>
        </TouchableWithoutFeedback>
        </View>
    );
};

export default BackButton;