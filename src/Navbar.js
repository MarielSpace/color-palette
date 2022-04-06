import React, { Component } from 'react'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/styles'
import Select from '@material-ui/core/Select'
import { IconButton, MenuItem } from '@material-ui/core'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import styles from './styles/NavbarStyles'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      format: 'hex',
      open: false,
    }
    this.onHandleChange = this.onHandleChange.bind(this)
    this.closeSnackbar = this.closeSnackbar.bind(this)
  }

  onHandleChange(e) {
    this.setState({ format: e.target.value, open: true })
    this.props.handleChange(e.target.value)
  }
  closeSnackbar() {
    this.setState({
      open: false,
    })
  }
  render() {
    const { level, onChangeLevel, showLevel, classes } = this.props
    const { format, open } = this.state
    return (
      <header className={classes.navbar}>
        <div className={classes.logo}>
          <Link to='/'>
            <ArrowBackIcon />
          </Link>
        </div>
        {showLevel && (
          <div>
            <span>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                value={level}
                min={100}
                max={900}
                step={100}
                onChange={onChangeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select
            value={format}
            className={classes.select}
            onChange={this.onHandleChange}
          >
            <MenuItem value='hex'>HEX - #ffffff</MenuItem>
            <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={open}
          autoHideDuration={3000}
          message={<span>Format Changed to {format.toUpperCase()}</span>}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color='inherit'
              key='close'
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </header>
    )
  }
}
export default withStyles(styles)(Navbar)
