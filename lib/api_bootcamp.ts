import { Suspense } from "react"

export async function getApiBootcamp() {
<<<<<<< HEAD
    const dataBootcamp = await fetch(
=======
    const dataArticle = await fetch(
>>>>>>> 085a976 (feat post)
        "https://688b59452a52cabb9f516177.mockapi.io/api/bootcamp"
    );
    return dataBootcamp.json();
}