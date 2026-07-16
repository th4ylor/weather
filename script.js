
let chaveGroq = "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"

function aplicarBackground(url) {
    document.body.style.setProperty('--bg-image', `url("${url}")`);
};

async function buttonClick() {
    let cidade = document.querySelector(".input-city").value
    const caixa = document.querySelector(".medium-box")
    let apiKey = "f7fc4ccec2e0cc8d47fa3f418178de34"
    let endereço = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`
    let respostaServidor = await fetch(endereço)
    let dadosJson = await respostaServidor.json()
    console.log(dadosJson)
    let offSetCity = dadosJson.timezone

    caixa.innerHTML = `
        <h2  style ="font-size:25px;" class="cidade" >${dadosJson.name}</h2>
         
        <p style ="font-size:35px;" class="temp" >${Math.floor(dadosJson.main.temp)}°C</p>
        <img class="icone" src="https://openweathermap.org/payload/api/media/file/${dadosJson.weather[0].icon}.png">
        <p class="umidade" >Umidade: ${dadosJson.main.humidity}</p>
        <button class="botao-ia" onclick="lookSuggestion()" >Sugestão de roupa</button>
        <p class="resp-ia" ></p>
        `
    function showTime() {
        let clock = document.getElementById("clock")
        let hrbox = document.getElementById("hr-box")
        let date = new Date()
        let utc = date.getTime() + (date.getTimezoneOffset() * 60000)
        let hourscity = new Date(utc + (offSetCity * 1000))
        console.log("1-"+ hourscity)

        let caixahr = document.getElementById("hr-box")
        const hr = document.getElementById("hr")
        const min = document.getElementById("min")
        const sec = document.getElementById("sec")

        clock.style.display = "flex"
        hrbox.style.display = "flex"


        rotation = (target, val) => {
            target.style.transform = `rotate(${val}deg)`
        }
        clock = () => {
            let hh = (date.getHours() % 12) + date.getMinutes() / 59
            let mm = date.getMinutes()
            let ss = date.getSeconds()

            hh *= 30
            mm *= 6
            ss *= 6

            rotation(hr, hh)
            rotation(min, mm)
            rotation(sec, ss)

            setTimeout(clock,500)
        }
        
        console.log("teste"+ clock)

        let dayweek = date.toLocaleDateString("pt-br", {
            weekday: "long"
        })
        console.log("2 -"+dayweek)

        let datex = date.toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        console.log("3 -"+datex)

        let hours = date.toLocaleTimeString("pt-BR")
        console.log("4 -"+hours)


        caixahr.innerHTML = `
            <p class="dia">${dayweek} </p>
            <p class="data">${datex} </p>
            <h2 class="hora">${hours} </h2>
        `
        setInterval(showTime, 1000)
        window.onload = clock()

    }
    showTime()
    
}
buttonClick()

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
                    Estou na cidade de: ${cidade}, a temperatura atual é de: ${temperatura}°C
                    e a umidade está em: ${umidade}.
                    Me dê sugestões em duas frases curtas.`
                },
            ]
        })
    });

    let dados = await resposta.json()
    let respia = document.querySelector(".resp-ia").innerHTML = dados.choices[0].message.content
    console.log(dados)

};
