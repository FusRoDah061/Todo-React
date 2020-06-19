import React from 'react';
import TaskItem from './TaskItem';

function TaskList(props) {
  const taskItens = props.tasks.map((task) => {
    return (
      <TaskItem task={ task } onTaskChange={ props.onTaskChange }  key={ task.id }/>
    );
  });
  
  return (
    <ul className='task-list'>
      { taskItens }
    </ul>
  );
}

export default TaskList;