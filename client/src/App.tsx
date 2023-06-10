import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import PostsList1 from "./PostList1";
import PostsList2 from "./PostList2";
import Post from "./Post";
import { CreatePost } from "./CreatePost";
const POST = [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];

function App() {
  const [currentPage, setCurrentPage] = useState(<PostsList1 />);

  return (
    <div>
      {" "}
      <button onClick={() => setCurrentPage(<PostsList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostsList2 />)}>
        Posts List 2
      </button>
      <button
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>
      <button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage}  />)
        }
      >
        New Post
      </button>
      <br />
      {currentPage}
    </div>
  );
}

function wait(duration: number) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

export default App;
