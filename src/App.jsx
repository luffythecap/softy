import { Route ,BrowserRouter as Router , Routes } from "react-router-dom";

import Navbar from "./component/Navbar";

import { Home, About , Contact } from "./pages";

const App = () => {
  return (
    <main>
      <Router>
         <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
                    
        </Routes>
      </Router>

    </main>
  )
}

export default App
