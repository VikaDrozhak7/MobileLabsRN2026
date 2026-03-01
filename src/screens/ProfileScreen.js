import React, { useState } from "react";
import {
    Text,
    StyleSheet,
    TextInput,
    Pressable,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
    View,
} from "react-native";
import Footer from "../components/Footer";
import { colors } from "../theme/colors";
import { ui } from "../theme/ui";

function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
}

export default function ProfileScreen() {
    const [email, setEmail] = useState("");
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");

    const onRegister = () => {
        const e = email.trim();
        const ln = lastName.trim();
        const fn = firstName.trim();

        if (!isEmailValid(e)) return Alert.alert("Помилка", "Введіть коректну електронну пошту.");
        if (pass1.length < 6) return Alert.alert("Помилка", "Пароль має бути мінімум 6 символів.");
        if (pass1 !== pass2) return Alert.alert("Помилка", "Паролі не співпадають.");
        if (!ln || !fn) return Alert.alert("Помилка", "Заповніть ім'я та прізвище.");

        Alert.alert("Успіх", `Користувача ${ln} ${fn} зареєстровано!`);
    };

    return (
        <KeyboardAvoidingView
            style={styles.screen}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
        >
            <Text style={styles.title}>Реєстрація</Text>

            <ScrollView contentContainerStyle={styles.form} keyboardShouldPersistTaps="handled">
                <View style={styles.card}>
                    <Text style={styles.label}>Електронна пошта</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="example@mail.com"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />

                    <Text style={styles.label}>Пароль</Text>
                    <TextInput
                        value={pass1}
                        onChangeText={setPass1}
                        placeholder="******"
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Пароль (ще раз)</Text>
                    <TextInput
                        value={pass2}
                        onChangeText={setPass2}
                        placeholder="******"
                        secureTextEntry={true}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Прізвище</Text>
                    <TextInput value={lastName} onChangeText={setLastName} placeholder="Петренко" style={styles.input} />

                    <Text style={styles.label}>Ім&apos;я</Text>
                    <TextInput value={firstName} onChangeText={setFirstName} placeholder="Іван" style={styles.input} />

                    <Pressable
                        onPress={onRegister}
                        style={({ pressed }) => [
                            styles.button,
                            pressed ? { transform: [{ scale: 0.98 }], opacity: 0.95 } : null,
                        ]}
                    >
                        <Text style={styles.buttonText}>Зареєструватися</Text>
                    </Pressable>

                    <Text style={styles.hint}>Пароль: мінімум 6 символів</Text>
                </View>

                <Footer />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    screen: { flex: 1, paddingHorizontal: 14, paddingTop: 14, backgroundColor: colors.bg },
    title: { ...ui.text.h1, textAlign: "center", marginBottom: 12 },

    form: { paddingBottom: 14 },

    card: {
        borderRadius: ui.radius.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 14,
        ...ui.shadow,
    },

    label: { marginTop: 10, marginBottom: 6, fontSize: 13, fontWeight: "700", color: colors.text },

    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: ui.radius.md,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 14,
        backgroundColor: "#fff",
    },

    button: {
        marginTop: 14,
        paddingVertical: 13,
        borderRadius: ui.radius.md,
        backgroundColor: colors.primary,
        alignItems: "center",
    },
    buttonText: { color: "#fff", fontWeight: "800", fontSize: 15 },

    hint: { marginTop: 10, color: colors.muted, fontSize: 12 },
});