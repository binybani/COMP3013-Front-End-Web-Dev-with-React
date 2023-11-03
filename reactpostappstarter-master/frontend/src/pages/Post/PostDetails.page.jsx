import { Link, useLoaderData } from "react-router-dom";
import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { Button, Container, Image, Group, Text, Grid, AspectRatio, Title, Stack } from "@mantine/core";

function PostDetailsPage() {
  const postData = useLoaderData();
  const post = postData.post;
  const postOwner = postData.postOwner;
  const postOwnerEmail = postOwner.email;
  const user = postData.user;
  const postOwnerName = postOwnerEmail.replace(/@.*$/, "");

  return (
    <>
      <Container size="xs">
        <Grid wrap="nowrap" columns={2}>  
          <Grid.Col span={1} w={100}>
            <Stack>
            <Text size="xl" >{ postOwnerName }'s Post</Text>
            </Stack>
            <Title size="xl" fw={700}>{ post.title }</Title>
            <Text tt="uppercase" >{ post.category }</Text>
            <Text >{ post.content }</Text>
            <div>
            {
            (Number(post.userId) === Number(user.id)) ? (<Button>Edit</Button>) : (<Text />)
            }
            </div>
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
        <Button>
          <Link to="/posts">Back to Posts</Link>
        </Button>
      </Container>
    </>
  );
}

export const postDetailsLoader = async ({ params }) => {
  const res = await axios.get(`${DOMAIN}/api/posts/${params.id}`);
  // res = { <- 이 정보를 가지로 돌아옴.
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
  console.log(res);

  return res.data;
};

export default PostDetailsPage;
