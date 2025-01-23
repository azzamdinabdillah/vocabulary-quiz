import { PaginationComponentProps } from "react-data-table-component";
import Button from "../../main/components/Button";

export const CustomPagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  currentPage,
}: PaginationComponentProps) => {
  const totalPages = Math.ceil(rowCount / rowsPerPage);
  const startRow = rowsPerPage * (currentPage - 1) + 1;
  const endRow = Math.min(rowsPerPage * currentPage, rowCount);

  return (
    <div className="flex items-center mt-4">
      <div>
        <p className="text-xs font-bold color-primary-black md:text-sm">{startRow > rowCount ? 0 : `${startRow}-${endRow}`} of {rowCount} row(s)</p>
      </div>

      <div className="flex gap-2 w-[50%] justify-end ml-auto">
        <Button
          colorVariant="green"
          sizeVariant="xs"
          onClick={() => onChangePage(currentPage - 1, totalPages)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        <Button
          sizeVariant="xs"
          colorVariant="blue"
          onClick={() => onChangePage(currentPage + 1, totalPages)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
