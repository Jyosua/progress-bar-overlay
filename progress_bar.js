var title,subtitle,max,progress_calculation,color_bar

function init() {
    title = document.getElementById('title');
    subtitle = document.getElementById('subtitle');
    max = document.getElementById('max');
    progress_calculation = document.getElementById('progress_calculation');
    color_bar = document.getElementById('color_bar');

    let timeout = this.window.setInterval(function() {
        loadData();
    }, 1000);
}

function loadData() {
    var jsonFile = new XMLHttpRequest();
    jsonFile.overrideMimeType('application/json');
    jsonFile.open('GET', 'http://localhost:8017/data.json', true);
    jsonFile.onreadystatechange = function() {
        if (jsonFile.readyState === 4 && jsonFile.status == "200") {
            var json = JSON.parse(this.responseText);
            title.innerHTML = json.title
            subtitle.innerHTML = json.subtitle
            max.innerHTML = json.max
            let current = json.current
            let ratio = Math.round(((current/json.max)*100 + Number.EPSILON) * 100) / 100
            progress_calculation.innerHTML = `${current} (${ratio}%)`
            color_bar.style.width = `${ratio}%`
        }
    }
    jsonFile.send();
}