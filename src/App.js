import React, { useState, useEffect } from 'react'
import './App.css'

const App = () => {
  const [page, setPage] = useState(0)
  const [data, setData] = useState([
    {"team":"2D","driverSkills":25,"progSkills":10,"totalSkills":35,"avgOPR":null,"avgDPR":2.907425166666666,"avgCCWM":10.359951666666666,"highScore":37,"wins":34,"losses":6,"ties":1,"winPer":0.8292682926829268,"autoWinPer":0.6341463414634146,"avgScore":21.024390243902438,"awardChamp":2,"awardSkills":0,"awardExcel":0,"awardDesign":1,"awardJudge":0},{"team":"2U","driverSkills":28,"progSkills":11,"totalSkills":39,"avgOPR":13.31814,"avgDPR":3.1433332,"avgCCWM":10.17482,"highScore":34,"wins":26,"losses":7,"ties":1,"winPer":0.7647058823529411,"autoWinPer":0.7058823529411765,"avgScore":22.08823529411765,"awardChamp":0,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":1},{"team":"5S","driverSkills":29,"progSkills":13,"totalSkills":42,"avgOPR":13.188833333333333,"avgDPR":4.748086666666667,"avgCCWM":8.440756666666667,"highScore":34,"wins":30,"losses":11,"ties":2,"winPer":0.6976744186046512,"autoWinPer":0.4883720930232558,"avgScore":20.295454545454547,"awardChamp":0,"awardSkills":0,"awardExcel":2,"awardDesign":1,"awardJudge":0},{"team":"5W","driverSkills":19,"progSkills":21,"totalSkills":38,"avgOPR":8.9314125,"avgDPR":5.389155000000001,"avgCCWM":3.5422535,"highScore":32,"wins":19,"losses":11,"ties":0,"winPer":0.6333333333333333,"autoWinPer":0.6333333333333333,"avgScore":17.433333333333334,"awardChamp":0,"awardSkills":0,"awardExcel":0,"awardDesign":1,"awardJudge":0},{"team":"7K","driverSkills":33,"progSkills":18,"totalSkills":48,"avgOPR":16.53582857142857,"avgDPR":1.4508742857142856,"avgCCWM":15.084968285714288,"highScore":39,"wins":38,"losses":8,"ties":1,"winPer":0.8085106382978723,"autoWinPer":0.8297872340425532,"avgScore":23.74468085106383,"awardChamp":3,"awardSkills":3,"awardExcel":3,"awardDesign":0,"awardJudge":0},{"team":"10B","driverSkills":24,"progSkills":11,"totalSkills":34,"avgOPR":8.550464000000002,"avgDPR":6.289236000000001,"avgCCWM":2.2612391999999994,"highScore":33,"wins":19,"losses":11,"ties":1,"winPer":0.6129032258064516,"autoWinPer":0.5483870967741935,"avgScore":17.419354838709676,"awardChamp":0,"awardSkills":2,"awardExcel":0,"awardDesign":0,"awardJudge":1},{"team":"10E","driverSkills":29,"progSkills":17,"totalSkills":46,"avgOPR":12.559853999999998,"avgDPR":4.199096,"avgCCWM":8.36075,"highScore":35,"wins":27,"losses":5,"ties":0,"winPer":0.84375,"autoWinPer":0.75,"avgScore":20.84375,"awardChamp":0,"awardSkills":1,"awardExcel":0,"awardDesign":0,"awardJudge":0},{"team":"10N","driverSkills":29,"progSkills":10,"totalSkills":39,"avgOPR":12.21125,"avgDPR":2.309150725,"avgCCWM":9.9021025,"highScore":33,"wins":18,"losses":6,"ties":0,"winPer":0.75,"autoWinPer":0.5,"avgScore":19.125,"awardChamp":0,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":0},{"team":"12A","driverSkills":29,"progSkills":11,"totalSkills":40,"avgOPR":10.540164,"avgDPR":5.782578,"avgCCWM":4.757592000000001,"highScore":33,"wins":24,"losses":8,"ties":1,"winPer":0.7272727272727273,"autoWinPer":0.5151515151515151,"avgScore":18.78787878787879,"awardChamp":0,"awardSkills":2,"awardExcel":1,"awardDesign":0,"awardJudge":0},{"team":"12E","driverSkills":24,"progSkills":13,"totalSkills":37,"avgOPR":9.555741999999999,"avgDPR":4.358169200000001,"avgCCWM":5.197552,"highScore":33,"wins":21,"losses":9,"ties":1,"winPer":0.6774193548387096,"autoWinPer":0.5806451612903226,"avgScore":17.129032258064516,"awardChamp":0,"awardSkills":0,"awardExcel":1,"awardDesign":0,"awardJudge":0},{"team":"12F","driverSkills":25,"progSkills":13,"totalSkills":34,"avgOPR":10.545294000000002,"avgDPR":4.456166,"avgCCWM":6.089137999999999,"highScore":32,"wins":24,"losses":9,"ties":0,"winPer":0.7272727272727273,"autoWinPer":0.5151515151515151,"avgScore":18.393939393939394,"awardChamp":0,"awardSkills":1,"awardExcel":1,"awardDesign":0,"awardJudge":0},{"team":"12G","driverSkills":28,"progSkills":8,"totalSkills":36,"avgOPR":12.328883999999999,"avgDPR":2.870794,"avgCCWM":9.458079999999999,"highScore":32,"wins":24,"losses":8,"ties":1,"winPer":0.7272727272727273,"autoWinPer":0.5454545454545454,"avgScore":19.484848484848484,"awardChamp":1,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":0},{"team":"21S","driverSkills":26,"progSkills":4,"totalSkills":26,"avgOPR":11.911227142857143,"avgDPR":4.146322714285715,"avgCCWM":7.764894142857144,"highScore":39,"wins":33,"losses":10,"ties":2,"winPer":0.7333333333333333,"autoWinPer":0.35555555555555557,"avgScore":20.288888888888888,"awardChamp":1,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":1},{"team":"39K","driverSkills":16,"progSkills":9,"totalSkills":24,"avgOPR":8.441013333333334,"avgDPR":6.340513333333333,"avgCCWM":2.1005031666666665,"highScore":30,"wins":33,"losses":16,"ties":1,"winPer":0.66,"autoWinPer":0.56,"avgScore":15.948717948717949,"awardChamp":1,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":0},{"team":"39Z","driverSkills":15,"progSkills":6,"totalSkills":21,"avgOPR":6.586040799999999,"avgDPR":10.09862,"avgCCWM":-3.512572,"highScore":27,"wins":11,"losses":22,"ties":0,"winPer":0.3333333333333333,"autoWinPer":0.42424242424242425,"avgScore":14.151515151515152,"awardChamp":0,"awardSkills":0,"awardExcel":0,"awardDesign":1,"awardJudge":0},{"team":"40B","driverSkills":24,"progSkills":7,"totalSkills":31,"avgOPR":10.570134999999999,"avgDPR":4.929972,"avgCCWM":5.64015755,"highScore":35,"wins":50,"losses":21,"ties":2,"winPer":0.684931506849315,"autoWinPer":0.5068493150684932,"avgScore":18.136986301369863,"awardChamp":0,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":0},{"team":"56G","driverSkills":17,"progSkills":9,"totalSkills":26,"avgOPR":8.558585,"avgDPR":4.5940275,"avgCCWM":3.9645675,"highScore":26,"wins":21,"losses":12,"ties":0,"winPer":0.6363636363636364,"autoWinPer":0.45454545454545453,"avgScore":14.484848484848484,"awardChamp":1,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":0},{"team":"56J","driverSkills":21,"progSkills":4,"totalSkills":25,"avgOPR":14.947040000000001,"avgDPR":1.4304976,"avgCCWM":13.516559999999998,"highScore":31,"wins":38,"losses":5,"ties":0,"winPer":0.8837209302325582,"autoWinPer":0.46511627906976744,"avgScore":20.767441860465116,"awardChamp":3,"awardSkills":2,"awardExcel":4,"awardDesign":0,"awardJudge":0},{"team":"62A","driverSkills":15,"progSkills":3,"totalSkills":18,"avgOPR":12.702406666666668,"avgDPR":4.31272,"avgCCWM":8.389698000000001,"highScore":35,"wins":30,"losses":9,"ties":1,"winPer":0.75,"autoWinPer":0.525,"avgScore":19.658536585365855,"awardChamp":3,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":0},{"team":"62X","driverSkills":26,"progSkills":9,"totalSkills":34,"avgOPR":9.557013750000001,"avgDPR":6.2987952499999995,"avgCCWM":3.2582264999999997,"highScore":30,"wins":31,"losses":22,"ties":1,"winPer":0.5740740740740741,"autoWinPer":0.5740740740740741,"avgScore":17.236363636363638,"awardChamp":0,"awardSkills":0,"awardExcel":0,"awardDesign":0,"awardJudge":0},{"team":"91A","driverSkills":29,"progSkills":11,"totalSkills":39,"avgOPR":15.289873999999998,"avgDPR":1.7941795999999997,"avgCCWM":13.495690000000002,"highScore":36,"wins":31,"losses":7,"ties":0,"winPer":0.8157894736842105,"autoWinPer":0.6052631578947368,"avgScore":22.68421052631579,"awardChamp":2,"awardSkills":3,"awardExcel":4,"awardDesign":0,"awardJudge":0},{"team":"109Z","driverSkills":23,"progSkills":11,"totalSkills":34,"avgOPR":12.492928571428573,"avgDPR":3.254057857142857,"avgCCWM":9.238885714285715,"highScore":36,"wins":34,"losses":6,"ties":0,"winPer":0.85,"autoWinPer":0.525,"avgScore":20.275,"awardChamp":1,"awardSkills":0,"awardExcel":1,"awardDesign":0,"awardJudge":0},{"team":"114T","driverSkills":29,"progSkills":24,"totalSkills":53,"avgOPR":17.26546,"avgDPR":0.03905399999999988,"avgCCWM":17.22644,"highScore":36,"wins":35,"losses":3,"ties":0,"winPer":0.9210526315789473,"autoWinPer":0.8421052631578947,"avgScore":23.42105263157895,"awardChamp":3,"awardSkills":4,"awardExcel":4,"awardDesign":1,"awardJudge":0}
  ])
  const [navActive, setNavActive] = useState({
    rank: true,
    skill: false,
    award: false
  })
  const [filterText, setFilterText] = useState('')
  const [sortType, setSortType] = useState('team')
  const [sortDir, setSortDir] = useState(true)

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
  const handleSortClick = e => {
    setSortDir(!sortDir)
    setSortType(e.target.getAttribute('sort'))
  }

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
        sortType={sortType}
        sortDir={sortDir} />}
      {page === 1 && <Skills
        data={data}
        filterText={filterText}
        onChange={handleChange}
        onClick={handleSortClick}
        sortType={sortType}
        sortDir={sortDir} />}
      {page === 2 && <Awards
        data={data}
        filterText={filterText}
        onChange={handleChange}
        onClick={handleSortClick}
        sortType={sortType}
        sortDir={sortDir} />}
      {page === 3 && <TeamPage />}
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

const Rankings = ({ data, onChange, filterText, onClick, sortType, sortDir }) => (
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
              <td>{team.team}</td>
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

const Skills = ({ data, onChange, filterText, onClick, sortType, sortDir }) => (
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

const Awards = ({ data, onChange, filterText, onClick, sortType, sortDir }) => (
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
              <td>{team.team}</td>
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

const TeamPage = () => (
  <section></section>
)

export default App;
