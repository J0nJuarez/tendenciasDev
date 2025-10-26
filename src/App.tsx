import './App.css'
import Header from './components/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import HighlightAndZoomLineChart from './components/rechart/lineChart'
import { PieChartWithPaddingAngle } from './components/rechart/circleChart'
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Formulariosugerencia from './components/form'



function App() {

  return (
    <>
     <Header />
    
      <div className="grid grid-cols-3 grid-rows-4 gap-4">
          <div className="col-span-2 row-span-2">
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HighlightAndZoomLineChart />
              </CardContent>
              
            </Card>
          </div>
          <div className="row-span-2 col-start-1 row-start-3">
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChartWithPaddingAngle
                  data={[{ name: 'X', value: 10, fill: '#123456' }]}
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
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>A list of your recent invoices.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Invoice</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">INV001</TableCell>
                      <TableCell>Paid</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">$250.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <div className="row-span-2 col-start-3 row-start-1">
            <Card className="w-full h-full">
              <CardHeader>
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p>Hello, this is a sample card content.</p>
                </div>
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
