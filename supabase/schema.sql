-- Create profiles table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own profile
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Create policy for users to update their own profile
CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Create modules table
CREATE TABLE public.modules (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to view modules
CREATE POLICY "Anyone can view modules" 
  ON public.modules 
  FOR SELECT 
  USING (true);

-- Create phases table
CREATE TABLE public.phases (
  id SERIAL PRIMARY KEY,
  module_id INTEGER REFERENCES public.modules(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('multiple_choice', 'code_completion')),
  content JSONB NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.phases ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to view phases
CREATE POLICY "Anyone can view phases" 
  ON public.phases 
  FOR SELECT 
  USING (true);

-- Create user progress table
CREATE TABLE public.user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  phase_id INTEGER REFERENCES public.phases(id) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  score INTEGER DEFAULT 0,
  attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, phase_id)
);

-- Enable RLS
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own progress
CREATE POLICY "Users can view their own progress" 
  ON public.user_progress 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for users to update their own progress
CREATE POLICY "Users can update their own progress" 
  ON public.user_progress 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own progress
CREATE POLICY "Users can insert their own progress" 
  ON public.user_progress 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create achievements table
CREATE TABLE public.achievements (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  type TEXT NOT NULL CHECK (type IN ('module_completion', 'special', 'streak')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Create policy for anyone to view achievements
CREATE POLICY "Anyone can view achievements" 
  ON public.achievements 
  FOR SELECT 
  USING (true);

-- Create user achievements table
CREATE TABLE public.user_achievements (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  achievement_id INTEGER REFERENCES public.achievements(id) NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, achievement_id)
);

-- Enable RLS
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own achievements
CREATE POLICY "Users can view their own achievements" 
  ON public.user_achievements 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own achievements
CREATE POLICY "Users can insert their own achievements" 
  ON public.user_achievements 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create AI conversations table
CREATE TABLE public.ai_conversations (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  messages JSONB DEFAULT '[]'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

-- Create policy for users to view their own conversations
CREATE POLICY "Users can view their own conversations" 
  ON public.ai_conversations 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy for users to update their own conversations
CREATE POLICY "Users can update their own conversations" 
  ON public.ai_conversations 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy for users to insert their own conversations
CREATE POLICY "Users can insert their own conversations" 
  ON public.ai_conversations 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Insert initial data for modules
INSERT INTO public.modules (title, description, order_index, image_url) VALUES
('HTML', 'Fundamentos da estrutura web', 1, '/images/html.jpg'),
('CSS', 'Estilização e design', 2, '/images/css.jpg'),
('JavaScript', 'Interatividade e lógica', 3, '/images/javascript.jpg');

-- Insert initial data for HTML phases
INSERT INTO public.phases (module_id, title, description, type, content, order_index) VALUES
(1, 'Introdução ao HTML', 'Aprenda o que é HTML e para que serve', 'multiple_choice', 
 '{"question": "O que significa a sigla HTML?", "options": ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], "correctAnswer": 0, "explanation": "HTML significa Hyper Text Markup Language (Linguagem de Marcação de Hipertexto). É a linguagem padrão para criar páginas web."}', 1),
 
(1, 'Estrutura Básica', 'Aprenda a estrutura básica de um documento HTML', 'code_completion',
 '{"question": "Complete o código abaixo para criar uma estrutura básica de HTML com um título \"Minha Primeira Página\" e um parágrafo dizendo \"Olá, mundo!\"", "initialCode": "<!DOCTYPE html>\n<html>\n  <head>\n    <!-- Adicione o título aqui -->\n  </head>\n  <body>\n    <!-- Adicione o parágrafo aqui -->\n  </body>\n</html>", "expectedOutput": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Minha Primeira Página</title>\n  </head>\n  <body>\n    <p>Olá, mundo!</p>\n  </body>\n</html>", "previewHtml": "<p>Olá, mundo!</p>"}', 2),
 
(1, 'Elementos de Texto', 'Aprenda sobre os elementos de texto em HTML', 'multiple_choice',
 '{"question": "Qual tag HTML é usada para criar o maior título?", "options": ["<h1>", "<heading>", "<title>", "<head>"], "correctAnswer": 0, "explanation": "A tag <h1> é usada para criar o maior título em uma página HTML. Os títulos vão de <h1> (o maior) até <h6> (o menor)."}', 3),
 
(1, 'Links e Imagens', 'Aprenda a adicionar links e imagens em HTML', 'code_completion',
 '{"question": "Complete o código abaixo para criar um link para \"https://www.exemplo.com\" com o texto \"Visite Exemplo\" e uma imagem com src \"imagem.jpg\" e alt \"Minha Imagem\"", "initialCode": "<!DOCTYPE html>\n<html>\n  <body>\n    <!-- Adicione o link aqui -->\n    \n    <!-- Adicione a imagem aqui -->\n    \n  </body>\n</html>", "expectedOutput": "<!DOCTYPE html>\n<html>\n  <body>\n    <a href=\"https://www.exemplo.com\">Visite Exemplo</a>\n    \n    <img src=\"imagem.jpg\" alt=\"Minha Imagem\">\n    \n  </body>\n</html>", "previewHtml": "<a href=\"https://www.exemplo.com\">Visite Exemplo</a><br><img src=\"/placeholder.svg?height=150&width=300\" alt=\"Minha Imagem\" style=\"max-width: 100%;\">"}', 4),
 
(1, 'Listas', 'Aprenda a criar listas ordenadas e não ordenadas', 'multiple_choice',
 '{"question": "Qual tag é usada para criar uma lista não ordenada?", "options": ["<ul>", "<ol>", "<li>", "<list>"], "correctAnswer": 0, "explanation": "A tag <ul> (Unordered List) é usada para criar listas não ordenadas, geralmente com marcadores. Os itens da lista são definidos com a tag <li>."}', 5),
 
(1, 'Tabelas', 'Aprenda a criar tabelas em HTML', 'code_completion',
 '{"question": "Complete o código abaixo para criar uma tabela com 2 linhas e 2 colunas, contendo os dados: \"Nome\" e \"Idade\" no cabeçalho, e \"João\" e \"25\" na primeira linha de dados.", "initialCode": "<!DOCTYPE html>\n<html>\n  <body>\n    <!-- Crie a tabela aqui -->\n    \n  </body>\n</html>", "expectedOutput": "<!DOCTYPE html>\n<html>\n  <body>\n    <table>\n      <tr>\n        <th>Nome</th>\n        <th>Idade</th>\n      </tr>\n      <tr>\n        <td>João</td>\n        <td>25</td>\n      </tr>\n    </table>\n  </body>\n</html>", "previewHtml": "<table border=\"1\" style=\"border-collapse: collapse;\"><tr><th style=\"padding: 8px;\">Nome</th><th style=\"padding: 8px;\">Idade</th></tr><tr><td style=\"padding: 8px;\">João</td><td style=\"padding: 8px;\">25</td></tr></table>"}', 6),
 
(1, 'Formulários', 'Aprenda a criar formulários em HTML', 'multiple_choice',
 '{"question": "Qual atributo é necessário em um elemento <input> para especificar o nome do campo que será enviado?", "options": ["name", "id", "value", "type"], "correctAnswer": 0, "explanation": "O atributo \"name\" é necessário para identificar o campo quando o formulário é enviado. Sem ele, o valor do campo não será incluído nos dados do formulário."}', 7),
 
(1, 'Semântica HTML5', 'Aprenda sobre os elementos semânticos do HTML5', 'code_completion',
 '{"question": "Complete o código abaixo usando elementos semânticos HTML5 para criar uma página com cabeçalho, navegação, seção principal e rodapé.", "initialCode": "<!DOCTYPE html>\n<html>\n  <body>\n    <!-- Adicione o cabeçalho aqui -->\n    \n    <!-- Adicione a navegação aqui -->\n    \n    <!-- Adicione a seção principal aqui -->\n    \n    <!-- Adicione o rodapé aqui -->\n    \n  </body>\n</html>", "expectedOutput": "<!DOCTYPE html>\n<html>\n  <body>\n    <header>\n      <h1>Meu Site</h1>\n    </header>\n    \n    <nav>\n      <ul>\n        <li><a href=\"#\">Home</a></li>\n        <li><a href=\"#\">Sobre</a></li>\n        <li><a href=\"#\">Contato</a></li>\n      </ul>\n    </nav>\n    \n    <main>\n      <h2>Conteúdo Principal</h2>\n      <p>Este é o conteúdo principal da página.</p>\n    </main>\n    \n    <footer>\n      <p>&copy; 2023 Meu Site</p>\n    </footer>\n  </body>\n</html>", "previewHtml": "<div style=\"border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;\"><h1>Meu Site</h1></div><div style=\"border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;\"><ul style=\"display: flex; list-style: none; gap: 20px; padding: 0;\"><li><a href=\"#\">Home</a></li><li><a href=\"#\">Sobre</a></li><li><a href=\"#\">Contato</a></li></ul></div><div style=\"border: 1px solid #ddd; padding: 10px; margin-bottom: 10px;\"><h2>Conteúdo Principal</h2><p>Este é o conteúdo principal da página.</p></div><div style=\"border: 1px solid #ddd; padding: 10px;\"><p>&copy; 2023 Meu Site</p></div>"}', 8),
 
(1, 'Atributos Globais', 'Aprenda sobre os atributos globais em HTML', 'multiple_choice',
 '{"question": "Qual atributo global é usado para adicionar um identificador único a um elemento HTML?", "options": ["id", "class", "name", "data"], "correctAnswer": 0, "explanation": "O atributo \"id\" é usado para especificar um identificador único para um elemento HTML. Cada id deve ser único dentro da página."}', 9),
 
(1, 'Projeto Final', 'Crie uma página HTML completa aplicando todos os conceitos aprendidos', 'code_completion',
 '{"question": "Complete o código abaixo para criar uma página HTML completa sobre um hobby ou interesse seu. Inclua título, parágrafos, imagens, links, listas e pelo menos um elemento semântico HTML5.", "initialCode": "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Meu Hobby</title>\n  </head>\n  <body>\n    <!-- Crie sua página aqui -->\n    \n  </body>\n</html>", "expectedOutput": "", "previewHtml": "<h1>Exemplo de Página Completa</h1><p>Esta é uma visualização simplificada do que sua página poderia parecer.</p><img src=\"/placeholder.svg?height=150&width=300\" alt=\"Hobby\" style=\"max-width: 100%;\"><h2>Por que eu gosto deste hobby</h2><ul><li>É divertido</li><li>Aprendo coisas novas</li><li>Conheço pessoas</li></ul><p>Saiba mais em <a href=\"#\">este link</a>.</p>"}', 10);

-- Insert initial achievements
INSERT INTO public.achievements (title, description, image_url, type) VALUES
('Mestre do HTML', 'Completou o módulo de HTML', '/images/achievements/html-master.png', 'module_completion'),
('Estilista CSS', 'Completou o módulo de CSS', '/images/achievements/css-stylist.png', 'module_completion'),
('Programador JavaScript', 'Completou o módulo de JavaScript', '/images/achievements/js-programmer.png', 'module_completion'),
('Primeira Fase', 'Completou sua primeira fase', '/images/achievements/first-phase.png', 'special'),
('Estudante Dedicado', 'Completou 5 fases seguidas', '/images/achievements/dedicated.png', 'streak');
