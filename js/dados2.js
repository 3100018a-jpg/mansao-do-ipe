/* =========================================================
   Missões 7, 8 e 9, perguntas extras das missões 1 a 6,
   novos termos do glossário, cartões e restauração.
   ========================================================= */
(function () {
  'use strict';
  const MI = window.MI;

  // ---------- nova personagem ----------
  MI.PERSONAGENS.joana = {
    nome: 'Joana Reis', papel: 'Analista ambiental da Secretaria de Meio Ambiente',
    voz: { genero: 'F', edge: 'pt-BR-FranciscaNeural', azure: 'pt-BR-LeilaNeural', rate: '-3%', ritmo: 0.97 },
    visual: { pele: '#a8714c', cabelo: '#4a2a1a', estilo: 'coque', roupa: '#2a5a8a', gola: '#f2f2ee', oculos: true, brinco: '#c9d3d6', idade: 'adulta' },
  };

  // ---------- perguntas extras das missões 1 a 6 ----------
  const extra = {
    hall: [
      [1, {
        tipo: 'escolha', rotulo: 'c',
        enunciado: 'Qual destas frases é uma observação da equipe, e não um relato nem uma conclusão?',
        opcoes: [
          { t: 'Às 8h40, a água junto ao píer exalava um odor forte e desagradável.', ok: true },
          { t: 'Segundo o caseiro, o cheiro piora sempre que a fábrica está ligada.', porque: 'É um relato atribuído a outra pessoa, não algo que a equipe percebeu diretamente.' },
          { t: 'O cheiro forte prova que a água do lago está imprópria para os peixes.', porque: 'Prova é palavra de conclusão: o cheiro, sozinho, não demonstra o estado da água.' },
          { t: 'Dona Helena disse que nunca sentiu um cheiro tão forte na varanda.', porque: 'É a fala da proprietária: deve ser registrada como relato, com a fonte.' },
        ],
      }],
      [2, {
        tipo: 'escolha', rotulo: 'r',
        enunciado: 'Como registrar o mapa que o Tiago encontrou na entrada da mansão?',
        opcoes: [
          { t: 'Mapa da propriedade, sem data: um córrego deságua no lago pelo lado norte.', ok: true },
          { t: 'O córrego que deságua no lago traz toda a poluição da horta e do bairro.', porque: 'O mapa mostra o caminho da água, não o que ela carrega. Isso precisa de análises.' },
          { t: 'Segundo o mapa antigo, a horta e o bairro são os culpados pela água verde.', porque: 'Um mapa localiza elementos; ele não aponta culpados nem causas.' },
          { t: 'Mapa antigo da mansão, sem nenhuma utilidade para a investigação ambiental.', porque: 'Mostrar de onde vem a água do lago é uma informação de contexto muito útil.' },
        ],
      }],
    ],
    pier: [
      [1, {
        tipo: 'escolha', rotulo: 'c',
        enunciado: 'O disco de Secchi deixou de ser visto a 0,4 m no ponto P1. O que isso indica?',
        opcoes: [
          { t: 'A transparência da água era baixa naquele ponto e momento da medição.', ok: true },
          { t: 'O lago inteiro tem exatamente 0,4 m de profundidade em todos os pontos.', porque: 'O disco mede até onde se enxerga na água, não a profundidade do lago.' },
          { t: 'A água tinha 0,4 mg/L de oxigênio dissolvido junto ao píer naquele dia.', porque: 'O disco de Secchi mede transparência; o oxigênio é medido com o oxímetro.' },
          { t: 'O disco afundou só 0,4 m porque a água contaminada é muito mais densa.', porque: 'O disco é baixado pela corda; o valor indica quando ele deixa de ser visto.' },
        ],
      }],
      [3, {
        tipo: 'escolha', rotulo: 'r',
        enunciado: 'Qual registro de campo está completo?',
        opcoes: [
          { t: 'P1 · píer · 14/10 · 9h15 · nublado · OD 2,1 mg/L · Secchi 0,4 m · água esverdeada', ok: true },
          { t: 'Lago · de manhã · tempo bom · oxigênio baixo · água muito verde e com cheiro ruim', porque: 'Faltam ponto, data, hora e os valores com unidade. Baixo e muito são avaliações vagas.' },
          { t: 'P1 · 14/10 · OD 2,1 · Secchi 0,4 · água contaminada, precisa de tratamento urgente', porque: 'Faltam as unidades, e contaminada e precisa de tratamento são conclusões, não observações.' },
          { t: 'Píer · 9h15 · água esverdeada · eutrofização comprovada pela proliferação de algas', porque: 'Falta a data, e eutrofização comprovada é uma conclusão que o campo não sustenta.' },
        ],
      }],
    ],
    escritorio: [
      [2, {
        tipo: 'classificar', rotulo: 'c',
        enunciado: 'Na tabela do escritório, separe o que é dado do que é interpretação.',
        categorias: [
          { id: 'dado', nome: 'Dado' },
          { id: 'int', nome: 'Interpretação' },
        ],
        itens: [
          { t: '2,1 mg/L de OD no ponto P1, às 9h15.', c: 'dado', porque: 'Valor medido, com unidade, local e hora.' },
          { t: 'Valor baixo em relação à referência da classe 2.', c: 'int', porque: 'É uma leitura do dado, comparado a uma referência.' },
          { t: 'Transparência de 0,4 m medida com o disco de Secchi.', c: 'dado', porque: 'É uma medição registrada no campo.' },
          { t: 'Possível relação com a proliferação de algas.', c: 'int', porque: 'É uma explicação provável, que ainda precisa ser testada.' },
          { t: 'Anotação de 1958 nos cadernos: água verde no verão.', c: 'dado', porque: 'É um registro documental, mesmo sendo qualitativo.' },
          { t: 'A cor verde pode ser um fenômeno antigo no lago.', c: 'int', porque: 'É uma interpretação feita a partir dos cadernos antigos.' },
        ],
      }],
      [4, {
        tipo: 'escolha', rotulo: 'c',
        enunciado: 'Para comparar o oxigênio dissolvido ao longo dos meses, o que deve se manter igual?',
        opcoes: [
          { t: 'O ponto, a profundidade, o horário aproximado e o método de medição.', ok: true },
          { t: 'Apenas o nome do técnico que faz a medição em cada uma das visitas.', porque: 'Quem mede importa menos que onde, quando e como: são essas condições que tornam os dados comparáveis.' },
          { t: 'Nada precisa se manter, pois cada medição vale por si e basta somá-las.', porque: 'Sem condições parecidas, as diferenças podem vir do método, e não do lago.' },
          { t: 'O valor de 2,1 mg/L, que deve se repetir para confirmar o resultado.', porque: 'O valor é o que se quer descobrir; o que se mantém são as condições de medição.' },
        ],
      }],
    ],
    biblioteca: [
      [2, {
        tipo: 'classificar', rotulo: 'c',
        enunciado: 'Organize o quadro da pesquisa: o que já sabemos, o que suspeitamos e o que precisamos investigar?',
        categorias: [
          { id: 'sab', nome: 'Já sabemos (evidência)' },
          { id: 'sus', nome: 'Suspeitamos (hipótese)' },
          { id: 'inv', nome: 'Precisamos investigar' },
        ],
        itens: [
          { t: 'O OD medido no P1 foi de 2,1 mg/L.', c: 'sab', porque: 'É um dado medido e registrado.' },
          { t: 'O excesso de nutrientes favorece algas no lago.', c: 'sus', porque: 'É a hipótese da eutrofização, ainda não testada no lago.' },
          { t: 'A concentração de fósforo em cada ponto.', c: 'inv', porque: 'Ainda não foi analisada em laboratório.' },
          { t: 'A água estava esverdeada junto ao píer.', c: 'sab', porque: 'É uma observação de campo registrada.' },
          { t: 'O adubo da horta contribui com nutrientes.', c: 'sus', porque: 'É uma suspeita levantada a partir do relato do caseiro.' },
          { t: 'De onde vem a água que chega pelo córrego.', c: 'inv', porque: 'É preciso percorrer a bacia e coletar em mais pontos.' },
        ],
      }],
      [4, {
        tipo: 'escolha', rotulo: 'c',
        enunciado: 'Qual fonte é mais confiável para fundamentar a hipótese de eutrofização?',
        opcoes: [
          { t: 'Um artigo científico revisado por especialistas, com o método descrito.', ok: true },
          { t: 'Um vídeo popular na internet, com milhões de visualizações sobre lagos.', porque: 'Popularidade não garante método nem revisão por especialistas.' },
          { t: 'A opinião de um vizinho que mora há muitos anos perto do Lago do Ipê.', porque: 'A experiência do morador é um relato valioso, mas não fundamenta um conceito científico.' },
          { t: 'Uma postagem anônima em rede social sobre a poluição dos lagos do país.', porque: 'Sem autoria nem método, não é possível verificar a informação.' },
        ],
      }],
    ],
    laboratorio: [
      [4, {
        tipo: 'escolha', rotulo: 'r',
        enunciado: 'Por que a ficha de cadeia de custódia é importante?',
        opcoes: [
          { t: 'Registra quem coletou, transportou e recebeu a amostra, dando rastreabilidade.', ok: true },
          { t: 'Substitui a etiqueta do frasco e dispensa anotar o ponto e o horário da coleta.', porque: 'A ficha complementa a etiqueta; ponto e horário continuam obrigatórios.' },
          { t: 'Serve só para cumprir burocracia, sem efeito na confiança dos resultados.', porque: 'Sem rastreabilidade, não dá para garantir que o resultado é daquela amostra.' },
          { t: 'Indica o resultado esperado da análise, o que ajuda o laboratório a trabalhar.', porque: 'Anotar o resultado esperado pode enviesar a análise; a ficha não faz isso.' },
        ],
      }],
      [5, {
        tipo: 'escolha', rotulo: 'c',
        enunciado: 'Qual frase sobre os valores de concentração está correta?',
        opcoes: [
          { t: '0,15 mg/L e 0,04 mg/L indicam mais fósforo por litro em P2 do que em P3.', ok: true },
          { t: '0,15 mg/L e 0,04 mg/L indicam que há mais água no ponto P2 do que no P3.', porque: 'Concentração é quantidade de substância por litro, não quantidade de água.' },
          { t: '0,15 e 0,04 indicam que o P2 fica 15 metros mais perto da foz que o P3.', porque: 'Os números são concentrações em mg/L, não distâncias.' },
          { t: '0,15 mg/L indica que há 15% de fósforo em cada litro de água do ponto P2.', porque: 'mg/L não é porcentagem: são miligramas de fósforo em cada litro.' },
        ],
      }],
    ],
    salao: [
      [3, {
        tipo: 'escolha', rotulo: 2,
        enunciado: 'Um morador pergunta: posso nadar no lago? Qual resposta é responsável?',
        opcoes: [
          { t: 'Ainda não temos dados para dizer se é seguro; por precaução, evite até novas análises.', ok: true },
          { t: 'Pode nadar tranquilo, porque o oxigênio baixo só faz mal aos peixes, não às pessoas.', porque: 'O estudo não avaliou riscos para a saúde. Afirmar segurança vai além dos dados.' },
          { t: 'Nunca mais será possível nadar, porque o lago está morto e não tem mais solução.', porque: 'É alarmista e faz uma previsão sem base: a recuperação ainda está sendo estudada.' },
          { t: 'Pode, desde que seja bem cedo, quando a água verde fica mais limpa e oxigenada.', porque: 'Nenhuma medição sustenta essa recomendação de horário.' },
        ],
      }],
      [4, {
        tipo: 'escolha', rotulo: 'c',
        enunciado: 'Qual infográfico comunica os dados aos moradores sem distorcê-los?',
        opcoes: [
          { t: 'Barras com escala a partir do zero, unidade mg/L, data e ponto de cada medição.', ok: true },
          { t: 'Barras sem escala, com a medição do píer desenhada três vezes maior que as outras.', porque: 'Sem escala e com tamanhos exagerados, o gráfico distorce a informação.' },
          { t: 'Um lago pintado de preto com uma caveira, para chamar a atenção dos moradores.', porque: 'O alarme visual transmite um perigo que os dados não mostram.' },
          { t: 'Uma linha de tendência descendente que parte da única medição de OD feita no lago.', porque: 'Com uma só medição não existe tendência a desenhar.' },
        ],
      }],
    ],
  };
  Object.entries(extra).forEach(([id, lista]) => {
    const c = MI.CAPITULOS.find((x) => x.id === id);
    // insere do fim para o começo, para não deslocar as posições
    lista.slice().sort((a, b) => b[0] - a[0]).forEach(([pos, passo]) => c.desafio.passos.splice(pos, 0, passo));
  });

  // a missão 6 deixa de ser a última
  const salao = MI.CAPITULOS.find((c) => c.id === 'salao');
  salao.fim.push({ p: 'marta', t: 'Mas a investigação não acabou. No mês que vem, vamos seguir o córrego, da nascente até o lago.' });

  // ---------- missões 7, 8 e 9 ----------
  MI.CAPITULOS.push(
    {
      id: 'horta', num: 7, titulo: 'Seguindo o córrego', comodo: 'Horta e Córrego', contexto: 'Campo — amostragem a montante e a jusante',
      cena: 'horta', musica: 'horta', cartao: 'Cartão 4 · Campo',
      resumo: 'Um mês depois, a equipe percorre o córrego que abastece o lago. Coletas antes e depois da horta e da galeria do bairro vão mostrar onde o fósforo aumenta, mas não dizem, sozinhas, quem é o responsável.',
      intro: [
        { p: 'benedito', t: 'Bom dia, pessoal! Desde a reunião, passei a adubar a horta só com composto, e na medida certa.' },
        { p: 'marta', t: 'Que ótima notícia, Seu Benedito! Hoje vamos coletar água em três pontos do córrego: antes da horta, depois da horta e depois da galeria pluvial do bairro.' },
        { p: 'marta', t: 'Viemos ao amanhecer de propósito: é nessa hora que o oxigênio dissolvido costuma estar mais baixo, porque durante a noite as algas não fazem fotossíntese e só consomem oxigênio.' },
        { p: 'marta', t: 'Encontre o amostrador, as fitas de pH, a sonda e o restante do material de campo espalhado pela horta e pelas margens.' },
      ],
      meio: [
        { p: 'lucia', t: 'Resultados da campanha de 14/11: fósforo total de 0,05 mg/L no C1, 0,07 mg/L no C2 e 0,21 mg/L no C3, logo depois da galeria pluvial.' },
        { p: 'benedito', t: 'E mesmo sem chuva, saía água com espuma e cheiro forte daquela galeria.' },
        { p: 'tiago', t: 'Pronto, caso resolvido! Escrevi: achamos o culpado, o esgoto do bairro é a única causa da eutrofização do lago.' },
        { p: 'marta', t: 'Calma, Tiago. Os dados apontam um lugar no córrego, não um culpado. Vamos analisar a frase com o quarto cartão.' },
      ],
      desafio: {
        titulo: 'Onde aumenta ou quem é o culpado?',
        frase: 'Achamos o culpado: o esgoto do bairro é a única causa da eutrofização do lago.',
        passos: [
          {
            tipo: 'escolha', rotulo: 'c',
            enunciado: 'No córrego, o ponto C1 fica antes da horta e o C2 fica depois dela. Como descrever corretamente?',
            opcoes: [
              { t: 'O ponto C1 está a montante da horta, e o ponto C2 está a jusante dela.', ok: true },
              { t: 'O ponto C1 está a jusante da horta, e o ponto C2 está a montante dela.', porque: 'Montante é o lado de onde a água vem; jusante é para onde ela vai. A ordem está invertida.' },
              { t: 'Os pontos C1 e C2 ficam na foz do córrego, um de cada lado da horta.', porque: 'A foz é onde o córrego encontra o lago; os pontos estão ao longo do córrego.' },
              { t: 'O ponto C1 fica na nascente do lago, e o ponto C2, na margem direita.', porque: 'Lagos não têm nascente nesse sentido, e a posição em relação à horta se perdeu.' },
            ],
          },
          {
            tipo: 'marcar', rotulo: 1,
            enunciado: 'Toque nas duas expressões que vão além do que os dados permitem.',
            partes: ['Achamos o culpado:', 'o esgoto do bairro', 'é a única causa', 'da eutrofização do lago.'],
            corretas: [0, 2],
            explica: 'Achamos o culpado e é a única causa transformam um aumento de fósforo num ponto em acusação e em certeza. Os dados de uma campanha indicam onde investigar, não quem responsabilizar.',
            erro: 'Essa parte não é o problema principal. Procure as expressões que acusam e que excluem outras causas.',
            erros: { 1: 'Boa observação: ainda não foi confirmado que é esgoto. Mas os problemas maiores estão em culpado e em única causa.' },
          },
          {
            tipo: 'escolha', rotulo: 2,
            enunciado: 'Como reescrever a frase do relatório de campo?',
            opcoes: [
              { t: 'Em 14/11, o fósforo total subiu de 0,07 para 0,21 mg/L após a galeria pluvial, possível fonte pontual a confirmar.', ok: true },
              { t: 'Em 14/11, o fósforo total subiu após a galeria pluvial, o que prova que só o esgoto das casas polui o lago.', porque: 'Uma campanha mostra onde a concentração aumentou; não prova origem nem exclui outras fontes.' },
              { t: 'O fósforo total ficou alto em todos os pontos, então a horta e o bairro poluem o lago na mesma proporção.', porque: 'Os valores foram bem diferentes entre os pontos; a frase distorce os dados.' },
              { t: 'A galeria pluvial do bairro lança esgoto clandestino, como comprovam a espuma e o cheiro vistos em 14/11.', porque: 'Espuma e cheiro são indícios; a ligação irregular de esgoto ainda precisa ser verificada.' },
            ],
            justificativa: {
              enunciado: 'Que evidência sustenta essa versão?',
              opcoes: [
                { t: 'Compara montante e jusante com data e valores, e trata a galeria como fonte provável.', ok: true },
                { t: 'Evita citar a galeria, para que ninguém do bairro se sinta acusado pela equipe técnica.', porque: 'Ela cita a galeria, sim. O cuidado está em não transformar indício em acusação.' },
                { t: 'Usa a expressão fonte pontual, que torna qualquer frase automaticamente mais científica.', porque: 'O termo ajuda, mas o rigor vem de dados comparáveis e de limites declarados.' },
                { t: 'Afirma que o esgoto é a causa, só que de um jeito mais educado e bem menos direto.', porque: 'Ela não afirma a causa: indica uma fonte provável que ainda precisa ser confirmada.' },
              ],
            },
          },
          {
            tipo: 'classificar', rotulo: 'p',
            enunciado: 'Classifique cada situação como fonte pontual ou fonte difusa de poluição.',
            categorias: [
              { id: 'pon', nome: 'Fonte pontual' },
              { id: 'dif', nome: 'Fonte difusa' },
            ],
            itens: [
              { t: 'Saída da galeria pluvial do bairro no córrego.', c: 'pon', porque: 'Lança num ponto definido, que pode ser localizado e amostrado.' },
              { t: 'Escoamento da chuva sobre a horta adubada.', c: 'dif', porque: 'A água escorre por uma área, sem um ponto único de lançamento.' },
              { t: 'Cano de lançamento de uma indústria.', c: 'pon', porque: 'É um lançamento concentrado num único local.' },
              { t: 'Enxurrada que passa por ruas e quintais.', c: 'dif', porque: 'Recolhe poluentes de uma área ampla e espalhada.' },
              { t: 'Tubulação de esgoto ligada à rede de drenagem.', c: 'pon', porque: 'É uma ligação num local específico da rede.' },
              { t: 'Sedimentos levados das margens sem mata ciliar.', c: 'dif', porque: 'Vêm de trechos extensos da margem, não de um ponto.' },
            ],
          },
          {
            tipo: 'multi', rotulo: 3, n: 2,
            enunciado: 'Quais duas áreas mais ajudam a interpretar a campanha do córrego? Escolha duas.',
            opcoes: [
              { t: 'Química: interpretar a variação de concentração entre os pontos, com unidade e método.', ok: true },
              { t: 'Geografia: localizar os pontos no mapa da bacia e explicar o sentido do fluxo da água.', ok: true },
              { t: 'Matemática: somar os valores dos três pontos e apresentar só o total da campanha.', porque: 'Somar concentrações de pontos diferentes apaga justamente a comparação que importa.' },
              { t: 'Língua Portuguesa: trocar provável por certo para deixar o relatório mais firme.', porque: 'Trocar o grau de certeza muda o sentido e vai além das evidências.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 4,
            enunciado: 'Que pergunta ajudaria o Tiago a planejar o próximo passo da investigação?',
            opcoes: [
              { t: 'O que precisaríamos observar ou medir para confirmar se a galeria recebe esgoto?', ok: true },
              { t: 'Quem do bairro vocês acham que está jogando esgoto escondido na galeria pluvial?', porque: 'Buscar culpados antes das evidências desvia a investigação técnica.' },
              { t: 'Podemos concluir logo, já que a espuma e o cheiro deixam tudo muito claro, não é?', porque: 'A pergunta induz a resposta e trata indícios como prova.' },
              { t: 'Se o Seu Benedito ficou de fora, podemos parar de investigar a horta agora, certo?', porque: 'Uma campanha não descarta nenhuma fonte; o monitoramento continua.' },
            ],
          },
        ],
      },
      fim: [
        { p: 'tiago', t: 'Então os dados dizem onde o fósforo aumenta. Quem confirma a origem são novas evidências, como uma vistoria na galeria.' },
        { p: 'benedito', t: 'E a minha horta? O C2 subiu um pouquinho.' },
        { p: 'marta', t: 'Um pouco, sim, Seu Benedito. Fontes difusas também contam, e o composto na medida certa já ajuda. Agora, vamos à torre colocar tudo isso no mapa.' },
      ],
      cartoes: ['saneamento', 'ecologia'],
      glossario: ['montante', 'jusante', 'fonte_pontual', 'fonte_difusa', 'campanha', 'galeria_pluvial'],
      evidencias: [
        'Campanha de 14/11 no córrego: fósforo total 0,05 mg/L (C1, antes da horta), 0,07 mg/L (C2, depois da horta) e 0,21 mg/L (C3, depois da galeria pluvial).',
        'Observação: saída de água com espuma e odor forte na galeria pluvial, sem chuva.',
        'Relato do caseiro: adubação passou a ser feita só com composto.',
      ],
    },
    {
      id: 'mapas', num: 8, titulo: 'O que o mapa mostra', comodo: 'Sala de Mapas', contexto: 'Escritório — cartografia e uso do solo',
      cena: 'mapas', musica: 'mapas', cartao: 'Cartão 5 · Escritório',
      resumo: 'Na torre, mapas antigos e fotos aéreas mostram como a bacia do córrego mudou desde 1962. Um mapa localiza e compara, mas não prova causas: escala, legenda e bacia hidrográfica entram na investigação.',
      intro: [
        { p: 'helena', t: 'Na torre, meu pai guardava mapas e fotos aéreas da região. Ninguém sobe aqui há anos!' },
        { p: 'marta', t: 'Perfeito para a próxima etapa, Dona Helena: representar os pontos de coleta no mapa e entender a bacia do córrego.' },
        { p: 'marta', t: 'Encontre o escalímetro, as fotos aéreas, o mapa topográfico e o restante do material de cartografia.' },
      ],
      meio: [
        { p: 'helena', t: 'Vejam esta foto de 1962: só havia sítios em volta do córrego.' },
        { p: 'tiago', t: 'E na de 2026, o bairro ocupa quase metade da bacia! Já escrevi na legenda: o mapa comprova que o bairro poluiu o lago.' },
        { p: 'marta', t: 'Tiago, o que um mapa mostra, exatamente? Vamos ao quinto cartão.' },
      ],
      desafio: {
        titulo: 'O mapa mostra ou prova?',
        frase: 'O mapa comprova que o bairro poluiu o lago.',
        passos: [
          {
            tipo: 'marcar', rotulo: 1,
            enunciado: 'Toque nas duas expressões que vão além do que um mapa pode mostrar.',
            partes: ['O mapa', 'comprova', 'que o bairro', 'poluiu o lago.'],
            corretas: [1, 3],
            explica: 'Comprova e poluiu o lago afirmam uma causa. O mapa mostra onde as coisas estão e como o uso do solo mudou; a relação de causa exige outras evidências.',
            erro: 'Essa parte não é o problema. Procure o verbo forte e a afirmação de causa.',
          },
          {
            tipo: 'escolha', rotulo: 2,
            enunciado: 'Como reescrever a legenda do mapa?',
            opcoes: [
              { t: 'O mapa mostra que a área urbana cresceu na bacia do córrego entre 1962 e 2026 e localiza a galeria perto do C3.', ok: true },
              { t: 'O mapa comprova que o crescimento do bairro entre 1962 e 2026 é a única causa da poluição do Lago do Ipê.', porque: 'O mapa mostra o crescimento urbano, mas não demonstra causa, muito menos causa única.' },
              { t: 'O mapa mostra que o lago ficou poluído em 1962, quando a cidade começou a crescer em volta da bacia do córrego.', porque: 'Nenhum mapa ou foto mediu a qualidade da água em 1962.' },
              { t: 'O mapa não serve para nada na investigação, porque não mede o fósforo nem o oxigênio da água do Lago do Ipê.', porque: 'O mapa não mede a água, mas mostra onde procurar fontes e como o território mudou.' },
            ],
            justificativa: {
              enunciado: 'Por que essa legenda é mais rigorosa?',
              opcoes: [
                { t: 'Descreve o que o mapa representa, a localização e o uso do solo, sem afirmar causa.', ok: true },
                { t: 'Esconde o crescimento do bairro, para não criar conflito com os moradores do entorno.', porque: 'Ela mostra o crescimento urbano. O cuidado é não transformá-lo em acusação.' },
                { t: 'Cita anos, o que deixa qualquer legenda automaticamente científica e confiável.', porque: 'Datas ajudam, mas o rigor vem de dizer só o que o mapa realmente representa.' },
                { t: 'Afirma a culpa do bairro de um jeito mais discreto, sem usar a palavra comprova.', porque: 'Ela não afirma culpa: descreve dados espaciais e a posição da galeria.' },
              ],
            },
          },
          {
            tipo: 'escolha', rotulo: 'c',
            enunciado: 'O mapa da bacia está na escala 1:10.000. O que isso significa?',
            opcoes: [
              { t: 'Cada 1 cm no mapa corresponde a 10.000 cm, ou seja, 100 m no terreno.', ok: true },
              { t: 'Cada 1 cm no mapa corresponde a 10.000 m, ou seja, 10 km no terreno.', porque: 'A escala usa a mesma unidade dos dois lados: 1 cm para 10.000 cm, que são 100 m.' },
              { t: 'O mapa representa uma área total de exatamente 10.000 metros quadrados.', porque: 'A escala indica a proporção de redução, não o tamanho da área mapeada.' },
              { t: 'O mapa foi desenhado com 10.000 pontos de coleta espalhados pela bacia.', porque: 'A escala não tem relação com o número de pontos marcados.' },
            ],
          },
          {
            tipo: 'classificar', rotulo: 'c',
            enunciado: 'O que o mapa consegue mostrar e o que exige outra evidência?',
            categorias: [
              { id: 'mapa', nome: 'O mapa mostra' },
              { id: 'outra', nome: 'Exige outra evidência' },
            ],
            itens: [
              { t: 'Onde ficam os pontos de coleta C1, C2 e C3.', c: 'mapa', porque: 'Localização é a informação básica de um mapa.' },
              { t: 'Para onde a água escoa, pelas curvas de nível.', c: 'mapa', porque: 'As curvas de nível mostram o relevo e o caminho da água.' },
              { t: 'Quanto a área urbana cresceu desde 1962.', c: 'mapa', porque: 'Fotos aéreas de épocas diferentes permitem comparar o uso do solo.' },
              { t: 'Se a galeria pluvial recebe esgoto das casas.', c: 'outra', porque: 'Exige vistoria, análise da água e verificação da rede.' },
              { t: 'Qual é a concentração de fósforo em cada ponto.', c: 'outra', porque: 'Só a análise de laboratório informa concentrações.' },
              { t: 'Quem é o responsável legal pela galeria pluvial.', c: 'outra', porque: 'Depende de documentos e da gestão pública, não do mapa.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 'c',
            enunciado: 'Por que o mapa da bacia hidrográfica ajuda a investigar o lago?',
            opcoes: [
              { t: 'Mostra toda a área cuja água escoa para o córrego e o lago, indicando onde procurar fontes.', ok: true },
              { t: 'Mostra a profundidade exata do lago em todos os pontos, o que dispensa novas coletas de água.', porque: 'A bacia é a área de contribuição; profundidade é outro tipo de levantamento.' },
              { t: 'Mostra só a superfície do lago, já que a água que cai fora dele nunca chega até a margem.', porque: 'A chuva que cai em toda a bacia escoa até o córrego e o lago.' },
              { t: 'Mostra os limites do bairro definidos pela prefeitura, que são iguais aos limites da bacia.', porque: 'Limites administrativos e limites de bacia raramente coincidem.' },
            ],
          },
          {
            tipo: 'multi', rotulo: 3, n: 2,
            enunciado: 'Quais duas áreas mais ajudam a ler os mapas e as fotos da torre? Escolha duas.',
            opcoes: [
              { t: 'Geografia: interpretar escala, legenda e curvas de nível para delimitar a bacia do córrego.', ok: true },
              { t: 'História: comparar as fotos aéreas de 1962 e de 2026, separando documento de interpretação.', ok: true },
              { t: 'Artes: pintar o bairro de vermelho no mapa, para deixar claro que ele é o grande culpado.', porque: 'A cor deve ter significado na legenda, sem sugerir culpa que os dados não mostram.' },
              { t: 'Educação Física: medir a bacia em passos, sem escala, para economizar o tempo da equipe.', porque: 'Sem escala, as distâncias não são comparáveis nem verificáveis.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 4,
            enunciado: 'Que pergunta ajudaria a turma a usar o mapa com rigor?',
            opcoes: [
              { t: 'O que este mapa mostra e o que ele não consegue mostrar sobre a qualidade da água?', ok: true },
              { t: 'Qual cor deixa o bairro mais assustador no mapa que vamos mostrar aos moradores?', porque: 'O objetivo é comunicar com clareza, não assustar.' },
              { t: 'Vocês concordam que o mapa já resolveu o caso e que não precisamos de mais dados?', porque: 'A pergunta induz a resposta e trata o mapa como prova.' },
              { t: 'Por que não apagamos as fotos antigas, se o que importa é só a situação de hoje?', porque: 'As fotos antigas são registros históricos úteis para entender a mudança no uso do solo.' },
            ],
          },
        ],
      },
      fim: [
        { p: 'tiago', t: 'Nova legenda: o mapa mostra o crescimento urbano na bacia e onde fica a galeria. A causa, quem confirma são as análises e a vistoria.' },
        { p: 'helena', t: 'Meu pai ficaria orgulhoso de ver os mapas dele ajudando o lago.' },
        { p: 'marta', t: 'Com certeza, Dona Helena. Agora falta o passo final: entregar o relatório à Secretaria de Meio Ambiente. A reunião será na sala de jantar.' },
      ],
      cartoes: ['cartografia', 'planejamento'],
      glossario: ['bacia_hidrografica', 'escala', 'legenda', 'curva_nivel', 'uso_solo', 'foto_aerea'],
      evidencias: [
        'Mapa da bacia (escala 1:10.000) com os pontos P1 a P3 e C1 a C3 localizados.',
        'Fotos aéreas: a bacia passou de sítios (1962) para cerca de metade de área urbana (2026).',
        'A galeria pluvial do bairro deságua no córrego entre os pontos C2 e C3.',
      ],
    },
    {
      id: 'jantar', num: 9, titulo: 'O relatório final', comodo: 'Sala de Jantar', contexto: 'Pesquisa — relatório e encaminhamento',
      cena: 'jantar', musica: 'jantar', cartao: 'Cartão 6 · Pesquisa',
      resumo: 'A analista da Secretaria de Meio Ambiente vem ler o relatório técnico. Separar resultados, discussão e recomendações, declarar os limites e respeitar quem fiscaliza e decide: esse é o último desafio.',
      intro: [
        { p: 'helena', t: 'Pus a mesa de jantar para uma reunião importante: a analista da Secretaria de Meio Ambiente veio ler o nosso relatório.' },
        { p: 'joana', t: 'Boa noite. Um relatório técnico precisa separar o que foi medido, o que se interpreta e o que se recomenda. É isso que vou avaliar.' },
        { p: 'marta', t: 'Vamos organizar a mesa e os documentos: relatório, mapas, laudos, a agenda das próximas coletas e o restante do material.' },
      ],
      meio: [
        { p: 'tiago', t: 'Escrevi a conclusão: recomendamos multar os moradores do bairro imediatamente.' },
        { p: 'joana', t: 'Multar não é papel da equipe técnica, Tiago. Vocês recomendam; quem fiscaliza e decide é o órgão ambiental competente. E multar todos os moradores, sem identificar ninguém?' },
        { p: 'marta', t: 'Vamos ao último cartão: recomendação ou decisão?' },
      ],
      desafio: {
        titulo: 'Recomendação ou decisão?',
        frase: 'Recomendamos multar os moradores do bairro imediatamente.',
        passos: [
          {
            tipo: 'marcar', rotulo: 1,
            enunciado: 'Toque nas duas expressões que não cabem numa recomendação técnica.',
            partes: ['Recomendamos', 'multar', 'os moradores do bairro', 'imediatamente.'],
            corretas: [1, 2],
            explica: 'Multar é uma decisão de fiscalização, que cabe ao órgão competente. Os moradores do bairro generaliza a responsabilidade sem que nenhuma ligação irregular tenha sido identificada.',
            erro: 'Essa parte não é o problema principal. Procure a ação que não cabe à equipe e a generalização.',
            erros: { 3: 'Boa observação: a urgência também merece cuidado. Mas os problemas maiores estão em multar e em os moradores do bairro.' },
          },
          {
            tipo: 'escolha', rotulo: 2,
            enunciado: 'Como reescrever a recomendação do relatório?',
            opcoes: [
              { t: 'Recomenda-se ao órgão ambiental vistoriar a galeria pluvial, verificar ligações irregulares e manter o monitoramento mensal.', ok: true },
              { t: 'Recomenda-se ao órgão ambiental multar todos os moradores do bairro e fechar a galeria pluvial ainda nesta semana, sem exceções.', porque: 'Multar e fechar são decisões de fiscalização, e todos os moradores generaliza sem evidência.' },
              { t: 'A equipe técnica decidiu interditar a galeria pluvial e aplicar multas às casas mais próximas do córrego a partir de hoje mesmo.', porque: 'A equipe técnica não tem poder de decisão nem de fiscalização.' },
              { t: 'Recomenda-se encerrar o monitoramento do lago, já que a causa do problema foi totalmente comprovada pelas duas campanhas.', porque: 'Duas campanhas indicam hipóteses; encerrar o monitoramento contraria as evidências.' },
            ],
            justificativa: {
              enunciado: 'Por que essa é a recomendação adequada?',
              opcoes: [
                { t: 'Indica ações compatíveis com as evidências e respeita o papel de quem fiscaliza e decide.', ok: true },
                { t: 'É mais longa, e recomendações longas costumam ser aceitas com mais facilidade pelo órgão.', porque: 'O tamanho não é critério. O que importa é a ligação entre evidência e ação.' },
                { t: 'Evita qualquer ação concreta, para que a equipe técnica não se comprometa com o resultado.', porque: 'Ela propõe ações concretas: vistoria, verificação da rede e monitoramento.' },
                { t: 'Garante que o problema do lago será resolvido em poucas semanas, sem nenhuma dúvida.', porque: 'Nenhuma recomendação garante prazos; a recuperação precisa ser acompanhada.' },
              ],
            },
          },
          {
            tipo: 'classificar', rotulo: 'r',
            enunciado: 'Em que seção do relatório entra cada trecho?',
            categorias: [
              { id: 'res', nome: 'Resultados' },
              { id: 'dis', nome: 'Discussão' },
              { id: 'rec', nome: 'Recomendações' },
            ],
            itens: [
              { t: 'Fósforo total de 0,21 mg/L no ponto C3, em 14/11.', c: 'res', porque: 'É um dado medido, com valor, unidade, ponto e data.' },
              { t: 'O aumento após a galeria é compatível com lançamento de esgoto, ainda a confirmar.', c: 'dis', porque: 'Interpreta os resultados e declara a incerteza.' },
              { t: 'Vistoriar a galeria e verificar ligações irregulares na rede.', c: 'rec', porque: 'É uma ação proposta a quem tem competência para executá-la.' },
              { t: 'OD de 2,1 mg/L no ponto P1, em 14/10.', c: 'res', porque: 'É um dado medido em campo.' },
              { t: 'A coloração verde é compatível com proliferação de algas.', c: 'dis', porque: 'Relaciona observação e conhecimento científico, sem afirmar certeza.' },
              { t: 'Manter medições mensais em P1, P2, P3 e no córrego.', c: 'rec', porque: 'Propõe a continuidade do monitoramento.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 'r',
            enunciado: 'Qual frase descreve corretamente os limites do estudo?',
            opcoes: [
              { t: 'Foram duas campanhas, em poucos pontos; os resultados indicam hipóteses, não um diagnóstico definitivo.', ok: true },
              { t: 'Os limites não devem constar no relatório, porque deixariam o documento com aparência menos confiável.', porque: 'Declarar os limites aumenta a confiança: mostra o que os dados permitem e o que não permitem.' },
              { t: 'Não há limites no estudo, já que todas as medições seguiram métodos de laboratório bem reconhecidos.', porque: 'Bons métodos não eliminam limites de número de coletas, pontos e datas.' },
              { t: 'O estudo foi limitado apenas pela chuva, que impediu as coletas em alguns dias do mês de novembro.', porque: 'A frase ignora os limites principais: poucas campanhas e poucos pontos.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 'p',
            enunciado: 'Joana precisa de um documento assinado com a opinião técnica fundamentada sobre o caso. Qual é o nome correto?',
            opcoes: [
              { t: 'Parecer técnico: análise do caso com a opinião fundamentada da equipe', ok: true },
              { t: 'Laudo de laboratório: resultados das análises de cada amostra coletada', porque: 'O laudo traz resultados de análises; não apresenta a opinião técnica sobre o caso.' },
              { t: 'Notificação: aviso oficial do órgão ambiental dirigido a um responsável', porque: 'A notificação é emitida pelo órgão fiscalizador, não pela equipe técnica.' },
              { t: 'Manchete: título de notícia usado para divulgar o caso para o público', porque: 'Manchete é gênero jornalístico, não documento técnico.' },
            ],
          },
          {
            tipo: 'multi', rotulo: 3, n: 2,
            enunciado: 'Quais duas áreas mais ajudam a finalizar o relatório e a devolutiva? Escolha duas.',
            opcoes: [
              { t: 'Língua Portuguesa: revisar o relatório técnico, com seções, impessoalidade e precisão.', ok: true },
              { t: 'Sociologia: planejar a devolutiva aos moradores, ouvindo percepções sem expor pessoas.', ok: true },
              { t: 'Matemática: arredondar todos os valores para inteiros, deixando a tabela mais limpa.', porque: 'Arredondar 0,21 ou 0,07 para inteiros apagaria as diferenças medidas.' },
              { t: 'Filosofia: escolher a conclusão mais convincente, mesmo sem dados que a sustentem.', porque: 'Uma boa conclusão é a mais bem fundamentada, não a mais convincente.' },
            ],
          },
          {
            tipo: 'escolha', rotulo: 4,
            enunciado: 'Antes de entregar o relatório, que pergunta a equipe deve se fazer?',
            opcoes: [
              { t: 'Cada recomendação está ligada a uma evidência e a quem cabe executá-la?', ok: true },
              { t: 'O relatório está longo o bastante para impressionar a analista do órgão?', porque: 'Extensão não é qualidade: o que conta é a clareza e a fundamentação.' },
              { t: 'Conseguimos apontar um culpado para encerrar logo a investigação do lago?', porque: 'O papel do relatório é fundamentar ações, não apontar culpados.' },
              { t: 'Podemos tirar a seção de limites, para o relatório parecer mais seguro?', porque: 'Os limites dão transparência e precisam permanecer.' },
            ],
          },
        ],
      },
      fim: [
        { p: 'joana', t: 'Relatório aprovado para encaminhamento. A Secretaria vai vistoriar a galeria pluvial e acompanhar o monitoramento mensal com vocês.' },
        { p: 'helena', t: 'E o meu lago, Marta? Vai voltar a ser como antes?' },
        { p: 'marta', t: 'A recuperação é gradual, Dona Helena. Com o monitoramento, vamos saber se as medidas estão funcionando, e com dados, não com palpites.' },
        { p: 'marta', t: 'Do primeiro relato ao relatório final, você escolheu e justificou cada palavra. Caso encerrado, por enquanto!' },
      ],
      cartoes: ['legislacao', 'educacao_ambiental'],
      glossario: ['relatorio_tecnico', 'parecer', 'recomendacao', 'orgao_ambiental', 'notificacao', 'ligacao_irregular'],
      evidencias: [
        'Relatório técnico com resultados, discussão, limites e recomendações, aprovado para encaminhamento.',
        'Encaminhamento: vistoria da galeria pluvial pela Secretaria de Meio Ambiente e monitoramento mensal mantido.',
      ],
    }
  );

  // ---------- glossário ----------
  Object.assign(MI.GLOSSARIO, {
    montante: { termo: 'Montante', ingles: 'upstream', ctx: 'Campo', def: 'Trecho de um rio ou córrego de onde a água vem, antes de um ponto de referência.', ex: 'O ponto C1 fica a montante da horta.' },
    jusante: { termo: 'Jusante', ingles: 'downstream', ctx: 'Campo', def: 'Trecho para onde a água vai, depois de um ponto de referência.', ex: 'O ponto C3 fica a jusante da galeria pluvial.' },
    fonte_pontual: { termo: 'Fonte pontual', ingles: 'point source', ctx: 'Campo', def: 'Lançamento de poluentes num local definido, como um cano ou uma galeria.', ex: 'A galeria pluvial é uma possível fonte pontual.' },
    fonte_difusa: { termo: 'Fonte difusa', ingles: 'nonpoint source', ctx: 'Campo', def: 'Poluição que chega espalhada por uma área, como o escoamento da chuva sobre lavouras e ruas.', ex: 'O escoamento da horta adubada é uma fonte difusa.' },
    campanha: { termo: 'Campanha de amostragem', ingles: 'sampling campaign', ctx: 'Campo', def: 'Conjunto de coletas feitas numa mesma data, com os mesmos métodos, em pontos planejados.', ex: 'Na campanha de 14/11, foram amostrados três pontos do córrego.' },
    galeria_pluvial: { termo: 'Galeria pluvial', ingles: 'storm drain', ctx: 'Campo', def: 'Tubulação que leva a água da chuva das ruas até rios e córregos. Não deveria receber esgoto.', ex: 'Saía água da galeria mesmo sem chuva.' },
    bacia_hidrografica: { termo: 'Bacia hidrográfica', ingles: 'watershed', ctx: 'Escritório', def: 'Área de terreno cuja água da chuva escoa para um mesmo rio, córrego ou lago.', ex: 'O bairro ocupa quase metade da bacia do córrego.' },
    escala: { termo: 'Escala cartográfica', ingles: 'map scale', ctx: 'Escritório', def: 'Relação entre as medidas no mapa e as medidas reais no terreno.', ex: 'Na escala 1:10.000, 1 cm no mapa equivale a 100 m.' },
    legenda: { termo: 'Legenda', ingles: 'map legend', ctx: 'Escritório', def: 'Quadro que explica as cores, símbolos e linhas usados no mapa.', ex: 'A legenda indica pontos de coleta e área urbana.' },
    curva_nivel: { termo: 'Curva de nível', ingles: 'contour line', ctx: 'Escritório', def: 'Linha que une pontos de mesma altitude; mostra o relevo e o caminho da água.', ex: 'As curvas de nível mostram que a água escorre para o córrego.' },
    uso_solo: { termo: 'Uso e ocupação do solo', ingles: 'land use', ctx: 'Escritório', def: 'Como o território é utilizado: mata, lavoura, pasto, área urbana, entre outros.', ex: 'O uso do solo na bacia mudou muito desde 1962.' },
    foto_aerea: { termo: 'Fotografia aérea', ingles: 'aerial photograph', ctx: 'Escritório', def: 'Imagem tirada do alto, por avião ou drone, usada para mapear e comparar o território.', ex: 'As fotos aéreas de 1962 e 2026 foram comparadas.' },
    relatorio_tecnico: { termo: 'Relatório técnico', ingles: 'technical report', ctx: 'Pesquisa', def: 'Documento que apresenta objetivo, métodos, resultados, discussão, limites e recomendações.', ex: 'O relatório separa resultados de interpretações.' },
    parecer: { termo: 'Parecer técnico', ingles: 'technical opinion', ctx: 'Pesquisa', def: 'Documento assinado com a análise e a opinião fundamentada de especialistas sobre um caso.', ex: 'A equipe emitiu um parecer técnico sobre o lago.' },
    recomendacao: { termo: 'Recomendação', ingles: 'recommendation', ctx: 'Pesquisa', def: 'Ação proposta com base em evidências, dirigida a quem tem competência para executá-la.', ex: 'Recomenda-se vistoriar a galeria pluvial.' },
    orgao_ambiental: { termo: 'Órgão ambiental competente', ingles: 'environmental agency', ctx: 'Pesquisa', def: 'Instituição pública responsável por licenciar, fiscalizar e decidir sobre questões ambientais.', ex: 'Quem fiscaliza e aplica sanções é o órgão ambiental.' },
    notificacao: { termo: 'Notificação', ingles: 'notice', ctx: 'Pesquisa', def: 'Comunicação oficial do órgão fiscalizador a um responsável, pedindo providências.', ex: 'Uma notificação só pode ser emitida pelo órgão competente.' },
    ligacao_irregular: { termo: 'Ligação irregular de esgoto', ingles: 'illicit sewer connection', ctx: 'Pesquisa', def: 'Esgoto ligado à rede de drenagem da chuva, em vez da rede de esgoto.', ex: 'A vistoria vai verificar se há ligações irregulares.' },
  });

  // ---------- cartões dos componentes técnicos ----------
  Object.assign(MI.CARTOES, {
    saneamento: { area: 'Saneamento Ambiental', cor: '#1f7a8c', sigla: 'SAN', texto: 'Explicar a diferença entre rede de drenagem e rede de esgoto, e como ligações irregulares afetam córregos e lagos.', pergunta: 'Para onde vai a água desta tubulação?' },
    ecologia: { area: 'Ecologia', cor: '#4f8a3a', sigla: 'ECO', texto: 'Relacionar nutrientes, algas, oxigênio e organismos aquáticos, distinguindo o ciclo ecológico do que foi medido no lago.', pergunta: 'O que o ecossistema sugere e o que os dados mostram?' },
    cartografia: { area: 'Cartografia e Geoprocessamento', cor: '#a8742a', sigla: 'CAR', texto: 'Produzir um mapa dos pontos de coleta com escala, legenda, orientação e fonte, sem induzir conclusões pelas cores.', pergunta: 'O mapa tem escala, legenda e fonte?' },
    planejamento: { area: 'Planejamento e Gestão Ambiental', cor: '#6a4fb5', sigla: 'GES', texto: 'Planejar o monitoramento: pontos, frequência, parâmetros, responsáveis e forma de registro dos dados.', pergunta: 'Quem mede o quê, onde e com que frequência?' },
    legislacao: { area: 'Legislação Ambiental', cor: '#7a2335', sigla: 'LEG', texto: 'Identificar quem tem competência para fiscalizar, notificar e decidir, e o que cabe à equipe técnica recomendar.', pergunta: 'Isto é recomendação ou decisão? De quem?' },
    educacao_ambiental: { area: 'Educação Ambiental', cor: '#d0602a', sigla: 'EA', texto: 'Planejar a devolutiva à comunidade, com linguagem acessível, escuta das percepções e respeito às pessoas.', pergunta: 'Como envolver a comunidade sem expor ninguém?' },
  });

  // ---------- restauração ----------
  MI.RESTAURACAO.push(
    { id: 'horta_agro', nome: 'Horta agroecológica', custo: 5, desc: 'Canteiros com composteira e adubação na medida certa, que reduzem a chegada de nutrientes ao córrego.' },
    { id: 'placas', nome: 'Trilha educativa do lago', custo: 4, desc: 'Placas que explicam a bacia, os pontos de coleta e por que o monitoramento continua.' },
    { id: 'mirante', nome: 'Mirante da torre', custo: 5, desc: 'A sala de mapas ganha uma luneta para observar o lago e a bacia do córrego.' }
  );

  // ---------- trilhas das novas missões ----------
})();
