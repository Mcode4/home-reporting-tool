const API_BASE_URL =
    process.env.API_URL || "http://127.0.0.1:8000"

export async function getAllProperties(id) {
    const res = await fetch(`${API_BASE_URL}/all/${id}`)

    if(!res.ok) {
        throw new Error("Failed to get all user's property")
    }

    return res.json()
}

export async function getPropertyById(id) {
    const res = await fetch(`${API_BASE_URL}/${id}`)

    if(!res.ok) {
        throw new Error("Property not found")
    }

    return res.json()
}

export async function editProperty(id, property) {
  const res = await fetch(`${API_BASE_URL}/property/edit/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(property),
  })

  if (!res.ok) {
    throw new Error("Failed to update property")
  }

  return res.json()
}

export async function deleteProperty(id) {
  const res = await fetch(`${API_BASE_URL}/property/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error("Failed to delete property")
  }

  return res.json()
}
