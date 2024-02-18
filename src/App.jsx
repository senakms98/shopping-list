import { useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import styled from "styled-components";
import { nanoid } from "nanoid";
import IconButton from "./components/IconButton";

const shops = [
  { id: 1, name: "Migros" },
  { id: 2, name: "Teknosa" },
  { id: 3, name: "BİM" },
];

const categories = [
  { id: 1, name: "Elektronik" },
  { id: 2, name: "Şarküteri" },
  { id: 3, name: "Oyuncak" },
  { id: 4, name: "Bakliyat" },
  { id: 5, name: "Fırın" },
];

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 12px;
  padding: 24px;
`;

function App() {
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");

  const [selectedShop, setSelectedShop] = useState(shops[0].id);

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

  const [filterShop, setFilterShop] = useState(null);

  const [filterCategory, setFilterCategory] = useState('all');

  const [filterIsbought, setFilterIsbought] = useState('all');

  const [filterProductName, setFilterProductName] = useState('');

  const filteredProducts = products.filter((product) => {
    let result = true;
    let myProductBought = product.isBought;
     if(filterIsbought === true) {
      result = result && myProductBought === true;
    } 
    if (filterIsbought === false) {
      result = result && myProductBought !== true;
    }
    if (filterProductName !== "") {
      const fuse = new Fuse(products, {keys: ['name']});
      const isIncluded = fuse.search(filterProductName).find((p) => p.item.id === product.id);
      result = result && isIncluded;
    }
    if (filterShop !== 'all') {
      const isIncluded = product.shop == filterShop;
      result = result && isIncluded;
    }
    if (filterCategory !== 'all') {
      const isIncluded = product.category == filterCategory;
      result = result && isIncluded;
    }
    return result;
   
  });

  return (
    <>
      <h2>Ürün Ekle</h2>
      <Form>
        <InputWrapper>
          <Form.Control 
          aria-label="Small"
          aria-describedby="inputGroup-sizing-sm"
          onChange={(e) => {
                setProductName(e.target.value);
              }}
              value={productName}
            />
          
          <Form.Select
            
          
            
            onChange={(e) => {
              setSelectedShop(e.target.value);
            }}
            value={selectedShop}
            aria-label="Default select example"
          >
            <option>Market seç</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
            aria-label="Default select example"
          >
            <option>Kategori seç</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
          <Button
            onClick={() => {
              const product = {
                name: productName,
                category: selectedCategory,
                shop: selectedShop,
                id: nanoid(),
                
              };
              setProducts([...products, product]);
            }}
            variant="success"
            
          >
            Ekle
          </Button>
        </InputWrapper>
      </Form>

      <h2>Ürün Filtrele</h2>
      <Form>
        <InputWrapper>
        <div key={`default-radio`} className="mb-3">
        <Form.Check
            type={"radio"}
            id={`default-radio`}
            label={`tümü`}
            name="isbought"
            checked={filterIsbought === null}
            onClick={() => {
              setFilterIsbought(null);
            }}
          />

          <Form.Check
            type={"radio"}
            id={`default-radio`}
            label={`satın alınmış`}
            name="isbought"
            checked={filterIsbought === true}
            onClick={() => {
              setFilterIsbought(true);
            }}
          />

          <Form.Check
            type={"radio"}
            label={`satın alınmamış`}
            id={`default-radio-2`}
            name="isbought"
            checked={filterIsbought === false}
            onClick={() => {
              setFilterIsbought(false);
            }}
          />
        </div>
          <Form.Select
           
            aria-label="Default select example"
            value={filterShop}
            onChange={(e) => {
              setFilterShop(e.target.value);
            }}
          >
            <option value={"all"}>Tümü</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.id}>
                {shop.name}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            style={{ width: "25%" }}
            aria-label="Default select example"
            value={filterCategory}
            onChange={(e) => {
              setFilterCategory(e.target.value);
            }}
          >
            <option value={"all"}>Tümü</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
            <Form.Control
            
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
              value={filterProductName}
              onChange={(e) => {
                setFilterProductName(e.target.value);
              }}
            />
          
          
        </InputWrapper>
      </Form>

      <h2>Ürün Listele</h2>
      <div className="px-4">
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
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                style={{
                  textDecoration: product.isBought ? "line-through" : "unset",
                }}
                onClick={() => {
                  let copyProducts = [...products];
                  copyProducts = copyProducts.map((copyProduct) => {
                    if (copyProduct.id === product.id) {
                      copyProduct.isBought =
                        copyProduct.isBought === true ? false : true;
                    }
                    return copyProduct;
                  });
                  if (
                    copyProducts.every((product) => product.isBought === true)
                  ) {
                    alert("Alışveriş Tamamlandı");
                  }
                  setProducts(copyProducts);
                }}
              >
                <td>{product.name}</td>
                <td>{shops.find((shop) => shop.id == product.shop)?.name}</td>
                <td>{categories.find((category) => category.id == product.category)?.name}</td>
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    const filteredProducts = products.filter(
                      (currentProduct) => currentProduct.id !== product.id
                    );
                    setProducts(filteredProducts);
                  }}
                  className="text-center"
                >
                  <IconButton />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default App;
