import { useState, useEffect } from 'react';
import { Input } from "~/components/input"


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

  async function getImage() {
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
    }
  }

  async function getTitle() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
      );
      const data = await response.json();
      const title = data.original_title;
      return title;
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const handleNextMovie = () => {
    // refresh the page
    window.location.reload();
  };

  return (
    <>
      <img src={imageUrl} alt="" />
      <div className="text-white text-2xl font-bold">{title}</div>
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
      {success && <div className="text-green-500">Success! Next movie is shown.</div>}
      {!success && userAnswer && <div className="text-red-500">Wrong answer. Try again.</div>}
      <button onClick={checkAnswer}>Check Answer</button>
    </>
  );
}