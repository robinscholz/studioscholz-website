import { createStitches } from '@stitches/astro';

export const { Sheet, css } = createStitches({
	media: {
    sm: '(min-width: 640px)',
    lg: '(min-width: 1024px)',
  },
	theme: {
    space: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
			4: '1rem',
			6: '1.5rem',
			10: '2.5rem'
    },
    fontSizes: {
      1: '12px',
      2: '13px',
      3: '15px',
    },
	}
})