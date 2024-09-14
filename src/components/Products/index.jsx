import React, {useState, useEffect} from 'react'
import Select from 'react-select'
import Header from '../Header'
import { PRODUCTS_API_URL, CATEGORIES, SORTING_OPTIONS } from '../../constants'
import { Card } from '../Card'
import './index.css'


const Products = () => {
const [products, setProducts] = useState([])
const [filterData, setFilterData] = useState(products)
const [isLoading, setIsLoading] = useState(false)
const [categoryFilters, setCategoryFilters] = useState([])
const [sortValue, setSortValue] = useState({})
const [searchInput, setSearchInput] = useState('')
const [limit, setLimit] = useState(6)

useEffect(() => {
    const getProducts = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${PRODUCTS_API_URL}?limit=${limit}`)
            const jsonData = await response.json()
            setProducts(jsonData)
            setFilterData(jsonData)
            setIsLoading(false)
        } catch (error) {
            throw new Error(error)
        }
    }
    getProducts()

}, [limit])
// const categories = Array.from(new Set(filterData.map(data => data.category)))

useEffect(() => {
    if(categoryFilters?.length > 0){
        const updatedData = products.filter((product) => {
            return categoryFilters.map(item => {
                return item
            }).includes(product.category)
        })
    setFilterData(updatedData)
    } else {
        setFilterData(filterData)
    }
}, [categoryFilters, products])

function filterHandler(event) {
    if(event.target.checked) {
        setCategoryFilters([...categoryFilters, event.target.value])
    }else {
        setCategoryFilters(categoryFilters.filter((category) => category !== event.target.value))
    }
}
console.log('sort', sortValue)
const updatedFilteredData = sortValue ? filterData.sort((a,b) => sortValue?.sortingOrder === 'asc' ? a.price-b.price : b.price - a.price) : filterData
console.log('updatedfil', updatedFilteredData)
const filterSearchData = searchInput !== '' && searchInput?.length > 0 && updatedFilteredData?.length > 0 ? updatedFilteredData.filter((product) => (product?.title)?.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1) : updatedFilteredData
const loadMore = (e) => {
    e.preventDefault()
    setLimit(limit+6)
}

const Loader = () => {
    return <div className='loader'></div>
}

const showProducts = () => {
    return (
        <>
        <div className='search-bar'>
            <div className='search-input'>
                <label>
                    <input
                        type='search'
                        role='searchbox'
                        aria-description='Search results will appear below'
                        aria-label='earch product name'
                        placeholder='Search product name...'
                        aria-required={true}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </label>
            </div>
                <Select
                    className='select-sorting'
                    options={SORTING_OPTIONS}
                    isClearable
                    onChange={(e) => setSortValue(e)}
                    aria-label='Sorting options'
                    placeholder="Sort by Price"
                
                />
            </div>
            
            <div className='products'>  
                <div className='filter-menu'>
                    <h2 className='sub-head'>Filters </h2>
                    <div>
                        {CATEGORIES.map((ele, index) => {
                            return (
                                <div className='filter-menu-list' key={index}>
                                    <label>
                                        <input
                                            name={ele}
                                            className='chekbox'
                                            type='checkbox'
                                            value={ele}
                                            aria-label={ele}
                                            aria-required={true}
                                            onChange={filterHandler}
                                        />{' '}
                                        {ele}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {filterSearchData?.length > 0 ? (
                <div className='products-list' role='listbox'>
                {filterSearchData.map((product, index) => {
                        return(
                        <Card
                            key={index}
                            title = {product.title}
                            image={product.image}
                            price={product.price}
                            description={product.description}
                        />
                        )
                    })
                }
                </div>
                ) : <Loader />}
            </div>
            
        </>
    )
}
    return (
        <>
        <Header />
            <div className='main-app-continer'>
                {showProducts()}
                <div className='load-more'>
                    <button 
                        className='loadMore-btn'
                        role='button'
                        onClick={(e) => loadMore(e)}>
                            {isLoading ? `Loading...` : `Load More`}
                    </button>
                </div> 
            </div>
        </>
    )

}

export default Products