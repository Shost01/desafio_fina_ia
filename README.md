# App do Tempo

Este é um aplicativo web simples e moderno para consultar a previsão do tempo atual e dos próximos 5 dias em qualquer cidade do mundo, utilizando a API Open-Meteo.

## Funcionalidades

- Busca de cidade por nome (com geolocalização automática via Nominatim/OpenStreetMap)
- Exibição do clima atual: temperatura, vento, condição do tempo (com ícone)
- Previsão dos próximos 5 dias: máxima, mínima, vento e ícone para cada dia
- Layout responsivo, visual moderno e amigável
- Ícone de lupa no botão de busca

## Tecnologias Utilizadas

- HTML5, CSS3 (responsivo e estilizado)
- JavaScript puro (ES6+)
- [Open-Meteo API](https://open-meteo.com/) para dados meteorológicos
- [Nominatim API](https://nominatim.openstreetmap.org/) para conversão de nome de cidade em coordenadas

## Como usar

1. Clone este repositório:
   ```bash
   git clone <url-do-repo>
   ```
2. Abra o arquivo `index.html` em seu navegador.
3. Digite o nome de uma cidade e clique no ícone de lupa para buscar.
4. Veja o clima atual e a previsão dos próximos 5 dias.

## Estrutura do Projeto

```
├── css/
│   └── style.css
├── script/
│   └── app.js
├── index.html
└── README.md
```

## Observações
- Não é necessário backend ou instalação de dependências.
- O app consome APIs públicas e pode estar sujeito a limites de uso.
- Para publicar online, basta hospedar os arquivos em qualquer serviço de hospedagem estática (GitHub Pages, Vercel, Netlify, etc).

## Exemplo de uso

![Exemplo do App do Tempo](screenshot.png)

---
Desenvolvido por [Seu Nome].
