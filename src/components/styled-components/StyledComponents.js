
import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 20px;
`;

export const NavigationBox = styled.div`
  flex: 1;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  text-align: center;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 400px; /* Increase the height to make the boxes taller */
  min-width: 550px;
  width: 40%; /* Increase the width to 40% of the parent container */
  margin: 0 2%; /* Add margin between the boxes */

  .image-box {
    width: 100%;
    height: 200%;
    margin: 0 auto;
    overflow: hidden;
  }
  .image-box img {
    max-width: 150%;
    max-height: 150%;
    object-fit: cover;
  }

  h2 {
    font-size: 20px;
    margin-top: 10px;
  }

  p {
    font-size: 14px;
    margin: 10px 0;
  }

  &:hover {
    transform: scale(1.05);
  }

  &:last-child {
    margin-right: 0; /* Remove the right margin for the last box */
  }
`;

 
  ;
