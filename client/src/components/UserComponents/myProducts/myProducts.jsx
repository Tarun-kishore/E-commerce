import React,{useEffect,useState,useContext} from 'react'
import MyProductsForm from "./myProductsForm";
import { axiosContext } from "../../../App.js";
import { Pagination } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Product from '../../Product/Product.jsx'

import { Alert } from 'react-bootstrap';
import ProductForm from '../../Product/ProductForm';



export default function MyProducts() {
    const [products,setProducts] = useState([])
  const [editing, setEditing] = useState({});

const [showAlertForDeletion, setShowAlertForDeletion] = useState(false);
    const axios=useContext(axiosContext)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNumbers,setPageNumbers]= useState([1]);

    // This function will handle page click events
    const handlePageClick = (page) => {
        setCurrentPage(page);
    };


    useEffect(() => {
        axios.get(`/user/myProducts?page=${currentPage}&limit=10`)
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
    }, [currentPage]);


  const handleCloseAlertForDeletion = () => setShowAlertForDeletion(false);

  const handleEdit = (id) => {
    const newEditing= {...editing};
      newEditing[id]=true;
      setEditing(newEditing);
  };
  const handleDelete = (product) => {
      console.log(product)
    axios.delete(`/product/deleteProduct?id=${product._id}`
    )
      .then((res)=>{
          setShowAlertForDeletion(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };


    return (<>
        <MyProductsForm/>
        <div>
{showAlertForDeletion && (
        <Alert variant="success" dismissible onClose={handleCloseAlertForDeletion}>Product deleted!! Reload to See changes</Alert>
      )}
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
{products.map((product) => {
    return editing[product._id] ? (
        <div key={product._id}>
        <ProductForm product={product} />
        </div>
    ) : (
        <div key={product._id}>
            <Product product={product} owner={true}/>
            <Button variant="primary" onClick={() => handleEdit(product._id)}>Edit</Button>{' '}
            <Button variant="danger" onClick={()=>handleDelete(product)}>Delete</Button>
        </div>
    )
})}
  </div>
  </div>
        </>)

}
