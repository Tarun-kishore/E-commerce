import React,{useEffect,useState,useContext} from 'react'
import { axiosContext,cartContext } from "../../App";
import { Pagination } from "react-bootstrap";
import Product from '../Product/Product.jsx'




export default function Cart() {
    const [products,setProducts] = useState([])
    const {cart}=useContext(cartContext)


    const axios=useContext(axiosContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumbers,setPageNumbers]= useState([1]);

    // This function will handle page click events
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        axios.post(`/product/cart?page=${currentPage}&limit=10`,{cart})
            .then(response =>{
                setProducts(response.data.products) 

                if(response.data.totalPages != totalPages){
                    const pages=[]
                    for (let i = 1; i <= response.data.totalPages; i++) {
                        pages.push(i);
                    }
                    setPageNumbers(pages)
                    setTotalPages(response.data.totalPages)
                }
            })
            .catch((e)=>console.log(e))
    }, [currentPage,cart]);



    return (<>
        <div>
        <Pagination>
        <Pagination.First onClick={() => handlePageClick(1)} />
        <Pagination.Prev
        onClick={() => handlePageClick(Math.max(currentPage - 1, 1))}
        />

        {pageNumbers.map((page) => (
            <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageClick(page)}
            >
            {page}
            </Pagination.Item>
        ))}

        <Pagination.Next
        onClick={() => handlePageClick(Math.min(currentPage + 1, totalPages))}
        />
        <Pagination.Last onClick={() => handlePageClick(totalPages)} />
        </Pagination>
<div>
{products.map((product) => 
        (<div key={product._id}>
            <Product product={product}  />
        </div>
    )
)}
  </div>
  </div>
        </>)

}
