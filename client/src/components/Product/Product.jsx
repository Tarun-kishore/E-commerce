import React,{useState,useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { UserContext,cartContext } from "../../App.js";
import {addToCart,getCart,removeFromCart} from "../../utils/cart.js" 


export default function Product(props){
  const { user, setUser } = useContext(UserContext);
  const { cart, setCart } = useContext(cartContext);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleDismiss = () => {
    setShowMessage(false);
  };
const { product} = props;

    const handleRemove= (productId)=>{
        if(!user){
            setMessage('Please login to buy items')
            setShowMessage(true)
            return
        }

  const index = cart.findIndex((cartItem) => cartItem == productId);


        if(index==-1){
            setMessage('Item not in the cart')
            setShowMessage(true)
            return

        }

removeFromCart(productId);

        
        setCart(getCart())
            setMessage('Item Removed from cart')
            setShowMessage(true)

    }
    const handleBuy= (productId)=>{
        if(!user){
            setMessage('Please login to buy items')
            setShowMessage(true)
            return
        }

  const index = cart.findIndex((cartItem) => cartItem == productId);


        if(index!==-1){
            setMessage('Item already in the cart')
            setShowMessage(true)
            return

        }
addToCart(productId);

        setCart(getCart())

        
            setMessage('Item Added to cart')
            setShowMessage(true)

    }

const handleButtonClick = (itemId) => {
    if(props.owner) return (<></>)
    if (cart.includes(itemId)) {
      // Item is already in cart, show remove from cart button
      return (
<Button variant="danger" onClick={()=>handleRemove(itemId)}>Remove from Cart</Button>
      );
    } else {
      // Item is not in cart, show buy now button
      return (

<Button variant="primary" onClick={()=>handleBuy(itemId)}>Buy Now</Button>
      );
    }
  };

  return (
<>
 {showMessage && (
        <Alert variant="warning" onClose={handleDismiss} dismissible>
     {message}
     </Alert>
      )}
    <div className="product">
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">&#8377;{product.price}</Card.Subtitle>
        <Card.Text>{product.description}</Card.Text>
        {handleButtonClick(product._id)}
      </Card.Body>
    </Card>
    </div>
      </>
  );
}
