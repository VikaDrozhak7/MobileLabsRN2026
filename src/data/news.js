const categories = ['Університет', 'Навчання', 'Події', 'Оголошення'];

const formatDate = (offset) => {
    const date = new Date();
    date.setDate(date.getDate() - offset);

    return date.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export const generateNews = (count = 10, startId = 1) => {
    return Array.from({ length: count }, (_, index) => {
        const id = startId + index;

        return {
            id: String(id),
            title: `Новина #${id}`,
            category: categories[index % categories.length],
            date: formatDate(index),
            description: `Це повний опис новини #${id}. Тут може бути основний текст новини, короткий зміст події або інша інформація для демонстрації роботи FlatList, навігації, передачі параметрів між екранами та оптимізації списків.`,
        };
    });
};