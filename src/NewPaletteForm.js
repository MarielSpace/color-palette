import React, { Component } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import PaletteFormNav from './PaletteFormNav'
import ColorPickerForm from './ColorPickerForm'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import Button from '@material-ui/core/Button'
import { arrayMove } from 'react-sortable-hoc'
import DraggableColorList from './DraggableColorList'
import seedColors from './seedColors'
import Page from './Page'
import styles from './styles/NewPaletteFormStyles'

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20,
    maxTimesWhileLoop: 10,
  }
  constructor(props) {
    super(props)
    this.state = {
      open: true,
      colors: seedColors[0].colors,
    }
    this.timeout = null
    this.addNewColor = this.addNewColor.bind(this)
    this.clearColors = this.clearColors.bind(this)
    this.savePalette = this.savePalette.bind(this)
    this.removeColor = this.removeColor.bind(this)
    this.onCreatePalette = this.onCreatePalette.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
    this.addRandomColor = this.addRandomColor.bind(this)
    this.checkColorIsDuplicate = this.checkColorIsDuplicate.bind(this)
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.props.onPageTransitionStyle('page-back')
    }, 600)
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }

  addNewColor = (newColor) => {
    this.setState({
      colors: [...this.state.colors, newColor],
    })
  }

  savePalette(newPalette) {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-')
    newPalette.colors = this.state.colors
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }

  clearColors() {
    this.setState({ colors: [] })
  }

  checkColorIsDuplicate(randomColor) {
    this.state.colors.some((color) => color.name === randomColor.name)
  }

  addRandomColor() {
    let pickedColors
    if (this.props.palettes.length > 0) {
      pickedColors = this.props.palettes.map((palette) => palette.colors).flat()
    } else {
      pickedColors = seedColors[5].colors.flat()
    }
    const allColors = [
      ...pickedColors,
      ...seedColors[6].colors.flat(),
      ...seedColors[7].colors.flat(),
      ...seedColors[8].colors.flat(),
    ]

    let rand = 1,
      loopCount = 0,
      randomColor,
      isDuplicatedColor = true

    while (
      isDuplicatedColor &&
      this.state.colors.length < this.props.maxColors &&
      loopCount < this.props.maxTimesWhileLoop
    ) {
      if (allColors.length > 0)
        rand = Math.floor(Math.random() * (allColors.length - 1)) + 1
      randomColor = allColors[rand]
      isDuplicatedColor = this.checkColorIsDuplicate(randomColor)
      loopCount++
    }
    if (
      this.state.colors.length >= this.props.maxColors ||
      loopCount >= this.props.maxTimesWhileLoop
    ) {
      return
    }
    this.setState({ colors: [...this.state.colors, randomColor] })
  }
  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  removeColor(colorName) {
    this.setState({
      colors: this.state.colors.filter((color) => color.name !== colorName),
    })
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }))
  }

  onCreatePalette() {
    this.props.history.push('/')
  }

  render() {
    const { colors, open } = this.state
    const { classes, palettes, maxColors, pageTransitionStyle } = this.props
    const paletteIsFull = colors.length >= maxColors
    return (
      <Page styleName={pageTransitionStyle}>
        <div className={classes.root}>
          <PaletteFormNav
            open={open}
            palettes={palettes}
            handleSubmit={this.handleSubmit}
            handleDrawerOpen={this.handleDrawerOpen}
            savePalette={this.savePalette}
            onCreatePalette={this.onCreatePalette}
          />
          <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='left'
            open={open}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <Divider />
            <div className={classes.container}>
              <Typography variant='h4' gutterBottom>
                Design Your Palette
              </Typography>
              <div className={classes.buttons}>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={this.clearColors}
                  className={classes.button}
                >
                  Clear Palette
                </Button>
                <Button
                  variant='contained'
                  className={classes.button}
                  color='primary'
                  onClick={this.addRandomColor}
                  disabled={paletteIsFull}
                >
                  Random Color
                </Button>
              </div>
              <ColorPickerForm
                paletteIsFull={paletteIsFull}
                addNewColor={this.addNewColor}
                colors={colors}
              />
            </div>
          </Drawer>
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            <DraggableColorList
              axis='xy'
              distance={20}
              colors={colors}
              removeColor={this.removeColor}
              onSortEnd={this.onSortEnd}
            />
          </main>
        </div>
      </Page>
    )
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm)
