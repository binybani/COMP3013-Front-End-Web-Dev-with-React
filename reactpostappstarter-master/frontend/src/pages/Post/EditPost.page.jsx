// import { TextInput, Button, Group, Box } from "@mantine/core";
// import DOMAIN from "../../services/endpoint";
// import axios from "axios";
// import { useForm } from "@mantine/form";
// import { Link, useLoaderData, useParams } from "react-router-dom";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useCallback, useEffect, useState } from "react";

// function EditPostPage() { 
//   const postData = useLoaderData();
//   const post = postData.post;
  
//   const location = useLocation();
//   const navigate = useNavigate();
//   const editForm = useForm({
//     initialValues: {
//       title: post.title,
//       category: post.category,
//       image: post.image,
//       content: post.content,
//     },
//   });

//   const handleUpdate = async (values) => {
//     try {
//       // values save user input data
//       console.log("handleUpdate", values);
//       const res = await axios.get(`${DOMAIN}/api/posts/${post.id}`, values);
//       console.log("next handleUpdate", values);
//       // navigate(`/posts/${post.id}`);
//       // 서버 응답 확인
//       if (res?.data.success) {
//         alert("Update successful");
//         // navigate(`/posts/${post.id}`);
//       } else {
//         alert("Update failed");
//       }
//     } catch (error) {
//       alert("Error updating data:", error);
//     }
//   };

//   // const [modifyPostData, setModifyPostData] = useState([]);
//   // const [title, setTitle] = useState(modifyPostData.title);
//   // const [content, setContent] = useState(modifyPostData.content);

//   return (
//     <Box maw={300} mx="auto">
//       <form onSubmit={editForm.onSubmit(handleUpdate)}>
//         <TextInput
//           label="Title"
//           // value={title}
//           // onChange={onChange}
//           // onChange={(e) => setTitle(e.target.value)}
//           // setTitle={setTitle}
//           // title={title}
//           placeholder={ post.title }
//           {...editForm.getInputProps("title")}
//         />
//         <TextInput
//           label="Category"
//           placeholder={ post.Boxcategory }
//           {...editForm.getInputProps("category")}
//         />
//         <TextInput
//           label="Image"
//           placeholder={ post.image }
//           {...editForm.getInputProps("image")}
//         />

//         <TextInput
//           label="Content"
//           // value={content}
//           // onChange={onChange}
//           // onChange={(e) => setContent(e.target.value)}
//           // setContent={setContent}
//           // content="content"
//           placeholder={ post.content }
//           {...editForm.getInputProps("content")}
//         />

//         <Group position="right" mt="md">
//           <Button type="submit">
//             {/* <Link to={{
//               pathname: `/posts/${post.id}`,
//               // state: {}
//               }}> */}
//               Update
//             {/* </Link> */}
//           </Button>
//         </Group>
//       </form>
//     </Box>
//   );
// }

// export const editDetailsLoader = async ({ params }) => {
//   const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
//   console.log("EditPostPage", res);
//   return res.data;
// };

// export default EditPostPage;
