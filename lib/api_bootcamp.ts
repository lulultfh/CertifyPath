import { Suspense } from "react"

export async function getApiArticle() {
    const dataArticle = await fetch(
        "https://688b59452a52cabb9f516177.mockapi.io/api/bootcamp"
    );
    return dataArticle.json();
}