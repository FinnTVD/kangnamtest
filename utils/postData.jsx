export default async function postData(api, data) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}${api}`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
    return res.json()
}
