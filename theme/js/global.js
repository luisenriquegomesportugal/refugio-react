export const DezSettings = (containerLayout) => {
    let html = $('html');
    let body = $('body');

    body.attr("data-theme-version", "light");
    body.attr("data-typography", "roboto");
    body.attr("data-layout", "vertical");
    body.attr("data-nav-headerbg", "color_1");
    body.attr("data-headerbg", "color_1");
    body.attr("data-sidebar-style", "full");
    body.attr("data-sibebarbg", "color_1");
    body.attr("data-sidebar-position", "fixed");
    body.attr("data-header-position", "fixed");

    switch (containerLayout) {
        case "boxed":
            body.attr("data-sidebar-style", "overlay");
            body.attr("data-container", "boxed");
            break;
        case "wide-boxed":
            body.attr("data-container", "wide-boxed");
            break;
        default:
            body.attr("data-container", "wide");
    }

    let direction = "ltr";
    html.attr("dir", direction);
    html.addClass(direction);
    body.attr("direction", direction);

    const innerWidth = $(window).innerWidth();
    if (innerWidth < 1024) {
        body.attr("data-layout", "vertical");
        body.attr("data-container", "wide");
    }

    if (innerWidth > 767 && innerWidth < 1024) {
        body.attr("data-sidebar-style", "overlay");
    }

    if (innerWidth < 768) {
        body.attr("data-sidebar-style", "overlay");
    }

    body.attr("data-primary", "color_1");
};