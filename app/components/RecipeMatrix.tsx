import type { RecipeMatrix as RecipeMatrixData, RecipeMatrixRow } from '../types';

interface RecipeMatrixProps {
  matrix: RecipeMatrixData;
}

// Finds which row a column's stage label should be attached to: the topmost
// row where a new group joins that column, or (for a pure-merge column with
// no fresh joiners, e.g. a "combine" stage) the topmost row simply active in
// that column.
function labelOwnerRow(rows: RecipeMatrixRow[], colIndex: number): number {
  const freshJoin = rows.findIndex((r) => r.joinAt === colIndex);
  if (freshJoin !== -1) return freshJoin;
  return rows.findIndex((r) => r.joinAt !== -1 && r.joinAt <= colIndex);
}

export default function RecipeMatrix({ matrix }: RecipeMatrixProps) {
  const { columns, rows, final } = matrix;
  const stageCount = columns.length;
  const gridTemplateColumns = `minmax(8rem, auto) repeat(${stageCount}, minmax(5rem, 1fr)) minmax(9rem, auto)`;
  const labelOwnerRows = columns.map((_, colIndex) => labelOwnerRow(rows, colIndex));

  return (
    <div>
      <p className="mb-2 text-xs text-gray-400 dark:text-gray-500 sm:hidden">Scroll for full matrix →</p>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="grid text-xs sm:text-sm" style={{ gridTemplateColumns }}>
          {rows.map((row, rowIndex) => (
            <MatrixRowCells
              key={rowIndex}
              row={row}
              columns={columns}
              gridRow={rowIndex + 1}
              labelOwnerRows={labelOwnerRows}
              rowIndex={rowIndex}
            />
          ))}

          <div
            className="flex flex-col justify-center items-center gap-1 border-l-2 border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-950/40 px-3 py-2 text-center"
            style={{ gridColumn: stageCount + 2, gridRow: `1 / span ${rows.length}` }}
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
  columns,
  gridRow,
  labelOwnerRows,
  rowIndex,
}: {
  row: RecipeMatrixRow;
  columns: string[];
  gridRow: number;
  labelOwnerRows: number[];
  rowIndex: number;
}) {
  return (
    <>
      <div
        className="px-2 py-2 flex items-center justify-end text-right text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800"
        style={{ gridColumn: 1, gridRow }}
      >
        {row.ingredient}
      </div>
      {columns.map((label, colIndex) => {
        const active = row.joinAt !== -1 && colIndex >= row.joinAt;
        const isFirstActive = active && colIndex === row.joinAt;
        const showLabel = labelOwnerRows[colIndex] === rowIndex;
        return (
          <div
            key={colIndex}
            style={{ gridColumn: colIndex + 2, gridRow }}
            className={`relative min-h-[2.25rem] ${
              active ? `border-t border-b border-blue-300 dark:border-blue-700 ${isFirstActive ? 'border-l' : ''}` : ''
            }`}
          >
            {showLabel && (
              <span className="absolute top-0.5 left-1 text-[10px] font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-300">
                {label}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
}
