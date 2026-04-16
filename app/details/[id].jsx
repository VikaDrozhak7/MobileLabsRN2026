import React from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import {
    SafeAreaView,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { products } from '../../data/products';

export default function ProductDetailsScreen() {
    const { id } = useLocalSearchParams();
    const product = products.find((item) => item.id === id);

    if (!product) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.notFound}>Товар не знайдено</Text>

                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Text style={styles.backButtonText}>Назад</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity style={styles.topBackButton} onPress={() => router.back()}>
                    <Text style={styles.topBackButtonText}>← Назад</Text>
                </TouchableOpacity>

                <Image source={{ uri: product.image }} style={styles.image} />

                <View style={styles.card}>
                    <Text style={styles.title}>{product.title}</Text>

                    <View style={styles.priceBox}>
                        <Text style={styles.priceLabel}>Ціна</Text>
                        <Text style={styles.price}>{product.price} грн</Text>
                    </View>

                    <Text style={styles.sectionTitle}>Опис товару</Text>
                    <Text style={styles.description}>{product.description}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f6fb',
    },
    topBackButton: {
        marginTop: 10,
        marginHorizontal: 16,
        marginBottom: 12,
        alignSelf: 'flex-start',
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    topBackButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2563eb',
    },
    image: {
        width: '92%',
        height: 260,
        alignSelf: 'center',
        borderRadius: 20,
        marginBottom: 18,
    },
    card: {
        backgroundColor: '#ffffff',
        marginHorizontal: 16,
        marginBottom: 20,
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 16,
    },
    priceBox: {
        backgroundColor: '#eff6ff',
        borderRadius: 14,
        padding: 14,
        marginBottom: 20,
    },
    priceLabel: {
        fontSize: 14,
        color: '#6b7280',
        marginBottom: 4,
    },
    price: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2563eb',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        lineHeight: 25,
        color: '#374151',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f6fb',
        padding: 20,
    },
    notFound: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 20,
        color: '#111827',
    },
    backButton: {
        backgroundColor: '#2563eb',
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 12,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});