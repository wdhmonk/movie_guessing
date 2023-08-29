import { useState, useEffect } from 'react';
import { Input } from "components/ui/input";
import { Button } from "components/ui/button";


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
      throw error;
    }
  }
    const handleNextMovie = () => {
    // refresh the page
    window.location.reload();
  };

  return (
    <>
      <img src={imageUrl} alt="" />
      <h1 className="text-white font-bold m-10">Guess the movie</h1>
      <h2 className="text-white opacity-10 m-10">Hint: {title}</h2>
      <InputDemo correctAnswer={title} onNextMovie={handleNextMovie}/>
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
      {success && <div className="text-green-500 p-10 m-10">Success! Next movie is shown.</div>}
      {!success && userAnswer && <div className="text-red-500">Wrong answer. Try again.</div>}
      <Button className="m-10 p-10"onClick={checkAnswer}>Check Answer</Button>
    </>
  );
}