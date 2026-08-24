import type { RecipeMatrix as RecipeMatrixData, RecipeMatrixRow } from '../types';

interface RecipeMatrixProps {
  matrix: RecipeMatrixData;
}

export default function RecipeMatrix({ matrix }: RecipeMatrixProps) {
  const { columns, rows, final } = matrix;
  const stageCount = columns.length;
  const gridTemplateColumns = `minmax(8rem, auto) repeat(${stageCount}, minmax(5rem, 1fr)) minmax(9rem, auto)`;

  return (
    <div>
      <p className="mb-2 text-xs text-gray-400 dark:text-gray-500 sm:hidden">Scroll for full matrix →</p>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="grid text-xs sm:text-sm" style={{ gridTemplateColumns }}>
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 px-2 py-2" />
          {columns.map((label, colIndex) => (
            <div
              key={`col-${colIndex}`}
              className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 px-2 py-2 text-center font-semibold text-gray-900 dark:text-white"
            >
              {label}
            </div>
          ))}
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-600 px-2 py-2" />

          {rows.map((row, rowIndex) => (
            <MatrixRowCells key={rowIndex} row={row} stageCount={stageCount} gridRow={rowIndex + 2} />
          ))}

          <div
            className="flex flex-col justify-center items-center gap-1 border-l-2 border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/40 px-3 py-2 text-center"
            style={{ gridColumn: stageCount + 2, gridRow: `2 / span ${rows.length}` }}
          >
            <span className="font-semibold text-gray-900 dark:text-white">{final.label}</span>
            <span className="text-gray-600 dark:text-gray-300">{final.detail}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MatrixRowCells({
  row,
  stageCount,
  gridRow,
}: {
  row: RecipeMatrixRow;
  stageCount: number;
  gridRow: number;
}) {
  return (
    <>
      <div
        className="px-2 py-2 flex items-center justify-end text-right text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800"
        style={{ gridColumn: 1, gridRow }}
      >
        {row.ingredient}
      </div>
      {Array.from({ length: stageCount }, (_, colIndex) => {
        const active = row.joinAt !== -1 && colIndex >= row.joinAt;
        const isFirstActive = active && colIndex === row.joinAt;
        return (
          <div
            key={colIndex}
            style={{ gridColumn: colIndex + 2, gridRow }}
            className={
              active
                ? `border-t border-b border-blue-300 dark:border-blue-700 ${isFirstActive ? 'border-l' : ''}`
                : ''
            }
          />
        );
      })}
    </>
  );
}
