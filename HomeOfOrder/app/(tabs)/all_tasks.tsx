import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useTasks } from '../../context/TasksContext';

export default function AllTasksScreen() {
  const router = useRouter();
  const { tasks, toggleTask, deleteTask } = useTasks();

  const pending = tasks.filter((t) => !t.completed);
  const completed = tasks.filter((t) => t.completed);

  function renderItem(item: typeof tasks[0]) {
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => toggleTask(item.id)}
        >
          <Text style={styles.checkText}>{item.completed ? '☑' : '☐'}</Text>
        </TouchableOpacity>
        <View style={styles.content}>
          <Text
            style={[
              styles.itemTitle,
              item.completed && styles.completedText,
            ]}
          >
            {item.title}
          </Text>
          {item.assignedTo ? <Text style={styles.meta}>Assigned: {item.assignedTo}</Text> : null}
          {item.dueDate ? <Text style={styles.meta}>Due: {item.dueDate}</Text> : null}
          {item.notes ? <Text style={styles.notes}>{item.notes}</Text> : null}
        </View>
        <View style={styles.actionGroup}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push({ pathname: '/add-task', params: { id: item.id } })}
          >
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(item.id)}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Tasks</Text>

      <Text style={styles.sectionTitle}>Pending</Text>
      <FlatList
        data={[...pending].reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={{ paddingTop: 4 }}
      />

      <Text style={styles.sectionTitle}>Completed</Text>
      <FlatList
        data={[...completed].reverse()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => renderItem(item)}
        contentContainerStyle={{ paddingTop: 4, paddingBottom: 40 }}
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
  sectionTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  fabText: {
    color: 'white',
    fontSize: 32, marginTop: -2
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
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
  content: {
    flex: 1,
  },
  checkbox: {
    marginRight: 8,
  },
  checkText: {
    fontSize: 18,
  },
  editButton: {
    padding: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  editText: {
    color: 'white',
    fontSize: 14,
  },
  actionGroup: {
    flexDirection: 'column',
    marginLeft: 8,
  },
  deleteButton: {
    marginTop: 4,
    padding: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#FF3B30',
    borderRadius: 4,
  },
  deleteText: {
    color: 'white',
    fontSize: 14,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
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