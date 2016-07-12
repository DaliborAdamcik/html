/*var fore_lat = 48.9452; simonka
var fore_lon = 21.46725;*/
var fore_lat = 48.98944;
var fore_lon = 21.40927;

$.ajax({
        type: "GET",
        url: 'http://api.openweathermap.org/data/2.5/weather?lat='+fore_lat+'&lon='+fore_lon+'&appid=8641355d0bdfa52a49f4e9a42560adf0&units=metric',
        success: function (fore)
        {
            //console.log(fore);
            document.getElementById('pocas').innerHTML =
                Mustache.render(document.getElementById('tmpFore').innerHTML, fore);
        },
        error: function (jxhr) {
            window.alert("Spracovanie neúspešné. Údaje neboli zapísané. Kód chyby:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
        }
    });

$.ajax({
        type: "GET",
        url: 'http://api.openweathermap.org/data/2.5/forecast?lat='+fore_lat+'&lon='+fore_lon+'&appid=8641355d0bdfa52a49f4e9a42560adf0&units=metric',
        success: function (fore)
        {
            console.log(fore);
            document.getElementById('pocas5').innerHTML =
                Mustache.render(document.getElementById('tmpFore5').innerHTML, fore);
        },
        error: function (jxhr) {
            window.alert("Spracovanie neúspešné. Údaje neboli zapísané. Kód chyby:" + status + "\n" + jxhr.statusText + "\n" + jxhr.responseText);
        }
    });



/* var localStorageName = 'taskListDA';
var tasks=JSON.parse(localStorage.getItem(localStorageName));
var taskTemplate =$("#tmplTask").html();
$("#inNewTask").attr('autocomplete', 'off')

if(tasks === null)
    tasks=JSON.parse('[{"id":-1,"task":"First run","isDone":true},{"id":0,"task":"Mark this task completed, click on remove completed tasks button","isDone":false}]');

tasks.forEach(function(element) {
    addMyObj(element);
}, this);

function addMyObj(element)
{
    var $ele = $(Mustache.render(taskTemplate, element));

    if(element.isDone)
    {
        $ele.toggleClass("completedTask");
    }
    
    $ele.click(function() {
        $(this).toggleClass("completedTask");
        markCompletedByID($(this).attr('data-id'), $(this).hasClass("completedTask"));
    }); 
   
    $("#frmTasks").append($ele);
}

function LastTaskID()
{
    var maxid = 0;
    tasks.forEach(function(chi) {
        if(chi.id>maxid)
            maxid = chi.id;
    }, this);
    
    return parseInt(maxid)+1;
}

function markCompletedByID(id, state)
{
    tasks.forEach(function(chi) {
        if(chi.id==id)
        chi.isDone = state;
    }, this);

    console.log(tasks);
    saveTaskList();
}

function removeCompleted()
{
    tasks = tasks.filter(function(el) { return !el.isDone; });
    console.log(tasks);
    saveTaskList();
}

function saveTaskList()
{
    console.log(JSON.stringify(tasks));
    localStorage.setItem(localStorageName, JSON.stringify(tasks));
    console.log("Saved");
}

function addnewtask() {
    var nt = $( "#inNewTask" ).val().trim();
    $( "#inNewTask" ).val('');
    if(nt.length==0)
    {
        alert("Please, enter task description");
        return;
    }
    
    var task = {id: LastTaskID(), task: nt, isDone: false}
    tasks.push(task);

    addMyObj(task);
    saveTaskList();
}

$( "#btAddTask" ).click(addnewtask);

$( "#inNewTask" ).keypress(function(ev) {
  if(ev.which == 13)
  {
    ev.preventDefault();
    addnewtask();
  }
});

$( "#btRemCmpl" ).click(function() {
    $(".completedTask").each(function (index, obj) {
        $(this).remove();
    });
    removeCompleted();    
});
*/