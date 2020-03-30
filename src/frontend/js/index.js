const nav = $('#main-nav');
const classes = 'nav-active m-shd-l2 primary'

$(window).on('scroll', (event) => {
    //console.log(window.scrollY);
    if(window.scrollY > 0)
        nav.addClass(classes);
    else
        nav.removeClass(classes);
})

