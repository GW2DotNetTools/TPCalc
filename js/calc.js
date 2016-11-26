 function format(amount) {
     if (amount == 0) {
         return '0';
     }

     var negative = amount < 0;
     var amount = Math.abs(amount);
     var gold = Math.floor(amount / 10000);
     var silver = Math.floor(amount / 100) % 100;
     var copper = Math.floor(amount % 100);
     var output = [];

     if (negative) {
         output.push('<b><font size="5" color="red">-</font></b>');
     }
     if (gold) {
         output.push(gold + ' <img src="img/gold.png" />');
     }
     if (silver) {
         output.push(silver + ' <img src="img/silver.png" />');
     }
     if (copper) {
         output.push(copper + ' <img src="img/copper.png" />');
     }
     return output.join(' ');
 }

 function update() {
     var buyGold = parseInt($('#buyGold').val()) || 0;
     var buySilver = parseInt($('#buySilver').val()) || 0;
     var buyCopper = parseInt($('#buyCopper').val()) || 0;
     var sellGold = parseInt($('#sellGold').val()) || 0;
     var sellSilver = parseInt($('#sellSilver').val()) || 0;
     var sellCopper = parseInt($('#sellCopper').val()) || 0;
     var quantity = parseInt($('#quantity').val()) || 1;

     var buyPrice = buyGold * 10000 + buySilver * 100 + buyCopper;
     var sellPrice = sellGold * 10000 + sellSilver * 100 + sellCopper;
     var listingFee = calcListingFee(quantity * sellPrice);
     var sellingFee = calcSellingFee(quantity * sellPrice);

     var cost = buyPrice * quantity;
     var profit = quantity * (sellPrice - buyPrice) - listingFee - sellingFee;
     var profitPercent = Math.round(profit / cost * 100);

     $('#cost').html(format(cost));
     $('#listing-fee').html(format(listingFee));
     $('#sale-fee').html(format(sellingFee));
     $('#profit').html('(' + profitPercent + '%) ' + format(profit));
 }

 function calcListingFee(price) {
     return Math.max(1, (price * 0.05).toFixed());
 }

 function calcSellingFee(price) {
     return (price * 0.10).toFixed();
 }

 function reset() {
     $('#quantity').val('1');
     $('#cost').html('');
     $('#listingFee').html('');
     $('#saleFee').html('');
     $('#profit').html('');
 }