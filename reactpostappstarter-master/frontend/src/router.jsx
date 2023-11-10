import Layout from "./components/misc/Layout";
import LoginPage from "./pages/Auth/Login.page";
import Landing from "./pages/Landing/Landing.page";
import NotFound from "./pages/Notfound/NotFound.page";
import CreatePostPage from "./pages/Post/CreatePost.page";
import ProtectedRoute from "./services/ProtectedRoute";
import useBoundStore from "./store/Store";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import { PostPage, postsLoader } from "./pages/Post/Post.page";
import { postDetailsLoader } from "./pages/Post/PostDetails.page";
import PostDetailsPage from "./pages/Post/PostDetails.page";
// import EditPostPage from "./pages/Post/EditPost.page";
// import { editDetailsLoader } from "./pages/Post/EditPost.page";

export const Router = () => {
  const authCheck = useBoundStore((state) => {
    return state.user ? state.user : false;
  });

  /**
   * CLIENT-SIDE ROUTER
   *
   * [Public Pages]: Anyone can see these pages
   * / - Landing Page
   *
   * [Private Routes]: Must be authenticated to see
   * /login - Login Page
   * /posts - See All Posts
   * /posts/:id - See details of a specific post
   * /posts/create - Create a post
   *
   * /<unknown> - 404 Not Found
   */
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/posts/create"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <CreatePostPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostPage />
            </ProtectedRoute>
          }
          loader={postsLoader}
        />
        
        <Route // 1. user가 path로 이동하면
          path="/posts/:id"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <PostDetailsPage />
            </ProtectedRoute>
          }
          // 2. loader가 호출됨, 
          // loader 함수는 비동기 작업(e.g. fetch data)을 수행하고 데이터를 로드함 
          // 데이터 로드가 완료 되면 페이지 컴포넌트가 rendering됨 (여기선 <PostDetailsPage/>)
          loader={postDetailsLoader} 
        />
        {/* <Route
          path="/posts/:id/edit"
          element={
            <ProtectedRoute isAllowed={!!authCheck}>
              <EditPostPage />
            </ProtectedRoute>
          }
          loader={editDetailsLoader} 
        /> */}
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return router;
};
