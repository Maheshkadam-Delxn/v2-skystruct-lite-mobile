import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, G } from 'react-native-svg';

// Header Component
const Header = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Reset Password</Text>
        </View>
      </View>
    </>
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
        fill="#3B82F6"
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

// Success Animation Component for Reset Password
const ResetPasswordSuccessAnimation = ({ visible, onAnimationComplete }) => {
  const scaleValue = useRef(new Animated.Value(0)).current;
  const opacityValue = useRef(new Animated.Value(0)).current;
  const [currentText, setCurrentText] = useState('Password Reset');
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
        // Show "Password Reset" text
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        // Wait 1.5 seconds
        Animated.delay(1500),
        // Hide "Password Reset" text
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Change to "Successful!"
        setCurrentText('Successful!');
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
          setCurrentText('Please wait.');
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
            // Animation complete, navigate to homepage
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
          <Text style={styles.successText}>{currentText}</Text>
          {currentText === 'Please wait.' && (
            <Text style={styles.waitingText}>You will be directed to the homepage.</Text>
          )}
        </Animated.View>
      </Animated.View>
    </View>
  );
};

// Main ResetPasswordSuccessScreen
const ResetPasswordSuccessScreen = ({ navigation }) => {
  const [showAnimation, setShowAnimation] = useState(true);

  const handleAnimationComplete = () => {
    setShowAnimation(false);
    // Navigate to the sign in screen or homepage
    navigation.navigate('SignIn');
  };

  const handleBackToSignIn = () => {
    setShowAnimation(false);
    navigation.navigate('SignIn');
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
          {/* Success Icon and Text */}
          <View style={styles.successContent}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={80} color="#10B981" />
            </View>
            
            <Text style={styles.successTitle}>Password Reset Successful</Text>
            
            <Text style={styles.successMessage}>
              Your password has been reset successfully. You can now sign in with your new password.
            </Text>
          </View>

          {/* Additional Information */}
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#10B981" />
              <Text style={styles.infoText}>Password updated successfully</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#10B981" />
              <Text style={styles.infoText}>You can now sign in with new password</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="checkmark-circle-outline" size={24} color="#10B981" />
              <Text style={styles.infoText}>Security maintained</Text>
            </View>
          </View>

          {/* Back to Sign In Button */}
          <TouchableOpacity 
            style={styles.backToSignInButton}
            onPress={handleBackToSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.backToSignInButtonText}>Back to Sign In</Text>
          </TouchableOpacity>

          {/* Support Text */}
          <View style={styles.supportContainer}>
            <Text style={styles.supportText}>
              Having trouble?{' '}
              <Text style={styles.supportLink}>Contact Support</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Success Animation Overlay */}
      <ResetPasswordSuccessAnimation 
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
  // Header Styles
  blueHeader: {
    backgroundColor: '#3B82F6',
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
  // Success Content
  successContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successIconContainer: {
    marginBottom: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
  },
  // Info Container
  infoContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 15,
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  // Back to Sign In Button
  backToSignInButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  backToSignInButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
  // Support Container
  supportContainer: {
    alignItems: 'center',
  },
  supportText: {
    fontSize: 15,
    color: '#666666',
  },
  supportLink: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  // Animation Styles (same as SignInScreen)
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
  successText: {
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

export default ResetPasswordSuccessScreen;