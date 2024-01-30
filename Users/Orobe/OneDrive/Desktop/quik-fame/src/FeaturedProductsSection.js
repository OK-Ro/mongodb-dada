import React from "react";
import styled from "styled-components";

const FeaturedProductsSection = () => {
  return (
    <Container>
      <SectionTitle>Featured Products</SectionTitle>
      <ProductGrid>
        <ProductItem>
          <ProductImage src="/product1.jpg" alt="Product 1" />
          <ProductName>Product 1</ProductName>
          <ProductDescription>
            This is a brief description of Product 1.
          </ProductDescription>
          <ProductPrice>$19.99</ProductPrice>
          <ProductButton>Add to Cart</ProductButton>
        </ProductItem>
        <ProductItem>
          <ProductImage src="/product2.jpg" alt="Product 2" />
          <ProductName>Product 2</ProductName>
          <ProductDescription>
            This is a brief description of Product 2.
          </ProductDescription>
          <ProductPrice>$24.99</ProductPrice>
          <ProductButton>Add to Cart</ProductButton>
        </ProductItem>
        <ProductItem>
          <ProductImage src="/product3.jpg" alt="Product 3" />
          <ProductName>Product 3</ProductName>
          <ProductDescription>
            This is a brief description of Product 3.
          </ProductDescription>
          <ProductPrice>$29.99</ProductPrice>
          <ProductButton>Add to Cart</ProductButton>
        </ProductItem>
      </ProductGrid>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fff;
  padding: 80px 0;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 40px;
  color: #333;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
`;

const ProductItem = styled.div`
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ProductImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

const ProductName = styled.h3`
  font-size: 1.5rem;
  margin-top: 20px;
  color: #333;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  color: #666;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-top: 10px;
`;

const ProductButton = styled.button`
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #45a049;
  }
`;

export default FeaturedProductsSection;
