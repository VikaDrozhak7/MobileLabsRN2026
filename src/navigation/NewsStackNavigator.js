import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';

const Stack = createNativeStackNavigator();

export default function NewsStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#ffffff' },
                headerTintColor: '#111827',
                headerTitleStyle: { fontWeight: '700' },
                contentStyle: { backgroundColor: '#f3f4f6' },
            }}
        >
            <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ title: 'Новини' }}
            />
            <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={{ title: 'Деталі новини' }}
            />
        </Stack.Navigator>
    );
}