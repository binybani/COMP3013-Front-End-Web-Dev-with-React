import { Link, useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Group, Button, Container, Image, Divider, Text, Grid, AspectRatio, Title, Space, ScrollArea, Input,Textarea, TextInput, Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";

function PostDetailsPage() {
  const postData = useLoaderData(); // load한 데이터를 가져옴
  const post = postData.post;
  const postOwner = postData.postOwner;
  const postOwnerEmail = postOwner.email;
  const user = postData.user;
  const postOwnerName = postOwnerEmail.replace(/@.*$/, "");
  // const location = useLocation(); 
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  // const [modifyPostData, setModifyPostData] = useState([]);
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [image, setImage] = useState(post.image);
  const [content, setContent] = useState(post.content);
  const params = useParams().id
  const navigate = useNavigate()
  // const editForm = useForm({
  //   initialValues: {
  //     title: post.title,
  //     category: post.category,
  //     image: post.image,
  //     content: post.content,
  //     updated_at: new Date()
  //   },
  // });
 
  const handleUpdate = async (values) => {
    setIsEditing(!isEditing);
    setIsUpdated(!isUpdated);
    setTitle(values.title);
    navigate(`/posts/${post.id}`);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!",values.title);
    // const res = await axios.patch(`${DOMAIN}/api/posts`, values);

    // axios.patch(`${DOMAIN}/api/posts`, {
    //   title: values.title,
    //   category: values.category,
    //   image: values.image,
    //   content: values.content,
    // })
    // .then(function(res) {
    //   alert("ok")
    // })
  }
  // const handleUpdate = async (values) => {
  //   const res = await axios.patch(`${DOMAIN}/api/posts/${post.id}`, values.post);
  //   if (res?.data.success) {
  //     navigate(`/posts/${post.id}`);
  //   }
  // };

  // const updatedTitle = {...editForm.getInputProps("title")};
  // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", updatedTitle)
  // const handleUpdate = async (values) => {
  //   try {
  //     setIsEditing(!isEditing);
  //     setTitle(values.post.title)
  //     // values save user input data
  //     console.log("handleUpdate", values.post.title);
  //     const res = await axios.patch(`${DOMAIN}/api/posts/${post.id}`, values);
  //     console.log("next handleUpdate", values);
  //     // navigate(`/posts/${post.id}`);
  //     // 서버 응답 확인
  //     if (res?.data.success) {
  //       alert("Update successful");
  //       // navigate(`/posts/${post.id}`);
  //     } else {
  //       alert("Update failed");
  //     }
  //   } catch (error) {
  //     alert("Error updating data:", error);
  //   }
  // };
  const editHandler=() => {
    setIsEditing(!isEditing);
  }

  return (
    !isEditing ?
    [
      <Container size="xs">
        <Grid wrap="nowrap" columns={2}>  
          <Grid.Col span={1} w={100}>
            <Text size="xl" >{ postOwnerName }'s Post</Text>
            <Divider my="sm" />
            <Title size="xl" fw={700}>{ isUpdated ? title : post.title }</Title>
            <Divider my="sm" />
            <Text tt="uppercase" >{ post.category }</Text>
            <Divider my="sm" />
            <Space h="sm" />
            <ScrollArea h={70}>{ post.content }</ScrollArea>
            <Space h="md" />
            <div>
            {
            (Number(post.userId) === Number(user.id)) ? 
            (<Button 
              onClick={editHandler}
            >
              {/* <Link to={`/posts/${post.id}/edit`}> */}
                <span style={{color: "white", fontWeight: 700}}>Edit</span>
              {/* </Link> */}
            </Button>) : (<Text />)
            }
            </div>
            <Space h="sm" />
          </Grid.Col>
          <Grid.Col span={1}>
            <AspectRatio ratio={960 / 1080} maw={400} mx="auto">
            <Image
              radius="md" 
              src={ post.image }     
            />
            </AspectRatio>
          </Grid.Col>
        </Grid>
        <Button top={0}>
          <Link to="/posts">
            <span style={{color: "white", fontWeight: 700}}>Back to Posts</span>
          </Link>
        </Button>
      </Container>
      ] :
      [
      <Box maw={300} mx="auto">
        <form onSubmit={handleUpdate}>
          <TextInput
            label="Title"
            value={ title }
            onChange={(e) => setTitle(e.target.value)}

            // {...editForm.getInputProps("title")}
          />
          <TextInput
            label="Category"
            placeholder={ post.category }
            value={ post.category }
            onChange={(e) => setCategory(e.target.category)}

            // {...editForm.getInputProps("category")}
          />
          <TextInput
            label="Image"
            placeholder={ image }
            value={ post.image }
            // {...editForm.getInputProps("image")}
          />
          <TextInput
            label="Content"
            placeholder={ content }
            value={ content }
            onChange={(e) => setContent(e.target.value)}
            // {...editForm.getInputProps("content")}
          />
          <Group position="right" mt="md">
            <Button type="submit" onClick={handleUpdate}>
                Update
            </Button>
          </Group>
        </form>
      </Box>
    ]
  );
}
// 3. loader에서 가져온 데이터는 페이지 컴포넌트에 props로 전달됨
// 그래서 컴포넌트 내에서 사용할 수 있음
// param object는 현재 URL 경로 매개변수를 포함함.
 export const postDetailsLoader = async ({ params }) => {
   
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  // res = { <- 여기에선 이 정보를 가지고 돌아옴.
  //   data: {
  //     id: 2,
  //     title: "Beautiful BC",
  //     category: "nature",
  //     content: "BC is a province full of beauty at every corner.",
  //     image:
  //       "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
  //     userId: 2,
  //   },
  // }
  // console.log(res);
  console.log("PostDetailsPage");

  // 4. 가져온 정보에서 data를 사용하도록 함.
  return res.data;
};

export default PostDetailsPage;
