"use strict"

module.exports = (server) => {
  console.log("comment:------",server.models.comment)

  let User = server.models.user
  let comment = server.models.comment
  let blog = server.models.blog
  let Role = server.models.Role
  let RoleMapping = server.models.RoleMapping
  let Article = server.models.article

  // createUser("content 1", "some guy", () => {
  //   createUser("content 2", "some guy", () => {
  //     createUser("content 3", "some guy");
  //   })
  // });

  createUser( user => {
      createRole("admin",user.id);
  });

  const blogContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu augue non felis condimentum condimentum. Phasellus posuere at mi non facilisis. Ut eu arcu sed arcu vulputate pretium vitae non enim. Donec pharetra lacus metus, non rutrum sem aliquet in. Donec cursus, leo sit amet scelerisque blandit, sem libero mollis ante, nec fringilla sem quam non sapien. Vivamus dignissim tincidunt mauris. Aliquam sollicitudin dictum pretium. Sed non nisi sed sapien varius consequat. Curabitur turpis massa, tristique quis elementum non, ullamcorper eget ligula. Ut dapibus dolor ac tellus molestie pretium. Nullam ac nunc pellentesque, bibendum ante nec, tincidunt nisi.';

  const article1 = {
    title: "article 1",
    description: "%3Cp%3E%3Cstrong%3Efsdfsdfsd%3C/strong%3E%3C/p%3E%3Cp%3E%3Cem%3Efgfg%20fdgfg%20df%20gf%3C/em%3E%3C/p%3E",
    slug: "article-1",
    "createdDate": Date.now(),
    "updatedDate": Date.now()
  };
  const article2 = {
    title: "article 2",
    description: "%3Cp%3E%3Cstrong%3Efsdfsdfsd%3C/strong%3E%3C/p%3E%3Cp%3E%3Cem%3Efgfg%20fdgfg%20df%20gf%3C/em%3E%3C/p%3E",
    slug: "article-2",
    "createdDate": Date.now(),
    "updatedDate": Date.now()
  };

  createArticle( article1, (article) => {
    createBlog( 1, article.id, () => {
      createBlog( 2, article.id, () => {
        createBlog( 3, article.id, () => {
          // blog.find({
          //   order: 'createdDate DESC',
          //   limit: 2
          // },(err, data) => {
          //     console.log('data*', data);
          // });
        });
      });
    });
    createArticle( article2 );
  });





  function createRole( name, id, cb) {
    Role.create({
      name
    }, ( err, role) => {
      if(err) {
        console.log("shit happends");
        return err;
      }

      role.principals.create({
        principalType: RoleMapping.USER,
        principalId: id
      }, ( err, principal) => {
        if( err ) { throw err }

        console.log("create principal done:", principal);
      })
    })
  }

  function createUser(cb){
    User.create({
      "email": "hxltinh@gmail.com",
      "password": "123456",
      "emailVerified": true
    }, ( err, user) => {
      if( err ) { console.log(`has error: ${err}`); }
      else{
        console.log("create user: ",user);
        if( typeof(cb) === "function" ) { cb(user); }
      }
    })
  }

  // function createComment(content, author,cb){
  //   comment.create({
  //     "content": content,
  //     "author": author,
  //   }, (err, user) => {
  //     if(err) { console.log(`has error: ${err}`); }
  //     else{
  //       console.log("create user: ",user);
  //       if( typeof(cb) === "function" ) { cb(); }
  //     }
  //   })
  // }

  function createArticle( obj, cb ) {
    Article.create(obj, (err, article) => {
      if (err) { return console.log(`has error: ${err}`); }
      else {
        console.log("create article: ", article);
        if (typeof(cb) === "function") { cb( article ); }
      }
    })
  }

  function createBlog(num, articleId, cb ){

    blog.create({
      "title": `title ${num}`,
      "description": `description ${num}`,
      "content": `content ${num}: ${blogContent}`,
      "enable": true,
      "createdDate": Date.now(),
      "updatedDate": Date.now(),
      articleId
    }, ( err, blog ) =>{
      if(err) { console.log(`has error: ${err}`); }
      else{
        console.log("create blog: ", blog);
        if( typeof(cb) === "function" ) { cb( blog ); }
      }
    })

  }
}
