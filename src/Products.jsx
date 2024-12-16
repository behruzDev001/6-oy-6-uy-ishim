import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skip, setSkip] = useState(0); 
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    axios
      .get(`https://dummyjson.com/users?limit=10&skip=${skip}`)
      .then((res) => {
        setUsers((prevUsers) => [...prevUsers, ...res.data.users]); 
        setLoading(false);
        if (res.data.users.length < 10) setHasMore(false); 
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [skip]);

  const handleSeeMore = () => {
    setSkip((prevSkip) => prevSkip + 10); 
  };

  return (
    <div className="container">
      <h2 className="title">Our Users</h2>
      <div className="wrapper">
        {users.map((user) => (
          <div key={user.id} className="card">
            <img src={user.image} alt={user.firstName} className="image" />
            <h3 className="card-title">
              {user.firstName} {user.lastName}
            </h3>
            <p className="email">Email: {user.email}</p>
            <p className="age">Age: {user.age} years</p>
            <button className="btn">View Profile</button>
          </div>
        ))}
      </div>
      {loading && <div className="spinner"></div>}
      {hasMore && !loading && (
        <button onClick={handleSeeMore} className="see-more-btn">
          See More
        </button>
      )}
    </div>
  );
};

export default Products;
