module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);

    var api = {
        setModel: setModel,
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        getWidgetTypes: getWidgetTypes
    };
    
    return api;
    
    function setModel(_model) {
        model = _model;
        // WidgetModel.create({"type": "HEADING", "name": "Header", "category": true});
        // WidgetModel.create({"type": "IMAGE", "name": "Image", "category": true});
        // WidgetModel.create({"type": "YOUTUBE", "name": "YouTube", "category": true});
        // WidgetModel.create({"type": "HTML", "name": "HTML", "category": true});
    }
    
    function createWidget(pageId, widget) {
        return model.pageModel
            .findPageById(pageId)
            .then(
                function (pageObj) {
                    WidgetModel
                        .create(widget)
                        .then(function (widgetObj) {
                            widgetObj._page = pageObj;
                            return widgetObj.save();
                        });
                }
            );
    }
    
    function findAllWidgetsForPage(pageId) {
        return model.pageModel
            .findPageById(pageId)
            .then(
                function (pageObj) {
                    return WidgetModel.find({_page: pageObj});
                }
            );
    }
    
    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }
    
    function updateWidget(widgetId, widget) {
        return WidgetModel.update(
            {_id: widgetId},
            widget
        );
    }
    
    function deleteWidget(widgetId) {
        return WidgetModel.remove({_id: widgetId});
    }
    
    function reorderWidget(pageId, start, end) {
        
    }

    function getWidgetTypes() {
        // return WidgetModel.find({category: true});
        return ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT'];
    }
};