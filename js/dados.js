/* =========================================================
   Conteúdo do jogo: personagens, capítulos, desafios, glossário,
   cartões interdisciplinares e restauração da mansão.
   Base: Pauta Formativa 9 — Técnico em Meio Ambiente
   "Vocabulário em diferentes contextos profissionais".
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;

  // ---------- personagens (voz + aparência) ----------
  // edge: voz neural gratuita usada na gravação; azure: voz própria preferida, se o serviço oferecer
  MI.PERSONAGENS = {
    marta: {
      nome: 'Profa. Marta Siqueira', papel: 'Técnica em Meio Ambiente e orientadora',
      voz: { genero: 'F', edge: 'pt-BR-FranciscaNeural', rate: '+0%', ritmo: 1 },
      visual: { pele: '#8d5a3b', cabelo: '#1f1612', estilo: 'cacheado', roupa: '#1f6f6b', gola: '#f4e9d4', oculos: true, brinco: '#e0b23c', idade: 'adulta' },
    },
    helena: {
      nome: 'Dona Helena Ipê', papel: 'Proprietária do Solar do Ipê',
      voz: { genero: 'F', edge: 'pt-BR-ThalitaNeural', rate: '-8%', ritmo: 0.92 },
      visual: { pele: '#f0cfb4', cabelo: '#e8e4dc', estilo: 'coque', roupa: '#7a2335', gola: '#f6efe4', colar: true, idade: 'idosa' },
    },
    benedito: {
      nome: 'Seu Benedito', papel: 'Caseiro e jardineiro há 40 anos',
      voz: { genero: 'M', edge: 'pt-BR-AntonioNeural', azure: 'pt-BR-HumbertoNeural', rate: '-6%', ritmo: 0.94 },
      visual: { pele: '#5e3a24', cabelo: '#cfcac2', estilo: 'chapeuPalha', roupa: '#4f6b3a', gola: '#d9c79b', barba: '#d8d3ca', idade: 'idoso' },
    },
    tiago: {
      nome: 'Tiago Lima', papel: 'Estudante do Técnico em Meio Ambiente',
      voz: { genero: 'M', edge: 'pt-BR-AntonioNeural', azure: 'pt-BR-JulioNeural', rate: '+4%', ritmo: 1.04 },
      visual: { pele: '#b9825a', cabelo: '#2a1b12', estilo: 'curtoCacheado', roupa: '#d08a2c', gola: '#3b3b3b', idade: 'jovem' },
    },
    lucia: {
      nome: 'Dra. Lúcia Prado', papel: 'Química responsável pelo laboratório',
      voz: { genero: 'F', edge: 'pt-BR-ThalitaNeural', rate: '+0%', ritmo: 1 },
      visual: { pele: '#e8c19c', cabelo: '#111', estilo: 'chanel', roupa: '#f7f7f4', gola: '#5aa0b8', oculosProtecao: true, idade: 'adulta' },
    },
    rafael: {
      nome: 'Rafael Torres', papel: 'Repórter da Folha do Ipê',
      voz: { genero: 'M', edge: 'pt-BR-AntonioNeural', azure: 'pt-BR-DonatoNeural', rate: '+8%', ritmo: 1.07 },
      visual: { pele: '#d9a47c', cabelo: '#3a2416', estilo: 'chapeuCoco', roupa: '#5b4a8a', gola: '#f0e8d8', bigode: '#3a2416', idade: 'adulto' },
    },
  };
  // narração dos desafios
  MI.NARRADOR = 'marta';

  MI.PROTOCOLO = {
    1: 'Termo + contexto',
    2: 'Ajuste + justificativa',
    3: 'Conexão interdisciplinar',
    4: 'Mediação pedagógica',
    c: 'Checagem',
    r: 'Registro',
    p: 'Palavra e contexto',
  };

  // ---------- capítulos ----------
  MI.CAPITULOS = [
    {
      id: 'hall', num: 1, titulo: 'O convite', comodo: 'Hall de Entrada', contexto: 'Relatos e primeiras impressões',
      cena: 'hall', musica: 'hall',
      resumo: 'Dona Helena jura que o lago foi envenenado. Antes de concluir qualquer coisa, reúna o kit de investigação e aprenda a separar relatos, observações e conclusões.',
      intro: [
        { p: 'marta', t: '{nome}, chegamos ao Solar do Ipê. Esta mansão foi construída em 1928, e o lago nos fundos dá nome ao bairro inteiro.' },
        { p: 'helena', t: 'Que alívio ver vocês! Meu lago está envenenado, tenho certeza. Os peixes sumiram e o cheiro chega até a varanda.' },
        { p: 'benedito', t: 'Com todo o respeito, Dona Helena, pra mim a culpa é da fábrica do outro lado da estrada.' },
        { p: 'marta', t: 'Cada relato é importante, mas relato ainda não é evidência. Antes de qualquer conclusão, precisamos do nosso material de investigação.' },
        { p: 'marta', t: '{nome}, o kit de campo ficou espalhado pelo hall. Encontre os objetos da lista tocando neles na cena.' },
      ],
      meio: [
        { p: 'tiago', t: 'Cheguei! Desculpem o atraso. Achei o mapa da propriedade: o lago recebe água de um córrego que passa pela horta e pelo bairro.' },
        { p: 'marta', t: 'Ótimo, Tiago. Isso é informação de contexto: ajuda a pensar em hipóteses, mas não aponta culpados.' },
        { p: 'marta', t: 'Antes de irmos ao lago, vamos treinar uma habilidade essencial: separar relatos, observações e conclusões.' },
      ],
      desafio: {
        titulo: 'Relato, observação ou conclusão?',
        passos: [
          {
            tipo: 'classificar', rotulo: 'c',
            enunciado: 'Classifique cada frase anotada na chegada à mansão.',
            categorias: [
              { id: 'rel', nome: 'Relato' },
              { id: 'obs', nome: 'Observação' },
              { id: 'con', nome: 'Conclusão sem evidência' },
            ],
            itens: [
              { t: 'Dona Helena contou que os peixes deixaram de aparecer há cerca de duas semanas.', c: 'rel', porque: 'É a informação de uma pessoa, atribuída a ela. Vale registrar como relato, citando a fonte.' },
              { t: 'Seu Benedito acredita que a fábrica é a responsável.', c: 'rel', porque: 'É a opinião de um morador. Pode orientar perguntas, mas não é dado.' },
              { t: 'O lago está envenenado.', c: 'con', porque: 'Envenenado afirma uma causa e um diagnóstico que nenhuma análise confirmou.' },
              { t: 'A fábrica é a culpada pelo problema.', c: 'con', porque: 'Aponta um responsável sem qualquer evidência coletada.' },
              { t: 'Às 8h40, a água junto ao píer apresentava coloração esverdeada.', c: 'obs', porque: 'Descreve o que foi percebido, com local e horário, sem interpretar.' },
              { t: 'O mapa mostra um córrego que deságua no lago pelo lado norte.', c: 'obs', porque: 'É uma informação verificável no documento consultado.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 'r',
            enunciado: 'Como registrar a fala de Dona Helena no caderno de campo?',
            opcoes: [
              { t: 'Segundo a proprietária, os peixes deixaram de ser vistos há cerca de duas semanas.', ok: true },
              { t: 'Os peixes do lago morreram há duas semanas, envenenados pela água contaminada.', porque: 'Transforma um relato em fato e ainda acrescenta uma causa que ninguém verificou.' },
              { t: 'A proprietária comprovou que o lago está envenenado e que não há mais peixes.', porque: 'Um relato não comprova. O verbo dá à fala um peso de evidência que ela não tem.' },
              { t: 'Os peixes sumiram do lago porque a água ficou verde nas últimas duas semanas.', porque: 'Cria uma relação de causa entre duas informações que ainda não foram investigadas.' },
            ],
            justificativa: {
              enunciado: 'Por que essa é a melhor forma de registro?',
              opcoes: [
                { t: 'Atribui a informação a quem a relatou e não a transforma em fato comprovado.', ok: true },
                { t: 'Usa mais palavras, e um texto mais longo é sempre mais técnico e mais preciso.', porque: 'O tamanho não define a precisão. O que importa é citar a fonte e não extrapolar.' },
                { t: 'Evita citar o nome de Dona Helena, para que o registro fique impessoal e neutro.', porque: 'Pelo contrário: a frase cita a fonte, segundo relato da proprietária.' },
                { t: 'Confirma a hipótese de envenenamento, mas de um jeito mais educado e respeitoso.', porque: 'Não confirma nada: registra o relato sem julgar se ele é verdadeiro.' },
              ],
            },
          },
          {
            tipo: 'escolha', rotulo: 4,
            enunciado: 'Seu Benedito insiste que a fábrica é a culpada. Que pergunta faz a conversa avançar sem desrespeitar o relato dele?',
            opcoes: [
              { t: 'O que o senhor observou que o faz pensar na fábrica? Podemos anotar e investigar.', ok: true },
              { t: 'O senhor não estudou química, então como pode ter certeza de que foi a fábrica?', porque: 'Desqualifica a pessoa. Relatos de moradores são valiosos e devem ser acolhidos.' },
              { t: 'Se o senhor tem certeza, então vamos registrar no relatório que foi a fábrica.', porque: 'Acolher não é aceitar como fato: a opinião vira registro de relato, não conclusão.' },
              { t: 'Por que o senhor não leva essa reclamação à prefeitura em vez de falar conosco?', porque: 'Encerra a conversa e desperdiça uma informação que pode orientar a investigação.' },
            ],
          },
        ],
      },
      fim: [
        { p: 'helena', t: 'Então o meu envenenado virou relato da proprietária? Confesso que soa mais justo.' },
        { p: 'marta', t: 'Exatamente, Dona Helena. A senhora pode estar certa ou não. É isso que vamos investigar.' },
        { p: 'marta', t: 'Próxima parada: o píer. Lá, nosso trabalho é observar, medir e registrar.' },
      ],
      cartoes: ['historia', 'sociologia'],
      glossario: ['relato', 'observacao', 'conclusao', 'evidencia'],
      evidencias: [
        'Relato da proprietária: peixes deixaram de ser vistos há cerca de duas semanas.',
        'Opinião de morador: suspeita sobre a fábrica (não verificada).',
        'Mapa: um córrego deságua no lago pelo lado norte, depois de passar pela horta e pelo bairro.',
      ],
    },

    {
      id: 'pier', num: 2, titulo: 'À beira do lago', comodo: 'Varanda e Píer', contexto: 'Campo — registro de observação',
      cena: 'pier', musica: 'pier', cartao: 'Cartão 1 · Campo',
      resumo: 'No campo, a regra é observar, medir e registrar sem antecipar conclusões. Encontre os equipamentos, faça a medição e revise o registro do Tiago.',
      intro: [
        { p: 'benedito', t: 'Foi aqui no píer que senti o cheiro mais forte. A água ficou verde que nem sopa de ervilha!' },
        { p: 'marta', t: 'No campo, a regra é observar, medir e registrar, sem antecipar conclusões. Para isso, precisamos dos equipamentos certos.' },
        { p: 'marta', t: '{nome}, encontre o medidor de oxigênio, o disco de Secchi, o GPS e os outros itens espalhados pela varanda e pelo píer.' },
      ],
      meio: [
        { p: 'marta', t: 'Medição feita no ponto P1, junto ao píer, às 9h15: 2,1 mg/L de oxigênio dissolvido. As coordenadas ficaram registradas no GPS.' },
        { p: 'tiago', t: 'Então está provado! Já escrevi no relatório: o Lago do Ipê está contaminado porque a água estava esverdeada e apresentava odor.' },
        { p: 'marta', t: 'Será, Tiago? Vamos analisar sua frase com o protocolo das quatro decisões: termo, ajuste, conexão e mediação.' },
      ],
      desafio: {
        titulo: 'Observação ou conclusão?',
        frase: 'O Lago do Ipê está contaminado porque a água estava esverdeada e apresentava odor.',
        passos: [
          {
            tipo: 'escolha', rotulo: 'c',
            enunciado: 'Antes de tudo: o que significa o registro de 2,1 mg/L de OD no ponto P1?',
            opcoes: [
              { t: 'Havia 2,1 miligramas de oxigênio dissolvido por litro, naquele ponto e naquele momento.', ok: true },
              { t: 'O lago inteiro tem 2,1 miligramas de oxigênio dissolvido, em qualquer ponto e horário.', porque: 'A medição vale para um ponto e um momento. O oxigênio varia com o local, a profundidade e a hora do dia.' },
              { t: 'A água do lago tem 2,1 litros de oxigênio dissolvido para cada miligrama de algas.', porque: 'A unidade mg/L significa miligramas por litro de água. Não envolve algas.' },
              { t: 'O oxigênio dissolvido no ponto P1 caiu 2,1 miligramas por litro desde a semana passada.', porque: 'Não houve medição anterior: o número é um valor medido, não uma variação.' },
            ],
          },
          {
            tipo: 'marcar', rotulo: 1,
            enunciado: 'Toque na expressão que merece atenção neste registro de campo.',
            partes: ['O Lago do Ipê', 'está contaminado', 'porque a água', 'estava esverdeada', 'e apresentava odor.'],
            corretas: [1],
            explica: 'Está contaminado é uma conclusão. Contaminação exigiria análises de laboratório e comparação com padrões. No campo, cor e cheiro são observações.',
            erro: 'Essa parte descreve o que foi percebido ou situa o local. O problema está na afirmação que vai além das evidências.',
          },
          {
            tipo: 'escolha', rotulo: 2,
            enunciado: 'Como reescrever o registro de campo?',
            opcoes: [
              { t: 'A água apresentava cor esverdeada e odor perceptível junto ao píer (ponto P1), às 9h15.', ok: true },
              { t: 'A água do lago está poluída, esverdeada e com um mau cheiro muito forte junto ao píer.', porque: 'Troca contaminada por poluída, mas continua afirmando um diagnóstico sem análise.' },
              { t: 'O lago parece contaminado, pois a água estava muito verde e fedida perto do píer, às 9h15.', porque: 'Parece contaminado ainda sugere conclusão, e fedida é vago para um registro técnico.' },
              { t: 'A cor esverdeada e o odor observados às 9h15 comprovam a contaminação no ponto P1.', porque: 'Cor e odor são indícios, não comprovação. O verbo comprovam extrapola os dados.' },
            ],
            justificativa: {
              enunciado: 'Que evidência sustenta essa decisão?',
              opcoes: [
                { t: 'Descreve o que foi percebido, com local e horário, sem afirmar causa ou diagnóstico.', ok: true },
                { t: 'Evita falar do cheiro, porque um odor não pode ser medido nem registrado no campo.', porque: 'Ela registra o odor, sim. Observações sensoriais entram no registro, descritas com cuidado.' },
                { t: 'É mais curta que a original e usa palavras mais difíceis, o que a torna mais técnica.', porque: 'Precisão não é usar palavras difíceis: é dizer exatamente o que os dados permitem.' },
                { t: 'Confirma a contaminação da água, só que de um jeito mais elegante e mais técnico.', porque: 'Ela não confirma contaminação: apenas descreve a observação.' },
              ],
            },
          },
          {
            tipo: 'multi', rotulo: 3, n: 2,
            enunciado: 'Quais duas áreas mais contribuem para melhorar esse registro? Escolha duas.',
            opcoes: [
              { t: 'Geografia: localizar e descrever o trecho observado, com coordenadas e pontos de referência.', ok: true },
              { t: 'Língua Portuguesa: diferenciar verbos que descrevem, como apresentava, de verbos que concluem.', ok: true },
              { t: 'Matemática: calcular a média do oxigênio dissolvido usando apenas a medição de 2,1 mg/L.', porque: 'Uma média com um único valor não acrescenta informação.' },
              { t: 'Artes: enfeitar o caderno de campo com desenhos coloridos para chamar a atenção de quem lê.', porque: 'Recursos visuais ajudam quando comunicam dados sem distorcer, não como enfeite.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 4,
            enunciado: 'Que pergunta você faria ao Tiago para que ele mesmo revise a frase?',
            opcoes: [
              { t: 'Que evidência permitiria passar da observação para a afirmação de contaminação?', ok: true },
              { t: 'Você não sabia que contaminado é uma palavra proibida em qualquer relatório técnico?', porque: 'Nenhuma palavra é proibida; ela só precisa de evidências. A pergunta constrange e não ensina.' },
              { t: 'Por que você não copiou a frase pronta do livro de consulta, que já está correta?', porque: 'Copiar sem discutir o significado foi justamente uma das dificuldades da turma.' },
              { t: 'Qual palavra soa mais bonita e mais técnica para colocar no lugar de contaminado?', porque: 'O critério é a precisão em relação aos dados, não a sonoridade.' },
            ],
          },
        ],
      },
      fim: [
        { p: 'tiago', t: 'Entendi. No campo, eu escrevo apresentava, e não comprova. A conclusão, se vier, vem depois.' },
        { p: 'marta', t: 'Isso! E guarde bem: 2,1 mg/L num ponto e num momento. Agora vamos ao escritório organizar esses dados.' },
      ],
      cartoes: ['geografia', 'portugues'],
      glossario: ['registro_campo', 'oxigenio_dissolvido', 'mgl', 'ponto_coleta', 'coordenadas', 'secchi'],
      evidencias: [
        'P1 (píer), 14/10, 9h15: OD = 2,1 mg/L — medição única.',
        'Observação: coloração esverdeada e odor perceptível junto ao píer.',
        'Disco de Secchi deixou de ser visto a 0,4 m de profundidade no P1 (transparência baixa).',
      ],
    },

    {
      id: 'escritorio', num: 3, titulo: 'Os números do escritório', comodo: 'Escritório', contexto: 'Escritório — sistematização de dados',
      cena: 'escritorio', musica: 'escritorio', cartao: 'Cartão 2 · Escritório',
      resumo: 'Organizar informações é separar dados de interpretações. Encontre os registros antigos e descubra se uma única medição pode mostrar uma tendência.',
      intro: [
        { p: 'helena', t: 'Este era o escritório do meu pai. Ele anotava tudo: a chuva, a temperatura e até a cor do lago!' },
        { p: 'marta', t: 'Que tesouro, Dona Helena! No escritório, organizamos as informações e separamos os dados das interpretações.' },
        { p: 'marta', t: '{nome}, procure os cadernos antigos, a calculadora, o pluviômetro e o material para montar a tabela.' },
      ],
      meio: [
        { p: 'helena', t: 'Achei! Nos cadernos do papai está escrito água verde em vários verões, desde 1958.' },
        { p: 'tiago', t: 'E eu já fiz a minha tabela. Escrevi: as medições comprovam que o oxigênio dissolvido está diminuindo a cada semana.' },
        { p: 'marta', t: 'Tiago, quantas medições de oxigênio nós temos?' },
        { p: 'tiago', t: 'Hum... uma só.' },
        { p: 'marta', t: 'Então vamos ao segundo cartão: uma medição mostra tendência?' },
      ],
      desafio: {
        titulo: 'Uma medição mostra tendência?',
        frase: 'As medições comprovam que o oxigênio dissolvido está diminuindo a cada semana.',
        passos: [
          {
            tipo: 'marcar', rotulo: 1,
            enunciado: 'Toque nas duas expressões que vão além do que os dados permitem.',
            partes: ['As medições', 'comprovam', 'que o oxigênio dissolvido', 'está diminuindo a cada semana.'],
            corretas: [1, 3],
            explica: 'Comprovam e está diminuindo a cada semana afirmam uma tendência. Com uma única medição, não há como saber se o oxigênio sobe, desce ou apenas varia ao longo do dia.',
            erro: 'Essa parte não é o problema principal. Procure o verbo forte e a afirmação sobre o tempo.',
            erros: { 0: 'Boa observação: o plural já é impreciso, pois houve só uma medição. Mas os problemas maiores estão no verbo e na ideia de tendência.' },
          },
          {
            tipo: 'escolha', rotulo: 2,
            enunciado: 'Como reescrever a frase da tabela?',
            opcoes: [
              { t: 'No P1, em 14/10, às 9h15, registrou-se 2,1 mg/L de OD. Avaliar tendência exige medições periódicas.', ok: true },
              { t: 'No P1, o oxigênio dissolvido caiu para 2,1 mg/L em 14/10 e vai continuar caindo nas próximas semanas.', porque: 'Afirma uma queda e ainda faz uma previsão, sem medições anteriores ou posteriores.' },
              { t: 'As medições do ponto P1 indicam que o oxigênio dissolvido está diminuindo, mas de forma lenta e gradual.', porque: 'Troca comprovam por indicam, mas continua falando em diminuição com um único dado.' },
              { t: 'Em 14/10, o oxigênio dissolvido estava baixo no P1, o que comprova a queda semanal registrada no lago.', porque: 'Mistura um dado, o valor baixo, com uma tendência, a queda semanal, que não foi medida.' },
            ],
            justificativa: {
              enunciado: 'Por que essa versão é mais rigorosa?',
              opcoes: [
                { t: 'Mantém valor, unidade, local e momento, e reconhece que um dado só não mostra variação.', ok: true },
                { t: 'Esconde o valor exato da medição para não assustar quem vai ler a tabela de dados.', porque: 'Ela mostra o valor. Ocultar dados nunca é a solução.' },
                { t: 'Usa a sigla OD e a unidade mg/L, o que deixa a frase automaticamente mais técnica.', porque: 'Siglas ajudam, mas a precisão vem de dados, unidades e limites claros.' },
                { t: 'Afirma que há uma tendência de queda, mas de uma forma mais discreta e cuidadosa.', porque: 'Ela não afirma tendência: indica o que seria preciso para avaliá-la.' },
              ],
            },
          },
          {
            tipo: 'escolha', rotulo: 'c',
            enunciado: 'A Resolução CONAMA 357/2005 prevê, para águas doces de classe 2, OD não inferior a 5 mg/L. Qual frase usa essa referência com rigor?',
            opcoes: [
              { t: 'O valor medido (2,1 mg/L) é menor que o previsto para a classe 2 (5 mg/L), mas a classe do lago não foi verificada.', ok: true },
              { t: 'O lago está ilegal, pois a Resolução CONAMA exige ao menos 5 mg/L de oxigênio dissolvido em qualquer água doce.', porque: 'A referência depende da classe do corpo d’água, que ainda não conhecemos. E ilegal é um julgamento que vai além dos dados.' },
              { t: 'Como 2,1 mg/L é menor que 5 mg/L, a água do lago é imprópria para qualquer tipo de uso, segundo a Resolução CONAMA.', porque: 'Generaliza demais: a comparação foi de um parâmetro, num ponto, com uma classe ainda hipotética.' },
              { t: 'Comparado à classe 2, o valor de 2,1 mg/L comprova que a fábrica vizinha contaminou o lago com resíduos industriais.', porque: 'Uma norma estabelece referências de qualidade; ela não identifica causas nem responsáveis.' },
            ],
          },
          {
            tipo: 'multi', rotulo: 3, n: 2,
            enunciado: 'Quais duas áreas ajudam a turma a organizar e interpretar esses dados? Escolha duas.',
            opcoes: [
              { t: 'Matemática: organizar medições em tabela e gráfico e mostrar que um ponto só não forma tendência.', ok: true },
              { t: 'Física: identificar grandezas, unidades e condições de medição, como hora, temperatura e profundidade.', ok: true },
              { t: 'História: usar os cadernos do pai de Dona Helena, de 1958, para provar que o lago sempre foi poluído.', porque: 'Os cadernos são registros valiosos, mas descrições antigas não provam a situação atual.' },
              { t: 'Educação Física: cronometrar quanto tempo a turma leva para caminhar do escritório até o lago.', porque: 'Não contribui para organizar ou interpretar os dados ambientais.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 4,
            enunciado: 'Que pergunta ajudaria a turma a revisar a tabela?',
            opcoes: [
              { t: 'Quantas medições, em que datas e pontos, permitiriam afirmar que há uma tendência?', ok: true },
              { t: 'Quem foi o responsável pelo erro na tabela e vai precisar refazer tudo em casa?', porque: 'Buscar culpados inibe a escrita. A cultura do erro trata o equívoco como oportunidade de aprender.' },
              { t: 'Vocês concordam que o oxigênio dissolvido está mesmo diminuindo toda semana, não é?', porque: 'A pergunta já traz a resposta e induz a turma a confirmar a afirmação.' },
              { t: 'Qual programa de computador faz os gráficos mais bonitos para colocar no relatório?', porque: 'A ferramenta importa menos que o raciocínio sobre os dados.' },
            ],
          },
        ],
      },
      fim: [
        { p: 'tiago', t: 'Uma medição é uma fotografia, não um filme. Para ver tendência, preciso de várias, no mesmo ponto e com o mesmo método.' },
        { p: 'helena', t: 'E os cadernos do papai? Não servem para nada?' },
        { p: 'marta', t: 'Servem muito, Dona Helena! São um registro histórico: mostram que a cor verde já foi percebida antes. Mas são descrições, não medições.' },
        { p: 'marta', t: 'Agora, à biblioteca. Hora de pesquisar e formular hipóteses.' },
      ],
      cartoes: ['matematica', 'fisica'],
      glossario: ['dado', 'interpretacao', 'tendencia', 'serie_historica', 'conama', 'classe'],
      evidencias: [
        'Cadernos de 1958 em diante: “água verde” anotada em vários verões (registro qualitativo).',
        'Tabela: apenas 1 medição de OD até agora — não há tendência definida.',
        'Referência: CONAMA 357/2005, águas doces classe 2, OD não inferior a 5 mg/L (classe do lago não verificada).',
      ],
    },

    {
      id: 'biblioteca', num: 4, titulo: 'Hipóteses na biblioteca', comodo: 'Biblioteca', contexto: 'Pesquisa — investigação das causas',
      cena: 'biblioteca', musica: 'biblioteca', cartao: 'Cartão 3 · Pesquisa',
      resumo: 'Na pesquisa, formulamos hipóteses e deixamos claro o que ainda precisa ser investigado. Encontre o material de consulta e transforme uma certeza apressada em hipótese testável.',
      intro: [
        { p: 'benedito', t: 'Preciso confessar uma coisa: eu uso adubo na horta, perto da margem. Será que fui eu que estraguei o lago?' },
        { p: 'marta', t: 'Calma, Seu Benedito. Isso pode virar uma hipótese, e hipótese não é acusação. Na pesquisa, a gente formula hipóteses e diz o que ainda precisa ser investigado.' },
        { p: 'marta', t: '{nome}, a biblioteca guarda livros de limnologia e uma cópia da Resolução CONAMA. Encontre o material de pesquisa.' },
      ],
      meio: [
        { p: 'tiago', t: 'Este livro explica que o excesso de nutrientes favorece o crescimento de algas. Pronto, escrevi: a eutrofização é a causa comprovada das alterações, mesmo sem resultados laboratoriais.' },
        { p: 'marta', t: 'Mesmo sem resultados laboratoriais, Tiago? Vamos ao terceiro cartão: hipótese ou causa comprovada?' },
      ],
      desafio: {
        titulo: 'Hipótese ou causa comprovada?',
        frase: 'A eutrofização é a causa comprovada das alterações, mesmo sem resultados laboratoriais.',
        passos: [
          {
            tipo: 'marcar', rotulo: 1,
            enunciado: 'Toque na expressão que transforma uma hipótese em certeza.',
            partes: ['A eutrofização', 'é a causa comprovada', 'das alterações,', 'mesmo sem resultados laboratoriais.'],
            corretas: [1],
            explica: 'É a causa comprovada afirma certeza. Sem análises de nutrientes, a eutrofização é uma hipótese compatível com as observações, não uma causa demonstrada.',
            erro: 'Essa parte não é o problema. Procure a expressão que afirma certeza.',
            erros: { 3: 'Essa parte até ajuda a perceber o problema: ela admite que não há resultados. A contradição está na expressão que afirma certeza.' },
          },
          {
            tipo: 'escolha', rotulo: 2,
            enunciado: 'Como reescrever a frase da pesquisa?',
            opcoes: [
              { t: 'A eutrofização é uma hipótese compatível com a água verde e o OD baixo; falta analisar fósforo e nitrogênio.', ok: true },
              { t: 'A eutrofização é provavelmente a causa comprovada da água verde e do OD baixo, segundo o livro da biblioteca.', porque: 'Provavelmente e comprovada se contradizem, e o livro explica o fenômeno em geral, não o caso deste lago.' },
              { t: 'A eutrofização causada pelo adubo da horta do Seu Benedito é a responsável pelas alterações no lago.', porque: 'Aponta a causa e ainda a origem dos nutrientes, sem nenhuma análise.' },
              { t: 'Não é possível dizer absolutamente nada sobre a água verde e o OD baixo antes de haver um laudo final.', porque: 'Exagera no sentido oposto: as observações permitem, sim, formular hipóteses.' },
            ],
            justificativa: {
              enunciado: 'Por que essa versão é a mais adequada para a pesquisa?',
              opcoes: [
                { t: 'Apresenta a hipótese, cita as evidências e indica o que ainda precisa ser investigado.', ok: true },
                { t: 'Evita usar a palavra eutrofização, que é complicada demais para um relatório escolar.', porque: 'Ela usa o termo, corretamente, como hipótese. O termo técnico não é o problema.' },
                { t: 'Concorda com o livro da biblioteca, que é uma fonte confiável sobre este lago em especial.', porque: 'O livro é confiável sobre o conceito, mas não traz dados deste lago.' },
                { t: 'Deixa a conclusão para depois, sem dizer o que a equipe precisa fazer a partir de agora.', porque: 'Ela diz o que fazer: analisar fósforo e nitrogênio.' },
              ],
            },
          },
          {
            tipo: 'escolha', rotulo: 'c',
            enunciado: 'Qual destas é uma hipótese bem formulada, que pode ser testada?',
            opcoes: [
              { t: 'Se o fósforo vem do córrego, sua concentração deve ser maior perto da foz do que no centro do lago.', ok: true },
              { t: 'O lago ficou verde e sem peixes porque a natureza está pedindo socorro aos moradores do entorno.', porque: 'É uma metáfora, não uma hipótese: não indica o que medir nem onde.' },
              { t: 'A fábrica do outro lado da estrada polui o lago, e qualquer análise de laboratório vai confirmar isso.', porque: 'Uma hipótese precisa poder ser refutada. Esta já decide o resultado antes da análise.' },
              { t: 'Talvez alguma coisa tenha acontecido com a água do lago em algum momento das últimas semanas.', porque: 'É vaga demais: não diz o quê, onde nem como seria verificado.' },
            ],
          },
          {
            tipo: 'multi', rotulo: 3, n: 2,
            enunciado: 'Quais duas áreas ajudam a separar o que se sabe do que se supõe? Escolha duas.',
            opcoes: [
              { t: 'Biologia: explicar a importância do OD para os seres aquáticos, separando teoria e dado coletado.', ok: true },
              { t: 'Filosofia: montar um quadro com afirmação, evidência e justificativa para avaliar cada conclusão.', ok: true },
              { t: 'Língua Inglesa: traduzir eutrophication palavra por palavra, sem checar o sentido técnico do termo.', porque: 'Traduções literais podem alterar o significado; o glossário precisa ser contextualizado.' },
              { t: 'Geografia: decorar o nome e a localização de todos os lagos do estado para a próxima prova.', porque: 'Memorizar nomes não ajuda a distinguir hipóteses de evidências.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 4,
            enunciado: 'Que pergunta você faria à turma para organizar a pesquisa?',
            opcoes: [
              { t: 'O que já sabemos, o que suspeitamos e o que ainda precisamos investigar?', ok: true },
              { t: 'Quem acha que a culpa é do adubo do Seu Benedito pode levantar a mão?', porque: 'Transforma a investigação em julgamento e expõe uma pessoa sem evidências.' },
              { t: 'Vocês podem copiar a conclusão do livro, já que ele é uma fonte confiável?', porque: 'Reproduzir sem discutir foi uma das dificuldades observadas na turma.' },
              { t: 'Qual é a resposta certa que eu, professor, quero ouvir de vocês agora?', porque: 'A mediação deve tornar o raciocínio visível, não fazer a turma adivinhar a resposta do professor.' },
            ],
          },
        ],
      },
      fim: [
        { p: 'benedito', t: 'Então eu não sou culpado nem inocente ainda... sou uma hipótese!' },
        { p: 'marta', t: 'Quase isso, Seu Benedito! A hipótese é sobre os nutrientes, e não sobre o senhor. As análises vão nos dizer mais.' },
        { p: 'marta', t: 'Vamos levar as amostras ao laboratório do porão. A Dra. Lúcia está esperando.' },
      ],
      cartoes: ['biologia', 'filosofia'],
      glossario: ['hipotese', 'eutrofizacao', 'nutrientes', 'previsao', 'limnologia'],
      evidencias: [
        'Hipótese H1: eutrofização (excesso de nutrientes) — compatível com a cor verde e o OD baixo, ainda não testada.',
        'Previsão testável: fósforo maior perto da foz do córrego (P2) do que no centro do lago (P3).',
        'Relato do caseiro: uso de adubo na horta próxima à margem.',
      ],
    },

    {
      id: 'laboratorio', num: 5, titulo: 'O laboratório do porão', comodo: 'Laboratório', contexto: 'Laboratório — amostras e laudos',
      cena: 'laboratorio', musica: 'laboratorio',
      resumo: 'Solução, concentração, amostra: palavras do dia a dia que, no laboratório, ganham sentido preciso. Prepare as amostras e registre o laudo sem extrapolar.',
      intro: [
        { p: 'lucia', t: 'Bem na hora! Antes de qualquer análise, preciso conferir a etiqueta, a ficha de coleta e a cadeia de custódia de cada frasco.' },
        { p: 'marta', t: 'No laboratório, palavras do dia a dia ganham sentido preciso: solução, concentração, amostra. Vamos ver isso de perto.' },
        { p: 'marta', t: '{nome}, encontre a vidraria, a caixa térmica com as amostras e as fichas para a Dra. Lúcia.' },
      ],
      meio: [
        { p: 'lucia', t: 'Resultados prontos. Fósforo total: 0,15 mg/L no ponto P2, perto da foz do córrego, e 0,04 mg/L no ponto P3, no centro do lago.' },
        { p: 'marta', t: 'Isso é compatível com a hipótese de eutrofização e com a previsão que fizemos. Mas ainda não diz de onde vem o fósforo.' },
        { p: 'lucia', t: 'Exato. E, antes de assinar o laudo, quero ver se vocês dominam as palavras do laboratório. Uma mesma palavra pode mudar tudo.' },
      ],
      desafio: {
        titulo: 'Quando uma palavra muda tudo',
        passos: [
          {
            tipo: 'escolha', rotulo: 'p',
            enunciado: 'Uma receita de bolo e uma receita médica usam a mesma palavra. O que muda quando a receita orienta uma decisão profissional?',
            opcoes: [
              { t: 'A informação precisa ser exata: quantidade, unidade, frequência e para quem se destina.', ok: true },
              { t: 'Nada muda: em qualquer tipo de receita, medidas como uma pitada ou a gosto funcionam bem.', porque: 'Na receita médica, uma medida vaga pode causar dano. O contexto exige precisão.' },
              { t: 'A receita médica pode usar qualquer palavra ou abreviação, desde que o médico entenda.', porque: 'Ela precisa ser compreendida por quem vai usá-la: paciente, farmácia e equipe de enfermagem.' },
              { t: 'Só muda o tamanho do texto, porque as receitas médicas costumam ser bem mais curtas.', porque: 'O tamanho não é o ponto: é a precisão necessária para decidir com segurança.' },
            ],
          },
          {
            tipo: 'classificar', rotulo: 'p',
            enunciado: 'Classifique o sentido da palavra solução em cada frase.',
            categorias: [
              { id: 'qui', nome: 'Química: mistura homogênea' },
              { id: 'mat', nome: 'Matemática: valor que satisfaz' },
              { id: 'cot', nome: 'Cotidiano: resposta a um problema' },
            ],
            itens: [
              { t: 'A Dra. Lúcia preparou uma solução de nitrato de potássio para calibrar o equipamento.', c: 'qui', porque: 'Na Química, solução é uma mistura homogênea de soluto e solvente.' },
              { t: 'A solução da equação 2x + 4 = 14 é x = 5.', c: 'mat', porque: 'Na Matemática, é o valor que satisfaz a equação.' },
              { t: 'Os moradores querem uma solução rápida para o lago.', c: 'cot', porque: 'No cotidiano, é a resposta para um problema.' },
              { t: 'Para preparar o padrão, diluímos a solução-mãe em água destilada.', c: 'qui', porque: 'Diluir uma solução é acrescentar solvente: sentido químico.' },
              { t: 'O sistema de equações não tem solução real.', c: 'mat', porque: 'Não existe valor real que satisfaça as equações: sentido matemático.' },
              { t: 'Recompor a mata ciliar pode fazer parte da solução, se os estudos confirmarem a origem dos nutrientes.', c: 'cot', porque: 'Aqui, solução é a resposta ao problema ambiental.' },
            ],
          },
          {
            tipo: 'classificar', rotulo: 'p',
            enunciado: 'E a palavra amostra? Classifique cada uso.',
            categorias: [
              { id: 'lab', nome: 'Laboratório: porção de água coletada' },
              { id: 'est', nome: 'Estatística: parte de uma população' },
              { id: 'cot', nome: 'Cotidiano: exemplar de produto' },
            ],
            itens: [
              { t: 'A amostra do ponto P2 foi refrigerada logo após a coleta.', c: 'lab', porque: 'É a porção de água que representa aquele ponto e momento.' },
              { t: 'Entrevistamos uma amostra de 30 moradores do entorno.', c: 'est', porque: 'É um subconjunto de pessoas que representa a população estudada.' },
              { t: 'Ganhei uma amostra grátis de perfume na farmácia.', c: 'cot', porque: 'É um exemplar pequeno de um produto.' },
              { t: 'Cada amostra precisa de etiqueta e de ficha de cadeia de custódia.', c: 'lab', porque: 'Rastreabilidade é exigência das amostras ambientais.' },
              { t: 'A amostra de famílias foi sorteada por quarteirão.', c: 'est', porque: 'Sortear quem participa é uma técnica de amostragem estatística.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 'r',
            enunciado: 'Qual etiqueta de frasco está completa e rastreável?',
            opcoes: [
              { t: 'Lago do Ipê · P2 (foz do córrego) · 14/10/2026 · 9h40 · água superficial · fósforo total · equipe 3', ok: true },
              { t: 'Água do Lago do Ipê · coletada de manhã · cor muito verde · analisar tudo · urgente · equipe 3', porque: 'Sem ponto, data, hora exata e parâmetro, o resultado não pode ser rastreado nem comparado.' },
              { t: 'Amostra nº 2 · Lago do Ipê · outubro de 2026 · fósforo · resultado esperado: alto · coleta: equipe 3', porque: 'Faltam o ponto, o dia e a hora; e anotar o resultado esperado pode enviesar a análise.' },
              { t: 'P2 · 14/10 · água contaminada pela horta · fósforo total · prioridade máxima · coleta: equipe 3', porque: 'Etiqueta não é lugar de conclusão, e ainda faltam o nome do lago, o ano e a hora da coleta.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 2,
            enunciado: 'Como registrar o resultado do laudo no relatório?',
            opcoes: [
              { t: 'Na amostra coletada no ponto P2, em 14/10, a concentração de fósforo total foi de 0,15 mg/L.', ok: true },
              { t: 'O lago inteiro tem 0,15 de fósforo, o que é muito, de acordo com a análise do laboratório.', porque: 'Faltam a unidade, o ponto e a data; e muito é uma avaliação sem referência.' },
              { t: 'O fósforo total de 0,15 mg/L no ponto P2 comprova que a horta é a fonte do problema do lago.', porque: 'O resultado mostra concentração, não origem. Para isso seriam necessárias outras coletas.' },
              { t: 'Em 14/10, havia uma solução de fósforo dissolvida no lago inteiro, em grande quantidade.', porque: 'Generaliza um ponto para o lago inteiro e usa solução de forma imprecisa.' },
            ],
          },
          {
            tipo: 'multi', rotulo: 3, n: 2,
            enunciado: 'Quais duas áreas ajudam a construir o glossário do laboratório? Escolha duas.',
            opcoes: [
              { t: 'Química: explicar concentração, amostra e solução usando exemplos tirados do próprio laudo.', ok: true },
              { t: 'Língua Inglesa: glossário bilíngue, como dissolved oxygen e sample, sem traduções literais.', ok: true },
              { t: 'Artes: escolher cores aleatórias para cada frasco e cada gráfico, sem nenhuma legenda.', porque: 'Cores ajudam quando têm significado e legenda; aleatórias confundem.' },
              { t: 'História: pesquisar a data de invenção do microscópio para colocar no início do laudo.', porque: 'É curioso, mas não ajuda a compreender os termos do laudo.' },
            ],
          },
        ],
      },
      fim: [
        { p: 'lucia', t: 'Laudo assinado. E lembrem: o laudo diz o que foi medido, onde e quando. Não diz quem é o culpado.' },
        { p: 'marta', t: 'Agora vem o passo mais delicado: comunicar tudo isso aos moradores, sem perder o rigor.' },
      ],
      cartoes: ['quimica', 'ingles'],
      glossario: ['amostra', 'solucao', 'concentracao', 'cadeia_custodia', 'laudo', 'preservacao'],
      evidencias: [
        'Laudo: fósforo total 0,15 mg/L em P2 (foz do córrego) e 0,04 mg/L em P3 (centro), amostras de 14/10.',
        'Resultado compatível com H1 (eutrofização); a origem do fósforo ainda não foi identificada.',
        'Amostras etiquetadas, refrigeradas e acompanhadas da ficha de cadeia de custódia.',
      ],
    },

    {
      id: 'salao', num: 6, titulo: 'A reunião no salão', comodo: 'Salão de Baile', contexto: 'Comunicação aos moradores',
      cena: 'salao', musica: 'salao',
      resumo: 'Os moradores querem respostas e o jornal quer uma manchete. Mude a linguagem, mas não os dados, os limites e as incertezas.',
      intro: [
        { p: 'helena', t: 'Convidei os moradores do entorno para uma reunião aqui no salão. Eles querem saber o que está acontecendo com o lago.' },
        { p: 'rafael', t: 'E eu já tenho a manchete do jornal: Lago do Ipê envenenado, fábrica é a culpada! Vai vender muito!' },
        { p: 'marta', t: 'Rafael, os dados não dizem isso. {nome}, vamos preparar o salão e a apresentação. Encontre o microfone, o infográfico e o restante do material.' },
      ],
      meio: [
        { p: 'marta', t: 'Salão pronto. Agora, o relatório técnico precisa virar uma comunicação para os moradores.' },
        { p: 'rafael', t: 'Mas sem palavras difíceis, hein? Ninguém aqui sabe o que é OD.' },
        { p: 'marta', t: 'Justo. Podemos mudar a linguagem. O que não podemos mudar são os dados, os limites e as incertezas.' },
      ],
      desafio: {
        titulo: 'O que pode mudar e o que deve permanecer?',
        passos: [
          {
            tipo: 'classificar', rotulo: 'r',
            enunciado: 'Ao adaptar o relatório para os moradores, o que pode mudar e o que deve permanecer?',
            categorias: [
              { id: 'muda', nome: 'Pode mudar' },
              { id: 'fica', nome: 'Deve permanecer' },
            ],
            itens: [
              { t: 'Vocabulário e exemplos do dia a dia', c: 'muda', porque: 'Exemplos próximos da realidade dos moradores ajudam a entender.' },
              { t: 'Explicação de siglas, como OD', c: 'muda', porque: 'Explicar termos é adaptar a linguagem sem alterar o conteúdo.' },
              { t: 'Recursos visuais e formato', c: 'muda', porque: 'Infográficos e cartazes podem substituir tabelas, desde que não distorçam.' },
              { t: 'Organização da mensagem', c: 'muda', porque: 'Pode-se começar pelo que mais interessa ao público.' },
              { t: 'O valor de 2,1 mg/L, a unidade e o local da medição', c: 'fica', porque: 'Dados, unidades e local não mudam conforme o público.' },
              { t: 'Os procedimentos e as fontes consultadas', c: 'fica', porque: 'Dizer como e com que referência o trabalho foi feito garante confiança.' },
              { t: 'Os limites da investigação', c: 'fica', porque: 'Uma medição de OD e duas de fósforo: isso precisa ficar claro.' },
              { t: 'As incertezas e as conclusões sustentadas', c: 'fica', porque: 'Não se pode transformar hipótese em certeza para simplificar.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 2,
            enunciado: 'Qual manchete o Rafael deveria publicar?',
            opcoes: [
              { t: 'Lago do Ipê tem pouco oxigênio em ponto medido; técnicos investigam as causas', ok: true },
              { t: 'Lago do Ipê envenenado: fábrica é a culpada pela água verde, afirmam os técnicos', porque: 'Atribui aos técnicos uma conclusão que eles não fizeram e acusa sem evidências.' },
              { t: 'Lago do Ipê está ótimo e não corre perigo, garante relatório feito por estudantes', porque: 'Minimiza os dados: o OD medido foi baixo, e isso não pode ser omitido.' },
              { t: 'Horta do caseiro mata os peixes do Lago do Ipê com adubo, revela laudo técnico', porque: 'O laudo mediu concentrações; não identificou fonte nem relacionou os peixes à horta.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 2,
            enunciado: 'Qual texto comunica melhor os resultados aos moradores?',
            opcoes: [
              { t: 'Medimos o oxigênio dissolvido, que os peixes usam para respirar. Perto do píer havia 2,1 mg/L, um valor baixo. A água verde pode indicar excesso de nutrientes, e novas coletas vão investigar a origem deles.', ok: true },
              { t: 'Foi aferida concentração de OD de 2,1 mg/L no P1, inferior ao padrão para classe 2 da Resolução CONAMA 357/2005, compatível com processo de eutrofização em curso no corpo hídrico, conforme análise de fósforo total.', porque: 'Mantém os dados, mas copia o relatório técnico: siglas e termos sem explicação afastam os moradores.' },
              { t: 'A água do lago está um pouco ruim, mas não é nada grave. Logo tudo volta ao normal sozinho, então todos podem ficar tranquilos e continuar pescando e usando o lago como sempre. Não há motivo para preocupação.', porque: 'Perde os dados e faz promessas sem base. Também omite os limites da investigação.' },
              { t: 'Cuidado! O lago está morrendo, a água verde é venenosa e é perigoso chegar perto dela. A culpa é de quem jogou sujeira no lago, e os responsáveis precisam ser encontrados e punidos imediatamente.', porque: 'É alarmista e afirma perigo e culpa sem evidências. Comunicar não é assustar.' },
            ],
          },
          {
            tipo: 'multi', rotulo: 3, n: 2,
            enunciado: 'Quais duas áreas ajudam a preparar a reunião com os moradores? Escolha duas.',
            opcoes: [
              { t: 'Artes: criar um infográfico em que cores e símbolos tornem os dados claros, sem distorcê-los.', ok: true },
              { t: 'Educação Física: orientar caminhadas no entorno, separando observação, recomendação e laudo.', ok: true },
              { t: 'Matemática: arredondar 2,1 mg/L para zero, para simplificar a conversa com os moradores.', porque: 'Arredondar assim distorce o dado. Simplificar a linguagem não é alterar números.' },
              { t: 'Sociologia: entrevistar moradores e registrar só as opiniões que concordam com o relatório.', porque: 'Um bom roteiro de entrevista registra percepções diversas, sem transformá-las em fatos.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 4,
            enunciado: 'Antes de publicar, que pergunta a turma deve se fazer?',
            opcoes: [
              { t: 'A linguagem mudou, mas os dados, o local, os limites e as incertezas continuam lá?', ok: true },
              { t: 'O texto está chamativo o suficiente para ser bastante compartilhado nas redes sociais?', porque: 'Alcance não substitui precisão. Uma manchete chamativa pode espalhar uma conclusão falsa.' },
              { t: 'Conseguimos tirar todos os números e unidades para que ninguém se confunda na reunião?', porque: 'Os números podem ser explicados, mas não eliminados: eles sustentam a informação.' },
              { t: 'Todo mundo vai concordar com a nossa opinião sobre a culpa da fábrica e da horta?', porque: 'A comunicação técnica apresenta evidências, não opiniões sobre culpados.' },
            ],
          },
        ],
      },
      fim: [
        { p: 'rafael', t: 'Tudo bem, vocês venceram: técnicos investigam as causas. Menos explosivo, mas é a verdade. E verdade também vende jornal.' },
        { p: 'helena', t: 'Pela primeira vez eu entendi o que está acontecendo com o meu lago. E sem ninguém ser acusado à toa.' },
        { p: 'marta', t: 'Próximos passos: medir o oxigênio todo mês em três pontos, coletar no córrego antes e depois da horta e do bairro, e só então concluir.' },
        { p: 'marta', t: 'Observar, contextualizar, justificar e comunicar. {nome}, você fez tudo isso. O caso do Lago do Ipê está em boas mãos.' },
      ],
      cartoes: ['artes', 'educacao_fisica'],
      glossario: ['destinatario', 'linguagem_acessivel', 'incerteza', 'limites', 'monitoramento', 'mata_ciliar'],
      evidencias: [
        'Comunicação aos moradores: linguagem adaptada, com dados, limites e incertezas preservados.',
        'Plano: monitoramento mensal de OD em P1, P2 e P3; coletas no córrego antes e depois da horta e do bairro.',
      ],
    },
  ];

  // ---------- glossário (diário de investigação) ----------
  MI.GLOSSARIO = {
    relato: { termo: 'Relato', ingles: 'account (testimony)', ctx: 'Todos', def: 'Informação contada por uma pessoa sobre o que viu, ouviu ou sente. Deve ser registrado com a fonte.', ex: 'Segundo relato da proprietária, os peixes deixaram de ser vistos há duas semanas.' },
    observacao: { termo: 'Observação', ingles: 'observation', ctx: 'Campo', def: 'Descrição do que foi percebido diretamente, com local e momento, sem interpretação.', ex: 'A água apresentava coloração esverdeada junto ao píer.' },
    conclusao: { termo: 'Conclusão', ingles: 'conclusion', ctx: 'Pesquisa', def: 'Afirmação final sustentada por evidências suficientes. Sem elas, é uma conclusão precipitada.', ex: 'Ainda não é possível concluir a causa das alterações.' },
    evidencia: { termo: 'Evidência', ingles: 'evidence', ctx: 'Todos', def: 'Dado ou registro verificável que sustenta (ou enfraquece) uma afirmação.', ex: 'A medição de OD é uma evidência sobre aquele ponto e momento.' },
    registro_campo: { termo: 'Registro de campo', ingles: 'field notes', ctx: 'Campo', def: 'Anotação feita no local, com data, hora, ponto, condições e observações, antes de qualquer interpretação.', ex: 'Registro: P1, 14/10, 9h15, céu nublado, água esverdeada.' },
    oxigenio_dissolvido: { termo: 'Oxigênio dissolvido (OD)', ingles: 'dissolved oxygen (DO)', ctx: 'Campo', def: 'Oxigênio presente na água e disponível para a respiração de muitos organismos aquáticos. Varia com local, profundidade, temperatura e hora do dia.', ex: 'O OD medido no P1 foi de 2,1 mg/L.' },
    mgl: { termo: 'mg/L (miligramas por litro)', ingles: 'milligrams per liter', ctx: 'Campo', def: 'Unidade de concentração: quantos miligramas de uma substância há em cada litro de água.', ex: '2,1 mg/L de OD = 2,1 miligramas de oxigênio em cada litro.' },
    ponto_coleta: { termo: 'Ponto de coleta', ingles: 'sampling point', ctx: 'Campo', def: 'Local exato, identificado e georreferenciado, onde se mede ou se coleta uma amostra.', ex: 'P1: píer; P2: foz do córrego; P3: centro do lago.' },
    coordenadas: { termo: 'Coordenadas geográficas', ingles: 'geographic coordinates', ctx: 'Campo', def: 'Latitude e longitude que localizam um ponto na superfície terrestre, obtidas, por exemplo, com GPS.', ex: 'As coordenadas do P1 foram registradas no GPS.' },
    secchi: { termo: 'Disco de Secchi', ingles: 'Secchi disk', ctx: 'Campo', def: 'Disco com quadrantes pretos e brancos, baixado por uma corda graduada; a profundidade em que deixa de ser visto indica a transparência da água.', ex: 'O disco deixou de ser visto a 0,4 m.' },
    dado: { termo: 'Dado', ingles: 'data point', ctx: 'Escritório', def: 'Valor ou registro obtido por medição ou observação, com unidade, local e momento.', ex: 'Dado: 2,1 mg/L de OD no P1, às 9h15.' },
    interpretacao: { termo: 'Interpretação', ingles: 'interpretation', ctx: 'Escritório', def: 'Sentido atribuído aos dados. Deve ser apresentada separada deles e com seus limites.', ex: 'O valor é baixo em relação à referência da classe 2.' },
    tendencia: { termo: 'Tendência', ingles: 'trend', ctx: 'Escritório', def: 'Padrão de aumento ou diminuição ao longo do tempo. Exige várias medições comparáveis.', ex: 'Com uma única medição, não há tendência a descrever.' },
    serie_historica: { termo: 'Série histórica', ingles: 'time series', ctx: 'Escritório', def: 'Conjunto de medições de um mesmo parâmetro, no mesmo ponto e com o mesmo método, ao longo do tempo.', ex: 'Medições mensais de OD formarão uma série histórica.' },
    conama: { termo: 'Resolução CONAMA 357/2005', ingles: 'CONAMA Resolution 357/2005 (Brazil)', ctx: 'Escritório', def: 'Norma brasileira que classifica os corpos de água e estabelece condições e padrões de qualidade para cada classe.', ex: 'Para águas doces classe 2, prevê OD não inferior a 5 mg/L.' },
    classe: { termo: 'Classe de enquadramento', ingles: 'water body classification', ctx: 'Escritório', def: 'Categoria de qualidade atribuída a um corpo de água conforme seus usos. Define quais valores de referência se aplicam.', ex: 'A classe do Lago do Ipê ainda precisa ser verificada.' },
    hipotese: { termo: 'Hipótese', ingles: 'hypothesis', ctx: 'Pesquisa', def: 'Explicação provisória, coerente com as observações, que pode ser testada e eventualmente refutada.', ex: 'H1: o excesso de nutrientes favorece a proliferação de algas no lago.' },
    eutrofizacao: { termo: 'Eutrofização', ingles: 'eutrophication', ctx: 'Pesquisa', def: 'Enriquecimento da água por nutrientes, principalmente fósforo e nitrogênio, que pode favorecer algas; sua decomposição pode reduzir o oxigênio disponível.', ex: 'A eutrofização é uma hipótese a investigar.' },
    nutrientes: { termo: 'Nutrientes (fósforo e nitrogênio)', ingles: 'nutrients (phosphorus, nitrogen)', ctx: 'Pesquisa', def: 'Elementos que alimentam o crescimento de plantas e algas. Podem chegar à água por esgoto, adubos e erosão do solo.', ex: 'É preciso analisar fósforo e nitrogênio em laboratório.' },
    previsao: { termo: 'Previsão testável', ingles: 'testable prediction', ctx: 'Pesquisa', def: 'O que se espera encontrar se a hipótese for verdadeira; indica o que medir e onde.', ex: 'Se o fósforo vem do córrego, será maior perto da foz.' },
    limnologia: { termo: 'Limnologia', ingles: 'limnology', ctx: 'Pesquisa', def: 'Ciência que estuda as águas continentais, como lagos, rios e represas, e os seres que vivem nelas.', ex: 'O livro de limnologia explica o ciclo do fósforo.' },
    amostra: { termo: 'Amostra', ingles: 'sample', ctx: 'Laboratório', def: 'Porção de água coletada que representa um ponto e um momento. Na Estatística, é parte de uma população.', ex: 'A amostra do P2 foi refrigerada logo após a coleta.' },
    solucao: { termo: 'Solução', ingles: 'solution', ctx: 'Laboratório', def: 'Na Química, mistura homogênea de soluto e solvente. Na Matemática, valor que satisfaz uma equação. No cotidiano, resposta a um problema.', ex: 'Calibramos o equipamento com uma solução-padrão.' },
    concentracao: { termo: 'Concentração', ingles: 'concentration', ctx: 'Laboratório', def: 'Quantidade de uma substância em um volume de água, expressa com unidade, como mg/L.', ex: 'A concentração de fósforo total foi de 0,15 mg/L no P2.' },
    cadeia_custodia: { termo: 'Cadeia de custódia', ingles: 'chain of custody', ctx: 'Laboratório', def: 'Registro de quem coletou, transportou, recebeu e analisou cada amostra, com datas e horários. Garante a rastreabilidade.', ex: 'A ficha de cadeia de custódia acompanha o frasco.' },
    laudo: { termo: 'Laudo', ingles: 'laboratory report', ctx: 'Laboratório', def: 'Documento assinado que apresenta os resultados das análises, os métodos e as amostras a que se referem.', ex: 'O laudo informa concentrações, não culpados.' },
    preservacao: { termo: 'Preservação da amostra', ingles: 'sample preservation', ctx: 'Laboratório', def: 'Cuidados, como refrigeração e prazo de análise, que evitam que a amostra se altere entre a coleta e o laboratório.', ex: 'As amostras seguiram em caixa térmica com gelo.' },
    destinatario: { termo: 'Destinatário', ingles: 'audience', ctx: 'Comunicação', def: 'Quem vai receber a informação. Define vocabulário, exemplos e formato, mas não altera os dados.', ex: 'Para os moradores, explicamos o que é OD.' },
    linguagem_acessivel: { termo: 'Linguagem acessível', ingles: 'plain language', ctx: 'Comunicação', def: 'Forma clara de comunicar, com termos explicados e exemplos, sem perder precisão.', ex: 'Oxigênio dissolvido: aquele que os peixes usam para respirar.' },
    incerteza: { termo: 'Incerteza', ingles: 'uncertainty', ctx: 'Todos', def: 'O que ainda não se sabe ou não se pode afirmar com os dados disponíveis. Deve ser comunicada, não escondida.', ex: 'A origem do fósforo ainda não foi identificada.' },
    limites: { termo: 'Limites da investigação', ingles: 'study limitations', ctx: 'Comunicação', def: 'Restrições do estudo, como número de medições, pontos e datas, que delimitam o que se pode concluir.', ex: 'Foi feita uma única medição de OD.' },
    monitoramento: { termo: 'Monitoramento', ingles: 'monitoring', ctx: 'Todos', def: 'Medições periódicas e planejadas para acompanhar a qualidade da água ao longo do tempo.', ex: 'Monitoramento mensal de OD em três pontos.' },
    mata_ciliar: { termo: 'Mata ciliar', ingles: 'riparian vegetation', ctx: 'Todos', def: 'Vegetação nas margens de rios e lagos, que ajuda a proteger o solo e a reduzir a chegada de sedimentos à água.', ex: 'A recomposição da mata ciliar é uma proposta a avaliar.' },
  };

  // ---------- cartões interdisciplinares (coleção) ----------
  MI.CARTOES = {
    portugues: { area: 'Língua Portuguesa', cor: '#b5473a', sigla: 'LP', texto: 'Revisar um registro técnico, justificando a escolha de verbos e expressões que diferenciam observações, hipóteses e conclusões.', pergunta: 'Que verbo descreve e que verbo conclui?' },
    matematica: { area: 'Matemática', cor: '#2f6db5', sigla: 'MAT', texto: 'Organizar medições em tabelas e gráficos, explicando por que um único resultado não permite afirmar uma tendência.', pergunta: 'Quantos pontos formam uma tendência?' },
    biologia: { area: 'Biologia', cor: '#3c8a3f', sigla: 'BIO', texto: 'Explicar a importância do oxigênio dissolvido para os organismos aquáticos, distinguindo o conhecimento científico dos dados coletados no lago.', pergunta: 'O que é teoria e o que foi medido aqui?' },
    quimica: { area: 'Química', cor: '#8a4fb5', sigla: 'QUI', texto: 'Produzir um glossário contextualizado com termos como concentração, amostra e solução, explicando seus significados e aplicações.', pergunta: 'O que esta palavra significa neste contexto?' },
    fisica: { area: 'Física', cor: '#c77b1c', sigla: 'FIS', texto: 'Elaborar um roteiro de medição, identificando grandezas, unidades e condições necessárias para registrar resultados com precisão.', pergunta: 'Que grandeza, que unidade, em que condição?' },
    geografia: { area: 'Geografia', cor: '#2a8a86', sigla: 'GEO', texto: 'Construir uma ficha de observação territorial ou um mapa dos pontos de coleta, justificando termos como localização, coordenadas e área de estudo.', pergunta: 'Onde exatamente isso foi observado?' },
    historia: { area: 'História', cor: '#8a5a2f', sigla: 'HIS', texto: 'Produzir uma linha do tempo com documentos e relatos sobre o entorno do lago, distinguindo acontecimentos documentados de interpretações sobre suas causas.', pergunta: 'Isto está documentado ou é interpretação?' },
    artes: { area: 'Artes', cor: '#c2407a', sigla: 'ART', texto: 'Criar um infográfico que comunique os dados ambientais, justificando como cores, símbolos e elementos visuais tornam a informação compreensível sem distorcê-la.', pergunta: 'O visual esclarece ou distorce o dado?' },
    sociologia: { area: 'Sociologia', cor: '#5a6b8a', sigla: 'SOC', texto: 'Elaborar um roteiro de entrevista com moradores, discutindo como registrar diferentes percepções sem transformar opiniões em fatos comprovados.', pergunta: 'Como registrar uma opinião como opinião?' },
    filosofia: { area: 'Filosofia', cor: '#4a4a7a', sigla: 'FIL', texto: 'Construir um quadro argumentativo que distinga afirmações, evidências e justificativas, refletindo sobre o que torna uma conclusão bem fundamentada.', pergunta: 'Que evidência sustenta esta afirmação?' },
    ingles: { area: 'Língua Inglesa', cor: '#1f5a8a', sigla: 'ING', texto: 'Elaborar um glossário bilíngue contextualizado, comparando termos técnicos ambientais e evitando traduções literais que alterem seus significados.', pergunta: 'A tradução preserva o sentido técnico?' },
    educacao_fisica: { area: 'Educação Física', cor: '#d0602a', sigla: 'EF', texto: 'Produzir orientações para uma atividade corporal no entorno do lago, diferenciando observações ambientais, recomendações preventivas e afirmações que exigiriam avaliação técnica.', pergunta: 'Isto é observação, recomendação ou laudo?' },
  };

  // ---------- restauração da mansão (gasta estrelas) ----------
  MI.RESTAURACAO = [
    { id: 'ipe', nome: 'Ipê-amarelo florido', custo: 3, desc: 'A árvore que dá nome à mansão volta a florir na entrada.' },
    { id: 'lampioes', nome: 'Lampiões do jardim', custo: 3, desc: 'Iluminam o caminho até o lago ao entardecer.' },
    { id: 'fonte', nome: 'Fonte restaurada', custo: 4, desc: 'A antiga fonte de 1928 volta a funcionar com água de reúso.' },
    { id: 'vitrais', nome: 'Vitrais da fachada', custo: 4, desc: 'Os vitrais coloridos das janelas do salão são recuperados.' },
    { id: 'coreto', nome: 'Coreto do jardim', custo: 4, desc: 'Espaço para as reuniões com a comunidade ao ar livre.' },
    { id: 'jardim_chuva', nome: 'Jardim de chuva', custo: 5, desc: 'Canteiro rebaixado que retém a enxurrada e parte dos sedimentos antes que cheguem ao lago.' },
    { id: 'boia', nome: 'Estação de monitoramento', custo: 5, desc: 'Boia para medições periódicas de oxigênio dissolvido: a série histórica começa aqui.' },
    { id: 'mata_ciliar', nome: 'Mata ciliar replantada', custo: 6, desc: 'Faixa de vegetação nativa na margem do lago. A recuperação é gradual e precisa ser acompanhada por medições.' },
  ];

  // ---------- modos das cenas (domínio da cena) ----------
  MI.MODOS = [
    { id: 'palavras', nome: 'Lista de palavras', desc: 'Encontre os objetos pelo nome.' },
    { id: 'silhuetas', nome: 'Silhuetas', desc: 'A lista mostra só a forma de cada objeto.' },
    { id: 'definicoes', nome: 'Definições', desc: 'A lista traz a definição: descubra de que objeto se trata.' },
    { id: 'noturno', nome: 'Noturno', desc: 'A luz caiu! Procure com a lanterna.' },
    { id: 'mestre', nome: 'Mestre investigador', desc: 'Definições à luz da lanterna.' },
  ];

  // ---------- falas para gravação (usado por tools/exportar_falas.js) ----------
  MI.listaFalas = function () {
    const out = [];
    const N = MI.NARRADOR;
    const add = (p, t) => { if (t) out.push({ p, t }); };
    MI.CAPITULOS.forEach((c) => {
      [].concat(c.intro, c.meio, c.fim).forEach((l) => add(l.p, l.t));
      c.desafio.passos.forEach((s) => {
        add(N, s.enunciado);
        if (s.explica) add(N, s.explica);
        if (s.erro) add(N, s.erro);
        Object.values(s.erros || {}).forEach((t) => add(N, t));
        (s.opcoes || []).forEach((o) => { add(N, o.t); add(N, o.porque); });
        (s.itens || []).forEach((o) => { add(N, o.t); add(N, o.porque); });
        if (s.justificativa) {
          add(N, s.justificativa.enunciado);
          s.justificativa.opcoes.forEach((o) => { add(N, o.t); add(N, o.porque); });
        }
      });
    });
    MI.FALAS_EXTRA.forEach((l) => add(l.p, l.t));
    return out;
  };
  // saudação na abertura do jogo: o nome do jogador é falado pela Profa. Marta
  MI.SAUDACAO = {
    novo: { p: 'marta', t: '{nome}, que bom ter você aqui! Prepare a lupa e o caderno de campo: a investigação no Solar do Ipê vai começar.' },
    volta: { p: 'marta', t: '{nome}, que bom ver você de volta! Vamos continuar a investigação no Solar do Ipê.' },
  };
  // falas curtas do sistema (narradora)
  MI.FALAS_EXTRA = [
    MI.SAUDACAO.novo, MI.SAUDACAO.volta,
    { p: 'marta', t: 'Muito bem! Todos os objetos foram encontrados.' },
    { p: 'marta', t: 'Boa! Agora justifique a sua escolha.' },
    { p: 'marta', t: 'Certo é certo: resposta precisa e justificada.' },
    { p: 'marta', t: 'Quase. Errar faz parte da investigação. Leia a explicação e tente de novo.' },
    { p: 'marta', t: 'Escolha mais uma alternativa.' },
  ];
})();
