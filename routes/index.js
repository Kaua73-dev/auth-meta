import authRoutes from "./auth.js";

const registerRoutes = (app) => { 
   authRoutes(app);
};

export default registerRoutes;