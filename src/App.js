import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [page, setPage] = useState(0)
  const [data, setData] = useState([
    {"team":"2D","driverSkills":25,"progSkills":10,"totalSkills":35,"avgOPR":13.267383333333335,"avgDPR":2.907425166666666,"avgCCWM":10.359951666666666,"highScore":37,"wins":34,"losses":6,"ties":1,"winPer":0.8292682926829268,"autoWinPer":0.6341463414634146,"avgScore":21.024390243902438,"awardChamp":2,"awardSkills":0,"awardExcel":0,"awardDesign":1,"awardJudge":0},{"team":"2U","driverSkills":28,"progSkills":11,"totalSkills":39,"avgOPR":13.31814,"avgDPR":3.1433332,"avgCCWM":10.17482,"highScore":34,"wins":26,"losses":7,"ties":1,"winPer":0.7647058823529411,"autoWinPer":0.7058823529411765,"avgScore":22.08823529411765,"awardChamp":0,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":1},{"team":"5S","driverSkills":29,"progSkills":13,"totalSkills":42,"avgOPR":13.188833333333333,"avgDPR":4.748086666666667,"avgCCWM":8.440756666666667,"highScore":34,"wins":30,"losses":11,"ties":2,"winPer":0.6976744186046512,"autoWinPer":0.4883720930232558,"avgScore":20.295454545454547,"awardChamp":0,"awardSkills":0,"awardExcel":2,"awardDesign":1,"awardJudge":0},{"team":"5W","driverSkills":19,"progSkills":21,"totalSkills":38,"avgOPR":8.9314125,"avgDPR":5.389155000000001,"avgCCWM":3.5422535,"highScore":32,"wins":19,"losses":11,"ties":0,"winPer":0.6333333333333333,"autoWinPer":0.6333333333333333,"avgScore":17.433333333333334,"awardChamp":0,"awardSkills":0,"awardExcel":0,"awardDesign":1,"awardJudge":0},{"team":"7K","driverSkills":33,"progSkills":18,"totalSkills":48,"avgOPR":16.53582857142857,"avgDPR":1.4508742857142856,"avgCCWM":15.084968285714288,"highScore":39,"wins":38,"losses":8,"ties":1,"winPer":0.8085106382978723,"autoWinPer":0.8297872340425532,"avgScore":23.74468085106383,"awardChamp":3,"awardSkills":3,"awardExcel":3,"awardDesign":0,"awardJudge":0},{"team":"10B","driverSkills":24,"progSkills":11,"totalSkills":34,"avgOPR":8.550464000000002,"avgDPR":6.289236000000001,"avgCCWM":2.2612391999999994,"highScore":33,"wins":19,"losses":11,"ties":1,"winPer":0.6129032258064516,"autoWinPer":0.5483870967741935,"avgScore":17.419354838709676,"awardChamp":0,"awardSkills":2,"awardExcel":0,"awardDesign":0,"awardJudge":1},{"team":"10E","driverSkills":29,"progSkills":17,"totalSkills":46,"avgOPR":12.559853999999998,"avgDPR":4.199096,"avgCCWM":8.36075,"highScore":35,"wins":27,"losses":5,"ties":0,"winPer":0.84375,"autoWinPer":0.75,"avgScore":20.84375,"awardChamp":0,"awardSkills":1,"awardExcel":0,"awardDesign":0,"awardJudge":0},{"team":"10N","driverSkills":29,"progSkills":10,"totalSkills":39,"avgOPR":12.21125,"avgDPR":2.309150725,"avgCCWM":9.9021025,"highScore":33,"wins":18,"losses":6,"ties":0,"winPer":0.75,"autoWinPer":0.5,"avgScore":19.125,"awardChamp":0,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":0}
  ])
  const [navActive, setNavActive] = useState({
    rank: true,
    skill: false,
    award: false
  })
  const [filterText, setFilterText] = useState('')
  const [sortType, setSortType] = useState('team')

  // useEffect(() => {
  //   fetch('https://scout-backend.herokuapp.com/api')
  //     .then(res => res.json())
  //     .then(res => setData(res))
  // })

  const handleRankClick = () => {
    setPage(0)
    setNavActive({ rank: true, skill: false, award: false })
  }
  const handleSkillClick = () => {
    setPage(1)
    setNavActive({ rank: false, skill: true, award: false })
  }
  const handleAwardClick = () => {
    setPage(2)
    setNavActive({ rank: false, skill: false, award: true })
  }
  const handleChange = e => setFilterText(e.target.value.toUpperCase())
  const handleSortClick = e => setSortType(e.target.getAttribute('sort'))

  return (
    <main>
      <Header
        navActive={navActive}
        onRankClick={handleRankClick}
        onSkillClick={handleSkillClick}
        onAwardClick={handleAwardClick} />
      {page === 0 && <Rankings
        data={data}
        filterText={filterText}
        onChange={handleChange}
        onClick={handleSortClick}
        sortType={sortType} />}
      {page === 1 && <Skills
        data={data}
        filterText={filterText}
        onChange={handleChange}
        onClick={handleSortClick}
        sortType={sortType} />}
      {page === 2 && <Awards
        data={data}
        filterText={filterText}
        onChange={handleChange}
        onClick={handleSortClick}
        sortType={sortType} />}
    </main>
  )
}

