import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SectionHeader({ title }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0ecff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#dbeafe',
    },
    text: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e3a8a',
    },
});