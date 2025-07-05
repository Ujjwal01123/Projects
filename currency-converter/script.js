const FROM=document.getElementById("from")
const TO=document.getElementById("to")
const Convert=document.getElementById("convert")
const Amt=document.getElementById("amt")
const rsValue=document.getElementById("rs_value")

addEventListener
Convert.addEventListener("click",async ()=>{
    const fromVal=FROM.value
    const toVal=TO.value
    const amtVal=Amt.value
    console.log(fromVal,toVal)
    KEY='7714673cb412b03f1c9e6b94'

    const URL=`https://v6.exchangerate-api.com/v6/${KEY}/pair/${fromVal}/${toVal}/${amtVal}`
    const Promise=await fetch(URL)
    const res=await Promise.json()
    console.log(res)
    // console.log(res.conversion_result)
    rsValue.innerText=res.conversion_result
    // console.log(URL)
})
