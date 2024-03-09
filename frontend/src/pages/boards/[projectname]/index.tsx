import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import BoardSideBar from '@/components/Sidebar/board_sidebar';
import Link from 'next/link';

const ProjectBoard = () => {

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [showModal, setShowModal] = useState(false);
  const [todoLists, setTodoLists] = useState([]);
  const router = useRouter();
  const { projectname, ProjectId , } = router.query; 
  const handleAddTodoList =  async() => {
    try {
        const response = await axios.post(`${apiUrl}/todolist`,{
            name: projectname,
            ProjectId:ProjectId,
        });
    } catch (error) {
        console.error('Error occurred:', error);
    }
  };

  return (
    <div className='flex'>
      <BoardSideBar/>
      {/* <h1>Project: {projectname}</h1> */}
      
      {/* Button to add a todo list */}

    
    <div className='mt-16 ml-10 '>
    <div className="text-sm breadcrumbs">
      <ul>
      <li><Link href="/workspace">Workspace</Link></li>
      {/* <li><Link href="/boards">Boards</Link></li> */}
      <li>{projectname} board</li>
      </ul>
    </div>

      <div className='flex'>
        {/*  First List  permanent  */}
        <div className='bg-slate-200 w-[200px]  h-[750px] rounded-lg mt-14 '>
        {/* List Name  */}
        <div className='p-4 flex justify-center'> 
            Todo List 
        </div>
        <div className='  w-[200px]  max-h-[650px] overflow-x-auto'>

      
        </div>

        {/* Add New  Task Button */}
        <div
          className="  btn bg-slate-200  shadow-none text-[15px] font-[200] w-[100%]"
          onClick={() => setShowModal(true)}
        >
          ➕ New Task
        </div>
        </div>

        {/* Other User Made Lists */}

        <div className=' w-[250px] h-[50px] bg-slate-200 mt-14 ml-10 rounded-lg'>
        <div className='flex justify-center   btn' onClick={() => setShowModal(true)}>
          <p>➕ Add New List</p> 
        </div>
        
          
        </div> 
      </div>


    </div>
     

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
      {/* <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          {todoLists.map((todoList, index) => (
            <li key={index}>{todoList.name}</li>
          ))}
        </ul>
      </div>

      {/* Display todo lists in the main content area */}
      {/* <div className="main-content">
        <h2>Main Content</h2>
        <ul>
          {todoLists.map((todoList, index) => (
            <li key={index}>{todoList.name}</li>
          ))}
        </ul>
      </div>  */}

    </div>
  );
};

export default ProjectBoard;
