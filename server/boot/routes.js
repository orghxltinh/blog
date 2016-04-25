"use strict"

module.exports = (app) => {

  let User = app.models.user;
  let blog = app.models.blog;
  let article = app.models.article;
  let router = app.loopback.Router();
  // match everything except string 'api|explorer' to make sure api route work as it is
  // app.get(/^(?!.*(api|explorer|login))/, (req, res) => {
  //   return res.render("home")
  // })
  //
  // app.get("/login", (req,res) => {
  //
  // })

  router
    .get( "/", ( req, res) => {
      return res.render("home")
    })
    .get('/api/blogs/latest', ( req, res) => {
      blog.find({
        order: 'updatedDate DESC',
        limit: 5
      }, (err, data) => {
          if(err){ return res.status(500); }
          return res.json(data);
      });
    })
    .get( /^\/(admin|blog)\/*/, ( req, res) => {
      return res.render("home")
    })
    // .get( /^\/blog*/, ( req, res) => {
    //   return res.render("home")
    // })

    .get( "/test", ( req, res) => {
      article.findOne(
        {
          where: { slug: "article-1" },
          include: "blog"
        }, ( err, article ) => {
          return res.json(article)
      });
    })
    .get( "/assets/*", (req, res) => {
      return res.status(404).send("error")
    })
    .post( "/api/login", ( req, res) => {
      let email = req.body.email
      let password = req.body.password

      User.login({
        email,
        password
      }, "user", (err, token) => {
        if( err ) {
          return res.status(401).json({"error": "login fail"})
        }else {
          return res.json({
            email,
            "token": token.id
          })
        }
      })


    })

  app.use(router)
}
