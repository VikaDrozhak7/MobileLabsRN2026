import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { useAppTheme } from "../context/ThemeContext";

const SettingsScreen = () => {
    const { theme, isDark, toggleTheme } = useAppTheme();

    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <Text style={[styles.title, { color: theme.text }]}>Налаштування</Text>

            <View
                style={[
                    styles.card,
                    {
                        backgroundColor: theme.card,
                        borderColor: theme.border
                    }
                ]}
            >
                <View>
                    <Text style={[styles.label, { color: theme.text }]}>Темна тема</Text>
                    <Text style={[styles.description, { color: theme.subtext }]}>
                        Перемикає світлу та темну тему застосунку
                    </Text>
                </View>

                <Switch value={isDark} onValueChange={toggleTheme} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 20
    },
    card: {
        borderWidth: 1,
        borderRadius: 18,
        padding: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    label: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 4
    },
    description: {
        fontSize: 14,
        maxWidth: 240
    }
});

export default SettingsScreen;