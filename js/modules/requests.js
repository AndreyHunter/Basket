export async function getData(url) {
	try {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error();
		}
		return res.json();
	} catch (err) {
		console.error('Feiled to fetch', err);
	}
}
