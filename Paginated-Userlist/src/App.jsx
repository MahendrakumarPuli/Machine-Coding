import React, { useState, useEffect } from "react";

const PaginatedUserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  const pagesPerGroup = 3; // Show 3 page buttons at a time

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data.users))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Determine the pagination window
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);
  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  return (
    <div className="container text-center">
      <h1>Paginated User List</h1>
      <div className="user-list d-flex justify-content-center gap-4 my-5 p-5">
        {currentUsers.map((user) => (
          <div key={user.id} className="user-card col-md-4 border rounded">
            <div>
              <img src={user.image} alt="" className="image my-4" />
            </div>
            <h3 className="heading my-3">{user.firstName} {user.lastName}</h3>
            <p className="text-light my-3"><strong>Email:</strong> {user.email}</p>
            <p className="text-light my-3"><strong>Phone:</strong> {user.phone}</p>
          </div>
        ))}
      </div>

      <div className="pagination justify-content-center">
        {/* Previous Group Button */}
        <button
          className="btn btn-outline-dark mx-1"
          onClick={() => setCurrentPage(startPage - pagesPerGroup)}
          disabled={startPage === 1}
        >
          «
        </button>

        {/* Previous Page Button */}
        <button
          className="btn btn-outline-dark mx-1"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>

        {/* Page Number Buttons */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <button
            className={`btn mx-1 ${currentPage === startPage + index ? "btn-success" : "btn-outline-dark"}`}
            key={startPage + index}
            onClick={() => setCurrentPage(startPage + index)}
          >
            {startPage + index}
          </button>
        ))}

        {/* Next Page Button */}
        <button
          className="btn btn-outline-dark mx-1"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>

        {/* Next Group Button */}
        <button
          className="btn btn-outline-dark mx-1"
          onClick={() => setCurrentPage(startPage + pagesPerGroup)}
          disabled={endPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
};

export default PaginatedUserList;
