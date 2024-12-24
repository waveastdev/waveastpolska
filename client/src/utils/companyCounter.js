import { projectPlacesEn } from "../data/projectPlacesEn"

export const getProjectsCount = () => {
    const count = projectPlacesEn.length
    const roundedCount = Math.floor(count / 10) * 10
    return `${roundedCount}`
}

export function getYearsSince2011() {
    const currentYear = new Date().getUTCFullYear()
    const years = currentYear - 2011
    return `${years}`
}

export function countUniqueCountries() {
    const countries = projectPlacesEn.map(place => {
        const country = place.name.split(', ')[1]
        return country
    });
    const uniqueCountries = new Set(countries)
    return uniqueCountries.size
}

export const teamSize = 30;

export const continent=5;

export const yearFounded = 2021;