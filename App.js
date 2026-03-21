import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import DrawerNavigator from './src/navigation/DrawerNavigator';

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#f3f4f6',
        card: '#ffffff',
        text: '#111827',
        border: '#e5e7eb',
        primary: '#2563eb',
    },
};

export default function App() {
    return (
        <NavigationContainer theme={AppTheme}>
            <DrawerNavigator />
        </NavigationContainer>
    );
}