import axios from 'axios';
import { URL, API_KEY } from '../utils/constants'

console.log(" url ", URL, "API_KEY", API_KEY)

export const getMoviesByName = async (name) => {
   try{
      const {data}= await axios.get(`${URL}/${API_KEY}/${name}`)
      if (data.errorMessage !== ""){
         console.log("error al buscar peliculas")
         return 
      }
      let moviesList = data.results.map( (movie) => ( {
               title : movie.title,
               image: movie.image,
               description: movie.description
      }))
      return (moviesList);

   }catch(err){
      console.log('Error find movies', err)
   }
}

