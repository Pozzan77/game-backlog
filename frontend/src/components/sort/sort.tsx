import './sort.css'

interface SortProps {
    sort:string
    setSort: (value:string) => void
    isSortOpen:boolean
    setIsSortOpen: (value:boolean) => void
}

export function Sort({sort, setSort, isSortOpen, setIsSortOpen}:SortProps) {

    const sortOptions:string[] = [
        "Popularity", "Rating", "Realease" 
      ]

    return (
        <div className={`sort-select ${isSortOpen} ? "open" : ""}`}>
        <button 
            className="sort-btn"
            onClick={() => setIsSortOpen(!isSortOpen)}>     

            <span>
                {sort}
            </span>
            
            <span className="arrow">
                {isSortOpen ? "▲" : "▼"}
            </span>                       
        </button>

        {isSortOpen && (
            <div className="sort-options">
                {sortOptions.map((sort) => (
                    <div className="options" key={sort} onClick={() => {
                        setSort(sort)
                    }}>
                        {sort}
                    </div>
                ))}
            </div>
        )}
    </div>
    )
}