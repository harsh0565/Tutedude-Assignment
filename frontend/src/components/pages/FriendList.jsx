import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout';

const FriendList = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
     fetchfriends();
  
    }, [])
    const fetchfriends = async () => {
      await axios.get("https://tutedude-backend-jj38.onrender.com/api/v1/friend-list",  { withCredentials: true }).then((res) => {
        console.log(res);
        setFriends(res.data.friends);
        // console.log(res.data.pendingRequests.length);
      }).catch((err) => {
        console.log(err);
      })
    }
    const acceptRequest = async (id) => {
      await axios.put("https://tutedude-backend-jj38.onrender.com/api/v1/accept-req", {id} , { withCredentials: true }).then((res) => {
        console.log(res);
        // console.log(res.data.pendingRequests.length);
      }).catch((err) => {
        console.log(err);
      })
    }
  
  
    return (
      <Layout>
       <center>
         <h1 className='m-5'>
          friend List
         
        </h1>
        </center>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              {/* <th scope="col"></th  > */}
            </tr>
  
          </thead>
          <tbody>
            {friends.map((v, index) => (
              
                <tr key={v._id}>
                  <td>{index+1}</td>
                  <td>{v.name}</td>
                  <td>{v.email}</td>
                  {/* <td>{v._id}</td> */}
                  {/* <td><button className='btn btn-secondary' onClick={() => acceptRequest(v._id)}>AcceptRequest</button></td> */}
                </tr>
            
            ))}
  
          </tbody>
        </table>
      </Layout>
    )
}

export default FriendList
