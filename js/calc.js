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

function colorOutput(amount) {
	var negative = amount < 0;
	var output = [];
	
	if (negative) {
		output.push('<b><font color="red">-');
	}
	else {
		output.push('<b><font color="green">');
	}

	output.push(format(amount));
	
	output.push('</font></b>');
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

	var revenue = sellPrice * quantity;
	var cost = buyPrice * quantity;
	var profit = quantity * (sellPrice - buyPrice) - listingFee - sellingFee;
	var profitPercent = profit / cost * 100;

	$('#revenue').html(format(revenue));
	$('#cost').html(format(cost));
	$('#listingFee').html(format(listingFee));
	$('#saleFee').html(format(sellingFee));
	$('#profit').html(colorOutput(profit));
	$('#profitPercent').html('(' + profitPercent.toFixed(2) + '%)'); 
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
	$('#revenue').html('');
	$('#profitPercent').html('');
}