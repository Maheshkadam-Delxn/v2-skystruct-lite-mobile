import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";

const COLORS = {
  primary: "#0066FF",
  textPrimary: "#2C3E50",
  textSecondary: "#7F8C8D",
  white: "#FFFFFF",
};

const MidwestTab = () => {
  const midwestData = {
    region: "Midwest Operations",
    projects: 12,
    completed: 8,
    ongoing: 4,
    teamSize: 45
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Midwest Region Overview</Text>
      <View style={styles.card}>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{midwestData.projects}</Text>
            <Text style={styles.statLabel}>Total Projects</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{midwestData.completed}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{midwestData.ongoing}</Text>
            <Text style={styles.statLabel}>Ongoing</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{midwestData.teamSize}</Text>
            <Text style={styles.statLabel}>Team Size</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Regional Performance</Text>
      <View style={styles.card}>
        <Text style={styles.contentText}>
          The Midwest region is performing exceptionally well with {midwestData.completed} out of {midwestData.projects} projects completed on schedule.
        </Text>
        <Text style={[styles.contentText, { marginTop: 12 }]}>
          Current focus is on the 4 ongoing projects with expected completion within the next quarter.
        </Text>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 18,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    padding: 12,
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: "center",
  },
  contentText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default MidwestTab;