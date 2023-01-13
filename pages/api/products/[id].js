import dbConnect from "../../../db/connect";
import Product from "../../../db/models/Product";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const product = await Product.findById(id).populate("reviews");

    if (!product) {
      return response.status(404).json({ status: "Not Found" });
    }

    response.status(200).json(product);
  }

  if (request.method === "DELETE") {
    const deleteProduct = await Product.findByIdAndDelete(id);
    return response.status(200).json({status: "Product deleted"});
  }

  if (request.method === "PUT") {
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      $set: request.body,
    });
    console.log(updatedProduct);

    return response.status(200).json({ status: "Product updated" });
  }
}
