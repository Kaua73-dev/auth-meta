import passport from "passport";
import "../auth/facebook.js";
import {
  getInstagramBusinessId,
  getLongLivedToken
} from "../services/facebook.service.js";

const authRoutes = (app) => {
  
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [
        'public_profile',
        'pages_show_list',
        'pages_read_engagement',
        'instagram_basic',
        'instagram_manage_insights',
        'instagram_content_publish'
      ]
    })
  );

 // Gera token EAA e isnstagram Business ID automaticamente
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/error" }),
    async (req, res) => {
      try {
        const shortLivedToken = req.user.accessToken;
        const tokenEAA = await getLongLivedToken(shortLivedToken);


        const instagramData = await getInstagramBusinessId(tokenEAA);
        return res.json({
          token: tokenEAA,
          instagramBusinessId: instagramData.instagramBusinessId
        });

      } catch (error) {
        console.error('Erro:', error);
        return res.status(500).json({
          error: error.message,
          details: 'Certifique-se de que sua página do Facebook está vinculada a uma conta Instagram Business'
        });
      }
    }
  );


  app.get('/error', (req, res) => {
    res.status(500).json({
      error: 'Erro na autenticação com Facebook'
    });
  });

};

export default authRoutes;