import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => {
        console.error('Error fetching data:', error)
        window.alert('Failed to fetch data. Please try again later.');
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", marginTop: "30px" }}>
      <h2>Employee Data Table</h2>
      <table
        border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%", boxSizing: "border-box", borderBottom: "3px solid rgba(21, 100, 71, 1)", borderRight: "0px", borderLeft: "0px", }}>
        <thead>
          <tr style={{ backgroundColor: "rgba(21, 100, 71, 1)" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data && data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => { if (currentPage > 1) setCurrentPage(currentPage - 1) }}
          style={{ backgroundColor: "rgba(21, 100, 71, 1)", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px" }}
        >
          Previous
        </button>
        <span
          style={{ margin: "0 15px", backgroundColor: "rgba(21, 100, 71, 1)", color: "white", padding: "10px", border: "none", borderRadius: "4px" }}
        >
          {currentPage}
        </span>
        <button
          onClick={() => { if (currentPage < Math.ceil(data.length / itemsPerPage)) setCurrentPage(currentPage + 1) }}
          style={{ backgroundColor: "rgba(21, 100, 71, 1)", color: "white", padding: "5px 10px", border: "none", borderRadius: "4px" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
