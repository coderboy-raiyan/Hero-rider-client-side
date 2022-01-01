import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";

const override = css`
  display: block;
  margin: 20px auto;
`;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const size = 10;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/users?page=${page}&&size=${size}`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setFiltered(data.users);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page]);

  // handelEmail
  const handelEmail = (e) => {
    const email = e.target.value;
    if (email) {
      const filter = users.filter((user) =>
        user.email.toLowerCase().includes(email.toLowerCase())
      );
      setUsers(filter);
    } else {
      setUsers(filtered);
    }
  };
  const handelNumber = (e) => {
    const number = e.target.value;
    if (number) {
      const filter = users.filter((user) =>
        user.number.toLowerCase().includes(number.toLowerCase())
      );
      setUsers(filter);
    } else {
      setUsers(filtered);
    }
  };

  const handelName = (e) => {
    const name = e.target.value;
    if (name) {
      const filter = users.filter((user) =>
        user.displayName.toLowerCase().includes(name.toLowerCase())
      );
      setUsers(filter);
    } else {
      setUsers(filtered);
    }
  };

  return (
    <div className="">
      <div className="bg-white py-5 shadow my-4 px-4 rounded">
        <h1 className="text-2xl mb-3">Search</h1>
        <div className=" flex space-x-3">
          <input
            type="text"
            className="form-input w-2/3 py-3"
            placeholder="search by email"
            onChange={handelEmail}
          />
          <input
            type="text"
            className="form-input w-2/3 py-3"
            placeholder="search by phone number"
            onChange={handelNumber}
          />
          <input
            type="text"
            className="form-input w-2/3 py-3"
            placeholder="search by name"
            onChange={handelName}
          />
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Age</th>
            <th>Vehicle Type</th>
            <th>Car/Bike Model</th>
            <th>User Type</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>
                <Spinner animation="border" />
              </td>
            </tr>
          ) : (
            users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.displayName}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>{user.age}</td>
                  <td>{user.vehicle_type}</td>
                  <td>{user.car_model}</td>
                  <td>{user.user_type}</td>
                  <td className="text-xs">{user.payment}</td>
                  <td>
                    <input type="checkbox" name="" id="" />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>
      <div>
        <ul className="flex py-3">
          {[...Array(pageCount).keys()].map((num) => {
            return (
              <li key={num}>
                <button
                  onClick={() => setPage(num)}
                  className={
                    page === num
                      ? "bg-gray-300 py-2 px-5 border-1 mr-2 "
                      : "bg-gray-100 py-2 px-5 border-1 mr-2"
                  }
                >
                  {num + 1}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Users;
