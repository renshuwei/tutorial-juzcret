(function ($) {

  $(document).ready(function () {

        //Var to know the number of image in the line
        var counterImg = 0;
        //Var to know the place taken by previous image in the line
        var totalWidthLine = 0;

        function getRangeRandom(min, max) {
            return Math.ceil(Math.random() * (max - min) + min);
        }

        function randSecretBoxWidth() {
            var randBoxNum = getRangeRandom(23, 43);
            //Test if we are on th third image of the line
            if (counterImg >= 2) {
                //The third image of the line fill all the remaining place
                randBoxNum = 100 - totalWidthLine;
                //counter place taken by previous image in the line set to 0
                counterImg = 0;
                totalWidthLine = 0;
            }
            else {
                //Increase counter and the place taken by previous image in the line
                counterImg++;
                totalWidthLine += randBoxNum;
            }
            //Return the width of the secret box
            return randBoxNum;
        }

        //Get all secrets boxes
        $('.secret').each(function(idx, listItem) {
          //Set a random width
          listItem.style.width = randSecretBoxWidth() + "%";          
        });
    });

})($);