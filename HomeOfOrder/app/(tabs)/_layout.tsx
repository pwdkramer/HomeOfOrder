import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
    
    return (
        <Tabs>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home'
                }}
            />
            <Tabs.Screen
                name="all_tasks"
                options={{
                    title: 'All Tasks'
                }}
            />
            <Tabs.Screen
                name="my_tasks"
                options={{
                    title: 'My Tasks'
                }}
            />
            <Tabs.Screen
                name="meal_plan"
                options={{
                    title: 'Meal Plan'
                }}
            />
        </Tabs>
    );
}