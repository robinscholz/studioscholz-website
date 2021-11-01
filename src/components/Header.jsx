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
})

const switchStyles = css({
  position: 'fixed',
  top: 12,
  right: 12,
  variants: {
    colors: {
      red: {
        position: 'relative',
        marginLeft: 'auto'
      }
    }
  }
})

const titleStyles = css({
   marginLeft: 12,
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
    return <header className={headerStyles()}>
      <Avatar 
        src='images/stsz_avatar.jpg'
        alt="Studio Scholz mascot" 
      />
      <h1 className={titleStyles()}>{this.props.title}</h1>
      <Switch 
        name="dark-mode"
        id="dark-mode" 
        label="Lights?"
        defaultChecked
        callback={darkModeCallback} 
        className={switchStyles({ '@sm:colors': 'red' })}
      />
    </header>
  }
}

export default Header