 const canvas = document.getElementById('estrelasCanvas');
    const ctx = canvas.getContext('2d');

    let estrelas = [];
    let numEstrelas = 150;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function criaEstrelas() {
      estrelas = [];
      for (let i = 0; i < numEstrelas; i++) {
        estrelas.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          alpha: Math.random(),
          delta: Math.random() * 0.02
        });
      }
    }

    function animaEstrelas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let estrela of estrelas) {
        ctx.beginPath();
        ctx.arc(estrela.x, estrela.y, estrela.radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255, 255, 255, ${estrela.alpha})`;
        ctx.fill();
        estrela.alpha += estrela.delta;
        if (estrela.alpha <= 0 || estrela.alpha >= 1) {
          estrela.delta = -estrela.delta;
        }
      }
      requestAnimationFrame(animaEstrelas);
    }

    window.addEventListener('resize', () => {
      resizeCanvas();
      criaEstrelas();
    });

    resizeCanvas();
    criaEstrelas();
    animaEstrelas();

    // Mostrar info e zoom ao clicar na imagem
function mostrarInfo(tipo) {
  const infoBox = document.getElementById('infoBox');
  const imagens = document.querySelectorAll('.objeto');
  const imagemAlvo = document.querySelector(`.${tipo}`);
  const espacos = document.querySelector('.espacos');

  const jaComZoom = imagemAlvo.classList.contains('zoom');

  if (jaComZoom) {
    imagemAlvo.classList.remove('zoom');
    espacos.classList.remove('blur-outros');
    infoBox.style.display = 'none';
    return;
  }

  imagens.forEach(img => img.classList.remove('zoom'));
  espacos.classList.add('blur-outros');

  let texto = '';

  switch (tipo) {
  case 'nebulosa':
    texto = 'A Nebulosa de Órion, também conhecida como M42, é uma vasta nuvem de gás e poeira localizada a aproximadamente 1.344 anos-luz da Terra, na constelação de Órion. É uma das regiões de formação estelar mais próximas e brilhantes visíveis a olho nu. Essa nebulosa é uma gigantesca fábrica cósmica, onde novas estrelas nascem a partir do colapso de nuvens densas de hidrogênio. Dentro dela, processos complexos de ionização e radiação ultravioleta criam uma luminosidade brilhante e colorida, visível em imagens feitas por telescópios espaciais. A Nebulosa de Órion tem cerca de 24 anos-luz de diâmetro e é um laboratório natural para o estudo da evolução estelar.';
    break;
  case 'pilar':
    texto = 'Os Pilares da Criação são estruturas icônicas dentro da Nebulosa da Águia (M16), capturadas em imagens impressionantes pelo Telescópio Hubble. São colunas gigantes de gás molecular e poeira que se estendem por vários anos-luz, onde nascem novas estrelas. Esses pilares funcionam como “berçários estelares”, protegendo e alimentando o processo de formação de estrelas nas regiões internas mais densas. A radiação intensa das estrelas jovens ao redor esculpe e evapora as bordas dessas estruturas, revelando um cenário dramático e dinâmico do ciclo de vida estelar. A imagem dos Pilares da Criação se tornou um símbolo da beleza e complexidade do universo.';
    break;
  case 'pulsar':
    texto = 'Um pulsar é uma estrela de nêutrons altamente magnetizada que gira rapidamente, emitindo feixes regulares de radiação eletromagnética, geralmente na forma de ondas de rádio, luz visível, raios-X ou raios gama. Essas estrelas são os remanescentes ultra densos de supernovas — explosões cataclísmicas que ocorrem quando estrelas massivas esgotam seu combustível. A rotação rápida combinada com seu campo magnético gera pulsos precisos, parecidos com um farol cósmico, visíveis da Terra quando os feixes apontam para nós. Os pulsares são fundamentais para testar teorias da física, como a relatividade geral, e ajudam a mapear a estrutura da Via Láctea.';
    break;
  case 'estrela':
    texto = 'Estrelas gigantes, como Betelgeuse e Antares, são estrelas massivas que atingiram uma fase avançada de sua evolução. São significativamente maiores e mais brilhantes que o Sol, e podem ter diâmetros centenas de vezes maiores. Betelgeuse, por exemplo, é uma supergigante vermelha na constelação de Órion, conhecida por sua cor avermelhada e variabilidade no brilho. Essas estrelas estão em processo de esgotar o combustível em seus núcleos e frequentemente sofrem instabilidades que podem levá-las a explodir em supernovas, eventos que enriquecem o meio interestelar com elementos pesados e influenciam a formação de novas estrelas e planetas. O estudo delas ajuda a entender o ciclo de vida das estrelas massivas e a evolução do cosmos.';
    break;
}


  imagemAlvo.classList.add('zoom');
  infoBox.innerText = texto;
  infoBox.style.display = 'block';

  const rect = imagemAlvo.getBoundingClientRect();
  const espacosRect = espacos.getBoundingClientRect();
  const margem = 100;

  // Decide se a caixa vai ficar à direita ou à esquerda da imagem
  let leftPos;
  if (rect.left < window.innerWidth / 2) {
    // imagem na metade esquerda da tela: caixa à direita
    leftPos = rect.right - espacosRect.left + margem;
  } else {
    // imagem na metade direita da tela: caixa à esquerda
    leftPos = rect.left - espacosRect.left - infoBox.offsetWidth - margem;
  }

  // Centraliza verticalmente a caixa com a imagem
  const topPos = rect.top - espacosRect.top + (rect.height / 2) - (infoBox.offsetHeight / 2);

  infoBox.style.position = 'absolute';
  infoBox.style.left = `${leftPos}px`;
  infoBox.style.top = `${topPos}px`;
}
