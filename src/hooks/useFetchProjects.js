// src/hooks/useFetchProjects.js
import { useState, useEffect } from 'react';
import { PROJECTS } from '@/constants/index.js'; // Keep this for now

/**
 * @typedef {object} Project
 * @property {string|number} id - The unique identifier for the project.
 * @property {string} title - The title of the project.
 * @property {string} category - The category of the project.
 * @property {string} [excerpt] - A short description or excerpt of the project.
 * @property {string} [image] - URL for the project's image.
 * @property {string} [link] - URL to the project details or live site.
 */

/**
 * Simulates fetching projects from an API with optional category filtering and abort signal support.
 * @param {string} category - The category to filter projects by. 'All' fetches all projects.
 * @param {AbortSignal} signal - The AbortSignal to cancel the request.
 * @returns {Promise<Project[]>} A promise that resolves to an array of projects.
 */

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

/**
 * Custom hook to fetch projects based on a category.
 * Handles loading states, errors, and request cancellation on unmount or category change.
 *
 * @param {string} category - The category of projects to fetch. Pass 'All' to fetch all projects.
 * @returns {{
 *   projects: Project[],
 *   isFetching: boolean,
 *   error: Error | null
 * }} An object containing the fetched projects, loading state, and any error encountered.
 */
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
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
          console.error('Error fetching projects:', err);
        }
        setIsFetching(false);
      });

    return () => controller.abort();
  }, [category]);

  return { projects, isFetching, error };
}

export default useFetchProjects;