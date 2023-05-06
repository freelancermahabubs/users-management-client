import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const loadUsersData = async () => {
      try {
        const jsonData = "http://localhost:5000/users";
        const res = await fetch(jsonData);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    loadUsersData();
  }, []);
  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    console.log(user);
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Inside Post Response", data);
        const newUsers = [...users, data];
        setUsers(newUsers);
        form.reset();
      });
  };
  return (
    <>
      <h1>Users Management System</h1>
      <h3>Numbers of Users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" />
        <br />
        <input type="submit" name="addUser" value="addUser" />
      </form>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {user.id} : {user.name} :{user.email}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
