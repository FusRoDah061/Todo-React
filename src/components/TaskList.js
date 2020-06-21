import React from 'react';
import TaskItem from './TaskItem';

import '../styles/TaskList.css';

function TaskList(props) {
  const taskItens = props.tasks.map((task) => {
    return (
      <TaskItem task={ task } onTaskChange={ props.onTaskChange }  key={ task.id }/>
    );
  });
  
  return (
    <div className='task-list-container'>
      <ul className='task-list'>
        { taskItens }
      </ul>
    </div>
  );
}

export default TaskList;