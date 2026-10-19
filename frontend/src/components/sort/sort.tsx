import './sort.css'

interface SortProps {
    sort:string
    setSort: (value:string) => void
    isSortOpen:boolean
    setIsSortOpen: (value:boolean) => void
    setPage: (value:number) => void
}

export function Sort({sort, setSort, isSortOpen, setIsSortOpen, setPage}:SortProps) {

    const sortOptions:string[] = [
        "popularity", "rating", "release" 
      ]

    return (
        <div className="sort-select">
        <button 
            className="sort-btn"
            onClick={() => setIsSortOpen(!isSortOpen)}>     

            <span>
                {sort}
            </span>
            
            <span>
                {isSortOpen ? "▲" : "▼"}
            </span>                       
        </button>

        {isSortOpen && (
            <div className="sort-options">
                {sortOptions.map((sort) => (
                    <div className="options" key={sort} onClick={() => {
                        setSort(sort)
                        setPage(1)
                        setIsSortOpen(false)
                    }}>
                        {sort}
                    </div>
                ))}
            </div>
        )}
    </div>
    )
}