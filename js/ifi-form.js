(function($){
    $('input[type="text"]').on({
        keyup: function() {
          formatCurrency($(this));
        },
        blur: function() { 
          formatCurrency($(this), "blur");
        }
    });
    
    
    function formatNumber(n) {
      // format number 1000000 to 1 000 000
      return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    }
    
    
    function formatCurrency(input, blur) {
      // appends $ to value, validates decimal side
      // and puts cursor back in right position.
      
      // get input value
      var input_val = input.val();
      
      // don't validate empty input
      if (input_val === "") { return; }
      
      // original length
      var original_len = input_val.length;
    
      // initial caret position 
      var caret_pos = input.prop("selectionStart");
        
      // check for decimal
      if (input_val.indexOf(".") >= 0) {
    
        // get position of first decimal
        // this prevents multiple decimals from
        // being entered
        var decimal_pos = input_val.indexOf(".");
    
        // split number by decimal point
        var left_side = input_val.substring(0, decimal_pos);
        var right_side = input_val.substring(decimal_pos);
    
        // add commas to left side of number
        left_side = formatNumber(left_side);
    
        // validate right side
        right_side = formatNumber(right_side);
        
        // On blur make sure 2 numbers after decimal
        if (blur === "blur") {
          right_side += "00";
        }
        
        // Limit decimal to only 2 digits
        right_side = right_side.substring(0, 2);
    
        // join number by .
        input_val = "" + left_side + "." + right_side;
    
      } else {
        // no decimal entered
        // add commas to number
        // remove all non-digits
        input_val = formatNumber(input_val);
        input_val = "" + input_val;
        
        // final formatting
        if (blur === "blur") {
          input_val += "";
        }
      }
      
      // send updated string to input
      input.val(input_val);
    
      // put caret back in the right position
      var updated_len = input_val.length;
      caret_pos = updated_len - original_len + caret_pos;
      input[0].setSelectionRange(caret_pos, caret_pos);
    }
    
    $('#price__partimoine').on('input', function(){
        calculer();
    });
    $('#price__ifi').on('input', function(){
        var montant = $(this).val().replace(/\s/g, '');
        montant = montant.replace(',', '.');
        //montant = Math.round(montant);

        calculerBymontant2018(montant);
    });
    $('#other__price').on('input', function(){
        calculatrice();
    });
})(jQuery);



var mon2018 = 0;

function calculer() {
    //var residence_principale = $('#residence_principale');
    var price__partimoine = $('#price__partimoine');
    //var Montant_dettes = $('#Montant_dettes');
    //var Total_patrimoine = $('#Total_patrimoine');
    var price__ifi = $('#price__ifi');
    var price__max = $('#price__max');
    var Montant_IFI = $('#other__price');
    var price__total = $('#price__total');


    console.log(price__partimoine.val());


    //alert(residence_principale.val())

    if (price__partimoine.val() != "") {
            
        var bienI = price__partimoine.val().replace(/\s/g, '');
            
        var Total = Math.round(bienI);
        
        //printNuminInput(Total, Total_patrimoine);
        var MontantDon;

        if (Total < 1300000) {
            MontantDon = Total * 0;
        } else if (Total < 1400000) {
            MontantDon = (500000 * 0.005) + (Total - 1300000) * 0.007 - (17500 - (0.0125 * Total));

        } else if (Total < 2570000) {
            MontantDon = (500000 * 0.005) + (Total - 1300000) * 0.007;

        } else if (Total < 5000000) {
            MontantDon = (500000 * 0.005) + (1270000 * 0.007) + (Total - 2570000) * 0.01;

        } else if (Total < 10000000) {

            MontantDon = (500000 * 0.005) + (1270000 * 0.007) + (2430000 * 0.01) + (Total - 5000000) * 0.0125;
        } else {
            MontantDon = (500000 * 0.005) + (1270000 * 0.007) + (2430000 * 0.01) + 5000000 * 0.0125 + (Total - 10000000) * 0.015;

        }

        mon2018 = MontantDon;
        //price__ifi.html(MontantDon.toFixed(2)+"ï¿½");


        MontantDon = Math.round(MontantDon);
        var montantMax = MontantDon / 0.75;
        var MontantDonInt = Math.round(MontantDon);


        printNuminInput(MontantDonInt, price__ifi);
        //printNuminInput(MontantDon, Montant_IFI);

        if (montantMax > 66667) {
            price__max.val('66 667');
            price__max.attr('value','66 667');
            //if ($('#price__max').val() != "") {
                //https://donner.apprentis-auteuil.org/ab?cids[]=145&cids[]=146&amount=60000&frequency=once&once_grid[]=60000&once_grid[]=66000&once_grid[]=72000
                $('#button__price__ifi').attr('href', 'https://donner.apprentis-auteuil.org/?cids[]=145&cids[]=146&amount=' + 66667 + '00&typededuc=isf').find('span').html('66 667 €')
            //}
            //printNuminElement('50000', price__ifi);
            //printNuminInput('50000', Montant_IFI);
        } else {
            //price__max.val(montantMax.toFixed(2));
            var Mmax = Math.round(montantMax);
            printNuminInput(Mmax, price__max);
            montantMax_ = Math.round(montantMax);
            if (montantMax_ > 0) {
                $('#button__price__ifi').attr('href', 'https://donner.apprentis-auteuil.org/?cids[]=145&cids[]=146&amount=' + montantMax_ + '00&typededuc=isf').find('span').html(addCommas(montantMax_)+' €')
            }else{
                $('#button__price__ifi').attr('href', 'https://donner.apprentis-auteuil.org/?cids[]=145&cids[]=146&amount=' + '0' + '00&typededuc=isf').find('span').html(addCommas(montantMax_)+' €')
            }


        }
        if ($('#price__max').val() == "") {
            var resR = $('#price__max').val().replace(/\s/g, '');
            resR = parseFloat(resR) * 0.75;
            if (price__total.val() > 50000) {
                price__total.val('50 000');
                price__total.attr('value','50 000');
            } else {
                var resRInt = Math.round(resR);
                printNuminInput(resRInt, price__total);
            }
        } else {
            var resR = $('#price__max').val().replace(/\s/g, '');
            resR = parseFloat(resR) * 0.75;
            if (price__total.val() > 50000) {
                price__total.val('50 000');
                price__total.attr('value','50 000');
            } else {
                var resRInt = Math.round(resR);
                printNuminInput(resRInt, price__total);
            }
        }

        par1 = MontantDon;
        par2 = $('#price__total').val().replace(/\s/g, '');

        var res = par1 - par2;
        if (res < 0) {
            $('#rest__ifi').val('0');
            $('#rest__ifi').attr('value','0');

        } else {

            var resInt = Math.round(res);
            printNuminInput(resInt, '#rest__ifi');
        }



    } else {
        price__ifi.val('0');
        price__ifi.attr('value','0');
        Total_patrimoine.val('');
    }

}


