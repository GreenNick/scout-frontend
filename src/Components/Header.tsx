import React from 'react'

interface Props {
  page: number
  activeTeam: string
  handlePageClick: (index: number) => void
}
  
const Header: React.FC<Props> =
  ({ page, activeTeam, handlePageClick }) => {
    const styleActive: React.CSSProperties = { background: 'hsl(291, 64%, 60%)' }
  
    return (
      <header>
        <h1>{page === 3 ? `${activeTeam} Statistics` : 'Vex Scouting App'}</h1>
        <nav>
          <ul>
            <li
              style={page === 0 ? styleActive : {}}
              onClick={() => handlePageClick(0)}>Rankings</li>
            <li
              style={page === 1 ? styleActive : {}}
              onClick={() => handlePageClick(1)}>Skills</li>
            <li
              style={page === 2 ? styleActive : {}}
              onClick={() => handlePageClick(2)}>Awards</li>
          </ul>
        </nav>
      </header>
    )
  }

export default Header