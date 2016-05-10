'use strict';

module.exports = (app) => {
  console.log('comment:------',app.models.comment);

  const User = app.models.user;
  const comment = app.models.comment;

  const Role = app.models.Role;
  const RoleMapping = app.models.RoleMapping;

  const Post = app.models.Post;
  const Category = app.models.Category;

  const defaultUser = {
    'email': 'admin@blog.com',
    'password': '123456',
    'emailVerified': true,
    'sex': 'male',
    'quote': 'I am superman'
  };

  // createUser('content 1', 'some guy', () => {
  //   createUser('content 2', 'some guy', () => {
  //     createUser('content 3', 'some guy');
  //   })
  // });

  findUser(() => {
    dumpData();
  });



  function findUser(cb) {
    User.findOne({
      where: { 'email': defaultUser.email }
    }, (err, user) => {
      if (err) {
        return console.log('error:', err);
      }
      if (user === null){
        if (typeof(cb) === 'function') {
          return cb();
        }
      }
    });
  }

  function dumpData() {
    createUser( user => {
        createRole('admin',user.id);
    });

    const postContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu augue non felis condimentum condimentum. Phasellus posuere at mi non facilisis. Ut eu arcu sed arcu vulputate pretium vitae non enim. Donec pharetra lacus metus, non rutrum sem aliquet in. Donec cursus, leo sit amet scelerisque blandit, sem libero mollis ante, nec fringilla sem quam non sapien. Vivamus dignissim tincidunt mauris. Aliquam sollicitudin dictum pretium. Sed non nisi sed sapien varius consequat. Curabitur turpis massa, tristique quis elementum non, ullamcorper eget ligula. Ut dapibus dolor ac tellus molestie pretium. Nullam ac nunc pellentesque, bibendum ante nec, tincidunt nisi.';

    const category1 = {
      title: 'category 1',
      description: '%3Cp%3E%3Cstrong%3Efsdfsdfsd%3C/strong%3E%3C/p%3E%3Cp%3E%3Cem%3Efgfg%20fdgfg%20df%20gf%3C/em%3E%3C/p%3E',
      slug: 'category-1',
      'createdDate': Date.now(),
      'updatedDate': Date.now()
    };
    const category2 = {
      title: 'category 2',
      description: '%3Cp%3E%3Cstrong%3Efsdfsdfsd%3C/strong%3E%3C/p%3E%3Cp%3E%3Cem%3Efgfg%20fdgfg%20df%20gf%3C/em%3E%3C/p%3E',
      slug: 'category-2',
      'createdDate': Date.now(),
      'updatedDate': Date.now()
    };

    createCategory( category1, (category) => {
      createPost( 1, category.id, () => {
        createPost( 2, category.id, () => {
          createPost( 3, category.id, () => {
            // post.find({
            //   order: 'createdDate DESC',
            //   limit: 2
            // },(err, data) => {
            //     console.log('data*', data);
            // });
          });
        });
      });
      createCategory( category2 );
    });





    function createRole( name, id, cb) {
      Role.create({
        name
      }, ( err, role) => {
        if(err) {
          console.log('shit happends');
          return err;
        }

        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: id
        }, ( err, principal) => {
          if( err ) { throw err }

          console.log('create principal done:', principal);
        })
      })
    }

    function createUser(cb){
      User.create(defaultUser, ( err, user) => {
        if( err ) { console.log(`has error: ${err}`); }
        else{
          console.log('create user: ',user);
          if( typeof(cb) === 'function' ) { cb(user); }
        }
      })
    }

    // function createComment(content, author,cb){
    //   comment.create({
    //     'content': content,
    //     'author': author,
    //   }, (err, user) => {
    //     if(err) { console.log(`has error: ${err}`); }
    //     else{
    //       console.log('create user: ',user);
    //       if( typeof(cb) === 'function' ) { cb(); }
    //     }
    //   })
    // }

    function createCategory( obj, cb ) {
      Category.create(obj, (err, category) => {
        if (err) { return console.log(`has error: ${err}`); }
        console.log('create category: ', category);
        if (typeof(cb) === 'function') { cb( category ); }
      })
    }

    function createPost(num, categoryId, cb ){

      Post.create({
        'title': `title ${num}`,
        'description': `description ${num}`,
        'content': `content ${num}: ${postContent}`,
        'enable': true,
        'createdDate': Date.now(),
        'updatedDate': Date.now(),
        categoryId
      }, ( err, post ) =>{
        if(err) { console.log(`has error: ${err}`); }
        else{
          console.log('create post: ', post);
          if( typeof(cb) === 'function' ) { cb( post ); }
        }
      });
    };
  }

  function createUser(cb){
    User.create(defaultUser, ( err, user) => {
      if( err ) { console.log(`has error: ${err}`); }
      else{
        console.log('create user: ',user);
        if( typeof(cb) === 'function' ) { cb(user); }
      }
    })
  }

}
