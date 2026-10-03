import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  ImageRun,
  WidthType,
  BorderStyle,
  ShadingType,
  AlignmentType,
  VerticalAlign,
  Packer,
} from 'docx';
import fs from 'fs';
import path from 'path';

// Output path
const outputPath = path.resolve('Made_You_Say_It_Rules_English_A4.docx');

// Design Palette
const COLORS = {
  primary: '1E3A8A', // Deep Blue
  primaryDark: '0F172A', // Slate 900
  accent: '2563EB', // Blue 600
  gold: 'B45309', // Amber 700
  goldLight: 'FEF3C7', // Amber 100
  goldBorder: 'F59E0B', // Amber 500
  sectionBg: 'F8FAFC',
  borderLight: 'E2E8F0',
  textDark: '0F172A',
  textMuted: '475569',
  pillBg: 'EFF6FF',
  pillBorder: 'BFDBFE',
  pillText: '1D4ED8',
};

const FONT_FAMILY = 'Segoe UI';

function createHeading(num, text, color = COLORS.primaryDark) {
  return new Paragraph({
    spacing: { before: 45, after: 20 },
    children: [
      new TextRun({
        text: `${num}. `,
        bold: true,
        size: 16, // 8pt
        font: FONT_FAMILY,
        color: COLORS.accent,
      }),
      new TextRun({
        text: text.toUpperCase(),
        bold: true,
        size: 16, // 8pt
        font: FONT_FAMILY,
        color: color,
      }),
    ],
  });
}

function createBullet(title, desc) {
  return new Paragraph({
    spacing: { before: 12, after: 12, line: 195 },
    children: [
      new TextRun({
        text: `• ${title}: `,
        bold: true,
        size: 13, // 6.5pt
        font: FONT_FAMILY,
        color: COLORS.textDark,
      }),
      new TextRun({
        text: desc,
        size: 13, // 6.5pt
        font: FONT_FAMILY,
        color: COLORS.textMuted,
      }),
    ],
  });
}

function safeReadImage(relPath) {
  const fullPath = path.resolve(relPath);
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath);
  }
  return null;
}

