import React, { useState } from 'react';

const RecipeForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_link: '',
    nr_of_people: '', // Initially set to an empty string
    creator_id: '',
    steps: [''] // Initialize with one empty string to show the first step
  });

  // State for form submission status
  const [status, setStatus] = useState(null);

  // State for step limit warning
  const [stepWarning, setStepWarning] = useState(null);

  const MAX_STEPS = 20;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('step')) {
      const index = parseInt(name.split('_')[1], 10);
      setFormData((prevData) => {
        const newSteps = [...prevData.steps];
        newSteps[index] = value;
        return {
          ...prevData,
          steps: newSteps
        };
      });
    } else {
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log form data before sending it
    console.log('Submitting form data:', formData);

    try {
      const response = await fetch('http://localhost:443/recipe/createRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Indicates that the body of the request contains JSON
        },
        body: JSON.stringify(formData) // Convert formData to JSON string
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
        steps: [''] // Reset to one empty step
      });
    } catch (error) {
      setStatus({ success: false, message: error.message });
    }
  };

  return (
    <div id="recipeForm">
      <h1>Create Recipe</h1>
      <form onSubmit={handleSubmit} className="recipeForm">
        <div>
          <label htmlFor="creator_id">Creator ID:</label>
          <input
            type="text"
            id="creator_id"
            name="creator_id"
            value={formData.creator_id}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="title">Title:</label>
          <input
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
            type="number"
            id="nr_of_people"
            name="nr_of_people"
            value={formData.nr_of_people}
            onChange={handleChange}
            min="0" // Optional: Ensures the number is non-negative
          />
        </div>

        {/* Dynamic Steps Input Fields */}
        {formData.steps.map((step, index) => (
          <div key={index}>
            <label htmlFor={`step_${index}`}>Step {index + 1}:</label>
            <input
              type="text"
              id={`step_${index}`}
              name={`step_${index}`}
              value={step}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="button" onClick={addStep} class="plus-button" disabled={formData.steps.length >= MAX_STEPS}>
          +
        </button>

        {stepWarning && (
          <p style={{ color: 'red' }}>{stepWarning}</p>
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
  );
};

export default RecipeForm;
