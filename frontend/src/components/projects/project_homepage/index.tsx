import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

type ProjectProps = {
  userId: string | null;
};

type Project = {
  id: string;
  name: string;
  description: string;
};


const Projects = ({ userId }: ProjectProps) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    // Fetch projects when the component mounts
    fetchProjects();
    
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/project`);
      console.log(response);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleSubmit = async (e :  React.FormEvent<HTMLFormElement>) => {  
  e.preventDefault();
  setIsLoading(true)
  setTimeout(async () => {
    try {
      // Make API call to post the data
      const response = await axios.post(`${apiUrl}/project`, {
        name: projectName,
       userID: userId,
      });
      if (response.status === 201) {
      
      const projectNameSlug = projectName.toLowerCase().replace(/\s+/g, '-'); // Convert project name to URL slug
          
      router.push('/boards')
        
      }

    } catch (error) {
      console.error('Error occurred:', error);
    } finally {
      setIsLoading(false);

    }
  },2000);
  };

  return (
    <div style={{  marginTop: 30, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px'  }}>
      {/* Card with click event to open modal */}
      <div
        className="card h-32 w-60 cursor-pointer"
        style={{ backgroundColor: '#E3E3E3', alignItems: 'center', display: 'flex', justifyContent: 'center' }}
        onClick={() => setShowModal(true)}
      >
        Add a new project
      </div>


       {/* Display existing projects */}
      {projects.map((project) => (
        <div key={project.id} className="card h-32 w-60 cursor-pointer" style={{backgroundColor: '#E3E3E3', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          {project.name}
          {/* Add more project details as needed */}
        </div>
      ))}

      

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md max-w-2xl w-full" ref={modalRef}>
            <h2 className="text-lg font-semibold mb-4">Add New Project</h2>
            {isLoading ? (
              <div className="animate-pulse">
                <span className="loading loading-dots loading-lg"></span>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">
                    Project Name
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    className="mt-1 p-2 w-full border rounded-md"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">
                    Project Description
                  </label>
                  <textarea
                    id="projectDescription"
                    className="mt-1 p-2 w-full border rounded-md"
                    rows={2}
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                  />
                </div>
                {/* Add more form fields as needed */}
                <div className="flex justify-end">
                  <button type="button" className="mr-4 px-4 py-2 border rounded-md hover:bg-gray-100" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Add Project
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Projects;
