import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import './Pagination.sass';
import { Keys } from '../locales/keys';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  items: JSX.Element[];
  wrapperFunction?: (items: JSX.Element[]) => JSX.Element;
  itemsPerPage?: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  children: React.ReactElement;
}

const Pagination = (props: PaginationProps) => {
  const {
    items,
    wrapperFunction,
    itemsPerPage = 10,
    pageRangeDisplayed = 3,
    marginPagesDisplayed = 1,
    children
  } = props;

  const { t } = useTranslation();

  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  const prevItemsRef = useRef<JSX.Element[]>();
  useEffect(() => {
    prevItemsRef.current = items;
  });

  useEffect(() => {
    if (items !== prevItemsRef.current) {
      setCurrentPageIndex(0);
    }
  }, [items]);

  const handlePageClick = (selectedIndex: number): void => {
    setCurrentPageIndex(selectedIndex);
  };

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const startIndex = currentPageIndex * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, items.length);

  const filteredItems = items.slice(startIndex, endIndex);

  return (
    <>
      {wrapperFunction ? wrapperFunction(filteredItems) : filteredItems}
      {children}
      {pageCount > 1 && (
        <ReactPaginate
          previousLabel={t(Keys.PREVIOUS)}
          nextLabel={t(Keys.NEXT)}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          forcePage={currentPageIndex}
          marginPagesDisplayed={marginPagesDisplayed}
          pageRangeDisplayed={pageRangeDisplayed}
          onPageChange={(e) => handlePageClick(e.selected)}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      )}
    </>
  );
};

export default Pagination;
