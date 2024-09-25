import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';

const Home = () => {
    const navigation = useNavigation();

    const handleStart = () => {
        navigation.navigate('LogIn' as never);
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../public/leftIcon.png')}
                        style={styles.imgLeftIon}
                        resizeMode="stretch"
                    />
                    <Image
                        source={require('../public/rightIcon.png')}
                        style={styles.imgRight}
                        resizeMode="stretch"
                    />
                </View>
                <Image
                    source={require('../public/logo.png')}
                    resizeMode="stretch"
                />
                <View
                >
                    <Text style={{ color: 'black' }}>
                        Sparkle & Shine  Transform
                        Your Drive with Every Wash!
                    </Text>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.signupBtn}
                        onPress={() => handleStart}
                    >
                        <Text style={{ color: 'black' }}>
                            Let’s Start
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'black' }}>Already  have an account?  Sign in</Text>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        flexGrow: 1,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    imgRight: {
        position: 'absolute',
        top: 0,
        left: 80,
        width: 100,
        height: 100,
    },
    signupBtn: {
        backgroundColor: '#A3CFFF',
        borderRadius: 32,
        padding: 16,
        textAlign: 'center',
        color: '#092A4D',
        alignItems: 'center'
    },
    imgLeftIon: {
        position: 'absolute',
        top: 0,
        right: -50,
        width: 250,
        height: 250,
    },
    text: {
        fontSize: 20,
        color: 'darkblue',
        fontWeight: 'bold',
    },
});

export default Home