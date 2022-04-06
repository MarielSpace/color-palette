import React from 'react'
import DraggableColorBox from './DraggableColorBox'
import { SortableContainer } from 'react-sortable-hoc'

const DraggableColorList = ({ colors, removeColor }) => {
  return (
    <div style={{ height: '100%' }}>
      {colors.map((color, idx) => {
        return (
          <DraggableColorBox
            key={color.name}
            index={idx}
            name={color.name}
            color={color.color}
            handleClick={() => removeColor(color.name)}
          />
        )
      })}
    </div>
  )
}

export default SortableContainer(DraggableColorList)
