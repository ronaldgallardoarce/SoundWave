import { Image, Pressable, Text, View } from "react-native";
const RenderItem = ({item}) => {
    return (
        <Pressable
            style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 10,
                marginVertical: 8,
                backgroundColor: "#282828",
                borderRadius: 4,
                elevation: 3,
            }}
        >
            <Image
                style={{ height: 55, width: 55 }}
                source={{ uri: item.images[0] }}
            />
            <View
                style={{ flex: 1, marginHorizontal: 8, justifyContent: "center" }}
            >
                <Text
                    numberOfLines={2}
                    style={{ fontSize: 13, fontWeight: "bold", color: "white" }}
                >
                    {item.name}
                </Text>
            </View>
        </Pressable>
    );
}

export default RenderItem;
