'use strict';

var app = angular.module('xxxModuleUtilsDrag');

app.directive('utilsDrag', function ( ) {
	return {
		restrict: 'A',
		scope:
        {
            dragCallback: '&utilsDrag'
        },
		replace: true,

		controller: [ '$scope', '$rootScope', function ( $scope )
        {
            window.ud = $scope;

            $scope.dragElement = U;
            $scope.dragStartPosition = U;

            $scope.returnCallback = function ()
            {
                $scope.dragElement.css( $scope.dragStartPosition );
            }

        }],

		link: function ( scope, element )
		{
            var cursorTop = $(element).height() / 2;
            var cursorLeft = $(element).width() / 2;

            function getCursorPosition ( elementPos )
            {
                elementPos.top += cursorTop;
                elementPos.left += cursorLeft;

                return elementPos;
            }

            $(element).draggable(
                {
                    cursorAt:
                    {
                        top: cursorTop,
                        left: cursorLeft
                    },

                    start: function ( event, ui )
                    {
                        scope.dragElement = $(this);
                        scope.dragElement.css('pointer-events', 'none');

                        var startDragging = scope.dragCallback(
                            {
                                eventType: 'dragStart',
                                pos: getCursorPosition( ui.offset ),
                                returnCallback: scope.returnCallback
                            });

                        scope.dragStartPosition = ui.position;

                    },

                    drag: function( event, ui )
                    {
                        var drag = scope.dragCallback(
                            {
                                eventType: 'drag',
                                pos: getCursorPosition( ui.offset ),
                                returnCallback: scope.returnCallback
                            });

                        if ( drag )
                            return false;
                    },

                    stop: function ( event, ui )
                    {
                        var stopDragging = scope.dragCallback(
                            {
                                eventType: 'dragStop',
                                pos: getCursorPosition( ui.offset ),
                                returnCallback: scope.returnCallback
                            });

                        scope.dragElement.css('pointer-events', 'all');
                    }
                });
		}
	};
});