import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors } from "../theme/colors";

export default function Footer() {
    return (
        <View style={styles.wrap}>
            <Text style={styles.footer}>Lab_1 </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { paddingTop: 10, paddingBottom: 12 },
    footer: {
        textAlign: "center",
        fontStyle: "italic",
        color: colors.muted,
        fontSize: 12,
    },
});