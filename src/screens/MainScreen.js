import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import NewsItem from '../components/NewsItem';
import { generateNews } from '../data/news';

export default function MainScreen({ navigation }) {
    const [news, setNews] = useState(generateNews(10, 1));
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const openDetails = (item) => {
        navigation.navigate('Details', { newsItem: item });
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setNews(generateNews(10, 1));
            setRefreshing(false);
        }, 1000);
    }, []);

    const onLoadMore = () => {
        if (loadingMore) return;

        setLoadingMore(true);

        setTimeout(() => {
            const nextNews = generateNews(8, news.length + 1);
            setNews((prev) => [...prev, ...nextNews]);
            setLoadingMore(false);
        }, 1000);
    };

    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Актуальні новини</Text>
            <Text style={styles.headerSubtitle}>
                FlatList, оновлення списку, підвантаження та перехід на екран деталей
            </Text>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footer}>
            {loadingMore ? (
                <ActivityIndicator size="small" color="#2563eb" />
            ) : (
                <Text style={styles.footerText}>Прокрути вниз, щоб завантажити ще</Text>
            )}
        </View>
    );

    const renderEmpty = () => (
        <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>Новин поки немає</Text>
            <Text style={styles.emptyText}>Спробуй оновити список.</Text>
        </View>
    );

    return (
        <FlatList
            data={news}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <NewsItem item={item} onPress={openDetails} />}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.45}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={7}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
        />
    );
}

const styles = StyleSheet.create({
    listContent: {
        padding: 16,
        paddingBottom: 24,
        backgroundColor: '#f3f4f6',
        flexGrow: 1,
    },
    header: {
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 6,
    },
    headerSubtitle: {
        fontSize: 14,
        lineHeight: 20,
        color: '#6b7280',
    },
    footer: {
        paddingVertical: 18,
        alignItems: 'center',
    },
    footerText: {
        color: '#6b7280',
    },
    separator: {
        height: 10,
    },
    emptyBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
        marginBottom: 6,
    },
    emptyText: {
        color: '#6b7280',
    },
});