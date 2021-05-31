import React  from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import Paginator from './Paginator';
import {TASK_STATUS_COMPLETE} from '../../../constants/task-status';
import './style.scss'

const getSortDirection = (newField, curField, curDirection) => {
  return !curDirection || curField !== newField ? 'ascending'
    :
    curDirection === 'ascending' ?
      'descending'
      :
      '';
}

const getSortProps = (field, sortField, sortDirection) => {
  const props = {};

  if (field === sortField && sortDirection) {
    props.sorted = sortDirection;
  }

  return props;
}

const isStatusComplete = (status) => {
  return TASK_STATUS_COMPLETE.includes(status);
}

const TaskTable = ({data, total, sortField, sortDirection, onSort, onEdit, onAdd, onPageChange}) => {
  const handleSort = (field) => {
    onSort({
      field,
      direction: getSortDirection(field, sortField, sortDirection)
    });
  }

  return (
    <Table sortable
           celled
           fixed
           selectable
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            {...getSortProps('username', sortField, sortDirection)}
            onClick={() => handleSort('username')}
          >
            Имя пользователя
          </Table.HeaderCell>
          <Table.HeaderCell
            {...getSortProps('email', sortField, sortDirection)}
            onClick={() => handleSort('email')}
          >
            Email
          </Table.HeaderCell>
          <Table.HeaderCell
            {...getSortProps('text', sortField, sortDirection)}
            onClick={() => handleSort('text')}
          >
            Текст задачи
          </Table.HeaderCell>
          <Table.HeaderCell
            {...getSortProps('status', sortField, sortDirection)}
            onClick={() => handleSort('status')}
          >
            Статус задачи
          </Table.HeaderCell>
          <Table.HeaderCell/>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((item) => {
          const { id, username, email, text, statusText, status } = item;
          return (
            <Table.Row key={id}>
              <Table.Cell>{username}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
              <Table.Cell>{text}</Table.Cell>
              <Table.Cell >
                <div className="table-status-cell">
                  <span>{statusText}</span>
                  {
                    isStatusComplete(status) &&
                    <Icon name='check' color='green'/>
                  }
                </div>
              </Table.Cell>
              <Table.Cell textAlign='center'>
                <Button basic
                        icon
                        size='mini'
                        onClick={() => onEdit(item)}
                >
                  <Icon name='edit'/>
                </Button>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>

      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell colSpan='5'>
            <Paginator total={total}
                       pageSize={3}
                       onPageChange={onPageChange}
            />
            <Button
              floated='right'
              icon
              labelPosition='left'
              primary
              size='tiny'
              onClick={onAdd}
            >
              <Icon name='add' />
              Создать
            </Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

export default TaskTable;