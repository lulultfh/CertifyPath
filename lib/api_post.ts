import { Suspense } from "react"

export async function getApiArticle() {
    const dataArticle = await fetch(
        "https://688b5bc82a52cabb9f516cc6.mockapi.io/api/post"
    );
    return dataArticle.json();
}