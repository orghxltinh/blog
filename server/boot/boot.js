"use strict"

module.exports = (server) => {
  console.log("comment:------",server.models.comment)

  let User = server.models.user
  let comment = server.models.comment
  let blog = server.models.blog
  let Role = server.models.Role
  let RoleMapping = server.models.RoleMapping

  // createUser("content 1", "some guy", () => {
  //   createUser("content 2", "some guy", () => {
  //     createUser("content 3", "some guy");
  //   })
  // });

  createUser( user => {
      createRole("admin",user.id);
  });

  createBlog(1, () => {
    createBlog(2, () => {
      createBlog(3)
    })
  })



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

  function createBlog(num, cb ){

    blog.create({
      "title": `title ${num}`,
      "content": `content ${num}`,
      "enable": true,
      "createdDate": Date.now(),
      "updatedDate": Date.now()
    }, ( err, blog ) =>{
      if(err) { console.log(`has error: ${err}`); }
      else{
        console.log("create blog: ", blog);
        if( typeof(cb) === "function" ) { cb(); }
      }
    })

  }
}
