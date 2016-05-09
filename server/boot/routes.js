'use strict';

module.exports = (app) => {

  let User = app.models.user;
  let post = app.models.Post;
  let category = app.models.Category;
  let router = app.loopback.Router();

  // const AccessToken = app.models.AccessToken;
  const ttl = 86400;
  // match everything except string 'api|explorer' to make sure api route work as it is
  // app.get(/^(?!.*(api|explorer|login))/, (req, res) => {
  //   return res.render('home')
  // })
  //
  // app.get('/login', (req,res) => {
  //
  // })

  router
    .get( '/', ( req, res) => {
      return res.render('home');
    })
    .get('/api/Posts/latest', ( req, res) => {
      post.find({
        order: 'updatedDate DESC',
        limit: 5
      }, (err, data) => {
        if(err){ return res.status(500); }
        return res.json(data);
      });
    })
    .get( /^\/(admin|post)\/*/, ( req, res) => {
      return res.render('home');
    })
    // .get( /^\/post*/, ( req, res) => {
    //   return res.render('home')
    // })

    .get( '/test', ( req, res) => {
      category.findOne(
        {
          where: { slug: 'category-1' },
          include: 'post'
        }, ( err, category ) => {
          return res.json(category);
      });
    })
    .get( '/assets/*', (req, res) => {
      return res.status(404).send('error');
    })
    .post( '/api/login', ( req, res) => {
      let email = req.body.email;
      let password = req.body.password;
      // TODO: remove all access token of this user

      User.login({
        email,
        password,
        ttl
      }, 'user', (err, token) => {
        if (err) {
          return res.status(401).json({'error': 'login fail'});
        }
        return res.json({
          userId: token.userId,
          email,
          'token': token.id
        });
      });
    });

  app.use(router);
};
