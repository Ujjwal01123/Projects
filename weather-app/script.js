const searchBtn=document.getElementById("searchButton")
let input=document.getElementById("locationInput")
let loc=document.getElementById("location")
let temp=document.getElementById("temperature")
let des=document.getElementById("description")


searchBtn.addEventListener("click",async ()=>{
    inp=input.value;
    let KEY="7f2e844683ad4924a1441835252306"
    let URL=`http://api.weatherapi.com/v1/current.json?key=${KEY}&q=${inp}&aqi=yes`
    result=await fetch(URL)
    json_res=await result.json()
    console.log(json_res)
    loc.innerText=`${json_res.location.name} - ${json_res.location.region} - ${json_res.location.country}`
    temp.innerText=`${json_res.current.temp_c} *C`
    des.innerText=`${json_res.current.condition.text}`
})

