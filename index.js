const express = require("express");
const multer = require("multer");
const mimetype = require("mime-types");

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "imagenes/");
    },
    filename: (req, file, cb) => {
        console.log(file);
        const ext = mimetype.extension(file.mimetype);
        cb(null, file.fieldname + Date.now() + "." + ext);
    }
});

const pdfStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "licencias/");
    },
    filename: (req, file, cb) => {
        console.log(file);
        const ext = mimetype.extension(file.mimetype);
        cb(null, file.fieldname + Date.now() + "." + ext);
    }
});

const uploadImage = multer({storage: imageStorage});
const uploadPDF = multer({storage: pdfStorage});

let app = express();

app.post("/users/profile", uploadImage.single('imagen'),(req, res) => {
    res.json({
        message: "probando subir archivos al servidor",
        info: req.body
    })
});

app.post("/users/licencia", uploadPDF.single('licencia'),(req, res) => {
    res.json({
        message: "probando subir archivos al servidor",
        info: req.file
    })
});


app.listen(8000, () => {
    console.log("Inicializando en el servidor 8000")
});