import axios from 'axios';

const BASE_URL = 'http://localhost';

export const requestApi = async (url, body, header, method) => {
	try {
		const res = await axios({
			url: BASE_URL + url,
			data: body,
			headers: header,
			method,
		});
		return res;
	} catch (err) {
		if (err.response) {
			throw err.response;
		}
		alert('네트워크 연결을 확인해 주세요');
		throw null;
	}
};


