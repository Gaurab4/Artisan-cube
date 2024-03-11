import BoardSideBar from '@/components/Sidebar/board_sidebar';
import BoardTodoList from '@/components/board_compo/main_board_page';

const ProjectBoard = () => {
  return (
    <div className='flex'>
      <BoardSideBar/>
      <BoardTodoList/>

    </div>
  );
};

export default ProjectBoard;
