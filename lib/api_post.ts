export async function getApiPost() {
    const dataPost = await fetch(
        "https://688b5bc82a52cabb9f516cc6.mockapi.io/api/post"
    );
    return dataPost.json();
}