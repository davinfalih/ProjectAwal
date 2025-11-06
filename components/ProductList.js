// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { productService } from '../services/api';

function ProductList() {
  // State untuk menyimpan data produk
  const [products, setProducts] = useState([]);
  // State untuk loading
  const [loading, setLoading] = useState(false);
  // State untuk error
  const [error, setError] = useState('');

  // Fungsi untuk ambil data dari backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      
      // ⭐⭐ INI INTINYA ⭐⭐
      // Panggil backend untuk ambil data produk
      const response = await productService.getProducts();
      
      // Simpan data ke state
      setProducts(response.data);
      
    } catch (err) {
      // Handle error
      setError('Gagal mengambil data produk');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect untuk jalanin fetchProducts saat komponen pertama kali render
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fungsi untuk tambah produk
  const handleAddProduct = async () => {
    try {
      const newProduct = {
        name: 'Product Baru',
        price: 100000,
        description: 'Deskripsi produk baru'
      };
      
      await productService.createProduct(newProduct);
      
      // Refresh data setelah berhasil tambah
      fetchProducts();
      
    } catch (err) {
      setError('Gagal menambah produk');
    }
  };

  // Tampilkan di UI
  return (
    <div style={{ padding: '20px' }}>
      <h2>Daftar Produk</h2>
      
      {/* Tombol tambah produk */}
      <button onClick={handleAddProduct} style={{ marginBottom: '20px' }}>
        Tambah Produk
      </button>
      
      {/* Loading indicator */}
      {loading && <p>Loading...</p>}
      
      {/* Error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* List produk */}
      <div>
        {products.map(product => (
          <div key={product.id} style={{ 
            border: '1px solid #ccc', 
            padding: '10px', 
            margin: '10px 0' 
          }}>
            <h3>{product.name}</h3>
            <p>Harga: Rp {product.price}</p>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
      
      {/* Jika tidak ada produk */}
      {products.length === 0 && !loading && (
        <p>Belum ada produk</p>
      )}
    </div>
  );
}

export default ProductList;