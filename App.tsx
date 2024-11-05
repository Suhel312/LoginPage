import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

// Define types for navigation and route parameters
type RootStackParamList = {
  Login: undefined;
  Main: { email: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert("Please fill both fields");
    } else if (!emailRegex.test(email)) {
      Alert.alert("Invalid email format");
    } else if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters long");
    } else {
      navigation.navigate('Main', { email });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity >
        <Text style={styles.registerText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const MainScreen = ({ route }: { route: any }) => {
  const { email } = route.params; // Get email from route params

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Welcome {email}!</Text>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen}
        options={{
          headerStyle: {
            backgroundColor: '#68fdfd'
          }
        }} />
        <Stack.Screen name="Main" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#84fbe7c2',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color: "#666"
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: 'black'
  },
  email: {
    fontSize: 16,
    color: 'blue',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007bff',
  },
});
