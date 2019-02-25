import React, { Component } from "react"
import { ListGroup, Modal, Button } from "react-bootstrap"
import './ListItem.css'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

class ListItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isEdit: !props.listItem.todo,
      error: '',
      show: false,
    }
  }

  onEdit = () => {
    if (!this.props.disabled) {
      this.setState({ isEdit: true })
    }
  }

  onChange = (value) => {
    const { onTodoChange, index, setParentState } = this.props
    onTodoChange(value, index)
    this.setState({ error: '' })
    setParentState({ error: false })
  }

  blurInput = (todo) => {
    if (!todo) {
      this.setState({ error: 'todo should not be empty!' })
      this.props.setParentState({ error: true })
    } else {
      this.setState({ isEdit: false })
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    if (!this.props.disabled) {
      this.setState({ show: true });
    }
  }

  renderTodo = (disabled) => {
    const { listItem, index, onCheckItem, onDeleteItem } = this.props
    const { isEdit, error } = this.state
    const cursorClassName = disabled ? 'disabled' : 'pointer'
    if (isEdit) {
      return <ListGroup.Item className={error ? 'alert' : ''}>
        <input className='form-control'
          autoFocus
          value={listItem.todo}
          onChange={(e) => this.onChange(e.target.value)}
          onBlur={() => { this.blurInput(listItem.todo) }}
          onKeyPress={(e) => {
            if (e.which === 13) {
              this.blurInput(listItem.todo)
            }
          }}
        />
        <span>{error}</span>
      </ListGroup.Item>
    }
    return (
      <ListGroup.Item className={'list-item'}>
        <div className={'item-wrapper'}>
          <div onClick={this.onEdit} className={cursorClassName}>{listItem.todo}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: 15 }}>
              <FormControlLabel
                style={{ margin: 0, cursor: disabled ? 'not-allowed' : '' }}
                control={
                  <Checkbox
                    style={{ cursor: disabled ? 'not-allowed' : '' }}
                    checked={listItem.isDone}
                    onChange={() => {
                      if (!disabled) {
                        onCheckItem(index)
                      }
                    }}
                    value="done"
                    color='primary'
                  />
                }
                label="done"
              />
            </span>
            <span>
              <DeleteIcon className={cursorClassName} onClick={() => {
                if (!disabled) {
                  this.handleShow()
                }
              }} />
            </span>
          </div>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure to delete this task?</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => {
              onDeleteItem(index)
              this.handleClose()
            }}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

      </ListGroup.Item>
    )
  }

  render() {
    const { addTask, onAddItem, disabled } = this.props
    const pointerClassName = disabled ? 'not-allowed' : 'pointer'
    if (addTask) {
      return <ListGroup.Item style={{ cursor: pointerClassName }} onClick={() => {
        if (!disabled) {
          onAddItem()
        }
      }}>{'+ Add Task'}</ListGroup.Item>
    }
    return this.renderTodo(disabled)
  }
}

export default ListItem;
