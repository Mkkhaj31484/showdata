
import './App.css';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Summary from './components/Summary';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/summary/:id" element={<Summary/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
