import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Footer from "../components/Footer";
import { colors } from "../theme/colors";
import { ui } from "../theme/ui";

export default function GalleryScreen() {
    const tiles = useMemo(() => Array.from({ length: 8 }, (_, i) => i + 1), []);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Фотогалерея</Text>

            <ScrollView contentContainerStyle={styles.wrap} showsVerticalScrollIndicator={false}>
                {tiles.map((n) => (
                    <View key={n} style={styles.tile}>
                        <Text style={styles.tileText}>{n}</Text>
                    </View>
                ))}

                <Footer />
            </ScrollView>
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
    wrap: {
        paddingBottom: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: 12,
    },
    tile: {
        width: "48%",
        height: 150,
        borderRadius: ui.radius.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        justifyContent: "center",
        alignItems: "center",
        ...ui.shadow,
    },
    tileText: {
        fontSize: 22,
        fontWeight: "900",
        color: colors.primary,
    },
});