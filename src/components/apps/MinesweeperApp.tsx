import { useState, useEffect, useCallback } from 'react';

type CellState = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

type GameState = 'playing' | 'won' | 'lost';
type Difficulty = 'beginner' | 'intermediate' | 'expert';

const DIFFICULTIES = {
  beginner: { rows: 9, cols: 9, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 },
};

function createBoard(rows: number, cols: number, mines: number): CellState[][] {
  // Initialize empty board
  const board: CellState[][] = Array(rows)
    .fill(null)
    .map(() =>
      Array(cols)
        .fill(null)
        .map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          adjacentMines: 0,
        }))
    );

  // Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate adjacent mines
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board[row][col].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
              count++;
            }
          }
        }
        board[row][col].adjacentMines = count;
      }
    }
  }

  return board;
}

function LEDDisplay({ value, digits = 3 }: { value: number; digits?: number }) {
  const displayValue = Math.max(-99, Math.min(999, value));
  const str = displayValue.toString().padStart(digits, '0');

  return (
    <div className="flex bg-black px-1 py-0.5 border-2 border-gray-600" style={{ borderStyle: 'inset' }}>
      {str.split('').map((char, i) => (
        <span
          key={i}
          className="text-red-500 font-bold text-xl leading-none"
          style={{
            fontFamily: 'monospace',
            textShadow: '0 0 8px #ff0000',
            width: '13px',
            display: 'inline-block',
            textAlign: 'center'
          }}
        >
          {char === '-' ? '-' : char}
        </span>
      ))}
    </div>
  );
}

