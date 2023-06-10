import axios from "axios";

export type PostType = {
    userId?: number;
    id?: number;
    title: string;
    body: string;
};

export function getPosts(): Promise<PostType[]> {
    return axios
        .get("http://localhost:3000/posts", { params: { _sort: "title" } })
        .then(res => res.data);
}

// export function getPostsPaginated(page) {
//   return axios
//     .get("http://localhost:3000/posts", {
//       params: { _page: page, _sort: "title", _limit: 2 },
//     })
//     .then(res => {
//       const hasNext = page * 2 <= parseInt(res.headers["x-total-count"])
//       return {
//         nextPage: hasNext ? page + 1 : undefined,
//         previousPage: page > 1 ? page - 1 : undefined,
//         posts: res.data,
//       }
//     })
// }

export function getPost(id: number): Promise<PostType> {
    return axios.get(`http://localhost:3000/posts/${id}`).then(res => res.data);
}

export function createPost({ title, body }: { title: string, body: string; }): Promise<PostType> {
    return axios
        .post("http://localhost:3000/posts", {
            title,
            body,
            userId: 1,
            id: Date.now(),
        })
        .then(res => res.data);
}