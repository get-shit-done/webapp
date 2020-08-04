export const CN_HOUR_SLOTS = 'hour-slots'
export const CN_COLUMN = 'column'

export type CalendarFormValues = {
  name: string
  from: number
  to: number
}

export const determineTimeFromY = ({
  y,
  hoursAxis,
  ref,
}: {
  y: number
  ref: React.MutableRefObject<any>
  hoursAxis: number[]
}) => {
  const percentage = (y / ref.current.getBoundingClientRect().height) * 100
  const hourMin = hoursAxis[0]
  const hourMax = hoursAxis[hoursAxis.length - 1] + 1
  const alg = hourMin + ((hourMax - hourMin) / 100) * percentage
  const rounded = Math.round(alg / 0.25) * 0.25
  return rounded
}

const generateDefaultShadowValue = (value: string) => `
  inset 4px 1px 0 0 ${value},
  inset -4px -1px 0 0 ${value}
`
export const taskShadow = (value: string) => `
  box-shadow: ${generateDefaultShadowValue(value)};
`
export const taskShadowBeingEdited = (value: string) => `
  box-shadow:
    ${generateDefaultShadowValue(value)},
    inset 5px 2px 0 0 var(--charcoal),
    inset -5px -2px 0 0 var(--charcoal);
`
export const placeholderShadow = (value1: string, value2: string) => `
  box-shadow:
    ${generateDefaultShadowValue(value1)},
    inset 6px 3px 0 0 ${value2},
    inset -6px -3px 0 0 ${value2};
`
