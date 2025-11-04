
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const COLORS = {
  primary: "#0066FF",
  background: "#F6F8FC",
  textPrimary: "#2C3E50",
  textSecondary: "#7F8C8D",
  white: "#FFFFFF",
  border: "#E0E0E0",
  success: "#1ABC9C",
  danger: "#E74C3C",
};

const TransactionsScreen = ({ navigation }) => {
  const [timeRange, setTimeRange] = useState('month');

  const transactions = [
    {
      id: '1',
      title: 'Material Purchase',
      description: 'Construction materials',
      amount: '$15,000',
      date: '15 Mar 2024',
      type: 'expense',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Client Payment',
      description: 'Project milestone payment',
      amount: '$50,000',
      date: '12 Mar 2024',
      type: 'income',
      status: 'completed'
    },
    {
      id: '3',
      title: 'Labor Payment',
      description: 'Weekly labor wages',
      amount: '$8,500',
      date: '10 Mar 2024',
      type: 'expense',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Equipment Rental',
      description: 'Crane rental',
      amount: '$3,200',
      date: '08 Mar 2024',
      type: 'expense',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Consultant Fee',
      description: 'Architect services',
      amount: '$12,000',
      date: '05 Mar 2024',
      type: 'expense',
      status: 'completed'
    },
  ];

  const stats = {
    totalIncome: '$50,000',
    totalExpenses: '$38,700',
    balance: '$11,300',
  };

  const TransactionItem = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Ionicons 
          name={item.type === 'income' ? 'arrow-down' : 'arrow-up'} 
          size={20} 
          color={item.type === 'income' ? COLORS.success : COLORS.danger} 
        />
      </View>
      <View style={styles.transactionContent}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionDescription}>{item.description}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      <View style={styles.transactionAmount}>
        <Text style={[
          styles.amountText,
          { color: item.type === 'income' ? COLORS.success : COLORS.textPrimary }
        ]}>
          {item.amount}
        </Text>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'completed' ? '#E8F6F3' : '#FBEEE6' }
        ]}>
          <Text style={[
            styles.statusText,
            { color: item.status === 'completed' ? COLORS.success : COLORS.warning }
          ]}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      
      {/* Header
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        {/* <Text style={styles.headerTitle}>Transactions</Text> */}
        {/* <TouchableOpacity style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View> */} 

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Overview */}
        <View style={styles.statsCard}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Income</Text>
              <Text style={[styles.statValue, { color: COLORS.success }]}>{stats.totalIncome}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Expenses</Text>
              <Text style={[styles.statValue, { color: COLORS.danger }]}>{stats.totalExpenses}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Balance</Text>
              <Text style={styles.statValue}>{stats.balance}</Text>
            </View>
          </View>
        </View>

        {/* Time Range Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          <View style={styles.timeFilters}>
            {['week', 'month', 'year'].map((range) => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.timeFilter,
                  timeRange === range && styles.timeFilterActive
                ]}
                onPress={() => setTimeRange(range)}
              >
                <Text style={[
                  styles.timeFilterText,
                  timeRange === range && styles.timeFilterTextActive
                ]}>
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsList}>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} item={transaction} />
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Add Transaction Button */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FC',
  },
  header: {
    backgroundColor: '#0066FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: { padding: 6 },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '600' },
  notificationIcon: { padding: 6 },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C3E50',
    marginBottom: 12,
  },
  timeFilters: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeFilter: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 16,
    alignItems: 'center',
  },
  timeFilterActive: {
    backgroundColor: '#0066FF',
  },
  timeFilterText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#7F8C8D',
  },
  timeFilterTextActive: {
    color: '#FFFFFF',
  },
  transactionsList: {
    marginBottom: 20,
  },
  transactionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionContent: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 2,
  },
  transactionDescription: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSpacing: {
    height: 80,
  },
});

export default TransactionsScreen;