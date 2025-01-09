import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const App = () => {
  const url =
    'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json';
  const itemsPerPage = 5;

  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);

  // Function to fetch project data
  const fetchProjectsData = useCallback(async () => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching project data.');
    }
  }, [url]);

  // Fetch data once the component mounts
  useEffect(() => {
    fetchProjectsData();
  }, [fetchProjectsData]);

  // Calculate the projects to be displayed for the current page
  const displayedProjects = projects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page navigation
  const handleNext = () => {
    if (currentPage < Math.ceil(projects.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle rendering the table rows or an error message
  const renderTableRows = () => {
    if (error) {
      return (
        <tr>
          <td colSpan="3" className="error-message">
            {error}
          </td>
        </tr>
      );
    }

    return displayedProjects.map((project, index) => (
      <tr key={index}>
        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
        <td>{project['percentage.funded']}</td>
        <td>{project['amt.pledged']}</td>
      </tr>
    ));
  };

  return (
    <div className="app">
      <h1>Frontend Assignment</h1>
      <table>
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Percentage Funded</th>
            <th>Amount Pledged</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>

      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === Math.ceil(projects.length / itemsPerPage)}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
