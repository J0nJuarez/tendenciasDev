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

// calcula dominio Y usando múltiples keys (refs)
const getAxisYDomain = (
  data: Record<string, any>[],
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
  data?: Record<string, any>[]
  keys?: string[]
  xKey?: string
  showZoomOut?: boolean
  maxWidth?: string | number
}

const defaultSample = [
  { date: "1", A: 4, B: 100 },
  { date: "2", A: 2, B: 120 },
  { date: "3", A: 1, B: 150 },
]

const colors = ["#8884d8", "#82ca9d", "#ff7300", "#413ea0", "#00C49F", "#FFBB28", "#FF8042", "#0088FE", "#A28FD0", "#E67E22"]

const HighlightAndZoomLineChart = ({
  data = defaultSample,
  keys = ["A", "B"],
  xKey = "date",
  showZoomOut = true,
  maxWidth = "700px",
}: Props) => {
  const [zoomGraph, setZoomGraph] = useState<ZoomAndHighlightState>(initialState)

  const zoom = useCallback(() => {
    setZoomGraph((prev) => {
      let { refAreaLeft, refAreaRight } = prev

      if (refAreaLeft === refAreaRight || refAreaRight === "") {
        return {
          ...prev,
          refAreaLeft: undefined,
          refAreaRight: undefined,
        }
      }

      if (refAreaLeft && refAreaRight && String(refAreaLeft) > String(refAreaRight))
        ;[refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft]

      // calcular dominio Y usando todas las keys en la gráfica (todas al eje izquierdo)
      const [bottom, top] = getAxisYDomain(data, refAreaLeft, refAreaRight, keys, 1, xKey)

      return {
        ...prev,
        refAreaLeft: undefined,
        refAreaRight: undefined,
        left: refAreaLeft ?? initialState.left,
        right: refAreaRight ?? initialState.right,
        bottom,
        top,
      }
    })
  }, [data, keys, xKey])

  const zoomOut = useCallback(() => {
    setZoomGraph(initialState)
  }, [])

  const onMouseDown = useCallback((e: any) => {
    if (!e) return
    setZoomGraph((prev) => ({ ...prev, refAreaLeft: e.activeLabel }))
  }, [])

  const onMouseMove = useCallback((e: any) => {
    if (!e) return
    setZoomGraph((prev) => {
      if (prev.refAreaLeft) {
        return { ...prev, refAreaRight: e.activeLabel }
      }
      return prev
    })
  }, [])

  const { refAreaLeft, refAreaRight, left, right, top, bottom } = zoomGraph

  return (
    <div className="highlight-bar-charts" style={{ userSelect: "none", width: "100%" }}>
      {showZoomOut ? (
        <button type="button" className="btn update" onClick={zoomOut}>
          Zoom Out
        </button>
      ) : null}

      <LineChart
        style={{ width: "100%", maxWidth, maxHeight: "70vh", aspectRatio: 1.618 }}
        data={data}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={zoom}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} type="category" />
        <YAxis allowDataOverflow domain={[bottom, top]} type="number" width={60} />
        <Tooltip />
        <Legend verticalAlign="top" />

        {keys.map((k, idx) => (
          <Line
            key={k}
            type="natural"
            dataKey={k}
            name={k}
            stroke={colors[idx % colors.length]}
            animationDuration={300}
            dot={false}
            isAnimationActive={false}
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
