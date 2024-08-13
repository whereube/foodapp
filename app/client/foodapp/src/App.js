import './App.css';
import './recipe/createRecipeForm.css';
import CreatorPage from './creator/CreatorPage';
import RecipeForm from './recipe/createRecipeForm';

function App() {
  return (
    <div className="App">
      <CreatorPage/>
      <RecipeForm/>
    </div>
  );
}

export default App;
