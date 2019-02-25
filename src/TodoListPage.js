import React, { Component } from "react";
import { Card, ListGroup, ProgressBar } from 'react-bootstrap'
import ListItem from './ListItem'
import { Checkbox, FormControlLabel } from '@material-ui/core'

class TodoListPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      todoList: [],
      error: false,
      filter: false,
    }
  }

  renderListItems = () => {
    const { todoList, filter } = this.state
    if (filter) {
      return todoList.map((listItem, index) => {
        if (listItem.isDone) {
          return (
            <ListItem key={index}
              index={index}
              listItem={listItem}
              onTodoChange={this.onTodoChange}
              onCheckItem={this.onCheckItem}
              onDeleteItem={this.onDeleteItem}
              setParentState={this.setParentState}
              disabled={this.state.error}
            />
          )
        }
      })
    }
    return todoList.map((listItem, index) => (
      <ListItem key={index}
        index={index}
        listItem={listItem}
        onTodoChange={this.onTodoChange}
        onCheckItem={this.onCheckItem}
        onDeleteItem={this.onDeleteItem}
        setParentState={this.setParentState}
        disabled={this.state.error}
      />
    ))
  }

  onAddItem = () => {
    var newList = this.state.todoList.slice()
    newList.push({ todo: '', isDone: false })
    this.setState({ todoList: newList, filter: false })
  }

  onCheckItem = (index) => {
    var newList = this.state.todoList.slice()
    newList[index] = { ...newList[index], isDone: !newList[index].isDone }
    this.setState({ todoList: newList })
  }

  onDeleteItem = (index) => {
    var newList = this.state.todoList.slice()
    newList.splice(index, 1)
    this.setState({ todoList: newList })
  }

  onTodoChange = (value, index) => {
    var newList = this.state.todoList.slice()
    newList[index] = { ...newList[index], todo: value }
    this.setState({ todoList: newList })
  }

  setParentState = (newState) => {
    this.setState({ ...newState })
  }

  getProgress = () => {
    const length = this.state.todoList.length
    var count = 0
    if (!length) {
      return 0
    }
    this.state.todoList.map((listItem) => {
      if (listItem.isDone) {
        count++
      }
    })
    return (count / length * 100).toFixed(2)
  }

  render() {
    const { filter, error } = this.state
    const now = this.getProgress()
    return (
      <div className="App">
        <div className='container'>
          <h2 style={{ marginTop: 30 }}>TODO list</h2>
          <FormControlLabel
            style={{ margin: 0, cursor: error ? 'not-allowed' : '' }}
            control={
              <Checkbox
                style={{ cursor: error ? 'not-allowed' : '' }}
                checked={filter}
                onChange={() => {
                  if (!error) {
                    this.setState({ filter: !filter })
                  }
                }}
                value="done"
                color='primary'
              />
            }
            label="Filter Done Task"
          />
          <Card>
            <ListGroup variant="flush">
              {this.renderListItems()}
              <ListItem addTask onAddItem={this.onAddItem} listItem={{}} disabled={this.state.error} />
            </ListGroup>
          </Card>
          <h6 style={{ marginTop: 20 }}>Progress</h6>
          <ProgressBar now={now} label={`${now}%`} />
        </div>
      </div>
    );
  }
}

export default TodoListPage;
