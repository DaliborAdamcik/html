var $frm = $("#ank");
var $ankety=  $('#komenty');
var localStorageName = 'anketaSimonka';

//Pridanie funkcionality pre kliknutie na tlacidlo "Ulož článok"
$frm.submit(function(event){  //tu potrebujem aj objekt s udalosťou, aby som
    event.preventDefault(); //zrušiť pôvodné spracovanie udalosti
    anksend();
});

//http://stackoverflow.com/questions/5866169/getting-all-selected-values-of-a-multiple-select-box-when-clicking-on-a-button-u
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (var i=0, iLen=options.length; i<iLen; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value || opt.text);
    }
  }
  return result;
}

function anksend(){
    var data = {};
    $frm.serializeArray().map(
        function(item){
            var itemValueTrimmed = item.value.trim();
            if(itemValueTrimmed){//ak je hodnota neprázdny reťazec
                data[item.name] = itemValueTrimmed;
            }
        }
    );

    data['rok'] = getSelectValues(document.getElementById('rok'));

    console.log(data);
    
    var mustard = Mustache.render(document.getElementById('tmpAnk').innerHTML, data);
    //document.getElementById('komenty').innerHTML = mustard;

    var datas = {
        "title": "appid:da_si_ank-"+Math.round(new Date().getTime()/1000),
        "content": mustard};

    $.ajax({
        type: "POST",
        url: "http://wt.kpi.fei.tuke.sk/api/article",
        contentType:"application/json;charset=UTF-8",
        dataType: "json",
        data:JSON.stringify(datas),
        success: function (response) {
            if(response.id){
                console.log(response.id);
                $frm.trigger('reset');
                loadAnk(response.id);
                localStorage.setItem(localStorageName, "anketoval");
                $frm.hide();
                $('#hlasujzas').show();
            }
        },
        error: function (jxhr) {
            window.alert("Spracovanie neúspešné. Údaje neboli zapísané. Kód chyby:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
        }
    });

    
}

function loadniAnkety(){
    $.ajax({
        type: "GET",
        url: "http://wt.kpi.fei.tuke.sk/api/article?title=appid:da_si_ank",
        success: function (response) {
            console.log(response);
            $ankety.empty();

            response.articles.forEach(function(element) {
                loadAnk(element.id);
            }, this);
        },
        error: function (jxhr) {
            console.log("Spracovanie neúspešné. Údaje neboli získané. Kód chyby:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
        }
    });
}

function loadAnk(id)
{
    $.ajax({
        type: "GET",
        url: "http://wt.kpi.fei.tuke.sk/api/article/"+id,
        success: function (response) {
            console.log(response);
            $ankety.append($(response.content+"<br/><br/>"));
        },
        error: function (jxhr) {
            console.log("Spracovanie neúspešné. Údaje neboli získané. Kód chyby:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
        }
    });
}

// loadujeme vsetky ankety a hotovo :D
loadniAnkety();

if(localStorage.getItem(localStorageName)!= null)
{
    $frm.hide();
}
else
$('#hlasujzas').hide();

$('#hlasujzas').click(function () { $(this).hide(); $frm.show();});

