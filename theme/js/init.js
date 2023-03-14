'use strict';

import {ZenixJS} from "~theme/js/zenix.js";
import {DezSettings} from "~theme/js/global.js";

export const InitJS = () => {
    jQuery(document).ready(function () {
        ZenixJS.init();
        DezSettings('full');
    });

    jQuery(window).on('load resize', function () {
        ZenixJS.load();
        DezSettings($('#container_layout').val());

        setTimeout(function () {
            ZenixJS.handleMenuPosition();
        }, 1000);
    });
}