import { auth, app, goto } from "./path/to/dependencies";
import { Register } from "./$types";
// import { jest, describe } from "jest/bin/jest";

jest.mock("./path/to/dependencies", () => {
	const auth = {
		register: jest.fn(),
		signIn: jest.fn()
	};
	const app = {
		isLoading: false
	};
	const goto = jest.fn();
	return { auth, app, goto };
});

describe("submit", () => {
	const displayName = "John Doe";
	const email = "john.doe@example.com";
	const password = "password";
	const confirmPassword = "password";
	const autoLogin = true;

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should call auth.register and auth.signIn and goto with "/protected/profile" when response is truthy', async () => {
		const response = {};
		auth.register.mockResolvedValue(response);

		await submit();

		expect(app.isLoading).toBe(false);
		expect(responseStatus).toBe(null);
		expect(auth.register).toHaveBeenCalledWith(
			new Register({
				displayName,
				email,
				password,
				confirmPassword,
				autoLogin
			})
		);
		expect(auth.signIn).toHaveBeenCalledWith(response);
		expect(goto).toHaveBeenCalledWith("/protected/profile");
	});

	it("should set responseStatus to e.responseStatus or e and set app.isLoading to false when there is an error", async () => {
		const e = new Error("Error message");
		auth.register.mockRejectedValue(e);

		await submit();

		expect(app.isLoading).toBe(false);
		expect(responseStatus).toBe(e);
		expect(auth.register).toHaveBeenCalledWith(
			new Register({
				displayName,
				email,
				password,
				confirmPassword,
				autoLogin
			})
		);
		expect(auth.signIn).not.toHaveBeenCalled();
		expect(goto).not.toHaveBeenCalled();
	});
});
