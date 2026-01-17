import axios from "axios";

export async function getLongLivedToken(shortToken) {
  const { data } = await axios.get(
    "https://graph.facebook.com/v21.0/oauth/access_token",
    {
      params: {
        grant_type: "fb_exchange_token",
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        fb_exchange_token: shortToken,
      },
    }
  );

  return data.access_token;
}

export async function getInstagramBusinessId(userToken) {
  // 1. Páginas
  const pagesRes = await axios.get(
    "https://graph.facebook.com/v21.0/me/accounts",
    {
      params: {
        access_token: userToken,
        fields: "id,access_token",
      },
    }
  );

  for (const page of pagesRes.data.data) {
    // 2. Instagram vinculado
    const igRes = await axios.get(
      `https://graph.facebook.com/v21.0/${page.id}`,
      {
        params: {
          access_token: page.access_token,
          fields: "instagram_business_account",
        },
      }
    );

    if (igRes.data.instagram_business_account) {
      return igRes.data.instagram_business_account.id;
    }
  }

  throw new Error("Nenhuma conta Instagram Business encontrada");
}
