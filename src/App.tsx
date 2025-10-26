import "./App.css"
import Header from "./components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import HighlightAndZoomLineChart from "./components/rechart/lineChart"
import { PieChartWithPaddingAngle } from "./components/rechart/circleChart"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Formulariosugerencia from "./components/form"
import FiltroCategoria from "./components/filtro"
import { useJobData } from "./hooks/useJobData"
import { useMemo, useState } from "react"
import Loader from "./components/cargando"

type TechData = { tecnologia: string; ofertas: number | string }

function App() {
  const { data, isLoading, error } = useJobData()
  const [category, setCategory] = useState<"Todos" | "frontend" | "backend" | "lenguajes" | "ecosistema">("Todos")

  const top10Data = useMemo(() => {
    if (!data) return []

    const dates = Object.keys(data)
    if (dates.length === 0) return []

    const techNames = data[dates[0]][category].map((t) => t.tecnologia)

    const averages = techNames.map((tech) => {
      const values = dates.map((date) => {
        const techEntry = data[date][category].find((t) => t.tecnologia === tech)
        return Number(techEntry?.ofertas ?? 0)
      })
      const avg = values.reduce((a, b) => a + b, 0) / values.length
      return { tecnologia: tech, ofertas: avg }
    })

    const top10 = averages
      .sort((a, b) => b.ofertas - a.ofertas)
      .slice(0, 10)

    return top10.map((t, i) => ({
      name: i + 1,
      cost: t.ofertas,
      impression: t.ofertas,
      label: t.tecnologia,
    }))
  }, [data, category])

  if (isLoading) return <Loader />
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>
  if (!data) return null

  return (
    <>
      <Header />

      <FiltroCategoria
        category={category}
        onChange={(c) => setCategory(c as any)}
        options={["Todos","frontend", "backend", "lenguajes", "ecosistema"]}
      />
      <p className="mt-5">Información de los últimos 28 días</p>
      <div className="flex flex-col md:grid md:grid-cols-3 md:grid-rows-4 gap-4 py-3">        
        <div className="col-span-2 row-span-2">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>Tendencia media ({category})</CardTitle>
              <CardDescription>
                Promedio de ofertas de las 10 tecnologías más demandadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HighlightAndZoomLineChart
                data={top10Data}
                showZoomOut
                maxWidth="100%"
              />
            </CardContent>
          </Card>
        </div>

        <div className="row-span-2 col-start-1 row-start-3">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>Distribución (%)</CardTitle>
              <CardDescription>
                Participación de cada tecnología en el top 10
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PieChartWithPaddingAngle
                data={top10Data.map((d, i) => ({
                  name: d.label,
                  value: d.cost,
                  fill: `hsl(var(--chart-${(i % 5) + 1}))`, // colores del tema
                }))}
                isAnimationActive={false}
                maxWidth="400px"
                innerRadius="60%"
                outerRadius="90%"
                paddingAngle={8}
                cornerRadius="10%"
              />
            </CardContent>
          </Card>
        </div>

        <div className="row-span-2 col-start-2 row-start-3">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>Top 10 tecnologías</CardTitle>
              <CardDescription>
                Media de ofertas por tecnología ({category})
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>Media de ofertas por día</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Posición</TableHead>
                    <TableHead>Tecnología</TableHead>
                    <TableHead className="text-right">Ofertas</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {top10Data.map((row, index) => (
                    <TableRow key={row.label}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="font-medium">{row.label}</TableCell>
                      <TableCell className="text-right">
                        {Math.round(row.cost).toLocaleString("es-ES")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

      
        <div className="row-span-2 col-start-3 row-start-1">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle>Resumen</CardTitle>
              <CardDescription>
                Datos medios calculados a partir de todas las fechas del JSON
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Las tecnologías se muestran ordenadas por volumen medio de ofertas.</p>
            </CardContent>
          </Card>
        </div>


        <div className="row-span-2 row-start-3">
          <Formulariosugerencia />
        </div>
      </div>
    </>
  )
}

export default App
