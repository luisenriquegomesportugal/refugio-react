"use strict";

import PerfectScrollbar from "perfect-scrollbar";
import 'metismenu';

export const ZenixJS = (() => {
    const screenWidth = $(window).width();

    const hideLoading = function () {
        $('#preloader').fadeOut(500);
        $('#main-wrapper').addClass('show');
    }

    const handleMetisMenu = function () {
        if (jQuery('#menu').length > 0) {
            $("#menu").metisMenu();
        }
        jQuery('.metismenu > .mm-active ').each(function () {
            if (!jQuery(this).children('ul').length > 0) {
                jQuery(this).addClass('active-no-child');
            }
        });
    }

    const handleNavigation = function () {
        $(".nav-control").on('click', function () {

            $('#main-wrapper').toggleClass("menu-toggle");

            $(".hamburger").toggleClass("is-active");
        });
    }

    const handleCurrentActive = function () {
        $("ul#menu .mm-active, ul#menu .mm-show")
            .removeClass('mm-active');

        let links = $("ul#menu a");
        links.each(function () {
            if (window.location.href.startsWith(this.href)) {
                let linkParent = $(this).addClass("mm-active")
                    .parent()
                    .addClass("mm-active");

                if (linkParent.is("li")) {
                    linkParent.parent()
                        .addClass("mm-show")
                        .parent()
                        .addClass("mm-active");
                }

            }
        });
    }

    const handleDzScroll = function () {
        jQuery('.dz-scroll').each(function () {
            const scroolWidgetId = jQuery(this).attr('id');
            const ps = new PerfectScrollbar('#' + scroolWidgetId, {
                wheelSpeed: 2,
                wheelPropagation: true,
                minScrollbarLength: 20
            });
            ps.isRtl = false;
        })
    }

    const handleSelectPicker = function () {
        if (jQuery('.default-select').length > 0) {
            jQuery('.default-select').selectpicker();
        }
    }

    const handleCkEditor = function () {
        if (jQuery("#ckeditor").length > 0) {
            ClassicEditor
                .create(document.querySelector('#ckeditor'), {
                    // toolbar: [ 'heading', '|', 'bold', 'italic', 'link' ]
                })
                .then(editor => {
                    window.editor = editor;
                })
                .catch(err => {
                    console.error(err.stack);
                });
        }
    }

    const handleAllChecked = function () {
        $("#checkAll").on('change', function () {
            $("td input:checkbox, .email-list .custom-checkbox input:checkbox").prop('checked', $(this).prop("checked"));
        });
    }

    const handleMiniSidebar = function () {
        $("ul#menu>li").on('click', function () {
            const sidebarStyle = $('body').attr('data-sidebar-style');
            if (sidebarStyle === 'mini') {
                console.log($(this).find('ul'))
                $(this).find('ul').stop()
            }
        })
    }

    const handleDataAction = function () {
        $('a[data-action="collapse"]').on("click", function (i) {
            i.preventDefault(),
                $(this).closest(".card").find('[data-action="collapse"] i').toggleClass("mdi-arrow-down mdi-arrow-up"),
                $(this).closest(".card").children(".card-body").collapse("toggle");
        });

        $('a[data-action="expand"]').on("click", function (i) {
            i.preventDefault(),
                $(this).closest(".card").find('[data-action="expand"] i').toggleClass("icon-size-actual icon-size-fullscreen"),
                $(this).closest(".card").toggleClass("card-fullscreen");
        });


        $('[data-action="close"]').on("click", function () {
            $(this).closest(".card").removeClass().slideUp("fast");
        });

        $('[data-action="reload"]').on("click", function () {
            const e = $(this);
            e.parents(".card").addClass("card-load"),
                e.parents(".card").append('<div class="card-loader"><i class=" ti-reload rotate-refresh"></div>'),
                setTimeout(function () {
                    e.parents(".card").children(".card-loader").remove(),
                        e.parents(".card").removeClass("card-load")
                }, 2000)
        });
    }

    const handleMenuTabs = function () {
        if (screenWidth <= 991) {
            jQuery('.menu-tabs .nav-link').on('click', function () {
                if (jQuery(this).hasClass('open')) {
                    jQuery(this).removeClass('open');
                    jQuery('.fixed-content-box').removeClass('active');
                    jQuery('.hamburger').show();
                } else {
                    jQuery('.menu-tabs .nav-link').removeClass('open');
                    jQuery(this).addClass('open');
                    jQuery('.fixed-content-box').addClass('active');
                    jQuery('.hamburger').hide();
                }
            });

            jQuery('.close-fixed-content').on('click', function () {
                jQuery('.fixed-content-box').removeClass('active');
                jQuery('.hamburger').removeClass('is-active');
                jQuery('#main-wrapper').removeClass('menu-toggle');
                jQuery('.hamburger').show();
            });
        }
    }

    const handleChatbox = function () {
        jQuery('.bell-link').on('click', function () {
            jQuery('.chatbox').addClass('active');
        });
        jQuery('.chatbox-close').on('click', function () {
            jQuery('.chatbox').removeClass('active');
        });
    }

    const handlePerfectScrollbar = function () {
        if (jQuery('.deznav-scroll').length > 0) {
            const qs = new PerfectScrollbar('.deznav-scroll');
            qs.isRtl = false;
        }
    }

    const vHeight = function () {
        const ch = $(window).height() - 206;
        $(".chatbox .msg_card_body").css('height', ch);
    }

    const handleMenuPosition = function () {
        if (screenWidth > 1024) {
            $(".metismenu  li").unbind().each(function (e) {
                if ($('ul', this).length > 0) {
                    let elm = $('ul:first', this);

                    const off = elm.offset();
                    const l = off.left;

                    if (l <= 0) {
                        $(this).find('ul:first').addClass('left');
                    } else {
                        $(this).find('ul:first').removeClass('left');
                    }
                }
            });
        }
    }

    const handleBtnNumber = function () {
        $('.btn-number').on('click', function (e) {
            e.preventDefault();

            const fieldName = $(this).attr('data-field');
            const type = $(this).attr('data-type');
            const input = $("input[name='" + fieldName + "']");
            const currentVal = parseInt(input.val(), 10);
            if (!isNaN(currentVal)) {
                if (type == 'minus')
                    input.val(currentVal - 1);
                else if (type == 'plus')
                    input.val(currentVal + 1);
            } else {
                input.val(0);
            }
        });
    }

    const handleDzChatUser = function () {
        jQuery('.dz-chat-user-box .dz-chat-user').on('click', function () {
            jQuery('.dz-chat-user-box').addClass('d-none');
            jQuery('.dz-chat-history-box').removeClass('d-none');
        });

        jQuery('.dz-chat-history-back').on('click', function () {
            jQuery('.dz-chat-user-box').removeClass('d-none');
            jQuery('.dz-chat-history-box').addClass('d-none');
        });

        jQuery('.dz-fullscreen').on('click', function () {
            jQuery('.dz-fullscreen').toggleClass('active');
        });
    }


    const handleDzFullScreen = function () {
        jQuery('.dz-fullscreen').on('click', function (e) {
            if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
                /* Enter fullscreen */
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen(); /* IE/Edge */
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen(); /* Firefox */
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen(); /* Chrome, Safari & Opera */
                }
            } else { /* exit fullscreen */
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
            }
        });
    }

    const handleShowPass = function () {
        jQuery('.show-pass').on('click', function () {
            jQuery(this).toggleClass('active');
            if (jQuery('#dz-password').attr('type') == 'password') {
                jQuery('#dz-password').attr('type', 'text');
            } else if (jQuery('#dz-password').attr('type') == 'text') {
                jQuery('#dz-password').attr('type', 'password');
            }
        });
    }

    const heartBlast = function () {
        $(".heart").on("click", function () {
            $(this).toggleClass("heart-blast");
        });
    }

    const handleDzLoadMore = function () {
        $(".dz-load-more").on('click', function (e) {
            e.preventDefault();	//STOP default action
            $(this).append(' <i class="fa fa-refresh"></i>');

            const dzLoadMoreUrl = $(this).attr('rel');
            const dzLoadMoreId = $(this).attr('id');

            $.ajax({
                method: "POST",
                url: dzLoadMoreUrl,
                dataType: 'html',
                success: function (data) {
                    $("#" + dzLoadMoreId + "Content").append(data);
                    $('.dz-load-more i').remove();
                }
            })
        });
    }

    const handleSmartWizard = function () {
        if (jQuery('#smartwizard').length > 0) {
            $(document).ready(function () {
                // SmartWizard initialize
                $('#smartwizard').smartWizard();
            });
        }
    }
    const handleCustomFileInput = function () {
        $(".custom-file-input").on("change", function () {
            const fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
    }

    const handleChatSidebar = function () {
        $('.chat-hamburger').on('click', function () {
            $('.chat-left-sidebar').toggleClass('show');
        })
    }

    const handleImageSelect = function () {
        const $_SELECT_PICKER = $('.image-select');
        $_SELECT_PICKER.find('option').each((idx, elem) => {
            const $OPTION = $(elem);
            const IMAGE_URL = $OPTION.attr('data-thumbnail');
            if (IMAGE_URL) {
                $OPTION.attr('data-content', "<img src='%i'/> %s".replace(/%i/, IMAGE_URL).replace(/%s/, $OPTION.text()))
            }
        });

        $_SELECT_PICKER.selectpicker();
    }
    const handleThemeMode = function () {
        jQuery('.dz-theme-mode').on('click', function () {
            jQuery(this).toggleClass('active');

            if (jQuery(this).hasClass('active')) {
                jQuery('body').attr('data-theme-version', 'dark');
            } else {
                jQuery('body').attr('data-theme-version', 'light');
            }
        });
    }

    return {
        init: function () {
            hideLoading();
            handleMetisMenu();
            handleNavigation();
            handleDzScroll();
            handlePerfectScrollbar();
            handleMenuPosition();
        },
        load: function () {
            hideLoading();
        },
        resize: function () {
            vHeight();
        },
        handleMenuPosition: function () {
            handleMenuPosition();
        },
        handleCurrentActive: function () {
            handleCurrentActive();
        }
    }
})();