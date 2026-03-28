import React, { useEffect, useMemo, useState } from 'react';
import {
    Alert,
    FlatList,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    ActivityIndicator,
} from 'react-native';
import * as FileSystem from 'expo-file-system/legacy';

const ROOT_DIR = `${FileSystem.documentDirectory}file-manager/`;

export default function App() {
    const [currentDir, setCurrentDir] = useState(ROOT_DIR);
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);

    const [totalSpace, setTotalSpace] = useState(0);
    const [freeSpace, setFreeSpace] = useState(0);

    const [selectedFileUri, setSelectedFileUri] = useState(null);
    const [selectedFileName, setSelectedFileName] = useState('');
    const [editorText, setEditorText] = useState('');
    const [editorVisible, setEditorVisible] = useState(false);

    const [infoItem, setInfoItem] = useState(null);
    const [infoVisible, setInfoVisible] = useState(false);

    const [createFolderVisible, setCreateFolderVisible] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const [createFileVisible, setCreateFileVisible] = useState(false);
    const [newFileName, setNewFileName] = useState('');
    const [newFileContent, setNewFileContent] = useState('');

    const usedSpace = useMemo(
        () => Math.max(totalSpace - freeSpace, 0),
        [totalSpace, freeSpace]
    );

    useEffect(() => {
        init();
    }, []);

    async function init() {
        try {
            setLoading(true);
            const info = await FileSystem.getInfoAsync(ROOT_DIR);

            if (!info.exists) {
                await FileSystem.makeDirectoryAsync(ROOT_DIR, { intermediates: true });
            }

            await refreshStats();
            await loadDirectory(ROOT_DIR);
        } catch (error) {
            console.error(error);
            Alert.alert('Помилка', 'Не вдалося ініціалізувати файлову систему.');
        } finally {
            setLoading(false);
        }
    }

    async function refreshStats() {
        try {
            const [free, total] = await Promise.all([
                FileSystem.getFreeDiskStorageAsync(),
                FileSystem.getTotalDiskCapacityAsync(),
            ]);

            setFreeSpace(free || 0);
            setTotalSpace(total || 0);
        } catch (error) {
            console.error(error);
        }
    }

    async function loadDirectory(dirUri) {
        try {
            setLoading(true);

            const names = await FileSystem.readDirectoryAsync(dirUri);

            const mapped = await Promise.all(
                names.map(async (name) => {
                    const uri = `${dirUri}${name}`;
                    const info = await FileSystem.getInfoAsync(uri);

                    return {
                        name,
                        uri,
                        isDirectory: !!info.isDirectory,
                        size: info.size,
                        modificationTime: info.modificationTime,
                    };
                })
            );

            mapped.sort((a, b) => {
                if (a.isDirectory !== b.isDirectory) {
                    return a.isDirectory ? -1 : 1;
                }
                return a.name.localeCompare(b.name, 'uk');
            });

            setEntries(mapped);
            setCurrentDir(dirUri);
            await refreshStats();
        } catch (error) {
            console.error(error);
            Alert.alert('Помилка', 'Не вдалося завантажити директорію.');
        } finally {
            setLoading(false);
        }
    }

    function getParentDir(uri) {
        if (uri === ROOT_DIR) return ROOT_DIR;

        const trimmed = uri.endsWith('/') ? uri.slice(0, -1) : uri;
        const lastSlash = trimmed.lastIndexOf('/');
        const parent = trimmed.slice(0, lastSlash + 1);

        return parent.length < ROOT_DIR.length ? ROOT_DIR : parent;
    }

    async function goUp() {
        if (currentDir === ROOT_DIR) return;
        await loadDirectory(getParentDir(currentDir));
    }

    async function openEntry(item) {
        if (item.isDirectory) {
            await loadDirectory(`${item.uri}/`);
            return;
        }

        if (!item.name.toLowerCase().endsWith('.txt')) {
            Alert.alert('Увага', 'Для перегляду та редагування підтримуються лише .txt файли.');
            return;
        }

        try {
            const content = await FileSystem.readAsStringAsync(item.uri, {
                encoding: FileSystem.EncodingType.UTF8,
            });

            setSelectedFileUri(item.uri);
            setSelectedFileName(item.name);
            setEditorText(content);
            setEditorVisible(true);
        } catch (error) {
            console.error(error);
            Alert.alert('Помилка', 'Не вдалося відкрити файл.');
        }
    }

    function closeEditor() {
        setEditorVisible(false);
        setSelectedFileUri(null);
        setSelectedFileName('');
        setEditorText('');
    }

    async function saveFile() {
        if (!selectedFileUri) return;

        try {
            await FileSystem.writeAsStringAsync(selectedFileUri, editorText, {
                encoding: FileSystem.EncodingType.UTF8,
            });

            Alert.alert('Успіх', 'Файл збережено.');
            closeEditor();
            await loadDirectory(currentDir);
        } catch (error) {
            console.error(error);
            Alert.alert('Помилка', 'Не вдалося зберегти файл.');
        }
    }

    async function createFolder() {
        const name = newFolderName.trim();

        if (!name) {
            Alert.alert('Увага', 'Введи назву папки.');
            return;
        }

        try {
            const uri = `${currentDir}${name}/`;
            const info = await FileSystem.getInfoAsync(uri);

            if (info.exists) {
                Alert.alert('Увага', 'Папка з такою назвою вже існує.');
                return;
            }

            await FileSystem.makeDirectoryAsync(uri, { intermediates: true });
            setNewFolderName('');
            setCreateFolderVisible(false);
            await loadDirectory(currentDir);
        } catch (error) {
            console.error(error);
            Alert.alert('Помилка', 'Не вдалося створити папку.');
        }
    }

    async function createFile() {
        let name = newFileName.trim();

        if (!name) {
            Alert.alert('Увага', 'Введи назву файлу.');
            return;
        }

        if (!name.toLowerCase().endsWith('.txt')) {
            name += '.txt';
        }

        try {
            const uri = `${currentDir}${name}`;
            const info = await FileSystem.getInfoAsync(uri);

            if (info.exists) {
                Alert.alert('Увага', 'Файл з такою назвою вже існує.');
                return;
            }

            await FileSystem.writeAsStringAsync(uri, newFileContent, {
                encoding: FileSystem.EncodingType.UTF8,
            });

            setNewFileName('');
            setNewFileContent('');
            setCreateFileVisible(false);
            await loadDirectory(currentDir);
        } catch (error) {
            console.error(error);
            Alert.alert('Помилка', 'Не вдалося створити файл.');
        }
    }

    function confirmDelete(item) {
        Alert.alert(
            'Підтвердження',
            `Видалити ${item.isDirectory ? 'папку' : 'файл'} "${item.name}"?`,
            [
                {
                    text: 'Скасувати',
                    style: 'cancel',
                },
                {
                    text: 'Видалити',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await FileSystem.deleteAsync(item.uri, { idempotent: true });
                            await loadDirectory(currentDir);
                        } catch (error) {
                            console.error(error);
                            Alert.alert('Помилка', 'Не вдалося видалити елемент.');
                        }
                    },
                },
            ]
        );
    }

    function showInfo(item) {
        setInfoItem(item);
        setInfoVisible(true);
    }

    const relativePath = useMemo(() => {
        if (currentDir === ROOT_DIR) return 'root';
        return currentDir.replace(ROOT_DIR, '').replace(/\/$/, '') || 'root';
    }, [currentDir]);

    const breadcrumbParts = useMemo(() => {
        if (currentDir === ROOT_DIR) return ['root'];
        return ['root', ...currentDir.replace(ROOT_DIR, '').split('/').filter(Boolean)];
    }, [currentDir]);

    async function goToBreadcrumb(index) {
        if (index === 0) {
            await loadDirectory(ROOT_DIR);
            return;
        }

        const folders = breadcrumbParts.slice(1, index + 1);
        const target = `${ROOT_DIR}${folders.join('/')}/`;
        await loadDirectory(target);
    }

    function renderItem({ item }) {
        return (
            <View style={styles.itemCard}>
                <Pressable style={styles.itemMain} onPress={() => openEntry(item)}>
                    <Text style={styles.itemIcon}>{item.isDirectory ? '📁' : '📄'}</Text>

                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemMeta}>
                            {item.isDirectory ? 'Папка' : getFileType(item.name)}
                            {!item.isDirectory && item.size != null ? ` • ${formatBytes(item.size)}` : ''}
                        </Text>
                    </View>
                </Pressable>

                <View style={styles.itemActions}>
                    <Pressable style={styles.smallBtn} onPress={() => showInfo(item)}>
                        <Text style={styles.smallBtnText}>Info</Text>
                    </Pressable>

                    <Pressable
                        style={[styles.smallBtn, styles.deleteBtn]}
                        onPress={() => confirmDelete(item)}
                    >
                        <Text style={styles.deleteBtnText}>Delete</Text>
                    </Pressable>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.header}>
                <Text style={styles.title}>Файловий менеджер</Text>

            </View>

            <View style={styles.statsCard}>
                <Text style={styles.sectionTitle}>Статистика пам’яті</Text>
                <Text style={styles.statText}>Загальний обсяг: {formatBytes(totalSpace)}</Text>
                <Text style={styles.statText}>Вільно: {formatBytes(freeSpace)}</Text>
                <Text style={styles.statText}>Зайнято: {formatBytes(usedSpace)}</Text>
            </View>

            <View style={styles.pathCard}>
                <Text style={styles.sectionTitle}>Поточний шлях</Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.breadcrumbRow}>
                        {breadcrumbParts.map((part, index) => (
                            <React.Fragment key={`${part}-${index}`}>
                                <Pressable onPress={() => goToBreadcrumb(index)}>
                                    <Text style={styles.breadcrumbText}>{part}</Text>
                                </Pressable>
                                {index < breadcrumbParts.length - 1 && (
                                    <Text style={styles.breadcrumbSep}> / </Text>
                                )}
                            </React.Fragment>
                        ))}
                    </View>
                </ScrollView>

                <Text style={styles.pathText}>{relativePath}</Text>

                <View style={styles.topActions}>
                    <Pressable style={styles.actionBtn} onPress={goUp}>
                        <Text style={styles.actionBtnText}>Вгору</Text>
                    </Pressable>

                    <Pressable style={styles.actionBtn} onPress={() => setCreateFolderVisible(true)}>
                        <Text style={styles.actionBtnText}>Нова папка</Text>
                    </Pressable>

                    <Pressable style={styles.actionBtn} onPress={() => setCreateFileVisible(true)}>
                        <Text style={styles.actionBtnText}>Новий .txt</Text>
                    </Pressable>
                </View>
            </View>

            <View style={styles.listBlock}>
                <Text style={styles.sectionTitle}>Вміст директорії</Text>

                {loading ? (
                    <View style={styles.loaderWrap}>
                        <ActivityIndicator size="large" />
                    </View>
                ) : (
                    <FlatList
                        data={entries}
                        keyExtractor={(item) => item.uri}
                        renderItem={renderItem}
                        ListEmptyComponent={<Text style={styles.emptyText}>Папка порожня</Text>}
                        contentContainerStyle={
                            entries.length === 0 ? { flexGrow: 1, justifyContent: 'center' } : null
                        }
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>

            <Modal visible={editorVisible} animationType="slide">
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.editorHeader}>
                        <View style={styles.editorHeaderTop}>
                            <View style={styles.editorHeaderTextWrap}>
                                <Text style={styles.modalTitle}>Редагування файлу</Text>
                                <Text style={styles.fileNameText}>{selectedFileName}</Text>
                                <Text style={styles.modalPath} numberOfLines={1}>
                                    {selectedFileUri || ''}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.editorTopButtons}>
                            <Pressable
                                style={[styles.topEditorBtn, styles.cancelTopBtn]}
                                onPress={closeEditor}
                            >
                                <Text style={styles.cancelTopBtnText}>Скасувати</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.topEditorBtn, styles.saveTopBtn]}
                                onPress={saveFile}
                            >
                                <Text style={styles.saveTopBtnText}>Зберегти</Text>
                            </Pressable>
                        </View>
                    </View>

                    <TextInput
                        style={styles.editor}
                        value={editorText}
                        onChangeText={setEditorText}
                        multiline
                        textAlignVertical="top"
                        placeholder="Введіть текст файлу..."
                        placeholderTextColor="#98a2b3"
                    />
                </SafeAreaView>
            </Modal>

            <Modal visible={infoVisible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.dialog}>
                        <Text style={styles.modalTitle}>Інформація про файл</Text>

                        <Text style={styles.infoText}>Назва: {infoItem?.name || '-'}</Text>
                        <Text style={styles.infoText}>
                            Тип: {infoItem ? (infoItem.isDirectory ? 'Папка' : getFileType(infoItem.name)) : '-'}
                        </Text>
                        <Text style={styles.infoText}>
                            Розмір: {infoItem?.isDirectory ? '-' : formatBytes(infoItem?.size || 0)}
                        </Text>
                        <Text style={styles.infoText}>
                            Остання модифікація:{' '}
                            {infoItem?.modificationTime ? formatDate(infoItem.modificationTime) : '-'}
                        </Text>

                        <Pressable
                            style={[styles.actionBtn, styles.fullWidthBtn, { marginTop: 16 }]}
                            onPress={() => setInfoVisible(false)}
                        >
                            <Text style={styles.actionBtnText}>Закрити</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Modal visible={createFolderVisible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.dialog}>
                        <Text style={styles.modalTitle}>Створити папку</Text>

                        <TextInput
                            style={styles.input}
                            value={newFolderName}
                            onChangeText={setNewFolderName}
                            placeholder="Назва папки"
                            placeholderTextColor="#98a2b3"
                        />

                        <View style={styles.modalActions}>
                            <Pressable
                                style={[styles.actionBtn, styles.secondaryActionBtn, styles.modalBtn]}
                                onPress={() => setCreateFolderVisible(false)}
                            >
                                <Text style={styles.secondaryActionBtnText}>Скасувати</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.actionBtn, styles.modalBtn]}
                                onPress={createFolder}
                            >
                                <Text style={styles.actionBtnText}>Створити</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={createFileVisible} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.dialog}>
                        <Text style={styles.modalTitle}>Створити .txt файл</Text>

                        <TextInput
                            style={styles.input}
                            value={newFileName}
                            onChangeText={setNewFileName}
                            placeholder="Назва файлу"
                            placeholderTextColor="#98a2b3"
                        />

                        <TextInput
                            style={[styles.input, styles.textArea]}
                            value={newFileContent}
                            onChangeText={setNewFileContent}
                            multiline
                            textAlignVertical="top"
                            placeholder="Початковий вміст"
                            placeholderTextColor="#98a2b3"
                        />

                        <View style={styles.modalActions}>
                            <Pressable
                                style={[styles.actionBtn, styles.secondaryActionBtn, styles.modalBtn]}
                                onPress={() => setCreateFileVisible(false)}
                            >
                                <Text style={styles.secondaryActionBtnText}>Скасувати</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.actionBtn, styles.modalBtn]}
                                onPress={createFile}
                            >
                                <Text style={styles.actionBtnText}>Створити</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

