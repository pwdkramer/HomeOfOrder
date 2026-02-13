import { Stack } from "expo-router";
import { TasksProvider } from "../context/TasksContext";


export default function RootLayout() {
  return (
    <TasksProvider>
      <Stack />
    </TasksProvider>
  );

}
