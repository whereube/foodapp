import './App.css';
import CreatorPage from './creator/CreatorPage'
import RecipeForm from './recipe/createRecipeForm.js';
import ViewRecipe from './recipe/ViewRecipe.js';
import NewCreator from './creator/NewCreator.js';
import Login from './creator/Login.js';
import {AuthProvider, useAuth} from './auth/AuthProvider.js';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/recipe/:recipeId"
                element={<ViewRecipe/>}
              ></Route>
              <Route path="/" 
                element={<CreatorPage />}
              ></Route>
              <Route path="/recipe/create"
                element={<ProtectedRoute><RecipeForm /></ProtectedRoute>}
              ></Route>
              <Route path="/creator/new" 
                element={<NewCreator />}
              ></Route>
              <Route path="/login" 
                element={<Login />}
              ></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  // If authenticated, return the children components
  return children;
}

export default App;
