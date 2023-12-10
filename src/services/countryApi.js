import { customFetch } from "./customFetch"

const URL = import.meta.env.VITE_COUNTRIES_URL

export async function countries(params) {
    const fields = {fields: params.fields}

    if (params.region) 
        return await regionCountries(params.region, fields)

    if (params.search)
        return await searchCountries(params.search, fields)

    if (params.code) 
        return await getCountry(params.code, fields)

    return await allCountries(fields)
}

export async function allCountries(params = {}) {
    return await customFetch(`${URL}/all`, params)
}

export async function regionCountries(region, params = {}) {
    return await customFetch(`${URL}/region/${region}`, params)
}

export async function searchCountries(search, params = {}) {
    return await customFetch(`${URL}/name/${search ?? null}`, params)
}

export async function getCountry(params = {}) {
    const data = (await customFetch(`${URL}/alpha/${params.code ?? null}`, {fields: params.fields}))

    if (data.borders.length)
        data.borders = (await customFetch(`${URL}/alpha`, {codes: data.borders, fields: params.borders_fields}))
    
    return data
}