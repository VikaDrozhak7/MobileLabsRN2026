import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../context/ThemeContext";

const ChallengeItem = ({ item }) => {
    const { theme } = useAppTheme();

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: theme.card,
                    borderColor: item.completed ? theme.success : theme.border
                }
            ]}
        >
            <View
                style={[
                    styles.dot,
                    { backgroundColor: item.completed ? theme.success : theme.border }
                ]}
            />
            <View style={styles.textWrap}>
                <Text style={[styles.title, { color: theme.text }]}>{item.title}</Text>
                <Text style={[styles.description, { color: theme.subtext }]}>
                    {item.description}
                </Text>
            </View>
            <Text
                style={[
                    styles.status,
                    { color: item.completed ? theme.success : theme.subtext }
                ]}
            >
                {item.completed ? "Виконано" : "Не виконано"}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center"
    },
    dot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        marginRight: 12
    },
    textWrap: {
        flex: 1
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 4
    },
    description: {
        fontSize: 13
    },
    status: {
        fontSize: 12,
        fontWeight: "700",
        marginLeft: 10
    }
});

export default ChallengeItem;