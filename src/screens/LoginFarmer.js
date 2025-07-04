import { useNavigation } from '@react-navigation/native';
import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Image,
    Animated,
    ImageBackground,
    Dimensions,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { pulseAnimation } from '../utils/Animation';
import { UserContext } from '../Contexts/UserContext';
import SignupPrompt from '../components/SignupPrompt';

const { width, height } = Dimensions.get('window');

export default function LoginFarmer() {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fadeAnim = new Animated.Value(1);
    const { setUser } = useContext(UserContext);

    const generateOTP = () => {
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        console.log('Generated OTP:', otp);
        return otp;
    };

    const handleSendOTP = async () => {
        Keyboard.dismiss();
        if (phoneNumber.length !== 10 || !/^\d{10}$/.test(phoneNumber)) {
            Toast.show({
                type: 'error',
                text1: 'Please enter a valid 10-digit phone number',
            });
            return;
        }

        setIsLoading(true);
        pulseAnimation(fadeAnim).start();

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            const otp = generateOTP();
            setUser({ phoneNumber });

            Toast.show({ type: 'success', text1: 'OTP Sent Successfully!' });

            navigation.navigate('OtpVerification', {
                generatedOtp: otp,
                purpose: 'login',
            });
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Failed to send OTP' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../assests/images/farmerbgi.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                    <SafeAreaView style={styles.overlay}>
                        <View style={styles.content}>
                            <Image
                                source={require('../assests/images/mainlogo.png')}
                                style={[styles.logo, { width: width * 0.75, height: width * 0.35 }]}
                            />
                            <Text style={[styles.title, { fontSize: width * 0.065 }]}>Login for Farmer</Text>

                            <View style={styles.inputContainer}>
                                <Text style={styles.prefix}>+91</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Phone number"
                                    keyboardType="phone-pad"
                                    maxLength={10}
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <TouchableOpacity onPress={handleSendOTP} disabled={isLoading}>
                                <Animated.View style={[styles.button, { opacity: fadeAnim, width: width * 0.8 }]}>
                                    <Text style={styles.buttonText}>
                                        {isLoading ? 'Sending OTP ...' : 'Send OTP'}
                                    </Text>
                                </Animated.View>
                            </TouchableOpacity>

                            <SignupPrompt />
                        </View>
                    </SafeAreaView>
                </ScrollView>
                <Toast />
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        justifyContent: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
    },
    logo: {
        width: width * 0.5,
        height: height * 0.25,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 10,
    },
    prefix: {
        fontSize: 16,
        color: '#333',
        marginRight: 5,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
