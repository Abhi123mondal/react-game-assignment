import React, { useEffect, useState } from "react";
import "./App.css";
// Component for User 
const About = () => {
  // State for Data
  let [data, setData] = useState([]); 
  // Function For getting data from API
  let getUsersInfo = () => {
    // Fetching API
    let r = fetch("https://jsonplaceholder.typicode.com/posts");
    let s = r.then(function (resp) {
      return resp.json();
    });
    s.then(function (info) {
      console.log(info[0]);
      // Setting the data state from API
      setData(info);
    });
  };
  // Using useEffect Hook for calling function first time after rendering  
  useEffect(() => {
    getUsersInfo();
  }, []);
  // Callback Function of map to Display various data
  function usersData(val, id) {
    return (
      <>
        <div className="wrapper">
          <div className="userBox">
            <p className="title"> {val.title}</p>
            <p className="news">{val.body}</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <p className="Heading">News</p>
      <div className="users">
        {/* Using Map to Display all data from API */}
        {data.map(usersData)}
      </div>
    </>
  );
};

export default About;