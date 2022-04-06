import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import PaletteFooter from './PaletteFooter'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import styles from './styles/PaletteStyles'
import Page from './Page'

class Palette extends Component {
  constructor(props) {
    super(props)

    this.timeout = null
    this.state = {
      level: 500,
      format: 'hex',
    }
    this.onChangeLevel = this.onChangeLevel.bind(this)
    this.onChangeFormat = this.onChangeFormat.bind(this)
  }

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.props.onPageTransitionStyle('')
    }, 600)
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }

  onChangeLevel(value) {
    this.setState({
      level: value,
    })
  }
  onChangeFormat(value) {
    this.setState({
      format: value,
    })
  }
  render() {
    const { level, format } = this.state
    const { classes, pageTransitionStyle } = this.props
    const { colors, paletteName, emoji, id } = this.props.palette
    const colorBoxes = colors[level].map((color) => (
      <ColorBox
        background={color[format]}
        name={color.name}
        key={color.id}
        moreUrl={`/palette/${id}/${color.id}`}
        showMoreLink={true}
        showFullPalette={true}
      />
    ))
    return (
      <Page styleName={pageTransitionStyle}>
        <div className={classes.palette}>
          <Navbar
            level={level}
            onChangeLevel={this.onChangeLevel}
            handleChange={this.onChangeFormat}
            showLevel={true}
          />
          <div className={classes.paletteColors}>{colorBoxes}</div>
          <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
      </Page>
    )
  }
}

export default withStyles(styles)(Palette)
