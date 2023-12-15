exports.difficultyLevelOptionsViewData = (difficultyLevel) => {
    const titles = [
        "Easy",
        "Medium (Standart 3x3)",
        "Intermediate",
        "Expert",
        "Hardcore"
    ];

    const options = titles.map((title, index) => {
        const value = index + 1;
        return {
            title: `${value} - ${title}`,
            value,
            selected: Number(difficultyLevel) === value ? 'selected' : "",
        }
    });
    return options;
};