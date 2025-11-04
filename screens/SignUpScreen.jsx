import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar, 
  StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Header Component
const Header = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Sign Up</Text>
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

// Main SignUp Screen
const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleSignUp = () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
    
    if (!agreeToTerms) {
      alert('Please agree to the Terms and Privacy Policy');
      return;
    }

    // ✅ Simulate successful signup
    console.log('Sign up successful with:', { email, password });
    navigation.navigate('Home'); // <-- Navigate to Home screen
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
          <Text style={styles.welcomeText}>Hello there</Text>
          <Text style={styles.subtitleText}>
            Please enter your email & password to create an account.
          </Text>

          {/* Email Input */}
          <InputField
            label="Email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            iconName="mail-outline"
          />

          {/* Password Input */}
          <InputField
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            iconName="lock-closed-outline"
          />

          {/* Terms Agreement Checkbox */}
          <TouchableOpacity 
            style={styles.checkboxContainer}
            onPress={() => setAgreeToTerms(!agreeToTerms)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, agreeToTerms && styles.checkboxChecked]}>
              {agreeToTerms && (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>
              I agree to Skystruct Terms, & Privacy Policy.
            </Text>
          </TouchableOpacity>

          {/* Sign In Link */}
          <View style={styles.signinContainer}>
            <Text style={styles.signinText}>Already have an account? </Text>
            <TouchableOpacity 
              activeOpacity={0.7}
              onPress={handleSignIn}
            >
              <Text style={styles.signinLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
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

          {/* Sign Up Button */}
          <TouchableOpacity 
            style={[
              styles.signUpButton,
              (!email || !password || !agreeToTerms) && styles.signUpButtonDisabled
            ]} 
            onPress={handleSignUp}
            activeOpacity={0.8}
            disabled={!email || !password || !agreeToTerms}
          >
            <Text style={styles.signUpButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  blueHeader: {
    backgroundColor: '#0066FF',
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerContainer: { paddingHorizontal: 24 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' },
  scrollContent: { flex: 1, marginTop: -20 },
  scrollContentContainer: { flexGrow: 1 },
  card: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 40,
    minHeight: '100%',
  },
  welcomeText: { fontSize: 32, fontWeight: 'bold', color: '#000000', marginBottom: 12 },
  subtitleText: { fontSize: 15, color: '#666666', marginBottom: 32, lineHeight: 22 },
  inputContainer: { marginBottom: 24 },
  label: { fontSize: 15, fontWeight: '600', color: '#000000', marginBottom: 12 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#E0E0E0', paddingBottom: 10 },
  input: { flex: 1, fontSize: 16, color: '#000000', paddingVertical: 0 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 8, marginBottom: 32 },
  checkbox: { width: 24, height: 24, borderRadius: 6, borderWidth: 2.5, borderColor: '#3B82F6', marginRight: 12, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', marginTop: 2 },
  checkboxChecked: { backgroundColor: '#3B82F6', borderColor: '#3B82F6' },
  checkboxLabel: { fontSize: 15, color: '#000000', fontWeight: '500', flex: 1, lineHeight: 20 },
  signinContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 32 },
  signinText: { fontSize: 15, color: '#666666' },
  signinLink: { fontSize: 15, color: '#3B82F6', fontWeight: '600' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 32 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  orText: { fontSize: 14, color: '#999999', marginHorizontal: 16 },
  socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 20, marginBottom: 40 },
  socialButton: { width: 70, height: 70, borderRadius: 16, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E8E8E8', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  signUpButton: { backgroundColor: '#3B82F6', paddingVertical: 18, borderRadius: 14, alignItems: 'center', shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  signUpButtonDisabled: { backgroundColor: '#93C5FD' },
  signUpButtonText: { color: '#FFFFFF', fontSize: 17, fontWeight: '600' },
});

export default SignUpScreen;
