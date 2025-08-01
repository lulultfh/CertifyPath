export async function getApiArticle() {
    const dataArticle = await fetch(
        "https://688b59452a52cabb9f516177.mockapi.io/api/article"
    );
    return dataArticle.json();
}
