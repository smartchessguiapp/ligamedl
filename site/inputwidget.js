/*
License

Copyright (c) 2018 smartchessguiapp

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

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
	return "" + year + "-" + pad(month, 2) + "-" + pad(day, 2);
}

// convert date input value to date object
function dateInputStrToDate(dateInputStr){
	let parts = dateInputStr.split("-");
	let year = parseInt(parts[0]);
	let month = parseInt(parts[1] - 1);
	let day = parseInt(parts[2]);
	return new Date(year, month, day);
}

// base class of custom elements
class e{
    constructor(tag){
        this.e = ce(tag);
    }

    // append element
    a(e){
        this.e.appendChild(e.e);
        return this;
    }

    // append list of elements
    aa(es){
        for(let e of es){
            this.a(e);
        }
        return this;
    }

    // shorthand for setAttribute
    sa(key,value){
        this.e.setAttribute(key,value);
        return this;
    }

    // shorthand for setting value
    sv(value){
        this.e.value = value;
        return this;
    }

    // set inner html
    h(value){
        this.e.innerHTML = value;
        return this;
    }

    // add class
    ac(klass){
        this.sa("class",klass);
        return this;
    }

    // return value
    v(){
        return this.e.value;
    }
}

/////////////////////////////////////////////////////
// custom elements

// label
class Label extends e{
    constructor(value){
        super("label");
        this.h(value);
    }
}

// date input
class DateInput extends e{
    constructor(dateInputStr){
        super("input");
        this.sa("type", "date");
        this.sv(dateInputStr);
    }

    timestampMs(){
        return dateInputStrToDate(this.v()).getTime();
    }
}

// text input
class TextInput extends e{
    constructor(initialValue){
        super("input");
        this.sa("type", "text");
        this.sv(initialValue);
    }

    getText(){
        return this.e.value;
    }
}

// checkbox
class CheckBox extends e{
    constructor(checked){
        super("input");
        this.sa("type", "checkbox");
        if(checked) this.sa("checked", "true");
    }

    checked(){
        return this.e.checked;
    }

    set(checked){
        this.e.checked = checked;
        return this;
    }
}

// checkbox option
class CheckBoxOptionInput extends e{
    constructor(labelText,checked){
        super("span");
        this.a(new Label(labelText));
        this.cb = new CheckBox(checked);
        this.a(this.cb);
    }

    checked(){
        return this.cb.checked();
    }

    set(checked){
        this.cb.set(checked);
        return this;
    }
}

// radio option
class RadioOption extends e{
    constructor(name,checked){
        super("input");
        this.sa("type", "radio");
        this.sa("name",name);
        if(checked) this.sa("checked", "true");
    }

    selected(){
        return this.e.checked;
    }
}

// radio input
class RadioInput extends e{
    constructor(name,options,selected){
        super("span")
        this.options = {};
        for(let key in options){
            let displayName = options[key];
            this.a(new Label(displayName));
            let ro = new RadioOption(name, key==selected);
            this.options[key] = ro;
            this.a(ro);
        }
    }

    selected(){
        for(let key in this.options){
            if(this.options[key].selected()) return key;
        }
    }
}

// struct to hold checkbox option data
class CheckboxOption{
    constructor(displayName, checked){        
        this.displayName = displayName;
        this.checked = checked;
    }
}

// options input
class CheckboxOptionsInput extends e{
    constructor(options){
        super("span")
        this.options = {};
        for(let key in options){
            let co = options[key];
            let coi = new CheckBoxOptionInput(co.displayName, co.checked);
            this.options[key] = coi;
            this.a(coi);
        }
    }

    set(key, checked){
        this.options[key].set(checked);
    }

    setAll(checked){
        for(let key in this.options){
            this.options[key].set(checked);
        }
    }

    getAllChecked(){
        let list = [];

        for(let key in this.options){
            if(this.options[key].checked()){
                list.push(key);
            }
        }

        return list;
    }
}

// div
class Div extends e{
    constructor(){
        super("div");        
    }
}

/////////////////////////////////////////////////////