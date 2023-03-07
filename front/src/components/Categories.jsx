import React from "react";
import CategoryItems from "./CategoryItems";
import { Container } from "../styles/Categories.styles";
import { categories } from "../data";

const Categories = () => {
  const categoriesMapped = categories.map((data, index) => {
    return <CategoryItems key={index} data={data} />;
  });

  return <Container>{categoriesMapped}</Container>;
};

export default Categories;
