// src/pages/ProductPage.tsx
import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { 
  createProduct, 
  updateProduct, 
  deleteProduct, 
  API_URL
} from "../api/products.api"; 

interface Product {
  _id?: string;
  title: string;
  description: string;
  price: number;
}

export const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>({ title: "", description: "", price: 0 });
  const [editingId, setEditingId] = useState<string | null>(null);

  //const API_URL = "http://localhost:3000/products";

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setForm({
    ...form,
    [name]: name === "price" ? Number(value) : value,
  });
};


  const handleSubmit = async () => {
  if (editingId) {
    await updateProduct(editingId, form);
    setEditingId(null);
  } else {
    await createProduct(form);
  }
  setForm({ title: "", description: "", price: 0 });
  fetchProducts();
};

const handleEdit = (product: Product) => {
  setForm(product);
  setEditingId(product._id || null);
};

const handleDelete = async (id?: string) => {
  if (!id) return;
  await deleteProduct(id);
  fetchProducts();
};

  

  return (
    <div>

      {/* Formulario */}
      <div style={{ marginBottom: "20px" }}>
        <TextField label="Título" name="title" value={form.title} onChange={handleChange} style={{ marginRight: "10px" }} />
        <TextField label="Descripción" name="description" value={form.description} onChange={handleChange} style={{ marginRight: "10px" }} />
        <TextField label="Precio" name="price" type="number" value={form.price} onChange={handleChange} style={{ marginRight: "10px" }} />
        <Button variant="contained" onClick={handleSubmit}>
          {editingId ? "Actualizar" : "Agregar"}
        </Button>
      </div>

      {/* Tabla */}
      <table style={{ borderCollapse: "collapse", width: "100%", fontFamily: "Arial, sans-serif" }}>
        <thead>
          <tr>
            <th style={thStyle}>Título</th>
            <th style={thStyle}>Descripción</th>
            <th style={thStyle}>Precio</th>
            <th style={thStyle}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td style={tdStyle}>{item.title}</td>
              <td style={tdStyle}>{item.description}</td>
              <td style={tdStyle}>${item.price}</td>
              <td style={tdStyle}>
                <Button variant="outlined" onClick={() => handleEdit(item)} style={{ marginRight: "5px" }}>
                  Editar
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(item._id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// estilos simples
const thStyle = {
  border: "1px solid #B9B9B9",
  padding: "8px",
  textAlign: "center" as const,
  color: "#74747B",
};
const tdStyle = {
  border: "1px solid #B9B9B9",
  padding: "8px",
  textAlign: "center" as const,
  color: "#323232",
};

