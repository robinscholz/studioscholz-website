import { css } from '$/stitches.config.ts'
import { slate } from '@radix-ui/colors'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

const wrapperStyles = css({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: 60,
  height: 60,
  borderRadius: '100%',
  backgroundColor: slate.slate3,
});

const imageStyles = css({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});

const fallbackStyles = css({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  color: slate.slate12,
  fontSize: 'var(--text-lg)',
  lineHeight: 1,
  fontWeight: 800,
});

const Avatar = (props) => (
  <AvatarPrimitive.Root className={wrapperStyles()}>
    <AvatarPrimitive.Image
      src={props.src}
      alt={props.alt}
      className={imageStyles()}
    />
    <AvatarPrimitive.Fallback delayMs={600} className={fallbackStyles()}>
      StSz
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
);

export default Avatar