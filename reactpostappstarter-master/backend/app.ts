import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import {
  findUserById,
  IDecodedUser,
  verifyUser,
  parseToken,
  addPost,
  posts,
  sleep,
} from "./fakedb";

const port = 8085;
const app = express();
app.use(cors());
app.use(express.json());

// TODO: Obviously use a more secure signing key than "secret"
app.post("/api/user/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = verifyUser(email, password);
    const token = jwt.sign({ id: user.id }, "secret", {
      expiresIn: "2 days",
    });
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/user/validation", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const decodedUser = jwt.verify(token, "secret");
    const user = findUserById((decodedUser as IDecodedUser).id);
    res.json({ result: { user, token } });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.get("/api/posts", async (req, res) => {
  const token =req.headers["Authorization"];
  // Sleep delay goes here
  sleep(5000);
  res.json(posts);
});

// ⭐️ TODO: Implement this yourself
app.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;//postDetailsLoader에서 (`${DOMAIN}/api/posts/${params.id}`);->이부분에서 params.id가져옴
  const foundPost = posts[Number(id) - 1];
  // find post owner
  const foundPostOwner = findUserById(Number(id));
  // find login user
  const authHeader = req.headers.authorization;
  const token = parseToken(authHeader, res);
  const decodedUser = jwt.verify(token, "secret");
  const foundLoginUser = findUserById((decodedUser as IDecodedUser).id);
  // make post data object
  const postData = {
    post: foundPost,
    loginUser: foundLoginUser,
    postOwner: foundPostOwner,
  };
  res.json(postData);
});

/**
 * Problems with this:
 * (1) Authorization Issues:
 *     What if you make a request to this route WITHOUT a token?
 *     What if you make a request to this route WITH a token but
 *     it's invalid/expired?
 * (2) Server-Side Validation Issues:
 *     What if you make a request to this route with a valid token but
 *     with an empty/incorrect payload (post)
 */
app.post("/api/posts", (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = parseToken(authHeader, res);
    const incomingPost = req.body;
    addPost(incomingPost, token);
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(401).json({ error });
  }
});

app.post("/api/posts/edit", (req, res) => {
  const incomingPost = req.body;
  const id = incomingPost.id
  const foundPost = posts.find((findPost) => findPost.id === id);
  
  //will not work when foundPost is undefined
  if (foundPost && foundPost.id == incomingPost.id) {
      foundPost.title = incomingPost.title; 
      foundPost.category = incomingPost.category; 
      foundPost.image = incomingPost.image; 
      foundPost.content = incomingPost.content; 

    const index = posts.findIndex((post) => post.id === foundPost?.id);
    if (index !== -1) {
      posts[index] = foundPost;
    }
    console.log("updated post123L",posts)
    res.json(posts);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

app.listen(port, () => console.log("Server is running"));
