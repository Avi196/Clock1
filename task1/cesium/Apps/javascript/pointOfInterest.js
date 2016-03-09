/**
 * Created by igor on 9/3/16.
 */
onload = function pointOfInterest() {

    var viewer = new Cesium.Viewer('cesiumContainer', {
        fullscreenElement: 'previewContent'
    });

    var scene = viewer.scene;

    var globe = scene.globe;
    globe.depthTestAgainstTerrain = true;
    viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
        url : '//assets.agi.com/stk-terrain/world'
    });

    function relevantSource() {
        function eventHandler(event) {
            var text = 'Pin point location:\n';

            function addToMessage(append1, append2) {
                text += append1 + ': ' + append2 + '\n';
            }

            //drawing a point with the location caption
            function addPinPoint(longitudeDeg, latitudeDeg){
                var pinPointLocationCaption = 'Long '+ longitudeDeg.toString() + ' Lat ' + latitudeDeg.toString();
                viewer.entities.add({
                    position : Cesium.Cartesian3.fromDegrees(longitudeDeg, latitudeDeg),
                    point : {
                        pixelSize : 5,
                        color : Cesium.Color.RED,
                        outlineColor : Cesium.Color.WHITE,
                        outlineWidth : 2
                    },
                    label : {
                        text: pinPointLocationCaption,
                        font : '8pt monospace',
                        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                        outlineWidth : 2,
                        horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
                        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                        pixelOffset : new Cesium.Cartesian2(0, -9)
                    }
                });
            }

            addToMessage('screenX', event.position.x);
            addToMessage('screenY', event.position.y);

            var position = viewer.camera.pickEllipsoid(event.position);
            var onTheGlobe = Cesium.defined(position);
            addToMessage('onTheGlobe', onTheGlobe);

            if (onTheGlobe) {
                //Location is on the globe
                var cartographicPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
                var longitudeDeg = Cesium.Math.toDegrees(cartographicPosition.longitude);
                var latitudeDeg = Cesium.Math.toDegrees(cartographicPosition.latitude);

                addToMessage('longitude', longitudeDeg);
                addToMessage('latitude', latitudeDeg);

                Cesium.sampleTerrain(viewer.terrainProvider, 9, [cartographicPosition]).then(function() {
                    addToMessage('height', cartographicPosition.height);
                }).always(function() {
                    //unconnent a next line to show a window with pin point location on the globe
                    //  alert(text);

                    //putting a Pin on the globe
                    addPinPoint(longitudeDeg, latitudeDeg);
                });
            } else {
                //Location is off the globe
                //showing a window with location details
                alert(text);
            }
        }
        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        handler.setInputAction(eventHandler, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    relevantSource();
    showSource('cesiumSource', relevantSource);
};