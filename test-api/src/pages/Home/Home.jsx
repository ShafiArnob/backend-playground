import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div>
        <Link to="/image">Image Upload</Link>
      </div>
    </div>
  )
}

export default Home