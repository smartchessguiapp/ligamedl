class Section{
    constructor(kind){
        this.kind=kind
    }
}

let SECTIONS = {
    username: new Section("string"),
    since: new Section("date"),
    until: new Section("date"),
    max: new Section("number"),
    rated: new Section("check"),
    perfType: new Section("options"),
    color: new Section("radio"),
    analyzed: new Section("check"),
    moves: new Section("check"),
    tags: new Section("check"),
    clocks: new Section("check"),
    evals: new Section("check")
}

let perfTypes={
    ultraBullet:"Ultra Bullet",
    bullet:"Bullet",
    blitz:"Blitz",
    rapid:"Rapid",
    classical:"Classical",
    correspondence:"Correspondence",
    chess960:"Chess960",
    crazyhouse:"Crazyhouse",
    antichess:"Antichess",
    atomic:"Atomic",
    horde:"Horde",
    kingOfTheHill:"King of the Hill",
    racingKings:"Racing Kings",
    threeCheck:"Three Check"
};

let colorValues={
    white:"White",
    black:"Black"
};

function cl(text){
    l=ce("label")
    l.innerHTML=text
    return l
}

function createCheckBox(id,checked){
    inp=document.createElement("input")
    inp.setAttribute("type","checkbox")
    inp.setAttribute("id",id)
    if(checked) inp.setAttribute("checked","true")
    return inp
}

function createDateInput(id,value){
    inp=document.createElement("input")
    inp.setAttribute("type","date")
    inp.setAttribute("id",id)
    inp.value=value
    return inp
}

function createStringInput(id,value){
    inp=document.createElement("input")
    inp.setAttribute("type","text")
    inp.setAttribute("id",id)
    inp.value=value
    return inp
}

function createNumberInput(id,value){
    inp=document.createElement("input")
    inp.setAttribute("type","text")
    inp.setAttribute("id",id)
    inp.value=value
    return inp
}

function createRadioInput(name,id,checked){
    inp=document.createElement("input")
    inp.setAttribute("type","radio")
    inp.setAttribute("name",name)    
    inp.setAttribute("id",id)    
    if(checked) inp.setAttribute("checked","true")
    return inp
}

function createRadio(name,values,def){
    let inpdiv=document.createElement("div")    
    for(let value in values){
        l=cl(values[value])
        inpdiv.appendChild(l)
        radio=createRadioInput(name,value,value==def)
        inpdiv.appendChild(radio)
    }
    return inpdiv
}

function collectRadio(name,values){
    for(let value in values){
        let e=ge(value)
        if(e.checked) return value
    }
}

function createOptionsInput(ids,value){
    let inpdiv=document.createElement("div")
    for(let id in ids){
        checkbox=createCheckBox(id,value)
        l=cl(ids[id])
        inpdiv.appendChild(l)
        inpdiv.appendChild(checkbox)
    }
    return inpdiv
}

function addClass(e,klass){
    e.setAttribute("class",klass)
}

function createInput(kind){
    if(kind=="check"){
        return createCheckBox()
    }
}

function collectOptions(ids){
    let list=[]
    for(let id in ids){
        if(ge(id).checked){
            list.push(id)
        }
    }
    return list.join(",")
}

function build(){
    let sectionse=ge("sections")
    for(let key in SECTIONS){        
        section=SECTIONS[key]
        kind=section.kind
        sdiv=ce("div")
        addClass(sdiv,"section")
        hdiv=ce("div")        
        hlabel=ce("label")
        hlabel.innerHTML=key
        hcheck=createCheckBox(key,key=="username"?true:false)
        hdiv.appendChild(hlabel)
        hdiv.appendChild(hcheck)
        addClass(hdiv,"sectionhead")
        bdiv=ce("div")        
        sid="input_"+key
        if(kind=="check"){
            bdiv.appendChild(createCheckBox(sid,true))
        }
        if(kind=="date"){
            bdiv.appendChild(createDateInput(sid,key=="since"?"2000-01-01":dateToDateInputStr(new Date())))
        }
        if(kind=="string"){
            bdiv.appendChild(createStringInput(sid,key=="username"?"thibault":""))
        }
        if(kind=="number"){
            bdiv.appendChild(createNumberInput(sid,1000))
        }
        if(kind=="options"){
            bdiv.appendChild(createOptionsInput(perfTypes,true))
        }
        if(kind=="radio"){
            bdiv.appendChild(createRadio("color",colorValues,"white"))
        }
        addClass(bdiv,"sectionbody")
        sdiv.appendChild(hdiv)
        sdiv.appendChild(bdiv)
        sectionse.appendChild(sdiv)
    }
}

function setPerfs(value){
    for(let key in perfTypes){        
        ge(key).checked=value
    }
}

function createLink(){
    le=ge("link")
    let list=[]
    for(key in SECTIONS){
        sid="input_"+key
        if(ge(key).checked&&(key!="username")){
            section=SECTIONS[key]
            kind=section.kind
            if(kind=="date"){            
                if(ge(key).checked){
                    list.push(key+"="+dateInputStrToDate(ge(sid).value).getTime())
                }
            }            
            if(kind=="number"){            
                if(ge(key).checked){
                    list.push(key+"="+ge(sid).value)
                }
            }
            if(kind=="check"){            
                if(ge(key).checked){
                    list.push(key+"="+ge(sid).checked)
                }
            }
            if(kind=="options"){            
                if(ge(key).checked){
                    list.push(key+"="+collectOptions(perfTypes))
                }
            }
            if(kind=="radio"){                            
                if(ge(key).checked){
                    list.push(key+"="+collectRadio("color",colorValues))
                }
            }
        }        
    }
    url="https://lichess.org/games/export/"+ge("input_username").value
    if(list.length>0){
        url+="?"+list.join("&")
    }
    le.href=url
    le.innerHTML=url
    ge("linktext").value=url
}

build()
createLink()