// ============================================================
// data.js — Base de dados dos 30 animes
// ============================================================

const ANIMES_DB = [
  {
    id: 1,
    nome: "One Piece",
    imagem: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
    sinopse: "Monkey D. Luffy sonha em se tornar o Rei dos Piratas. Em um mundo de mares infinitos, ele parte em busca do lendário tesouro One Piece, reunindo uma tripulação improvável e enfrentando perigos que moldam heróis.",
    nota: 9.1,
    votos: 4820,
    genero: ["Aventura", "Ação", "Comédia"],
    episodios: 1100,
    trailer: "https://www.youtube.com/embed/S8_YwFLCh4U"
  },
  {
    id: 2,
    nome: "Bleach",
    imagem: "https://cdn.myanimelist.net/images/anime/3/40451.jpg",
    sinopse: "Ichigo Kurosaki, um adolescente com a habilidade de ver fantasmas, torna-se um Shinigami substituto após uma batalha com uma criatura maligna. Sua jornada o leva a mundos além da imaginação.",
    nota: 8.7,
    votos: 3950,
    genero: ["Ação", "Sobrenatural", "Aventura"],
    episodios: 366,
    trailer: "https://www.youtube.com/embed/Ox3mBbJp4Lw"
  },
  {
    id: 3,
    nome: "Dragon Ball",
    imagem: "assets/animes/dragon-ball.jpg",
    sinopse: "A saga épica de Son Goku, desde criança até o guerreiro mais poderoso do universo. Batalhas míticas, transformações lendárias e amizades que transcendem gerações.",
    nota: 8.9,
    votos: 5100,
    genero: ["Ação", "Aventura", "Fantasia"],
    episodios: 153,
    trailer: "https://www.youtube.com/embed/a0VHiNMkBgI"
  },
  {
    id: 4,
    nome: "Death Note",
    imagem: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
    sinopse: "Light Yagami encontra um caderno sobrenatural capaz de matar qualquer pessoa cujo nome seja escrito nele. Um duelo psicológico de gênios começa entre o estudante e o detetive L.",
    nota: 9.0,
    votos: 6200,
    genero: ["Suspense", "Sobrenatural", "Psicológico"],
    episodios: 37,
    trailer: "https://www.youtube.com/embed/NlJZ-YgAt-c"
  },
  {
    id: 5,
    nome: "Solo Leveling",
    imagem: "assets/animes/solo-leveling.webp",
    sinopse: "Sung Jinwoo é o caçador mais fraco do mundo. Após quase morrer em uma masmorra dupla, ele ganha o sistema único que o permite evoluir sem limites — transformando-se no mais temido.",
    nota: 8.8,
    votos: 4300,
    genero: ["Ação", "Fantasia", "RPG"],
    episodios: 13,
    trailer: "https://www.youtube.com/embed/5pRqTF8vMtE"
  },
  {
    id: 6,
    nome: "Classroom of the Elite",
    imagem: "assets/animes/classroom-of-the-elite.webp",
    sinopse: "Em uma escola elitista onde os alunos são avaliados por pontos, Kiyotaka Ayanokoji esconde seu gênio enquanto navega em jogos psicológicos implacáveis para conduzir sua turma ao topo.",
    nota: 8.3,
    votos: 2870,
    genero: ["Psicológico", "Drama", "Escola"],
    episodios: 13,
    trailer: "https://www.youtube.com/embed/JWiDT0Mf7Sg"
  },
  {
    id: 7,
    nome: "Mob Psycho 100",
    imagem: "https://cdn.myanimelist.net/images/anime/8/80356.jpg",
    sinopse: "Shigeo Kageyama, apelidado Mob, é um estudante tímido com poderes psíquicos imensuráveis. Enquanto busca controle emocional, ele enfrenta espíritos e a própria identidade.",
    nota: 8.9,
    votos: 3100,
    genero: ["Ação", "Comédia", "Sobrenatural"],
    episodios: 12,
    trailer: "https://www.youtube.com/embed/nmczRRFHKDQ"
  },
  {
    id: 8,
    nome: "Vinland Saga",
    imagem: "https://cdn.myanimelist.net/images/anime/1839/97728.jpg",
    sinopse: "No coração da era viking, Thorfinn busca vingança pelo assassinato de seu pai. Uma épica sobre guerra, honra, redenção e o custo brutal da violência no coração humano.",
    nota: 9.0,
    votos: 3400,
    genero: ["Ação", "Aventura", "Histórico"],
    episodios: 24,
    trailer: "https://www.youtube.com/embed/nfgPMsAEPM4"
  },
  {
    id: 9,
    nome: "Hunter x Hunter",
    imagem: "https://cdn.myanimelist.net/images/anime/11/33657.jpg",
    sinopse: "Gon Freecss parte para se tornar um Hunter e encontrar o pai que nunca conheceu. Em uma jornada de amizade, poder e moralidade, o mundo se revela mais sombrio do que parece.",
    nota: 9.1,
    votos: 5500,
    genero: ["Ação", "Aventura", "Fantasia"],
    episodios: 148,
    trailer: "https://www.youtube.com/embed/D9iTQHMIBXc"
  },
  {
    id: 10,
    nome: "Haikyuu!!",
    imagem: "https://cdn.myanimelist.net/images/anime/7/76014.jpg",
    sinopse: "Shoyo Hinata ama vôlei apesar de sua baixa estatura. Após uma derrota humilhante, ele entra no ensino médio determinado a alcançar o céu com a mais improvável das duplas.",
    nota: 8.7,
    votos: 3800,
    genero: ["Esportes", "Drama", "Escola"],
    episodios: 25,
    trailer: "https://www.youtube.com/embed/NUxiRnV4Lh0"
  },
  {
    id: 11,
    nome: "Tokyo Ghoul",
    imagem: "https://cdn.myanimelist.net/images/anime/5/64449.jpg",
    sinopse: "Ken Kaneki sobrevive a um ataque de um ghoul, mas acorda transformado em um meio-ghoul. Preso entre dois mundos, ele luta para manter sua humanidade em um Tóquio de trevas.",
    nota: 7.9,
    votos: 4100,
    genero: ["Ação", "Horror", "Sobrenatural"],
    episodios: 12,
    trailer: "https://www.youtube.com/embed/vGuQeQsoRgU"
  },
  {
    id: 12,
    nome: "Fire Force",
    imagem: "https://cdn.myanimelist.net/images/anime/1813/103842.jpg",
    sinopse: "Em um mundo onde humanos espontaneamente pegam fogo, Shinra Kusakabe ingressa nas Brigadas de Combate para proteger os inocentes e descobrir a verdade por trás dos Infernos.",
    nota: 7.8,
    votos: 1950,
    genero: ["Ação", "Fantasia", "Sobrenatural"],
    episodios: 24,
    trailer: "https://www.youtube.com/embed/SBbNsTn9Z-Q"
  },
  {
    id: 13,
    nome: "Tokyo Revengers",
    imagem: "assets/animes/tokyo-revengers.webp",
    sinopse: "Takemichi Hanagaki viaja no tempo para salvar sua ex-namorada de gangues violentas. Cada escolha altera o futuro, mas o passado se recusa a ficar quieto.",
    nota: 8.0,
    votos: 2600,
    genero: ["Ação", "Drama", "Ficção Científica"],
    episodios: 24,
    trailer: "https://www.youtube.com/embed/0yGGmkj4xzM"
  },
  {
    id: 14,
    nome: "Black Clover",
    imagem: "https://cdn.myanimelist.net/images/anime/2/88336.jpg",
    sinopse: "Asta nasce sem magia em um mundo onde ela é tudo. Através de pura força e obstinação, ele luta para se tornar o Rei Mago e provar que a vontade supera qualquer destino.",
    nota: 8.1,
    votos: 2900,
    genero: ["Ação", "Fantasia", "Aventura"],
    episodios: 170,
    trailer: "https://www.youtube.com/embed/eqmkts2JiSU"
  },
  {
    id: 15,
    nome: "Jujutsu Kaisen",
    imagem: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
    sinopse: "Yuji Itadori engole um dedo de Ryomen Sukuna, o rei das maldições, tornando-se seu receptáculo. Agora ele combate maldições ao lado de feiticeiros enquanto carrega uma sentença de morte.",
    nota: 8.8,
    votos: 5700,
    genero: ["Ação", "Sobrenatural", "Horror"],
    episodios: 24,
    trailer: "https://www.youtube.com/embed/pkKu9hLT-t8"
  },
  {
    id: 16,
    nome: "Kimetsu no Yaiba",
    imagem: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    sinopse: "Tanjiro Kamado vira caçador de demônios após sua família ser massacrada e sua irmã Nezuko transformada. Uma saga sobre amor fraternal, sacrifício e a beleza da determinação humana.",
    nota: 9.0,
    votos: 7200,
    genero: ["Ação", "Fantasia", "Drama"],
    episodios: 26,
    trailer: "https://www.youtube.com/embed/VQGCKyvzIM4"
  },
  {
    id: 17,
    nome: "Shingeki no Kyojin",
    imagem: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    sinopse: "A humanidade vive atrás de muros, aterrorizada por titãs. Eren Yeager, após a queda do muro, jura exterminar todos os titãs — mas a verdade por trás deles é mais devastadora que qualquer monstro.",
    nota: 9.1,
    votos: 8900,
    genero: ["Ação", "Drama", "Fantasia"],
    episodios: 87,
    trailer: "https://www.youtube.com/embed/LHtdKWJdif4"
  },
  {
    id: 18,
    nome: "Blue Lock",
    imagem: "assets/animes/blue-lock.webp",
    sinopse: "300 jovens atacantes competem em um projeto radical para criar o maior centroavante do Japão. Yoichi Isagi precisa despertar seu ego e dominar o campo — ou ser apagado para sempre.",
    nota: 8.5,
    votos: 3200,
    genero: ["Esportes", "Drama", "Psicológico"],
    episodios: 24,
    trailer: "https://www.youtube.com/embed/DpzCFAkHZAg"
  },
  {
    id: 19,
    nome: "Mashle: Magic and Muscles",
    imagem: "assets/animes/mashle.jpg",
    sinopse: "Em um mundo governado pela magia, Mash Burnedead não tem um fio de mágica — mas tem músculos absurdos. Ele usa força bruta para resolver tudo num mundo de feiticeiros.",
    nota: 8.0,
    votos: 1800,
    genero: ["Ação", "Comédia", "Fantasia"],
    episodios: 12,
    trailer: "https://www.youtube.com/embed/7nZaGOhBhk4"
  },
  {
    id: 20,
    nome: "Wind Breaker",
    imagem: "assets/animes/wind-breaker.webp",
    sinopse: "Haruka Sakura entra em Furin, uma escola de valentões famosa. Mas ao descobrir que eles protegem a cidade, ele começa a questionar o que realmente significa ser forte.",
    nota: 8.2,
    votos: 1600,
    genero: ["Ação", "Drama", "Escola"],
    episodios: 13,
    trailer: "https://www.youtube.com/embed/MrdEQbzEhGU"
  },
  {
    id: 21,
    nome: "The Rising of the Shield Hero",
    imagem: "assets/animes/shield-hero.webp",
    sinopse: "Naofumi Iwatani é invocado como o Herói do Escudo em outro mundo, mas é traído logo no começo. Desprezado e sozinho, ele sobe das cinzas para mostrar que os humilhados se tornam os mais poderosos.",
    nota: 8.1,
    votos: 2400,
    genero: ["Fantasia", "Aventura", "Ação"],
    episodios: 25,
    trailer: "https://www.youtube.com/embed/1H8pewV_YKA"
  },
  {
    id: 22,
    nome: "Hell's Paradise",
    imagem: "https://cdn.myanimelist.net/images/anime/1839/135083.jpg",
    sinopse: "Gabimaru, o shinobi oco, é enviado para uma ilha paradisíaca e mortal. Para ter sua liberdade, ele deve encontrar o elixir da imortalidade — numa terra onde deuses e monstros coexistem.",
    nota: 8.7,
    votos: 2700,
    genero: ["Ação", "Aventura", "Horror"],
    episodios: 13,
    trailer: "https://www.youtube.com/embed/5z16-CTOPAQ"
  },
  {
    id: 23,
    nome: "Chainsaw Man",
    imagem: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
    sinopse: "Denji, um jovem miserável caçador de demônios, se funde com seu diabo-cachorro para se tornar o Homem-Motosserra. Uma história sobre sobrevivência, desejo e o preço de sonhos simples.",
    nota: 8.8,
    votos: 5400,
    genero: ["Ação", "Horror", "Dark Fantasy"],
    episodios: 12,
    trailer: "https://www.youtube.com/embed/yPIBgMFfQjE"
  },
  {
    id: 24,
    nome: "Samurai X",
    imagem: "https://cdn.myanimelist.net/images/anime/5/27978.jpg",
    sinopse: "Kenshin Himura, ex-assassino da era Bakumatsu, vaga pelo Japão como protetor dos fracos usando uma espada invertida. Um voto de nunca mais matar — testado a cada passo.",
    nota: 8.9,
    votos: 3600,
    genero: ["Ação", "Romance", "Histórico"],
    episodios: 94,
    trailer: "https://www.youtube.com/embed/O2fBSmNIEGk"
  },
  {
    id: 25,
    nome: "Shokugeki no Soma",
    imagem: "https://cdn.myanimelist.net/images/anime/7/77106.jpg",
    sinopse: "Soma Yukihira entra na mais elitista escola de culinária do mundo. Confrontos gastronômicos épicos, ingredientes absurdos e uma missão de provar que a culinária é arte e combate.",
    nota: 8.2,
    votos: 2100,
    genero: ["Comédia", "Escola", "Gastronomia"],
    episodios: 24,
    trailer: "https://www.youtube.com/embed/jhAP47WpHx4"
  },
  {
    id: 26,
    nome: "Akame ga Kill",
    imagem: "https://cdn.myanimelist.net/images/anime/1429/95946.jpg",
    sinopse: "Tatsumi chega à capital em busca de fortuna e se junta ao Night Raid, um grupo de assassinos que luta para derrubar um império corrupto. Ninguém está seguro — nem mesmo os heróis.",
    nota: 7.8,
    votos: 2800,
    genero: ["Ação", "Dark Fantasy", "Drama"],
    episodios: 24,
    trailer: "https://www.youtube.com/embed/U7HKdoV1mLw"
  },
  {
    id: 27,
    nome: "Dan Da Dan",
    imagem: "assets/animes/dan-da-dan.webp",
    sinopse: "Momo e Okarun brigam sobre o que existe: aliens ou fantasmas. Após ambos sofrerem ataques sobrenaturais, acabam envolvidos em um caos de ficção científica, horror e romance caótico.",
    nota: 8.6,
    votos: 3800,
    genero: ["Ação", "Comédia", "Sobrenatural"],
    episodios: 12,
    trailer: "https://www.youtube.com/embed/OTsj3v5V1Gk"
  },
  {
    id: 28,
    nome: "Blue Period",
    imagem: "https://cdn.myanimelist.net/images/anime/1513/120842.jpg",
    sinopse: "Yatora Yaguchi, popular mas vazio, descobre a pintura e dedica tudo para entrar em Geidai, a universidade de artes mais difícil do Japão. Uma história intensa sobre paixão, crise e criação.",
    nota: 8.0,
    votos: 1400,
    genero: ["Drama", "Escola", "Arte"],
    episodios: 12,
    trailer: "https://www.youtube.com/embed/rnXhDJMQtGQ"
  },
  {
    id: 29,
    nome: "No Game No Life",
    imagem: "https://cdn.myanimelist.net/images/anime/5/65187.jpg",
    sinopse: "Os irmãos Sora e Shiro são lendários jogadores transportados para um mundo onde tudo se decide por jogos. Eles prometem conquistar esse mundo de 16 raças uma partida de cada vez.",
    nota: 8.5,
    votos: 4000,
    genero: ["Aventura", "Fantasia", "Comédia"],
    episodios: 12,
    trailer: "https://www.youtube.com/embed/4WcmRhgy_mE"
  },
  {
    id: 30,
    nome: "Naruto",
    imagem: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
    sinopse: "Naruto Uzumaki é um garoto órfão rejeitado pela aldeia por carregar uma raposa de nove caudas. Sua jornada para se tornar Hokage é uma lição de perseverança que definiu gerações.",
    nota: 8.9,
    votos: 9800,
    genero: ["Ação", "Aventura", "Drama"],
    episodios: 220,
    trailer: "https://www.youtube.com/embed/QczyDBAPTtA"
  }
];

window.ANIMES_DB = ANIMES_DB;
