# Anamnese Integrativa - Estrutura Modular

## 📋 Visão Geral

A Anamnese Integrativa foi reestruturada em módulos organizados por grupos de informação, proporcionando melhor manutenibilidade, reutilização e organização do código.

## 🏗️ Estrutura dos Módulos

### 📁 `/components/anamnese/`

#### 1. **DadosPessoais.jsx** - Etapa 1
- Nome completo, idade, gênero
- Profissão, estado civil
- Endereço, telefone, email
- **Campos obrigatórios:** Nome, idade, gênero

#### 2. **QueixaPrincipal.jsx** - Etapa 2
- Descrição da queixa principal
- Início e evolução dos sintomas
- Fatores de alívio e piora
- Intensidade e características da dor
- **Campo obrigatório:** Queixa principal

#### 3. **HistoriaMedica.jsx** - Etapa 3
- Medicamentos em uso atual
- Alergias conhecidas
- Cirurgias e hospitalizações
- Doenças anteriores
- Exames recentes
- Status de vacinação

#### 4. **HistoriaFamiliar.jsx** - Etapa 4
- História familiar de doenças
- Doenças hereditárias/genéticas
- Histórico específico de câncer
- Doenças cardiovasculares na família
- Diabetes e hipertensão familiar

#### 5. **HabitosVida.jsx** - Etapa 5
- Tabagismo e consumo de álcool
- Atividade física e alimentação
- Qualidade e padrão do sono
- Nível de estresse
- Uso de drogas ilícitas
- Fatores de estresse

#### 6. **RevisaoSistemas.jsx** - Etapa 6
- Sistema cardiovascular
- Sistema respiratório
- Sistema digestivo
- Sistema geniturinário
- Sistema neurológico
- Sistema musculoesquelético
- Pele e anexos
- Sistema endócrino

#### 7. **QuestoesFemininas.jsx** - Etapa 7 (Condicional)
- Ciclo menstrual e menarca
- História reprodutiva (gestações, partos, abortos)
- Menopausa e terapia hormonal
- Métodos contraceptivos
- Exames ginecológicos
- Sintomas relacionados ao ciclo

#### 8. **QuestoesMasculinas.jsx** - Etapa 7 (Condicional)
- Problemas prostáticos
- Sintomas urinários e noturnos
- Função sexual (disfunção erétil, libido)
- Exames da próstata (PSA, toque retal)
- Autoexame testicular
- Histórico urológico

## 🔧 Características Técnicas

### **Auto-salvamento Inteligente**
- Salvamento automático a cada 300ms após alterações
- Persistência no localStorage
- Recuperação automática ao recarregar a página
- Indicador visual de status de salvamento

### **Validação e Navegação**
- Validação de campos obrigatórios
- Navegação condicional baseada no gênero
- Botões de navegação dinâmicos
- Barra de progresso visual

### **Responsividade**
- Layout adaptativo para mobile e desktop
- Grid responsivo para campos lado a lado
- Tipografia otimizada para diferentes telas

## 🎨 Estilos e UX

### **CSS Modular** (`anamnese-modules.css`)
- Estilos específicos para cada módulo
- Diferenciação visual por gênero
- Animações suaves de transição
- Cores e tipografia consistentes

### **Experiência do Usuário**
- Indicadores visuais para campos obrigatórios
- Placeholders informativos
- Feedback visual para interações
- Navegação intuitiva

## 🚀 Vantagens da Estrutura Modular

### **Manutenibilidade**
- Código organizado por responsabilidade
- Fácil localização de funcionalidades
- Isolamento de bugs e problemas

### **Reutilização**
- Módulos podem ser reutilizados em outros contextos
- Componentes independentes e testáveis
- Fácil extensão com novos módulos

### **Performance**
- Carregamento otimizado
- Bundle splitting natural
- Re-renderização eficiente

### **Escalabilidade**
- Fácil adição de novos campos
- Extensão por gênero ou especialidade
- Configuração flexível

## 🔄 Fluxo de Dados

1. **Inicialização:** Carregamento dos dados salvos do localStorage
2. **Navegação:** Controle de etapas com validação
3. **Entrada:** Captura e processamento de dados do usuário
4. **Persistência:** Auto-salvamento contínuo
5. **Finalização:** Salvamento final e marcação como concluída

## 📱 Compatibilidade

- ✅ React 19+
- ✅ Navegadores modernos
- ✅ Mobile e tablet
- ✅ Modo offline (localStorage)

## 🔐 Segurança e Privacidade

- Dados armazenados localmente no dispositivo
- Não há transmissão automática de dados
- Controle total do usuário sobre as informações
- Opção de limpeza de dados

---

**Desenvolvido com foco na experiência médica e do paciente** 🏥
