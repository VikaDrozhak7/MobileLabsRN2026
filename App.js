import "react-native-gesture-handler";
import React, { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Text } from "react-native";

import { ThemeProvider, useAppTheme } from "./context/ThemeContext";
import { initialChallenges } from "./data/challenges";
import HomeScreen from "./screens/HomeScreen";
import ChallengesScreen from "./screens/ChallengesScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const MainApp = () => {
    const { theme, isDark } = useAppTheme();

    const [score, setScore] = useState(0);
    const [stats, setStats] = useState({
        taps: 0,
        doubleTaps: 0,
        longPressDone: false,
        dragDone: false,
        swipeLeftDone: false,
        swipeRightDone: false,
        pinchDone: false,
        swipeCount: 0
    });

    const [challenges, setChallenges] = useState(initialChallenges);

    const markChallenge = (id) => {
        setChallenges((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, completed: true } : item
            )
        );
    };

    const updateScoreChallenge = (nextScore) => {
        if (nextScore >= 100) {
            markChallenge("score100");
        }
    };

    const handleGestureAction = (type) => {
        if (type === "tap") {
            setScore((prev) => {
                const next = prev + 1;
                updateScoreChallenge(next);
                return next;
            });

            setStats((prev) => {
                const nextTaps = prev.taps + 1;
                if (nextTaps >= 10) {
                    markChallenge("tap10");
                }
                return { ...prev, taps: nextTaps };
            });
        }

        if (type === "doubleTap") {
            setScore((prev) => {
                const next = prev + 2;
                updateScoreChallenge(next);
                return next;
            });

            setStats((prev) => {
                const nextDoubleTaps = prev.doubleTaps + 1;
                if (nextDoubleTaps >= 5) {
                    markChallenge("double5");
                }
                return { ...prev, doubleTaps: nextDoubleTaps };
            });
        }

        if (type === "longPress") {
            setScore((prev) => {
                const next = prev + 5;
                updateScoreChallenge(next);
                return next;
            });

            setStats((prev) => ({ ...prev, longPressDone: true }));
            markChallenge("hold3");
        }

        if (type === "drag") {
            setStats((prev) => ({ ...prev, dragDone: true }));
            markChallenge("drag1");
        }

        if (type === "pinch") {
            setScore((prev) => {
                const next = prev + 3;
                updateScoreChallenge(next);
                return next;
            });

            setStats((prev) => ({ ...prev, pinchDone: true }));
            markChallenge("pinch1");
        }

        if (type === "swipeLeft") {
            const bonus = Math.floor(Math.random() * 5) + 1;

            setScore((prev) => {
                const next = prev + bonus;
                updateScoreChallenge(next);
                return next;
            });

            setStats((prev) => {
                const nextSwipeCount = prev.swipeCount + 1;
                if (nextSwipeCount >= 3) {
                    markChallenge("custom");
                }
                return {
                    ...prev,
                    swipeLeftDone: true,
                    swipeCount: nextSwipeCount
                };
            });

            markChallenge("swipeLeft");
        }

        if (type === "swipeRight") {
            const bonus = Math.floor(Math.random() * 10) + 1;

            setScore((prev) => {
                const next = prev + bonus;
                updateScoreChallenge(next);
                return next;
            });

            setStats((prev) => {
                const nextSwipeCount = prev.swipeCount + 1;
                if (nextSwipeCount >= 3) {
                    markChallenge("custom");
                }
                return {
                    ...prev,
                    swipeRightDone: true,
                    swipeCount: nextSwipeCount
                };
            });

            markChallenge("swipeRight");
        }
    };

    const navigationTheme = useMemo(() => {
        const base = isDark ? DarkTheme : DefaultTheme;

        return {
            ...base,
            colors: {
                ...base.colors,
                background: theme.background,
                card: theme.card,
                text: theme.text,
                border: theme.border,
                primary: theme.primary
            }
        };
    }, [isDark, theme]);

    const gameState = {
        score,
        stats,
        challenges,
        handleGestureAction
    };

    return (
        <NavigationContainer theme={navigationTheme}>
            <StatusBar style={isDark ? "light" : "dark"} />

            <Tab.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.card
                    },
                    headerTitleStyle: {
                        fontWeight: "800"
                    },
                    headerTintColor: theme.text,
                    tabBarStyle: {
                        backgroundColor: theme.card,
                        borderTopColor: theme.border
                    },
                    tabBarActiveTintColor: theme.primary,
                    tabBarInactiveTintColor: theme.subtext
                }}
            >
                <Tab.Screen
                    name="Головна"
                    options={{
                        tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🏠</Text>
                    }}
                >
                    {() => <HomeScreen gameState={gameState} />}
                </Tab.Screen>

                <Tab.Screen
                    name="Завдання"
                    options={{
                        tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>✅</Text>
                    }}
                >
                    {() => <ChallengesScreen gameState={gameState} />}
                </Tab.Screen>

                <Tab.Screen
                    name="Налаштування"
                    component={SettingsScreen}
                    options={{
                        tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⚙️</Text>
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider>
                <MainApp />
            </ThemeProvider>
        </GestureHandlerRootView>
    );
}