import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Box, useBreakpointValue } from "@chakra-ui/react";

import Axios from "axios";

import { URL, API_KEY } from "../utils/constants";

export default function Home() {
  const [movies, setMovies] = useState([]);

  const getMoviesByTitle = async (title) => {
    try {
      const { data } = await Axios.get(`${URL}/${API_KEY}/${title}`);
      if (data.errorMessage !== "") {
        console.log("error al buscar peliculas", data.errorMessage);
      }
      let moviesList = data.results.map((movie) => ({
        title: movie.title,
        image: movie.image,
        description: movie.description,
      }));
      setMovies(moviesList);
    } catch (err) {
      console.log("Error find movies", err);
    }
  };

  const [search] = useSearchParams();
  useEffect(() => {
    const title = search.get("title");
    if (title) {
      getMoviesByTitle(title);
    }
  }, [search]);

  const variant = useBreakpointValue({
    base: "1",
    md: "solid",
  });

  return (
    <Grid
      templateColumns={{ lg: "repeat(6, 1fr)", base: "repeat(2, 1fr)" }}
      gap={4}
      my={8}
      justifyItems="center"
      variant={variant}
    >
      {movies.map((movie) => (
        <Box
          bgSize="cover"
          bgPosition="center"
          bgImage={movie.image}
          w="175px"
          h="250"
          borderRadius="none"
          overflow="hidden"
          mb={4}
        ></Box>
      ))}
    </Grid>
  );
}
