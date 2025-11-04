import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import FilterPanel from 'components/FilterPanel';

const MyProjectsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const COLORS = {
    primary: '#0066FF',
    primaryDark: '#0047CC',
    background: '#F5F7FA',
    textPrimary: '#2C3E50',
    textSecondary: '#7F8C8D',
    success: '#1ABC9C',
    white: '#FFFFFF',
    border: '#E0E0E0',
    lightGray: '#F0F2F5',
  };

  const projects = [
    {
      id: '1',
      name: 'Project Name 1',
      location: '1st floor - B-128.C Block, Sector 2, Gautam Buddh',
      dueDate: '09 Jan 2026',
      status: 'In Progress',
      statusColor: COLORS.primary,
      image:
        'https://tse2.mm.bing.net/th/id/OIP.Rl1E59yqaM6ODSfBhA7ITQHaEe?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: '2',
      name: 'Project Name 1',
      location: '1st floor - B-128.C Block, Sector 2, Gautam Buddh',
      dueDate: '07 Mar 2025',
      status: 'Completed',
      statusColor: COLORS.success,
      image:
        'https://tse1.mm.bing.net/th/id/OIP.gyLo8TvSmpUOHJHAGshhDAHaLH?cb=ucfimg2ucfimg=1&w=600&h=900&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
    {
      id: '3',
      name: 'Project Name 1',
      location: '1st floor - B-128.C Block, Sector 2, Gautam Buddh',
      dueDate: '09 Jan 2026',
      status: 'In Progress',
      statusColor: COLORS.primary,
      image:
        'https://tse1.mm.bing.net/th/id/OIP.KKkqkFaSIqjy4D2ORvO7SwHaLH?cb=ucfimg2ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3',
    },
  ];

  const navigationItems = [
    { id: 'home', label: 'Home', icon: 'home-outline' },
    { id: 'projects', label: 'Projects', icon: 'folder-open-outline' },
    { id: 'payments', label: 'Payments', icon: 'card-outline' },
    { id: 'tasks', label: 'Tasks', icon: 'checkmark-done-outline' },
    { id: 'account', label: 'Account', icon: 'person-outline' },
  ];

  const handleApplyFilters = (filters) => {
    console.log('Applied filters:', filters);
    // Implement your filtering logic here
  };

  const renderProjectCard = ({ item }) => (
    <View style={styles.projectCard}>
      <View style={styles.projectHeader}>
        <Image source={{ uri: item.image }} style={styles.projectImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.projectName}>{item.name}</Text>
          <Text style={styles.projectLocation}>{item.location}</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons name="pencil-outline" size={20} color={COLORS.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.projectFooter}>
        <View style={styles.dueDateContainer}>
          <Ionicons name="calendar-outline" size={16} color={COLORS.textSecondary} />
          <Text style={styles.dueDateText}>Due date {item.dueDate}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: item.status === 'Completed' ? '100%' : '40%' }]} />
      </View>

      // In MyProjectsScreen.js, update the viewDetailsButton TouchableOpacity:
      <TouchableOpacity
        style={styles.viewDetailsButton}
        onPress={() => navigation.navigate('ProjectDetails')}
      >
        <Text style={styles.viewDetailsText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  const renderNavItem = (item) => {
    const isActive = activeTab === item.id;
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.navItem}
        onPress={() => setActiveTab(item.id)}
      >
        <Ionicons
          name={item.icon}
          size={22}
          color={isActive ? COLORS.primary : COLORS.textSecondary}
        />
        <Text
          style={[
            styles.navLabel,
            { color: isActive ? COLORS.primary : COLORS.textSecondary },
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>My Projects</Text>
          <TouchableOpacity onPress={() => setShowFilter(true)}>
            <Ionicons name="filter" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainerOuter}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color={COLORS.textSecondary} />
          <TextInput
            placeholder="Projects..."
            placeholderTextColor={COLORS.textSecondary}
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Add button */}
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: COLORS.primaryDark }]}
          onPress={() => {
            if (navigation) {
              navigation.navigate('CreateProject');
            } else {
              console.log('Navigation not available');
            }
          }}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Projects List */}
      <FlatList
        data={projects}
        renderItem={renderProjectCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navigationItems.map((item) => renderNavItem(item))}
      </View>

      {/* Filter Panel */}
      <FilterPanel
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        onApply={handleApplyFilters}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA' },
  headerWrapper: {
    backgroundColor: '#0066FF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  searchContainerOuter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -15,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#2C3E50',
    paddingVertical: 0,
  },
  addButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    elevation: 3,
  },
  listContent: { padding: 16, paddingBottom: 100 },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
  },
  projectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  projectImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12
  },
  projectName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C3E50'
  },
  projectLocation: {
    fontSize: 13,
    color: '#7F8C8D',
    marginTop: 2
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  dueDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  dueDateText: {
    fontSize: 13,
    color: '#7F8C8D'
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E6E6E6',
    borderRadius: 4,
    marginVertical: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#0066FF',
    borderRadius: 4,
  },
  viewDetailsButton: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  viewDetailsText: {
    color: '#0066FF',
    fontWeight: '600',
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 75,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  navLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 2
  },

  // Filter Panel Styles
  filterContainer: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  filterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  filterHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  placeholder: {
    width: 24,
  },
  filterContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 12,
  },
  sortOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sortOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sortOptionSelected: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  sortOptionText: {
    fontSize: 14,
    color: '#7F8C8D',
    fontWeight: '500',
  },
  sortOptionTextSelected: {
    color: '#FFFFFF',
  },
  budgetRange: {
    alignItems: 'center',
    marginBottom: 16,
  },
  budgetText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  budgetSlider: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 8,
  },
  budgetTrack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  budgetProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#0066FF',
    borderRadius: 2,
  },
  budgetThumb: {
    position: 'absolute',
    top: -6,
    left: '75%',
    width: 16,
    height: 16,
    backgroundColor: '#0066FF',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  teamOptions: {
    gap: 12,
  },
  projectTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectAllText: {
    fontSize: 14,
    color: '#0066FF',
    fontWeight: '500',
  },
  projectTypeOptions: {
    gap: 12,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  filterFooter: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7F8C8D',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#0066FF',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default MyProjectsScreen;