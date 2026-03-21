import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../context/ThemeContext";
import ScoreCard from "../components/ScoreCard";
import ClickerObject from "../components/ClickerObject";

const rules = [
    "Tap = +1 очко",
    "Double tap = +2 очки",
    "Long press 3s = +5 очок",
    "Swipe left/right = випадкові бонуси",
    "Drag = виконує завдання перетягування",
    "Pinch = виконує завдання зміни розміру"
];

const HomeScreen = ({ gameState }) => {
    const { theme } = useAppTheme();
    const { score, handleGestureAction } = gameState;

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: theme.background }
            ]}
        >
            <Text style={[styles.title, { color: theme.text }]}>Gesture Clicker</Text>

            <ScoreCard score={score} />

            <View style={styles.objectWrapper}>
                <ClickerObject onAction={handleGestureAction} />
            </View>

            <View
                style={[
                    styles.rulesCard,
                    {
                        backgroundColor: theme.card,
                        borderColor: theme.border
                    }
                ]}
            >
                <Text style={[styles.rulesTitle, { color: theme.text }]}>Правила</Text>
                {rules.map((rule, index) => (
                    <Text key={index} style={[styles.ruleText, { color: theme.subtext }]}>
                        • {rule}
                    </Text>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
        minHeight: "100%"
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 20
    },
    objectWrapper: {
        marginTop: 40,
        marginBottom: 40,
        minHeight: 220,
        alignItems: "center",
        justifyContent: "center"
    },
    rulesCard: {
        width: "100%",
        borderRadius: 18,
        padding: 18,
        borderWidth: 1
    },
    rulesTitle: {
        fontSize: 18,
        fontWeight: "800",
        marginBottom: 12
    },
    ruleText: {
        fontSize: 15,
        marginBottom: 8,
        lineHeight: 22
    }
});

export default HomeScreen;