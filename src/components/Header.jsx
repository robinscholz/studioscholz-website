import React from 'react'
import Switch from '../components/Switch.jsx'
import Avatar from '../components/Avatar.jsx'


import { css } from '$/stitches.config.ts';

const headerStyles = css({
  maxWidth: 'var(--content-width)',
  width: '100%',
  margin: '0 auto $10 auto',
  padding: '$10 $3 0 $3',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  variants: {
    direction: {
      row: {
        flexDirection: 'row'
      },
      col: {
        flexDirection: 'column'
      }
    }
  }
})

const switchStyles = css({
  variants: {
    position: {
      fixed: {
        position: 'fixed',
        top: 12,
        right: 12,
      },
      // inline: {
      //   position: 'relative',
      //   marginLeft: 'auto',
      //   top: 0,
      //   left: 0
      // }
    }
  }
})

const titleStyles = css({
   variants: {
    direction: {
      col: {
        marginTop: 4
      },
      row: {
        marginLeft: 12,
        marginTop: 0,
      }
    },
    size: {
      small: {
        fontSize: 'var(--text-lg)'
      },
      large: {
        fontSize: 'var(--text-xl)'
      }
    }
   }
})

const darkModeCallback = (checked) => {
  if (!checked) {
    document.body.classList.add('dark-theme')
  } else {
    document.body.classList.remove('dark-theme')
  }
}

class Header extends React.Component {
  render() {
    return <header className={headerStyles({ direction: { '@initial': 'col', '@sm': 'row' }})}>
      <Avatar 
        src='images/stsz_avatar.jpg'
        alt="Studio Scholz mascot" 
      />
      <h1 
        className={
          titleStyles(
            { direction: { '@initial': 'col', '@sm': 'row' }},
            { size: { '@initial': 'small', '@sm': 'large' }}
          )
        }
      >
        {this.props.title}
      </h1>
      <Switch 
        name="dark-mode"
        id="dark-mode" 
        label="Light?"
        defaultChecked={false}
        callback={darkModeCallback} 
        className={switchStyles({ position: 'fixed' })}
      />
    </header>
  }
}

export default Header