import React, { useState } from 'react';

const RecipeForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_link: '',
    nr_of_people: ''
  });

  // State for form submission status
  const [status, setStatus] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:443/recipe/createRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
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
        nr_of_people: ''
      });
    } catch (error) {
      setStatus({ success: false, message: error.message });
    }
  };

  return (
    <div>
      <h1>Create Recipe</h1>
      <form onSubmit={handleSubmit}>
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
          />
        </div>

        <button type="submit">Create Recipe</button>
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
