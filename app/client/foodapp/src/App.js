import './App.css';
import CreatorPage from './creator/CreatorPage'
import RecipeForm from './recipe/createRecipeForm.js';
import ViewRecipe from './recipe/ViewRecipe.js';
import NewCreator from './creator/NewCreator.js';
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
          <Route path="/recipe/create" 
            element={<RecipeForm />}
          ></Route>
          <Route path="/creator/new" 
            element={<NewCreator />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
