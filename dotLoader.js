/*
          ___           ___       ____                                 ___
         |   |         |   |     |    |                               |   |
         |   |      ___|   |____ |    |                               |   |
         |   |     |____    ____||    |                               |   |   ____     __  __ (_)   
     ____|   |  _____  |   |     |    |         _____    ______   ____|   | /      \  |  |/ /  __  ______
    /  ___   | /  _  \ |   |     |    |______  /  _  \  /  _ | | /  ___   ||   (_) |  |  / /  |  |/  ___| 
   |  (___)  ||  (_)  ||   |     |           ||  (_)  ||  (_)| ||  (___)  ||   –––/__ |  |    |  |\__   \
    \________| \_____/ |___|     |___________| \_____/  \____|_| \________| \________||__|(_) |  | ___\  \
                                                                                          _   /  /|______/
                                                                                        / /__/  /
                                                                                       /______ /  
    Version: 1.0.0
    Author: Daniel Torres
    Repo: https://github.com/Danny908/dotLoader.js
    Issues: https://github.com/Danny908/dotLoader.js/issues
*/
(function( $ ) {
    $.fn.dot = function(options, action){
        var _settings = $.extend({
            dotNum: 5,
            dotColor: 'white',
            dotOpacity: 1,
            dotSize: 10,
            backColor: 'black',
            backOpacity: 0.6,
            speed: 300,
            style: 'circle',
            animation: 'fade',
        }, options);

        var _dot = '';
        var _template;
        var _style;

        for(var a = 0; a < _settings.dotNum; a++) {
            _dot += `<div class='dot'></div>`; 
        }

        _template =
        `
        <div class='loader-container'>
            <div class='loader'>
                ${_dot}
            </div>
        </div>
        `;
        _style = (_settings.style === 'circle' ? '50%' : '0%');
        
        $(this).append(_template);

        $('.loader-container').css({
            'background': _settings.backColor,
            'opacity':          _settings.backOpacity
        });

        $('.dot').css({
            'width':                    `${_settings.dotSize}px`,
            'height':                   `${_settings.dotSize}px`,
            'background':               _settings.dotColor,
            'opacity':                  _settings.dotOpacity,
            'border-radius':            _style
        });

        setInterval(function(){
            var selector = $('.loader').children().eq(counter);
            switch(_settings.animation){
                case 'none':
                    break;
                case 'fade':
                    selector.fadeOut(300).fadeIn(300);
                    break;
                case 'jump':
                    selector.animate({marginBottom: `${_settings.dotSize*1.5}px`}, 300).animate({marginBottom: '0px'}, 300);
                    break;
                case 'zoom':
                    selector.animate({width: `${_settings.dotSize*1.5}px`,height: `${_settings.dotSize*1.5}px`}, 300);
                    selector.animate({width: `${_settings.dotSize}px`,height: `${_settings.dotSize}px`}, 300);
                    break;
                case 'rotate':
                    $('.dot').css({'transform': `rotate(${counter * 45}deg`});
                    break;
            }
            counter = (counter === _settings.dotNum-1 ? 0 : counter+= 1);
        }, _settings.speed, counter = 0);

        if(action === 'close')
            $('.loader-container').remove(); 
    };
}( jQuery ));