# Radar Tech: News Digest com IA Generativa

O **Radar Tech** é uma automação inteligente desenvolvida para otimizar o consumo de notícias de tecnologia. O sistema busca as notícias mais relevantes das últimas 24 horas, utiliza inteligência artificial para resumir os pontos principais e envia um relatório executivo diretamente para o seu e-mail pessoal.

O projeto opera de forma 100% **Serverless**, utilizando o GitHub Actions para rodar de forma agendada e gratuita.

## Tecnologias Utilizadas

- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Runtime:** [Node.js](https://nodejs.org/) com [TSX](https://tsx.is/)
- **IA Generativa:** [Google Gemini API](https://aistudio.google.com/) (Modelo 2.5-Flash)
- **Dados:** [NewsAPI](https://newsapi.org/)
- **Comunicação:** [Nodemailer](https://nodemailer.com/) via SMTP
- **Automação/CI:** [GitHub Actions](https://github.com/features/actions)

## Funcionalidades

- **Captura Inteligente:** Consome a NewsAPI para filtrar as manchetes mais quentes de tecnologia.
- **Resumo com IA:** Processa os dados brutos através do Gemini, gerando um texto amigável, direto e com emojis.
- **Despacho Automatizado:** Envia um e-mail formatado para o usuário.
- **Execução Agendada:** Configurado para rodar diariamente via CRON job no GitHub Actions.
