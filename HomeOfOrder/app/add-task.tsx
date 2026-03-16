import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../context/TasksContext';

const isWeb = Platform.OS === 'web';

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseDateInput(text: string): Date | null {
  const parts = text.split('-').map((p) => Number(p));
  if (parts.length !== 3 || parts.some((n) => Number.isNaN(n))) return null;
  const [y, m, d] = parts;
  if (y < 1900 || m < 1 || m > 12 || d < 1 || d > 31) return null;
  const candidate = new Date(y, m - 1, d);
  if (
    candidate.getFullYear() !== y ||
    candidate.getMonth() !== m - 1 ||
    candidate.getDate() !== d
  ) {
    return null;
  }
  return candidate;
}

export default function AddTaskScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addTask, updateTask, tasks } = useTasks();

  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueDateObj, setDueDateObj] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const editingId = params.id as string | undefined;
  const isEditing = !!editingId;

  useEffect(() => {
    if (!isEditing) return;

    setIsLoading(true);
    const existing = tasks.find((t) => t.id === editingId);
    if (existing) {
      setTitle(existing.title);
      setNotes(existing.notes ?? '');
      setAssignedTo(existing.assignedTo ?? '');
      setDueDate(existing.dueDate ?? '');
      setDueDateObj(existing.dueDate ? new Date(existing.dueDate) : null);
      setCompleted(existing.completed);
    }
    setIsLoading(false);
  }, [isEditing, editingId, tasks]);

  function handleDateChange(_: any, selected?: Date) {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (!selected) return;
    setDueDateObj(selected);
    setDueDate(formatDate(selected));
  }

  function onSubmit() {
    const trimmed = title.trim();
    if (!trimmed) return;

    const dateValue = dueDate.trim() ? dueDate.trim() : undefined;
    if (dateValue && !parseDateInput(dateValue)) {
      // optional: show validation message
      return;
    }

    if (isEditing && editingId) {
      updateTask(editingId, {
        title: trimmed,
        notes: notes.trim() || undefined,
        assignedTo: assignedTo.trim() || undefined,
        dueDate: dateValue,
        completed,
      });
    } else {
      addTask(trimmed, {
        notes: notes.trim(),
        assignedTo: assignedTo.trim(),
        dueDate: dateValue,
      });
    }

    router.back();
  }

  return (
    <View style={styles.container}>
      {isEditing && <Text style={styles.header}>Edit Task</Text>}

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        autoFocus
      />

      <TextInput
        placeholder="Assigned to (optional)"
        value={assignedTo}
        onChangeText={setAssignedTo}
        style={styles.input}
      />

      {isWeb ? (
        <View style={styles.webDateRow}>
          <input
            type="date"
            value={dueDate}
            onChange={(e: any) => {
              const value = e.target.value;
              setDueDate(value);
              const parsed = parseDateInput(value);
              setDueDateObj(parsed);
            }}
            style={styles.webDateInput}
          />
          <Button title="Clear" onPress={() => { setDueDate(''); setDueDateObj(null); }} />
        </View>
      ) : (
        <View style={styles.dateRow}>
          <TextInput
            placeholder="Due date (YYYY-MM-DD)"
            value={dueDate}
            onChangeText={(text) => {
              setDueDate(text);
              setDueDateObj(parseDateInput(text));
            }}
            style={[styles.input, styles.dateInput]}
          />
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateButtonText}>📅</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isWeb && showDatePicker && (
        <DateTimePicker
          value={dueDateObj || new Date()}
          mode="date"
          display={Platform.OS === 'android' ? 'calendar' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <TextInput
        placeholder="Notes (optional)"
        value={notes}
        onChangeText={setNotes}
        style={[styles.input, styles.multiline]}
        multiline
      />

      {isEditing && (
        <View style={styles.checkboxRow}>
          <Text>Completed:</Text>
          <TouchableOpacity onPress={() => setCompleted((c) => !c)} style={styles.checkbox}>
            <Text style={styles.checkText}>{completed ? '☑' : '☐'}</Text>
          </TouchableOpacity>
        </View>
      )}

      <Button title={isEditing ? 'Update Task' : 'Add Task'} onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  dateInput: { flex: 1, marginRight: 8 },
  dateButton: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 },
  dateButtonText: { color: '#333' },
  webDateRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  webDateInput: { padding: 8, borderRadius: 4, borderWidth: 1, borderColor: '#ddd', flex: 1, minWidth: 200 },
  multiline: { height: 100, textAlignVertical: 'top' },
  checkboxRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  checkbox: { marginLeft: 8 },
  checkText: { fontSize: 18 },
});