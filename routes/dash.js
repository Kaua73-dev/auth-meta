const dashRoutes = (app) => {
  app.get("/", (req, res) => {
    res.send(`
      <h1>Teste OAuth Facebook</h1>
      <a href="/auth/facebook">Login com Facebook</a>
    `);
  });
};

export default dashRoutes;
