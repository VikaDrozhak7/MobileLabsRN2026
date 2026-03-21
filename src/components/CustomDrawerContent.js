import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

export default function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.container}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>V</Text>
                </View>

                <Text style={styles.name}>Вікторія</Text>
                <Text style={styles.group}>Група: ВТ-22-2</Text>

                <View style={styles.infoBox}>
                    <Text style={styles.infoLabel}>Лабораторна робота №2</Text>
                    <Text style={styles.infoValue}>React Native / Expo</Text>
                </View>
            </View>

            <View style={styles.menuContainer}>
                <DrawerItemList {...props} />
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>Мобільні застосунки</Text>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        paddingTop: 28,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: '#eff6ff',
        borderBottomWidth: 1,
        borderBottomColor: '#dbeafe',
    },
    avatar: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: '#2563eb',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 14,
    },
    avatarText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: '700',
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#111827',
    },
    group: {
        marginTop: 4,
        fontSize: 14,
        color: '#4b5563',
        marginBottom: 14,
    },
    infoBox: {
        backgroundColor: '#ffffff',
        borderRadius: 14,
        padding: 12,
        borderWidth: 1,
        borderColor: '#dbeafe',
    },
    infoLabel: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1e3a8a',
    },
    menuContainer: {
        flex: 1,
        paddingTop: 10,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
    },
    footerText: {
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 13,
    },
});