export default async function getData(api, langCode) {
    const res = await fetch(`${process.env.API}${api}`, {
        method: 'GET',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'X-language-code': `${langCode}`,
        },
        next: { revalidate: 60 },
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        // throw new Error('Failed to fetch data')
        // console.log('Failed to fetch data')
        console.log('Failed to fetch data', res)
    }

    return res.json()
}
