import axios from "axios";

export async function getLongLivedToken(shortToken) {
  const { data } = await axios.get(
    "https://graph.facebook.com/v21.0/oauth/access_token",
    {
      params: {
        grant_type: "fb_exchange_token",
        client_id: process.env.FACEBOOK_APP_ID,
        client_secret: process.env.FACEBOOK_APP_SECRET,
        fb_exchange_token: shortToken
      }
    }
  );

  return data.access_token;
}

export async function getInstagramBusinessId(userToken) {
  const pagesRes = await axios.get(
    "https://graph.facebook.com/v21.0/me/accounts",
    {
      params: { access_token: userToken }
    }
  );

  if (!pagesRes.data?.data?.length) {
    throw new Error("usuario nao possui paginas");
  }

  for (const page of pagesRes.data.data) {
    const igRes = await axios.get(
      `https://graph.facebook.com/v21.0/${page.id}`,
      {
        params: {
          access_token: userToken,
          fields: "instagram_business_account"
        }
      }
    );

    if (igRes.data.instagram_business_account) {
      return {
        pageId: page.id,
        instagramBusinessId: igRes.data.instagram_business_account.id
      };
    }
  }

  throw new Error("nenhuma pagina com instagram business");
}
