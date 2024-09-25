import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image ,Alert} from 'react-native';


import {logout} from '../store/slice';
import { RootState } from '../store';

const Welcome = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userName = useSelector((state: RootState) => state.auth.userName);

  console.log(userName,'users name');

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('LogIn' as never);

    Alert.alert('Logged out successfully');
};

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../public/logo.png')}
          resizeMode="stretch"
        />
      </View>

      <Text style={styles.welcomeText}>Welcome {userName}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  logoutButton: {
    backgroundColor: '#A3CFFF',
    borderRadius: 32,
    padding: 16,
    textAlign: 'center',
    color: '#092A4D',
    alignItems: 'center',
    marginVertical: 15,
    justifyContent: 'center',
    width: '100%',
  },
  logoutText: {
    color: '#092A4D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Welcome;
