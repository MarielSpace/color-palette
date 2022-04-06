import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { withStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import styles from './styles/ColorBoxStyles'

class ColorBox extends Component {
  constructor(props) {
    super(props)
    this.state = { copied: false }
    this.onChangeCopyState = this.onChangeCopyState.bind(this)
  }

  onChangeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false })
      }, 1500)
    })
  }

  render() {
    const { name, background, moreUrl, showMoreLink, classes } = this.props
    const { copied } = this.state

    return (
      <CopyToClipboard text={background} onCopy={this.onChangeCopyState}>
        <div className={classes.colorBox} style={{ background }}>
          <div
            className={`${classes.copyOverlay} ${
              copied && classes.copyOverlayShow
            }`}
            style={{ background }}
          />
          <div
            className={`${classes.copyMsg} ${copied && classes.copyMsgShow}`}
          >
            <h1>copied!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showMoreLink && (
            <Link to={moreUrl} onClick={(e) => e.stopPropagation()}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    )
  }
}

export default withStyles(styles)(ColorBox)
