import React, { MouseEventHandler } from 'react'

interface Props {
  dataIDs: string[]
  dataTitles: string[]
  handleClick: MouseEventHandler<HTMLTableHeaderCellElement>
}

const TableHead: React.FC<Props> =
  ({ dataIDs, dataTitles, handleClick }) => (
    <thead>
      <tr>
        <th onClick={handleClick} id='team'>Team</th>
        {dataIDs.map((id, i) => (
          <th onClick={handleClick} key={i} id={id}>
            {dataTitles[i]}
          </th>))}
      </tr>
    </thead>
  )

export default TableHead