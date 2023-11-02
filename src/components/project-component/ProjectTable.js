import React, { useState , useEffect} from "react";
import { Link } from "react-router-dom";
import Modal from "../styled-components/Modal";
import Button from "../styled-components/Button";
import Pagination from "../styled-components/Pagination"; // Import the Pagination component
import AssignUsersModal from "../styled-components/AssignUserModal";

export default function ProjectTable({ projects, onEdit, onDelete }) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [assignUsersModalOpen, setAssignUsersModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
 const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  

  const openDeleteModal = (projectId) => {
    setSelectedProjectId(projectId);
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedProjectId(null);
    setOpenModal(false);
  };

  const openAssignUsersModal = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    setSelectedUsers(project.selectedUsers || []);
    setSelectedProjectId(projectId);
    setAssignUsersModalOpen(true);
  };

  const closeAssignUsersModal = () => {
    setSelectedProjectId(null);
    setAssignUsersModalOpen(false);
  };

  

  const handleAssignUsersConfirm = () => {
    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProjectId) {
        return {
          ...project,
          selectedUsers: selectedUsers,
        };
      } 
      return project;
    });

    // Update local storage or your data management logic here
    localStorage.setItem("projectData", JSON.stringify(updatedProjects));

    closeAssignUsersModal();

     setSelectedUsers(selectedUsers);
  };

  const userData = JSON.parse(localStorage.getItem("userData")) || [];

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projects.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
      localStorage.setItem("currentPage", pageNumber);
  };

  return (
    <>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Priority</th>
              <th>Tech Stack</th>
              <th>Users</th>
              <th>Edit</th>
              <th>Assign Users</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((project, index) => (
              <tr key={project.id}>
                <td>{index + 1}</td>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.priority}</td>
                <td>{project.techStack}</td>
                <td>
                  {project.selectedUsers.length > 0 ? (
                    project.selectedUsers.map((userId) => {
                      const user = userData.find((u) => u.id === userId);
                      return <div key={userId}>{user.name}</div>;
                    })
                  ) : (
                    <div>Yet to be assigned</div>
                  )}
                </td>
                <td>
                  <Link to={`/editproject/${project.id}`}>
                    <Button>Edit</Button>
                  </Link>
                </td>
                <td>
                  <Button onClick={() => openAssignUsersModal(project.id)}>
                    Assign Users
                  </Button>
                </td>
                <td>
                  <Button onClick={() => openDeleteModal(project.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <Modal
          open={openModal}
          onClose={closeDeleteModal}
          onConfirm={() => {
            onDelete(selectedProjectId);
            closeDeleteModal();
          }}
        />
      </div>
      <AssignUsersModal
        open={assignUsersModalOpen}
        onClose={closeAssignUsersModal}
        selectedUsers={selectedUsers}
        setSelectedUsers={setSelectedUsers}
        onConfirm={handleAssignUsersConfirm}
        userData={userData}
  // Pass the function
      />
    </>
  );
}
