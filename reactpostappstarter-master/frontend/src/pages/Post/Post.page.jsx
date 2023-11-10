import DOMAIN from "../../services/endpoint";
import axios from "axios";
import { ArticleCardImage } from "../../components/misc/ArticleCardImage";
import { SimpleGrid, Container, LoadingOverlay
  , Box, Group, Button, Text } from "@mantine/core";
import { useLoaderData } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const PostPage = () => {
  const posts = useLoaderData();// load한 데이터를 가져옴

  const [visible] = useDisclosure(true); // Set visible to true initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
      api();
    }, []);
    
    const api = async () => {
    	try {
        setLoading(false)
        } catch(e) {
        }
    }
  // const test = async () => {
  //   //const json = await ( 
  //     //await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=9.0&sort_by=year`)
  //     //).json();
      
  //     //setMoiveList(json.data.movies); //이 부분은 영화 목록 api을 가져오는 부분이기에 로딩과 상관없습니다
  //     console.log("로딩완료가 되나???");
  //     setLoading(false); //로딩 완료
  //     console.log("로딩완료가 됨");
  //   };     

  //     useEffect ( () => {
  //     test(); //영화 목록 가져오기
  //      }, [] );

  // const mainApi = async () => {
  //   setLoading(true); // api 호출 전에 true로 변경하여 로딩화면 띄우기
  //   const result = await response.json();
  //   setLoading(false);
 
  // };
  // useEffect(() => {
  //   mainApi();
  //   }, []);

  return (
    <>
    <Box pos="relative">
      { loading ?   
      [<LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      ] : [<Text/>]}
      <Container>
        <SimpleGrid h={400} cols={3}>
          {posts?.map((post) => (
            <ArticleCardImage key={post.title} {...post} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
    </>
  );
};

export const postsLoader = async () => {
  const res = await axios.get(`${DOMAIN}/api/posts`);
  console.log("PostPage");
  return res.data;
};
