import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { useGetProductDetailsBySlugQuery } from '../Hooks/productHooks'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import { Badge, Button, Card, Col, ListGroup,  Row } from 'react-bootstrap'
import Rating from '../components/Rating'

export default function ProductPage() {
  const params = useParams()
  const { slug } = params
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!)

  return (
    isLoading ? (
      <LoadingBox />
    ) : error ? (
      <MessageBox variant="danger">
        {getError(error as unknown as ApiError)}
      </MessageBox>
    ) : !product ? (
      <MessageBox variant="danger">Product Not Found</MessageBox>
    ) : (
      <div>
        
        <Row>
          <Col md={4}>
            <img className="large" src={product.image} alt={product.name} />
          </Col>
          <Col md={3}>
          {/* {//first group is for product name} */}
          <ListGroup variant="flush">
               <ListGroup.Item>
                 <Helmet>
                   <title>{product.name}</title>
                 </Helmet>
                 <h1>{product.name}</h1>
               </ListGroup.Item>
          {/* {//first group is for product item} */}
               <ListGroup.Item>
                 <Rating
                   rating={product.rating}
                   numReviews={product.numReviews}
                 ></Rating>
               </ListGroup.Item>
          {/* {//first group is for product Price} */}     
               <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
          {/* {//first group is for product desription} */}     
               <ListGroup.Item>
                 Description:
                 <p>{product.description}</p>
               </ListGroup.Item>
             </ListGroup>
          </Col>

            {/* Pricing and action buttons */}
          <Col md={3}>
          
            <Card>
              <Card.Body>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                <Row>
                  <Col>
                  Price</Col>
                  <Col>${product.price}</Col>
                </Row></ListGroup.Item>
             
              <ListGroup.Item>
             
                <Row>
                  <Col>Status:</Col>
                  <Col>
                  {product.countInStock > 0 ? (
                    <Badge bg="success">In Stock</Badge>
                  ) :
                  (
                    <Badge bg="danger">Unavailable</Badge>
                  )}
                  </Col>
                </Row>
                </ListGroup.Item>
                
              
              {product.countInStock > 0 && (
                <ListGroup variant='flush'>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button variant="primary">Add to cart</Button>
                  </div>
                </ListGroup.Item></ListGroup>
                   
              )}
              </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  )
}
