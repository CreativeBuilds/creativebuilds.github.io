$(function(){
    $('#gen').submit(function(e){
        e.preventDefault();

        let num1 = $('#num1').val();
        let num2 = $('#num2').val();

        if(!num1 || !num2){
            alert('Please put in a Minimum and a Maximum!');
            return;
        }

        function randomIntFromInterval(min,max)
        {
            return Math.floor(Math.random()*(max-min+1)+min);
        }
        let gen = randomIntFromInterval(num1, num2) + 1;
        $('#display').text(gen)
    })
})