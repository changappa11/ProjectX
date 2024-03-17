

exports.postVideos = (req,res,next)=> {
    //console.log("In postVideos middleware");
    res.render('index', {docTitle: 'Welcome to ModPlay', paths : '/'});
    //console.log("exiting postVideos middleware");
};

exports.uploadVideos = (req,res,next) => {
    //console.log("In uploadVideos middleware",req.body);
    //res.render('Home', {docTitle: 'Add Product', path = '/'})
    res.render('upload', {docTitle: 'Upload', paths : '/upload'});
    //console.log("exiting uploadVideos middleware");
};

exports.uploadingVideos = (req,res,next) => {
    console.log("In uploadingVideos middleware", req.Buffer);
    // Handle file upload using multer

    res.send('File uploaded successfully!');
    //res.render('uploading', {docTitle: 'Uploading', path : '/uploading'});
    // //res.render('Home', {docTitle: 'Add Product', path = '/'})
    // res.render('upload', {docTitle: 'Upload', path : '/upload'});
    // console.log("exiting uploadVideos middleware");
};