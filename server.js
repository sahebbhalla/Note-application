const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const express =require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/api',apiRoutes);
app.use('/',htmlRoutes);

app.listen(PORT,()=>{
    console.log("Server now on port 3001")
})