function printNuminInput(value, element) {
    if (value <= 0) {
        $(element).val('0');
        $(element).attr('value','0');
        return false;
    }
    if (afterPoint(value)) {
        $(element).val(addCommas(value.toFixed(2)));
        $(element).attr('value', addCommas(value.toFixed(2)));
    } else {
        $(element).val(addCommas(parseInt(value)));
        $(element).attr('value', addCommas(parseInt(value)));
    }
}
function afterPoint(number) {

    var intNum = parseInt(number);
    var aftercommma = number - intNum;
    if (aftercommma > 0.0) {
        return true;
    } else {

        return false;
    }

}
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ' ' + '$2');
    }
    return x1;
}

function calculerBymontant2018(MontantDon) {
    var Montant_IFI_maximum = $('#price__max');
    var Montant_effectuer = $('#price__total');


    var montantMax = MontantDon / 0.75;
    if (montantMax > 66667) {
        Montant_IFI_maximum.val('66 667');
        Montant_IFI_maximum.attr('value','66 667');
        if ($('#other__price').val() == "") {
            $('#button__price__ifi').attr('href', 'https://donner.apprentis-auteuil.org/?cids[]=145&cids[]=146&amount=' + 66667 + '00&typededuc=isf').find('span').html(addCommas(66667)+' €')
        }
        
    } else {
        
        montantMax = Math.round(montantMax);
        printNuminInput(montantMax, Montant_IFI_maximum);
        if ($('#other__price').val() == "") {
            montantMax_ = Math.round(montantMax);
            $('#button__price__ifi').attr('href', 'https://donner.apprentis-auteuil.org/?cids[]=145&cids[]=146&amount=' + montantMax_ + '00&typededuc=isf').find('span').html(addCommas(montantMax_)+' €')
        }


    }
    if ($('#other__price').val() == "") {
        var resR = $('#price__max').val().replace(/\s/g, '');
        resR = resR.replace(',', '.');
        resR = parseFloat(resR) * 0.75;
        if (Montant_effectuer.val() > 50000) {
            Montant_effectuer.val('50 000');
            Montant_effectuer.attr('value','50 000');
        } else {
            var resRInt = Math.round(resR);
            printNuminInput(resRInt, Montant_effectuer);
        }
    } else {
        var resR = $('#other__price').val().replace(/\s/g, '');
        resR = parseFloat(resR) * 0.75;
        if (Montant_effectuer.val() > 50000) {
            Montant_effectuer.val('50 000');
            Montant_effectuer.attr('value','50 000');
        } else {
            var resRInt = Math.round(resR);
            printNuminInput(resRInt, Montant_effectuer);
        }
    }

    par1 = MontantDon;
    par2 = $('#price__total').val().replace(/\s/g, '');


    var res = par1 - par2;
    if (res < 0) {
        $('#rest__ifi').val('0');
        $('#rest__ifi').attr('value','0');

    } else {

        
        var resInt = Math.round(res);
        printNuminInput(resInt, '#rest__ifi');
    }

    

}

function calculatrice() {

    var autreMon = $('#other__price').val().replace(/\s/g, '');
    var Montant_IFI = $('#price__max').val().replace(/\s/g, '');
    var MontantTotal;

    if (autreMon == "") {
        MontantTotal = parseFloat(Montant_IFI) * 0.75;
    } else {
        MontantTotal = parseFloat(autreMon) * 0.75;

    }
    if (MontantTotal > 50000) {

        $('#price__total').val('50 000');
        $('#price__total').attr('value','50 000');
    } else {
        printNuminInput(MontantTotal, '#price__total');
    }
    par1 = mon2018;
    par2 = $('#price__total').val().replace(/\s/g, '');

    var res = par1 - par2;
    if (res < 0) {
        $('#rest__ifi').val('0');
        $('#rest__ifi').attr('value','0');

    } else {
        var resInt = Math.round(res);
        printNuminInput(resInt, '#rest__ifi');
    }
    autreMon = Math.round(autreMon);
    $('#button__price__ifi').attr('href', 'https://donner.apprentis-auteuil.org/?cids[]=145&cids[]=146&amount=' + autreMon + '00&typededuc=isf').find('span').html(addCommas(autreMon)+' €')
}
