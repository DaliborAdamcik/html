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
	jsn.ziaci.forEach(callsort);
	
	return Mustache.render("{{#ziaci}}<h2>{{meno}} {{priezvisko}}</h2><ul>{{#hodnotenie}}<li>"
			+"{{predmet}}: {{znamka}}</li>{{/hodnotenie}}{{^hodnotenie}}<li>Žiadne</li>{{/hodnotenie}}</ul><hr/>{{/ziaci}}", jsn);
}

function callsort(ziak)
{
	if(ziak.hodnotenie)
		ziak.hodnotenie.sort(function (hd1, hd2) { return hd1.znamka - hd2.znamka; });
}
