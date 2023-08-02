import React, { useState, useEffect} from "react";
import { Route, Routes, useNavigate} from "react-router-dom";
import Home from "./Home";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import { format } from "date-fns";
import Layout from "./Layout";

function App() {
    const [posts, setPosts] = useState([
        {
            id: 1,
            title: "Tetyana's 1st Post",
            datetime: "August 01, 2023 14:18:37 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 2,
            title: "Tetyana's 2nd Post",
            datetime: "July 01, 2021 11:17:36 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 3,
            title: "Tetyana's 3rd Post",
            datetime: "August 01, 2023 14:18:37 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
            id: 4,
            title: "Tetyana's 4th Post",
            datetime: "August 01, 2023 14:18:37 AM",
            body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        }
    ]);
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const filteredResults = posts.filter(post =>
            (post.body.toLowerCase()).includes(search.toLowerCase())
            || (post.title.toLowerCase()).includes(search.toLowerCase()));
        setSearchResults(filteredResults.reverse());

    }, [posts, search]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const newPost = { id, title: postTitle, datetime, body: postBody };
        const  allPosts = [...posts, newPost];
        setPosts(allPosts);
        setPostTitle("");
        setPostBody("");
        navigate("/");
    }
    const handleDelete = (id) => {
        const postsList = posts.filter(post => post.id !== id);
        setPosts(postsList);
        navigate("/");
    }

    return (
        <Routes>
            <Route path="/" element={<Layout
                search={search}
                setSearch={setSearch}
            />}>
                <Route index element={<Home posts={searchResults} />} />
                <Route path="post">
                    <Route index element={<NewPost
                        handleSubmit={handleSubmit}
                        postTitle={postTitle}
                        setPostTitle={setPostTitle}
                        postBody={postBody}
                        setPostBody={setPostBody}
                    />} />
                    <Route path=":id" element={<PostPage
                        posts={posts}
                        handleDelete={handleDelete}
                    />} />
                </Route>
                <Route path="about" element={<About />} />
                <Route path="*" element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
