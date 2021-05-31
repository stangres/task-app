import { observable, action, computed, makeObservable, runInAction } from 'mobx';
import client from '../../api';
import {TASK_STATUS} from '../../constants/task-status';

class TasksStore {
  isLoading = false;
  _data = []
  sortField = '';
  sortDirection = '';
  page = 1;
  total = 0;

  constructor() {
    makeObservable(this, {
      _data: observable.shallow,
      isLoading: observable,
      data: computed,
      load: action,
      update: action,
      create: action,
    });
  }

  get data() {
    return this._data;
  }

  setSort({field, direction}) {
    this.sortField = field;
    this.sortDirection = direction;
    this.load();
  }

  setPage(page) {
    this.page = page;
    this.load();
  }

  async load() {
    this.isLoading = true;

    try {
      const data = await client.task.getAll({
        sortField: this.sortField,
        sortDirection: this.sortDirection,
        page: this.page
      })
        .then((data) => this._prepareData(data));

      runInAction(() => {
        this._data = data;
      });
    }
    finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  _prepareItem(item) {
    item['statusText'] = TASK_STATUS[item['status']] || '';
    return item;
  }

  _prepareData(data) {
    this.total = data.message.total_task_count;
    let items = data.message.tasks;

    for (let item of items) {
      this._prepareItem(item);
    }

    return items;
  }

  async update(item) {
    let result = false;
    this.isLoading = true;
    this._prepareItem(item);

    try {
      await client.task.update(item.id, item);
      result = true;

      runInAction(() => {
        this._data = this._data.map((it) => it.id === item.id ? item : it);
      });
    }
    finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }

    return result;
  }

  async create(item) {
    let result = false;
    this.isLoading = true;
    this._prepareItem(item);

    try {
      const res = await client.task.create(item);
      result = true;

      runInAction(() => {
        const newItem = res.message;

        if (newItem) {
          this._prepareItem(newItem);
          this._data.unshift(newItem);
        }
      });
    }
    finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }

    return result;
  }
}

export default new TasksStore();