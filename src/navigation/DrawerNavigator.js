import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import NewsStackNavigator from './NewsStackNavigator';
import ContactsScreen from '../screens/ContactsScreen';
import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: { backgroundColor: '#ffffff' },
                headerTintColor: '#111827',
                headerTitleStyle: { fontWeight: '700' },
                drawerActiveTintColor: '#2563eb',
                drawerInactiveTintColor: '#374151',
                drawerStyle: { width: 280 },
            }}
        >
            <Drawer.Screen
                name="News"
                component={NewsStackNavigator}
                options={{ drawerLabel: 'Новини', title: 'Новини' }}
            />
            <Drawer.Screen
                name="Contacts"
                component={ContactsScreen}
                options={{ drawerLabel: 'Контакти', title: 'Контакти' }}
            />
        </Drawer.Navigator>
    );
}