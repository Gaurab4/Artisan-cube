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
  const [showEditModal, setShowEditModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false); // New state for warning modal
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showDropdown, setShowDropdown] = useState<null | string>( null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch projects when the component mounts
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/project`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleOptionsClick = (project: Project) => {
    setShowDropdown(project?.id);
    setSelectedProject(project);
  };
  useEffect(() => {
    if (selectedProject) {
      setProjectName(selectedProject.name); 
    }
  }, [selectedProject]);

  const handleEditProjectName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setShowDropdown(null);
    try {
    
      const response = await axios.put(`${apiUrl}/project/${selectedProject?.id}`, {
        name: projectName,
      });
      setShowEditModal(false);
      setProjects(prevProjects =>
        prevProjects.map(proj =>
          proj.id === selectedProject?.id ? { ...proj, name: projectName } : proj
        )
      );
    } catch (error) {
      console.error('Error updating project name:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      const response = await axios.delete(`${apiUrl}/project/${selectedProject?.id}`);
      setShowDropdown(null);
      setProjects(prevProjects => prevProjects.filter(proj => proj.id !== selectedProject?.id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
    setShowWarningModal(false); // Close warning modal after deletion
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.post(`${apiUrl}/project`, {
          name: projectName,
          userID: userId,
        });
        if (response.status === 201) {
          router.push('/boards');
        }
      } catch (error) {
        console.error('Error occurred:', error);
      } finally {
        setIsLoading(false);
      }
    }, 2000);
  };
  const handleProjectClick = (project: Project) => {
    const projectNameWithoutSpaces = encodeURIComponent(project.name.replace(/\s/g, ''));
    router.push(`/boards/${projectNameWithoutSpaces}`);
  };
  
  

  return (
    <div style={{ marginTop: 30, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
      <div
        className="card h-32 w-60 cursor-pointer"
        style={{ backgroundColor: '#E3E3E3', alignItems: 'center', display: 'flex', justifyContent: 'center' }}
        onClick={() => setShowModal(true)}
      >
        Add a new project
      </div>

      {projects.map((project) => (
        <div key={project.id} className="relative card h-32 w-60" onClick={() => handleProjectClick(project)} style={{ backgroundColor: '#E3E3E3', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
          <div>{project.name}</div>
          <div className="absolute top-0 right-0 p-2 cursor-pointer" onClick={() => handleOptionsClick(project)}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 4a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" clipRule="evenodd" />
            </svg>
          </div>
          {showDropdown === project.id && (
            <div className="dropdown-container absolute top-8 right-0 bg-white border rounded-md shadow-md p-2">
              <div className="cursor-pointer" onClick={() => setShowEditModal(true)}>
                Edit Project Name
              </div>
              <div className="cursor-pointer" onClick={() => {
                setSelectedProject(project);
                setShowWarningModal(true);
              }}>
                Delete Project
              </div>
            </div>
          )}
        </div>
      ))}

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

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md max-w-2xl w-full" ref={modalRef}>
            <h2 className="text-lg font-semibold mb-4">Edit Project Name</h2>
            <form onSubmit={handleEditProjectName}>
              <div className="mb-4">
                <label htmlFor="editProjectName" className="block text-sm font-medium text-gray-700">
                  New Project Name
                </label>
                <input
                  type="text"
                  id="editProjectName"
                  className="mt-1 p-2 w-full border rounded-md"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              {isLoading ? (
                <div className="animate-pulse">
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              ) : (
                <div className="flex justify-end">
                  <button type="button" className="mr-4 px-4 py-2 border rounded-md hover:bg-gray-100" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    Save
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Warning Modal for Deleting Project */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md max-w-2xl w-full" ref={modalRef}>
            <h2 className="text-lg font-semibold mb-4">Warning!</h2>
            <p>Are you sure you want to delete this project?</p>
            <div className="flex justify-end mt-4">
              <button type="button" className="mr-4 px-4 py-2 border rounded-md hover:bg-gray-100" onClick={() => setShowWarningModal(false)}>
                Cancel
              </button>
              <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" onClick={handleDeleteProject}>
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
