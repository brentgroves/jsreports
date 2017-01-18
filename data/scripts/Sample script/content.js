function beforeRender(req, res, done) {
  //you can use a server side running script to load remote data
  //or do other template preprocessing
  //
      //request.template.content
    //request.template.helpers
    //request.data
console.log(request.data.books[0].name);
  req.data.generatedOn = new Date();
  done();
}