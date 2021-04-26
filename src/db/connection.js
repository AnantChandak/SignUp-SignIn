const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/user_register", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,   //So that depriciation warnings doesn't come
}).then(()=>{
    console.log('Connection Successful');
}).catch((e)=>{
    console.log('Error');
})