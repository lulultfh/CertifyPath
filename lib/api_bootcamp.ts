export async function getApiBootcamp() {
    const dataBootcamp = await fetch(
        "https://688b59452a52cabb9f516177.mockapi.io/api/bootcamp"
    );
    return dataBootcamp.json();
}