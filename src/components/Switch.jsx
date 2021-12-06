import { css } from '$/stitches.config.ts'
import { slateDark } from '@radix-ui/colors'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import * as LabelPrimitive from '@radix-ui/react-label'


const switchStyles = css({
  all: 'unset',
  width: 24,
  height: 14,
  backgroundColor: slateDark.slate3,
  borderRadius: '9999px',
  position: 'relative',
  // boxShadow: `0 2px 10px ${slateDark.slate8}`,
  cursor: 'pointer',
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&:hover': { boxShadow: `0 0 0 2px ${slateDark.slate8}` },
  '&:focus-visible': { boxShadow: `0 0 0 2px ${slateDark.slate7}` },
  '&[data-state="checked"]': { backgroundColor: slateDark.slate5 },
})

const thumbStyles = css({
  display: 'block',
  width: 10,
  height: 10,
  backgroundColor: 'white',
  borderRadius: '9999px',
  boxShadow: `0 2px 2px ${slateDark.slate3}`,
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(calc(100% + 2px))' },
})

const labelStyles = css({
  cursor: 'pointer',
  fontSize: 'var(--text-sm)',
  marginRight: 'var(--spacing-2)',
  lineHeight: 1,
})

const wrapperStyles = css({
  display: 'flex',
  alignItems: 'center'
})

const Switch = (props) => (
  <div className={wrapperStyles(), props.className}>
    <LabelPrimitive.Root 
      id={props.name + '-label'} 
      htmlFor={props.name} 
      className={labelStyles()} 
    >
      {props.label}
    </LabelPrimitive.Root>
    <SwitchPrimitive.Root 
      id={props.name} 
      className={switchStyles()}
      defaultChecked={props.defaultChecked} 
      onCheckedChange={props.callback}
    >
      <SwitchPrimitive.Thumb className={thumbStyles()} />
    </SwitchPrimitive.Root>
  </div>
)

export default Switch
