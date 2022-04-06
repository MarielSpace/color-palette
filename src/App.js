import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { generatePalette } from './colorHelpers'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Palette from './Palette'
import seedColors from './seedColors'
import PaletteList from './PaletteList'
import SingleColorPalette from './SingleColorPalette'
import NewPaletteForm from './NewPaletteForm'
import './App.css'
import ErrorPage from './ErrorPage'

class App extends Component {
  constructor(props) {
    super(props)
    const savePalettes = JSON.parse(window.localStorage.getItem('palettes'))
    this.state = {
      palettes: savePalettes || seedColors,
      pageTransitionStyle: 'page',
    }
    this.savePalette = this.savePalette.bind(this)
    this.findPalette = this.findPalette.bind(this)
    this.onDeletePalette = this.onDeletePalette.bind(this)
    this.onPageTransitionStyle = this.onPageTransitionStyle.bind(this)
  }

  savePalette(newPalette) {
    this.setState(
      {
        palettes: [...this.state.palettes, newPalette],
      },
      this.syncLocalStoragePalettes
    )
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => palette.id === id)
  }
  syncLocalStoragePalettes() {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes))
  }

  onDeletePalette(id) {
    this.setState(
      (prev) => ({
        palettes: prev.palettes.filter((palette) => palette.id !== id),
      }),
      this.syncLocalStoragePalettes
    )
  }
  onPageTransitionStyle(pageStyle) {
    this.setState({
      pageTransitionStyle: pageStyle,
    })
  }

  render() {
    const { pageTransitionStyle } = this.state
    return (
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition classNames='page' timeout={500} key={location.key}>
              <Switch location={location}>
                <Route
                  exact
                  path='/palette/new'
                  render={(routeProps) => (
                    <NewPaletteForm
                      palettes={this.state.palettes}
                      savePalette={this.savePalette}
                      onPageTransitionStyle={this.onPageTransitionStyle}
                      pageTransitionStyle={pageTransitionStyle}
                      {...routeProps}
                    />
                  )}
                />
                <Route
                  exact
                  path='/'
                  render={(routeProps) => (
                    <PaletteList
                      palettes={this.state.palettes}
                      onDeletePalette={this.onDeletePalette}
                      pageTransitionStyle={pageTransitionStyle}
                      onPageTransitionStyle={this.onPageTransitionStyle}
                      {...routeProps}
                    />
                  )}
                />
                <Route
                  exact
                  path='/palette/:id'
                  render={(routeProps) => (
                    <Palette
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.id)
                      )}
                      pageTransitionStyle={pageTransitionStyle}
                      onPageTransitionStyle={this.onPageTransitionStyle}
                    />
                  )}
                />
                <Route
                  exact
                  path='/palette/:paletteId/:colorId'
                  render={(routeProps) => (
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )}
                      pageTransitionStyle={pageTransitionStyle}
                      onPageTransitionStyle={this.onPageTransitionStyle}
                    />
                  )}
                />
                <Route render={() => <ErrorPage />} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      ></Route>
    )
  }
}

export default App
