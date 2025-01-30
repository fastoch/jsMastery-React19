const App = () => {
  return (
    <div className='card-container'>
      <Card title="Star Wars" />
      <Card title="Lord of the Rings" />
      <Card title="Harry Potter" />
    </div>
  )
}

export default App

const Card = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  )
}
