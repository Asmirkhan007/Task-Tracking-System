import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserDetailsPresentation from "../presentation/UserDetails";

const UserDetailsContainer = () => {
  const { id } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [projectDetails, setProjectDetails] = useState(null);

  useEffect(() => {
    // Fetch user details from local storage based on the user ID
    const fetchUserDetails = () => {
      try {
        // Assuming user data is stored in localStorage under the key 'userData'
        const userDataFromStorage = JSON.parse(
          localStorage.getItem("userData")
        );
        const dummyProjects = JSON.parse(localStorage.getItem("projectData"));
        if (dummyProjects) {
          setProjectDetails(dummyProjects);
        }
        if (userDataFromStorage) {
          // Find the user with the matching ID
          const user = userDataFromStorage.find((user) => user.id === id);
          if (user) {
            setUserDetails(user);
          } else {
            // Handle case where user with the specified ID is not found
            console.error("User not found");
          }
        } else {
          // Handle case where user data is not available in local storage
          console.error("User data not found in local storage");
        }
      } catch (error) {
        console.error("Error fetching user details", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!userDetails) {
    // Render loading state or handle no user details
    return <p>Loading...</p>;
  }

  return (
    <UserDetailsPresentation
      userDetails={userDetails}
      projectDetails={projectDetails}
    />
  );
};

export default UserDetailsContainer;
