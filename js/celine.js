$(document).ready(function() {
    slider(".bestCarousel","horizontal",500,1,5,false,'auto',20,false,true,1,'full',true);
    slider(".listCarousel","horizontal",500,1,3,false,400,15,false,true,1,'full',true);
    slider(".detailSlider","horizontal",500,1,1,true,767,0,false,true,1,'short',true);
    slider(".recommendedCarousel","horizontal",500,1,3,false,400,15,false,true,1,'full',true);
    $(".videoBox").fitVids();

    setMobileToggleButtonText();
    updateAsideTopPosition();
    panelControl();
    sizeControl();
    onlyNumber();
    orderProduct();
    imgHover();
    headerEvent();
    passwordCheck();
    inputCheck();
    loginInputCheck();
    setupMobileMenu();
    initializeAccordionState();

    $('.detailAC li h3').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $(this).next('p').toggleClass('active');
    });

    $('.headAC li b').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('open');
        $(this).next('ul').toggleClass('active');
    });
    $('#footerMobileMenuToggle').click(function(){
        $('.shoppingAside').slideToggle();
        $(this).toggleClass('open');
    });
    
    $(document).on("input", "#numberPhone", function (){
        let nums = $(this).val().replace(/[^0-9]/g, "").split("");
        if (nums.length > 3) nums.splice(3, 0, "-");
        if (nums.length > 8) nums.splice(8, 0, "-");
        $(this).val(nums.join(""));
    });

    $(document).on("input", "#cardNumber", function(){
        $(this).val($(this).val().replace(/\D/g, "").replace(/(.{4})/g, "$1-").replace(/-$/, ""));
    });

    $(document).on("keyup", "#cardDate", function(){
        $(this).val($(this).val().replace(/[^0-9]/g, "").replace(/(\d{2})(\d{0,2})/, "$1/$2"));
    });

