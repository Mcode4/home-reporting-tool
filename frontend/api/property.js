const API_BASE_URL =
    process.env.API_URL || "http://127.0.0.1:8000"

export async function getAllProperties(id) {
    const res = await fetch(`${API_BASE_URL}/all/${id}`)

    const data = await res.json()

    if (!res.ok) {
        throw { status: res.status, message: data.detail || "Login failed"}
    }

    return data
}

export async function getPropertyById(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`)

    const data = await res.json()

    if (!res.ok) {
        throw { status: res.status, message: data.detail || "Login failed"}
    }

    return data
}

export async function editProperty(id, property) {
  const res = await fetch(`${API_BASE_URL}/property/edit/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(property),
  })

  const data = await res.json()

    if (!res.ok) {
        throw { status: res.status, message: data.detail || "Login failed"}
    }

    return data
}

export async function deleteProperty(id) {
  const res = await fetch(`${API_BASE_URL}/property/${id}`, {
    method: "DELETE",
  })

  const data = await res.json()

    if (!res.ok) {
        throw { status: res.status, message: data.detail || "Login failed"}
    }

    return data
}
