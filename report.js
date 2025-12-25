'use strict';

const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

let countries = [
    { id: 1, name: "日本", capital: "東京"},
    { id: 2, name: "アメリカ", capital: "ワシントンD.C."},
    { id: 3, name: "フランス", capital: "パリ"},
];

let colors = [
    { id: 1, name: "赤", code: "#FF0000"},
    { id: 2, name: "青", code: "#0000FF"},
    { id: 3, name: "緑", code: "#008000"},
];

let handsigns = [
    { id: 1, name: "ピース", usage: "写真撮影、勝利"},
    { id: 2, name: "サムズアップ", usage: "承認、いいね"},
    { id: 3, name: "OKサイン", usage: "了解、お金"},
];



app.get("/", (req, res) => {
    res.render('junction');
});



app.get("/country", (req, res) => {
    res.render('country_l', { data: countries });
});

app.get("/country/detail/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = countries.find(c => c.id === id);
    if (!item) return res.send("データが見つかりません");
    res.render('country_d', { data: item });
});

app.get("/country/add", (req, res) => {
    res.render('country_f', { data: null, mode: 'add' });
});

app.post("/country/add", (req, res) => {
    const newId = countries.length > 0 ? Math.max(...countries.map(c => c.id)) + 1 : 1;
    const newItem = {
        id: newId,
        name: req.body.name,
        capital: req.body.capital,
    };
    countries.push(newItem);
    res.redirect('/country');
});

app.get("/country/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = countries.find(c => c.id === id);
    if (!item) return res.redirect('/country');
    res.render('country_f', { data: item, mode: 'edit' });
});

app.post("/country/update/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = countries.findIndex(c => c.id === id);
    if (index !== -1) {
        countries[index].name = req.body.name;
        countries[index].capital = req.body.capital;
    }
    res.redirect('/country');
});

app.get("/country/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = countries.findIndex(c => c.id === id);
    if (index !== -1) {
        countries.splice(index, 1);
    }
    res.redirect('/country');
});



app.get("/color", (req, res) => {
    res.render('color_l', { data: colors });
});

app.get("/color/detail/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = colors.find(c => c.id === id);
    res.render('color_d', { data: item });
});

app.get("/color/add", (req, res) => {
    res.render('color_f', { data: null, mode: 'add' });
});

app.post("/color/add", (req, res) => {
    const newId = colors.length > 0 ? Math.max(...colors.map(c => c.id)) + 1 : 1;
    colors.push({
        id: newId,
        name: req.body.name,
        code: req.body.code,
    });
    res.redirect('/color');
});

app.get("/color/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = colors.find(c => c.id === id);
    res.render('color_f', { data: item, mode: 'edit' });
});

app.post("/color/update/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = colors.findIndex(c => c.id === id);
    if (index !== -1) {
        colors[index].name = req.body.name;
        colors[index].code = req.body.code;
    }
    res.redirect('/color');
});

app.get("/color/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = colors.findIndex(c => c.id === id);
    if (index !== -1) colors.splice(index, 1);
    res.redirect('/color');
});



app.get("/handsign", (req, res) => {
    res.render('handsign_l', { data: handsigns });
});

app.get("/handsign/detail/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = handsigns.find(c => c.id === id);
    res.render('handsign_d', { data: item });
});

app.get("/handsign/add", (req, res) => {
    res.render('handsign_f', { data: null, mode: 'add' });
});

app.post("/handsign/add", (req, res) => {
    const newId = handsigns.length > 0 ? Math.max(...handsigns.map(c => c.id)) + 1 : 1;
    handsigns.push({
        id: newId,
        name: req.body.name,
        usage: req.body.usage,
    });
    res.redirect('/handsign');
});

app.get("/handsign/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const item = handsigns.find(c => c.id === id);
    res.render('handsign_f', { data: item, mode: 'edit' });
});

app.post("/handsign/update/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = handsigns.findIndex(c => c.id === id);
    if (index !== -1) {
        signs[index].name = req.body.name;
        signs[index].usage = req.body.usage;
    }
    res.redirect('/handsign');
});

app.get("/handsign/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = signs.findIndex(c => c.id === id);
    if (index !== -1) signs.splice(index, 1);
    res.redirect('/handsign');
});


app.listen(8886, () => {console.log('Listening on port 8886!');});