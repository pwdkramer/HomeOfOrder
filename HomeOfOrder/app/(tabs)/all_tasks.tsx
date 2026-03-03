import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useTasks } from '../../context/TasksContext';

export default function AllTasksScreen() {
  const { tasks } = useTasks();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Tasks</Text>

      <FlatList
        data={[...tasks].reverse()} // newest first
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: '/add-task', params: { id: item.id } }}
            asChild
          >
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              {item.assignedTo ? <Text style={styles.meta}>Assigned: {item.assignedTo}</Text> : null}
              {item.dueDate ? <Text style={styles.meta}>Due: {item.dueDate}</Text> : null}
              {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={{ paddingTop: 12 }}
      />

      {/* Floating Add Button */}
      <Link href="/add-task" asChild>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '600'
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: {
    color: 'white',
    fontSize: 32, marginTop: -2
  },
  item: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 1
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600'
  },
  meta: {
    color: '#666',
    marginTop: 4
  },
  notes: {
    marginTop: 6,
    color: '#333'
  },
});