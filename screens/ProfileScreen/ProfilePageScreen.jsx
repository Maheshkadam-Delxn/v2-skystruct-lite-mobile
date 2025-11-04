import React from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PersonalInfoScreen = ({ navigation }) => {
  const personalInfo = [
    { label: 'Full Name', value: 'Arun Mishra' },
    { label: 'National ID Number', value: '3637 4738 4899' },
    { label: 'Email', value: 'arun.mishra@gmail.com' },
    { label: 'Phone Number', value: '+1 111 467 378 399' },
    { label: 'Date of Birth', value: '12/27/1995' },
    { label: 'Gender', value: 'Male' },
  ];

  const handleBack = () => {
    navigation.goBack();
  };

  const handleEdit = () => {
    // Navigate to edit screen
    console.log('Edit personal info');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Personal Info</Text>
          <TouchableOpacity onPress={handleEdit}>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {personalInfo.map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
              {index < personalInfo.length - 1 && <View style={styles.separator} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  editButton: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3B82F6',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  infoItem: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 8,
    letterSpacing: 0.25,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    letterSpacing: 0.25,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginTop: 24,
  },
});

export default PersonalInfoScreen;