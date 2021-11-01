import { createStitches } from '@stitches/astro';

export const { Sheet, css } = createStitches({
	media: {
    sm: '(min-width: 640px)',
    lg: '(min-width: 1024px)',
  },
});