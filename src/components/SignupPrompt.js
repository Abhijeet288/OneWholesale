// components/SignupPrompt.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignupPrompt() {
    const navigation = useNavigation();

    return (
        <View style={styles.signupContainer}>
            <Text style={styles.newUserText}>New User?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Selection')}>
                <Text style={styles.signupText}>Create an account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    signupContainer: {
        flexDirection: 'row',
        // gap: 10,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    newUserText: {
        fontSize: 20,
        color: '#333',
        marginRight: 5,
    },
    signupText: {
        fontSize: 20,
        color: '#4CAF50',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
