import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import TodosList from "@/components/board_compo/todo/todo_list";

type Props = {};

const BoardTodoList = (props: Props) => {
  const router = useRouter();
  const { data } = router.query;
  const ProjectDetails = data ? JSON.parse(data as string) : null;
  const [popUpFlag, setPopUpFlag] = useState(false);
  const apiUrl = "http://localhost:4000" || process.env.NEXT_PUBLIC_API_URL;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todoLists, setTodoLists] = useState<any>();
  const [todo, setTodo] = useState();

  const handleAddTodoList = async () => {
    try {
      const response = await axios.post(`${apiUrl}/todolist`, {
        name: newTodoListName,
        projectId: ProjectDetails?.id,
      });
      fetchTodoList();
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const fetchTodoList = async () => {
    try {
      if(ProjectDetails.id){
        const response = await axios.get(`${apiUrl}/todolist`,{
          params:{
            projectId:ProjectDetails?.id,
          }
        });
        setTodoLists(response.data);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, []);


  const [newTodoListName, setNewTodoListName] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleHover = (index: any) => {
    setHoveredIndex(index);
  };

  return (
    <>
      {/* Button to add a todo list */}
      <div className="mt-16 ml-10 ">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/workspace">Workspace</Link>
            </li>
            {/* <li><Link href="/boards">Boards</Link></li> */}
            <li>{"projectname"} board</li>
          </ul>
        </div>
         
            <div className="flex   ">
              {todoLists && todoLists.length > 0 && (
                <div className="flex">
                  {todoLists.map((todoList: any,index: number) => (
                    <div className=" w-[250px] border  h-[750px] mt-14 ml-10 rounded-lg relative group"
                    onMouseEnter={() => handleHover(index)}
                    onMouseLeave={() => handleHover(null)}
                    >
                      {/* List Name */}
                      <div
                        className="p-4 m-2 flex justify-center"
                        onClick={() => setShowModal(true)}
                      >
                        {todoList.name}
                      </div>
                      {/* Todos List */}

                      <TodosList  showNewTask={hoveredIndex === index} ListId={todoList.id} />
                    </div>
                  ))}
                </div>
              )}

              <div className=" w-[250px] ml-5 mt-14 h-[50px] flex border p-4 rounded-lg cursor-pointer justify-center "
                  onClick={() => {
                    setShowModal(true);
                    setPopUpFlag(true);
                  }}
                >
                  <p className=" color-white">➕ Add New List</p>
              
              </div>
            </div>
          
      </div>

      {/* Modal for adding a todo list */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md max-w-2xl w-full">
            <h2 className="text-lg font-semibold mb-4">
              { "Add Todo List"}
            </h2>
            {/* Todo list form */}
            <div className="mb-2 p-4">
              <label className="input input-bordered flex items-center gap-2">
                 List Name
                <input
                  type="text"
                  className="grow"
                  placeholder={`eg:(Dragon Ball Z Todo)`}
                  value={newTodoListName}
                  onChange={(e) => setNewTodoListName(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-row-reverse   pr-4">
              <button
                onClick={() => {
                  setShowModal(false);
                   handleAddTodoList();
                }}
                className="btn btn-primary ml-3"
              >
                Add
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BoardTodoList;
