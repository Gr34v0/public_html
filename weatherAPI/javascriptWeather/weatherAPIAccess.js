var loadDataForUser = function() {
    // build the url for the individual person (uses template strings)
    const url = 'https://weatherapiactivity.herokuapp.com/RESTAPI-Weather.php?action=get_weather&zip='${this.zip};
    // load the data from the api
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        const response = JSON.parse(xhr.responseText);
        // create an array of trs that will be added to the page
        const trs = Object.keys(response).map(function(key) {
            const left = document.createElement('td');
            left.textContent = key;
            const right = document.createElement('td');
            right.textContent = response[key];
            const tr = document.createElement('tr');
            tr.appendChild(left);
            tr.appendChild(right);
            return tr;
        });
        // create a table and add the rows
        const table = document.createElement('table');
        trs.forEach(function(tr) {
            table.appendChild(tr);
        });
        const container = document.getElementById('weather-info');
        // remove any existing child if it exists
        if (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        container.appendChild(table);
    }
    xhr.send();
};
window.onload = function() {
    // the url for the people list
    const url = 'https://weatherapiactivity.herokuapp.com/RESTAPI-Weather.php?action=get_weather_list';
    // build an xhr to request the info
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function() {
        const response = JSON.parse(xhr.responseText);
        // convert each entry to a link on the page
        // because the information has already been requested this *can* be
        // done without re-requesting from the server.
        response.forEach(function(entry) {
            // create a link
            const elem = document.createElement('a');
            elem.href = '#';
            elem.id = entry.id;
            elem.textContent = entry.name;
            elem.onclick = loadDataForUser;
            // create an li to add to the list
            const li = document.createElement('li');
            li.appendChild(elem);
            // place it on the page
            document.getElementById('weather-list').appendChild(li);
        });
    }
    xhr.send();
}