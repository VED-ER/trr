import { CameraType, CameraView, useCameraPermissions } from "expo-camera"
import { router } from "expo-router"
import { useRef, useState } from "react"
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"

export default function Camera() {
    const [facing, setFacing] = useState<CameraType>("back")
    const [cameraReady, setCameraReady] = useState(false)
    const [permission, requestPermission] = useCameraPermissions()

    const cameraRef = useRef<CameraView | null>(null)
    if (!permission) {
        return <View />
    }

    const requestCameraPermisson = () => {
        if (permission.canAskAgain) {
            requestPermission()
        } else {
            Alert.alert(
                "Camera access needed",
                "Please allow camera access in settings"
            )
        }
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: "center" }}>
                    Please grant your permission to show camera
                </Text>
                <Button
                    onPress={requestCameraPermisson}
                    title="grant permission"
                />
            </View>
        )
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === "back" ? "front" : "back"))
    }

    function onCameraReady() {
        setCameraReady(true)
    }

    async function takePic() {
        const res = await cameraRef.current?.takePictureAsync()
        router.navigate("/?uri=".concat(res?.uri!))
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing={facing}
                onCameraReady={onCameraReady}
                ref={cameraRef}
            ></CameraView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={toggleCameraFacing}
                >
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    disabled={!cameraReady}
                    onPress={takePic}
                >
                    <Text style={styles.text}>Take Pic</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: "row",
        margin: 30,
    },
    button: {
        flex: 1,
        alignSelf: "flex-end",
        alignItems: "center",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        color: "black",
    },
})
