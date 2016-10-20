(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
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

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            getWidgetTypes: getWidgetTypes
        };

        return api;

        function createWidget(pageId, widget) {
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
        }

        function findWidgetsByPageId(pageId) {
            var results = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    results.push(widgets[w]);
                }
            }
            return results;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return widgets[w];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
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
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                    break;
                }
            }
        }

        function getWidgetTypes() {
            var result = [];
            for(var w in widgets) {
                if(widgets[w].type)
                    result.push(widgets[w]);
            }
            return result;
        }
    }
})();