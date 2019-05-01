<template>
    <div class="container loader">
      <div class="coffee_cup"></div>
    </div>
</template>

<script>
export default {

};
</script>

<style lang="scss">
/*coffee cup*/
.coffee_cup{
    width: 20px;
    height: 24px;
    border: 2px #FF3E8F solid;
    border-radius: 0px 0px 5px 5px;
    position: relative;
    margin: 36px auto;
    transform: scale(2);
}
.coffee_cup:after, .coffee_cup:before{
    position: absolute;
    content: "";
}
.coffee_cup:after{
    width: 5px;
    height: 12px;
    border: 2px #FF3E8F solid;
    border-left: none;
    border-radius: 0px 20px 20px 0px;
    left: 18px;
}
.coffee_cup:before{
    width: 2px;
    height: 6px;
    background-color: #FF3E8F;
    top: -10px;
    left: 2px;
    box-shadow: 5px 0px 0px 0px #FF3E8F,
                5px -5px 0px 0px #FF3E8F,
                10px 0px 0px 0px #FF3E8F;
    -webkit-animation: steam 1s ease infinite alternate;
       -moz-animation: steam 1s ease infinite alternate;
            animation: steam 1s ease infinite alternate;
}

@-webkit-keyframes steam{
    0%{height: 0px;}
    100%{height: 6px;}            
}
@-moz-keyframes steam{
    0%{height: 0px}
    100%{height: 6px;}            
}
@keyframes steam{
    0%{height: 0px}
    100%{height: 6px;}            
}


</style>
