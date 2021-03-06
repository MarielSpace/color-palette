import React from 'react'
import { SortableElement } from 'react-sortable-hoc'
import { withStyles } from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import styles from './styles/DraggableColorBoxStyles'

const DraggableColorBox = ({ classes, handleClick, name, color }) => {
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span> {name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
    </div>
  )
}

export default withStyles(styles)(SortableElement(DraggableColorBox))
