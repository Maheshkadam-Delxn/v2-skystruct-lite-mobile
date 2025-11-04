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

const PlansTab = () => {
  const plans = [
    { phase: "Phase 1", name: "Site Preparation", status: "Completed", duration: "2 weeks" },
    { phase: "Phase 2", name: "Foundation Work", status: "Completed", duration: "4 weeks" },
    { phase: "Phase 3", name: "Structural Framework", status: "In Progress", duration: "6 weeks" },
    { phase: "Phase 4", name: "Interior Finishing", status: "Upcoming", duration: "8 weeks" },
    { phase: "Phase 5", name: "Landscaping", status: "Upcoming", duration: "2 weeks" },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Project Plan & Timeline</Text>
      <View style={styles.card}>
        {plans.map((plan, index) => (
          <View key={index} style={styles.planItem}>
            <View style={styles.planLeft}>
              <Text style={styles.planPhase}>{plan.phase}</Text>
              <Text style={styles.planName}>{plan.name}</Text>
            </View>
            <View style={styles.planRight}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: 
                  plan.status === "Completed" ? "#E8F6F3" :
                  plan.status === "In Progress" ? "#E8F1FF" : "#F0F2F5"
                }
              ]}>
                <Text style={[
                  styles.statusText,
                  { color: 
                    plan.status === "Completed" ? "#1ABC9C" :
                    plan.status === "In Progress" ? COLORS.primary : COLORS.textSecondary
                  }
                ]}>
                  {plan.status}
                </Text>
              </View>
              <Text style={styles.planDuration}>{plan.duration}</Text>
            </View>
          </View>
        ))}
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
  planItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  planLeft: {
    flex: 1,
  },
  planPhase: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  planName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textPrimary,
  },
  planRight: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  planDuration: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default PlansTab;