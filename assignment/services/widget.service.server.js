module.exports = function (app, model) {
    // var next_widget_id = 900;
    // var widgets = [
    //     {"_id": 0, "widgetType": "HEADER", "widgetName": "Header", "type": true},
    //     {"_id": 1, "widgetType": "IMAGE", "widgetName": "Image", "type": true},
    //     {"_id": 2, "widgetType": "YOUTUBE", "widgetName": "YouTube", "type": true},
    //     {"_id": 3, "widgetType": "HTML", "widgetName": "HTML", "type": true},
    //     {"_id": 123, "widgetType": "HEADER", "pageId": 123, "size": 2, "text": "GIZMODO"},
    //     {"_id": 234, "widgetType": "HEADER", "pageId": 123, "size": 4, "text": "Lorem ipsum"},
    //     {
    //         "_id": 345, "widgetType": "IMAGE", "pageId": 123, "width": "100%",
    //         "url": "http://lorempixel.com/400/200/"
    //     },
    //     {"_id": 456, "widgetType": "HTML", "pageId": 123, "text": "<p>Lorem ipsum</p>"},
    //     {"_id": 567, "widgetType": "HEADER", "pageId": 123, "size": 4, "text": "Lorem ipsum"},
    //     {
    //         "_id": 678, "widgetType": "YOUTUBE", "pageId": 123, "width": "100%",
    //         "url": "https://youtu.be/AM2Ivdi9c4E"
    //     },
    //     {"_id": 789, "widgetType": "HTML", "pageId": 123, "text": "<p>Lorem ipsum</p>"}
    // ];

    var widgetTypes = [
        {wid: "0", type: 'HEADING'},
        {wid: "1", type: 'IMAGE'},
        {wid: "2", type: 'YOUTUBE'},
        {wid: "3", type: 'HTML'},
        {wid: "4", type: 'TEXT'}
    ];

    var multer = require('multer'); // npm install multer --save
    var mime = require('mime');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + '/../../public/assignment/uploads')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + '.' + mime.extension(file.mimetype));
        }
    });
    var upload = multer({storage: storage});

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/type', getWidgetTypes);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put('/page/:pageId/widget', sortWidget);


    function uploadImage(req, res) {
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        var originalname = myFile.originalname; // file name on user's computer
        var filename = myFile.filename;     // new file name in upload folder
        var path = myFile.path;         // full path of uploaded file
        var destination = myFile.destination;  // folder where file is saved to
        var size = myFile.size;
        var mimetype = myFile.mimetype;

        var newwidget = {};
        newwidget.type = "IMAGE";
        newwidget.width = width;
        newwidget.url = '/assignment/uploads/' + filename;
        if (widgetId === "1") {
            model.widgetModel
                .createWidget(pageId, newwidget)
                .then(
                    function () {
                        res.redirect("/assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );
        } else {
            model.widgetModel
                .updateWidget(widgetId, newwidget)
                .then(
                    function () {
                        res.redirect("/assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/");
                    },
                    function (error) {
                        res.sendStatus(400).send(error);
                    }
                );
        }

    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        delete widget.wid;
        model.widgetModel
            .createWidget(pageId, widget)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        model.widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgetTypes) {
            if(widgetTypes[w].wid === widgetId) {
                res.json(widgetTypes[w]);
                return;
            }
        }
        model.widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widgetObj) {
                    res.json(widgetObj);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        model.widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        model.widgetModel
            .deleteWidget(widgetId)
            .then(
                function () {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function getWidgetTypes(req, res) {
        res.json(widgetTypes);
    }

    function sortWidget(req, res) {
        // Do nothing now
        // var pageId = req.params.pageId;
        // var start = req.query.initial;
        // var end = req.query.final;
        // var pageToActualIndex = [];
        // for (var w in widgets) {
        //     if (widgets[w].pageId === pageId) {
        //         pageToActualIndex.push(w);
        //     }
        // }
        // widgets.splice
        // (pageToActualIndex[end]
        //     , 0
        //     , widgets.splice(pageToActualIndex[start], 1)[0]);
    }
};