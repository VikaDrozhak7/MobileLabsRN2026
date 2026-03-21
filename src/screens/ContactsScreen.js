import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { contactsSections } from '../data/contacts';
import SectionHeader from '../components/SectionHeader';

export default function ContactsScreen() {
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
            </View>

            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.phone}>{item.phone}</Text>
            </View>
        </View>
    );

    return (
        <SectionList
            sections={contactsSections}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            contentContainerStyle={styles.container}
            stickySectionHeadersEnabled
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View style={styles.topBox}>
                    <Text style={styles.topTitle}>Контакти</Text>
                    <Text style={styles.topText}>
                        SectionList із групуванням за категоріями
                    </Text>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafb',
        paddingBottom: 24,
    },
    topBox: {
        padding: 16,
        backgroundColor: '#f3f4f6',
    },
    topTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 4,
    },
    topText: {
        color: '#6b7280',
    },
    item: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#dbeafe',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#1d4ed8',
        fontWeight: '700',
        fontSize: 18,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    phone: {
        fontSize: 14,
        color: '#6b7280',
    },
    separator: {
        height: 1,
        backgroundColor: '#e5e7eb',
        marginLeft: 72,
    },
});