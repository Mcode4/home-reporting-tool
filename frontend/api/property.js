const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export async function getAllProperties() {
    const res = await fetch(`${API_BASE_URL}/property/all`, {
      credentials: 'include'
    })

    const data = await res.json()

    if (!res.ok) {
        throw { status: res.status, message: data.detail || "Properties not failed"}
    }

    return data
}

export async function getPropertyById(id) {
    const res = await fetch(`${API_BASE_URL}/property/${id}`, {
      credentials: 'include'
    })

    const data = await res.json()

    if (!res.ok) {
        throw { status: res.status, message: data.detail || "Property not failed"}
    }

    return data
}

export async function addProperty(dataObj) {
  const verifiedData = {}
  const verifyKeys = new Set([
    "name", "address", "city", "state", "zip", "country",
    "bedrooms", "bathrooms"
  ])

  for(let key of Object.keys(dataObj)) {
    if(!verifyKeys.has(key)) {
      return console.error(`"${key}" is not a valid key`);
    }
    else {
      verifiedData[key] =  dataObj[key];
    }
  }
  const res = await fetch(`${API_BASE_URL}/property/add`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(verifiedData),
    credentials: "include"
  });

  const data = await res.json();

  if(!res.ok) {
    throw { status: res.status, message: data.detail || "Property could not be created"}
  }

  return data;
} 

export async function editProperty(id, property) {
  const res = await fetch(`${API_BASE_URL}/property/edit/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(property),
    credentials: 'include'
  })

  const data = await res.json()

    if (!res.ok) {
        throw { status: res.status, message: data.detail || "Property could not be edited"}
    }

    return data
}

export async function deleteProperty(id) {
  const res = await fetch(`${API_BASE_URL}/property/${id}`, {
    method: "DELETE",
    credentials: 'include'
  })

  const data = await res.json()

    if (!res.ok) {
        throw { status: res.status, message: data.detail || "Property could not be deleted"}
    }

    return data
}

export async function updatePropertyDetails(id, details) {
  const res = await fetch(`${API_BASE_URL}/property/details/${Number(id)}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(details),
    credentials: 'include'
  });

  const data = await res.json();

  if (!res.ok) {
      throw { status: res.status, message: data.detail || "Property details could not be updated"}
  }

  return data
}