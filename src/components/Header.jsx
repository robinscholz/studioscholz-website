import React from 'react'
import Switch from '../components/Switch.jsx'
import Avatar from '../components/Avatar.jsx'


import { css } from '$/stitches.config.ts';

const headerStyles = css({
  maxWidth: 'var(--content-width)',
  margin: '0 auto 40px auto',
  padding: '40px var(--spacing-3) 0 var(--spacing-3)',
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
      inline: {
        position: 'relative',
        marginLeft: 'auto',
        top: 0,
        left: 0
      }
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
      <h1 className={titleStyles({ direction: { '@initial': 'col', '@sm': 'row' }})}>
        {this.props.title}
      </h1>
      <Switch 
        name="dark-mode"
        id="dark-mode" 
        label="Lights?"
        defaultChecked
        callback={darkModeCallback} 
        className={switchStyles({ position: { '@initial': 'fixed', '@sm': 'inline' }})}
      />
    </header>
  }
}

export default Header