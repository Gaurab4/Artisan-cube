import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProjectBoard = () => {

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [showModal, setShowModal] = useState(false);
  const [todoLists, setTodoLists] = useState([]);
  const router = useRouter();
  const { projectname, ProjectId , } = router.query; 
  console.log(router.query);

  const handleAddTodoList =  async() => {
    try {
        const response = await axios.post(`${apiUrl}/todolist`,{
            name:'Demo',
            ProjectId:ProjectId,
        });
    } catch (error) {
        console.error('Error occurred:', error);
    }
  };

  return (
    <div>
      <h1>Project: {projectname}</h1>
      
      {/* Button to add a todo list */}
      <button
        className="btn btn-primary"
        onClick={() => setShowModal(true)}
      >
        Add Todo List
      </button>

      {/* Modal for adding a todo list */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md max-w-2xl w-full">
            <h2 className="text-lg font-semibold mb-4">Add Todo List</h2>
            {/* Todo list form */}
            <form>
              {/* Form fields for todo list */}
              {/* Example: */}
              <label>
                Todo List Name:
                <input type="text" />
              </label>
              <button type="submit" className="btn btn-primary" onClick={handleAddTodoList}>
                Add Todo List
              </button>
            </form>
            <button onClick={() => setShowModal(false)} className="btn btn-secondary">Close</button>
          </div>
        </div>
      )}

      {/* Display todo lists in the sidebar */}
      <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          {todoLists.map((todoList, index) => (
            <li key={index}>{todoList.name}</li>
          ))}
        </ul>
      </div>

      {/* Display todo lists in the main content area */}
      <div className="main-content">
        <h2>Main Content</h2>
        <ul>
          {todoLists.map((todoList, index) => (
            <li key={index}>{todoList.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectBoard;
