import React, { FormEventHandler } from 'react'

interface Props {
  filterText: string
  handleChange: FormEventHandler<HTMLInputElement>
}

const FilterBar: React.FC<Props> =
  ({ filterText, handleChange }) => (
    <input
      onChange={handleChange}
      value={filterText}
      type='text'
      placeholder='Filter...' />
  )

export default FilterBar