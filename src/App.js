import React, { useState, useEffect } from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import './App.css'

const App = () => {
  const [page, setPage] = useState(0)
  const [data, setData] = useState([])
  const [navActive, setNavActive] = useState({
    rank: true,
    skill: false,
    award: false
  })
  const [filterText, setFilterText] = useState('')
  const [sortType, setSortType] = useState('team')
  const [sortDir, setSortDir] = useState(true)
  const [activeTeam, setActiveTeam] = useState('')

  useEffect(() => {
    fetch('https://scout-backend.herokuapp.com/api')
      .then(res => res.json())
      .then(res => setData(res))
  }, [true])

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
  const handleSortClick = e => {
    setSortDir(!sortDir)
    setSortType(e.target.getAttribute('sort'))
  }
  const handleTeamClick = e => {
    setActiveTeam(e.target.innerText)
    setNavActive({ rank: false, skill: false, award: false })
    setPage(3)
  }

  return (
    <main>
      <Header
        navActive={navActive}
        onRankClick={handleRankClick}
        onSkillClick={handleSkillClick}
        onAwardClick={handleAwardClick}
        page={page}
        activeTeam={activeTeam} />
      {page === 0 && <Rankings
        data={data}
        filterText={filterText}
        onChange={handleChange}
        onClick={handleSortClick}
        sortType={sortType}
        sortDir={sortDir}
        onTeamClick={handleTeamClick} />}
      {page === 1 && <Skills
        data={data}
        filterText={filterText}
        onChange={handleChange}
        onClick={handleSortClick}
        sortType={sortType}
        sortDir={sortDir}
        onTeamClick={handleTeamClick} />}
      {page === 2 && <Awards
        data={data}
        filterText={filterText}
        onChange={handleChange}
        onClick={handleSortClick}
        sortType={sortType}
        sortDir={sortDir}
        onTeamClick={handleTeamClick} />}
      {page === 3 && <TeamPage
        data={data}
        activeTeam={activeTeam} />}
    </main>
  )
}

const FilterBar = ({ onChange, filterText }) => (
  <input onChange={onChange} value={filterText} type='text' placeholder='Filter...' />
)

const Header = ({ navActive, onRankClick, onSkillClick, onAwardClick, page, activeTeam }) => {
  const styleActive = { background: 'hsl(291, 64%, 60%)' }

  return (
    <header>
      <h1>{page === 3 ? `${activeTeam} Statistics` : 'Vex Scouting App'}</h1>
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

const Rankings = ({ data, onChange, filterText, onClick, sortType, sortDir, onTeamClick }) => (
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
          .sort((a, b) => sortDir ? b[sortType] - a[sortType] : a[sortType] - b[sortType])
          .map((team, i) => (
            <tr key={i}>
              <td onClick={onTeamClick} id='team'>{team.team}</td>
              <td>{team.avgOPR && (team.avgOPR).toFixed(2)}</td>
              <td>{team.avgDPR && (team.avgDPR).toFixed(2)}</td>
              <td>{team.avgCCWM && (team.avgCCWM).toFixed(2)}</td>
              <td>{team.highScore}</td>
              <td>{team.avgScore && (team.avgScore).toFixed(2)}</td>
              <td>{team.winPer && (team.winPer*100).toFixed(2)}%</td>
              <td>{team.autoWinPer && (team.autoWinPer*100).toFixed(2)}%</td>
            </tr>
        ))}
      </tbody>
    </table>
  </section>
)

const Skills = ({ data, onChange, filterText, onClick, sortType, sortDir, onTeamClick }) => (
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
          .sort((a, b) => sortDir ? b[sortType] - a[sortType] : a[sortType] - b[sortType])
          .map((team, i) => (
            <tr key={i}>
              <td onClick={onTeamClick} id='team'>{team.team}</td>
              <td>{team.driverSkills}</td>
              <td>{team.progSkills}</td>
              <td>{team.totalSkills}</td>
            </tr>
        ))}
      </tbody>
    </table>
  </section>
)

const Awards = ({ data, onChange, filterText, onClick, sortType, sortDir, onTeamClick }) => (
  <section>
    <h2>Awards</h2>
    <FilterBar onChange={onChange} filterText={filterText} />
    <table>
      <thead>
        <tr>
          <th onClick={onClick} sort='team'>Team</th>
          <th onClick={onClick} sort='totalAwards'>Total Awards</th>
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
          .sort((a, b) => sortDir ? b[sortType] - a[sortType] : a[sortType] - b[sortType])
          .map((team, i) => (
            <tr key={i}>
              <td onClick={onTeamClick} id='team'>{team.team}</td>
              <td>{team.totalAwards}</td>
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

const TeamPage = ({ data, activeTeam }) => {
  const teamData = data.filter(team => team.team === activeTeam)[0]
  
  return (
    <div className='container'>
      <section className='rankings'>
        <h2>Rankings</h2>
        <p>Average OPR: {teamData.avgOPR && (teamData.avgOPR).toFixed(2)}</p>
        <p>Average DPR: {teamData.avgDPR && (teamData.avgDPR).toFixed(2)}</p>
        <p>Average CCWM: {teamData.avgCCWM && (teamData.avgCCWM).toFixed(2)}</p>
        <p>Top Match Score: {teamData.highScore}</p>
        <p>Average Match Score: {teamData.avgScore && (teamData.avgScore).toFixed(2)}</p>
        <p>Win Percentage: {teamData.winPer && (teamData.winPer*100).toFixed(2)}%</p>
        <p>Autonomous Win Percentage: {teamData.autoWinPer && (teamData.autoWinPer*100).toFixed(2)}%</p>
      </section>
      <section className='awards'>
        <h2>Awards</h2>
        <Bar
          data={{
            labels: ['Tournament Champion', 'Robot Skills Champion', 'Excellence Award', 'Design Award', 'Judges Award'],
            datasets: [{
              data: [teamData.awardChamp, teamData.awardSkills, teamData.awardExcel, teamData.awardDesign, teamData.awardJudge],
              backgroundColor: '#00BCD4',
              borderColor: 'white',
              borderWidth: 2
            }]
          }}
          options={{
            legend: {
              position: 'none'
            }
          }} />
      </section>
      <section className='ratio'>
        <h2>Win/Loss Ratio</h2>
        <Pie
          data={{
            labels: ['Wins', 'Losses', 'Ties'],
            datasets: [{
              label: 'Win/Loss Ratio',
              data: [teamData.wins, teamData.losses, teamData.ties],
              backgroundColor: [
                '#00BCD4',
                '#8BC34A',
                '#FF9800'
              ],
              borderColor: [
                'white',
                'white',
                'white'
              ],
              borderWidth: 2
            }]
          }}
          options={{
            legend: {
              position: 'left',
              labels: {
                boxWidth: 16,
                fontSize: 16
              }
            }
        }} />
      </section>
    </div>
  )
}

export default App;
