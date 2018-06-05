export default function generateData(size) {
    const data = [];
    for (let index = 0; index < size; index++) {
        const value = Math.random() * 900 + 100;
        data.push({ index, value });
    }
    return data;
}
