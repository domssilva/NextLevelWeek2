export default function generateRandomKey(maxLimit = 1000) {
    return Math.floor(Math.random() * maxLimit);
}
