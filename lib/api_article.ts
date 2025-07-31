//import ArticleList from "/componen"
import { Suspense } from "react"

export async function getApiArticle() {
    const dataArticle = await fetch(
        "https://688b59452a52cabb9f516177.mockapi.io/api/article"
    );
    return dataArticle.json();
}

// export default async function Products() {
//   const items = getApiPost();
//   return (
//     <>
//       <Suspense fallback={<div>Loading ...</div>}>
//         <ProductList items={items} />
//       </Suspense>
//     </>
//   );
// }