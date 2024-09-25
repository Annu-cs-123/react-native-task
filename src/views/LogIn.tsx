import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';

import { login } from '../store/slice';

const LogIn = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSignIn = async () => {
    try {
      const response = await fetch('https://tor.appdevelopers.mobi/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sign in successful');
        dispatch(login(name));
        navigation.navigate('Welcome' as never);
      } else {
        Alert.alert(data.error);
      }
    } catch (error) {
      Alert.alert('Error:', (error as Error).message);
    }
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character.';
    }
    return null;
  };

  const handleSignUp = async () => {
    const passwordError = validatePassword(password);
    if (passwordError) {
      Alert.alert(passwordError);
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('https://tor.appdevelopers.mobi/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('User created successfully');
        navigation.navigate('Welcome' as never);
        setIsSignUp(false);
      } else {
        Alert.alert(data.error);
      }
    } catch (error) {
      Alert.alert('Error:', (error as Error).message);
    }
  };

  const handleCheckBoxChange = () => setIsChecked(!isChecked);
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ backgroundColor: 'white', flexGrow: 1 }}>
        <View
          style={styles.container}
        >
          <Image
            source={require('../public/logo.png')}
            resizeMode="stretch"
          />
          {isSignUp ? (
            <>
              <Text style={styles.title}>Sign Up</Text>
              <Text style={styles.para}>Fill in the below form and add life to your car! </Text>
              <Text style={styles.label}>Name</Text>
              <TextInput
                placeholder="Name"
                style={styles.input}
                placeholderTextColor="black"
                value={name}
                onChangeText={setName}
              />
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Email"
                style={styles.input}
                placeholderTextColor="black"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Confirm Password"
                style={styles.input}
                placeholderTextColor="black"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  value={isChecked}
                  onValueChange={handleCheckBoxChange}
                />
                <Text style={styles.checkBoxText}>
                  Agree with <Text style={styles.link}>Terms & Conditions</Text>
                </Text>
              </View>

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
                onPress={handleSignUp}
              >
                <Text >Sign Up</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Sign In</Text>
              <Text style={styles.para}>Hi ! Welcome back, you have been missed </Text>
              <Text style={styles.label}>Email</Text>
              <TextInput
                placeholder="Enter your email"
                style={styles.input}
                placeholderTextColor="black"
                value={email}
                onChangeText={setEmail}
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                style={styles.input}
                placeholderTextColor="black"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.btn}
                onPress={handleSignIn}
              >
                <Text >Sign In</Text>
              </TouchableOpacity>
              <View style={styles.orContainer}>
                <Text style={styles.orText}>or</Text>
              </View>
              <View style={styles.iconContainer}>
                <Image
                  source={require('../public/googleIcon.png')}
                  resizeMode="stretch"
                />
                <Image
                  source={require('../public/appleIcon.png')}
                  resizeMode="stretch"
                />
              </View>
            </>
          )}

          <TouchableOpacity
            activeOpacity={0.7}
            // style={styles.btn}
            onPress={() => setIsSignUp(!isSignUp)}
          >
            <Text >
              {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account?  Sign Up'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.privacyText}>By login or sign up, you agree to our terms of use and privacy policy</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    marginTop: 15,
    backgroundColor: 'white',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer:{
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  para: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  bottomTextContainer: {
    alignItems: 'center',
  },
  bottomText: {
    marginBottom: 5,
  },
  link: {
    color: '#007bff',
  },
  orContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  orText: {
    fontSize: 16,
  },

  input: {
    width: '100%',
    height: 45,
    borderColor: 'gray',
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginVertical: 10,
    fontFamily: 'NunitoSans-Regular',
    fontSize: 15,
  },
  btn: {
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
  signinText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'NunitoSans_7pt_Condensed-ExtraLight',

  },
  privacyText:{
    fontSize: 14,
    color: '#808080',
    fontWeight: 500,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkBoxText: {
    marginLeft: 10,
  },
  signupText: {
    fontSize: 14,
    color: 'gray',
  },
})
export default LogIn;
