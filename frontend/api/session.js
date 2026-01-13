const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export async function login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include"
    })
    console.log("login in progress")

    const text = await res.text().catch(()=>"")
    let data = {}
    try { data = text ? JSON.parse(text) : {} } catch (e) { data = {} }

    if (!res.ok) {
        throw { status: res.status, message: data.detail || data.message || "Login failed" }
    }

    return data
}

export async function register(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    console.log("DATA", data)

    if (!res.ok) {
        throw { status: res.status, message: data.detail || "Login failed"}
    }

    return data
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

    const data = await res.json()

    if (!res.ok) {
        throw { status: res.status, message: data.detail || "Login failed"}
    }

    return data
}

export async function getCurrentUser() {
    const res = await fetch(`${API_BASE_URL}/session`, {
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Not authenticated");
    }

    return res.json();
}