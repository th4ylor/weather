
let chaveGroq = "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"

function aplicarBackground(url) {
    document.body.style.setProperty('--bg-image', `url("${url}")`);
};

async function buttonClick() {
    let cidade = document.querySelector(".input-city").value
    let caixa = document.querySelector(".medium-box")
    let apiKey = "f7fc4ccec2e0cc8d47fa3f418178de34"
    let endereço = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    let respostaServidor = await fetch(endereço)
    let dadosJson = await respostaServidor.json()
    console.log(dadosJson)

    

    caixa.innerHTML = `
        <h2 class="cidade" >${dadosJson.name}</h2>
        <p class="temp" >${Math.floor(dadosJson.main.temp)}°C</p>
        <img class="icone" src="https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}.png">
        <p class="umidade" >Umidade: ${dadosJson.main.humidity}</p>
        <button class="botao-ia" onclick="lookSuggestion()" >Sugestão de roupa</button>
        <p class="resp-ia" ></p>
        `
    
    offSetCity = dadosJson.timezone
    showTime();
}

async function showTime(){
    let caixa = document.querySelector(".date-time")
    let agora = new Date()
    let utc = agora.getTime() + (agora.getTimezoneOffset() * 60000)
    let hourscity = new Date(utc + (offSetCity * 1000))

    caixa.innerHTML = `
        <p>${hourscity.toLocaleTimeString("pt-BR")}</p>
        <p>${hourscity.toLocaleDateString("pt-BR")} </p>
    `
    setInterval(showTime, 1000)

};

function voiceDetection(){
    let recognition = new window.webkitSpeechRecognition()
    recognition.lang = "pt-BR"
    recognition.start()

    recognition.onresult = function (evento){
        let textTranscript = evento.results[0][0].transcript
        document.querySelector(".input-city").value = textTranscript
        buttonClick()
    }
};

async function lookSuggestion(){
    let temperatura = document.querySelector(".temp").textContent
    let umidade = document.querySelector(".umidade").textContent
    let cidade = document.querySelector(".cidade").textContent

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
                    Estou na cidade de: ${cidade}, a tmperatura atual é de: ${temperatura}°C
                    e a umidade está em: ${umidade}.
                    Me dê sugestões em duas frases curtas.Seja criativo e natural nas respostas`
                },
            ]
        })
    });

    let dados = await resposta.json()
    let respia = document.querySelector(".resp-ia").innerHTML = dados.choices[0].message.content
    console.log(dados)

};

