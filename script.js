
const chaveGroq = "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" //exemplo
let caixa = document.querySelector(".medium-box")

function aplicarBackground(url) {
    document.body.style.setProperty('--bg-image', `url("${url}")`);
};

async function buttonClick() {
    const cidade = document.querySelector(".input-city").value
    if (cidade.trim() === ""){
        alert("Por favor, digite o nome de uma cidade.")
    }
    
    
    let apiKey = "f7fc4ccec2e0cc8d47fa3f418178de34"
    let endereço = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    let respostaServidor = await fetch(endereço)
    let dadosJson = await respostaServidor.json()
    //console.log(dadosJson)
    let offSetCity = dadosJson.timezone

    caixa.innerHTML = `
        <h2  style ="font-size:30px;" class="cidade" >${dadosJson.name} </h2>
        <p style ="font-size: 60px; font-weight: 800; line-height: 1;" class="temp" >${Math.floor(dadosJson.main.temp)}°C</p>
        <img class="icone" src="https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}.png">
        <p class="umidade" >Umidade: ${dadosJson.main.humidity}</p>
        <button class="botao-ia" onclick="lookSuggestion()" ><img style="filter:invert(100%);transform:translate(10%, 50%)"class="camisa" src="img/camisa.svg">Sugestão de roupa</button>
        <p class="resp-ia"></p>
        `

    function showTime() {
        let clock = document.getElementById("clock")
        let hrbox = document.getElementById("hr-box")

        //HORARIO COM FUSO 
        let date = new Date()
        let utc = date.getTime() + (date.getTimezoneOffset() * 60000)
        let hourscity = new Date(utc + (offSetCity * 1000))
        //console.log("1-"+ hourscity)
        
        const caixaclock = document.getElementById("hr-clock")
        const caixahr = document.getElementById("hr-box")

        const hr = document.getElementById("hr")
        const min = document.getElementById("min")
        const sec = document.getElementById("sec")

        //MUDANDO O "DISPLAY:NONE" DO CSS
        clock.style.display = "flex"
        hrbox.style.display = "grid"
        
        //ROTAÇAO DO PONTEIRO
        clock = () => {
            const now = new Date()
            let hh = (now.getHours() % 12) + now.getMinutes() / 59
            let mm = now.getMinutes()
            let ss = now.getSeconds()

            hh *= 30
            mm *= 6
            ss *= 6

            rotation(hr, hh)
            rotation(min, mm)
            rotation(sec, ss)
            setTimeout(clock,500)
        }
        //console.log("teste"+ clock)

        //CRIANDO E MODIFICANDO A ROTAÇÃO NO CSS
        rotation = (target, val) => {
            target.style.transform = `rotate(${val}deg)`
        }

        //MODO DE EXIBIÇÃO DAS HORAS E DATA
        let dayweek = date.toLocaleDateString("pt-br", {
            weekday: "long"
        })
        //console.log("2 -"+dayweek)
        let datex = date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        let hours = date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        })
        //console.log("4 -"+hours)
        let hoursclock = hourscity.toLocaleTimeString("pt-BR")

        //ADICIONANDO TEXTO NO HTML
        caixahr.innerHTML = `
            <p class="dia"> <img class="calendar" src="img/calendar-days.svg"> ${dayweek}, ${datex}</p>
            <h2 class="hora">${hours}</h2>
        `
        caixaclock.innerHTML = `
            <h2 class="hora2">${hoursclock}</h2>
        `;
        window.onload = clock()
        
    }
    setInterval(showTime, 1000)
    showTime()
    
}
buttonClick()
//FUNCAO DE VOZ
function voiceDetection(){
    let recognition = new window.webkitSpeechRecognition()
    recognition.lang = "pt-BR"
    recognition.start()

    //PEGANDO RESULTADO FORNECIDO PELO NVEGADOR E TRANSCREVENDO NO CAMPO INPUT
    recognition.onresult = function (evento){
        let textTranscript = evento.results[0][0].transcript
        document.querySelector(".input-city").value = textTranscript
        buttonClick()
    }};

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