import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../context/ThemeContext";

const ScoreCard = ({ score }) => {
    const { theme } = useAppTheme();

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: theme.card,
                    shadowColor: theme.shadow,
                    borderColor: theme.border
                }
            ]}
        >
            <Text style={[styles.label, { color: theme.subtext }]}>SCORE</Text>
            <Text style={[styles.score, { color: theme.primary }]}>{score}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: 180,
        paddingVertical: 20,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        letterSpacing: 1
    },
    score: {
        marginTop: 8,
        fontSize: 36,
        fontWeight: "800"
    }
});

export default ScoreCard;