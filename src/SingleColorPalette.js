import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'
import styles from './styles/PaletteStyles'
import Page from './Page'

class SingleColorPalette extends Component {
  constructor(props) {
    super(props)
    this.timeout = null
    this.state = {
      format: 'hex',
    }
    this._shades = this.gatherShades(this.props.palette, this.props.colorId)
    this.onChangeFormat = this.onChangeFormat.bind(this)
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

  gatherShades(palette, colorToFilterBy) {
    let shades = []
    for (let key in palette.colors) {
      const filtered_shades = palette.colors[key].filter(
        (color) => color.id === colorToFilterBy
      )
      shades = [...shades, ...filtered_shades]
    }
    return shades.slice(1)
  }

  onChangeFormat(value) {
    this.setState({
      format: value,
    })
  }
  render() {
    const { format } = this.state
    const { classes, pageTransitionStyle } = this.props
    const { paletteName, emoji } = this.props.palette
    const colorBoxes = this._shades.map((shade) => (
      <ColorBox
        key={shade.name}
        name={shade.name}
        background={shade[format]}
        showMoreLink={false}
        showFullPalette={false}
      />
    ))
    return (
      <Page styleName={pageTransitionStyle}>
        <div className={classes.palette}>
          <Navbar handleChange={this.onChangeFormat} showLevel={false} />
          <div className={classes.paletteColors}>{colorBoxes}</div>
          <PaletteFooter paletteName={paletteName} emoji={emoji} />
        </div>
      </Page>
    )
  }
}

export default withStyles(styles)(SingleColorPalette)
