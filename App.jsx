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

// ✅ Dynamic SafeArea wrapper
const SafeAreaWrapper = ({ children, routeName }) => {
  const whiteScreens = ['Splash1', 'Onboarding', 'Welcome'];
  const isWhite = whiteScreens.includes(routeName);

  const topColor = isWhite ? '#FFFFFF' : '#0066FF';
  const bottomColor = '#FFFFFF';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: topColor }} edges={['top']}>
      <SafeAreaView style={{ flex: 1, backgroundColor: bottomColor }} edges={['bottom']}>
        {children}
      </SafeAreaView>
    </SafeAreaView>
  );
};

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

  const screens = [
    { name: 'Splash1', component: Splash1 },
    { name: 'Onboarding', component: Onboarding },
    { name: 'Welcome', component: Welcome },
    { name: 'SignIn', component: SignInScreen },
    { name: 'SignUp', component: SignUpScreen },
    { name: 'ResetPassword', component: ResetPasswordScreen },
    { name: 'OTPVerification', component: OTPVerificationScreen },
    { name: 'CreateNewPassword', component: CreateNewPasswordScreen },
    { name: 'ResetPasswordSuccess', component: ResetPasswordSuccessScreen },
    { name: 'Home', component: MyProjectsScreen },
    { name: 'ProfilePageScreen', component: ProfilePageScreen },
    { name: 'CreateProject', component: CreateProjectScreen },
    { name: 'ProjectDetails', component: ProjectDetailsScreen },
  ];

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash1"
          screenOptions={{ headerShown: false }}
        >
          {screens.map((screen) => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              options={{ headerShown: false }}
            >
              {(props) => (
                <SafeAreaWrapper routeName={screen.name}>
                  <screen.component {...props} />
                </SafeAreaWrapper>
              )}
            </Stack.Screen>
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
