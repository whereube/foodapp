import './App.css';
import CreatorPage from './creator/CreatorPage';
import ViewRecipe from './recipe/ViewRecipe';
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/recipe/:recipeId"
            element={<ViewRecipe/>}
          ></Route>
          <Route path="/" 
            element={<CreatorPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
