import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
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
} from 'react-native';
import Toast from 'react-native-toast-message';
import { pulseAnimation } from '../utils/Animation';
import { UserContext } from '../Contexts/UserContext';
import SignupPrompt from '../components/SignupPrompt';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window');

export default function LoginDelivery() {
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
            
            navigation.navigate('OtpVerification', {
                generatedOtp: otp,
                purpose: 'login',
            });
            Toast.show({ type: 'success', text1: 'OTP Sent Successfully!' });
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Failed to send OTP' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ImageBackground
            // source={require('../assests/images/deliverybgi.jpeg')}
            style={styles.background}
            resizeMode='cover'
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        <Image
                            source={require('../assests/images/mainlogo.png')}
                            style={styles.logo}
                        />
                        <Text style={styles.title}>Enter your Phone Number</Text>



                        <View style={styles.inputContainer}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="call" size={width * 0.06} color="#333" />
                            </View>

                            <TextInput
                                style={styles.input}
                                // placeholder="Enter Phone number"
                                keyboardType="phone-pad"
                                maxLength={10}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholderTextColor="#999"
                            />
                        </View>

                        <TouchableOpacity onPress={handleSendOTP} disabled={isLoading}>
                            <Animated.View style={[styles.button, { opacity: fadeAnim }]}>
                                <Text style={styles.buttonText}>
                                    {isLoading ? 'Sending OTP ...' : 'Send OTP'}
                                </Text>
                            </Animated.View>
                        </TouchableOpacity>
                        <SignupPrompt />
                    </View>
                </View>
                <Toast />
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor:'#e6f5ec'
    },
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.45)',
        justifyContent: 'center',
        padding: width * 0.05,
    },
    content: {
        alignItems: 'center',
    },
    logo: {
        width: width * 0.8,
        height: height * 0.2,
        resizeMode: 'contain',
        marginBottom: height * 0.02,
    },
    title: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: height * 0.04,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        marginBottom: height * 0.025,
        width: '95%',
        height: height * 0.065,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    iconContainer: {
        width: width * 0.15,
        height: '100%',
        backgroundColor: '#f0f0f0',
        borderRightWidth: 1,
        borderColor: '#ccc',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,

        justifyContent: 'center', // vertical center
        alignItems: 'center',
    },
    prefix: {
        paddingLeft: width * 0.04,
        paddingRight: width * 0.02,
        fontSize: width * 0.045,
        color: '#333',
    },
    input: {
        flex: 1,
        padding: width * 0.04,
        fontSize: width * 0.045,
        color: '#333',
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: height * 0.02,
        borderRadius: 8,
        width: width * 0.8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.045,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
