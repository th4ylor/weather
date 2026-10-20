const caixahr = document.getElementById("hr-box")
const chaveGroq = "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" //exemplo
let caixa = document.querySelector(".medium-box")
let offSetCity = 0

function aplicarBackground(url) {
    document.body.style.setProperty('--bg-image', `url("${url}")`);
}

document.addEventListener("DOMContentLoaded", () =>{
    if (document.querySelector(".input-city").value.trim()){
        buttonClick()
    }})

async function buttonClick() {
    const cidade = document.querySelector(".input-city").value
    if (cidade.trim() === ""){
        alert("Por favor, digite o nome de uma cidade.")
    }
    
    let apiKey = "f7fc4ccec2e0cc8d47fa3f418178de34"
    let endereço = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    let respostaServidor = await fetch(endereço)
    let dadosJson = await respostaServidor.json()

    offSetCity = dadosJson.timezone

    caixa.innerHTML = `
        <h2  style ="font-size:30px;" class="cidade" >${dadosJson.name} </h2>
        <p style ="font-size: 60px; font-weight: 800; line-height: 1;" class="temp" >${Math.floor(dadosJson.main.temp)}°C</p>
        <img class="icone" src="https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}.png">
        <p class="umidade" >Umidade: ${dadosJson.main.humidity}</p>
        <button class="botao-ia" onclick="lookSuggestion()" ><img style="filter:invert(100%); transform:scale(0.7);" src="img/camisa.svg">Sugestão de roupa <img src="img/seta.svg" style="position: absolute; left: 95%; transform: translateX(-50%); filter:invert(100%)"></button>
        <p class="resp-ia"></p>
        `
    startClock()}

let clockInterval = null



function rotation(x,y){
    if(x){
        x.style.transform = `rotate(${y}deg)`
}} 

function showTime() {
    const clock = document.getElementById("clock")
    const hrbox = document.getElementById("hr-box")
    const caixaclock = document.getElementById("hr-clock")
    const hr = document.getElementById("hr")
    const min = document.getElementById("min")
    const sec = document.getElementById("sec")
    //HORARIO COM FUSO 
    let now = new Date()
    let utc = now.getTime() + now.getTimezoneOffset() * 60000
    let hourscity = new Date(utc + offSetCity * 1000)
    //MUDANDO O "DISPLAY:NONE" DO CSS
    clock.style.display = "flex"
    hrbox.style.display = "grid"
    //ROTAÇAO DO PONTEIRO
    let hh = hourscity.getHours() 
    let mm = hourscity.getMinutes()
    let ss = hourscity.getSeconds()
    let angHr = (hh % 12) * 30 + mm * 0.5
    let angMin = mm * 6 + ss * 0.1
    let angSec = ss * 6

    rotation(hr, angHr)
    rotation(min, angMin)
    rotation(sec, angSec)


    caixaclock.textContent = hourscity.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"})
        
    //MODO DE EXIBIÇÃO DAS HORAS E DATA
    const dayweek = hourscity.toLocaleDateString("pt-BR", {
        weekday: "long"})

    const datex = hourscity.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"})

    const hoursclock = hourscity.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"})

    const hrnow = now.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"})

    //ADICIONANDO TEXTO NO HTML
    caixahr.innerHTML = `
        <p class="dia"> <img class="calendar" src="img/calendar-days.svg"> ${dayweek}, ${datex}</p>
        <h2 class="hora">${hrnow}</h2>
    `
    caixaclock.innerHTML = `
        <h2 class="hora2">${hoursclock}</h2>
    `;}

function startClock(){
    if (clockInterval !== null) {
        clearInterval(clockInterval)
    }
    showTime()
    clockInterval = setInterval(() => {
        showTime()
    }, 1000)}

//FUNCAO DE VOZ
function voiceDetection(){
    let recognition = new window.webkitSpeechRecognition()
    recognition.lang = "pt-BR"
    recognition.start()

    //PEGANDO RESULTADO FORNECIDO PELO NVEGADOR E TRANSCREVENDO NO CAMPO INPUT
    recognition.onresult = function (evento){
        let textTranscript = evento.results[0][0].transcript
        document.querySelector(".input-city").value = textTranscript
        buttonClick()}};

//FUNCAO PRA SUGESTAO DE ROUPA
async function lookSuggestion(){
    let temperatura = document.querySelector(".temp").textContent
    let umidade = document.querySelector(".umidade").textContent
    let cidade = document.querySelector(".cidade").textContent

    //CREDENCIAIS PARA CONEXAO API GROQ
    let resposta = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ chaveGroq
        },
        body: JSON.stringify({
            model:"meta-llama/llama-4-scout-17b-16e-instruct",
            messages: [
                {
                    "role": "user",
                    "content": `Me dê sugestão de qual roupa usar hoje.
                    Estou na cidade de: ${cidade}, a temperatura atual é de: ${temperatura}°C
                    e a umidade está em: ${umidade}.
                    Me dê sugestões em duas frases curtas.`
                },]})});

    //PEGANDO A RESPOSTA DA API E RETORNANDO PRA VARIAVEL $respia       
    let dados = await resposta.json()
    let respia = document.querySelector(".resp-ia").innerHTML = dados.choices[0].message.content
    return respia
};

//One Dark Pro Night Flat - NOME DO TEMA PRA NÃO ESQUECER KSKSKS
//Pagina dos icones https://lucide.dev/?utm_source=chatgpt.com