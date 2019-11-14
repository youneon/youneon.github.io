function addRow() {
    var div = document.createElement('div');

    div.className = 'dontspeak-p';

    div.innerHTML = '<input type="text" name="name" value="" />\
        <input type="text" name="value" value="" />\
        <label> <input type="checkbox" name="check" value="1" /> Checked? </label>\
        <input type="button" value="-" onclick="removeRow(this)">';

     document.getElementById('content').appendChild(div);
}