import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function DetailsScreen({ route, navigation }) {
    const { newsItem } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: newsItem.title,
        });
    }, [navigation, newsItem.title]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{newsItem.category}</Text>
            </View>

            <Text style={styles.date}>{newsItem.date}</Text>
            <Text style={styles.title}>{newsItem.title}</Text>
            <Text style={styles.description}>{newsItem.description}</Text>

            <View style={styles.noteBox}>
                <Text style={styles.noteTitle}>Додаткова інформація</Text>
                <Text style={styles.noteText}>
                    На цьому екрані продемонстровано передачу параметрів через navigation.navigate
                    та динамічну зміну заголовка Stack Screen.
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f3f4f6',
        flexGrow: 1,
    },
    badge: {
        alignSelf: 'flex-start',
        backgroundColor: '#dbeafe',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
        marginBottom: 10,
    },
    badgeText: {
        color: '#1d4ed8',
        fontWeight: '700',
        fontSize: 12,
    },
    date: {
        color: '#6b7280',
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#374151',
    },
    noteBox: {
        marginTop: 20,
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    noteTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    noteText: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4b5563',
    },
});