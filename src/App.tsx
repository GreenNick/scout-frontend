import React, {
  useState,
  FormEventHandler,
  MouseEventHandler
} from 'react'
import { Pie, Bar } from 'react-chartjs-2'
import { useDataApi } from './Hooks/useDataApi'
import Header from './Components/Header'
import FilterBar from './Components/FilterBar'
import TableHead from './Components/TableHead'
import TableBody from './Components/TableBody'
import './App.css'

const App: React.FC = () => {
  const [page, setPage] = React.useState(0)
  const [filterText, setFilterText] = useState('')
  const [sortType, setSortType] = useState('team')
  const [sortDir, setSortDir] = useState(true)
  const [activeTeam, setActiveTeam] = useState('')
  const { data, isLoading, isError } = useDataApi()

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

  const handlePageClick = (index: number): void => setPage(index)

  return (
    <main>
      <Header
        handlePageClick={handlePageClick}
        page={page}
        activeTeam={activeTeam} />
      {page === 0 && <Rankings
        data={data}
        filterText={filterText}
        handleChange={handleChange}
        handleClick={handleSortClick}
        sortType={sortType}
        sortDir={sortDir}
        handleTeamClick={handleTeamClick} />}
      {page === 1 && <Skills
        data={data}
        filterText={filterText}
        handleChange={handleChange}
        handleClick={handleSortClick}
        sortType={sortType}
        sortDir={sortDir}
        handleTeamClick={handleTeamClick} />}
      {page === 2 && <Awards
        data={data}
        filterText={filterText}
        handleChange={handleChange}
        handleClick={handleSortClick}
        sortType={sortType}
        sortDir={sortDir}
        handleTeamClick={handleTeamClick} />}
      {page === 3 && <TeamPage
        data={data}
        activeTeam={activeTeam} />}
    </main>
  )
}

interface PagesProps {
  data: any[]
  filterText: string
  sortType: string
  sortDir: boolean
  handleChange: FormEventHandler<HTMLInputElement>
  handleClick: MouseEventHandler<HTMLTableHeaderCellElement>
  handleTeamClick: MouseEventHandler<HTMLTableDataCellElement>
}

const Rankings: React.FC<PagesProps> =
  ({ data, filterText, sortType, sortDir, handleChange, handleClick, handleTeamClick }) => (
    <section>
      <h2>Rankings</h2>
      <FilterBar handleChange={handleChange} filterText={filterText} />
      <table>
        <TableHead
          dataIDs={['avgOPR', 'avgDPR', 'avgCCWM', 'highScore', 'avgScore', 'winPer', 'autoWinPer']}
          dataTitles={['Avg. OPR', 'Avg. DPR', 'Avg. CCWM', 'Top Match Score', 'Avg. Match Score', 'Win %', 'Autonomous Win %']}
          handleClick={handleClick} />
        <tbody>
          {data
            .filter(team => filterText ? filterText.includes(team.team) : true)
            .sort((a, b) => sortDir ? b[sortType] - a[sortType] : a[sortType] - b[sortType])
            .map((team, i) => (
              <tr key={i}>
                <td onClick={handleTeamClick} className='team'>{team.team}</td>
                <td>{team.avgOPR ? (team.avgOPR).toFixed(2) : 'n/a'}</td>
                <td>{team.avgDPR ? (team.avgDPR).toFixed(2) : 'n/a'}</td>
                <td>{team.avgCCWM ? (team.avgCCWM).toFixed(2) : 'n/a'}</td>
                <td>{team.highScore}</td>
                <td>{team.avgScore ? (team.avgScore).toFixed(2) : 'n/a'}</td>
                <td>{team.winPer ? (team.winPer * 100).toFixed(2) + '%' : 'n/a'}</td>
                <td>{team.autoWinPer ? (team.autoWinPer * 100).toFixed(2) + '%' : 'n/a'}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  )

const Skills: React.FC<PagesProps> =
  ({ data, filterText, sortType, sortDir, handleChange, handleClick, handleTeamClick }) => (
    <section>
      <h2>Skills</h2>
      <FilterBar handleChange={handleChange} filterText={filterText} />
      <table>
        <TableHead 
          dataIDs={['driverSkills', 'progSkills', 'totalSkills']}
          dataTitles={['Top Driver Skills', 'Top Skills Score']}
          handleClick={handleClick} />
        <TableBody 
          data={data}
          dataIDs={['driverSkills', 'progSkills', 'totalSkills']}
          filterText={filterText}
          sortType={sortType}
          sortDir={sortDir}
          handleTeamClick={handleTeamClick} />
      </table>
    </section>
  )

const Awards: React.FC<PagesProps> =
  ({ data, filterText, sortType, sortDir, handleChange, handleClick, handleTeamClick }) => (
    <section>
      <h2>Awards</h2>
      <FilterBar handleChange={handleChange} filterText={filterText} />
      <table>
        <TableHead
          dataIDs={['totalAwards', 'awardChamp', 'awardSkills', 'awardExcel', 'awardDesign', 'awardJudge']}
          dataTitles={['Total Awards', 'Tournament Champion', 'Robot Skills Champion', 'Excellence Award', 'Design Award', 'Judges Award']}
          handleClick={handleClick} />
        <TableBody 
          data={data}
          dataIDs={['totalAwards', 'awardChamp', 'awardSkills', 'awardExcel', 'awardDesign', 'awardJudge']}
          filterText={filterText}
          sortType={sortType}
          sortDir={sortDir}
          handleTeamClick={handleTeamClick} />
      </table>
    </section>
  )

interface TeamProps {
  data: any[]
  activeTeam: string
}

const TeamPage: React.FC<TeamProps> =
  ({ data, activeTeam }) => {
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
          <p>Win Percentage: {teamData.winPer && (teamData.winPer * 100).toFixed(2)}%</p>
          <p>Autonomous Win Percentage: {teamData.autoWinPer && (teamData.autoWinPer * 100).toFixed(2)}%</p>
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
