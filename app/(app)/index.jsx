import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { Link } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { products } from '../../data/products';

export default function CatalogScreen() {
    const { logout, user } = useAuth();

    const renderItem = ({ item }) => (
        <Link href={`/details/${item.id}`} asChild>
            <TouchableOpacity style={styles.card}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.price}>{item.price} грн</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.heading}>Каталог товарів</Text>
                    <Text style={styles.subheading}>
                        {user?.name ? `Вітаємо, ${user.name}!` : `Вітаємо, ${user?.email}!`}
                    </Text>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Text style={styles.logoutText}>Вийти</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fb',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: '700',
    },
    subheading: {
        color: '#6b7280',
        marginTop: 4,
    },
    logoutButton: {
        backgroundColor: '#ef4444',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 10,
    },
    logoutText: {
        color: '#fff',
        fontWeight: '700',
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 14,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 180,
    },
    info: {
        padding: 14,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 6,
    },
    price: {
        fontSize: 16,
        color: '#2563eb',
        fontWeight: '700',
    },
});