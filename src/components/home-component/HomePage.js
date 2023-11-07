import React from "react";
import { Link } from "react-router-dom";
import CustomNavbar from "../styled-components/Navbar";
import styled from "styled-components";
import projectsImage from "../../assets/projects.png";
import usersImage from "../../assets/users.png";
import {
  MainContent,
  NavigationBox,
} from "../styled-components/StyledComponents";

// Styled-components used for layout styling
const GridLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px; /* Adjust the gap between boxes as needed */
`;

// Functional component representing the Home page
const Home = () => {
  return (
    <>
      <CustomNavbar />
      <br />
      <br />
      <MainContent>
        <GridLayout>
          <Link to="/users">
            <NavigationBox>
              <div className="image-box">
                <img src={usersImage} alt="Users" />
              </div>
              <h2>View Users</h2>
              <p>Click here to view existing users.</p>
            </NavigationBox>
          </Link>
          <Link to="/projects">
            <NavigationBox>
              <div className="image-box">
                <img src={projectsImage} alt="Projects" />
              </div>
              <h2>View Projects</h2>
              <p>Click here to view existing projects.</p>
            </NavigationBox>
          </Link>
        </GridLayout>
      </MainContent>
    </>
  );
};

export default Home;
