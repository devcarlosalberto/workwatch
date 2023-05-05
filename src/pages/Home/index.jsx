import { useState, useRef } from "react"
import { RxPlay, RxStop } from "react-icons/rx"

import { Container, Timer, Controls } from "./styles"
import { Button } from "../../components/Button"

import { convertTimestampToTime } from "../../utils/convertTimestampToTime"
import { convertTimestampToMinutes } from "../../utils/convertTimestampToMinutes"

export function Home() {
    const userPriceOfMinute = useRef(null)

    // refs and states for recorder
    const chunks = useRef([])
    const mediaStream = useRef(null)
    const mediaRecorder = useRef(null)
    const minutesRecording = useRef(null)
    const [isRecording, setIsRecording] = useState(false)

    // refs and states for timer
    const intervalId = useRef(0)
    const initialTimestamp = useRef(0) // timestamp started recorder
    const [timer, setTimer] = useState("00:00:00")

    async function handleStart() {
        if (userPriceOfMinute.current == null) {
            const priceOfHour = prompt(
                "Digite seu preço por hora de trabalho: "
            )
            userPriceOfMinute.current = priceOfHour / 60
        }

        setIsRecording(true)

        mediaStream.current = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
        })

        mediaRecorder.current = new MediaRecorder(mediaStream.current, {
            mimeType: "video/webm",
        })

        mediaRecorder.current.ondataavailable = ({ data }) => {
            chunks.current.push(data)
        }

        mediaRecorder.current.onstop = downloadVideo

        mediaRecorder.current.start()

        playTimer()
    }

    async function handleStop() {
        setIsRecording(false)

        stopTimer()

        mediaRecorder.current.stop()
        mediaStream.current = null
        mediaRecorder.current = null
        minutesRecording.current = null
    }

    async function playTimer() {
        initialTimestamp.current = Date.now()

        const interval = setInterval(() => {
            const currentTimestamp = Date.now()
            const timestampDiff = currentTimestamp - initialTimestamp.current

            const minutesRec = convertTimestampToMinutes(timestampDiff)
            minutesRecording.current = minutesRec
            setTimer(convertTimestampToTime(timestampDiff))
        }, 100)

        intervalId.current = interval
    }

    async function stopTimer() {
        clearInterval(intervalId.current)
    }

    async function downloadVideo() {
        // auto download of video recorded
        const blob = new Blob(chunks.current, { type: "video/webm" })
        const videoURL = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = videoURL
        a.download = "recording.webm"
        a.click()
        URL.revokeObjectURL(videoURL)

        chunks.current = []
    }

    return (
        <Container>
            <Timer>
                <span>{timer}</span>
                {isRecording && (
                    <span id="value-for-receive">
                        Seu tempo de trabalho equivale:&nbsp;
                        {(
                            minutesRecording.current * userPriceOfMinute.current
                        ).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </span>
                )}
            </Timer>
            <Controls>
                {!isRecording && (
                    <Button onClick={handleStart} icon={RxPlay} fontSize="lg" />
                )}

                {isRecording && (
                    <Button onClick={handleStop} icon={RxStop} fontSize="lg" />
                )}
            </Controls>
        </Container>
    )
}
