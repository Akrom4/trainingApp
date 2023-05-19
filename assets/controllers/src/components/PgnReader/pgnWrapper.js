import React, { useState } from 'react';
import { Pgn } from '../../models';
import axios from 'axios';

const CoursesForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null, // Set initial state to null
    pgnText: '',
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') { // Special handling for file input
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pgn = new Pgn(formData.pgnText);
    const parsedJson = pgn.parseData();
    const createdAt = new Date().toISOString();

    // Send the data to Symfony backend
    const data = new FormData(); // Use FormData for file uploads
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('image', formData.image);
    data.append('pgnText', formData.pgnText);
    data.append('pgndata', parsedJson);
    data.append('createdat', createdAt);

    console.log(data);
    await axios.post('/api/courses', data, {
      headers: {
        'Content-Type': 'multipart/form-data' // Required header for file uploads
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-md-6">
        <label htmlFor="title" className="form-label">Titre</label>
        <input
          type="text"
          name="title"
          id="title"
          required
          value={formData.title}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-md-6">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-6">
        <label htmlFor="image" className="form-label">Image:</label>
        <input
          type="file"
          name="image"
          id="image"
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="col-12">
        <label htmlFor="pgnText" className="form-label">Fichier Pgn</label>
        <textarea
          name="pgnText"
          id="pgnText"
          value={formData.pgnText}
          onChange={handleChange}
          className="form-control"
        ></textarea>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
    </form>

  );
};

export default CoursesForm;