async function generate() {
  const logoData = safeReadImage('public/brand/logo.png');
  const setupData = safeReadImage('public/rules/setup-1-shuffle.jpg') || safeReadImage('public/set up/1.png');
  const turnData = safeReadImage('public/rules/turn-1-draw.jpg') || safeReadImage('public/your turn/1.png');
  const pilesData = safeReadImage('public/rules/the-piles-table.jpg');
  const chaosCard = safeReadImage('public/cards/chaos 2 point hero.png');
  const guessCard = safeReadImage('public/cards/guess  1point hero.png');
  const battleCard = safeReadImage('public/cards/battle 2 points hero.png');

  // --- HEADER SECTION (TABLE WITH LOGO + TITLE + SPECS) ---
  const leftHeaderChildren = [];
  if (logoData) {
    // Nested 2-cell table for logo + title
    leftHeaderChildren.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: {
          top: { style: BorderStyle.NONE },
          bottom: { style: BorderStyle.NONE },
          left: { style: BorderStyle.NONE },
          right: { style: BorderStyle.NONE },
          insideHorizontal: { style: BorderStyle.NONE },
          insideVertical: { style: BorderStyle.NONE },
        },
        rows: [
          new TableRow({
            children: [
              new TableCell({
                width: { size: 14, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                children: [
                  new Paragraph({
                    spacing: { before: 0, after: 0 },
                    children: [
                      new ImageRun({
                        data: logoData,
                        transformation: { width: 34, height: 34 },
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                width: { size: 86, type: WidthType.PERCENTAGE },
                verticalAlign: VerticalAlign.CENTER,
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                },
                children: [
                  new Paragraph({
                    spacing: { before: 0, after: 5 },
                    children: [
                      new TextRun({
                        text: 'MADE YOU SAY IT',
                        bold: true,
                        size: 24, // 12pt
                        font: FONT_FAMILY,
                        color: COLORS.primaryDark,
                      }),
                    ],
                  }),
                  new Paragraph({
                    spacing: { before: 0, after: 0 },
                    children: [
                      new TextRun({
                        text: 'PLAY A CARD. MAKE A MEMORY. ',
                        bold: true,
                        size: 13, // 6.5pt
                        font: FONT_FAMILY,
                        color: COLORS.accent,
                      }),
                      new TextRun({
                        text: '— Official Quick-Start Rules Sheet',
                        size: 12, // 6pt
                        font: FONT_FAMILY,
                        color: COLORS.textMuted,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  } else {
    leftHeaderChildren.push(
      new Paragraph({
        spacing: { before: 0, after: 5 },
        children: [
          new TextRun({
            text: 'MADE YOU SAY IT',
            bold: true,
            size: 24,
            font: FONT_FAMILY,
            color: COLORS.primaryDark,
          }),
        ],
      }),
      new Paragraph({
        spacing: { before: 0, after: 0 },
        children: [
          new TextRun({
            text: 'PLAY A CARD. MAKE A MEMORY. ',
            bold: true,
            size: 13,
            font: FONT_FAMILY,
            color: COLORS.accent,
          }),
          new TextRun({
            text: '— Official Quick-Start Rules Sheet',
            size: 12,
            font: FONT_FAMILY,
            color: COLORS.textMuted,
          }),
        ],
      })
    );
  }

  const headerTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: 62, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.CENTER,
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            children: leftHeaderChildren,
          }),
          new TableCell({
            width: { size: 38, type: WidthType.PERCENTAGE },
            verticalAlign: VerticalAlign.CENTER,
            shading: { fill: COLORS.pillBg, type: ShadingType.CLEAR },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: COLORS.pillBorder },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: COLORS.pillBorder },
              left: { style: BorderStyle.SINGLE, size: 4, color: COLORS.pillBorder },
              right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.pillBorder },
            },
            margins: { top: 50, bottom: 50, left: 80, right: 80 },
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 0, line: 190 },
                children: [
                  new TextRun({
                    text: '3–8 PLAYERS   •   AGES 13+   •   15–45 MIN\n80 CARDS   •   160 TOTAL POINTS',
                    bold: true,
                    size: 12, // 6pt
                    font: FONT_FAMILY,
                    color: COLORS.pillText,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Sleek Accent Divider Line
  const divider = new Paragraph({
    spacing: { before: 20, after: 30 },
    border: {
      bottom: { color: COLORS.accent, size: 8, style: BorderStyle.SINGLE },
    },
  });

  // --- COLUMN 1 (LEFT) ---
  const col1Children = [];

  // 1. SETUP
  col1Children.push(createHeading('1', 'Setup & Preparation'));
  col1Children.push(createBullet('1. Shuffle', 'Thoroughly shuffle all 80 cards into one central deck.'));
  col1Children.push(createBullet('2. Deal 3 Cards', 'Deal 1 card at a time to each player until everyone has 3.'));
  col1Children.push(createBullet('3. Draw Pile', 'Place the remaining cards face-down in the center.'));
  col1Children.push(createBullet('4. Starting Player', 'The group picks who starts; play proceeds clockwise.'));
  col1Children.push(createBullet('5. Start at 0', 'Everyone begins the game with 0 points.'));

  // Setup Image
  if (setupData) {
    col1Children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 15, after: 30 },
        children: [
          new ImageRun({
            data: setupData,
            transformation: { width: 215, height: 70 },
          }),
        ],
      })
    );
  }

  // 2. YOUR TURN (6-STEP FLOW)
  col1Children.push(createHeading('2', 'Your Turn (The 6-Step Cycle)'));
  col1Children.push(
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 5, after: 20 },
      children: [
        new TextRun({
          text: 'DRAW  →  CHOOSE  →  PLAY/PASS  →  DO IT  →  SCORE  →  NEXT',
          bold: true,
          size: 12,
          font: FONT_FAMILY,
          color: COLORS.primary,
        }),
      ],
    })
  );

  col1Children.push(createBullet('Step 1: Draw', 'Draw 1 card from the Draw Pile.'));
  col1Children.push(createBullet('Step 2: Choose', 'Choose 1 card from your hand to play (or pass).'));
  col1Children.push(createBullet('Step 3: Play or Pass', 'Read chosen card aloud to play, or discard it to pass.'));
  col1Children.push(createBullet('Step 4: Do It', "Follow the card's action or challenge prompt."));
  col1Children.push(createBullet('Step 5: Score', 'Complete it → earn printed points → place in your Score Pile.'));
  col1Children.push(createBullet('Step 6: Next', 'Your turn ends. Play passes clockwise to the next player.'));

  // Turn Image
  if (turnData) {
    col1Children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 15, after: 30 },
        children: [
          new ImageRun({
            data: turnData,
            transformation: { width: 215, height: 70 },
          }),
        ],
      })
    );
  }

  // 5. PASS OR FAIL
  col1Children.push(createHeading('5', 'Pass or Fail (Zero Pressure)'));
  col1Children.push(
    new Paragraph({
      spacing: { before: 5, after: 15, line: 185 },
      children: [
        new TextRun({
          text: '• PASS: ',
          bold: true,
          size: 13,
          font: FONT_FAMILY,
          color: COLORS.textDark,
        }),
        new TextRun({
          text: "Don't want to do the card? Discard it, score 0 points, and end your turn.\n",
          size: 13,
          font: FONT_FAMILY,
          color: COLORS.textMuted,
        }),
        new TextRun({
          text: '• FAIL: ',
          bold: true,
          size: 13,
          font: FONT_FAMILY,
          color: COLORS.textDark,
        }),
        new TextRun({
          text: 'Attempted but could not complete? Discard it and score 0 points.\n',
          size: 13,
          font: FONT_FAMILY,
          color: COLORS.textMuted,
        }),
        new TextRun({
          text: '💡 Golden Reminder: You can always pass without penalty.',
          bold: true,
          size: 12.5,
          font: FONT_FAMILY,
          color: COLORS.accent,
        }),
      ],
    })
  );

  // --- COLUMN 2 (RIGHT) ---
  const col2Children = [];

  // 3 & 4. CARD TYPES & POINTS
  col2Children.push(createHeading('3 & 4', 'Card Types & Scoring'));
  col2Children.push(
    new Paragraph({
      spacing: { before: 5, after: 15 },
      children: [
        new TextRun({
          text: 'The large number on each card shows its point value (1, 2, or 3 points).',
          size: 13,
          font: FONT_FAMILY,
          color: COLORS.textMuted,
        }),
      ],
    })
  );

  col2Children.push(
    createBullet(
      'SOLO ACTIONS (Chaos, Create, Love, Connect)',
      'Follow instructions. Complete it → earn printed points → place in your personal Score Pile.'
    )
  );
  col2Children.push(
    createBullet(
      'GUESS (Group Play)',
      "Everyone guesses! The player who played the card scores the points. The fun is everyone's crazy guesses."
    )
  );
  col2Children.push(
    createBullet(
      'BATTLE (1-on-1 Showdown)',
      'Challenge an opponent. Other players vote winner. Winner takes card into Score Pile (ties discard). Rotate opponents!'
    )
  );

  // Card Samples Mini Gallery
  if (chaosCard && battleCard && guessCard) {
    const cardMiniTable = new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 33, type: WidthType.PERCENTAGE },
              verticalAlign: VerticalAlign.CENTER,
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 0, after: 0 },
                  children: [
                    new ImageRun({
                      data: chaosCard,
                      transformation: { width: 68, height: 95 },
                    }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 6, after: 0 },
                  children: [
                    new TextRun({
                      text: 'ACTION',
                      bold: true,
                      size: 11.5,
                      font: FONT_FAMILY,
                      color: COLORS.accent,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 34, type: WidthType.PERCENTAGE },
              verticalAlign: VerticalAlign.CENTER,
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 0, after: 0 },
                  children: [
                    new ImageRun({
                      data: battleCard,
                      transformation: { width: 68, height: 95 },
                    }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 6, after: 0 },
                  children: [
                    new TextRun({
                      text: 'BATTLE',
                      bold: true,
                      size: 11.5,
                      font: FONT_FAMILY,
                      color: COLORS.accent,
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              width: { size: 33, type: WidthType.PERCENTAGE },
              verticalAlign: VerticalAlign.CENTER,
              borders: {
                top: { style: BorderStyle.NONE },
                bottom: { style: BorderStyle.NONE },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.NONE },
              },
              children: [
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 0, after: 0 },
                  children: [
                    new ImageRun({
                      data: guessCard,
                      transformation: { width: 68, height: 95 },
                    }),
                  ],
                }),
                new Paragraph({
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 6, after: 0 },
                  children: [
                    new TextRun({
                      text: 'GUESS',
                      bold: true,
                      size: 11.5,
                      font: FONT_FAMILY,
                      color: COLORS.accent,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });
    col2Children.push(cardMiniTable);
  }

  // 6. THE TABLE PILES
  col2Children.push(createHeading('6', 'The Table Layout & Piles'));
  if (pilesData) {
    col2Children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 8, after: 15 },
        children: [
          new ImageRun({
            data: pilesData,
            transformation: { width: 215, height: 70 },
          }),
        ],
      })
    );
  }
  col2Children.push(createBullet('Draw Pile (Center)', 'Face-down cards waiting to be drawn during turns.'));
  col2Children.push(createBullet('Score Pile (Your Area)', 'Cards you earned! Their printed points count toward your score.'));
  col2Children.push(createBullet('Discard Pile (Center)', 'Face-up pile for passed, failed, or tied cards.'));

  // 7. END OF GAME
  col2Children.push(createHeading('7', 'End of Game & Winning'));
  col2Children.push(
    new Paragraph({
      spacing: { before: 5, after: 12, line: 185 },
      children: [
        new TextRun({
          text: '• Trigger: ',
          bold: true,
          size: 13,
          font: FONT_FAMILY,
          color: COLORS.textDark,
        }),
        new TextRun({
          text: 'When the last card is drawn, complete the current round. Players who cannot draw play 1 card from hand.\n',
          size: 13,
          font: FONT_FAMILY,
          color: COLORS.textMuted,
        }),
        new TextRun({
          text: '• Scoring: ',
          bold: true,
          size: 13,
          font: FONT_FAMILY,
          color: COLORS.textDark,
        }),
        new TextRun({
          text: 'Sum all printed points on cards in your Score Pile. ',
          size: 13,
          font: FONT_FAMILY,
          color: COLORS.textMuted,
        }),
        new TextRun({
          text: 'Highest score wins!',
          bold: true,
          size: 13,
          font: FONT_FAMILY,
          color: COLORS.primaryDark,
        }),
      ],
    })
  );

  // 8. GOLDEN RULE
  const goldenBox = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 6, color: COLORS.goldBorder },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: COLORS.goldBorder },
      left: { style: BorderStyle.SINGLE, size: 6, color: COLORS.goldBorder },
      right: { style: BorderStyle.SINGLE, size: 6, color: COLORS.goldBorder },
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: COLORS.goldLight, type: ShadingType.CLEAR },
            margins: { top: 50, bottom: 50, left: 70, right: 70 },
            children: [
              new Paragraph({
                spacing: { before: 0, after: 4 },
                children: [
                  new TextRun({
                    text: '★ 8. THE GOLDEN RULE',
                    bold: true,
                    size: 13.5,
                    font: FONT_FAMILY,
                    color: COLORS.gold,
                  }),
                ],
              }),
              new Paragraph({
                spacing: { before: 0, after: 0, line: 175 },
                children: [
                  new TextRun({
                    text: 'Everyone should have fun! You can always pass without penalty. Never pressure anyone to reveal a real crush, private secrets, touch another player, or do anything dangerous, sexual, humiliating, or uncomfortable.',
                    size: 12,
                    font: FONT_FAMILY,
                    color: COLORS.textDark,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
  col2Children.push(goldenBox);

  // --- TWO COLUMN MASTER TABLE ---
  const masterTable = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.NONE },
      bottom: { style: BorderStyle.NONE },
      left: { style: BorderStyle.NONE },
      right: { style: BorderStyle.NONE },
      insideHorizontal: { style: BorderStyle.NONE },
      insideVertical: { style: BorderStyle.NONE },
    },
    rows: [
      new TableRow({
        children: [
          // Left Column
          new TableCell({
            width: { size: 48, type: WidthType.PERCENTAGE },
            margins: { top: 0, bottom: 0, left: 20, right: 80 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.SINGLE, size: 4, color: COLORS.borderLight },
            },
            children: col1Children,
          }),
          // Gutter
          new TableCell({
            width: { size: 4, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            children: [new Paragraph({ children: [] })],
          }),
          // Right Column
          new TableCell({
            width: { size: 48, type: WidthType.PERCENTAGE },
            margins: { top: 0, bottom: 0, left: 80, right: 20 },
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              left: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
            },
            children: col2Children,
          }),
        ],
      }),
    ],
  });

  // Footer micro text
  const footerPara = new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 30, after: 0 },
    children: [
      new TextRun({
        text: 'MADE YOU SAY IT © 2026 • PLAY A CARD. MAKE A MEMORY. • OFFICIAL SINGLE-PAGE PRINTABLE INSERT',
        size: 11,
        font: FONT_FAMILY,
        color: COLORS.textMuted,
      }),
    ],
  });

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              // A4 dimensions in twips: 210mm x 297mm
              width: 11906,
              height: 16838,
            },
            margin: {
              top: 340, // ~0.24 inch
              bottom: 340,
              left: 380,
              right: 380,
            },
          },
        },
        children: [headerTable, divider, masterTable, footerPara],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document saved to ${outputPath}`);
}

generate().catch(console.error);
