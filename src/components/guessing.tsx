import { useState, useEffect } from 'react';
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { useDebounce } from "use-debounce";
import { json } from 'stream/consumers';
import { popularMovies } from './popularMovies';
import { get } from 'http';



export function getRandomMovieId() {
  const randomIndex = Math.floor(Math.random() * popularMovies.length);
  const randomMovie = popularMovies[randomIndex];
  return randomMovie;
}

const movieId = getRandomMovieId();
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export default function Guessing() {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    getImage()
      .then(url => {
        if (url) {
          setImageUrl(url);
        }
      })
      .catch(error => console.error('Error:', error));

    getTitle()
      .then(title => setTitle(title))
      .catch(error => console.error('Error:', error));
  }, []);

  async function getImage(): Promise<string> {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
      );
      const data = await response.json();
      const backdropPath = data.backdrop_path;
      const imageUrl = `https://image.tmdb.org/t/p/w500/${backdropPath}`;
      return imageUrl;
    } catch (error) {
      console.error('Error:', error);
      window.location.reload();
      throw error;
    }
  }

  async function getTitle(): Promise<string> {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
      );
      const data = await response.json();
      const title: string = data.original_title;
      console.log("Answer: " + title)
      return title;
    } catch (error) {
      console.error('Error:', error);
      window.location.reload();
      throw error;
    }
  }
    const handleNextMovie = () => {
    //wait 5 seconds before reloading the page
    setTimeout(() => {
      window.location.reload();
    }, 1900);
    }
  

  return (
    <>
      <img src={imageUrl} alt="" />
      <h1 className="text-white font-bold m-5 text-5xl text-center">Guess the movie</h1>
      {/* <h2 className="text-white opacity-10 m-5">Hint: {title}</h2> */}

      <InputDemo correctAnswer={title} onNextMovie={handleNextMovie} />
      <Button variant="destructive" className = "p-10 w-64"onClick={handleNextMovie}>I give up</Button>
    </>
  );
}

interface InputDemoProps {
  correctAnswer: string;
  onNextMovie: () => void;
}

export function InputDemo({ correctAnswer, onNextMovie }: InputDemoProps) {
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [debouncedText] = useDebounce(userAnswer, 2500);

const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setUserAnswer(event.target.value);
  };

  const checkAnswer = () => {
    // Remove special characters and convert to lowercase
    const cleanUserAnswer = userAnswer.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
    const cleanCorrectAnswer = correctAnswer.replace(/[^a-zA-Z\s]/g, '').toLowerCase();
  
    const userAnswerWords = cleanUserAnswer.split(' ');
    const correctAnswerWords = cleanCorrectAnswer.split(' ');
  
    const matchingWords = userAnswerWords.filter(word => correctAnswerWords.includes(word));
  
    if ((matchingWords.length / correctAnswerWords.length) >= 0.2) {
      setSuccess(true);
      onNextMovie();
    } else {
      setSuccess(false);
    }
  };

  return (
    <>
      <Input 
        type="text"
        placeholder="Type Your Answer"
        value={userAnswer}
        onChange={handleInputChange}
      />
      {success && <div className="text-green-500 p-1 m-3 text-center">Thats the one! Next movie loading ....</div>}
      {!success && debouncedText && <div className="text-red-500">Not quite that....</div>}
      <Button className="m-10 p-10 w-64"onClick={checkAnswer}>Check Answer</Button>
    </>
  );
}

