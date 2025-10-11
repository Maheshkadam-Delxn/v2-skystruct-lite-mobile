// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Header from '../components/Header';
// import CustomInput from '../components/Inputfield';

// const SignUpScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [agreeToTerms, setAgreeToTerms] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleSignUp = () => {
//     console.log('Sign up pressed');
//   };

//   return (
//     <View className="flex-1 bg-white">
//       {/* StatusBar with full background color - placed at the very top */}
//       <StatusBar 
//         barStyle="dark-content" 
//         backgroundColor="#0066FF" // This will fill the entire status bar area
//         translucent={false} // Ensure it's not translucent
//       />
      
//       {/* SafeAreaView for the rest of the content */}
//       <SafeAreaView className="flex-1 bg-white">
//         <Header />
//         <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
//           <Text className="text-2xl font-[Urbanist-Bold] text-black mt-6 mb-2">
//             Hello there 👋
//           </Text>
//           <Text className="text-sm font-[Urbanist-Regular] text-gray-500 mb-8 leading-5">
//             Please enter your email & password to create an account
//           </Text>

//           <View className="mb-6">
//             <CustomInput
//               label="Email"
//               placeholder="Email"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//               autoCapitalize="none"
//               icon={<Ionicons name="mail-outline" size={20} color="#BDBDBD" />}
//             />

//             <CustomInput
//               label="Password"
//               placeholder="Password"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry={!showPassword}
//               icon={
//                 <Ionicons
//                   name={showPassword ? 'eye-outline' : 'eye-off-outline'}
//                   size={20}
//                   color="#2563EB"
//                 />
//               }
//               onIconPress={() => setShowPassword(!showPassword)}
//             />

//             <TouchableOpacity
//               className="flex-row items-center mb-4"
//               onPress={() => setAgreeToTerms(!agreeToTerms)}>
//               <View
//                 className={`w-5 h-5 rounded border-[1.5px] border-blue-600 mr-2 justify-center items-center ${
//                   agreeToTerms ? 'bg-blue-600' : ''
//                 }`}>
//                 {agreeToTerms && (
//                   <Ionicons name="checkmark" size={14} color="#FFFFFF" />
//                 )}
//               </View>
//               <Text className="text-[13px] font-[Urbanist-Regular] text-black flex-1">
//                 I agree to Skytrust{' '}
//                 <Text className="text-blue-600 font-[Urbanist-SemiBold]">Terms</Text>
//                 {', '}
//                 <Text className="text-blue-600 font-[Urbanist-SemiBold]">
//                   & Privacy Policy
//                 </Text>
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity className="items-center mb-6">
//               <Text className="text-sm font-[Urbanist-Regular] text-gray-500">
//                 Already have an account?{' '}
//                 <Text className="text-blue-600 font-[Urbanist-SemiBold]">Sign in</Text>
//               </Text>
//             </TouchableOpacity>

//             <View className="flex-row items-center mb-6">
//               <View className="flex-1 h-[1px] bg-gray-200" />
//               <Text className="text-[13px] font-[Urbanist-Regular] text-gray-400 mx-4">
//                 or continue with
//               </Text>
//               <View className="flex-1 h-[1px] bg-gray-200" />
//             </View>

//             <View className="flex-row justify-center gap-4 mb-8">
//               <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-50 justify-center items-center border border-gray-200">
//                 <Ionicons name="logo-google" size={24} color="#DB4437" />
//               </TouchableOpacity>
//               <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-50 justify-center items-center border border-gray-200">
//                 <Ionicons name="logo-apple" size={24} color="#000000" />
//               </TouchableOpacity>
//               <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-50 justify-center items-center border border-gray-200">
//                 <Ionicons name="logo-facebook" size={24} color="#1877F2" />
//               </TouchableOpacity>
//               <TouchableOpacity className="w-12 h-12 rounded-full bg-gray-50 justify-center items-center border border-gray-200">
//                 <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
//               </TouchableOpacity>
//             </View>

//             <TouchableOpacity
//               className="bg-blue-600 rounded-lg h-[50px] justify-center items-center"
//               onPress={handleSignUp}>
//               <Text className="text-base font-[Urbanist-Bold] text-white">
//                 Sign up
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </View>
//   );
// };

// export default SignUpScreen;
import { View, Text, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'

const SignUpScreen = () => {
  return (
    <View className="flex-1 bg-white">
      {/* StatusBar at the very root level */}
      <StatusBar barStyle="dark-content" backgroundColor="#0066FF" />
      
      {/* SafeAreaView for content */}
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 justify-center items-center">
          <Text>SignUpScreen</Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default SignUpScreen