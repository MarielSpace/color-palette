import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import PaletteMetaForm from './PaletteMetaForm'
import classNames from 'classnames'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos'
import Button from '@material-ui/core/Button'
import styles from './styles/PaletteFormNavStyles'

class PaletteFormNav extends Component {
  constructor(props) {
    super(props)
    this.state = { formShowing: false }
    this.showForm = this.showForm.bind(this)
    this.hideForm = this.hideForm.bind(this)
  }

  showForm() {
    this.setState({ formShowing: true })
  }

  hideForm() {
    this.setState({ formShowing: false })
  }

  render() {
    const { formShowing } = this.state
    const {
      classes,
      open,
      palettes,
      handleDrawerOpen,
      savePalette,
      onCreatePalette,
    } = this.props
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <AddToPhotosIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              onClick={onCreatePalette}
            >
              Go Back
            </Button>
            <Button variant='contained' color='primary' onClick={this.showForm}>
              Save Palette
            </Button>
          </div>
        </AppBar>
        {formShowing && (
          <PaletteMetaForm
            palettes={palettes}
            savePalette={savePalette}
            hideForm={this.hideForm}
          />
        )}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav)
