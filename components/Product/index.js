import useSWR from "swr";
import { useRouter } from "next/router";
import { useState } from "react";
import { StyledButton } from "../Button/Button.styled";
import { ProductCard } from "./Product.styled";
import Comments from "../Comments";
import ProductEditForm from "../ProductEditForm";

export default function Product() {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  //const {query: { id }, push} = router;
  const { data } = useSWR(id ? `/api/products/${id}` : null);

  if (!data) {
    return <h1>Loading...</h1>;
  }

  async function handleDeleteProduct() {
    console.log("Hallo Welt");
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
      })
      router.push("/");
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleEditJoke(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData);

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "PUT",
        body: JSON.stringify(productData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        router.push(`/`);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <ProductCard>
      <h2>{data.name}</h2>
      <p>Description: {data.description}</p>
      <p>
        Price: {data.price} {data.currency}
      </p>
      {data.reviews.length > 0 && <Comments reviews={data.reviews} />}
      <StyledButton type="button" onClick={() => router.push("/")}>
        Back to all
      </StyledButton>
      <StyledButton type="button" onClick={handleDeleteProduct}>
      ❌
      </StyledButton>
      <StyledButton type="button" onClick={() => {
        setIsEditMode(!isEditMode);
      }}>
      ✏️
      </StyledButton>
      {isEditMode && <ProductEditForm onEditJoke={handleEditJoke} product={data}/>}
    </ProductCard>
  );
}
