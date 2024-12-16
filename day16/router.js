const router = require("express").Router()
const path = require("path")

router.get('/', async(req, res)=>{

res.sendFile(path.join(__dirname,"public", "index.html"))    

})
router.get('/text', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'text.html'));
});

router.get('/image', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'image.html'));
});

router.get('/element', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'element.html'));
});


module.exports =router