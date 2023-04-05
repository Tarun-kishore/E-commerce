import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Product(props){
const { product, owner } = props;

  return (
    <div className="product">
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} alt={product.name} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">&#8377;{product.price}</Card.Subtitle>
        <Card.Text>{product.description}</Card.Text>
        {owner || <Button variant="primary">Buy Now</Button>}
      </Card.Body>
    </Card>
    </div>
  );
}
