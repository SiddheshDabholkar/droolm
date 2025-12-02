const getUserDetails = async ({ token }: { token: string }) => {
  try {
    const userInfo = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ).then((r) => r.json());
    console.log("userInfo", userInfo);
    return {
      ...userInfo,
      googleId: userInfo.sub,
      fullName: `${userInfo.given_name} ${userInfo.family_name}`,
    };
  } catch (error) {
    console.error("Something went wrong", error);
    throw error;
  }
};

export { getUserDetails };
