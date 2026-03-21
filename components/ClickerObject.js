import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import {
    Directions,
    Gesture,
    GestureDetector,
} from "react-native-gesture-handler";
import { useAppTheme } from "../context/ThemeContext";

const { width, height } = Dimensions.get("window");

const ClickerObject = ({ onAction }) => {
    const { theme } = useAppTheme();

    const translateX = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const lastScale = useRef(1);

    const singleTap = Gesture.Tap()
        .numberOfTaps(1)
        .maxDuration(250)
        .onEnd((_e, success) => {
            if (success) onAction("tap");
        });

    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .maxDuration(250)
        .onEnd((_e, success) => {
            if (success) onAction("doubleTap");
        });

    const longPress = Gesture.LongPress()
        .minDuration(3000)
        .onEnd((_e, success) => {
            if (success) onAction("longPress");
        });

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            const maxX = width / 2 - 90;
            const maxY = height / 4;

            const x = Math.max(-maxX, Math.min(maxX, e.translationX));
            const y = Math.max(-maxY, Math.min(maxY, e.translationY));

            translateX.setValue(x);
            translateY.setValue(y);
        })
        .onEnd(() => {
            onAction("drag");
        });

    const pinch = Gesture.Pinch()
        .onUpdate((e) => {
            let next = lastScale.current * e.scale;
            next = Math.max(0.7, Math.min(1.8, next));
            scale.setValue(next);
        })
        .onEnd((e) => {
            let next = lastScale.current * e.scale;
            next = Math.max(0.7, Math.min(1.8, next));
            lastScale.current = next;
            scale.setValue(next);
            onAction("pinch");
        });

    const flingLeft = Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => {
            onAction("swipeLeft");
        });

    const flingRight = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart(() => {
            onAction("swipeRight");
        });

    const tapGestures = Gesture.Exclusive(doubleTap, singleTap);

    const combined = Gesture.Simultaneous(
        tapGestures,
        longPress,
        panGesture,
        pinch,
        flingLeft,
        flingRight
    );

    return (
        <GestureDetector gesture={combined}>
            <Animated.View
                style={[
                    styles.circle,
                    {
                        backgroundColor: theme.primary,
                        borderColor: theme.card,
                        shadowColor: theme.shadow,
                        transform: [
                            { translateX: translateX },
                            { translateY: translateY },
                            { scale: scale },
                        ],
                    },
                ]}
            >
                <View
                    style={[
                        styles.innerCircle,
                        {
                            borderColor: theme.cardSecondary,
                            backgroundColor: theme.primaryDark,
                        },
                    ]}
                >
                    <Text style={styles.circleText}>TAP ME</Text>
                </View>
            </Animated.View>
        </GestureDetector>
    );
};

const styles = StyleSheet.create({
    circle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 4,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 6,
    },
    innerCircle: {
        width: 132,
        height: 132,
        borderRadius: 66,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
    },
    circleText: {
        fontSize: 18,
        fontWeight: "800",
        color: "#FFFFFF",
    },
});

export default ClickerObject;