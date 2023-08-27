<script lang="ts">
    import Constants from '$lib/constants';
    import { goto } from '$app/navigation';

    function goContact() {
        setTimeout(() => {
            goto(`/contact/`);
        }, Constants.delay);
    }

</script>

<main>
    <a href="/"><div class="title">newton creations</div></a>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <div class="container">
        <a on:click={goContact} class="button contact">
          <div class="button__line"></div>
          <div class="button__line"></div>
          <span class="button__text">me contacter</span>
          <div class="button__drow1"></div>
          <div class="button__drow2"></div>
        </a>      
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <a on:click={goContact}><div class="contactmobile">me contacter</div></a>

<slot></slot>

<!--
<div class="copyright" style="opacity: {displayFooter ? 1 : 0}; transition: opacity 0.5s ease;">
Made from scratch by ‎ <a class="link" href="https://github.com/newtondotcom/droning-portfolio">@Newton</a>
</div>
-->

</main>

<style>

main {
    background-color: black;
    font-family: Alfa Slab One;
    cursor : grab;
}
  
.title {
    font-size: 3rem;
    color: white;
    position: absolute;
    top: 0;
    left: 10px;
    z-index: 89;
}

.contactmobile {
    display: none;
}



.container{
    width : 250px ;
    height : 60px ;
    position: absolute;
    display : flex ;
    top : 10px;
    right: 0;
}

@media (max-width: 768px) {

    .contactmobile {
        display: block;
        font-size: 1.5rem;
        color: white;
        position: fixed;
        bottom : 10px;
        right : 10px;
        border : 2px dashed white;
        border-radius: 20px;
        padding : 7px;
        z-index: 2;
        background-color: black;
    }

    .contact {
        display: none;
    }

    .title {
        font-size: 4rem;
        flex-wrap: nowrap;
        color: white;
        position: absolute;
        top: 0;
        left: 10px;
    }
} 

@media (max-height: 500px) {
    
    .contactmobile {
        display: block;
        font-size: 2rem;
        color: white;
        position: fixed;
        bottom : 10px;
        right : 10px;
        border : 2px dashed white;
        border-radius: 20px;
        padding : 7px;
        z-index: 2;
        background-color: black;
    }
}


/* button from https://codepen.io/ash_creator/pen/oNyNbNO */
 :root{
    /* custom color; */
    --line_color : white ;
    --back_color : blue  ;

}

.button{
    position : relative ;
    z-index : 0 ;
    width : 240px ;
    height : 56px ;
    text-decoration : none ;
    font-size : 18px ; 
    font-weight : bold ;
    color : var(--line_color) ;
    letter-spacing : 2px ;
    transition : all .3s ease ;
}
.button__text{
    display : flex ;
    justify-content : center ;
    align-items : center ;
    width : 100% ;
    height : 100% ;
}
.button::before,
.button::after,
.button__text::before,
.button__text::after{
    content : '' ;
    position : absolute ;
    height : 3px ;
    border-radius : 2px ;
    background : var(--line_color) ;
    transition : all .5s ease ;
}
.button::before{
    top : 0 ;
    left : 54px ;
    width : calc( 100% - 56px * 2 - 16px ) ;
}
.button::after{
    top : 0 ;
    right : 54px ;
    width : 8px ;
}
.button__text::before{
    bottom : 0 ;
    right : 54px ;
    width : calc( 100% - 56px * 2 - 16px ) ;
}
.button__text::after{
    bottom : 0 ;
    left : 54px ;
    width : 8px ;
}
.button__line{
    position : absolute ;
    top : 0 ;
    width : 56px ;
    height : 100% ;
    overflow : hidden ;
}
.button__line::before{
    content : '' ;
    position : absolute ;
    top : 0 ;
    width : 150% ;
    height : 100% ;
    box-sizing : border-box ;
    border-radius : 300px ;
    border : solid 3px var(--line_color) ;
}
.button__line:nth-child(1),
.button__line:nth-child(1)::before{
    left : 0 ;
}
.button__line:nth-child(2),
.button__line:nth-child(2)::before{
    right : 0 ;
}
.button:hover{
    letter-spacing : 6px ;
}
.button:hover::before,
.button:hover .button__text::before{
    width : 8px ;
}
.button:hover::after,
.button:hover .button__text::after{
    width : calc( 100% - 56px * 2 - 16px ) ;
}
.button__drow1,
.button__drow2{
    position : absolute ;
    z-index : -1 ;
    border-radius : 16px ;
    transform-origin : 16px 16px ;
}
.button__drow1{
    top : -16px ;
    left : 40px ;
    width : 32px ;
    height : 0;
    transform : rotate( 30deg ) ;
}
.button__drow2{
    top : 44px ;
    left : 77px ;
    width : 32px ;
    height : 0 ;
    transform : rotate(-127deg ) ;
}
.button__drow1::before,
.button__drow1::after,
.button__drow2::before,
.button__drow2::after{
    content : '' ;
    position : absolute ;
}
.button__drow1::before{
    bottom : 0 ;
    left : 0 ;
    width : 0 ;
    height : 32px ;
    border-radius : 16px ;
    transform-origin : 16px 16px ;
    transform : rotate( -60deg ) ;
}
.button__drow1::after{
    top : -10px ;
    left : 45px ;
    width : 0 ;
    height : 32px ;
    border-radius : 16px ;
    transform-origin : 16px 16px ;
    transform : rotate( 69deg ) ;
}
.button__drow2::before{
    bottom : 0 ;
    left : 0 ;
    width : 0 ;
    height : 32px ;
    border-radius : 16px ;
    transform-origin : 16px 16px ;
    transform : rotate( -146deg ) ;
}
.button__drow2::after{
    bottom : 26px ;
    left : -40px ;
    width : 0 ;
    height : 32px ;
    border-radius : 16px ;
    transform-origin : 16px 16px ;
    transform : rotate( -262deg ) ;
}
.button__drow1,
.button__drow1::before,
.button__drow1::after,
.button__drow2,
.button__drow2::before,
.button__drow2::after{
    background : var( --back_color ) ;
}
.button:hover .button__drow1{
    animation : drow1 ease-in .06s ;
    animation-fill-mode : forwards ;
}
.button:hover .button__drow1::before{
    animation : drow2 linear .08s .06s ;
    animation-fill-mode : forwards ;
}
.button:hover .button__drow1::after{
    animation : drow3 linear .03s .14s ;
    animation-fill-mode : forwards ;
}
.button:hover .button__drow2{
    animation : drow4 linear .06s .2s ;
    animation-fill-mode : forwards ;
}
.button:hover .button__drow2::before{
    animation : drow3 linear .03s .26s ;
    animation-fill-mode : forwards ;
}
.button:hover .button__drow2::after{
    animation : drow5 linear .06s .32s ;
    animation-fill-mode : forwards ;
}
@keyframes drow1{
    0%   { height : 0 ; }
    100% { height : 100px ; }
}
@keyframes drow2{
    0%   { width : 0 ; opacity : 0 ;}
    10%  { opacity : 0 ;}
    11%  { opacity : 1 ;}
    100% { width : 120px ; }
}
@keyframes drow3{
    0%   { width : 0 ; }
    100% { width : 80px ; }
}
@keyframes drow4{
    0%   { height : 0 ; }
    100% { height : 120px ; }
}
@keyframes drow5{
    0%   { width : 0 ; }
    100% { width : 124px ; }
}

</style>