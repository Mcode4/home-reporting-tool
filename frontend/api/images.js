const API_BASE_URL = process.env.NEXT_PUBLIC_PROXY == "true" ? '/api' : "http://127.0.0.1:8000/api";


console.log(`ENV: ${process.env.NEXT_PUBLIC_API_URL}`)
console.log(`API URL: ${API_BASE_URL}`)

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
    });

    const contentType = res.headers.get("Content-Type") || "";

    if(!res.ok) {
        if(contentType.includes("application/json")) {
            const err = await res.json().catch(()=> ({detail: "Unknown error"}))
            throw { status: res.status, message: err.detail || err.message || "Image failed to get" }
        }
        const text = await res.text().catch(()=> "Unknown error");
        throw { status: res.status, message: text };
    }

    if (contentType.includes("application/json")) {
        const data = await res.json();
        return data;
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    return { url, contentType, blob };
}