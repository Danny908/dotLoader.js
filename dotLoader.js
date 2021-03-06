/*
          ___           ___   ____                                 ___
         |   |         |   | |    |                               |   |
         |   |      ___|   |_|__  |                               |   |
         |   |     |____    ____| |                               |   |   ____     __  __ (_)   
     ____|   |  _____  |   | |    |         _____    ______   ____|   | /      \  |  |/ /  __  ______
    /  ___   | /  _  \ |   | |    |_____   /  _  \  /  _ | | /  ___   ||   (_) |  |  / /  |  |/  ___| 
   |  (___)  ||  (_)  ||   | |           ||  (_)  ||  (_)| ||  (___)  ||   –––/__ |  |    |  |\__   \
    \________| \_____/ |___| |___________| \_____/  \____|_| \________| \________||__|(_) |  | ___\  \
                                                                                      _   /  /|______/
    Version: 1.2.1                                                                  / /__/  /
    Author: Daniel Torres                                                          /______ /  
    Repo: https://github.com/Danny908/dotLoader.js
    Issues: https://github.com/Danny908/dotLoader.js/issues
*/
(function( $ ) {
    $.fn.dot = function( options ){
        var _settings = $.extend({
            dotNum:      5,
            dotColor:    'white',
            dotSize:     10,
            backColor:   'rgba(0, 0, 0, 0.5)',
            speed:       300,
            style:       'circle',
            animation:   'fade',
            border:      false,
            borderColor: 'transparent',
            borderSize:  0,
            borderStyle: 'solid'
        }, options);

        var _dot = '', _template, _style, _border, _colors, _borderColor;

        for(var a = 0; a < _settings.dotNum; a++) {
            _dot += `<div class='dot'></div>`; 
        }

        _borderColor = _settings.borderColor.split('|');
        _border = (_settings.border === false ? 'none' : `${_settings.borderSize}px ${_settings.borderStyle} ${_borderColor[0]} `);

        _template =
        `
        <div class='loader-container'>
            <div class='loader'>
                ${_dot}
            </div>
        </div>
        `;
        _style = (_settings.style === 'circle' ? '50%' : '0%');
        _colors = _settings.dotColor.split('|');
             
        if(this[0].nodeName != 'BODY')
            $(this).css('position', 'relative');
        
        $(this).append(_template);

        $('.loader-container').css({
            'background': _settings.backColor,
            'position': 'absolute'
        });

        $('.dot').css({
            'width':                    `${_settings.dotSize}px`,
            'height':                   `${_settings.dotSize}px`,
            'background':               _colors[0],
            'border-radius':            _style,
             'border':                  _border
        });
        setInterval(function(){
            var selector = $('.loader').children().eq(counter);
            _border = (_settings.border === false ? 'none' : `${_settings.borderSize}px ${_settings.borderStyle} ${_borderColor[flag]} `);

            selector.css({
                'background': _colors[flag],
                'border':   _border
                });
            switch(_settings.animation){
                case 'none':
                    break;
                case 'fade':
                    selector.fadeOut(300).fadeIn(300);
                    break;
                case 'jump':
                    selector.animate({marginBottom: `-${_settings.dotSize*1.5}px`}, 300).animate({marginBottom: '0px'}, 300);
                    break;
                case 'zoom':
                    selector.animate({width: `${_settings.dotSize*1.5}px`,height: `${_settings.dotSize*1.5}px`}, 300);
                    selector.animate({width: `${_settings.dotSize}px`,height: `${_settings.dotSize}px`}, 300);
                    break;
                case 'rotate':
                   $('.dot').css({'transform': `rotate(${counter * (360 / _settings.dotNum)}deg`});
                    break;
            }
            counter = (counter === _settings.dotNum ? 0 : counter+= 1);
            flag = (counter === _settings.dotNum ? flag+1 : flag);
            if(flag === _colors.length-1) {
                flag = 0;
            }
        }, _settings.speed, counter = 0, flag = 0);

        $(this).on('loaded', function(){
            $('.loader-container').fadeOut(200);
            setTimeout(function() {
                $('.loader-container').remove();
            },200);
            
        }); 
    };
}( jQuery ));