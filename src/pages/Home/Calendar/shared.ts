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
