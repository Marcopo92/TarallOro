"use client";

// Area Admin protetta da password
// Gestione prodotti, ordini e messaggi

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/locale-context";
import { t } from "@/lib/i18n";

// Tipi per i dati
interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  image: string;
  category: string;
  featured: boolean;
  inStock: boolean;
}

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: string;
  createdAt: string;
  items: { quantity: number; price: number; product: { name: string } }[];
}

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const { locale } = useLocale();

  // Stati per l'autenticazione
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Stati per i dati
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "messages">("products");
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Form prodotto
  const emptyProduct = {
    id: "",
    name: "",
    nameEn: "",
    description: "",
    descriptionEn: "",
    price: 0,
    image: "",
    category: "",
    featured: false,
    inStock: true,
  };
  const [productForm, setProductForm] = useState<Product>(emptyProduct);

  // Login admin
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", username, password }),
      });

      if (res.ok) {
        setIsLoggedIn(true);
        // Salva il token in sessionStorage
        const data = await res.json();
        sessionStorage.setItem("admin-token", data.token);
      } else {
        setLoginError(locale === "it" ? "Credenziali non valide" : "Invalid credentials");
      }
    } catch {
      setLoginError(locale === "it" ? "Errore di connessione" : "Connection error");
    }
  };

  // Carica i dati quando si effettua il login
  useEffect(() => {
    if (isLoggedIn) {
      loadData();
    }
  }, [isLoggedIn, activeTab]);

  const loadData = async () => {
    const token = sessionStorage.getItem("admin-token");
    const headers = { Authorization: `Bearer ${token}` };

    if (activeTab === "products") {
      const res = await fetch("/api/products");
      setProducts(await res.json());
    } else if (activeTab === "orders") {
      const res = await fetch("/api/orders", { headers });
      if (res.ok) setOrders(await res.json());
    } else if (activeTab === "messages") {
      const res = await fetch("/api/contact", { headers });
      if (res.ok) setMessages(await res.json());
    }
  };

  // Salva prodotto (crea o modifica)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = sessionStorage.getItem("admin-token");

    const method = productForm.id ? "PUT" : "POST";
    const url = productForm.id
      ? `/api/products/${productForm.id}`
      : "/api/products";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productForm),
    });

    setShowForm(false);
    setProductForm(emptyProduct);
    setEditingProduct(null);
    loadData();
  };

  // Elimina prodotto
  const handleDeleteProduct = async (id: string) => {
    if (!confirm(t("admin", "confirmDelete", locale))) return;
    const token = sessionStorage.getItem("admin-token");

    await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    loadData();
  };

  // Apri form modifica prodotto
  const handleEditProduct = (product: Product) => {
    setProductForm(product);
    setEditingProduct(product);
    setShowForm(true);
  };

  // Upload immagine su Cloudinary
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const token = sessionStorage.getItem("admin-token");
    const res = await fetch("/api/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      setProductForm({ ...productForm, image: data.url });
    }
  };

  // Aggiorna stato ordine
  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    const token = sessionStorage.getItem("admin-token");
    await fetch("/api/orders", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId, status }),
    });
    loadData();
  };

  // === SCHERMATA DI LOGIN ===
  if (!isLoggedIn) {
    return (
      <div className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">🔐</div>
              <h1 className="text-2xl font-bold text-brown">
                {t("admin", "login", locale)}
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brown mb-1">
                  {t("admin", "username", locale)}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown mb-1">
                  {t("admin", "password", locale)}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-warm-white-dark focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none bg-white"
                  required
                />
              </div>

              {loginError && (
                <p className="text-terracotta text-sm text-center">{loginError}</p>
              )}

              <button type="submit" className="w-full btn-gold">
                {t("admin", "enter", locale)}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // === DASHBOARD ADMIN ===
  return (
    <div className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header dashboard */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-brown">
            {t("admin", "dashboard", locale)}
          </h1>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              sessionStorage.removeItem("admin-token");
            }}
            className="text-terracotta hover:text-terracotta-dark transition-colors font-medium"
          >
            {t("admin", "logout", locale)}
          </button>
        </div>

        {/* Tab di navigazione */}
        <div className="flex gap-4 mb-8 border-b border-warm-white-dark">
          {(["products", "orders", "messages"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-4 font-medium transition-colors ${
                activeTab === tab
                  ? "text-gold border-b-2 border-gold"
                  : "text-brown-light hover:text-brown"
              }`}
            >
              {t("admin", tab, locale)}
            </button>
          ))}
        </div>

        {/* === TAB PRODOTTI === */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-brown">
                {t("admin", "products", locale)} ({products.length})
              </h2>
              <button
                onClick={() => {
                  setProductForm(emptyProduct);
                  setEditingProduct(null);
                  setShowForm(true);
                }}
                className="btn-gold text-sm"
              >
                + {t("admin", "addProduct", locale)}
              </button>
            </div>

            {/* Form prodotto */}
            {showForm && (
              <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
                <h3 className="text-lg font-semibold text-brown mb-4">
                  {editingProduct
                    ? t("admin", "editProduct", locale)
                    : t("admin", "addProduct", locale)}
                </h3>
                <form onSubmit={handleSaveProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brown mb-1">
                        Nome (IT) *
                      </label>
                      <input
                        type="text"
                        required
                        value={productForm.name}
                        onChange={(e) =>
                          setProductForm({ ...productForm, name: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-warm-white-dark focus:border-gold outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown mb-1">
                        Nome (EN)
                      </label>
                      <input
                        type="text"
                        value={productForm.nameEn}
                        onChange={(e) =>
                          setProductForm({ ...productForm, nameEn: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-warm-white-dark focus:border-gold outline-none bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brown mb-1">
                        {locale === "it" ? "Descrizione (IT)" : "Description (IT)"} *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={productForm.description}
                        onChange={(e) =>
                          setProductForm({ ...productForm, description: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-warm-white-dark focus:border-gold outline-none bg-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown mb-1">
                        {locale === "it" ? "Descrizione (EN)" : "Description (EN)"}
                      </label>
                      <textarea
                        rows={3}
                        value={productForm.descriptionEn}
                        onChange={(e) =>
                          setProductForm({ ...productForm, descriptionEn: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-warm-white-dark focus:border-gold outline-none bg-white resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brown mb-1">
                        {locale === "it" ? "Prezzo (€)" : "Price (€)"} *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={productForm.price}
                        onChange={(e) =>
                          setProductForm({
                            ...productForm,
                            price: parseFloat(e.target.value),
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-warm-white-dark focus:border-gold outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown mb-1">
                        {locale === "it" ? "Categoria" : "Category"}
                      </label>
                      <input
                        type="text"
                        value={productForm.category}
                        onChange={(e) =>
                          setProductForm({ ...productForm, category: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-lg border border-warm-white-dark focus:border-gold outline-none bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown mb-1">
                        {locale === "it" ? "Immagine" : "Image"}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full px-3 py-2 rounded-lg border border-warm-white-dark focus:border-gold outline-none bg-white text-sm"
                      />
                      {productForm.image && (
                        <p className="text-xs text-olive mt-1 truncate">{productForm.image}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.featured}
                        onChange={(e) =>
                          setProductForm({ ...productForm, featured: e.target.checked })
                        }
                        className="rounded border-warm-white-dark accent-gold"
                      />
                      <span className="text-sm text-brown">
                        {locale === "it" ? "In evidenza" : "Featured"}
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={productForm.inStock}
                        onChange={(e) =>
                          setProductForm({ ...productForm, inStock: e.target.checked })
                        }
                        className="rounded border-warm-white-dark accent-gold"
                      />
                      <span className="text-sm text-brown">
                        {locale === "it" ? "Disponibile" : "In Stock"}
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button type="submit" className="btn-gold text-sm">
                      {t("admin", "save", locale)}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setProductForm(emptyProduct);
                      }}
                      className="px-6 py-2 rounded-lg border border-warm-white-dark text-brown hover:bg-warm-white-dark transition-colors text-sm"
                    >
                      {t("admin", "cancel", locale)}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Lista prodotti */}
            <div className="space-y-3">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-brown">{product.name}</h3>
                      {product.featured && (
                        <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">
                          {locale === "it" ? "In evidenza" : "Featured"}
                        </span>
                      )}
                      {!product.inStock && (
                        <span className="text-xs bg-terracotta/10 text-terracotta px-2 py-0.5 rounded-full">
                          {locale === "it" ? "Esaurito" : "Out of stock"}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-brown-light">
                      {product.category} · €{product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="px-3 py-1 text-sm bg-gold/10 text-gold rounded-lg hover:bg-gold/20 transition-colors"
                    >
                      {t("admin", "editProduct", locale)}
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="px-3 py-1 text-sm bg-terracotta/10 text-terracotta rounded-lg hover:bg-terracotta/20 transition-colors"
                    >
                      {t("admin", "deleteProduct", locale)}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === TAB ORDINI === */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-xl font-semibold text-brown mb-6">
              {t("admin", "orders", locale)} ({orders.length})
            </h2>
            {orders.length === 0 ? (
              <p className="text-brown-light text-center py-8">
                {t("admin", "noOrders", locale)}
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                      <div>
                        <h3 className="font-semibold text-brown">
                          #{order.id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-sm text-brown-light">
                          {order.customerName} · {order.customerEmail}
                        </p>
                        <p className="text-xs text-brown-light">
                          {new Date(order.createdAt).toLocaleDateString(locale === "it" ? "it-IT" : "en-US")}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-gold">
                          €{order.total.toFixed(2)}
                        </span>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          className="px-3 py-1 rounded-lg border border-warm-white-dark text-sm bg-white"
                        >
                          <option value="pending">Pending</option>
                          <option value="paid">Paid</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>
                    <div className="text-sm text-brown-light">
                      {order.items?.map((item, i) => (
                        <span key={i}>
                          {item.product?.name} ×{item.quantity}
                          {i < order.items.length - 1 && " · "}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* === TAB MESSAGGI === */}
        {activeTab === "messages" && (
          <div>
            <h2 className="text-xl font-semibold text-brown mb-6">
              {t("admin", "messages", locale)} ({messages.length})
            </h2>
            {messages.length === 0 ? (
              <p className="text-brown-light text-center py-8">
                {locale === "it" ? "Nessun messaggio" : "No messages"}
              </p>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`bg-white rounded-xl p-6 shadow-sm ${
                      !msg.read ? "border-l-4 border-gold" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-brown">{msg.name}</h3>
                        <p className="text-sm text-brown-light">{msg.email}</p>
                      </div>
                      <span className="text-xs text-brown-light">
                        {new Date(msg.createdAt).toLocaleDateString(locale === "it" ? "it-IT" : "en-US")}
                      </span>
                    </div>
                    {msg.subject && (
                      <p className="font-medium text-brown mb-1">{msg.subject}</p>
                    )}
                    <p className="text-brown-light text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
