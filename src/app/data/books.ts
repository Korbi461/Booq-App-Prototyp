export interface CriteriaRating {
  spannung: number;
  charaktertiefe: number;
  schreibstil: number;
  originalitaet: number;
  emotionaleWirkung: number;
}

export interface UserReview {
  username: string;
  stars: number;
  text: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genreTags: string[];
  moodTags: string[];
  price: string;
  bookTokScore: number;
  sponsored: boolean;
  synopsis: string;
  coverUrl: string;
  criteria: CriteriaRating;
  reviews: UserReview[];
  matchScore: number;
  averageRating: number;
}

function avg(c: CriteriaRating): number {
  const vals = [c.spannung, c.charaktertiefe, c.schreibstil, c.originalitaet, c.emotionaleWirkung];
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
}

const rawBooks = [
  {
    id: 'book-1',
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    genreTags: ['Thriller', 'Crime'],
    moodTags: ['Psychological', 'Dark Vibes'],
    price: '14,99€',
    bookTokScore: 92,
    sponsored: false,
    synopsis: 'Staatsanwältin Vera Holt hat noch nie einen Fall verloren. Als sie den charismatischen Kunsthändler Dominic Rael wegen Mordes anklagt, scheint der Sieg sicher. Doch je tiefer sie in die Beweislage eindringt, desto mehr zweifelt sie – nicht nur an Raels Schuld, sondern an ihrer eigenen Wahrnehmung. Jemand manipuliert die Zeugen. Und alle Spuren führen zurück zu ihr selbst. Ein Psychothriller, der bis zur letzten Seite keine Luft zum Atmen lässt.',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780307454546-L.jpg',
    criteria: { spannung: 5, charaktertiefe: 5, schreibstil: 4, originalitaet: 4, emotionaleWirkung: 5 },
    reviews: [
      { username: 'Felix_liest', stars: 5, text: 'Selten hat mich ein Buch so sehr in die Irre geführt. Das Ende hat mir buchstäblich den Boden weggezogen.' },
      { username: 'Lea.Pageturner', stars: 5, text: 'Vera ist eine der faszinierendsten Protagonistinnen seit Jahren. Komplex, fehlerhaft, brillant.' },
      { username: 'roman_reads', stars: 4, text: 'Der Schreibstil ist auf hohem Niveau, manchmal etwas überladen – aber der Plot macht das mehr als wett.' },
    ],
    matchScore: 92,
  },
  {
    id: 'book-2',
    title: 'The Way of Kings',
    author: 'Brandon Sanderson',
    genreTags: ['Fantasy', 'Adventure'],
    moodTags: ['Epic World', 'Feel-Good'],
    price: '16,99€',
    bookTokScore: 78,
    sponsored: false,
    synopsis: 'In einer Welt, in der Magie aus dem Kern toter Sterne gewonnen wird, ist Kael nur ein Minenarbeiter aus dem Aschegrund. Als er eine verbotene Wurzel mit der Energie einer Supernova findet, beginnt eine Reise, die Kontinente erschüttert. The Way of Kings ist ein Epos über Klasse, Macht und den Preis von Freiheit – mit einer Weltbeschreibung, die süchtig macht.',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780765326355-L.jpg',
    criteria: { spannung: 4, charaktertiefe: 4, schreibstil: 5, originalitaet: 5, emotionaleWirkung: 3 },
    reviews: [
      { username: 'fantasy.finja', stars: 5, text: 'Das Worldbuilding ist atemberaubend. Ich wollte gar nicht aufhören zu lesen.' },
      { username: 'buchstabe.kai', stars: 3, text: 'Kael ist ein toller Protagonist, aber die Nebencharaktere bleiben leider etwas blass.' },
      { username: 'lena.liest.alles', stars: 5, text: 'Für Fantasy-Fans ein absolutes Muss. Der zweite Band kann nicht schnell genug kommen.' },
    ],
    matchScore: 84,
  },
  {
    id: 'book-3',
    title: 'Normal People',
    author: 'Sally Rooney',
    genreTags: ['Literary Fiction', 'Drama'],
    moodTags: ['Emotional', 'Slow Burn'],
    price: '13,99€',
    bookTokScore: 88,
    sponsored: true,
    synopsis: 'Marie kehrt nach zwanzig Jahren in ihr Heimatdorf am Bodensee zurück, um das Haus ihrer verstorbenen Mutter zu verkaufen. Was sie findet, sind keine leeren Räume, sondern ein Leben, das sie nie kannte. In ruhigen, präzisen Sätzen erzählt Sally Rooney von Schweigen als Muttersprache, von vererbtem Schmerz und der Frage, ob Vergebung möglich ist, wenn die andere Person nicht mehr da ist.',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780571334650-L.jpg',
    criteria: { spannung: 3, charaktertiefe: 5, schreibstil: 5, originalitaet: 4, emotionaleWirkung: 5 },
    reviews: [
      { username: 'stille.leserin', stars: 5, text: 'Dieses Buch hat mich tagelang nicht losgelassen. Absolut meisterhaft in Ton und Tiefe.' },
      { username: 'max.ohne.worte', stars: 4, text: 'Wer Action erwartet, ist hier falsch. Wer Literatur liebt, wird belohnt.' },
      { username: 'buchclub.anna', stars: 5, text: 'Eine Ausnahmestimme schreibt wie jemand, der wirklich etwas zu sagen hat. Selten geworden.' },
    ],
    matchScore: 78,
  },
  {
    id: 'book-4',
    title: '1984',
    author: 'George Orwell',
    genreTags: ['Sci-Fi', 'Dystopia'],
    moodTags: ['Mind-Bending', 'Page-Turner'],
    price: '15,99€',
    bookTokScore: 85,
    sponsored: false,
    synopsis: '2147. Die Stadt schläft nie, weil sie schlafen lassen wurde. Kira ist Traumhackerin – sie bricht in die Träume Schlafender ein, um Geständnisse zu stehlen. Als ihr Auftraggeber plötzlich tot ist und sie die einzige Verdächtige, muss sie fliehen. Durch eine Stadt, die aus Licht und Lügen gebaut ist. 1984 ist schnell, grell und kompromisslos – Cyberpunk für die KI-Generation.',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
    criteria: { spannung: 5, charaktertiefe: 3, schreibstil: 4, originalitaet: 5, emotionaleWirkung: 4 },
    reviews: [
      { username: 'scifi.sven', stars: 5, text: 'Ich habe es in einer Nacht durchgelesen. Keine Chance aufzuhören.' },
      { username: 'kritisch.lesen', stars: 3, text: 'Konzept sensationell, die Charaktere hätten mehr Tiefe verdient.' },
      { username: 'zukunft.leser', stars: 4, text: 'Orwell erfindet das Genre nicht neu, aber er spielt es besser als die meisten.' },
    ],
    matchScore: 88,
  },
  {
    id: 'book-5',
    title: 'The Haunting of Hill House',
    author: 'Shirley Jackson',
    genreTags: ['Horror', 'Gothic'],
    moodTags: ['Dark Vibes', 'Atmospheric'],
    price: '14,49€',
    bookTokScore: 91,
    sponsored: false,
    synopsis: 'Das Anwesen auf Cairn Hill steht seit hundert Jahren leer. Als Restauratorin Nora den Auftrag annimmt, das Gebäude zu inventarisieren, findet sie Porträts die blinzeln, Türen die sich sperren und ein Tagebuch, das immer neue Einträge bekommt. The Haunting of Hill House ist atmosphärischer Horror in der Tradition der Besten des Genres – langsam aufbauend, psychologisch präzise und zutiefst unheimlich.',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780143039983-L.jpg',
    criteria: { spannung: 5, charaktertiefe: 4, schreibstil: 5, originalitaet: 4, emotionaleWirkung: 5 },
    reviews: [
      { username: 'horrorhexe', stars: 5, text: 'Das Haus ist die eigentliche Hauptfigur. Noch nie hat mich ein Ort so gegruselt.' },
      { username: 'nacht.leser99', stars: 5, text: 'Ich musste zweimal aufhören und Licht anlassen. Höchste Empfehlung.' },
      { username: 'sachlich.gelesen', stars: 4, text: 'Für Horror-Verhältnisse sehr literarisch. Wer Splatter erwartet, liegt falsch.' },
    ],
    matchScore: 76,
  },
  {
    id: 'book-6',
    title: 'Me Before You',
    author: 'Jojo Moyes',
    genreTags: ['Romance', 'Contemporary'],
    moodTags: ['Feel-Good', 'Heartwarming'],
    price: '12,99€',
    bookTokScore: 74,
    sponsored: true,
    synopsis: 'Seit dem Tod seiner Frau schreibt Emil jeden Sonntag einen Brief – an niemanden. Als er versehentlich einen in den falschen Briefkasten wirft, beginnt eine Korrespondenz mit der unbekannten Nachbarin Hanna. Keiner weiß vom anderen wie die andere Person aussieht. Me Before You ist eine leise, warmherzige Geschichte über Trauer, Mut und die Frage, ob man nach großem Verlust noch einmal lieben darf.',
    coverUrl: 'https://covers.openlibrary.org/b/id/15089748-L.jpg',
    criteria: { spannung: 3, charaktertiefe: 5, schreibstil: 4, originalitaet: 4, emotionaleWirkung: 5 },
    reviews: [
      { username: 'herzbuch.hanna', stars: 5, text: 'Ich habe geweint wie ein Kind. Jojo Moyes versteht, wie sich echte Einsamkeit anfühlt.' },
      { username: 'romantik.robin', stars: 4, text: 'Wunderschön. Manchmal etwas vorhersehbar, aber das verzeiht man gerne.' },
      { username: 'lesezeit.clara', stars: 5, text: 'Das perfekte Buch für einen Regentag mit Tee. Absolut empfehlenswert.' },
    ],
    matchScore: 81,
  },
  {
    id: 'book-7',
    title: 'The Shadow of the Wind',
    author: 'Carlos Ruiz Zafón',
    genreTags: ['Historical Fiction', 'Mystery'],
    moodTags: ['Atmospheric', 'Page-Turner'],
    price: '17,49€',
    bookTokScore: 83,
    sponsored: false,
    synopsis: 'Wien, 1912. Kartographin Elise Haber entdeckt in einer alten Karte einen Ort, der nie existiert haben soll – und Beweise, dass jemand sehr mächtig diese Entdeckung seit Jahrzehnten vertuscht. Auf der Flucht durch das Habsburgerreich, verfolgt von Männern ohne Gesicht, muss sie herausfinden, warum eine Lüge auf Papier so gefährlich sein kann. Historische Präzision trifft auf atemlose Spannung.',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780143034902-L.jpg',
    criteria: { spannung: 4, charaktertiefe: 5, schreibstil: 5, originalitaet: 5, emotionaleWirkung: 4 },
    reviews: [
      { username: 'geschichts.georg', stars: 5, text: 'Absolut akkurat recherchiert und dabei spannend wie ein Agententhriller.' },
      { username: 'wien.liebhaberin', stars: 5, text: 'Das Wien dieser Epoche lebt auf jeder Seite. Zafón malt mit Worten.' },
      { username: 'leser.lars', stars: 3, text: 'Das letzte Drittel hat mich etwas weniger überzeugt – trotzdem ein starkes Buch.' },
    ],
    matchScore: 87,
  },
  {
    id: 'book-8',
    title: 'The Perks of Being a Wallflower',
    author: 'Stephen Chbosky',
    genreTags: ['Contemporary', 'Coming-of-Age'],
    moodTags: ['Emotional', 'Bittersweet'],
    price: '13,49€',
    bookTokScore: 79,
    sponsored: false,
    synopsis: 'Drei Geschwister. Ein letzter gemeinsamer Sommer im Haus der Großmutter. Stephen Chbosky erzählt in drei Stimmen von einer Familie, die sich auseinandergelebt hat und vielleicht – vielleicht – noch einmal zusammenfinden kann. The Perks of Being a Wallflower ist ein Roman über das Erwachsenwerden, das nie aufhört, und die Art, wie Familien schweigen, streiten und sich dennoch lieben.',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781451696196-L.jpg',
    criteria: { spannung: 3, charaktertiefe: 5, schreibstil: 5, originalitaet: 4, emotionaleWirkung: 5 },
    reviews: [
      { username: 'familienmensch.f', stars: 5, text: 'Jedes Geschwister hat mich an jemanden erinnert, den ich kenne. Wunderschön erzählt.' },
      { username: 'literatur.lukas', stars: 5, text: 'Chbosky ist eine Ausnahmestimme. Dieser Roman verdient mehr Aufmerksamkeit.' },
      { username: 'ehrlich.eva', stars: 4, text: 'Mir war es stellenweise zu langsam – aber die Charaktere haben mich trotzdem gefesselt.' },
    ],
    matchScore: 73,
  },
  {
    id: 'book-9',
    title: 'The Long Way to a Small, Angry Planet',
    author: 'Becky Chambers',
    genreTags: ['Sci-Fi', 'Romance'],
    moodTags: ['Feel-Good', 'Bittersweet'],
    price: '14,99€',
    bookTokScore: 76,
    sponsored: true,
    synopsis: 'Auf der Raumstation Meridian verbringen zwei Astronauten ein Jahr miteinander – einer auf dem Weg zur Mars-Mission, die andere auf dem Rückweg zur Erde. Sie haben 387 gemeinsame Tage und wissen beide, dass danach nichts mehr sein wird wie vorher. The Long Way to a Small, Angry Planet ist Science-Fiction als Liebesgeschichte: zärtlich, melancholisch und voller kleiner Wunder im Weltraum.',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781500453305-L.jpg',
    criteria: { spannung: 4, charaktertiefe: 4, schreibstil: 4, originalitaet: 5, emotionaleWirkung: 4 },
    reviews: [
      { username: 'space.sarah', stars: 5, text: 'Noch nie hat mich ein SciFi-Roman so sehr zum Weinen gebracht. Unfair schön.' },
      { username: 'genre.hopper', stars: 5, text: 'Wer denkt, SciFi und Romance passen nicht zusammen, muss dieses Buch lesen.' },
      { username: 'kritik.käthe', stars: 3, text: 'Sprachlich sehr schön, der Plot ist aber dünn. Lebt von der Stimmung, nicht der Handlung.' },
    ],
    matchScore: 80,
  },
  {
    id: 'book-10',
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    genreTags: ['Thriller', 'Mystery'],
    moodTags: ['Mind-Bending', 'Atmospheric'],
    price: '15,49€',
    bookTokScore: 89,
    sponsored: false,
    synopsis: 'Die Bibliothek von Carras existiert offiziell nicht. Der Archivar, der sie hütet, auch nicht. Als Journalistin Solène einen verschlüsselten Hinweis in einem Buch findet, das es laut Verlagsdatenbank nie gegeben hat, beginnt eine Jagd durch Europas geheimste Archive. Gone Girl ist ein intellektueller Thriller für Menschen, die Bücher lieben – und misstrauen, was auf ihren Seiten steht.',
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780307588371-L.jpg',
    criteria: { spannung: 5, charaktertiefe: 4, schreibstil: 5, originalitaet: 5, emotionaleWirkung: 4 },
    reviews: [
      { username: 'bibliophiler.ben', stars: 5, text: 'Ein Thriller über Bücher, für Büchermenschen. Ich war vollkommen hin und weg.' },
      { username: 'thriller.tanja', stars: 5, text: 'Flynn verwebt Fakten und Fiktion so geschickt, dass ich mehrfach googeln musste.' },
      { username: 'nüchtern.norbert', stars: 4, text: 'Etwas konstruiert am Ende – aber der Weg dorthin ist außergewöhnlich.' },
    ],
    matchScore: 91,
  },
];

export const mockBooks: Book[] = rawBooks.map(b => ({
  ...b,
  averageRating: avg(b.criteria),
}));
