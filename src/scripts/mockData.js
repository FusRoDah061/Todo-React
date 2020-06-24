import * as Constants from './constants.js';

export const TASKS_MOCK = [
  {
    id:1,
    description:'Task #1',
    status:Constants.TASK_STATUS_TODO,
    changedColumn:false,
    subtasks:[
      {
        id:1,
        description:'SubTask #1',
        status:Constants.SUBTASK_STATUS_NOT_DONE
      },
      {
        id:2,
        description:'SubTask #2',
        status:Constants.SUBTASK_STATUS_NOT_DONE
      },
      {
        id:3,
        description:'SubTask #3',
        status:Constants.SUBTASK_STATUS_NOT_DONE
      }
    ]
  },
  {
    id:2,
    description:'Task #2',
    status:Constants.TASK_STATUS_TODO,
    changedColumn:false,
    subtasks:[
      {
        id:4,
        description:'SubTask #1',
        status:Constants.SUBTASK_STATUS_NOT_DONE
      },
      {
        id:5,
        description:'SubTask #2',
        status:Constants.SUBTASK_STATUS_NOT_DONE
      },
      {
        id:6,
        description:'SubTask #3',
        status:Constants.SUBTASK_STATUS_NOT_DONE
      }
    ]
  },
  {
    id:3,
    description:'Task #3',
    status:Constants.TASK_STATUS_DOING,
    changedColumn:false,
    subtasks:[
      {
        id:7,
        description:'SubTask #1',
        status:Constants.SUBTASK_STATUS_DONE
      },
      {
        id:8,
        description:'SubTask #2',
        status:Constants.SUBTASK_STATUS_NOT_DONE
      },
      {
        id:9,
        description:'SubTask #3',
        status:Constants.SUBTASK_STATUS_NOT_DONE
      }
    ]
  },
  {
    id:4,
    description:'Task #4',
    status:Constants.TASK_STATUS_DONE,
    changedColumn:false,
    subtasks:[
      {
        id:10,
        description:'SubTask #1',
        status:Constants.SUBTASK_STATUS_DONE
      },
      {
        id:11,
        description:'SubTask #2',
        status:Constants.SUBTASK_STATUS_DONE
      },
      {
        id:12,
        description:'SubTask #3',
        status:Constants.SUBTASK_STATUS_DONE
      }
    ]
  }
];