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

class Section{
    constructor(displayName, input, checked){        
        this.include = new CheckBoxOptionInput(displayName, checked);
        this.input = input;
    }    
}

let colorValues = {
    white : "White",
    black : "Black"
};

let perfTypes={
    ultraBullet: new CheckboxOption("Ultra Bullet", true),
    bullet: new CheckboxOption("Bullet", true),
    blitz: new CheckboxOption("Blitz", true),
    rapid: new CheckboxOption("Rapid", true),
    classical: new CheckboxOption("Classical", true),
    correspondence: new CheckboxOption("Correspondence", true),
    chess960: new CheckboxOption("Chess960", true),
    crazyhouse: new CheckboxOption("Crazyhouse", true),
    antichess: new CheckboxOption("Antichess", true),
    atomic: new CheckboxOption("Atomic", true),
    horde: new CheckboxOption("Horde", true),
    kingOfTheHill: new CheckboxOption("King of the Hill", true),
    racingKings: new CheckboxOption("Racing Kings", true),
    threeCheck: new CheckboxOption("Three Check", true)
};

let SECTIONS = {
    username: new Section("Username", new TextInput("thibault"), true),
    since: new Section("Since", new DateInput("2000-01-01"), false),
    until: new Section("Until", new DateInput(dateToDateInputStr(new Date())), false),
    max: new Section("Max", new TextInput("1000"), false),
    vs: new Section("Opponent", new TextInput("DrDrunkenstein"), false),
    rated: new Section("Rated", new CheckBox(true), false),
    perfType: new Section("Rating category", new CheckboxOptionsInput(perfTypes), false),
    color: new Section("Color", new RadioInput("color",colorValues,"white"), false),
    analysed: new Section("Analysed", new CheckBox(true), false),
    moves: new Section("Moves", new CheckBox(true), false),
    tags: new Section("Tags", new CheckBox(true), false),
    clocks: new Section("Clocks", new CheckBox(false), false),
    evals: new Section("Evals", new CheckBox(false), false),
    opening: new Section("Opening", new CheckBox(false), false)
};

function sectionsAsUrl(){
    list = [];
    for(let key in SECTIONS){
        if(key!="username"){
            let section = SECTIONS[key];            
            if(section.include.checked()){
                let input = section.input;
                if(input instanceof DateInput){
                    list.push(key + "=" + input.timestampMs());
                }else if(input instanceof TextInput){
                    list.push(key + "=" + input.v());
                }else if(input instanceof RadioInput){
                    list.push(key + "=" + input.selected());
                }else if(input instanceof CheckBox){
                    list.push(key + "=" + input.checked());
                }else if(input instanceof CheckboxOptionsInput){
                    list.push(key + "=" + input.getAllChecked().join(","));
                }
            }
        }
    }
    if(list.length == 0) return "";
    return "?" + list.join("&");
}

function setPerfs(checked){
    SECTIONS.perfType.input.setAll(checked);    
}

function createLink(){
    url = "https://lichess.org/games/export/" + SECTIONS.username.input.getText() + sectionsAsUrl();
    le = ge("link");
    le.href = url;
    le.innerHTML = url;
    lte = ge("linktext");
    lte.value = url;
}

function build(){
    let sectionse = ge("sections");
    for(let key in SECTIONS){        
        let section=SECTIONS[key];        
        hdiv = new Div().ac("sectionhead").a(section.include);
        bdiv = new Div().ac("sectionbody").a(section.input);
        sdiv = new Div().ac("section").aa([hdiv,bdiv]);
        sectionse.appendChild(sdiv.e);
    }
}

// startup

build();

createLink();
