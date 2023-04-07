// import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import { updateCurrentPage } from '../redux/redux';
const Paging = () => {
  const dispatch = useDispatch();
  const state = useSelector((state)=>state.pagination);
  const totalPage = state[0].totalPage;
  const currentPage = state[0].currentPage;
  const generatePageLinks = () => {
    const links = [];
  
    if (totalPage <= 3) {
      for (let i = 1; i <= totalPage; i++) {
        links.push(
          <Link
            key={i}
            to="/#prodisplay"
            className={i === currentPage ? 'active' : ''}
            onClick={() => {
              dispatch(updateCurrentPage(i));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {i}
          </Link>
        );
      }
    } else {
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPage, currentPage + 1);
  
      if (currentPage > 2) {
        links.push(
          <Link
            key="leftEllipsis"
            to="/#prodisplay"
            onClick={() => {
              dispatch(updateCurrentPage(currentPage - 2));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            ...
          </Link>
        );
      }
  
      for (let i = start; i <= end; i++) {
        links.push(
          <Link
            key={i}
            to="/#prodisplay"
            className={i === currentPage ? 'active' : ''}
            onClick={() => {
              dispatch(updateCurrentPage(i));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {i}
          </Link>
        );
      }
  
      if (currentPage < totalPage - 1) {
        links.push(
          <Link
            key="rightEllipsis"
            to="/#prodisplay"
            onClick={() => {
              dispatch(updateCurrentPage(currentPage + 2));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            ...
          </Link>
        );
      }
    }
  
    return links;
  };
  

  return (
    <div className="row mb-2">
      <div className="col-md-12 text-center">
        <div className="site-pagination">
          {currentPage > 1 && (
            <Link
              to="/#prodisplay"
              className="prev"
              onClick={() => {
                dispatch(updateCurrentPage(currentPage - 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
          )}
          {generatePageLinks()}
          {currentPage < totalPage && (
            <Link
              to="/#prodisplay"
              className="next"
              onClick={() => {
                dispatch(updateCurrentPage(currentPage +1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

 export default Paging;
