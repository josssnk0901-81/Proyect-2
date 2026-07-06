/**
 * Diccionario de traducciones. El español (`es`) es la fuente de verdad de la
 * forma: inglés y japonés deben tener exactamente las mismas claves (TypeScript
 * marca error si falta alguna).
 *
 * Nombres propios (José Gutiérrez, Cabaña Serendipia, Constructora Santa Elena,
 * Mónica Sanz) se mantienen igual en los tres idiomas.
 *
 * El japonés está en registro cortés profesional (です・ます). Pendiente de
 * revisión por un hablante nativo antes de considerarse definitivo.
 */

const es = {
  langName: 'Español',

  nav: {
    about: 'Sobre mí',
    services: 'Servicios',
    portfolio: 'Portafolio',
    process: 'Proceso',
    contact: 'Contacto',
    reserve: 'Reservar',
    reserveFull: 'Reservar una reunión',
  },

  hero: {
    badge: 'Disponible para nuevos proyectos',
    titleBefore: 'Tecnología sólida con la ',
    titleHighlight: 'identidad de tu negocio',
    titleAfter: '',
    subtitle:
      'Desarrollo web, automatización y experiencias interactivas a la medida — rápidas, modernas y cuidadas hasta el último detalle.',
    ctaReserve: 'Reservar una reunión',
    ctaPortfolio: 'Ver portafolio',
  },

  about: {
    kicker: 'Sobre mí',
    title: 'Hola, soy José.',
    p1: 'Me dedico a construir cosas en internet: sitios que se sienten premium, automatizaciones que ahorran horas de trabajo repetitivo y experiencias interactivas que la gente recuerda. Soy de los que se quedan puliendo un detalle que quizá nadie note — porque ese detalle es la diferencia entre algo que funciona y algo que se siente bien.',
    p2: 'Trabajas directamente conmigo, de la primera llamada a la entrega. Sin intermediarios, sin tecnicismos innecesarios y sin promesas infladas: me cuentas qué necesita tu negocio, te digo con honestidad qué haría yo — y lo construimos juntos.',
    principles: [
      {
        title: 'Trato directo',
        text: 'De principio a fin hablas con la persona que escribe el código. Las decisiones se toman rápido y nada se pierde en el camino.',
      },
      {
        title: 'Hecho a la medida',
        text: 'Cada proyecto empieza en una hoja en blanco. Las plantillas se notan — y tu negocio no se parece a ningún otro.',
      },
      {
        title: 'Claridad ante todo',
        text: 'Tiempos, costos y avances sobre la mesa desde el día uno. Siempre sabes en qué va tu proyecto.',
      },
    ],
  },

  services: {
    kicker: 'Servicios',
    title: 'Lo que puedo construir para ti',
    lead: 'Cada proyecto es distinto, pero casi todo lo que construyo cae en una de estas cuatro áreas.',
    items: [
      {
        title: 'Sitios web y landings',
        text: 'Páginas rápidas, modernas y pensadas para convertir — desde una landing como esta hasta el sitio completo de tu negocio.',
      },
      {
        title: 'Automatización de procesos',
        text: 'Conecto tus herramientas — WhatsApp, correo, hojas de cálculo, CRM — para que el trabajo repetitivo se haga solo, sin errores y a cualquier hora.',
      },
      {
        title: 'Experiencias interactivas',
        text: '3D en el navegador, animación y microdetalles que convierten una visita de paso en una marca que se recuerda.',
      },
      {
        title: 'Herramientas internas',
        text: 'Dashboards, sistemas de registro y catálogos: software pequeño y bien hecho que resuelve exactamente el problema que tienes.',
      },
    ],
  },

  portfolio: {
    kicker: 'Portafolio',
    title: 'Proyectos que ya están funcionando',
    lead: 'No colecciono maquetas: estos son productos en uso, con problemas reales detrás. Toca cualquiera para ver el caso completo.',
    seeCase: 'Ver el caso completo',
    closeCase: 'Cerrar el caso',
    retoLabel: 'El reto',
    solucionLabel: 'La solución',
    resultadoLabel: 'El resultado',
    projects: [
      {
        tag: 'Hospitalidad · NFC',
        title: 'Cabaña Serendipia — Guía digital para huéspedes',
        description:
          'Una guía premium que los huéspedes de un Airbnb abren acercando su teléfono a una tarjeta NFC dentro de la cabaña: wifi con un toque, guía de la casa, clima en tiempo real y recomendaciones locales en mapa. Sin descargar nada.',
        stack: ['Next.js', 'Tailwind CSS', 'Leaflet', 'NFC'],
        reto: 'La anfitriona respondía las mismas preguntas con cada huésped — la clave del wifi, cómo funciona la casa, qué visitar cerca — y los manuales impresos nadie los lee.',
        solucion:
          'Guía web a la medida que se abre al instante con un toque NFC: secciones claras, clave de wifi que se copia con un botón, clima del lugar en vivo y recomendaciones con mapa interactivo.',
        resultado:
          'Los huéspedes encuentran todo solos y la anfitriona dejó de repetir respuestas. La guía se actualiza en minutos, sin reimprimir nada — y quedó lista para sumar más alojamientos.',
      },
      {
        tag: 'Automatización · Construcción',
        title: 'Constructora Santa Elena — Cotizaciones y facturas en orden',
        description:
          'Sistema que centraliza las solicitudes de cotización, genera cada cotización con folio y seguimiento, y controla el estado de las facturas por obra y por cliente — con recordatorios automáticos antes de cada vencimiento.',
        stack: ['n8n', 'Airtable', 'WhatsApp'],
        reto: 'Las cotizaciones se armaban a mano en Excel y las facturas se perseguían por WhatsApp: cada obra tenía sus números en un archivo distinto y nada aparecía cuando se necesitaba.',
        solucion:
          'Flujo con n8n + Airtable: las solicitudes entran a un tablero único, cada cotización sale con folio y estatus, y las facturas avisan solas cuándo vencen. Todo consultable por obra, cliente y periodo.',
        resultado:
          'La administración dejó de vivir en archivos sueltos: cotizaciones listas en minutos, facturas con estado claro y cero cobros olvidados.',
      },
      {
        tag: 'Web · 3D',
        title: 'La tarjeta que estás viendo',
        description:
          'Mi propia tarjeta de presentación NFC: acercas el teléfono y se abre esta landing — 3D en el navegador, scroll cinematográfico y carga ligera. No tienes que imaginar el resultado: estás dentro de él.',
        stack: ['React', 'Three.js', 'GSAP', 'Lenis'],
        reto: 'Una tarjeta de papel se tira o se pierde. Necesitaba una presentación que demostrara en cinco segundos, y en el teléfono de quien la recibe, lo que puedo construir.',
        solucion:
          'Landing con tarjeta 3D interactiva, animaciones de scroll y peso mínimo: el 3D se descarga aparte para que la página abra rápido hasta en un celular de gama media.',
        resultado:
          'Cada persona que recibe la tarjeta ve un producto real funcionando. Esta página es su propia prueba.',
      },
    ],
  },

  process: {
    kicker: 'Proceso',
    title: 'De la idea a la entrega',
    lead: 'Sin misterio: así es trabajar conmigo, del primer mensaje al soporte después del lanzamiento.',
    stepLabel: 'Paso',
    steps: [
      {
        title: 'Contacto',
        text: 'Me escribes por WhatsApp o agendas una llamada. Me cuentas tu idea y te digo, sin rodeos, si puedo ayudarte y cómo.',
      },
      {
        title: 'Planeación',
        text: 'Definimos juntos alcance, tiempos y precio. Todo por escrito desde el inicio, para que no haya sorpresas después.',
      },
      {
        title: 'Desarrollo',
        text: 'Construyo tu proyecto mostrándote avances reales que puedes abrir en tu teléfono — no maquetas — y ajustamos sobre la marcha.',
      },
      {
        title: 'Entrega',
        text: 'Publicamos juntos, probamos en dispositivos reales y te explico cómo usar y administrar lo que ahora es tuyo.',
      },
      {
        title: 'Soporte',
        text: 'No desaparezco al entregar: sigo al pendiente para dudas, ajustes y mejoras cuando las necesites.',
      },
    ],
  },

  tech: {
    kicker: 'Tecnologías',
    title: 'Con lo que trabajo',
    lead: 'Las mismas herramientas detrás de los productos que usas todos los días — elegidas por rendimiento, no por moda.',
  },

  testimonials: {
    kicker: 'Testimonios',
    title: 'Lo que dicen quienes ya trabajaron conmigo',
    viewLabel: 'Ver testimonio',
    items: [
      {
        quote:
          'Dejé de contestar las mismas preguntas con cada huésped. Ahora acercan el teléfono a la tarjeta y tienen todo: el wifi, cómo funciona la casa, qué visitar. Se ve carísimo y lo armó en unos días.',
        name: 'Mónica Sanz',
        role: 'Anfitriona · Cabaña Serendipia, Chiapas',
      },
      {
        quote:
          'Lo que más me gustó es que trato directo con él, sin vueltas. Me explicó qué convenía y qué no, cumplió los tiempos que dijo, y el resultado se siente de otro nivel.',
        name: 'Constructora Santa Elena',
        role: 'Automatización de cotizaciones y facturas',
      },
      {
        quote:
          'Quería una página que no pareciera plantilla y eso fue justo lo que entregó: moderna, rapidísima en el celular y con las citas conectadas a WhatsApp. Mis pacientes llegan diciendo que se ve muy profesional.',
        name: 'Dra. Paola Rivas',
        role: 'Clínica dental · Sitio web y citas',
      },
    ],
  },

  booking: {
    kicker: 'Reserva',
    title: '¿Listo para empezar tu proyecto?',
    lead: 'Agenda una llamada sin compromiso. Me cuentas tu idea, te digo qué haría yo y te doy un presupuesto claro.',
    iframeTitle: 'Agenda una reunión — Calendly',
    preferWhatsapp: '¿Prefieres WhatsApp? ',
    writeDirect: 'Escríbeme directo',
    whatsappCta: 'Agendar por WhatsApp',
    emailCta: 'O escríbeme un correo',
    sameDayNote: 'Normalmente respondo el mismo día.',
  },

  contact: {
    kicker: 'Contacto',
    title: 'Hablemos de tu proyecto',
    lead: 'Elige el canal que prefieras — todos llegan directo a mí, no a un buzón que nadie revisa.',
    emailLabel: 'Correo',
    whatsappHint: 'La vía más rápida',
    emailHint: 'Para propuestas y documentos',
    instagramHint: 'Proyectos y detrás de cámaras',
    nameLabel: 'Tu nombre',
    namePlaceholder: '¿Cómo te llamas?',
    messageLabel: 'Tu mensaje',
    messagePlaceholder:
      'Cuéntame qué necesitas — una página, una automatización, una idea…',
    submit: 'Enviar por WhatsApp',
    formNote:
      'Se abre WhatsApp con tu mensaje listo para enviar — sin registros ni correos de spam.',
  },

  footer: {
    rights: '© {year} José Gutiérrez. Todos los derechos reservados.',
  },

  meta: {
    title: 'José Gutiérrez — Tecnología sólida con la identidad de tu negocio',
    description:
      'Desarrollo web, automatización y experiencias interactivas a la medida. Tecnología sólida con la identidad de tu negocio.',
  },

  // Textos que se auto-escriben en WhatsApp/correo. En es van solo en español;
  // en en/ja son bilingües (idioma del visitante + español) para que José los
  // lea sin problema. {name} se reemplaza con lo que escriba el visitante.
  messages: {
    bookingWhatsapp:
      'Hola José, me gustaría agendar una reunión para platicarte mi proyecto.',
    bookingEmailSubject: 'Quiero agendar una reunión',
    contactEmailSubject: 'Hola José, quiero platicarte mi proyecto',
    contactGreeting: 'Hola José, soy {name}.',
  },
}

