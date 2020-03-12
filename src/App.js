import { version, Component, render } from 'inferno';
import data from "./products.json";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle } from 'inferno-bootstrap'

class ProductList extends Component {
  //initialize state for data
  state = {
    data: [],
    search:'',
    query:''
  }

  style={
    card:{
      border:'1px solid #e4e0e0',
      padding:'8px',
      margin: '8px 0',
      overflow:'auto'
    }
  }

  //mount data from local json on first render then store on state
  componentDidMount(){
    this.setState({data})
  }

  //handle submnit query
  onSubmit =(e) =>{
    e.preventDefault()
    this.setState({query:this.state.search.toUpperCase()})
  }

  //render product list with query
  listOfProducts = () => {
    const renderProducts = this.state.data.filter(item => item.productName.includes(this.state.query))
    .map(items => {
        return (
          <Col md="3" sm="6">
            <Card style={this.style.card}>
              <CardImg top width="100%" src={items.image} />
              <CardBody>
                <CardTitle className="text-center">{items.productName}</CardTitle>
              </CardBody>
            </Card>
          </Col>
        )
      })
      return renderProducts
  }
  render(){
    return(
      <Container>
      <Row>
        <div className="text-center" style={{marginBottom:'20'}}>
          <h1>Product List</h1>
          <form
            onSubmit={this.onSubmit}
          >
            <input 
              value={this.search}
              onChange={e => this.setState({search:e.target.value})}
              placeholder="Search for product name"
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </Row>
      <br/>
      <br/>
      <Row>
        {this.listOfProducts()}
      </Row>
      </Container>
    )
  }
}
export default ProductList;
