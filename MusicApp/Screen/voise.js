import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

export default function VoiceSearchScreen() {
    const [text, setText] = useState(''); // Kết quả nhận diện giọng nói
    const [isListening, setIsListening] = useState(false); // Trạng thái lắng nghe
    const [isSupported, setIsSupported] = useState(false); // Kiểm tra hỗ trợ Web Speech API
    const recognitionRef = useRef(null); // Lưu SpeechRecognition instance

    // Kiểm tra nếu trình duyệt hỗ trợ Web Speech API
    useEffect(() => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            setIsSupported(true);
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.lang = 'vi-VN'; // Cài đặt ngôn ngữ tiếng Việt

            recognition.onstart = () => {
                console.log('Voice recognition started');
                setIsListening(true);
            };

            recognition.onresult = (event) => {
                console.log('Voice recognition result:', event.results);
                if (event.results.length > 0) {
                    const transcript = event.results[0][0].transcript;
                    setText(transcript); // Ghi kết quả vào text
                }
            };

            recognition.onerror = (event) => {
                console.error('Voice recognition error:', event.error);
                setIsListening(false);
            };

            recognition.onend = () => {
                console.log('Voice recognition ended');
                setIsListening(false);
            };

            recognitionRef.current = recognition; // Lưu instance vào ref
        } else {
            setIsSupported(false);
        }
    }, []);

    // Bắt đầu nhận diện giọng nói
    const startListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.start();
        }
    };

    // Dừng nhận diện giọng nói
    const stopListening = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Tìm kiếm bằng giọng nói</Text>
            {isSupported ? (
                <>
                    <TextInput
                        style={styles.input}
                        value={text}
                        onChangeText={setText}
                        placeholder="Kết quả tìm kiếm..."
                    />
                    <Button
                        title={isListening ? 'Dừng lắng nghe' : 'Bắt đầu lắng nghe'}
                        onPress={isListening ? stopListening : startListening}
                    />
                </>
            ) : (
                <Text style={styles.error}>
                    Trình duyệt không hỗ trợ tính năng nhận diện giọng nói.
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f8f9fa',
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    error: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
});
