// src/hooks/useFetchProjects.js
import { useState, useEffect } from 'react';
import { PROJECTS } from '../../constants'; // Keep this for now

// Assume this is the base URL of your future API
const API_BASE_URL = '/api'; // Placeholder

async function fetchProjectsFromApi(category) {
  // In a real implementation, you would use fetch or a library like Axios here
  // Example using fetch:
  // let url = `${API_BASE_URL}/projects`;
  // if (category && category !== 'All') {
  //   url += `?category=${category}`;
  // }
  // const response = await fetch(url);
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }
  // const data = await response.json();
  // return data;

  // For now, we'll simulate an API call using our local data
  return new Promise((resolve) => {
    setTimeout(() => {
      let filteredProjects = [];
      if (category === 'All') {
        filteredProjects = PROJECTS;
      } else {
        filteredProjects = PROJECTS.filter(
          (project) =>
            project.category &&
            project.category.toLowerCase() === category.toLowerCase()
        );
      }
      resolve(filteredProjects);
    }, 500);
  });
}

function useFetchProjects(category) {
  const [projects, setProjects] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsFetching(true);
    setError(null);

    fetchProjectsFromApi(category)
      .then((data) => {
        setProjects(data);
        setIsFetching(false);
      })
      .catch((err) => {
        setError(err);
        setIsFetching(false);
        console.error('Error fetching projects:', err);
      });
  }, [category]);

  return { projects, isFetching, error };
}

export default useFetchProjects;