import passport from "passport";
import {
  getLongLivedToken,
  getInstagramBusinessId
} from "../services/facebook.service.js";

export default function authRoutes(app) {

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      scope: ["public_profile"]
    })
  );


  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/error" }),
    async (req, res) => {
      try {
        const shortToken = req.user.accessToken;

     
        const tokenEAA = await getLongLivedToken(shortToken);

        let instagramBusinessId = null;
        let pageId = null;
        let message = "instagram business encontrado";

        try {
          const igData = await getInstagramBusinessId(tokenEAA);
          instagramBusinessId = igData.instagramBusinessId;
          pageId = igData.pageId;
        } catch (err) {
          message = "nenhuma conta instagram business vinculada a este facebook";
        }

        return res.json({
          token_eaa: tokenEAA,
          page_id: pageId,
          instagram_business_id: instagramBusinessId,
          has_instagram_business: !!instagramBusinessId,
          message
        });

      } catch (err) {
        return res.status(400).json({
          error: err.message
        });
      }
    }
  );
}
