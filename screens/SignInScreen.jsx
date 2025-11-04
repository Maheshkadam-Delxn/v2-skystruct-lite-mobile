import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, G } from 'react-native-svg';

// Header Component
const Header = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#0066FF" />
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Sign In</Text>
        </View>
      </View>
    </>
  );
};

// InputField Component
const InputField = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  iconName
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#C7C7C7"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {iconName && (
          <Ionicons name={iconName} size={24} color="#000000" />
        )}
      </View>
    </View>
  );
};

// Circular Progress Component with Dotted Circle
const CircularProgress = ({ size = 120, strokeWidth = 4, duration = 2000 }) => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Create dotted circle pattern (20 dots)
  const dots = 20;
  const dotAngle = 360 / dots;
  const dotComponents = [];

  for (let i = 0; i < dots; i++) {
    const angle = (i * dotAngle * Math.PI) / 180;
    const x = size / 2 + (size / 2 - strokeWidth) * Math.cos(angle);
    const y = size / 2 + (size / 2 - strokeWidth) * Math.sin(angle);
    
    dotComponents.push(
      <Circle
        key={i}
        cx={x}
        cy={y}
        r={strokeWidth / 2}
        fill="#0066FF"
      />
    );
  }

  return (
    <View style={[styles.circularContainer, { width: size, height: size }]}>
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Svg width={size} height={size}>
          <G>
            {dotComponents}
          </G>
        </Svg>
      </Animated.View>
      <View style={styles.checkmarkContainer}>
        <Ionicons name="checkmark" size={50} color="#10B981" />
      </View>
    </View>
  );
};

// Success Animation Component
const SuccessAnimation = ({ visible, onAnimationComplete }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [currentText, setCurrentText] = useState('Welcome back');
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset values
      scaleValue.setValue(0);
      opacityValue.setValue(0);
      textOpacity.setValue(0);

      // Animation sequence
      Animated.sequence([
        // Show circular progress
        Animated.parallel([
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 500,
            easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
            useNativeDriver: true,
          }),
          Animated.timing(opacityValue, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        // Show "Welcome back" text
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Wait 1.5 seconds
        Animated.delay(1500),
        // Hide "Welcome back" text
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Change to "Sign in Successful!"
        setCurrentText('Sign in Successful!');
        Animated.sequence([
          // Show new text
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          // Wait 1.5 seconds
          Animated.delay(1500),
          // Hide text
          Animated.timing(textOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]).start(() => {
          // Change to "Please wait..."
          setCurrentText('Please wait...');
          Animated.sequence([
            // Show new text
            Animated.timing(textOpacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }),
            // Wait 1 second
            Animated.delay(1000),
          ]).start(() => {
            // Animation complete, navigate to MyProjectsScreen
            setTimeout(() => {
              onAnimationComplete();
            }, 1000);
          });
        });
      });
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.animationOverlay}>
      <Animated.View 
        style={[
          styles.animationContainer,
          {
            transform: [{ scale: scaleValue }],
            opacity: opacityValue,
          }
        ]}
      >
        <CircularProgress />
        
        <Animated.View 
          style={[
            styles.textContainer,
            {
              opacity: textOpacity,
            }
          ]}
        >
          <Text style={styles.welcomeBackText}>{currentText}</Text>
          {currentText === 'Please wait...' && (
            <Text style={styles.waitingText}>You will be directed to your projects.</Text>
          )}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

// Main SignIn Screen
const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call/authentication process
    setTimeout(() => {
      setIsLoading(false);
      setShowAnimation(true);
    }, 1000);
  };

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    // Navigate to MyProjectsScreen instead of Home
    navigation.replace("Home");;
  };

  const handleForgotPassword = () => {
    // Navigate to Reset Password screen
    navigation.navigate('ResetPassword');
  };

  const handleSignUp = () => {
    // Navigate to Sign Up screen
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      {/* Blue Header Background */}
      <View style={styles.blueHeader}>
        <Header />
      </View>

      {/* Content Container */}
      <ScrollView 
        style={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.card}>
          {/* Welcome Text */}
          <Text style={styles.welcomeText}>Welcome back 👋</Text>
          <Text style={styles.subtitleText}>
            Please enter your email & password to sign in.
          </Text>

          {/* Email Input Field */}
          <InputField
            label="Email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            iconName="mail-outline"
          />

          {/* Password Input Field */}
          <InputField
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            iconName="lock-closed-outline"
          />

          {/* Remember Me Checkbox */}
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity 
            activeOpacity={0.7} 
            style={styles.forgotPasswordContainer}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPassword}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={handleSignUp}
            >
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>

          {/* Divider with text */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons name="logo-google" size={32} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons name="logo-apple" size={32} color="#000000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons name="logo-facebook" size={32} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Ionicons name="logo-twitter" size={32} color="#1DA1F2" />
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity 
            style={[
              styles.signInButton,
              isLoading && styles.signInButtonDisabled
            ]} 
            onPress={handleSignIn}
            activeOpacity={0.8}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.signInButtonText}>Signing in...</Text>
            ) : (
              <Text style={styles.signInButtonText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Success Animation Overlay */}
      <SuccessAnimation 
        visible={showAnimation} 
        onAnimationComplete={handleAnimationComplete}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  // Header Styles - Updated to #0066FF
  blueHeader: {
    backgroundColor: '#0066FF',
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerContainer: {
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Scroll Content
  scrollContent: {
    flex: 1,
    marginTop: -20,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  // Card Styles
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 40,
    minHeight: '100%',
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  subtitleText: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 32,
    lineHeight: 22,
  },
  // Input Field Styles
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 0,
  },
  // Checkbox Styles
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2.5,
    borderColor: '#0066FF',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '500',
  },
  // Forgot Password
  forgotPasswordContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  forgotPassword: {
    fontSize: 15,
    color: '#0066FF',
    fontWeight: '600',
  },
  // Sign Up
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  signupText: {
    fontSize: 15,
    color: '#666666',
  },
  signupLink: {
    fontSize: 15,
    color: '#0066FF',
    fontWeight: '600',
  },
  // Divider
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    fontSize: 14,
    color: '#999999',
    marginHorizontal: 16,
  },
  // Social Buttons
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
  },
  socialButton: {
    width: 70,
    height: 70,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  // Sign In Button
  signInButton: {
    backgroundColor: '#0066FF',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  signInButtonDisabled: {
    backgroundColor: '#66A3FF',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  // Animation Styles
  animationOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  checkmarkContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  welcomeBackText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  waitingText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default SignInScreen;