function getFileType(name) {
    const dotIndex = name.lastIndexOf('.');
    if (dotIndex === -1) return 'Невідомий';
    return name.slice(dotIndex + 1).toUpperCase();
}

function formatBytes(bytes) {
    if (!bytes || bytes <= 0) return '0 B';

    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);

    return `${value.toFixed(value >= 10 || i === 0 ? 0 : 2)} ${units[i]}`;
}

function formatDate(unixSeconds) {
    return new Date(unixSeconds * 1000).toLocaleString('uk-UA');
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f7fb',
        paddingHorizontal: 16,
    },

    header: {
        paddingTop: 8,
        paddingBottom: 12,
    },

    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1b1f24',
    },

    subtitle: {
        fontSize: 14,
        color: '#667085',
        marginTop: 4,
    },

    statsCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
    },

    pathCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
    },

    listBlock: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        color: '#101828',
    },

    statText: {
        fontSize: 14,
        color: '#344054',
        marginBottom: 4,
    },

    breadcrumbRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    breadcrumbText: {
        color: '#175cd3',
        fontWeight: '600',
        fontSize: 14,
    },

    breadcrumbSep: {
        color: '#98a2b3',
        fontSize: 14,
    },

    pathText: {
        color: '#475467',
        marginBottom: 12,
    },

    topActions: {
        flexDirection: 'row',
        gap: 8,
        flexWrap: 'wrap',
    },

    actionBtn: {
        backgroundColor: '#175cd3',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    actionBtnText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 15,
    },

    secondaryActionBtn: {
        backgroundColor: '#e5e7eb',
    },

    secondaryActionBtnText: {
        color: '#111827',
        fontWeight: '600',
        fontSize: 15,
    },

    fullWidthBtn: {
        width: '100%',
    },

    itemCard: {
        borderWidth: 1,
        borderColor: '#eaecf0',
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#fcfcfd',
    },

    itemMain: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    itemIcon: {
        fontSize: 28,
        marginRight: 12,
    },

    itemInfo: {
        flex: 1,
    },

    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#101828',
    },

    itemMeta: {
        fontSize: 13,
        color: '#667085',
        marginTop: 4,
    },

    itemActions: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 12,
    },

    smallBtn: {
        backgroundColor: '#e9f2ff',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
    },

    deleteBtn: {
        backgroundColor: '#fee4e2',
    },

    smallBtnText: {
        fontWeight: '600',
        color: '#344054',
    },

    deleteBtnText: {
        fontWeight: '600',
        color: '#b42318',
    },

    loaderWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyText: {
        textAlign: 'center',
        color: '#98a2b3',
        fontSize: 16,
    },

    modalContainer: {
        flex: 1,
        backgroundColor: '#f4f7fb',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 16,
    },

    editorHeader: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eaecf0',
    },

    editorHeaderTop: {
        marginBottom: 12,
    },

    editorHeaderTextWrap: {
        flex: 1,
    },

    modalTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 6,
        color: '#101828',
    },

    fileNameText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#175cd3',
        marginBottom: 4,
    },

    modalPath: {
        fontSize: 12,
        color: '#667085',
    },

    editorTopButtons: {
        flexDirection: 'row',
        gap: 10,
    },

    topEditorBtn: {
        flex: 1,
        paddingVertical: 11,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },

    cancelTopBtn: {
        backgroundColor: '#e5e7eb',
    },

    saveTopBtn: {
        backgroundColor: '#175cd3',
    },

    cancelTopBtnText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#101828',
    },

    saveTopBtnText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#fff',
    },

    editor: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#d0d5dd',
        borderRadius: 16,
        padding: 14,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#101828',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(16, 24, 40, 0.45)',
        justifyContent: 'center',
        padding: 20,
    },

    dialog: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
    },

    infoText: {
        fontSize: 15,
        color: '#344054',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#d0d5dd',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#f9fafb',
        marginBottom: 12,
        color: '#101828',
    },

    textArea: {
        minHeight: 100,
    },

    modalActions: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 4,
    },

    modalBtn: {
        flex: 1,
    },
});