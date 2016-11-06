module.exports = function(app) {
    var next_widget_id = 900;
    var widgets = [
        { "_id": 0, "widgetType": "HEADER", "widgetName": "Header", "type": true},
        { "_id": 1, "widgetType": "IMAGE", "widgetName": "Image", "type": true},
        { "_id": 2, "widgetType": "YOUTUBE", "widgetName": "YouTube", "type": true},
        { "_id": 3, "widgetType": "HTML", "widgetName": "HTML", "type": true},
        { "_id": 123, "widgetType": "HEADER", "pageId": 123, "size": 2, "text": "GIZMODO"},
        { "_id": 234, "widgetType": "HEADER", "pageId": 123, "size": 4, "text": "Lorem ipsum"},
        { "_id": 345, "widgetType": "IMAGE", "pageId": 123, "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": 456, "widgetType": "HTML", "pageId": 123, "text": "<p>Lorem ipsum</p>"},
        { "_id": 567, "widgetType": "HEADER", "pageId": 123, "size": 4, "text": "Lorem ipsum"},
        { "_id": 678, "widgetType": "YOUTUBE", "pageId": 123, "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": 789, "widgetType": "HTML", "pageId": 123, "text": "<p>Lorem ipsum</p>"}
    ];

    app.post('/api/page/:pageId/widget', createWidget);
    app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
    app.get('/api/widget/:widgetId', findWidgetById);
    app.put('/api/widget/:widgetId', updateWidget);
    app.delete('/api/widget/:widgetId', deleteWidget);
    app.get('api/widget/type', getWidgetTypes);

    function createWidget(req, res) {
        var pageId = parseInt(req.params.pageId);
        var widget = req.body;
        newwidget = {}
        newwidget._id = next_widget_id;
        newwidget.pageId = pageId;
        newwidget.widgetType = widget.widgetType;
        switch (widget.widgetType) {
            case "HEADER":
                newwidget.text = widget.text;
                newwidget.size = widget.size;
                break;
            case "IMAGE":
                newwidget.width = widget.width;
                newwidget.url = widget.url;
                break;
            case "YOUTUBE":
                newwidget.width = widget.width;
                newwidget.url = widget.url;
                break;
            case "HTML":
                newwidget.text = widget.text;
                break;
        }
        widgets.push(newwidget);
        next_widget_id += 111;
        res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = parseInt(req.params.pageId);
        var results = [];
        for(var w in widgets) {
            if(widgets[w].pageId === pageId) {
                results.push(widgets[w]);
            }
        }
        res.send(results);
    }

    function findWidgetById(req, res) {
        var widgetId = parseInt(req.params.widgetId);
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                res.send(widgets[w]);
                return;
            }
        }
        res.send(null);
    }

    function updateWidget(req, res) {
        var widgetId = parseInt(req.params.widgetId);
        var widget = req.body;
        for(var w in widgets) {
            if (widgets[w]._id === widgetId) {
                if(widgets[w].widgetType === "HEADER") {
                    widgets[w].size = widget.size;
                    widgets[w].text = widget.text;
                } else if(widgets[w].widgetType === "IMAGE" || widgets[w].widgetType === "YOUTUBE") {
                    widgets[w].url = widget.url;
                    widgets[w].width = widget.width;
                } else {
                    widgets[w].text = widget.text;
                }
                break;
            }
        }
        res.sendStatus(200);
    }

    function deleteWidget(req, res) {
        var widgetId = parseInt(req.params.widgetId);
        for(var w in widgets) {
            if(widgets[w]._id === widgetId) {
                widgets.splice(w, 1);
                break;
            }
        }
        res.sendStatus(200);
    }

    function getWidgetTypes(req, res) {
        var result = [];
        for(var w in widgets) {
            if(widgets[w].type)
                result.push(widgets[w]);
        }
        res.send(result);
    }
};