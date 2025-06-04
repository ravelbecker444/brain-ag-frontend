# Brain Agriculture - Sistema de Gerenciamento de Produtores Rurais

### Comentários
Só gostaria de primeiramente agradecer a oportunidade, honestamente
já havia um tempo que não precisava fazer algo novo e do 0 dessa maneira
e gostei muito de relembrar a experiência!

Ferramentas de AI utilizadas: Deepseek e GitHub Copilot

## 📌 Visão Geral

Solução completa para cadastro e análise de dados de produtores rurais, proporcionando:

- Gestão centralizada de informações agrícolas
- Dashboard interativo com métricas estratégicas
- Validação automática de documentos e áreas
- Relatórios personalizados por safra e cultura

## ✨ Funcionalidades Principais

### 👨‍🌾 Cadastro de Produtores
- Validação automática de CPF/CNPJ
- Cadastro de múltiplas propriedades por produtor
- Gestão de culturas por safra agrícola
- Controle de áreas (total, agricultável e vegetação)

### 📊 Dashboard Analítico
- **Resumo Geral**:
  - Total de fazendas cadastradas
  - Área total em hectares
- **Gráficos Interativos**:
  - Distribuição geográfica por estado
  - Proporção de culturas plantadas
  - Uso do solo (agricultável vs vegetação)

### 🔧 Ferramentas Técnicas
- API RESTful documentada

## 🛠️ Tecnologias Utilizadas

### Backend
| Tecnologia       | Descrição                          |
|------------------|------------------------------------|
| NodeJS           | Linguagem principal                |
| NestJS           | Framework                          |
| PostgreSQL       | Banco de dados relacional          |
| Docker           | Contêinerização da aplicação       |

### Frontend (opcional)
| Tecnologia       | Descrição                          |
|------------------|------------------------------------|
| React.js         | Biblioteca frontend                |
| TypeScript       | Tipagem estática                   |

## 🚀 Como Executar o Projeto


### Pré-requisitos
- Docker 20.10+
- Docker Compose 1.29+

### Instalação via Docker (recomendado)
```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/brain-agriculture.git
cd brain-agriculture

# 2. Inicie os containers
docker-compose up -d

# 3. Acesse os serviços:
# API: http://localhost:3000
# Frontend: http://localhost:3001
# Docs: http://localhost:3000/api



