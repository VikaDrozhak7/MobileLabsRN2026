import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Footer from "../components/Footer";
import { NEWS } from "../data/news";
import { colors } from "../theme/colors";
import { ui } from "../theme/ui";

export default function HomeScreen() {
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Новини</Text>

            <FlatList
                data={NEWS}
                keyExtractor={(it) => it.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={{ uri: "https://pdp.nacs.gov.ua/providers/derzhavnyi-universytet-zhytomyrska-politekhnika" }}
                            style={styles.img}
                        />
                        <View style={styles.cardBody}>
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.cardDate}>{item.date}</Text>
                            <Text numberOfLines={2} style={styles.cardText}>
                                {item.text}
                            </Text>
                        </View>
                    </View>
                )}
            />

            <Footer />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingHorizontal: 14,
        paddingTop: 14,
        backgroundColor: colors.bg,
    },
    title: {
        ...ui.text.h1,
        textAlign: "center",
        marginBottom: 12,
    },
    list: {
        paddingBottom: 10,
    },
    card: {
        flexDirection: "row",
        gap: 12,
        padding: 12,
        borderRadius: ui.radius.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 12,
        ...ui.shadow,
    },
    img: {
        width: 74,
        height: 74,
        borderRadius: ui.radius.md,
        backgroundColor: "#DDE3F0",
    },
    cardBody: { flex: 1 },
    cardTitle: { ...ui.text.h2 },
    cardDate: { ...ui.text.muted, marginTop: 2 },
    cardText: { ...ui.text.body, marginTop: 6, color: colors.muted },
});