import './App.css'
import Header from './components/header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import HighlightAndZoomLineChart from './components/rechart/lineChart'
import { PieChartWithPaddingAngle } from './components/rechart/circleChart'


function App() {

  return (
    <>
     <Header />
    
      <div className="grid grid-cols-3 grid-rows-5 gap-4">
          <div className="col-span-2 row-span-2">
            <Card className="w-full max-w">
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
                        <Card className="w-full max-w">
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
          <div className="row-span-2 col-start-2 row-start-3">3</div>
          <div className="row-span-2 col-start-3 row-start-1">4</div>
          <div className="row-span-2 row-start-3">5</div>
      </div>
    
    </>
  )
}

export default App
