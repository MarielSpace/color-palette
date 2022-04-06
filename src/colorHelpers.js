import chroma from 'chroma-js'

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

function generatePalette(starterPalette) {
  const newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: {},
  }

  for (let level of levels) {
    newPalette.colors[level] = []
  }

  for (let { color, name } of starterPalette.colors) {
    const colorScales = getScale(color, levels.length || 10).reverse()

    for (let idx in colorScales) {
      newPalette.colors[levels[idx]].push({
        name: `${name} ${levels[idx]}`,
        id: name.toLowerCase().replace('/ /g', '-'),
        hex: colorScales[idx],
        rgb: chroma(colorScales[idx]).css(),
        rgba: chroma(colorScales[idx])
          .css()
          .replace('rgb', 'rgba')
          .replace(')', ', 1.0)'),
      })
    }
  }
  return newPalette
}

function getRange(hexColor) {
  const end = '#fff'
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end]
}

function getScale(hexColor, numberOfColors) {
  return chroma.scale(getRange(hexColor)).mode('lab').colors(numberOfColors)
}

export { generatePalette }