type Translation = typeof es

const en: Translation = {
  langName: 'English',

  nav: {
    about: 'About',
    services: 'Services',
    portfolio: 'Work',
    process: 'Process',
    contact: 'Contact',
    reserve: 'Book a call',
    reserveFull: 'Book a call',
  },

  hero: {
    badge: 'Available for new projects',
    titleBefore: 'Solid engineering with ',
    titleHighlight: 'your business’s own identity',
    titleAfter: '',
    subtitle:
      'Custom web development, automation and interactive experiences — fast, modern and crafted down to the last detail.',
    ctaReserve: 'Book a call',
    ctaPortfolio: 'See my work',
  },

  about: {
    kicker: 'About',
    title: 'Hi, I’m José.',
    p1: 'I build things on the internet: sites that feel premium, automations that save hours of repetitive work, and interactive experiences people remember. I’m the kind who keeps polishing a detail no one may notice — because that detail is the difference between something that works and something that feels right.',
    p2: 'You work directly with me, from the first call to delivery. No middlemen, no unnecessary jargon and no inflated promises: you tell me what your business needs, I tell you honestly what I’d do — and we build it together.',
    principles: [
      {
        title: 'Work directly with me',
        text: 'From start to finish you talk to the person writing the code. Decisions happen fast and nothing gets lost along the way.',
      },
      {
        title: 'Built to measure',
        text: 'Every project starts from a blank page. Templates show — and your business is like no other.',
      },
      {
        title: 'Clarity above all',
        text: 'Timelines, costs and progress on the table from day one. You always know where your project stands.',
      },
    ],
  },

  services: {
    kicker: 'Services',
    title: 'What I can build for you',
    lead: 'Every project is different, but almost everything I build falls into one of these four areas.',
    items: [
      {
        title: 'Websites & landing pages',
        text: 'Fast, modern pages designed to convert — from a landing like this one to your full business site.',
      },
      {
        title: 'Process automation',
        text: 'I connect your tools — WhatsApp, email, spreadsheets, CRM — so the repetitive work runs itself, error-free, around the clock.',
      },
      {
        title: 'Interactive experiences',
        text: '3D in the browser, animation and fine details that turn a passing visit into a brand people remember.',
      },
      {
        title: 'Internal tools',
        text: 'Dashboards, record systems and catalogs: small, well-made software that solves exactly the problem you have.',
      },
    ],
  },

  portfolio: {
    kicker: 'Work',
    title: 'Projects already up and running',
    lead: 'I don’t collect mockups: these are products in real use, with real problems behind them. Tap any to read the full case.',
    seeCase: 'Read the full case',
    closeCase: 'Close case',
    retoLabel: 'The challenge',
    solucionLabel: 'The solution',
    resultadoLabel: 'The result',
    projects: [
      {
        tag: 'Hospitality · NFC',
        title: 'Cabaña Serendipia — Digital guide for guests',
        description:
          'A premium guide that Airbnb guests open by tapping their phone to an NFC card inside the cabin: wifi in one tap, house guide, real-time weather and local recommendations on a map. Nothing to download.',
        stack: ['Next.js', 'Tailwind CSS', 'Leaflet', 'NFC'],
        reto: 'The host answered the same questions with every guest — the wifi password, how the house works, what to visit nearby — and nobody reads printed manuals.',
        solucion:
          'A custom web guide that opens instantly with an NFC tap: clear sections, a wifi password you copy with one button, live local weather and recommendations on an interactive map.',
        resultado:
          'Guests find everything on their own and the host stopped repeating answers. The guide updates in minutes, with nothing to reprint — and it’s ready to add more properties.',
      },
      {
        tag: 'Automation · Construction',
        title: 'Constructora Santa Elena — Quotes and invoices under control',
        description:
          'A system that centralizes quote requests, generates each quote with a reference number and tracking, and controls invoice status by project and client — with automatic reminders before every due date.',
        stack: ['n8n', 'Airtable', 'WhatsApp'],
        reto: 'Quotes were built by hand in Excel and invoices were chased over WhatsApp: every project kept its numbers in a different file and nothing showed up when it was needed.',
        solucion:
          'A flow with n8n + Airtable: requests land on a single board, each quote comes out with a number and status, and invoices flag themselves when they’re due. All searchable by project, client and period.',
        resultado:
          'Admin stopped living in scattered files: quotes ready in minutes, invoices with clear status and zero forgotten payments.',
      },
      {
        tag: 'Web · 3D',
        title: 'The card you’re looking at',
        description:
          'My own NFC business card: tap your phone and this landing opens — 3D in the browser, cinematic scroll and a light footprint. You don’t have to imagine the result: you’re inside it.',
        stack: ['React', 'Three.js', 'GSAP', 'Lenis'],
        reto: 'A paper card gets tossed or lost. I needed a presentation that shows in five seconds — right on the phone of whoever receives it — what I can build.',
        solucion:
          'A landing with an interactive 3D card, scroll animations and minimal weight: the 3D loads separately so the page opens fast even on a mid-range phone.',
        resultado:
          'Everyone who gets the card sees a real product working. This page is its own proof.',
      },
    ],
  },

  process: {
    kicker: 'Process',
    title: 'From idea to delivery',
    lead: 'No mystery: this is what working with me looks like, from the first message to support after launch.',
    stepLabel: 'Step',
    steps: [
      {
        title: 'Contact',
        text: 'You message me on WhatsApp or book a call. You tell me your idea and I tell you straight whether I can help and how.',
      },
      {
        title: 'Planning',
        text: 'We define scope, timeline and price together. All in writing from the start, so there are no surprises later.',
      },
      {
        title: 'Development',
        text: 'I build your project showing you real progress you can open on your phone — not mockups — and we adjust as we go.',
      },
      {
        title: 'Delivery',
        text: 'We launch together, test on real devices and I show you how to use and manage what’s now yours.',
      },
      {
        title: 'Support',
        text: 'I don’t vanish after delivery: I stay on hand for questions, tweaks and improvements whenever you need them.',
      },
    ],
  },

  tech: {
    kicker: 'Technologies',
    title: 'What I work with',
    lead: 'The same tools behind the products you use every day — chosen for performance, not for hype.',
  },

  testimonials: {
    kicker: 'Testimonials',
    title: 'What people who’ve worked with me say',
    viewLabel: 'View testimonial',
    items: [
      {
        quote:
          'I stopped answering the same questions with every guest. Now they tap their phone to the card and have everything: the wifi, how the house works, what to visit. It looks high-end and he built it in a few days.',
        name: 'Mónica Sanz',
        role: 'Host · Cabaña Serendipia, Chiapas',
      },
      {
        quote:
          'What I liked most is dealing with him directly, no run-around. He explained what made sense and what didn’t, met the timelines he set, and the result feels next-level.',
        name: 'Constructora Santa Elena',
        role: 'Quote and invoice automation',
      },
      {
        quote:
          'I wanted a page that didn’t look like a template, and that’s exactly what he delivered: modern, blazing fast on mobile and with bookings connected to WhatsApp. My patients arrive saying it looks very professional.',
        name: 'Dr. Paola Rivas',
        role: 'Dental clinic · Website & bookings',
      },
    ],
  },

  booking: {
    kicker: 'Book',
    title: 'Ready to start your project?',
    lead: 'Book a no-commitment call. You tell me your idea, I tell you what I’d do and I give you a clear quote.',
    iframeTitle: 'Book a meeting — Calendly',
    preferWhatsapp: 'Prefer WhatsApp? ',
    writeDirect: 'Message me directly',
    whatsappCta: 'Book via WhatsApp',
    emailCta: 'Or send me an email',
    sameDayNote: 'I usually reply the same day.',
  },

  contact: {
    kicker: 'Contact',
    title: 'Let’s talk about your project',
    lead: 'Pick whichever channel you prefer — they all reach me directly, not an inbox no one checks.',
    emailLabel: 'Email',
    whatsappHint: 'The fastest way',
    emailHint: 'For proposals and documents',
    instagramHint: 'Projects and behind the scenes',
    nameLabel: 'Your name',
    namePlaceholder: 'What’s your name?',
    messageLabel: 'Your message',
    messagePlaceholder:
      'Tell me what you need — a page, an automation, an idea…',
    submit: 'Send via WhatsApp',
    formNote:
      'WhatsApp opens with your message ready to send — no sign-ups, no spam email.',
  },

  footer: {
    rights: '© {year} José Gutiérrez. All rights reserved.',
  },

  meta: {
    title: 'José Gutiérrez — Solid engineering with your business’s own identity',
    description:
      'Custom web development, automation and interactive experiences. Solid engineering with your business’s own identity.',
  },

  messages: {
    bookingWhatsapp:
      'Hi José, I’d like to book a call to tell you about my project. (Hola José, quiero agendar una reunión para contarte mi proyecto.)',
    bookingEmailSubject: 'I’d like to book a meeting (Quiero agendar una reunión)',
    contactEmailSubject:
      'Hi José, I’d like to tell you about my project (Hola José, quiero platicarte mi proyecto)',
    contactGreeting: 'Hi José, I’m {name}.',
  },
}

