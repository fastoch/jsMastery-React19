import './App.css'

const App = () => {
  return (
    <div>
      <h2>Functional Arrow Component</h2>
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
