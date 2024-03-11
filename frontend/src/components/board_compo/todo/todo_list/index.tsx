import { useEffect, useState, useRef } from "react";
import axios from "axios";

type Props = {
  showNewTask: boolean;
  ListId:string;
};

const TodosList = (props: Props) => {
  const { showNewTask,ListId } = props;
  const apiUrl = "http://localhost:4000" || process.env.NEXT_PUBLIC_API_URL;
  const [todoLists, setTodoLists] = useState<any>();
  const [TodosList,setTodosList]= useState<any>();
  const [todo, setTodo] = useState("");
  const [onClickAdd, setOnClickAdd] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !(inputRef.current as any).contains(event.target)) {
        setOnClickAdd(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inputRef]);

  const handleAddTodo = async () => {
    setOnClickAdd(false);
    try {
      const response = await axios.post(`${apiUrl}/todo/todos`, {
        todo: todo,
        userID:'0c4f063c-8bc1-4e39-bc82-c5ca468b6966',
        todoListId: ListId,
      });
      console.log("Todo added successfully:", response.data);
      setTodo(""); // Clear the input field after adding the todo
      fetchTodo();
    } catch (error) {
      console.error("Error occurred:", error);
      setTodo('')
    }
   
  };

  const fetchTodo = async () => {
    try{
      const response = await axios.get(`${apiUrl}/todo/todos`)
      // console.log(response.data)
      setTodosList(response.data);
    }catch (error){
      console.error("Error occurred:", error);

    }

  }


  useEffect(()=>{
    fetchTodo();
  },[])

  return (
    <>
      {/* List Task */}
      <div className="w-[200px] max-h-[650px] overflow-x-auto">
        {/* map the TodosList here  */}

        {TodosList && TodosList.length > 0 && (
          <div>
            {TodosList.map((todoItem: any) => (
              <p key={todoItem.id}>{todoItem.title}</p>
            ))}
          </div>
        )}
      </div>

      {onClickAdd && (
        <div className="border" ref={inputRef}>
          <textarea
            
            placeholder="Type here"
            className="outline-none w-[100%]"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <div className="flex-row-reverse  mt-1">
            {/*  Save Todo Button  */}
            <div className="flex justify-center cursor-pointer  w-12 h-6 bg-[#401B74] font-[400] text-[14px] text-white rounded-lg"  onClick={handleAddTodo}> save </div>
          </div>
         
        </div>
      )}

      {/* Add New Task Button */}
      {!onClickAdd && (
        <div
          className={`cursor-pointer bg-none mt-5 ml-6 flex text-[15px] font-[200] w-[100%] ${
            showNewTask ? "visible" : "invisible"
          }`}
          onClick={() => setOnClickAdd(true)}
        >
          ➕ New Task
        </div>
      )}
    </>
  );
};

export default TodosList;
