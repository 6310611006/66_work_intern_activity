import axios from "axios";

export const listAllUser = async (authtoken) =>
	await axios.get("http://localhost:5500/api" + "/listAllUser", {
		headers: {
			authtoken,
		},
	});

export const chaneRole = async (authtoken, data) =>
	await axios.post(
		"http://localhost:5500/api" + "/changeRole",
		{ data },
		{
			headers: {
				authtoken,
			},
		}
	);

// export const getProfile = async (authtoken) =>
// 	await axios.get("http://localhost:5500/api" + "/profile", {
// 		headers: {
// 			authtoken,
// 		},
// 	});

export const getPost = async (postId) =>
	await axios.get("http://localhost:5500/api" + `/post/${postId}`, {});

export const getEmployerProfile = async (employerId) =>
	await axios.get(
		"http://localhost:5500/api" + `/profileEmployer/${employerId}`,
		{}
	);

export const getStudentProfile = async (authtoken) =>
	await axios.get("http://localhost:5500/api" + `/profileStudent`, {
		headers: {
			authtoken,
		},
	});
