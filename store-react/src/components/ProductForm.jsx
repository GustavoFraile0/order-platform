import { useState, useEffect } from 'react';

const emptyForm = { sku: '', name: '', unitPrice: '', stockQuantity: '', imageUrl: '' };
const API_BASE = 'http://localhost:5073';

function ProductForm({ editingProduct, onSaved, onCancel }) {
    const [form, setForm] = useState(emptyForm);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (editingProduct) {
            setForm({
                sku: editingProduct.sku,
                name: editingProduct.name,
                unitPrice: editingProduct.unitPrice,
                stockQuantity: editingProduct.stockQuantity,
                imageUrl: editingProduct.imageUrl || '',
            });
            setPreview(editingProduct.imageUrl ? `${API_BASE}${editingProduct.imageUrl}` : null);
        } else {
            setForm(emptyForm);
            setPreview(null);
        }
        setImageFile(null);
    }, [editingProduct]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', imageFile);

        const res = await fetch(`${API_BASE}/api/Products/upload-image`, {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) throw new Error('Erro ao enviar imagem');
        const data = await res.json();
        return data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            let imageUrl = form.imageUrl;

            if (imageFile) {
                imageUrl = await uploadImage();
            }

            const payload = {
                sku: form.sku,
                name: form.name,
                unitPrice: parseFloat(form.unitPrice),
                stockQuantity: parseInt(form.stockQuantity, 10),
                isActive: editingProduct ? editingProduct.isActive : true,
                imageUrl,
            };

            const isEditing = Boolean(editingProduct);
            const url = isEditing
                ? `${API_BASE}/api/Products/${editingProduct.id}`
                : `${API_BASE}/api/Products`;

            const res = await fetch(url, {
                method: isEditing ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(isEditing ? { ...payload, id: editingProduct.id } : payload),
            });

            if (!res.ok) throw new Error('Erro ao salvar produto');

            onSaved();
            setForm(emptyForm);
            setImageFile(null);
            setPreview(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form className="product-form" onSubmit={handleSubmit}>
            <h2>{editingProduct ? 'Editar produto' : 'Novo produto'}</h2>

            <div className="form-row full-width">
                <label>Imagem do produto</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                {preview && <img src={preview} alt="Prévia" className="image-preview" />}
            </div>

            <div className="form-grid">
                <div className="form-row">
                    <label>SKU</label>
                    <input name="sku" value={form.sku} onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <label>Nome</label>
                    <input name="name" value={form.name} onChange={handleChange} required />
                </div>

                <div className="form-row">
                    <label>Preço (R$)</label>
                    <input
                        name="unitPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={form.unitPrice}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Estoque</label>
                    <input
                        name="stockQuantity"
                        type="number"
                        min="0"
                        value={form.stockQuantity}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions">
                <button type="submit" className="buy-btn" disabled={saving}>
                    {saving ? 'Salvando...' : editingProduct ? 'Salvar alterações' : 'Criar produto'}
                </button>
                {editingProduct && (
                    <button type="button" className="cancel-btn" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}

export default ProductForm;