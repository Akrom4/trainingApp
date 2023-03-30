import React, { useState } from 'react';
import { Pgn } from '../../models';


const CoursesForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    pgnText: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Compute PGN data here
    const pgn = new Pgn(formData.pgnText);
    const parsedJson = pgn.parseData();

    // Send the data to Symfony backend
    const data = { ...formData, pgnData: parsedJson };
    // await axios.post('/your-symfony-endpoint', data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image:</label>
        <input
          type="text"
          name="image"
          id="image"
          value={formData.image}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="pgnText">Fichier Pgn:</label>
        <textarea
          name="pgnText"
          id="pgnText"
          value={formData.pgnText}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CoursesForm;
