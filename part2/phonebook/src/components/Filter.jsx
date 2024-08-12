const Filter = ({newFilter, handleFilterChange}) => {
    return (
        <>filter shown with <input value={newFilter} onChange={handleFilterChange}/></>
    )
}

export default Filter