function Cell({
  cell,
  onClick,
  onRightClick,
  onMouseDown,
  onMouseUp,
  gameState,
}: {
  cell: CellState;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
  onMouseDown: () => void;
  onMouseUp: () => void;
  gameState: GameState;
}) {
  const getNumberColor = (num: number) => {
    const colors = [
      '', // 0
      'text-blue-600', // 1
      'text-green-600', // 2
      'text-red-600', // 3
      'text-blue-900', // 4
      'text-red-900', // 5
      'text-cyan-600', // 6
      'text-black', // 7
      'text-gray-600', // 8
    ];
    return colors[num] || '';
  };

  const renderContent = () => {
    if (cell.isFlagged && !cell.isRevealed) {
      if (gameState === 'lost' && !cell.isMine) {
        return <span className="text-black text-xs">❌</span>;
      }
      return <span className="text-red-600 text-xs">🚩</span>;
    }
    if (!cell.isRevealed) {
      if (gameState === 'lost' && cell.isMine) {
        return <span className="text-xs">💣</span>;
      }
      return null;
    }
    if (cell.isMine) {
      return <span className="text-xs">💣</span>;
    }
    if (cell.adjacentMines > 0) {
      return (
        <span className={`font-bold text-xs ${getNumberColor(cell.adjacentMines)}`}>
          {cell.adjacentMines}
        </span>
      );
    }
    return null;
  };

  const baseStyle = "w-4 h-4 flex items-center justify-center text-xs select-none";

  if (cell.isRevealed) {
    return (
      <div
        className={`${baseStyle} bg-[#c0c0c0] border border-[#808080]`}
        style={{
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: '#808080',
          backgroundColor: cell.isMine && cell.isRevealed && gameState === 'lost' ? '#ff0000' : '#c0c0c0',
        }}
      >
        {renderContent()}
      </div>
    );
  }

  return (
    <button
      className={`${baseStyle} bg-[#c0c0c0] active:border-[#808080]`}
      style={{
        borderWidth: '2px',
        borderStyle: 'outset',
        borderColor: '#ffffff #808080 #808080 #ffffff',
      }}
      onClick={onClick}
      onContextMenu={onRightClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      disabled={gameState !== 'playing'}
    >
      {renderContent()}
    </button>
  );
}

export function MinesweeperApp() {
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [board, setBoard] = useState<CellState[][]>(() => {
    const { rows, cols, mines } = DIFFICULTIES.beginner;
    return createBoard(rows, cols, mines);
  });
  const [gameState, setGameState] = useState<GameState>('playing');
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const { rows, cols, mines } = DIFFICULTIES[difficulty];

  const flagCount = board.flat().filter((cell) => cell.isFlagged).length;
  const minesRemaining = mines - flagCount;

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && gameState === 'playing') {
      interval = setInterval(() => {
        setTime((t) => Math.min(t + 1, 999));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, gameState]);

  const resetGame = useCallback((newDifficulty?: Difficulty) => {
    const diff = newDifficulty || difficulty;
    const { rows, cols, mines } = DIFFICULTIES[diff];
    setBoard(createBoard(rows, cols, mines));
    setGameState('playing');
    setTime(0);
    setIsTimerRunning(false);
    setFirstClick(true);
    if (newDifficulty) {
      setDifficulty(newDifficulty);
    }
  }, [difficulty]);

  const revealCell = useCallback(
    (row: number, col: number) => {
      if (gameState !== 'playing') return;
      if (board[row][col].isRevealed || board[row][col].isFlagged) return;

      // Start timer on first click
      if (firstClick) {
        setIsTimerRunning(true);
        setFirstClick(false);

        // Ensure first click is not a mine
        if (board[row][col].isMine) {
          const newBoard = createBoard(rows, cols, mines);
          // Keep regenerating until the clicked cell is safe
          while (newBoard[row][col].isMine) {
            const regenerated = createBoard(rows, cols, mines);
            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                newBoard[r][c] = regenerated[r][c];
              }
            }
          }
          setBoard(newBoard);
          // Continue with the new board
          revealCellRecursive(newBoard, row, col);
          return;
        }
      }

      const newBoard = board.map((r) => r.map((c) => ({ ...c })));
      revealCellRecursive(newBoard, row, col);
    },
    [board, gameState, firstClick, rows, cols, mines]
  );

  const revealCellRecursive = (boardRef: CellState[][], row: number, col: number) => {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;
    if (boardRef[row][col].isRevealed || boardRef[row][col].isFlagged) return;

    boardRef[row][col].isRevealed = true;

    if (boardRef[row][col].isMine) {
      // Game over - reveal all mines
      boardRef.forEach((r) =>
        r.forEach((c) => {
          if (c.isMine) c.isRevealed = true;
        })
      );
      setBoard(boardRef);
      setGameState('lost');
      setIsTimerRunning(false);
      return;
    }

    // Flood fill for empty cells
    if (boardRef[row][col].adjacentMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          revealCellRecursive(boardRef, row + dr, col + dc);
        }
      }
    }

    setBoard([...boardRef]);

    // Check win condition
    const unrevealedNonMines = boardRef
      .flat()
      .filter((c) => !c.isRevealed && !c.isMine).length;
    if (unrevealedNonMines === 0) {
      setGameState('won');
      setIsTimerRunning(false);
      // Flag all remaining mines
      boardRef.forEach((r) =>
        r.forEach((c) => {
          if (c.isMine) c.isFlagged = true;
        })
      );
      setBoard([...boardRef]);
    }
  };

  const toggleFlag = useCallback(
    (row: number, col: number, e: React.MouseEvent) => {
      e.preventDefault();
      if (gameState !== 'playing') return;
      if (board[row][col].isRevealed) return;

      const newBoard = board.map((r) => r.map((c) => ({ ...c })));
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
      setBoard(newBoard);
    },
    [board, gameState]
  );

  const getSmiley = () => {
    if (gameState === 'won') return '😎';
    if (gameState === 'lost') return '😵';
    if (isMouseDown) return '😮';
    return '🙂';
  };

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0]">
      {/* Menu Bar */}
      <div className="flex items-center px-2 py-1 bg-[#ece9d8] border-b border-[#919b9c] text-xs">
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Game</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div onClick={() => resetGame()} className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">New</div>
            <div className="border-t border-gray-300 my-1" />
            <div
              onClick={() => resetGame('beginner')}
              className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center"
            >
              {difficulty === 'beginner' && <span className="mr-2">✓</span>}
              <span className={difficulty !== 'beginner' ? 'ml-5' : ''}>Beginner</span>
            </div>
            <div
              onClick={() => resetGame('intermediate')}
              className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center"
            >
              {difficulty === 'intermediate' && <span className="mr-2">✓</span>}
              <span className={difficulty !== 'intermediate' ? 'ml-5' : ''}>Intermediate</span>
            </div>
            <div
              onClick={() => resetGame('expert')}
              className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer flex items-center"
            >
              {difficulty === 'expert' && <span className="mr-2">✓</span>}
              <span className={difficulty !== 'expert' ? 'ml-5' : ''}>Expert</span>
            </div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Best Times...</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Exit</div>
          </div>
        </div>
        <div className="relative group">
          <span className="px-2 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Help</span>
          <div className="hidden group-hover:block absolute left-0 top-full bg-white border border-gray-400 shadow-md z-50 min-w-[150px]">
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Contents</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Search for Help on...</div>
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">Using Help</div>
            <div className="border-t border-gray-300 my-1" />
            <div className="px-4 py-1 hover:bg-[#316ac5] hover:text-white cursor-pointer">About Minesweeper</div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex items-center justify-center p-2 overflow-auto">
        <div
          className="bg-[#c0c0c0] p-2"
          style={{
            borderWidth: '3px',
            borderStyle: 'solid',
            borderColor: '#ffffff #808080 #808080 #ffffff',
          }}
        >
          {/* Header with counters and smiley */}
          <div
            className="flex items-center justify-between p-1.5 mb-2"
            style={{
              borderWidth: '2px',
              borderStyle: 'inset',
              borderColor: '#808080 #ffffff #ffffff #808080',
              backgroundColor: '#c0c0c0',
            }}
          >
            <LEDDisplay value={minesRemaining} />
            <button
              onClick={() => resetGame()}
              className="w-7 h-7 flex items-center justify-center text-lg"
              style={{
                borderWidth: '2px',
                borderStyle: 'outset',
                borderColor: '#ffffff #808080 #808080 #ffffff',
                backgroundColor: '#c0c0c0',
              }}
            >
              {getSmiley()}
            </button>
            <LEDDisplay value={time} />
          </div>

          {/* Game Board */}
          <div
            className="inline-block"
            style={{
              borderWidth: '3px',
              borderStyle: 'inset',
              borderColor: '#808080 #ffffff #ffffff #808080',
            }}
          >
            {board.map((row, rowIdx) => (
              <div key={rowIdx} className="flex">
                {row.map((cell, colIdx) => (
                  <Cell
                    key={`${rowIdx}-${colIdx}`}
                    cell={cell}
                    onClick={() => revealCell(rowIdx, colIdx)}
                    onRightClick={(e) => toggleFlag(rowIdx, colIdx, e)}
                    onMouseDown={() => setIsMouseDown(true)}
                    onMouseUp={() => setIsMouseDown(false)}
                    gameState={gameState}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
