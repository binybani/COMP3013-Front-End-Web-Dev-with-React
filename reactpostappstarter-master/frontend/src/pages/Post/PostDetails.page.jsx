import { Link, useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Group, Button, Container, Image, Divider, Text, Grid, AspectRatio, Title, Space, ScrollArea, Input,Textarea, TextInput, Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { useEditStore } from "../../store/EditStore";

function PostDetailsPage() {
  const postData = useLoaderData(); // load한 데이터를 가져옴
  const post = postData.post;
  const postOwner = postData.postOwner;
  const postOwnerEmail = postOwner.email;
  const loginUser = postData.loginUser;
  const postOwnerName = postOwnerEmail.replace(/@.*$/, "");

  const { isEditing, setIsEditing, editPost, editedList, setEditedList } = useEditStore((state) => state)
  
  useEffect(() => {
      const handlePopstate = () => {
      if (isEditing) {
        setIsEditing();
      }
      };
      window.addEventListener("popstate", handlePopstate);
      return () => {
      window.removeEventListener("popstate", handlePopstate);
      };
  }, [isEditing, setIsEditing]);

  const handleEdit = () => {
      editPost(post);
      setIsEditing();
  };

  const handleUpdate = async () => {
      try {
      const res = await axios.post(`${DOMAIN}/api/posts/edit`, editedList);
      setEditedList({});
      setIsEditing();
      } catch (error) {
      console.error("Error updating post:", error);
      }
  }
  return (
    [!isEditing ? (
      <Container size="xs">
        <Grid wrap="nowrap" columns={2}>  
          <Grid.Col span={1} w={100}>
            <Text size="xl" >{ postOwnerName }'s Post</Text>
            <Divider my="sm" />
            <Title size="xl" fw={700}>{ post.title }</Title>
            <Divider my="sm" />
            <Text tt="uppercase" >{ post.category }</Text>
            <Divider my="sm" />
            <Space h="sm" />
            <ScrollArea h={70}>{ post.content }</ScrollArea>
            <Space h="md" />
            {
            (Number(post.userId) === Number(loginUser.id)) ? 
            (<Button onClick={handleEdit}>
              <span style={{color: "white", fontWeight: 700}}>
                Edit
              </span>
            </Button>) : (<Text />)
            }
            <Space h="sm" />
          </Grid.Col>
          <Grid.Col span={1}>
            <AspectRatio ratio={960 / 1080} maw={400} mx="auto">
            <Image radius="md" src={ post.image }/>
            </AspectRatio>
          </Grid.Col>
        </Grid>
        <Button top={0}>
          <Link to="/posts">
            <span style={{color: "white", fontWeight: 700}}>
              Back to Posts
            </span>
          </Link>
        </Button>
      </Container>
   ) : (
      <Box maw={300} mx="auto">
        <TextInput
          label="Title"
          value={ editedList.title }
          placeholder={ editedList.title }
          onChange={(e) => editPost({ ...editedList, title: e.target.value })}
        />
        <TextInput
          label="Category"
          value={ editedList.category }
          placeholder={ editedList.category }
          onChange={(e) => editPost({ ...editedList, category: e.target.value })}
        />
        <TextInput
          label="Image"
          value={ editedList.image }
          placeholder={ editedList.image }
          onChange={(e) => editPost({ ...editedList, image: e.target.value })}
        />
        <TextInput
          label="Content"
          value={ editedList.content }
          placeholder={ editedList.content }
          onChange={(e) => editPost({ ...editedList, content: e.target.value })}
        />
        <Group position="right" mt="md">
          <Button type="submit" onClick={handleUpdate}>
              Update
          </Button>
        </Group>
      </Box>
      )
    ]
  );
};
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
