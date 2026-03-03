import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../context/TasksContext';

export default function AddTaskScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addTask, updateTask, tasks } = useTasks();

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const editingId = params.id as string | undefined;
  const isEditing = !!editingId;

  useEffect(() => {
    if (isEditing) {
      setIsLoading(true);
      const existing = tasks.find((t) => t.id === editingId);
      if (existing) {
        setTitle(existing.title);
        setNotes(existing.notes || '');
        setAssignedTo(existing.assignedTo || '');
        setDueDate(existing.dueDate || '');
        setCompleted(existing.completed);
      }
      setIsLoading(false);
    }
  }, [isEditing, editingId, tasks]);

  function onSubmit() {
    const trimmed = title.trim();
    if (!trimmed) return;
    if (isEditing && editingId) {
      updateTask(editingId, {
        title: trimmed,
        notes: notes.trim() || undefined,
        assignedTo: assignedTo.trim() || undefined,
        dueDate: dueDate.trim() || undefined,
        completed,
      });
    } else {
      addTask(trimmed, {
        notes: notes.trim(),
        assignedTo: assignedTo.trim(),
        dueDate: dueDate.trim() || undefined,
      });
    }

    router.back();
  }

  return (
    <View style={styles.container}>
      {isEditing ? <Text style={styles.header}>Edit Task</Text> : null}
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} autoFocus />
      <TextInput placeholder="Assigned to (optional)" value={assignedTo} onChangeText={setAssignedTo} style={styles.input} />
      <TextInput placeholder="Due date (YYYY-MM-DD)" value={dueDate} onChangeText={setDueDate} style={styles.input} />
      <TextInput placeholder="Notes (optional)" value={notes} onChangeText={setNotes} style={[styles.input, styles.multiline]} multiline />
      {isEditing ? (
        <View style={styles.checkboxRow}>
          <Text>Completed:</Text>
          <TouchableOpacity onPress={() => setCompleted((c) => !c)} style={styles.checkbox}>
            <Text style={styles.checkText}>{completed ? '☑' : '☐'}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <Button title={isEditing ? 'Update Task' : 'Add Task'} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  multiline: { height: 100, textAlignVertical: 'top' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  checkbox: { marginLeft: 8 },
  checkText: { fontSize: 18 },
});