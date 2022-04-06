import React from 'react'
import { withStyles } from '@material-ui/styles'
import styles from './styles/PaletteFooterStyles'

function PaletteFooter({ paletteName, emoji, classes }) {
  return (
    <footer className={classes.PaletteFooter}>
      <div>{paletteName}</div>
      <div className={classes.emoji}>{emoji}</div>
    </footer>
  )
}

export default withStyles(styles)(PaletteFooter)
