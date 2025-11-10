let questions = [];
let current = 0;
let score = 0;

// --------------------
// Escena 1: INICIO
// --------------------
class StartScene extends Phaser.Scene {
  constructor() {
    super('start');
  }

  create() {
    this.add.text(630, 200, "📰 FakeBuster", { fontSize: "40px", color: "#00a8ff" }).setOrigin(0.5);
    this.add.text(630, 260, "Aprende a detectar noticias falsas jugando.", { fontSize: "18px", color: "#fff" }).setOrigin(0.5);

    const startBtn = this.add.text(630, 350, "Jugar ahora ▶", {
      fontSize: "24px",
      backgroundColor: "#0097e6",
      padding: { x: 20, y: 10 },
      color: "#fff"
    }).setOrigin(0.5).setInteractive();

    startBtn.on("pointerdown", () => {
      this.scene.start('instructions');
    });
  }
}

// --------------------
// Escena 2: INSTRUCCIONES
// --------------------
class InstructionsScene extends Phaser.Scene {
  constructor() {
    super('instructions');
  }

  create() {
    this.add.text(630, 150, "🧠 Cómo jugar", { fontSize: "36px", color: "#00a8ff" }).setOrigin(0.5);

    const text = [
      "1️⃣ Lee atentamente el titular que aparecerá en pantalla.",
      "2️⃣ Decide si la noticia es VERDADERA o FALSA.",
      "3️⃣ Obtendrás una explicación educativa después de responder.",
      "4️⃣ Gana puntos por cada acierto y aprende a detectar desinformación."
    ].join("\n");

    this.add.text(630, 320, text, {
      fontSize: "20px",
      color: "#fff",
      align: "left",
      wordWrap: { width: 700 }
    }).setOrigin(0.5);

    const nextBtn = this.add.text(630, 500, "👉 Siguiente", {
      fontSize: "24px",
      backgroundColor: "#00a8ff",
      padding: { x: 20, y: 10 },
      color: "#fff"
    }).setOrigin(0.5).setInteractive();

    nextBtn.on("pointerdown", () => {
      this.scene.start('game');
    });
  }
}

// --------------------
// Escena 3: JUEGO PRINCIPAL
// --------------------
class GameScene extends Phaser.Scene {
  constructor() {
    super('game');
  }

  preload() {
    this.load.json('news', 'data/news.json');
  }

  create() {
    questions = this.cache.json.get('news');
    current = 0;
    score = 0;

    this.questionText = this.add.text(630, 200, '', {
      fontSize: '20px',
      color: '#fff',
      align: 'center',
      wordWrap: { width: 700 }
    }).setOrigin(0.5);

    this.feedbackText = this.add.text(630, 400, '', {
      fontSize: '18px',
      color: '#00ffcc',
      align: 'center',
      wordWrap: { width: 700 }
    }).setOrigin(0.5);

    this.trueBtn = this.add.text(530, 300, '✅ Verdadero', {
      fontSize: '22px',
      backgroundColor: '#2ecc71',
      padding: 10
    }).setOrigin(0.5).setInteractive();

    this.falseBtn = this.add.text(730, 300, '❌ Falso', {
      fontSize: '22px',
      backgroundColor: '#e74c3c',
      padding: 10
    }).setOrigin(0.5).setInteractive();

    this.trueBtn.on('pointerdown', () => this.answer(true));
    this.falseBtn.on('pointerdown', () => this.answer(false));

    this.showQuestion();
  }

  showQuestion() {
    if (current >= questions.length) {
      this.scene.start('end', { score });
      return;
    }

    const q = questions[current];
    this.questionText.setText(q.title);
    this.feedbackText.setText('');
  }

  answer(userAnswer) {
    const q = questions[current];
    const correct = userAnswer === q.truth;

    if (correct) {
      score++;
      this.feedbackText.setText("✅ Correcto\n" + q.explanation);
    } else {
      this.feedbackText.setText("❌ Incorrecto\n" + q.explanation);
    }

    current++;
    this.time.delayedCall(1000, () => this.showQuestion());
  }
}

// --------------------
// Escena 4: RESULTADOS
// --------------------
class EndScene extends Phaser.Scene {
  constructor() {
    super('end');
  }

  create(data) {
    this.add.text(630, 200, "🎉 ¡Juego terminado!", { fontSize: "32px", color: "#fff" }).setOrigin(0.5);
    this.add.text(630, 260, `Puntaje final: ${data.score}`, { fontSize: "26px", color: "#00a8ff" }).setOrigin(0.5);

    const restartBtn = this.add.text(630, 350, "Volver a jugar 🔁", {
      fontSize: "24px",
      backgroundColor: "#0097e6",
      padding: { x: 20, y: 10 },
      color: "#fff"
    }).setOrigin(0.5).setInteractive();

    restartBtn.on("pointerdown", () => {
      this.scene.start('start');
    });
  }
}

// --------------------
// CONFIGURACIÓN PHASER
// --------------------
const config = {
  type: Phaser.AUTO,
  width: 1200,
  height: 600,
  backgroundColor: '#2f3640',
  parent: 'game',
  scene: [StartScene, InstructionsScene, GameScene, EndScene]
};

new Phaser.Game(config);
