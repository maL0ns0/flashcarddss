import Layout from "./components/Layout"
import {Routes, Route} from 'react-router-dom'
import Topics from './features/topics/Topics'

function App() {
  return(
    <Routes>
      <Route path="/" element={<Layout />}/>
      <Route index element={<Topics/>} />
      
      <Route path="topics">
        <Route index element={<Topics/>} />
      </Route>

    </Routes>
  );
}

export default App