const FilterBar = ({ onChange, filterText }) => (
  <input onChange={onChange} value={filterText} type='text' placeholder='Filter...' />
)

const Header = ({ navActive, onRankClick, onSkillClick, onAwardClick }) => {
  const styleActive = { background: 'hsl(291, 64%, 60%)' }

  return (
    <header>
      <h1>Vex Scouting App</h1>
      <nav>
        <ul>
          <li
            style={navActive.rank ? styleActive : {}}
            onClick={onRankClick}>Rankings</li>
          <li
            style={navActive.skill ? styleActive : {}}
            onClick={onSkillClick}>Skills</li>
          <li
            style={navActive.award ? styleActive : {}}
            onClick={onAwardClick}>Awards</li>
        </ul>
      </nav>
    </header>
  )
}

const Rankings = ({ data, onChange, filterText, onClick, sortType }) => (
  <section>
    <h2>Rankings</h2>
    <FilterBar onChange={onChange} filterText={filterText} />
    <table>
      <thead>
        <tr>
          <th onClick={onClick} sort='team'>Team</th>
          <th onClick={onClick} sort='avgOPR'>Avg. OPR</th>
          <th onClick={onClick} sort='avgDPR'>Avg. DPR</th>
          <th onClick={onClick} sort='avgCCWM'>Avg. CCWM</th>
          <th onClick={onClick} sort='highScore'>Top Match Score</th>
          <th onClick={onClick} sort='avgScore'>Avg. Match Score</th>
          <th onClick={onClick} sort='winPer'>Win %</th>
          <th onClick={onClick} sort='autoWinPer'>Autonomous Win %</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter(team => filterText ? filterText.includes(team.team) : true)
          .sort((a, b) => b[sortType] - a[sortType])
          .map((team, i) => (
            <tr key={i}>
              <td>{team.team}</td>
              <td>{(team.avgOPR).toFixed(2)}</td>
              <td>{(team.avgDPR).toFixed(2)}</td>
              <td>{(team.avgCCWM).toFixed(2)}</td>
              <td>{team.highScore}</td>
              <td>{(team.avgScore).toFixed(2)}</td>
              <td>{(team.winPer*100).toFixed(2)}%</td>
              <td>{(team.autoWinPer*100).toFixed(2)}%</td>
            </tr>
        ))}
      </tbody>
    </table>
  </section>
)

const Skills = ({ data, onChange, filterText, onClick, sortType }) => (
  <section>
    <h2>Skills</h2>
    <FilterBar onChange={onChange} filterText={filterText} />
    <table>
      <thead>
        <tr>
          <th onClick={onClick} sort='team'>Team</th>
          <th onClick={onClick} sort='driverSkills'>Top Driver Skills</th>
          <th onClick={onClick} sort='progSkills'>Top Programming Skills</th>
          <th onClick={onClick} sort='totalSkills'>Top Skills Score</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter(team => filterText ? filterText.includes(team.team) : true)
          .sort((a, b) => b[sortType] - a[sortType])
          .map((team, i) => (
            <tr key={i}>
              <td>{team.team}</td>
              <td>{team.driverSkills}</td>
              <td>{team.progSkills}</td>
              <td>{team.totalSkills}</td>
            </tr>
        ))}
      </tbody>
    </table>
  </section>
)

const Awards = ({ data, onChange, filterText, onClick, sortType }) => (
  <section>
    <h2>Awards</h2>
    <FilterBar onChange={onChange} filterText={filterText} />
    <table>
      <thead>
        <tr>
          <th onClick={onClick} sort='team'>Team</th>
          <th onClick={onClick} sort='awardChamp'>Tournament Champion</th>
          <th onClick={onClick} sort='awardSkills'>Robot Skills Champion</th>
          <th onClick={onClick} sort='awardExcel'>Excellence Award</th>
          <th onClick={onClick} sort='awardDesign'>Design Award</th>
          <th onClick={onClick} sort='awardJudge'>Judges Award</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter(team => filterText ? filterText.includes(team.team) : true)
          .sort((a, b) => b[sortType] - a[sortType])
          .map((team, i) => (
            <tr key={i}>
              <td>{team.team}</td>
              <td>{team.awardChamp}</td>
              <td>{team.awardSkills}</td>
              <td>{team.awardExcel}</td>
              <td>{team.awardDesign}</td>
              <td>{team.awardJudge}</td>
            </tr>
        ))}
      </tbody>
    </table>
  </section>
)

export default App;
