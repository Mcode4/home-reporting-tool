const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export async function uploadPropertyImage(propertyId, file) {
    const formData = new FormData();
    formData.append("file", file);  // <-- This is correct
    const res = await fetch(`${API_BASE_URL}/images/upload/${propertyId}`, {
        method: "POST",
        body: formData,
        credentials: 'include'
    })

    const data = await res.json()

    if(!res.ok) {
        throw { status: res.status, message: data.detail || data.message || "Image failed to add" }
    }

    return data
}

export async function getImageByPropertyId(propertyId) {
    const res = await fetch(`${API_BASE_URL}/images/${propertyId}`, {
        method: "GET",
        credentials: "include"
    })

    const data = await res.json()

    if(!res.ok) {
        throw { status: res.status, message: data.detail || data.message || "Image failed to get" }
    }

    return data
}