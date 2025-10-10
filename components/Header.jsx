import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ 
  title, 
  showBackButton, 
  rightIcon,
  onRightIconPress,
  backgroundColor = '#0066FF'
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={backgroundColor} />
      <View 
        className="pt-12 pb-6 px-4 rounded-b-[32px]"
        style={{ backgroundColor }}
      >
        <SafeAreaView edges={['top']}>
          <View className="flex-row items-center justify-between">
            {/* Left Side - Back Button */}
            <View className="w-10">
              {showBackButton && (
                <TouchableOpacity
                  onPress={handleBackPress}
                  className="w-10 h-10 items-center justify-center"
                  activeOpacity={0.7}
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>

            {/* Center - Title */}
            {title && (
              <Text
                className="text-white text-xl flex-1 text-center"
                style={{ fontFamily: 'Urbanist-Bold' }}
              >
                {title}
              </Text>
            )}

            {/* Right Side - Icon */}
            <View className="w-10">
              {rightIcon && (
                <TouchableOpacity
                  onPress={onRightIconPress}
                  className="w-10 h-10 items-center justify-center"
                  activeOpacity={0.7}
                >
                  <Ionicons name={rightIcon} size={24} color="white" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

export default Header;