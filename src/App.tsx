import React, {
  useState,
  useEffect,
  FormEventHandler,
  MouseEventHandler
} from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import './App.css'

const App: React.FC = () => {
  const [page, setPage] = React.useState(0)
  const [data, setData] = useState([])
  const [filterText, setFilterText] = useState('')
  const [sortType, setSortType] = useState('team')
  const [sortDir, setSortDir] = useState(true)
  const [activeTeam, setActiveTeam] = useState('')

  useEffect((): void => {
    fetch('https://scout-backend.herokuapp.com/api')
      .then(res => res.json())
      .then(res => setData(res))
  }, [true])

  const handleChange: FormEventHandler<HTMLInputElement> = e =>
    setFilterText(e.currentTarget.value.toUpperCase())

  const handleSortClick: MouseEventHandler<HTMLTableHeaderCellElement> = e => {
    setSortDir(!sortDir)
    setSortType(e.currentTarget.getAttribute('id') as string)
  }

  const handleTeamClick: MouseEventHandler<HTMLTableDataCellElement> = e => {
    setActiveTeam(e.currentTarget.innerText)
    setPage(3)
  }

  return (
    <main>
      <Header
        onPageClick={(index: number) => setPage(index)}
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

interface FilterProps {
  filterText: string
  onChange: FormEventHandler<HTMLInputElement>
}

const FilterBar: React.FC<FilterProps> = ({
  filterText,
  onChange
}) => (
  <input onChange={onChange} value={filterText} type='text' placeholder='Filter...' />
)

interface HeaderProps {
  page: number
  activeTeam: string
  onPageClick: (index: number) => void
}

const Header: React.FC<HeaderProps> = ({
  page,
  activeTeam,
  onPageClick
}) => {
  const styleActive = { background: 'hsl(291, 64%, 60%)' }

  return (
    <header>
      <h1>{page === 3 ? `${activeTeam} Statistics` : 'Vex Scouting App'}</h1>
      <nav>
        <ul>
          <li
            style={page === 0 ? styleActive : {}}
            onClick={() => onPageClick(0)}>Rankings</li>
          <li
            style={page === 1 ? styleActive : {}}
            onClick={() => onPageClick(1)}>Skills</li>
          <li
            style={page === 2 ? styleActive : {}}
            onClick={() => onPageClick(2)}>Awards</li>
        </ul>
      </nav>
    </header>
  )
}

interface PagesProps {
  data: any[]
  filterText: string
  sortType: string
  sortDir: boolean
  onChange: FormEventHandler<HTMLInputElement>
  onClick: MouseEventHandler<HTMLTableHeaderCellElement>
  onTeamClick: MouseEventHandler<HTMLTableDataCellElement>
}

const Rankings: React.FC<PagesProps> = ({
  data,
  filterText,
  sortType,
  sortDir,
  onChange,
  onClick,
  onTeamClick
}) => (
  <section>
    <h2>Rankings</h2>
    <FilterBar onChange={onChange} filterText={filterText} />
    <table>
      <thead>
        <tr>
          <th onClick={onClick} id='team'>Team</th>
          <th onClick={onClick} id='avgOPR'>Avg. OPR</th>
          <th onClick={onClick} id='avgDPR'>Avg. DPR</th>
          <th onClick={onClick} id='avgCCWM'>Avg. CCWM</th>
          <th onClick={onClick} id='highScore'>Top Match Score</th>
          <th onClick={onClick} id='avgScore'>Avg. Match Score</th>
          <th onClick={onClick} id='winPer'>Win %</th>
          <th onClick={onClick} id='autoWinPer'>Autonomous Win %</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter(team => filterText ? filterText.includes(team.team) : true)
          .sort((a, b) => sortDir ? b[sortType] - a[sortType] : a[sortType] - b[sortType])
          .map((team, i) => (
            <tr key={i}>
              <td onClick={onTeamClick} className='team'>{team.team}</td>
              <td>{team.avgOPR ? (team.avgOPR).toFixed(2) : 'n/a'}</td>
              <td>{team.avgDPR ? (team.avgDPR).toFixed(2) : 'n/a'}</td>
              <td>{team.avgCCWM ? (team.avgCCWM).toFixed(2) : 'n/a'}</td>
              <td>{team.highScore}</td>
              <td>{team.avgScore ? (team.avgScore).toFixed(2) : 'n/a'}</td>
              <td>{team.winPer ? (team.winPer*100).toFixed(2) + '%' : 'n/a'}</td>
              <td>{team.autoWinPer ? (team.autoWinPer*100).toFixed(2) + '%' : 'n/a'}</td>
            </tr>
        ))}
      </tbody>
    </table>
  </section>
)

const Skills: React.FC<PagesProps> = ({
  data,
  filterText,
  sortType,
  sortDir,
  onChange,
  onClick,
  onTeamClick
}) => (
  <section>
    <h2>Skills</h2>
    <FilterBar onChange={onChange} filterText={filterText} />
    <table>
      <thead>
        <tr>
          <th onClick={onClick} id='team'>Team</th>
          <th onClick={onClick} id='driverSkills'>Top Driver Skills</th>
          <th onClick={onClick} id='progSkills'>Top Programming Skills</th>
          <th onClick={onClick} id='totalSkills'>Top Skills Score</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter(team => filterText ? filterText.includes(team.team) : true)
          .sort((a, b) => sortDir ? b[sortType] - a[sortType] : a[sortType] - b[sortType])
          .map((team, i) => (
            <tr key={i}>
              <td onClick={onTeamClick} className='team'>{team.team}</td>
              <td>{team.driverSkills}</td>
              <td>{team.progSkills}</td>
              <td>{team.totalSkills}</td>
            </tr>
        ))}
      </tbody>
    </table>
  </section>
)

const Awards: React.FC<PagesProps> = ({
  data,
  filterText,
  sortType,
  sortDir,
  onChange,
  onClick,
  onTeamClick
}) => (
  <section>
    <h2>Awards</h2>
    <FilterBar onChange={onChange} filterText={filterText} />
    <table>
      <thead>
        <tr>
          <th onClick={onClick} id='team'>Team</th>
          <th onClick={onClick} id='totalAwards'>Total Awards</th>
          <th onClick={onClick} id='awardChamp'>Tournament Champion</th>
          <th onClick={onClick} id='awardSkills'>Robot Skills Champion</th>
          <th onClick={onClick} id='awardExcel'>Excellence Award</th>
          <th onClick={onClick} id='awardDesign'>Design Award</th>
          <th onClick={onClick} id='awardJudge'>Judges Award</th>
        </tr>
      </thead>
      <tbody>
        {data
          .filter(team => filterText ? filterText.includes(team.team) : true)
          .sort((a, b) => sortDir ? b[sortType] - a[sortType] : a[sortType] - b[sortType])
          .map((team, i) => (
            <tr key={i}>
              <td onClick={onTeamClick} className='team'>{team.team}</td>
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

interface TeamProps {
  data: any[]
  activeTeam: string
}

const TeamPage: React.FC<TeamProps> = ({
  data,
  activeTeam
}) => {
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
