import { useEffect, useState } from "react"
import {
    Button,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native"
import * as ImagePicker from "expo-image-picker"
import { Link, useLocalSearchParams } from "expo-router"

export default function Index() {
    const { uri } = useLocalSearchParams()

    const [image, setImage] = useState<null | string>(null)
    const [result, setResult] = useState()

    useEffect(() => {
        if (uri) {
            setImage(uri as string)
            // convertImgFileToText(uri as string)
        }
    }, [uri])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
            const r = await recognizeTextFromImage(result.assets[0].uri)
            console.log(r)
        }
    }

    const recognizeTextFromImage = async (uri: string) => {}

    const imgToText = () => {
        console.log("img to text")
    }

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <Button
                    title="Pick an image from camera roll"
                    onPress={pickImage}
                />
                <Link href={"/camera"} asChild>
                    <Pressable
                        style={{
                            borderWidth: 1,
                            padding: 10,
                            borderRadius: 10,
                            marginVertical: 20,
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>Take a photo</Text>
                    </Pressable>
                </Link>
                {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                )}
                {result && <Text>{result}</Text>}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 200,
        height: 200,
        objectFit: "contain",
        marginBottom: 20,
    },
})
