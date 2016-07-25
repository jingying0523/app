
// jQuery 插件扩展，写在闭包内

(function ($) {

    // 固定写法 $.fn.roll 需注意：roll 是插件名称
    $.fn.roll = function (interval) {

        // 调用 此 function 的对象，是一个 jQuery 对象
        // 所以 此处的 this 是 jQuery 类型的，可以进行 each 循环，每个循环，应该是 jQuery 对象的一个 Element


        this.each(function () {


            var $this = $(this),
                $roll_li_left = $this.find('.roll-head>ul>li[data-action="left"]'),
                $roll_li_right = $this.find('.roll-head>ul>li[data-action="right"]'),
                $roll_body = $this.find('.roll-body'),
                $roll_content = $this.find('.roll-content'),
                roll_index = 0,
                p_count = Math.ceil($roll_content.outerWidth() / $roll_body.outerWidth()),
                is_left = false,
                timer = null;

            $roll_li_left.click(function () {
                if (!$(this).hasClass('disabled')) {
                    roll_index++;
                    set_status();
                }
            });

            $roll_li_right.click(function () {
                if (!$(this).hasClass('disabled')) {
                    roll_index--;
                    set_status();
                }
            });

            function set_status() {

                $roll_content.css({
                    left: $roll_body.outerWidth() * roll_index
                });

                if (roll_index >= 0) {
                    $roll_li_left.addClass('disabled');
                    is_left = false;
                } else {
                    $roll_li_left.removeClass('disabled');
                }

                if (roll_index <= -p_count + 1) {
                    $roll_li_right.addClass('disabled');
                    is_left = true;
                } else {
                    $roll_li_right.removeClass('disabled');
                }
            }

            $this.hover(function () {
                clearInterval(timer);
            }, start_timer);

            function start_timer() {
                timer = setInterval(function () {
                    if (is_left) {
                        roll_index++;
                    } else {
                        roll_index--;
                    }
                    set_status();
                }, interval);
            }

            set_status();
            start_timer();
        })

    }

})(jQuery);
