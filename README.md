#  Лабораторна робота №5



```bash
npx create-expo-app@latest lab5 --template blank
cd lab5
npx expo install expo-router react-native-safe-area-context react-native-screens
npx expo start
```

---



---

#  Авторизація (AuthContext)

```jsx
const [isAuthenticated, setIsAuthenticated] = useState(false);

const login = (email, password) => {
  setIsAuthenticated(true);
};

const logout = () => {
  setIsAuthenticated(false);
};
```

Глобальний стан доступний у всіх екранах

---

#  Layout

```jsx
<AuthProvider>
  <Stack />
</AuthProvider>
```

Обгортає весь додаток

---

#  Login

```jsx
const handleLogin = () => {
  const success = login(email, password);
  if (success) router.replace('/');
};
```

Після входу → каталог

---

#  Register

```jsx
if (password !== confirmPassword) {
  alert('Паролі не співпадають');
}
```

Перевірка даних

---

#  Каталог

```jsx
<FlatList
  data={products}
  keyExtractor={(item) => item.id}
  renderItem={renderItem}
/>
```

---

#  Перехід

```jsx
<Link href={`/details/${item.id}`} />
```

---

#  Деталі товару

```jsx
const { id } = useLocalSearchParams();
const product = products.find(p => p.id === id);
```

---

#  Кнопка назад

```jsx
<TouchableOpacity onPress={() => router.back()}>
  <Text>← Назад</Text>
</TouchableOpacity>
```

---

#  Logout

```jsx
const handleLogout = () => {
  logout();
  router.replace('/login');
};
```

---

#  Not Found

```jsx
<Link href="/">Назад</Link>
```

---

#  Дані

```jsx
export const products = [
  { id: '1', title: 'Phone', price: 1000 }
];
```

---

#  UI
- картки
- тіні
- заокруглення
- кнопки

---
[Скрін](img/IMG_2371.PNG)
[Скрін](img/IMG_2372.PNG)
[Скрін](img/IMG_2373.PNG)
[Скрін](img/IMG_2370.PNG)
[Скрін](img/IMG_2370.PNG)
[Скрін](img/IMG_2374.PNG)
[Скрін](img/IMG_2375.PNG)