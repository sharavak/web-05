

import FetchData from './FetchData'
import { useState } from "react";
import "./Home.css";
import Hero from './Hero'


const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }


  return (
    <div>
      <Hero />
      <FetchData page={currentPage} />
      <div id="pagination" className="pagination-container">
        <button onClick={() => handlePageChange(currentPage - 1)} className="pagination-button">Previous</button>
        <span className="pagination-page">Page {currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} className="pagination-button">Next</button>
      </div>

    </div>
  );
};

export default Home;
