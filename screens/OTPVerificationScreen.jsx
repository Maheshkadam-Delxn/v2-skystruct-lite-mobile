import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Header Component
const Header = ({ title }) => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </View>
    </>
  );
};

// Main OTPVerification Screen
const OTPVerificationScreen = ({ navigation, route }) => {
  const [code, setCode] = useState(['', '', '']);
  const [timer, setTimer] = useState(55);
  const [canResend, setCanResend] = useState(false);

  const email = route?.params?.email || 'andrew.ainsley@yourdomain.com';
  const maskedEmail = `and*******ley@yourdomain.com`;

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleNumberPress = (number) => {
    const emptyIndex = code.findIndex(digit => digit === '');
    if (emptyIndex !== -1) {
      const newCode = [...code];
      newCode[emptyIndex] = number;
      setCode(newCode);
      
      if (emptyIndex === 2) {
        setTimeout(() => {
          navigation.navigate('CreateNewPassword', { email });
        }, 500);
      }
    }
  };

  const handleBackspace = () => {
    const lastFilledIndex = code.reduce((acc, digit, index) => 
      digit !== '' ? index : acc, -1
    );
    
    if (lastFilledIndex !== -1) {
      const newCode = [...code];
      newCode[lastFilledIndex] = '';
      setCode(newCode);
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      setTimer(55);
      setCanResend(false);
      setCode(['', '', '']);
    }
  };

  const numbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', 'backspace']
  ];

  return (
    <View style={styles.container}>
      <View style={styles.blueHeader}>
        <Header title="OTP Verification" />
      </View>

      <ScrollView 
        style={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.card}>
          <Text style={styles.titleText}>OTP code verification</Text>
          
          <Text style={styles.descriptionText}>
            We have sent an OTP code to your email {maskedEmail}.{'\n'}
            Enter the OTP code below to verify.
          </Text>

          <View style={styles.otpDisplayContainer}>
            <Text style={styles.otpDisplayText}>
              {code[0] || ' '}    {code[1] || ' '}    {code[2] || ' '}
            </Text>
            <View style={styles.otpUnderlineContainer}>
              <View style={[styles.otpUnderline, code[0] && styles.otpUnderlineFilled]} />
              <View style={[styles.otpUnderline, code[1] && styles.otpUnderlineFilled]} />
              <View style={[styles.otpUnderline, code[2] && styles.otpUnderlineFilled]} />
            </View>
          </View>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive email?</Text>
            <TouchableOpacity 
              onPress={handleResendCode}
              disabled={!canResend}
              activeOpacity={0.7}
            >
              <Text style={[
                styles.resendLink,
                !canResend && styles.resendLinkDisabled
              ]}>
                {canResend ? 'Resend code' : `You can resend code in ${timer}s`}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.numpadContainer}>
            {numbers.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.numpadRow}>
                {row.map((item, colIndex) => (
                  <TouchableOpacity
                    key={colIndex}
                    style={styles.numpadKey}
                    onPress={() => {
                      if (item === 'backspace') {
                        handleBackspace();
                      } else {
                        handleNumberPress(item);
                      }
                    }}
                    activeOpacity={0.7}
                  >
                    {item === 'backspace' ? (
                      <Ionicons name="backspace-outline" size={28} color="#3B82F6" />
                    ) : (
                      <Text style={styles.numpadText}>{item}</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
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
  scrollContent: {
    flex: 1,
    marginTop: -20,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 40,
    minHeight: '100%',
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    lineHeight: 24,
    textAlign: 'center',
  },
  otpDisplayContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  otpDisplayText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 20,
    marginBottom: 15,
    marginRight: -20,
  },
  otpUnderlineContainer: {
    flexDirection: 'row',
    gap: 40,
  },
  otpUnderline: {
    width: 40,
    height: 3,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  otpUnderlineFilled: {
    backgroundColor: '#3B82F6',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  resendText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
  },
  resendLink: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  resendLinkDisabled: {
    color: '#999999',
  },
  numpadContainer: {
    marginBottom: 30,
  },
  numpadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  numpadKey: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  numpadText: {
    fontSize: 28,
    fontWeight: '400',
    color: '#000000',
  },
});

export default OTPVerificationScreen;