import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { colors } from "../theme/colors";

import HomeScreen from "../screens/HomeScreen";
import GalleryScreen from "../screens/GalleryScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: colors.surface },
                headerTitleStyle: { fontWeight: "800" },
                headerShadowVisible: Platform.OS === "ios",

                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 6,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.muted,
                tabBarLabelStyle: { fontSize: 12, fontWeight: "700" },
            }}
        >
            <Tab.Screen name="Головна" component={HomeScreen} />
            <Tab.Screen name="Фотогалерея" component={GalleryScreen} />
            <Tab.Screen name="Профіль" component={ProfileScreen} />
        </Tab.Navigator>
    );
}