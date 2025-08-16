import axios from "axios";
import { Product, User, Order } from "../types";
import { API_BASE_URL } from "../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- API cho Sản phẩm ---

// Lấy tất cả sản phẩm
export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Không thể lấy dữ liệu sản phẩm.");
  }
};

// Thêm một sản phẩm mới
export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  try {
    const response = await api.post("/products", product);
    return response.data;
  } catch (error) {
    console.error("Failed to create product:", error);
    throw new Error("Không thể thêm sản phẩm.");
  }
};

// Cập nhật thông tin sản phẩm
export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  try {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error("Failed to update product:", error);
    throw new Error("Không thể cập nhật sản phẩm.");
  }
};

// Xóa một sản phẩm
export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw new Error("Không thể xóa sản phẩm.");
  }
};

// --- API cho Người dùng ---

// Lấy tất cả người dùng
export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    throw new Error("Không thể lấy dữ liệu người dùng.");
  }
};

// Thêm một người dùng mới
export const createUser = async (
  user: Omit<User, "id" | "createdAt">
): Promise<User> => {
  try {
    const response = await api.post("/users", user);
    return response.data;
  } catch (error) {
    console.error("Failed to create user:", error);
    throw new Error("Không thể thêm người dùng.");
  }
};

// Cập nhật thông tin người dùng
export const updateUser = async (
  id: string,
  user: Partial<User>
): Promise<User> => {
  try {
    const response = await api.put(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw new Error("Không thể cập nhật người dùng.");
  }
};

// Xóa một người dùng
export const deleteUser = async (id: string): Promise<void> => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error("Failed to delete user:", error);
    throw new Error("Không thể xóa người dùng.");
  }
};

// --- API cho Đơn hàng ---

// Lấy tất cả đơn hàng
export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    throw new Error("Không thể lấy dữ liệu đơn hàng.");
  }
};

// Thêm một đơn hàng mới
export const createOrder = async (
  order: Omit<Order, "id" | "createdAt">
): Promise<Order> => {
  try {
    const response = await api.post("/orders", order);
    return response.data;
  } catch (error) {
    console.error("Failed to create order:", error);
    throw new Error("Không thể thêm đơn hàng.");
  }
};

// Cập nhật thông tin đơn hàng
export const updateOrder = async (
  id: string,
  order: Partial<Order>
): Promise<Order> => {
  try {
    const response = await api.put(`/orders/${id}`, order);
    return response.data;
  } catch (error) {
    console.error("Failed to update order:", error);
    throw new Error("Không thể cập nhật đơn hàng.");
  }
};

// Xóa một đơn hàng
export const deleteOrder = async (id: string): Promise<void> => {
  try {
    await api.delete(`/orders/${id}`);
  } catch (error) {
    console.error("Failed to delete order:", error);
    throw new Error("Không thể xóa đơn hàng.");
  }
};
