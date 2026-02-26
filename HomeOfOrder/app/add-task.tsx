import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../context/TasksContext';

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  function onSubmit() {
    const trimmed = title.trim();
    if (!trimmed) return;
    addTask(trimmed, { notes: notes.trim(), assignedTo: assignedTo.trim(), dueDate: dueDate.trim() || undefined });
    router.back();
  }

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} autoFocus />
      <TextInput placeholder="Assigned to (optional)" value={assignedTo} onChangeText={setAssignedTo} style={styles.input} />
      <TextInput placeholder="Due date (YYYY-MM-DD)" value={dueDate} onChangeText={setDueDate} style={styles.input} />
      <TextInput placeholder="Notes (optional)" value={notes} onChangeText={setNotes} style={[styles.input, styles.multiline]} multiline />
      <Button title="Add Task" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  multiline: { height: 100, textAlignVertical: 'top' },
});