const ja: Translation = {
  langName: '日本語',

  nav: {
    about: '私について',
    services: 'サービス',
    portfolio: '実績',
    process: '進め方',
    contact: 'お問い合わせ',
    reserve: '予約する',
    reserveFull: 'ミーティングを予約',
  },

  hero: {
    badge: '新規プロジェクト受付中',
    titleBefore: '確かな技術で、ビジネスに',
    titleHighlight: 'あなたらしさ',
    titleAfter: 'を。',
    subtitle:
      'Web制作、業務効率化、そしてインタラクティブな体験をオーダーメイドで。圧倒的なスピード、モダンな設計、そして細部へのこだわりを形にします。',
    ctaReserve: 'ミーティングを予約',
    ctaPortfolio: '実績を見る',
  },

  about: {
    kicker: '私について',
    title: 'はじめまして、ホセです。',
    p1: '私は、Webを舞台にした「ものづくり」を本業にしています。上質さを感じるデザイン、面倒な繰り返し作業をなくす自動化、そして心に残るインタラクティブな体験。私は、誰も気づかないような細部まで徹底的に磨き込むタイプです。なぜなら、その細部こそが「ただ動くシステム」と「心地よい体験」を分ける境界線だからです。',
    p2: '最初のお打ち合わせから納品まで、私が直接担当します。仲介者なし、不要な専門用語なし、大げさな約束もなし。あなたのビジネスに必要なことをお聞かせください。私なら何をするかを正直にお伝えし、一緒に形にしていきます。',
    principles: [
      {
        title: '直接のやり取り',
        text: '最初から最後まで、実際にコードを書くエンジニア（私）と直接対話ができます。意思決定がスピーディーで、伝言ゲームによる誤解も生まれません。',
      },
      {
        title: 'オーダーメイド開発',
        text: 'すべてのプロジェクトを「白紙」からスタートします。既製のテンプレートは一切使いません。あなたのビジネスは、他のどこにもないユニークなものだからです。',
      },
      {
        title: '圧倒的な透明性',
        text: 'スケジュール、費用、開発状況を初日からすべてオープンにします。あなたのプロジェクトが今どの段階にあるのか、いつでもリアルタイムに把握できます。',
      },
    ],
  },

  services: {
    kicker: 'サービス',
    title: '私がお手伝いできること',
    lead: 'プロジェクトはそれぞれ違いますが、私が手がけるものの多くは、この4つの領域のいずれかに収まります。',
    items: [
      {
        title: 'Webサイト・ランディングページ（LP）',
        text: '高速でモダン、そして確実な成果（コンバージョン）につながるページ。シンプルなLPから、ビジネスの核となるコーポレートサイトまで対応します。',
      },
      {
        title: '業務の自動化（DX・ワークフロー）',
        text: 'WhatsApp、メール、スプレッドシート、CRM。現在お使いのツールを連携させ、繰り返しのルーティンワークを24時間ミスなく自動化します。',
      },
      {
        title: 'インタラクティブな体験',
        text: 'ブラウザ上の3D表現、滑らかなアニメーション、細やかな演出。ユーザーの「ただの訪問」を、記憶に残る「ブランド体験」へと変貌させます。',
      },
      {
        title: '社内専用ツール・管理システム',
        text: 'ダッシュボード、管理画面、社内カタログなど。あなたのビジネスが抱える課題をピンポイントで解決する、無駄のない洗練されたソフトウェアを開発します。',
      },
    ],
  },

  portfolio: {
    kicker: '実績',
    title: 'すでに稼働しているプロジェクト',
    lead: 'モックアップは並べません。これらは実際に使われている、リアルな課題を背景に持つプロダクトです。どれでもタップすると詳細をご覧いただけます。',
    seeCase: '詳しく見る',
    closeCase: '閉じる',
    retoLabel: '課題',
    solucionLabel: '解決策',
    resultadoLabel: '成果',
    projects: [
      {
        tag: 'ホスピタリティ · NFC',
        title: 'Cabaña Serendipia — 宿泊者向けデジタルガイド',
        description:
          'Airbnbの宿泊者が、客室内のNFCカードにスマホをかざすだけで開ける上質なガイド。Wi-Fiはワンタップ、館内のご案内、リアルタイムの天気、地図付きの周辺おすすめ。アプリのダウンロードは不要です。',
        stack: ['Next.js', 'Tailwind CSS', 'Leaflet', 'NFC'],
        reto: 'ホストは宿泊者ごとに同じ質問に答えていました。Wi-Fiのパスワード、家の使い方、周辺の見どころ。しかも印刷したマニュアルは誰も読みません。',
        solucion:
          'NFCにかざすと瞬時に開くオーダーメイドのWebガイド。分かりやすいセクション、ボタン一つでコピーできるWi-Fiパスワード、現地のリアルタイムの天気、インタラクティブな地図付きのおすすめ。',
        resultado:
          '宿泊者は自分ですべてを見つけられるようになり、ホストは同じ説明の繰り返しから解放されました。ガイドは数分で更新でき、印刷し直す必要もなし。さらに宿泊施設を増やす準備も整いました。',
      },
      {
        tag: '自動化 · 建設',
        title: 'Constructora Santa Elena — 見積もりと請求をすっきり管理',
        description:
          '見積もり依頼を一元化し、各見積もりを番号付きで発行・追跡し、案件ごと・顧客ごとに請求ステータスを管理するシステム。各支払期日の前に自動でリマインドします。',
        stack: ['n8n', 'Airtable', 'WhatsApp'],
        reto: '見積もりはExcelで手作業、請求はWhatsAppで追いかける状態。案件ごとに数字が別々のファイルにあり、必要なときに何も出てきませんでした。',
        solucion:
          'n8n + Airtable のフロー。依頼は一つのボードに集まり、各見積もりは番号とステータス付きで発行され、請求は期日が来ると自動で知らせます。案件・顧客・期間ごとに検索できます。',
        resultado:
          '事務作業が散らばったファイルから解放されました。見積もりは数分で準備でき、請求はステータスが明確、支払い漏れはゼロです。',
      },
      {
        tag: 'Web · 3D',
        title: 'いま見ているこのカード',
        description:
          '私自身のNFC名刺。スマホをかざすとこのランディングが開きます。ブラウザ上の3D、映画のようなスクロール、そして軽快な表示。結果を想像する必要はありません。あなたは今その中にいます。',
        stack: ['React', 'Three.js', 'GSAP', 'Lenis'],
        reto: '紙の名刺は捨てられたり失くされたりします。受け取った人のスマホの上で、私に何が作れるかを5秒で示すプレゼンテーションが必要でした。',
        solucion:
          'インタラクティブな3Dカード、スクロールアニメーション、そして最小限の容量を備えたランディング。3Dは別で読み込むため、ミドルレンジのスマホでもページが速く開きます。',
        resultado:
          'カードを受け取った人は皆、実際に動くプロダクトを目にします。このページ自体が、その証明です。',
      },
    ],
  },

  process: {
    kicker: '進め方',
    title: 'アイデアから納品まで',
    lead: '謎めいたところはありません。最初のメッセージからリリース後のサポートまで、私と一緒に進める流れをご紹介します。',
    stepLabel: 'ステップ',
    steps: [
      {
        title: 'お問い合わせ',
        text: 'WhatsAppでメッセージをいただくか、通話を予約してください。アイデアをお聞かせいただき、お手伝いできるか、どう進めるかを率直にお伝えします。',
      },
      {
        title: '計画',
        text: '範囲・スケジュール・費用を一緒に決めます。すべて最初から書面にするので、後から想定外のことは起きません。',
      },
      {
        title: '開発',
        text: 'モックアップではなく、スマホで開ける実際の進捗をお見せしながらプロジェクトを作り、進めながら調整します。',
      },
      {
        title: '納品',
        text: '一緒に公開し、実機でテストし、これからはあなたのものとなるサイトの使い方・管理方法をご説明します。',
      },
      {
        title: 'サポート',
        text: '納品して終わりではありません。ご質問、調整、改善が必要なときは、いつでも対応します。',
      },
    ],
  },

  tech: {
    kicker: 'テクノロジー',
    title: '私が使っているもの',
    lead: '毎日あなたが使っているプロダクトの裏側にあるのと同じツール。流行ではなく、パフォーマンスで選んでいます。',
  },

  testimonials: {
    kicker: 'お客様の声',
    title: '一緒に取り組んだ方々の声',
    viewLabel: 'お客様の声を見る',
    items: [
      {
        quote:
          '宿泊者ごとに同じ質問に答えるのをやめられました。今はカードにスマホをかざすだけで、Wi-Fi、家の使い方、見どころまで全部そろっています。とても高級感があって、それを数日で作ってくれました。',
        name: 'Mónica Sanz',
        role: 'ホスト · Cabaña Serendipia、チアパス',
      },
      {
        quote:
          '一番よかったのは、遠回りせず本人と直接やり取りできたことです。何が得か何がそうでないかを説明してくれて、言った期日を守り、仕上がりはまさに別格でした。',
        name: 'Constructora Santa Elena',
        role: '見積もり・請求の自動化',
      },
      {
        quote:
          'テンプレートに見えないページが欲しかったのですが、まさにそれを届けてくれました。モダンで、スマホでとても速く、予約はWhatsAppに連携。患者さんから「とてもプロフェッショナルに見える」と言われます。',
        name: 'Dr. Paola Rivas',
        role: '歯科クリニック · Webサイトと予約',
      },
    ],
  },

  booking: {
    kicker: '予約',
    title: 'プロジェクトを始める準備はできましたか？',
    lead: 'お気軽に無料の通話をご予約ください。アイデアをお聞かせいただき、私なら何をするかをお伝えし、明確なお見積もりを差し上げます。',
    iframeTitle: 'ミーティングを予約 — Calendly',
    preferWhatsapp: 'WhatsAppがよろしいですか？ ',
    writeDirect: '直接メッセージする',
    whatsappCta: 'WhatsAppで予約',
    emailCta: 'またはメールを送る',
    sameDayNote: 'たいてい当日中に返信します。',
  },

  contact: {
    kicker: 'お問い合わせ',
    title: 'あなたのプロジェクトについて話しましょう',
    lead: 'お好きな手段をお選びください。どれも、誰も見ない受信箱ではなく、私に直接届きます。',
    emailLabel: 'メール',
    whatsappHint: '一番早い方法',
    emailHint: '提案書や資料のやり取りに',
    instagramHint: 'プロジェクトと舞台裏',
    nameLabel: 'お名前',
    namePlaceholder: 'お名前を教えてください',
    messageLabel: 'メッセージ',
    messagePlaceholder:
      'ご希望をお聞かせください。ページ、自動化、アイデア、何でも。',
    submit: 'WhatsAppで送信',
    formNote:
      'メッセージを入力した状態でWhatsAppが開きます。登録も迷惑メールもありません。',
  },

  footer: {
    rights: '© {year} José Gutiérrez. All rights reserved.',
  },

  meta: {
    title: 'José Gutiérrez — 確かな技術で、ビジネスにあなたらしさを',
    description:
      'オーダーメイドのWeb制作、業務効率化、インタラクティブな体験。確かな技術で、ビジネスにあなたらしさを。',
  },

  messages: {
    bookingWhatsapp:
      'はじめまして、ホセさん。プロジェクトについてご相談したく、ミーティングを予約したいです。(Hola José, quiero agendar una reunión para contarte mi proyecto.)',
    bookingEmailSubject: 'ミーティングを予約したいです (Quiero agendar una reunión)',
    contactEmailSubject:
      'プロジェクトについてご相談したいです (Hola José, quiero platicarte mi proyecto)',
    contactGreeting: 'はじめまして、ホセさん。{name}と申します。',
  },
}

export const translations = { es, en, ja }
export type { Translation }
