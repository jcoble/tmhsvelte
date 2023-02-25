import { JsonServiceClient } from "@servicestack/client";
import { Authenticate, QueryAppUsers } from "../types/dtos";

export const client = new JsonServiceClient("").apply((c) => {
	c.basePath = "/api";
	c.headers = new Headers(); //avoid pre-flight CORS requests
	c.enableAutoRefreshToken = true;
	// c.mode = 'cors';
});

var response = await client.post(
	new Authenticate({
		provider: "google",
		state: "state",
		scope: "openid profile email"
	})
);
// console.log(response);
// function getAuth() {
// 	return client.post(
// 		new Authenticate({
// 			provider: 'credentials',
// 			userName: 'jc@gmail.com',
// 			password: '111111Jc',
// 			rememberMe: true
// 		})
// 	);
// }
// var a = await getAuth();
// console.log(a);

var b = await client.get(new QueryAppUsers());
// console.log(b);

// var response = client.post(new Authenticate(

// client.post(new Authenticate({ provider: "credentials", userName: "jc@gmail.com",
//     password: "111111Jc",
// 	rememberMe: true
// }));
