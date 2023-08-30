import { useState, useEffect } from 'react';
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";
import { useDebounce } from "use-debounce";


const movieId = Math.floor(Math.random() * 1000);
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
    }, 2500);
    }
  

  return (
    <>
      <img src={imageUrl} alt="" />
      <h1 className="text-white font-bold m-5 text-5xl text-center">Guess the movie</h1>
      <h2 className="text-white opacity-10 m-5">Hint: {title}</h2>
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
  const [debouncedText] = useDebounce(userAnswer, 5000);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(event.target.value);
  };

  const checkAnswer = () => {
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
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
      {success && <div className="text-green-500 p-10 m-10">Thats the one! Next movie loading ....</div>}
      {!success && debouncedText && <div className="text-red-500">Not quite that....</div>}
      <Button className="m-10 p-10 w-64"onClick={checkAnswer}>Check Answer</Button>
    </>
  );
}