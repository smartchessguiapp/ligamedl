// zero pad num to size places
function pad(num, size){
    var s = num + "";
    while ( s.length < size ) s = "0" + s;
    return s;
}

// shorthand for creating html element
function ce(tag){
    return document.createElement(tag);
}

// shorthand for getting element by id
function ge(id){
    return document.getElementById(id);
}

// convert date object to date input value
function dateToDateInputStr(dateObj){
	let month = dateObj.getUTCMonth() + 1;
	let day = dateObj.getUTCDate();
	let year = dateObj.getUTCFullYear();
	return "" + year + "-" + pad(month,2) + "-" + pad(day,2);
}

// convert date input value to date object
function dateInputStrToDate(dateInputStr){
	let parts = dateInputStr.split("-");
	let year = parseInt(parts[0]);
	let month = parseInt(parts[1]-1);
	let day = parseInt(parts[2]);
	return new Date(year,month,day);
}

class e{
    constructor(tag){
        this.e = ce(tag);
    }

    a(e){
        this.e.appendChild(e.e);
    }

    // shorthand for setAttribute
    sa(key,value){
        this.e.setAttribute(key,value);
    }

    // shorthand for setting value
    sv(value){
        this.e.value = value;
    }
}

class DateInput extends e{
    constructor(dateInputStr){
        super("input");
        this.sa("type","date");
        this.sv(dateInputStr);
    }
}

