import { NativeModules } from "react-native"

const { TextRecognitionModule } = NativeModules

export type Rect = {
    left: number
    top: number
    height: number
    width: number
}
export type Line = {
    text: string
    rect: Rect
}
export type Block = {
    text: string
    rect: Rect
    lines: Line[]
}

export const recognizeImage = (url: string): Promise<string> => {
    return TextRecognitionModule.recognizeImage(url)
}
