# Previsão do Tempo ⛅

Projeto de estudo feito para **treinar JavaScript e consumo de APIs**. A ideia é um app de previsão 
do tempo em que a pessoa digita (ou fala) o nome de uma cidade e vê o clima na tela.

> 🚧 **Projeto em andamento.** Ele nasceu como exercício de aprendizado e algumas partes ainda não
> estão terminadas. A lista de status está logo abaixo.

## O que eu quis praticar

- Fazer requisições a uma API com `fetch`
- Trabalhar com JSON e atualizar a página com JavaScript (manipulação do DOM)
- Usar a API de geocodificação da OpenWeather para achar cidades
- Eventos de clique e entrada de texto
- Reconhecimento de voz no navegador
- Organizar um projeto pequeno só com HTML, CSS e JavaScript puros

## Status
- [x] Interface com campo de busca, botão de pesquisa e botão de microfone
- [x] Exibição do dia e da hora
- [x] Relógio analógico
- [x] Busca da previsão do tempo pelo nome da cidade
- [x] Autocomplete de cidades (sugestões enquanto digita, com debounce)
- [ ] Guardar latitude, longitude, estado e país para diferenciar cidades com o mesmo nome
- [ ] Busca por voz
- [x] Mostrar o clima na tela (temperatura, descrição, ícone)
- [ ] Tratamento de erros (cidade não encontrada, sem internet)

## Tecnologias
- HTML
- CSS
- JavaScript
- API [OpenWeather](https://openweathermap.org/api)

## Como rodar

1. Clone o repositório:
```bash
   git clone https://github.com/th4ylor/weather.git
   cd weather
```

2. Crie uma conta gratuita na [OpenWeather](https://openweathermap.org/api), gere sua chave de API e coloque no `script.js`.

3. Abra o `index.html` no navegador (ou use a extensão **Live Server** do VS Code).

> A busca por voz depende do navegador e pede permissão para usar o microfone. Ela costuma funcionar melhor no Chrome.

## Estrutura do projeto

```
weather/
├── index.html   # estrutura da página
├── style.css    # visual
├── script.js    # lógica em JavaScript
├── img/         # ícones e imagens
└── .github/     # workflows do GitHub
```

## Próximos passos

- Terminar as funcionalidades que ainda estão pendentes na lista acima
- Mostrar mais informações do clima (umidade, vento, sensação térmica)
- Deixar o layout responsivo para celular

## Autor
Feito por [th4ylor](https://github.com/th4ylor) como projeto de estudo.
