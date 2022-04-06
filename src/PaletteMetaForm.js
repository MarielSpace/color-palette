import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: 'palette',
      newPaletteName: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.onSavePalette = this.onSavePalette.bind(this)
    this.openEmoji = this.openEmoji.bind(this)
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) =>
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    )
  }

  onSavePalette(emoji) {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    }
    this.props.savePalette(newPalette)
    console.log('palette form save')
    this.setState({ status: '' })
  }

  openEmoji() {
    this.setState({
      status: 'emoji',
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    const { newPaletteName, status } = this.state
    const { hideForm } = this.props

    return (
      <>
        <Dialog open={status === 'emoji'} onClose={hideForm}>
          <DialogTitle id='form-dialog-title'>
            Select a Palette Emoji
          </DialogTitle>
          <Picker
            title='Pick a emoji for your palette'
            onSelect={this.onSavePalette}
          />
        </Dialog>
        <Dialog
          open={status === 'palette'}
          onClose={hideForm}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Create a Palette</DialogTitle>
          <ValidatorForm onSubmit={this.openEmoji}>
            <DialogContent>
              <DialogContentText>
                Please enter a unique name for your Palette
              </DialogContentText>
              <TextValidator
                label='Palette Name'
                value={newPaletteName}
                name='newPaletteName'
                onChange={this.handleChange}
                fullWidth
                margin='normal'
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={[
                  'Please Enter Palette Name',
                  'Please change to a unique palette name',
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color='primary'>
                Cancel
              </Button>
              <Button variant='contained' color='primary' type='submit'>
                Save
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </>
    )
  }
}

export default PaletteMetaForm
