import axios from "axios";

export async function generateToken() {
  try {
    var options = {
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL}/oauth/token`,
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: `${process.env.NEXT_PUBLIC_API_CLIENT_ID}`,
        client_secret: `${process.env.NEXT_PUBLIC_API_CLIENT_SECRET}`,
        audience: `${process.env.NEXT_PUBLIC_API_IDENTIFIER}`,
      }),
    };
    const { data } = await axios.request(options);
    return data.access_token;
  } catch (error) {
    throw error;
  }
}

export async function validateUser(
  id: string,
  permissions: string
): Promise<boolean> {
  try {
    const token = await generateToken();
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_IDENTIFIER}users/${id}/permissions`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.request(config);
    const userPermissions = response.data;

    if (response.status === 500 || response.status === 404) {
      return false;
    }

    const user = userPermissions.filter(
      (permission: any) => permission.permission_name === permissions
    );

    if (user.length > 0) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
}
