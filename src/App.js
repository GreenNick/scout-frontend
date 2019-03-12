import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [data, setData] = useState([
    {"team":"2D","driverSkills":1,"progSkills":1,"totalSkills":1,"avgOPR":13.267383333333335,"avgDPR":2.907425166666666,"avgCCWM":10.359951666666666,"highScore":37,"wins":34,"losses":6,"ties":1,"winPer":0.8292682926829268,"autoWinPer":0.6341463414634146,"avgScore":21.024390243902438,"awardChamp":2,"awardSkills":0,"awardExcel":0,"awardDesign":1,"awardJudge":0},
    {"team":"2U","driverSkills":1,"progSkills":1,"totalSkills":1,"avgOPR":13.31814,"avgDPR":3.1433332,"avgCCWM":10.17482,"highScore":34,"wins":26,"losses":7,"ties":1,"winPer":0.7647058823529411,"autoWinPer":0.7058823529411765,"avgScore":22.08823529411765,"awardChamp":0,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":1}
  ])

  // useEffect(() => {
  //   fetch('https://scout-backend.herokuapp.com/api')
  //     .then(res => res.json())
  //     .then(res => setData(res))
  // })

  return (
    <div className="App">
      
    </div>
  )
}

export default App;
