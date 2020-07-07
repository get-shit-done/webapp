// https://gist.github.com/vincentbollaert/e90def9b351d8d97c90ef7cfd887685e
// https://jsperf.com/color-darken

export function rgbAdjust(color: string, amount: number): string {
  const colorValues = color.match(/[0-9]+/g).map(x => Number(x))
  const primary = Math.max(...colorValues)
  const colorValuesUpdated = colorValues.map(x => x === primary ? x + (Math.round(amount / 1.5)) : x + amount).join(',')

  return `rgb(${colorValuesUpdated})`
}

export const flex = ({ grow, shrink, basis, isCenter }: { grow: number, shrink: number, basis: number, isCenter: boolean }) => `
  display: flex;
  flex-grow: ${grow};
  flex-shrink: ${shrink};
  flex-basis: ${basis};

  ${isCenter && `
    justify-content: center;
    align-items: center;
    text-align: center;
  `};
`

export const ellipsis = () => `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const scrollbarMinLight = () => `
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
    background-color: transparent;
    border-left: 1px solid var(--white-smoke);
  }

  ::-webkit-scrollbar-track {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    border: none;
    border-radius: 0;
    background: #b3c1c5;
  }

  ::-webkit-scrollbar-button {
    display: none;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`


// media query
const customMediaQuery = (minWidth: number) => `@media (min-width: ${minWidth}px)`

export const media = {
  custom: customMediaQuery,
  sm: customMediaQuery(540),
  md: customMediaQuery(940),
  lg: customMediaQuery(1140),
}
