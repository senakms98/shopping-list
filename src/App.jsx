import { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import styled from 'styled-components';
import {nanoid} from "nanoid";
import IconButton from './components/IconButton';


const shops = [
  { id:1, name: "Migros"},
  { id:2, name: "Teknosa"},
  { id:3, name: "BİM"},
]

const categories = [
  { id:1, name: "Elektronik"},
  { id:2, name: "Şarküteri"},
  { id:3, name: "Oyuncak"},
  { id:3, name: "Bakliyat"},
  { id:3, name: "Fırın"},
]

const InputWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: end;
gap: 12px;
padding: 24px;
`


function App() {

const [products, setProducts] = useState([]);

const [productName, setProductName] = useState("");

const [selectedShop, setSelectedShop] = useState(shops[0].id);

const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

    return <>
    
  <Form>
  <InputWrapper>
  <Form.Group  controlId="exampleForm.ControlInput1">
    <Form.Label>Ürün adı gir:</Form.Label>
    <Form.Control 
    value={productName}
    onChange={(e) => {
      setProductName(e.target.value);
    }}
    style={{flex: 1}} type="email" placeholder="name@example.com" />
  </Form.Group>
  <Form.Select style={{width: "25%"}} aria-label="Default select example"
  value={selectedShop}
  onChange={(e) => {
      setSelectedShop(e.target.value);
    }}
    >
      <option>Market seç</option>
      {shops.map((shop) => (
        <option key={shop.id} value={shop.id}>{shop.name}</option>
      ))}
    </Form.Select>
    <Form.Select style={{width: "25%"}} aria-label="Default select example"
    value={selectedCategory}
    onChange={(e) => {
      setSelectedCategory(e.target.value);
    }}
    >
      <option>Kategori seç</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>{category.name}</option>
      ))}
    </Form.Select>
    <Button 
    onClick={() => {
      const product = {
        name: productName,
        category: categories.find((category) => category.id === parseInt(selectedCategory)).name,
        shop: shops.find((shop) => shop.id === parseInt(selectedShop)).name,
        id: nanoid(),
      };
      setProducts((oldProducts) => [...oldProducts, product])
    }}
    variant="success" style={{width: "25%",}}>Ekle</Button>
    </InputWrapper>
</Form>
<div className='px-4'>
<Table striped bordered hover>
<thead>
  <tr>
    <th>Ürün İsmi</th>
    <th>Ürün Mağazası</th>
    <th>Ürün Kategorisi</th>
    <th>Ürünü Sil</th>
  </tr>
</thead>
<tbody>
  {products.map((product) => (
    <tr 
    key={product.id}
    style={{
      textDecoration: product.isBought ? "line-through" : "unset",
    }}
    onClick={() => {
      let copyProducts = [...products];
      copyProducts = copyProducts.map((copyProduct) => {
        if (copyProduct.id === product.id) {
          copyProduct.isBought = copyProduct.isBought === true ? false : true;
        }
        return copyProduct;
      });
      if (copyProducts.every(product => product.isBought === true)) {
        alert("Alışveriş Tamamlandı");
      }
      setProducts(copyProducts);
    }}
    
    >
    <td>{product.name}</td>
    <td>{product.shop}</td>
    <td>{product.category}</td>
    <td onClick={(e) => {
      e.stopPropagation();
      const filteredProducts = products.filter((currentProduct) => currentProduct.id !== product.id);
      setProducts(filteredProducts);
    }}
    
    className='text-center'>
      <IconButton/>
    </td>
  </tr>
  ))}
  </tbody>
</Table>
</div>
</>;
}

export default App;