function initializeAccordionState() {
    var currentPath = window.location.pathname.split('/').pop();

    var $accountAccordionToggle = $('.detailAC2 li:first-child .accordion-toggle');
    var $accountSubMenuLinks = $('.detailAC2 li:first-child .lTs16 a');

    var shouldAccountAccordionBeOpen = false;
    var shouldMainMenuBeOpen = false;

    $accountSubMenuLinks.each(function() {
        if ($(this).attr('href').split('/').pop() === currentPath) {
            shouldAccountAccordionBeOpen = true;
            shouldMainMenuBeOpen = true;
            return false;
        }
    });

    if (currentPath.startsWith('address')) {
        shouldAccountAccordionBeOpen = true;
        shouldMainMenuBeOpen = true;
    }

    if (currentPath === 'service.html' || currentPath === 'support.html') {
        shouldAccountAccordionBeOpen = true; 
    }

    if (shouldAccountAccordionBeOpen) {
        if (!$accountAccordionToggle.hasClass('open')) {
            $accountAccordionToggle.addClass('open');
            $accountAccordionToggle.next('.lTs16').show();
        }
    } else {
        if ($accountAccordionToggle.hasClass('open')) {
            $accountAccordionToggle.removeClass('open');
            $accountAccordionToggle.next('.lTs16').hide();
        }
    }

    $('.detailAC2 > li > a').each(function() {
        var topLevelHref = $(this).attr('href').split('/').pop();
        if (currentPath === topLevelHref) {
            shouldMainMenuBeOpen = true;
        }
        if (currentPath === topLevelHref) {
            $(this).addClass('bL');
        } else {
            $(this).removeClass('bL');
        }
    });
    
    if (shouldMainMenuBeOpen && $(window).width() < 768) {
        $('.account-menu-aside').show();
        $('#mobileMenuToggle').addClass('open');
    } else if ($(window).width() < 768) {
        $('.account-menu-aside').hide();
        $('#mobileMenuToggle').removeClass('open');
    }
}

    function setMobileToggleButtonText() {
        var pageTitle = $('h2.bLs22').text().trim();
        if (pageTitle) {
            $('#mobileMenuToggle').text(pageTitle);
        } else {
            $('#mobileMenuToggle').text('메뉴 선택');
        }
    }

    function updateAsideTopPosition() {
        var $toggleButton = $('#mobileMenuToggle');
        if ($toggleButton.length) {
            var buttonBottomPosition = $toggleButton.offset().top + $toggleButton.outerHeight(true);
            $('.account-menu-aside').css('top', buttonBottomPosition + 'px');
        }
    }

    $('#mobileMenuToggle').click(function(){
        $('.account-menu-aside').slideToggle();
        $(this).toggleClass('open');
    });

    $('.detailAC2 .accordion-toggle').click(function(){
        var target = $(this).next();
        $(this).toggleClass('open');
        target.slideToggle();
    });

    $(window).resize(function() {
        if ($(window).width() >= 768) {
            $('.account-menu-aside').show();
            $('#mobileMenuToggle').hide();
            $('#mobileMenuToggle').removeClass('open');
        } else {
            $('.account-menu-aside').hide();
            $('#mobileMenuToggle').show();
            $('#mobileMenuToggle').removeClass('open');
        }
        setMobileToggleButtonText();
        updateAsideTopPosition();
    }).resize();

    function slider(target, modeStyle, speedValue, minSlide, maxSlide, pagerbutton, swidth, smargin, autoStyle, loop, moveProduct, pagerTVal, responValue) {
        $(target).bxSlider({
            mode: modeStyle,
            speed: speedValue,
            hideControlOnEnd: false,
            minSlides: minSlide,
            maxSlides: maxSlide,
            pager: pagerbutton,
            slideWidth: swidth,
            slideMargin: smargin,
            auto: autoStyle,
            infiniteLoop: loop,
            moveSlides: moveProduct,
            pagerType: pagerTVal,
            responsive: responValue
        });
    }

    function panelControl(){
        var panelId = null;

        $('*[data-panel]').click(function(){
            var panelName = $(this).attr('data-panel');
            panelId = '#' + panelName + 'Panel';

            $(panelId).addClass('active');

            if (panelName === 'return'){
                $(this).addClass('hidden-btn').hide();
            }
        });

        $('input.material-symbols-outlined.btn_close, input[value="CLOSE"]').click(function(){
            if (panelId){
                $(panelId).removeClass('active');
                if ($(this).val() === "CLOSE" || $(this).hasClass('material-symbols-outlined btn_close')){
                    $('input[value="Return request"]').show();
                    $('.hidden-btn').show().removeClass('hidden-btn');
                }
            }
        });

        $('input[value="Return request"]').click(function(){
            panelId = '#returnPanel';
            $(panelId).addClass('active');
            $(this).addClass('hidden-btn').hide();
        });

        $('input[value="REQUEST"]').click(function(){
            $('#returnPanel').removeClass('active');
            $('#returnPanel').prevAll('li').first().find('input[value="Return request"]').hide();
            $('mark:contains("Shipped")').text("Return in progress");
        });
    }

    function sizeControl(){
        $('.size-buttons input[type="button"]').click(function() {
            $('.size-buttons input[type="button"]').removeClass('active');
            $(this).addClass('active');
        });
    }

    function setupMobileMenu() {
        const $mobileMenuButton = $('header > div nav button.mui');
        const $mainNav = $('header > div nav');

        $mobileMenuButton.on('click', function() {
            $(this).toggleClass('active');
            $mainNav.toggleClass('active');
            if (!$mainNav.hasClass('active')) {
                $submenuTriggers.closest('li').removeClass('active');
            }
        });
    }

    function headerEvent(){
        var currentPos = 0;
        $(window).scroll(function(){
            $("header").addClass("active");
            currentPos = $(this).scrollTop();
            if(currentPos <= 0){
                $("header").removeClass("active");
            }
        });
    }

    function imgHover(){
        $(".lookbookContents img").each(function(){
            let imgSrc = $(this).attr("src");
            let hoverSrc = imgSrc.replace(".png", "_hover.png");

            $(this).hover(
                function(){
                    $(this).attr("src", hoverSrc);
                },
                function(){
                    $(this).attr("src", imgSrc);
                }
            );
        });
    }

    function orderProduct(){
        let unitPrice = 3600;
        let input = $("input[name='numberCount']");
        let totalPrice = $("#totalPrice");

        function updateTotal(){
            let quantity = parseInt(input.val());
            totalPrice.text(quantity * unitPrice);
        }

        $(".plusBtn").on("click", function(){
            input.val(+input.val() + 1);
            updateTotal();
        });

        $(".minusBtn").on("click", function(){
            input.val(Math.max(1, input.val() - 1));
            updateTotal();
        });

        updateTotal();
    }

    function onlyNumber(){
        $('.onlyNumber').on('input', function(){
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    function inputCheck(){
        $('input').on('input focus', function(){
            var value = $(this).val().trim();

            if ($(this).prop('readonly')) return;

            if (value === ''){
                $(this).removeClass('valid').addClass('invalid');
            } else {
                $(this).removeClass('invalid').addClass('valid');
            }
        });
    }

    function loginInputCheck(){
        $('.loginContents input').on('input', function(){
            var value = $(this).val().trim();
            var small = $(this).siblings('small');

            if (value !== '') {
                small.hide();
            } else {
                small.show();
            }
        });
    }

    function passwordCheck(){
        $('#pw1, #pw2').on('keyup', function(){
            var pw1 = $('#pw1').val();
            var pw2 = $('#pw2').val();
            var msg = $('#checkPw');

            if (!pw1 && !pw2) {
                msg.text('').css('color', '');
            } else if (pw1 !== pw2) {
                msg.text('The password does not match').css('color', 'var(--wine01)');
            } else {
                msg.text('Password matches').css('color', '#bbbbbb');
            }
        });

        $('#passForm').on('submit', function(e){
            var pw1 = $('#pw1').val();
            var pw2 = $('#pw2').val();
            var msg = $('#checkPw');

            if (pw1 !== pw2 || !pw1 || !pw2) {
                e.preventDefault();
                msg.text('Please enter your password correctly').css('color', 'var(--wine01)');
            }
        });
    }
});