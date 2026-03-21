import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function NewsItem({ item, onPress }) {
    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => onPress(item)}
        >
            <View style={styles.topRow}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.category}</Text>
                </View>
                <Text style={styles.date}>{item.date}</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.description} numberOfLines={3}>
                {item.description}
            </Text>

            <View style={styles.bottomRow}>
                <Text style={styles.link}>Читати далі</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    badge: {
        backgroundColor: '#dbeafe',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 999,
    },
    badgeText: {
        color: '#1d4ed8',
        fontWeight: '700',
        fontSize: 12,
    },
    date: {
        fontSize: 12,
        color: '#6b7280',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        color: '#4b5563',
    },
    bottomRow: {
        marginTop: 14,
        alignItems: 'flex-start',
    },
    link: {
        color: '#2563eb',
        fontWeight: '700',
        fontSize: 14,
    },
});