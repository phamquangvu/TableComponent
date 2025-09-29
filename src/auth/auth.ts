import { normalizeHttpError } from "../lib";

interface LoginRequest {
  email: string;
  password: string;
}

interface Permission {
  id: number;
  name: string;
  action: string;
  type: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  permission: Permission[];
}

interface UserInfo {}

export const loginUser = async (req: LoginRequest): Promise<LoginResponse> => {
  // Use fetch directly to avoid any interference from global HTTP client hooks
  const response = await fetch(
    `https://platinum-sit-api.lthcareline.com/api/v1/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email: req.email, // Backend expects 'username' field but we send email
        password: req.password,
        deviceId: "0a1e8943c492e64e4a54abccd4ebfb53",
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Login failed: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as Record<string, unknown>;
  console.log("🔍 Login response:", data);

  let accessToken: string | undefined;

  // hỗ trợ nhiều kiểu key khác nhau
  if (typeof data.accessToken === "string") {
    accessToken = data.accessToken;
  } else if (typeof data.access_token === "string") {
    accessToken = data.access_token;
  } else if (typeof data.token === "string") {
    accessToken = data.token;
  } else if (typeof data === "string") {
    accessToken = data;
  }

  if (!accessToken) {
    throw new Error("No access token found in response");
  }

  return {
    accessToken,
    refreshToken:
      (data.refreshToken as string) || (data.refresh_token as string) || "",
    permission: (data.permission as Permission[]) || [],
  };
};

export async function login(req: LoginRequest): Promise<UserInfo> {
  try {
    // First login to get token
    const loginResponse = await loginUser(req);

    console.log("🔍 Login response in wrapper:", loginResponse);

    // Store token in Redux and localStorage
    // store.dispatch(setToken(loginResponse.access_token));

    //test
    // localStorage.setItem("auth_token", loginResponse.accessToken);
    localStorage.setItem("auth_token", loginResponse.accessToken);
    localStorage.setItem("refresh_token", loginResponse.refreshToken);

    // console.log("🔍 Token stored:", loginResponse.access_token);
    // console.log("🔍 Redux state after token:", store.getState().auth.token); // Then get user info
    // const me = await getMe();
    // if (!me) {
    //   throw new Error("Failed to get user info");
    // }
    return {};
  } catch (e) {
    console.error("🔍 Login error:", e);
    const { message } = await normalizeHttpError(e);
    throw new Error(message);
  }
}
