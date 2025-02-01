import { useState } from 'react'

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

  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? 'Liked' : 'Like'}
      </button>
    </div>
  )
}
