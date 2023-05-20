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
    if (e.target.name === 'image') {
      // Special handling for file input
      // Convert file to base64 string
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = function () {
        // reader.result contains the base64 string
        setFormData({ ...formData, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pgn = new Pgn(formData.pgnText);
    const parsedJson = pgn.parseData();
    const createdAt = new Date().toISOString();

    // Prepare the data as a regular JavaScript object
    const data = {
      title: formData.title,
      description: formData.description,
      image: formData.image,  // This is now a base64 string
      pgnText: formData.pgnText,
      pgndata: parsedJson,
      createdat: createdAt
    };

    console.log(data);
    
    // Convert to JSON and send with axios
    await axios.post('/api/courses', JSON.stringify(data), {
        headers: {
            'Content-Type': 'application/json',
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
