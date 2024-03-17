exports.get404 = (req,res,next)=>{
    //res.status(404).sendFile(path.join(__dirname,'views','page-not-found.html'))
    console.log("In 404 middleware")
    res.status(404).render('page_not_found',{docTitle : '404'})
};