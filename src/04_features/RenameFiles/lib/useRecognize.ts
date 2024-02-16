import {useEffect, useMemo, useRef, useState} from "react";

export const useRecognize = () => {
    const recognition = useRef<SpeechRecognition | null>(null);

    const [textRecognize, setTextRecognize] =
        useState<string>('')
    const [isListenRecognize, setIsListenRecognize] =
        useState<boolean>(false)

    const isAvailableRecognize = useMemo<boolean>(() =>
        'webkitSpeechRecognition' in window, [])

    // initial config
    useEffect(() => {
        'webkitSpeechRecognition' in window &&
            (recognition.current = new webkitSpeechRecognition())

        if (recognition.current) {
            recognition.current.continuous = true
            recognition.current.lang = 'ru-RU';

            recognition.current.onresult = (event) => {
                recognition.current?.stop()
                setIsListenRecognize(false)
                setTextRecognize(Array.from(event.results)
                    .map(phrase => phrase[0])
                    .map(sentence => sentence.transcript)
                    .join()
                )
            }
        }
    }, []);

    if (!('webkitSpeechRecognition' in window))
        return {}

    const startRecognize = () => {
        if (recognition.current) {
            console.log('start')
            recognition.current.start()
            setIsListenRecognize(true)
        }
    }

    const stopRecognize = () => {
        if (recognition.current) {
            recognition.current?.stop()
            setIsListenRecognize(false)
        }
    }

    return {
        textRecognize,
        isListenRecognize,
        startRecognize,
        stopRecognize,
        isAvailableRecognize
    }
}