"use client";

import Modal from "@/components/admin/Modal";
import ConfirmModal from "@/components/admin/ConfirmModal";
import "@/components/admin/modal.css";
import "@/components/admin/confirmModal.css";
import React, { useState, useEffect } from "react";
import { useUploadThing } from "@/utils/upload";
import { API } from "@/utils/api";

export default function AdminCategory() {
  const [categories, setCategories] = useState([]);
  const [step, setStep] = useState(1); // 1-super | 2-category | 3-sub
  const [superCategory, setSuperCategory] = useState(""); // Men | Women
  const [subCategory, setSubCategory] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!API) {
      console.error("API URL not configured");
      return;
    }

    fetch(`${API}/categories`)
      .then((r) => r.json())
      .then((d) => {
        console.log("CATEGORY RESPONSE:", d);
        setCategories(Array.isArray(d) ? d : d.data || []);
      })
      .catch((e) => {
        console.error("Fetch error ❌", e);
      });
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      setImage(res[0].ufsUrl); // ✅ correct
    },
    onUploadError: () => alert("Upload failed ❌"),
  });

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <h1 className="page-title">Manage Categories</h1>

      <div className="cat-top-row">
        <input
          type="text"
          placeholder="Search categories..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={() => {
            setEditMode(false);
            setStep(1);
            setSuperCategory("");
            setName("");
            setSubCategory("");
            setImage("");
            setPreview("");
            setOpenModal(true);
          }}
        >
          + Create Category
        </button>
      </div>

      <div className="category-grid">
        {filtered.map((cat) => (
          <div key={cat._id} className="category-card">
            <img
              src={cat.image || "/img/placeholder.jpg"}
              className="category-img"
            />
            <div className="category-title">{cat.name}</div>

            <div className="category-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditMode(true);
                  setCurrentId(cat._id);
                  setName(cat.name);
                  setImage(cat.image);
                  setPreview(cat.image);
                  setOpenModal(true);
                }}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => {
                  setDeleteId(cat._id);
                  setConfirmOpen(true);
                }}
              >
                Delete
              </button>

              <button className="inactive-btn">Activate</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <Modal
        open={openModal}
        title={editMode ? "Edit Category" : "Create Category"}
        onClose={() => setOpenModal(false)}
      >
        {/* STEP 1 – SUPER CATEGORY */}
        {step === 1 && (
          <div className="text-gray-900">
            <h3 className="mb-3 font-medium">Select Super Category</h3>

            <div style={{ display: "flex", gap: 12 }}>
              {["Men", "Women"].map((s) => (
                <button
                  key={s}
                  className={`primary-btn ${superCategory === s ? "active" : ""}`}
                  onClick={() => {
                    setSuperCategory(s);
                    setStep(2);
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 – CATEGORY */}
        {step === 2 && (
          <div className="text-gray-900">
            <input
              type="text"
              className="modal-input"
              placeholder="Category Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              disabled={isUploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setPreview(URL.createObjectURL(file));
                startUpload([file]);
              }}
            />

            {preview && (
              <img
                src={preview}
                style={{ width: 100, height: 100, borderRadius: 8 }}
              />
            )}

            <button
              className="primary-btn create-btn"
              onClick={() => {
                if (!name || !image) {
                  alert("Category name & image required");
                  return;
                }
                setStep(3);
              }}
            >
              Next
            </button>
          </div>
        )}

        {/* STEP 3 – SUB CATEGORY */}
        {step === 3 && (
          <div className="text-gray-900">
            <input
              type="text"
              className="modal-input"
              placeholder="Sub Category Name"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            />

            <button
              className="primary-btn create-btn"
              onClick={async () => {
                if (!subCategory) {
                  alert("Sub category required");
                  return;
                }

                try {
                  const scRes = await fetch(`${API}/super-categories`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: superCategory }),
                  });
                  const sc = await scRes.json();

                  const catRes = await fetch(`${API}/categories`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name,
                      image,
                      superCategory: sc._id,
                    }),
                  });
                  const cat = await catRes.json();

                  await fetch(`${API}/sub-categories`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: subCategory,
                      category: cat._id,
                    }),
                  });

                  setCategories((p) => [...p, cat]);
                  alert("Category created ✔");
                  setOpenModal(false);
                } catch {
                  alert("Create failed ❌");
                }
              }}
            >
              Save
            </button>
          </div>
        )}
      </Modal>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        message="Category will be permanently deleted."
        onConfirm={async () => {
          try {
            const r = await fetch(`${API}/categories/${deleteId}`, {
              method: "DELETE",
              // headers: {
              //   Authorization: `Bearer ${token}`,
              // },
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!r.ok) {
              const err = await r.text();
              console.error("DELETE CATEGORY ERROR:", err);
              alert("Delete failed ❌");
              return;
            }

            setCategories((p) => p.filter((c) => c._id !== deleteId));
            alert("Deleted ✔");
            setConfirmOpen(false);
          } catch (e) {
            console.error("DELETE REQUEST FAILED:", e);
            alert("Network error ❌");
          }
        }}
      />
    </div>
  );
}
