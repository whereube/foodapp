import React, { useState } from 'react';

const RecipeForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_link: '',
    nr_of_people: '', // Initially set to an empty string
    creator_id: '',
    steps: [''], // Initialize with one empty string to show the first step
    ingredients: [{ name: '', quantity: '', unit: '' }] // Initialize with one ingredient
  });

  // State for form submission status
  const [status, setStatus] = useState(null);

  // State for step and ingredient limit warnings
  const [stepWarning, setStepWarning] = useState(null);
  const [ingredientWarning, setIngredientWarning] = useState(null);

  const MAX_STEPS = 20;
  const MAX_INGREDIENTS = 20;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name.startsWith('step_')) {
      // Handle step input changes
      const index = parseInt(name.split('_')[1], 10);
      setFormData((prevData) => {
        const newSteps = [...prevData.steps];
        newSteps[index] = value;
        return {
          ...prevData,
          steps: newSteps
        };
      });
    } else if (name.startsWith('ingredient_')) {
      // Handle ingredient input changes
      const [field, index] = name.split('_').slice(1);
      setFormData((prevData) => {
        const newIngredients = [...prevData.ingredients];
        newIngredients[index] = {
          ...newIngredients[index],
          [field]: value
        };
        return {
          ...prevData,
          ingredients: newIngredients
        };
      });
    } else {
      // Handle other form fields
      const newValue = name === 'nr_of_people' ? parseInt(value, 10) : value;
      setFormData((prevData) => ({
        ...prevData,
        [name]: newValue
      }));
    }
  };

  // Add a new step input field
  const addStep = () => {
    if (formData.steps.length >= MAX_STEPS) {
      setStepWarning('You cannot add more than 20 steps.');
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      steps: [...prevData.steps, '']
    }));
    setStepWarning(null); // Clear the warning if adding is successful
  };

  // Remove the last step input field
  const removeLastStep = () => {
    if (formData.steps.length > 1) {
      setFormData((prevData) => {
        const newSteps = [...prevData.steps];
        newSteps.pop();
        return {
          ...prevData,
          steps: newSteps
        };
      });
    }
  };

  // Add a new ingredient input field
  const addIngredient = () => {
    if (formData.ingredients.length >= MAX_INGREDIENTS) {
      setIngredientWarning('You cannot add more than 20 ingredients.');
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: '', quantity: '', unit: '' }]
    }));
    setIngredientWarning(null); // Clear the warning if adding is successful
  };

  // Remove the last ingredient input field
  const removeLastIngredient = () => {
    if (formData.ingredients.length > 1) {
      setFormData((prevData) => {
        const newIngredients = [...prevData.ingredients];
        newIngredients.pop();
        return {
          ...prevData,
          ingredients: newIngredients
        };
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert steps array to a dictionary with indices as keys
    const stepsDict = formData.steps.reduce((acc, step, index) => {
      acc[index + 1] = step; // Keys are 1-based index
      return acc;
    }, {});

    // Convert ingredients array to a dictionary with indices as keys
    const ingredientsDict = formData.ingredients.reduce((acc, ingredient, index) => {
      acc[index + 1] = {
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit
      };
      return acc;
    }, {});

    // Prepare the form data with steps and ingredients as dictionaries
    const dataToSend = {
      ...formData,
      steps: stepsDict,
      ingredients: ingredientsDict
    };

    try {
      const response = await fetch('http://localhost:443/recipe/createRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Indicates that the body of the request contains JSON
        },
        body: JSON.stringify(dataToSend) // Convert dataToSend to JSON string
      });

      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }

      const result = await response.json();
      setStatus({ success: true, message: 'Recipe created successfully!' });
      // Clear form fields
      setFormData({
        title: '',
        description: '',
        video_link: '',
        nr_of_people: '', // Clear new field
        creator_id: '',
        steps: [''], // Reset to one empty step
        ingredients: [{ name: '', quantity: '', unit: '' }] // Reset to one empty ingredient
      });
    } catch (error) {
      setStatus({ success: false, message: error.message });
    }
  };

  return (
    <div className="form-container">
      <div id="recipeForm">
        <h1>Create Recipe</h1>
        <form onSubmit={handleSubmit} className="recipeForm">
          <div>
            <label htmlFor="creator_id">Creator ID:</label>
            <input
              className="input-fields"
              type="text"
              id="creator_id"
              name="creator_id"
              value={formData.creator_id}
              onChange={handleChange}
              required
            />
          </div>

          <h3>Basic information</h3>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              className="input-fields"
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="description">Description:</label>
            <textarea 
              id="description"
              name="description"
              value={formData.description}
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
              value={formData.video_link}
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
              value={formData.nr_of_people}
              onChange={handleChange}
              min="0" // Optional: Ensures the number is non-negative
            />
          </div>

          <h3>Ingredients</h3>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-div">
              <h4 class="number-label">#{index + 1}</h4>
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
                <option value="oz">ounces (oz)</option>
                <option value="fl oz">fluid ounces (fl oz)</option>
                <option value="piece">piece</option>
                <option value="pinch">pinch</option>
                <option value="clove">clove</option>
                <option value="slice">slice</option>
                <option value="head">head</option>
                <option value="bundle">bundle</option>
                <option value="bunch">bunch</option>
                <option value="packet">packet</option>
                <option value="can">can</option>
                <option value="jar">jar</option>
                <option value="bottle">bottle</option>
              </select>
            </div>
          ))}

          <div className="button-div" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <button
              type="button"
              onClick={addIngredient}
              className="step-button"
              disabled={formData.ingredients.length >= MAX_INGREDIENTS}
            >
              +
            </button>
            <button
              type="button"
              onClick={removeLastIngredient}
              className="step-button"
              disabled={formData.ingredients.length <= 1}
            >
              -
            </button>
          </div>

          <h3>Cooking Steps</h3>
          {formData.steps.map((step, index) => (
            <div key={index}>
              <label htmlFor={`step_${index}`}>Step {index + 1}:</label>
              <input
                className="input-fields"
                type="text"
                id={`step_${index}`}
                name={`step_${index}`}
                value={step}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="button-div" style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <button
              type="button"
              onClick={addStep}
              className="step-button"
              disabled={formData.steps.length >= MAX_STEPS}
            >
              +
            </button>
            <button
              type="button"
              onClick={removeLastStep}
              className="step-button"
              disabled={formData.steps.length <= 1}
            >
              -
            </button>
          </div>

          

          {stepWarning && (
            <p style={{ color: 'red' }}>{stepWarning}</p>
          )}

          {ingredientWarning && (
            <p style={{ color: 'red' }}>{ingredientWarning}</p>
          )}

          <button type="submit" className="button-50" role="button">
            Create Recipe
          </button>
        </form>

        {status && (
          <div>
            {status.success ? (
              <p style={{ color: 'green' }}>{status.message}</p>
            ) : (
              <p style={{ color: 'red' }}>{status.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeForm;
