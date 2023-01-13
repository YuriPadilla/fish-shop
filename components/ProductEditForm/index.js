import { StyledForm, StyledHeading, StyledLabel } from "../ProductForm/ProductForm.styled";
import { StyledButton } from "../Button/Button.styled";
import useSWR from "swr";

export default function ProductEditForm({onEditJoke, product}) {

    return (
        <StyledForm onSubmit={onEditJoke}>
          <StyledHeading>Edit {product.name}</StyledHeading>
          <StyledLabel htmlFor="nameEdit">
            Name:
            <input type="text" id="nameEdit" name="name" defaultValue={product.name} />
          </StyledLabel>
          <StyledLabel htmlFor="descriptionEdit">
            Description:
            <input type="text" id="descriptionEdit" name="description" defaultValue={product.description}/>
          </StyledLabel>
          <StyledLabel htmlFor="priceEdit">
            Price:
            <input type="number" id="priceEdit" name="price" min="0" defaultValue={product.price} />
          </StyledLabel>
          <StyledLabel htmlFor="currency">
            Currency:
            <select id="currency" name="currency">
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </StyledLabel>
          <StyledButton type="submit">Save</StyledButton>
        </StyledForm>
      );
}
