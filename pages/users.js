import React from "react";

const Users = ({ users }) => {
  return (
    <div>
      <h1>Daftar Pengguna: </h1>
      {users.map((user) => (
        <div key={user.id}>
          <h2>Id: {user.id}</h2>
          <h2>Nama: {user.name}</h2>
          <h2>Username: {user.username}</h2>
          <h2>Email: {user.email}</h2>
        </div>
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();

  return {
    props: {
      users,
    },
  };
}

export default Users;
