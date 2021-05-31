export const TASK_STATUS = {
  0: 'задача не выполнена',
  1: 'задача не выполнена, отредактирована админом',
  10: 'задача выполнена',
  11: 'задача отредактирована админом и выполнена'
};

export const TASK_STATUS_LIST = [
  { key: 0, text: TASK_STATUS[0], value: 0 },
  { key: 1, text: TASK_STATUS[1], value: 1 },
  { key: 10, text: TASK_STATUS[10], value: 10 },
  { key: 11, text: TASK_STATUS[11], value: 11 }
];

export const TASK_STATUS_COMPLETE = [10, 11];

