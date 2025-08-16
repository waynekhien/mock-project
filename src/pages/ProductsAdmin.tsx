import React, { useState, useEffect } from "react";
import AdminTable from "../components/AdminTable";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api";
import { Product } from "../types";

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<
    Omit<Product, "id"> & { id?: string }
  >({
    title: "",
    author: "",
    price: 0,
    saleOffPrice: 0,
    description: "",
    categoryId: "",
    images: [],
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && currentProduct.id) {
        // Chức năng sửa sản phẩm
        const updatedProduct = await updateProduct(
          currentProduct.id,
          currentProduct
        );
        setProducts(
          products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
      } else {
        // Chức năng thêm sản phẩm
        const newProduct = await createProduct(
          currentProduct as Omit<Product, "id">
        );
        setProducts([...products, newProduct]);
      }
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (id: string) => {
    const productToEdit = products.find((p) => p.id === id);
    if (productToEdit) {
      setCurrentProduct(productToEdit);
      setIsEditing(true);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProduct(id);
        setProducts(products.filter((p) => p.id !== id));
      } catch (err: any) {
        setError(err.message);
      }
    }
  };

  const resetForm = () => {
    setCurrentProduct({
      title: "",
      author: "",
      price: 0,
      saleOffPrice: 0,
      description: "",
      categoryId: "",
      images: [],
    });
    setIsEditing(false);
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Tên sản phẩm" },
    { key: "author", label: "Tác giả" },
    { key: "price", label: "Giá" },
    { key: "categoryId", label: "Danh mục" },
  ];

  if (loading) return <div className="text-center p-4">Đang tải...</div>;
  if (error)
    return <div className="text-center text-red-500 p-4">Lỗi: {error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Quản lý Sản phẩm</h2>

      {/* Form thêm/sửa sản phẩm */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
        <h3 className="text-xl font-bold mb-4">
          {isEditing ? "Sửa Sản phẩm" : "Thêm Sản phẩm mới"}
        </h3>
        <form onSubmit={handleAddOrUpdate} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Tên sản phẩm"
            value={currentProduct.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Tác giả"
            value={currentProduct.author}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Giá"
            value={currentProduct.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            {isEditing ? "Cập nhật" : "Thêm sản phẩm"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-2 bg-gray-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition"
            >
              Hủy
            </button>
          )}
        </form>
      </div>

      <AdminTable
        data={products}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetail={(id) => alert(`Xem chi tiết: ${id}`)}
      />
    </div>
  );
};

export default ProductsAdmin;
