import { Platform } from "react-native";
import { colors } from "./colors";

export const ui = {
    radius: {
        sm: 10,
        md: 14,
        lg: 18,
    },
    shadow: Platform.select({
        ios: {
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
        },
        android: { elevation: 3 },
        default: {},
    }),
    text: {
        h1: { fontSize: 28, fontWeight: "800", color: colors.text },
        h2: { fontSize: 18, fontWeight: "800", color: colors.text },
        body: { fontSize: 14, color: colors.text },
        muted: { fontSize: 12, color: colors.muted },
    },
};