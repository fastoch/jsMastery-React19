const App = () => {
  return (
    <div className='card-container'>  {/* applying styles via a class that is deinfed in the css file */}
      <Card title="Star Wars" />
      <Card title="Lord of the Rings" />
      <Card title="Harry Potter" />
    </div>
  )
}

export default App

// applying styles inline by giving the div a style attribute
const Card = ({ title }) => {
  return (
    <div style={{
      border: '1px solid #4b5362',
      padding: '0.5rem',
      margin: '0.5rem',
      backgroundColor: '#31363f',
      borderRadius: '1rem',
    }}>
      <h2>{title}</h2>
    </div>
  )
}
