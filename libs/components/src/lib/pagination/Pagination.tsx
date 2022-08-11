import { IPageInfo } from '@sdjs-02/interfaces';
import PaginationItem from './PaginationItem';
import 'twin.macro';

interface PaginationProps extends IPageInfo {
  currentPage: number;
  setCurrentPage: (value: number) => void;
}

export const Pagination = ({
  currentPage,
  pageCount,
  hasNextPage,
  hasPreviousPage,
  setCurrentPage,
}: PaginationProps) => {
  const a = [...new Array(pageCount)].map((_, index) => index + 1);

  const onClickFirstPage = () => setCurrentPage(1);

  const onClickPrevious = () => hasPreviousPage && setCurrentPage(currentPage - 1);

  const onClickNext = () => hasNextPage && setCurrentPage(currentPage + 1);

  const onClickLastPage = () => setCurrentPage(pageCount);

  return (
    <div tw="flex justify-center">
      <nav>
        <ul tw="flex">
          <PaginationItem onClick={onClickFirstPage}>First Page</PaginationItem>

          <PaginationItem disabled={!hasPreviousPage} onClick={onClickPrevious}>
            Previos
          </PaginationItem>

          {a.map((item) => (
            <PaginationItem key={item} active={currentPage === item} onClick={() => setCurrentPage(item)}>
              {item}
            </PaginationItem>
          ))}

          <PaginationItem disabled={!hasNextPage} onClick={onClickNext}>
            Next
          </PaginationItem>

          <PaginationItem onClick={onClickLastPage}>Last Page</PaginationItem>
        </ul>
      </nav>
    </div>
  );
};
