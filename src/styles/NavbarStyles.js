import sizes from './sizes'

export default {
  '@global': {
    '.MuiInput-underline-21:before': {
      border: 'none !important',
      color: 'white',
    },
    '.MuiInput-underline-21:after': {
      border: 'none !important',
    },
    '.MuiSvgIcon-root-1': {
      fill: '#ecf0f1 !important',
    },
  },
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '6vh',
  },
  logo: {
    marginRight: '15px',
    padding: '0 13px',
    fontSize: '22px',
    backgroundColor: '#2c3e50',
    fontFamily: 'Roboto',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '& a': {
      textDecoration: 'none',
      color: '#ecf0f1',
    },
    [sizes.down('xs')]: {
      display: 'none',
    },
  },
  slider: {
    width: '340px',
    margin: '0 10px',
    display: 'inline-block',
    '& .rc-slider-track': {
      backgroundColor: 'transparent',
    },
    '& .rc-slider-rail': {
      height: '8px',
    },
    '& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle:focus,.rc-slider-handle:hover':
      {
        backgroundColor: 'green',
        outline: 'none',
        border: '2px solid green',
        boxShadow: 'none',
        width: '13px',
        height: '13px',
        marginLeft: '-7px',
        marginTop: '-3px',
      },
    // [sizes.down('sm')]: {
    //   width: '150px',
    // },
  },
  selectContainer: {
    marginLeft: 'auto',
    marginRight: '1rem',
    backgroundColor: '#2c3e50',
    padding: '5px 20px',
    borderRadius: '4px',
  },
  select: {
    color: '#ecf0f1 !important',
  },
}
