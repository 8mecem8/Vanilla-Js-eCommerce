import {hideLoading,showLoading,showMessage,createProduct, uploadProductImage,} from "../Sup-files/Util.js";

const CreateProduct = {
  aRender: () => {


    document
        .getElementById("image-file")
        .addEventListener("change", async (e) => {

          const file = e.target.files[0];
            
          const formData = new FormData();

          formData.append("image", file);
            console.log(formData);
          showLoading();

          const data = await uploadProductImage(formData);
            console.log(data);
          hideLoading();


          if (data.message) {
            showMessage(data.message);
          } else {
            showMessage("Image uploaded successfully.");
            document.getElementById("image").value = data.image;
          }
        });










    document.getElementById("create-product-form").addEventListener("submit", async (e) => {
        e.preventDefault();

        showLoading();

        const data = await createProduct({
         
          name: document.getElementById("name").value,
          price: document.getElementById("price").value,
          image: document.getElementById("image").value,
          brand: document.getElementById("brand").value,
          category: document.getElementById("category").value,
          countInStock: document.getElementById("countInStock").value,
          description: document.getElementById("description").value,
        });

        hideLoading();

        if (data.error) {
          showMessage(data.error);
        } else {
          document.location.hash = "/productlist";
        }
      });
  },

  render: async () => {
    return `
        
       <div class="content">
      <div>
        <a href="/#/productlist">Back to products</a>
      </div>
      <div class="form-container">
        <form id="create-product-form">
          <ul class="form-items">
            <li>
              <h1>Create Product </h1>
            </li>
            <li>
              <label for="name">Name</label>
              <input type="text" name="name" id="name" />
            </li>
            <li>
              <label for="price">Price</label>
              <input type="number" name="price" id="price" />
            </li>
            <li>
              <label for="image">Image (680 x 830)</label>
              <input type="text" name="image" id="image" />
              <input type="file" name="image-file" id="image-file" />
            </li>
            <li>
              <label for="brand">Brand</label>
              <input type="text" name="brand"  id="brand" />
            </li>
            <li>
              <label for="countInStock">Count In Stock</label>
              <input type="text" name="countInStock" id="countInStock" />
            </li>
            <li>
              <label for="category">Category</label>
              <input type="text" name="category"  id="category" />
            </li>
            <li>
              <label for="description">Description</label>
              <input type="text" name="description"  id="description" />
            </li>
            <li>
              <button type="submit" class="primary">Create</button>
            </li>
          </ul>
        </form>
      </div>
    </div>

        `;
  },
};

export default CreateProduct;
