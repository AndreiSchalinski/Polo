$(document).ready(function () {
    $('.owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        autoplay: true,
        autoplayTimeout: 4000,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:2
            },
            1000:{
                items:3
            }
        },
        
    })
})