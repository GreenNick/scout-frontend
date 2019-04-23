import React, { MouseEventHandler } from 'react'

interface Props {
  data: any[]
  dataIDs: string[]
  filterText: string
  sortType: string
  sortDir: boolean
  handleTeamClick: MouseEventHandler<HTMLTableDataCellElement>
}

const TableBody: React.FC<Props> =
  ({ data, dataIDs, filterText, sortType, sortDir, handleTeamClick }) => (
    <tbody>
      {data
        .filter(team => filterText ? filterText.includes(team.team) : true)
        .sort((a, b) => sortDir ? b[sortType] - a[sortType] : a[sortType] - b[sortType])
        .map((team, i) => (
          <tr key={i}>
            <td onClick={handleTeamClick} className='team'>{team.team}</td>
            {dataIDs.map((id, i) => (
              <td key={i}>{team[id]}</td>
            ))}
          </tr>
        ))}
    </tbody>
  )

export default TableBody