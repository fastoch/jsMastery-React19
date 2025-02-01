import { useState, useEffect } from 'react'

const App = () => {
  return (
    <div className='card-container'>  {/* applying styles via a class that is defined in the index.css file */}
      <Card title="Star Wars" />
      <Card title="Lord of the Rings" />
      <Card title="Harry Potter" />
    </div>
  )
}

export default App

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [clicks, setClicks] = useState(0);
  
  useEffect(() => {
    console.log(`${title} has been liked: ${hasLiked}`);
  }, [hasLiked]);

  return (
    <div className="card">
      <h2>{title} <br/> {clicks ? clicks : null}</h2>
      <button 
        onClick={() => {
          setHasLiked((prev) => !prev); // toggle hasLiked
          setClicks((prevState) => prevState + 1); // increment clicks
        }}
      >
        {hasLiked ? 'Liked' : 'Like'} 
      </button>
    </div>
  )
}
