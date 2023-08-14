<script lang="ts">
    import {delay} from '../lib/constants';
    import { goto } from '$app/navigation';

    function goContact() {
        setTimeout(() => {
            goto(`/contact/`);
        }, delay);
    }

</script>

<main>
    <a href="/"><div class="title">newton creations</div></a>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <div class="container">

        <a on:click={goContact} class="button">
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

<div class="footer" >
    <a href="https://github.com/newtondotcom/droning-portfolio">
        <svg aria-hidden="true" class="svg" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
    </a>
    <a href="https://www.instagram.com/newton.creations/">
        <svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="svg" viewBox="0 0 16 16"> <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" fill="white"></path> </svg>
    </a>
    <a href="https://www.linkedin.com/in/robin-augereau/">
        <svg style="color: white" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="svg" viewBox="0 0 16 16"> <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" fill="white"></path> </svg>
    </a>
</div>
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

.contact {
    font-size: 2rem;
    color: white;
    position: absolute;
    top: 10px;
    right: 10px;
    border : 2px dashed white;
    border-radius: 20px;
    padding : 7px;
}

.contactmobile {
    display: none;
}

.svg {
    fill : white;
    width: 2vw;
    height: auto;
    margin : 10px;
    margin-bottom: 30px;
}

.footer {
    position : absolute;
    top: 85%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
    width: 100vw;
    height: 50px;
    background-color: black;
    color: white;
    font-size: 2rem;
    font-family: 'VT323', monospace;
    font-weight: bold;
    opacity: 1;
}

.copyright {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 50px;
    background-color: black;
    color: white;
    font-size: 1rem;
    font-family: 'VT323', monospace;
    font-weight: bold;
}

.link {
    color: white;
    text-decoration: none;
}

@media (max-width: 768px) {
    .contact {
        display: none;
    }

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

    .svg {
        width: 10vw;
        margin : 10px;
    }

    .footer {    
        position : absolute;
        top: 120%;
        margin-top: 10px;
        align-self: center;
    }

    .title {
        font-size: 4rem;
        flex-wrap: nowrap;
        color: white;
        position: absolute;
        top: 0;
        left: 10px;
    }

    .copyright {
        font-size: 2em;
        flex-wrap: nowrap;
        color: white;
        position: absolute;
        bottom: 0;
        left: 10px;
    }
} 

@media (max-height: 500px) {
    .contact {
        display: none;
    }
    
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

.container{
    width : 20vw ;
    height : 300px ;
    position: absolute;
    display : flex ;
    top : 10px;
    left : 78vw;
}

</style>