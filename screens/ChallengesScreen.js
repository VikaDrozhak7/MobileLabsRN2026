import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../context/ThemeContext";
import ChallengeItem from "../components/ChallengeItem";

const ChallengesScreen = ({ gameState }) => {
    const { theme } = useAppTheme();
    const { challenges } = gameState;

    const completedCount = challenges.filter((item) => item.completed).length;

    return (
        <ScrollView
            contentContainerStyle={[
                styles.container,
                { backgroundColor: theme.background }
            ]}
        >
            <Text style={[styles.title, { color: theme.text }]}>Завдання</Text>

            <View
                style={[
                    styles.summaryCard,
                    {
                        backgroundColor: theme.cardSecondary,
                        borderColor: theme.border
                    }
                ]}
            >
                <Text style={[styles.summaryText, { color: theme.text }]}>
                    Виконано: {completedCount} / {challenges.length}
                </Text>
            </View>

            <View style={styles.listWrap}>
                {challenges.map((item) => (
                    <ChallengeItem key={item.id} item={item} />
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        paddingHorizontal: 16
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        marginBottom: 16
    },
    summaryCard: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 14,
        marginBottom: 18
    },
    summaryText: {
        fontSize: 16,
        fontWeight: "700"
    },
    listWrap: {
        marginTop: 6
    }
});

export default ChallengesScreen;