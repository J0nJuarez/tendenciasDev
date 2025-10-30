import { useCallback, useState } from "react"
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, Legend } from "recharts"

type ZoomAndHighlightState = {
  left: string | number
  right: string | number
  refAreaLeft: string | number | undefined
  refAreaRight: string | number | undefined
  top: string | number
  bottom: string | number
  animation: boolean
}

const initialState: ZoomAndHighlightState = {
  left: "dataMin",
  right: "dataMax",
  refAreaLeft: undefined,
  refAreaRight: undefined,
  top: "dataMax+1",
  bottom: "dataMin-1",
  animation: true,
}

const getAxisYDomain = (
  data: Record<string, string | number>[],
  fromLabel: string | number | undefined,
  toLabel: string | number | undefined,
  refs: string[],
  offset: number,
  xKey: string,
): (number | string)[] => {
  if (fromLabel != null && toLabel != null) {
    const start = data.findIndex((d) => String(d[xKey]) === String(fromLabel))
    const end = data.findIndex((d) => String(d[xKey]) === String(toLabel))
    if (start === -1 || end === -1) return [initialState.bottom, initialState.top]
    const sliceStart = Math.min(start, end)
    const sliceEnd = Math.max(start, end) + 1
    const refData = data.slice(sliceStart, sliceEnd)

    let bottom = Infinity
    let top = -Infinity

    refData.forEach((d) => {
      refs.forEach((ref) => {
        const v = Number(d[ref]) || 0
        if (v > top) top = v
        if (v < bottom) bottom = v
      })
    })

    if (!isFinite(bottom) || !isFinite(top)) return [initialState.bottom, initialState.top]

    return [Math.floor(bottom) - offset, Math.ceil(top) + offset]
  }
  return [initialState.bottom, initialState.top]
}

type Props = {
  data?: Record<string, string | number>[]
  keys?: string[]
  xKey?: string
  maxWidth?: string | number
}

const defaultSample = [
  { date: "1" as string, A: 4 as number },
  { date: "2" as string, A: 2 as number },
  { date: "3" as string, A: 1 as number },
]

const colors = ["#8884d8", "#82ca9d", "#ff7300", "#413ea0", "#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#A28FD0", "#E67E22"]

const HighlightAndZoomLineChart = ({
  data = defaultSample,
  keys = ["A", "B"],
  xKey = "date",
}: Props) => {
  const [zoomGraph, setZoomGraph] = useState<ZoomAndHighlightState>(initialState)

  const zoom = useCallback(() => {
    setZoomGraph((prev): ZoomAndHighlightState => {
      const { refAreaLeft, refAreaRight } = prev

      if (refAreaLeft == null || refAreaRight == null) return prev

      const [bottom, top] = getAxisYDomain(data, refAreaLeft, refAreaRight, keys, 1, xKey)

      return {
        ...prev,
        refAreaLeft: undefined,
        refAreaRight: undefined,
        left: refAreaLeft,
        right: refAreaRight,
        bottom,
        top,
      }
    })
  }, [data, keys, xKey])

  



  const { refAreaLeft, refAreaRight, top, bottom } = zoomGraph

  return (
    <div className="highlight-bar-charts w-full" >


      <LineChart
        style={{ width: "100%", maxHeight: "70vh", aspectRatio: 1.618 }}
        data={data}
        onMouseUp={zoom}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} type="category" tick={false} axisLine={false} />
        <YAxis allowDataOverflow domain={[bottom, top]} type="number" width={60} />
        <Tooltip />

        <Legend 
          verticalAlign="top" 
          align="left" 
          layout="horizontal" 
          wrapperStyle={{ width: '100%' }} 
          className="text-left"
        />

        {keys.map((k, idx) => (
          <Line
            key={k}
            type="natural"
            dataKey={k}
            name={k}
            stroke={colors[idx % colors.length]}
            animationDuration={300}
            dot={false}
            isAnimationActive={true}
          />
        ))}

        {refAreaLeft && refAreaRight ? (
          <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />
        ) : null}
      </LineChart>
    </div>
  )
}

export default HighlightAndZoomLineChart
