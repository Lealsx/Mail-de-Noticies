import axios from 'axios';
import nodemailer from 'nodemailer';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Configuração das APIs puxando do .env
const newsApiKey = process.env.NEWS_API_KEY;
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// 1. Busca as notícias
async function fetchNews() {
    // Usando a NewsAPI como fonte gratuita (busca notícias de tecnologia no Brasil)
    const url = `https://newsapi.org/v2/top-headlines?category=technology&country=br&apiKey=${newsApiKey}`;
    const response = await axios.get(url);
    
    // Pega apenas as 4 primeiras notícias para o e-mail não ficar gigante
    return response.data.articles.slice(0, 4); 
}

// 2. IA gera o resumo do e-mail
async function summarizeWithAI(articles: any[]) 
{const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash" });
    
let prompt = "Você é o meu assistente pessoal de tecnologia. Faça um resumo rápido e direto das seguintes notícias de TI para mim. Destaque os pontos mais técnicos e relevantes, use tópicos para facilitar a leitura matinal e no final de cada noticia quero o link:\n\n";
    articles.forEach(a => {
        prompt += `- Título: ${a.title}\n- Descrição: ${a.description}\n- Link: ${a.url}\n\n`;
    });

    const result = await model.generateContent(prompt);
    return result.response.text();
}

// 3. Dispara o e-mail
async function sendEmail(emailBody: string) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Seu e-mail
            pass: process.env.EMAIL_PASS  // Sua Senha de Aplicativo
        }
    });

    await transporter.sendMail({
        from: `"Radar Tech IA" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // E-mail de quem vai receber (pode colocar o seu para testar)
        subject:" Resumo de TI: Principais tendências do mercado",
        text: emailBody, 
    });
}

//  Orquestrador Principal
async function main() {
    try {
        console.log(" 1. Buscando notícias mais recentes...");
        const news = await fetchNews();

        console.log(" 2. Processando resumo executivo com Inteligência Artificial...");
        const aiSummary = await summarizeWithAI(news);

        console.log(" 3. Disparando e-mail...");
        await sendEmail(aiSummary);

        console.log(" Processo concluído com sucesso! E-mail enviado.");
    } catch (error) {
        console.error(" Ocorreu um erro durante a execução:", error);
    }
}

// Executa o script
main();