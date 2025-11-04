import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, StyleSheet } from 'react-native';
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

// InputField Component
const InputField = ({ 
  label, 
  placeholder, 
  value, 
  onChangeText, 
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

// Main ResetPassword Screen
const ResetPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('andrew.ainsley@yourdomain.com');

  const handleContinue = () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }
    
    navigation.navigate('OTPVerification', { email });
  };

  return (
    <View style={styles.container}>
      <View style={styles.blueHeader}>
        <Header title="Reset Password" />
      </View>

      <ScrollView 
        style={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <View style={styles.card}>
          <Text style={styles.titleText}>Reset your password</Text>
          
          <Text style={styles.descriptionText}>
            Please enter your email and we will send an{'\n'}
            OTP code in the next step to reset your{'\n'}
            password.
          </Text>

          <InputField
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            iconName="mail-outline"
          />

          <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
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
  inputContainer: {
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 8,
  },
  continueButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 20,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});

export default ResetPasswordScreen;