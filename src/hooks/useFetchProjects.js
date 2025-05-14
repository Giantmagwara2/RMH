// src/hooks/useFetchProjects.js
import { useState, useEffect } from 'react';
import { PROJECTS } from '@/constants/index.js'; // Keep this for now

async function fetchProjectsFromApi(category, signal) {
  // Simulated API call with abort support
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      if (signal.aborted) {
        reject(new DOMException('Aborted', 'AbortError'));
        return;
      }

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

    signal.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

function useFetchProjects(category) {
  const [projects, setProjects] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setIsFetching(true);
    setError(null);

    fetchProjectsFromApi(category, signal)
      .then((data) => {
        setProjects(data);
        setIsFetching(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err);
          console.error('Error fetching projects:', err);
        }
        setIsFetching(false);
      });

    return () => controller.abort();
  }, [category]);

  return { projects, isFetching, error };
}

export default useFetchProjects;