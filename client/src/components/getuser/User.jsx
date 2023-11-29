import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./User.css";
import { Link } from 'react-router-dom'



const User = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const fetchData = async() =>{
      const response = await axios.get("http://localhost:8000/api/getall")
      setUsers(response.data);
    }


    fetchData();

  },[])

  const deleteUser = async(userId) => {
    await axios.delete(`http://localhost:8000/api/deleteuser/${userId}`)
    .then((reponses) =>{
      setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
      console.log(reponses)
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  return (
    <div className='userTable'>
      <Link to={"/add"} className='addButton'>Add User</Link>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
            <tr>
                <th>S no.</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => {
              return(
                <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.fname} {user.lname}</td>
                    <td>{user.email}</td>
                    <td className='action'>
                        <button onClick={() => deleteUser(user._id)}><i class="fa-solid fa-user-slash"></i></button>
                        <Link to={`/edit/`+user._id}><i class="fa-solid fa-user-pen"></i></Link>
                    </td>
                </tr>
              )
            })
          }
            
        </tbody>
      </table>
    </div>
  )
}

export default User
