import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { useGetProductDetailsBySlugQuery } from '../Hooks/productHooks'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { getError } from '../utils'
import { ApiError } from '../types/ApiError'
import { Col, Row } from 'react-bootstrap'

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
        <Helmet>
          <title>{product.name}</title>
        </Helmet>
        <Row>
          <Col md={6}>
            <img className="large" src={product.image} alt={product.name} />
          </Col>
          <Col md={3}>
            {/* Additional product details */}
          </Col>
          <Col md={3}>
            {/* Pricing and action buttons */}
          </Col>
        </Row>
      </div>
    )
  )
}
