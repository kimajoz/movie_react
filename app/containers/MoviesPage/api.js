export const fetchData = async () => {
    try {
		const response = await fetch("http://localhost:3000/api/movies");
		const data = await return reponse.json();
		console.log('fetch data moment:' + data);
		return data;
	} catch (err) {
		console.log(err);
	}
}