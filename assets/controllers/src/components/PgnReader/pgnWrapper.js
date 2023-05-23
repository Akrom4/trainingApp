import React, { useState, useEffect } from 'react';
import { Pgn } from '../../models';
import axios from 'axios';

const ChapterForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    pgnText: '',
  });
  const [chapter, setChapter] = useState(null);

  useEffect(() => {
    axios.get('/api/courses')
      .then(response => {
        setCourses(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Erreur d\'accès à la liste des cours  !', error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const chapterId = document.getElementById('pgn-wrapper').dataset.chapterId;
    if (chapterId) {
      fetch('/api/chapter/' + chapterId)
        .then(response => response.json())
        .then(data => {
          setChapter(data);
          setFormData({
            courseId: data.courseId,
            title: data.title,
            rawpgn: data.rawpgn,
            pgnText: data.pgndata
          });
        });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const pgn = new Pgn(formData.pgnText);
    const parsedJson = pgn.parseData();
    const createdAt = new Date().toISOString();

    const data = {
      course: '/api/courses/' + formData.courseId,
      title: formData.title,
      rawpgn: formData.pgnText,
      pgndata: parsedJson,
    };

    console.log(data);

    if (chapter) {
      await axios.put('/api/chapters/' + chapter.id, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    } else {
      await axios.post('/api/chapters', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        }
      });
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
        <label htmlFor="courseId" className="form-label">Course</label>
        <select
          name="courseId"
          id="courseId"
          required
          value={formData.courseId}
          onChange={handleChange}
          className="form-control"
        >{courses && courses['hydra:member'].map((course) => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </div>
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
        <button type="submit" className="btn btn-primary mb-2 mt-2">Ajouter</button>
      </div>
      </form>
    );
  }
};

export default ChapterForm;


