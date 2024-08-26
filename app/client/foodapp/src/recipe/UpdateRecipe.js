import './UpdateRecipe.css';
import { useParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import React, { useState, useEffect } from 'react';

const UpdateRecipeForm = () => {
  let { recipeId } = useParams();
  const { user } = useAuth();

  // State to hold the recipe data
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    video_link: '',
    nr_of_people: '',
    creator_id: user.userId,
    steps: [''],
    ingredients: [{ name: '', quantity: '', unit: '' }],
  });

  // State to hold loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState(null);
  const [stepWarning, setStepWarning] = useState(null);
  const [ingredientWarning, setIngredientWarning] = useState(null);

  const MAX_STEPS = 100;
  const MAX_INGREDIENTS = 100;

  // Effect to fetch recipe data on component mount
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:443/recipe/getByRecipeId/' + recipeId);
        if (!response.ok) {
          throw new Error('Failed to fetch recipe data');
        }
        const data = await response.json();
        setRecipe({
            ...data,
            steps: data.steps?.length ? data.steps : [''], // Use optional chaining
            ingredients: data.ingredients?.length ? data.ingredients : [{ name: '', quantity: '', unit: '' }], // Use optional chaining
        });
      } catch (err) {
        console.error('Error fetching recipe data', err);
        setError('Failed to load recipe data.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  // Handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('step_')) {
      // Handle step input changes
      const index = parseInt(name.split('_')[1], 10);
      setRecipe((prevData) => {
        const newSteps = [...prevData.steps];
        newSteps[index] = value;
        return {
          ...prevData,
          steps: newSteps,
        };
      });
    } else if (name.startsWith('ingredient_')) {
      // Handle ingredient input changes
      const [field, index] = name.split('_').slice(1);
      setRecipe((prevData) => {
        const newIngredients = [...prevData.ingredients];
        newIngredients[index] = {
          ...newIngredients[index],
          [field]: value,
        };
        return {
          ...prevData,
          ingredients: newIngredients,
        };
      });
    } else {
      // Handle other form fields
      const newValue = name === 'nr_of_people' ? parseInt(value, 10) : value;
      setRecipe((prevData) => ({
        ...prevData,
        [name]: newValue,
      }));
    }
  };

  // Add a new step input field
  const addStep = () => {
    if (recipe.steps.length >= MAX_STEPS) {
      setStepWarning('You cannot add more than 100 steps.');
      return;
    }
    setRecipe((prevData) => ({
      ...prevData,
      steps: [...prevData.steps, ''],
    }));
    setStepWarning(null);
  };

  // Remove the last step input field
  const removeLastStep = () => {
    if (recipe.steps.length > 1) {
      setRecipe((prevData) => {
        const newSteps = [...prevData.steps];
        newSteps.pop();
        return {
          ...prevData,
          steps: newSteps,
        };
      });
    }
  };

  // Add a new ingredient input field
  const addIngredient = () => {
    if (recipe.ingredients.length >= MAX_INGREDIENTS) {
      setIngredientWarning('You cannot add more than 100 ingredients.');
      return;
    }
    setRecipe((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: '', quantity: '', unit: '' }],
    }));
    setIngredientWarning(null);
  };

  // Remove the last ingredient input field
  const removeLastIngredient = () => {
    if (recipe.ingredients.length > 1) {
      setRecipe((prevData) => {
        const newIngredients = [...prevData.ingredients];
        newIngredients.pop();
        return {
          ...prevData,
          ingredients: newIngredients,
        };
      });
    }
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/updateRecipe', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: recipeId,  // Recipe ID is passed separately
          ...recipe
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update recipe');
      }

      alert('Recipe updated successfully!');
    } catch (err) {
      console.error('Error updating recipe', err);
      setError('Failed to update recipe.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="form-container">
      <div id="recipeForm">
        <h1>Update Recipe</h1>
        <form onSubmit={handleSubmit} className="recipeForm">
          <h3>Basic information</h3>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              className="input-fields"
              type="text"
              id="title"
              name="title"
              value={recipe.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <textarea 
              id="description"
              name="description"
              value={recipe.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="video_link">Video Link:</label>
            <input
              className="input-fields"
              type="text"
              id="video_link"
              name="video_link"
              value={recipe.video_link}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="nr_of_people">Number of People:</label>
            <input
              className="input-fields"
              type="number"
              id="nr_of_people"
              name="nr_of_people"
              value={recipe.nr_of_people}
              onChange={handleChange}
              min="0"
            />
          </div>

          <h3>Ingredients</h3>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-div">
              <h4 className="number-label">#{index + 1}</h4>
              <label htmlFor={`ingredient_name_${index}`}>Name:</label>
              <input
                className="input-fields"
                type="text"
                id={`ingredient_name_${index}`}
                name={`ingredient_name_${index}`}
                value={ingredient.name}
                onChange={handleChange}
              />
              <label htmlFor={`ingredient_quantity_${index}`}>Quantity:</label>
              <input
                className="input-fields"
                type="number"
                id={`ingredient_quantity_${index}`}
                name={`ingredient_quantity_${index}`}
                value={ingredient.quantity}
                onChange={handleChange}
              />
              <label htmlFor={`ingredient_unit_${index}`}>Unit:</label>
              <select
                className="input-fields"
                id={`ingredient_unit_${index}`}
                name={`ingredient_unit_${index}`}
                value={ingredient.unit}
                onChange={handleChange}
              >
                <option value="">Select unit</option>
                <option value="g">grams (g)</option>
                <option value="kg">kilograms (kg)</option>
                <option value="mg">milligrams (mg)</option>
                <option value="l">liters (l)</option>
                <option value="ml">milliliters (ml)</option>
                <option value="cup">cup</option>
                <option value="tbsp">tablespoon (tbsp)</option>
                <option value="tsp">teaspoon (tsp)</option>
                <option value="pinch">pinch</option>
              </select>
            </div>
          ))}
          <button type="button" className="add-button" onClick={addIngredient}>
            Add Ingredient
          </button>
          <button type="button" className="remove-button" onClick={removeLastIngredient}>
            Remove Ingredient
          </button>
          {ingredientWarning && <p className="warning">{ingredientWarning}</p>}

          <h3>Steps</h3>
          {recipe.steps.map((step, index) => (
            <div key={index} className="step-div">
              <h4 className="number-label">#{index + 1}</h4>
              <textarea
                className="input-fields"
                id={`step_${index}`}
                name={`step_${index}`}
                value={step}
                onChange={handleChange}
              />
            </div>
          ))}
          <button type="button" className="add-button" onClick={addStep}>
            Add Step
          </button>
          <button type="button" className="remove-button" onClick={removeLastStep}>
            Remove Step
          </button>
          {stepWarning && <p className="warning">{stepWarning}</p>}

          <div>
            <button className="update-button" type="submit">Update Recipe</button>
          </div>
        </form>
        {status && <p className="status-message">{status}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default UpdateRecipeForm;
