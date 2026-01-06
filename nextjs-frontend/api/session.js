const API_BASE_URL =
    process.env.API_URL || "http://127.0.0.1:8000"

export async function login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
        throw new Error("Login failed")
    }

    return res.json()
}

export async function register(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
        throw new Error("Registration failed")
    }

    return res.json()
}

export async function additionalInfo(updateObj) {
    const allowedKeys = ["name", "phone"]
    const resBody = {}

    for (let key of Object.keys(updateObj)) {
        if (!allowedKeys.includes(key)) {
        throw new Error("updateObj only accepts name or phone")
        }

        resBody[key] = updateObj[key]
    }

    const res = await fetch(`${API_BASE_URL}/auth/additional-info`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resBody)
    })

    if(!res.ok) {
        throw new Error("Additional info failed to add")
    }

    return res.json()
}