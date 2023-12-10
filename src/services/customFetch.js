export async function customFetch(url, params) {
    let query = Object.keys(params).map(
        key => `${key}=${Array.isArray(params[key]) ? params[key].join(',') : params[key]}`
    )
    
    const response = await fetch(url + `?${query}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message)
    }

    return data
}