import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';

// Screens
import Splash1 from './screens/SplashScreen';
import Onboarding from './screens/OnboardingScreen';
import Welcome from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import ResetPasswordScreen from 'screens/ResetPasswordScreen';
import OTPVerificationScreen from 'screens/OTPVerificationScreen';
import CreateNewPasswordScreen from 'screens/CreateNewPasswordScreen';
import ResetPasswordSuccessScreen from 'screens/ResetPasswordSuccessScreen';
import SignInScreen from 'screens/SignInScreen';
import MyProjectsScreen from 'screens/ProjectListScreen/MyProjectsScreen';
import ProfilePageScreen from 'screens/ProfileScreen/ProfilePageScreen';
import CreateProjectScreen from 'screens/ProjectListScreen/CreateProjectScreen';
import ProjectDetailsScreen from 'screens/ProjectDetailsScreen';
// import TasksScreen from 'screens/Project/TasksScreen';
// import TransactionsScreen from 'screens/Project/TransactionsScreen';
// import AttendanceScreen from 'screens/Project/AttendanceScreen';

import "./global.css";

const Stack = createNativeStackNavigator();

// ✅ SafeArea wrapper
const SafeAreaWrapper = ({ children }) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
    {children}
  </SafeAreaView>
);

export default function App() {
  const [fontsLoaded] = useFonts({
    'Urbanist-Regular': require('./assets/fonts/Urbanist-Regular.ttf'),
    'Urbanist-Bold': require('./assets/fonts/Urbanist-Bold.ttf'),
    'Urbanist-SemiBold': require('./assets/fonts/Urbanist-SemiBold.ttf'),
    'Urbanist-Medium': require('./assets/fonts/Urbanist-Medium.ttf'),
    'Urbanist-Light': require('./assets/fonts/Urbanist-Light.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaWrapper>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash1"
            screenOptions={{ headerShown: false }}
          >
            {/* Auth & Intro screens */}
            <Stack.Screen name="Splash1" component={Splash1} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
            <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />
            <Stack.Screen name="ResetPasswordSuccess" component={ResetPasswordSuccessScreen} />

            {/* Main App Screens */}
            <Stack.Screen name="Home" component={MyProjectsScreen} />
            <Stack.Screen name="ProfilePageScreen" component={ProfilePageScreen} />
            <Stack.Screen name="CreateProject" component={CreateProjectScreen} />
            
            {/* Project Management Screens */}
            <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
            {/* <Stack.Screen name="TasksScreen" component={TasksScreen} />
            <Stack.Screen name="TransactionsScreen" component={TransactionsScreen} />
            <Stack.Screen name="AttendanceScreen" component={AttendanceScreen} /> */}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaWrapper>
    </SafeAreaProvider>
  );
}