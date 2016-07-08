/**
 * 
 */

window.onload = function() {
	parsedata();
};

function parsedata()
{
	var srcel = document.getElementById('srcdata');
	var jsn = JSON.parse(srcel.innerHTML);
	srcel.style.display = 'none';
	document.getElementById('results').innerHTML = prejdiJSON(jsn);
	document.body.style.margin = '1em';
}

function prejdiJSON(jsn)
{
	var res = "bleka";
	 
	for(var ind in jsn.ziaci) {
		res+= prejdiZIAKA(jsn.ziaci[ind]);
	}
	
	return res;

}

function prejdiZIAKA(ziak)
{
	var res = "<h2>"+ziak.meno+" "+ziak.priezvisko+"</h2>Známky:<ul>";
	
	if(!ziak.hodnotenie)
	{
		res+="<li>Nemá ()</li></ul><hr/>";
		return res;

	}

	ziak.hodnotenie.sort(sortHodnotenie);
	
	for(var poi in ziak.hodnotenie) {
		hodn = ziak.hodnotenie[poi];
		res+= "<li>"+hodn.predmet+": "+hodn.znamka+"</li>";
	}

	res+="</ul><hr/>";
	
	return res;
}

function sortHodnotenie(hd1, hd2)
{
	return hd1.znamka - hd2.znamka;
}
