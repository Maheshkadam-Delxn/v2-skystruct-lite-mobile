import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Import tab components
import DetailsTab from "components/Project/DetailsTab";
import TasksTab from "components/Project/TasksTab";
import TransactionsTab from "components/Project/TransactionsTab";
import AttendanceTab from "components/Project/AttendanceTab";
import StatusTab from "components/Project/StatusTab";
import MidwestTab from "components/Project/MidwestTab";
import PlansTab from "components/Project/PlansTab";
import FilesTab from "components/Project/FilesTab";
import IssuesTab from "components/Project/IssuesTab";

const COLORS = {
  primary: "#0066FF",
  background: "#F6F8FC",
  textPrimary: "#2C3E50",
  textSecondary: "#7F8C8D",
  white: "#FFFFFF",
  border: "#E0E0E0",
  lightGray: "#F1F4F8",
  lightBlue: "#E8F0FF",
};

const ProjectDetailsScreen = ({ navigation }) => {
  const [activeNav, setActiveNav] = useState("details");

  const navItems = [
    { id: "details", label: "Details" },
    { id: "tasks", label: "Tasks" },
    { id: "transactions", label: "Transactions" },
    { id: "attendance", label: "Attendance" },
    { id: "status", label: "Status" },
    { id: "midwest", label: "Midwest" },
    { id: "plans", label: "Plans" },
    { id: "files", label: "Files" },
    { id: "issues", label: "Issues" },
  ];

  const projectData = {
    projectName: "Luxury Villa Palm Bay",
    projectType: "Villa Construction",
    projectId: "SKY-00125",
    location: "Palm Jumeirah, Dubai, UAE",
    startDate: "10 Jan 2024",
    endDate: "15 Dec 2024",
    projectStatus: "In Progress",
    projectManager: "John Doe",
    consultant: "Skyline Interiors",
    mainContractor: "Elite Builders LLC",
    totalBudget: "$5,000,000",
    amountSpent: "$2,750,000",
    remainingBudget: "$2,250,000",
    boqStatus: "In Progress",
    clientName: "Mr. Ahmed Al-Farsi",
    approvalStatus: "Pending Client Final Review",
    snagList: "5 Items Resolved, 2 Pending",
  };

  // RENDER TAB CONTENT
  const renderTabContent = () => {
    switch (activeNav) {
      case "tasks":
        return <TasksTab />;
      case "transactions":
        return <TransactionsTab />;
      case "attendance":
        return <AttendanceTab />;
      case "status":
        return <StatusTab />;
      case "midwest":
        return <MidwestTab />;
      case "plans":
        return <PlansTab />;
      case "files":
        return <FilesTab />;
      case "issues":
        return <IssuesTab />;
      default:
        return <DetailsTab projectData={projectData} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Project Details</Text>

        <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* TAB BAR */}
      <View style={styles.tabWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.tabButton,
                activeNav === item.id && styles.tabButtonActive,
              ]}
              onPress={() => setActiveNav(item.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeNav === item.id && styles.tabTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* MAIN CONTENT */}
      <View style={styles.mainContent}>{renderTabContent()}</View>
    </SafeAreaView>
  );
};

// === STYLES ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "700",
  },
  backButton: {
    padding: 8,
  },
  notificationIcon: {
    padding: 8,
  },

  tabWrapper: {
    backgroundColor: COLORS.white,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tabScrollContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    marginRight: 10,
    backgroundColor: COLORS.white,
  },
  tabButtonActive: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: "600",
  },
  tabTextActive: {
    color: COLORS.white,
  },

  mainContent: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingBottom: 60,
  },
});

export default ProjectDetailsScreen;
