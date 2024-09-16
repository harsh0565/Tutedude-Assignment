import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import axios from 'axios';

const HomePage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    AllUsers();
  }, [])
  const AllUsers = async () => {
    await axios.get("https://tutedude-backend-jj38.onrender.com/api/v1/all-users", { withCredentials: true }).then((res) => {
      console.log(res.data.users);
      setUsers(res.data.users);
      // console.log(res.data.pendingRequests.length);
    }).catch((err) => {
      console.log(err);
    })
  }

  const sendRequest = async(id)=>{
    console.log(id)
    await axios.put("https://tutedude-backend-jj38.onrender.com/api/v1/send-req",{id}, { withCredentials: true }).then((res) => {
      console.log(res);
    
      // console.log(res.data.pendingRequests.length);
    }).catch((err) => {
      console.log(err);
    })
  }
  return (
    <Layout>
      <h1>
        All Users
      </h1>

      <table class="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
          </tr>

        </thead>
        <tbody>
          {users.map((v, index) => (
            
              <tr key={v._id}>
                <td>{index+1}</td>
                <td>{v.name}</td>
                <td>{v.email}</td>
                {/* <td>{v._id}</td> */}
                <td><button className='btn btn-secondary' onClick={() => sendRequest(v._id)}>Send Request</button></td>
              </tr>
          
          ))}

        </tbody>
      </table>
    </Layout>
  )
}

export default HomePage
