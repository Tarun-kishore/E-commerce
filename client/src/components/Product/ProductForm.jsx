import React, { useState,useContext } from "react";
import { axiosContext } from "../../App.js";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Alert } from 'react-bootstrap';
import ImageResizer from 'react-image-file-resizer';

export default function ProductForm(props) {

const { product} = props;
  const axios = useContext(axiosContext);
const [formData, setFormData] = useState({name:product.name,price:product.price,description:product.description});
     const [imagePreview, setImagePreview] = useState(product.image);
  const [showAlert, setShowAlert] = useState(false);
const [showAlertForSubmission, setShowAlertForSubmission] = useState(false);
  const [alertText, setAlertText] = useState("");

  const handleCloseAlert = () => setShowAlert(false);

  const handleCloseAlertForSubmission = () => setShowAlertForSubmission(false);
  const handleImageChange = (event) => {
const file = event.target.files[0];

    ImageResizer.imageFileResizer(
      file,
      300, // new width
      300, // new height
      'JPEG', // format
      100, // quality
      0, // rotation
      (uri) => {
        setImagePreview(uri);
 
      },
      'base64' 
    );
  };

    const isValid=(formData)=>{
        if(!formData.name){
setAlertText( "Enter Product Name");
            return false;
        }
        if(!formData.description){
setAlertText( "Enter Product Description");
            return false;
        }
        if(!formData.price ) {
setAlertText("Enter Product Price");
            return false;
        }
        if(Number(formData.price) < 0){
 setAlertText("Price Must Be Positive")
            return false;
        }
        return true;
    }
  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
    console.log(formData);

      if(!isValid(formData) || !imagePreview){
          if(!imagePreview) setAlertText('Upload An Image')
          setShowAlert(true);
          return
      }
    //console.log(imagePreview);
    axios.put("/product/updateProduct", {
        ...formData,image:imagePreview,id:product._id
    })
      .then((res)=>{
          setShowAlertForSubmission(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  return (<>
 <div>
{showAlertForSubmission && (
        <Alert variant="success" dismissible onClose={handleCloseAlertForSubmission}>Product updated!! Reload to See changes</Alert>
      )}
{showAlert && (
        <Alert variant="danger" dismissible onClose={handleCloseAlert}>{alertText}</Alert>
      )}
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="productName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control name='name' type="text" placeholder="" value={formData.name || ''}
          onChange={handleInputChange} />
      </Form.Group>
 <Form.Group controlId="formImage">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type='file'
          label="Image"
          onChange={handleImageChange}
          accept="image/*"
          custom
        />
      </Form.Group>
      {imagePreview && (
        <img src={imagePreview} alt="Preview" style={{ maxWidth: "100%" }} />
      )}
      <Form.Group className="mb-3" controlId="price">
        <Form.Label>Price(in Rs)</Form.Label>
        <Form.Control type="number" placeholder="Enter price" name="price" value={formData.price || ''}
          onChange={handleInputChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="productDesc">
        <Form.Label>Description</Form.Label>
        <Form.Control name='description' as="textarea" rows={3}           value={formData.description || ''}
          onChange={handleInputChange}/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
    </div> 
        </>)
}
