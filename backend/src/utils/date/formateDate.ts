const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);

    const formattedDate = new Intl
        .DateTimeFormat('ru-RU')
        .format(date);

    return formattedDate;
};

export {
    formatDate,
};
