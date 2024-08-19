import './App.css';
import HomePage from './creator/homepage.js'
import RecipeForm from './recipe/createRecipeForm.js';
import ViewRecipe from './recipe/ViewRecipe.js';
import NewCreator from './creator/NewCreator.js';
import Login from './auth/Login.js';
import CreatorPage from './creator/CreatorPage.js'
import Banner from './creator/Banner.js';
import {AuthProvider, useAuth} from './auth/AuthProvider.js';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
              <Route path="/" element={<HomePage />}/>
              <Route path="/:creatorName" element={<Banner/>}>
                <Route path="" element={<CreatorPage />}/>
                <Route path=":recipeId" element={<ViewRecipe/>}/>
              </Route>
              <Route path="/recipe/create" element={
                <ProtectedRoute>
                  <RecipeForm />
                </ProtectedRoute>
              }
              ></Route>
              <Route path="/creator/new" element={<NewCreator />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" state={{ from: location }}/>;
  }

  // If authenticated, return the children components
  return children;
}

export default App;
